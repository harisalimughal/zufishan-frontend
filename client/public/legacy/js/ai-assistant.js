// =========================================================
// AI ASSISTANT CLIENT CONTROLLER
// =========================================================

(function () {
  let activeConversationId = null;
  let conversations = [];
  let isGenerating = false;
  let messages = [];

  function t(key) {
    const lang = window.currentLang || 'en';
    const dict = (window.translations && window.translations[lang]) || {};
    return dict[key] !== undefined ? dict[key] : (window.translations?.en?.[key] || key);
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
  }

  function renderConversationsList() {
    const listEl = document.getElementById('aiThreadsList');
    if (!listEl) return;

    if (conversations.length === 0) {
      listEl.innerHTML = `<div style="padding:16px; font-size:0.8rem; color:rgba(36,27,16,0.5); text-align:center;">${t('noThreads')}</div>`;
      return;
    }

    listEl.innerHTML = conversations.map(c => `
      <div class="ai-thread-item ${c.id === activeConversationId ? 'active' : ''}" data-id="${c.id}">
        <span class="dot"></span>
        <span class="ai-thread-title">${escapeHtml(c.title || 'Conversation')}</span>
      </div>
    `).join('');

    listEl.querySelectorAll('.ai-thread-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = item.getAttribute('data-id');
        if (id && id !== activeConversationId) {
          selectConversation(id);
        }
      });
    });
  }

  async function loadConversations() {
    if (!window.zfApi) return;
    try {
      const res = await window.zfApi.get('/v1/utilities/ai-assistant/history');
      if (res.ok && res.data) {
        const payload = res.data.data || res.data;
        const items = Array.isArray(payload) ? payload : payload.conversations || [];
        conversations = items;
        renderConversationsList();
      }
    } catch (e) {
      // offline fallback
    }
  }

  async function selectConversation(id) {
    activeConversationId = id;
    renderConversationsList();
    messages = [];
    renderMessages();

    if (!window.zfApi) return;
    try {
      const res = await window.zfApi.get(`/v1/utilities/ai-assistant/conversations/${id}`);
      if (res.ok && res.data) {
        const thread = res.data.data || res.data;
        const msgList = thread.messages || thread.turns || [];
        messages = msgList.map(m => ({
          id: m.id,
          role: (m.role || '').toLowerCase() === 'user' ? 'user' : 'assistant',
          content: m.content || '',
          sources: m.sources || [],
          scholarRedirect: Boolean(m.scholarRedirect || m.isRedirected),
        }));
        renderMessages();
      }
    } catch (e) {
      // offline fallback
    }
  }

  function startNewChat() {
    activeConversationId = null;
    messages = [];
    renderConversationsList();
    renderMessages();
    const input = document.getElementById('aiInput');
    if (input) {
      input.value = '';
      input.focus();
    }
  }

  function renderMessages() {
    const container = document.getElementById('aiMessagesContainer');
    if (!container) return;

    if (messages.length === 0) {
      container.innerHTML = `
        <div class="ai-welcome">
          <div class="mark-large"><i></i><i></i><i></i><i></i></div>
          <h3 data-i18n="welcomeTitle">${t('welcomeTitle')}</h3>
          <p data-i18n="welcomeSub">${t('welcomeSub')}</p>
          <div class="ai-suggestions-grid">
            <div class="ai-suggestion-card" data-prompt="${t('prompt1Text')}">
              <span class="card-topic" data-i18n="prompt1Topic">${t('prompt1Topic')}</span>
              <span data-i18n="prompt1Text">${t('prompt1Text')}</span>
            </div>
            <div class="ai-suggestion-card" data-prompt="${t('prompt2Text')}">
              <span class="card-topic" data-i18n="prompt2Topic">${t('prompt2Topic')}</span>
              <span data-i18n="prompt2Text">${t('prompt2Text')}</span>
            </div>
            <div class="ai-suggestion-card" data-prompt="${t('prompt3Text')}">
              <span class="card-topic" data-i18n="prompt3Topic">${t('prompt3Topic')}</span>
              <span data-i18n="prompt3Text">${t('prompt3Text')}</span>
            </div>
            <div class="ai-suggestion-card" data-prompt="${t('prompt4Text')}">
              <span class="card-topic" data-i18n="prompt4Topic">${t('prompt4Topic')}</span>
              <span data-i18n="prompt4Text">${t('prompt4Text')}</span>
            </div>
          </div>
        </div>
      `;

      container.querySelectorAll('.ai-suggestion-card').forEach(card => {
        card.addEventListener('click', () => {
          const prompt = card.getAttribute('data-prompt');
          if (prompt) sendMessage(prompt);
        });
      });
      return;
    }

    let html = '';
    messages.forEach(m => {
      if (m.role === 'user') {
        html += `
          <div class="ai-msg-row user">
            <div class="ai-msg-avatar">You</div>
            <div class="ai-msg-bubble">${escapeHtml(m.content)}</div>
          </div>
        `;
      } else {
        html += `
          <div class="ai-msg-row assistant">
            <div class="ai-msg-avatar"><span class="tilemark"><i></i><i></i><i></i><i></i></span></div>
            <div class="ai-msg-bubble">
              <div>${escapeHtml(m.content).replace(/\n/g, '<br>')}</div>
              ${renderScholarBox(m)}
              ${renderSourcesBox(m)}
              ${renderFeedbackBar(m)}
            </div>
          </div>
        `;
      }
    });

    if (isGenerating) {
      html += `
        <div class="ai-msg-row assistant" id="aiTypingIndicator">
          <div class="ai-msg-avatar"><span class="tilemark"><i></i><i></i><i></i><i></i></span></div>
          <div class="ai-msg-bubble">
            <div class="ai-typing-indicator">
              <span class="ai-typing-dot"></span>
              <span class="ai-typing-dot"></span>
              <span class="ai-typing-dot"></span>
              <span style="font-size:0.8rem; color:rgba(36,27,16,0.6); margin-inline-start:6px;">${t('thinking')}</span>
            </div>
          </div>
        </div>
      `;
    }

    container.innerHTML = html;
    attachFeedbackListeners();
    attachSourcesToggleListeners();
    container.scrollTop = container.scrollHeight;
  }

  function renderScholarBox(m) {
    if (!m.scholarRedirect) return '';
    return `
      <div class="ai-scholar-box">
        <div class="ai-scholar-box-head">
          <span class="tilemark"><i></i><i></i><i></i><i></i></span>
          <span>${t('scholarNotice')}</span>
        </div>
        <div class="ai-scholar-box-text">${t('scholarRedirectText')}</div>
        <div>
          <a href="fatwa.html"><button class="btn btn-primary sm" style="font-size:0.8rem; padding:8px 14px;">${t('askHumanScholar')}</button></a>
        </div>
      </div>
    `;
  }

  function renderSourcesBox(m) {
    if (!m.sources || m.sources.length === 0) return '';
    const itemsHtml = m.sources.map(s => `
      <div class="ai-source-item">
        <div class="ai-source-title">${escapeHtml(s.title || s.sourceName || 'Authentic Reference')}</div>
        <div class="ai-source-snippet">"${escapeHtml(s.excerpt || s.text || '')}"</div>
      </div>
    `).join('');

    return `
      <div class="ai-sources-section">
        <button class="ai-sources-toggle" data-sources-toggle>
          <span>▾ ${t('sources')} (${m.sources.length})</span>
        </button>
        <div class="ai-sources-list" style="display:none;">
          ${itemsHtml}
        </div>
      </div>
    `;
  }

  function renderFeedbackBar(m) {
    if (m.role !== 'assistant') return '';
    return `
      <div class="ai-feedback-bar" data-msg-id="${m.id || ''}">
        <button class="ai-feedback-btn" data-rating="helpful">👍 ${t('feedbackHelpful')}</button>
        <button class="ai-feedback-btn" data-rating="not_helpful">👎 ${t('feedbackNotHelpful')}</button>
      </div>
    `;
  }

  function attachSourcesToggleListeners() {
    document.querySelectorAll('[data-sources-toggle]').forEach(btn => {
      btn.onclick = () => {
        const list = btn.nextElementSibling;
        if (!list) return;
        const isHidden = list.style.display === 'none';
        list.style.display = isHidden ? 'flex' : 'none';
        btn.querySelector('span').textContent = isHidden
          ? `▴ ${t('hideSources')}`
          : `▾ ${t('sources')}`;
      };
    });
  }

  function attachFeedbackListeners() {
    document.querySelectorAll('.ai-feedback-btn').forEach(btn => {
      btn.onclick = async () => {
        const bar = btn.closest('.ai-feedback-bar');
        const rating = btn.getAttribute('data-rating');
        const msgId = bar?.getAttribute('data-msg-id');
        btn.classList.add('active');
        if (window.zfApi && (msgId || activeConversationId)) {
          try {
            await window.zfApi.post('/v1/utilities/ai-assistant/feedback', {
              messageId: msgId || undefined,
              conversationId: activeConversationId || undefined,
              rating: rating === 'helpful' ? 'helpful' : 'not_helpful',
            });
          } catch (e) {}
        }
        bar.innerHTML = `<span style="font-size:0.75rem; color:var(--azure); font-weight:600;">✓ ${t('feedbackThanks')}</span>`;
      };
    });
  }

  async function sendMessage(text) {
    const clean = (text || '').trim();
    if (!clean || isGenerating) return;

    messages.push({ role: 'user', content: clean });
    isGenerating = true;
    renderMessages();

    const input = document.getElementById('aiInput');
    if (input) input.value = '';

    if (!window.zfApi) {
      setTimeout(() => {
        isGenerating = false;
        messages.push({
          role: 'assistant',
          content: 'Zulfishan AI Assistant is ready. Grounded in verified Islamic texts and scholar reviews.',
          sources: [],
          scholarRedirect: false,
        });
        renderMessages();
      }, 700);
      return;
    }

    try {
      const res = await window.zfApi.post('/v1/utilities/ai-assistant/chat', {
        message: clean,
        conversationId: activeConversationId || undefined,
      });

      isGenerating = false;

      if (res.ok && res.data) {
        const data = res.data.data || res.data;
        if (data.conversationId) {
          activeConversationId = data.conversationId;
        }

        messages.push({
          id: data.messageId,
          role: 'assistant',
          content: data.message || data.content || '',
          sources: data.sources || [],
          scholarRedirect: Boolean(data.scholarRedirect),
          scholarRedirectCategory: data.scholarRedirectCategory,
        });

        loadConversations();
      } else {
        const errorMsg = res.error || 'Unable to consult knowledge base at this moment.';
        messages.push({
          role: 'assistant',
          content: `${errorMsg}\n\nPlease verify your connection or try again.`,
          sources: [],
          scholarRedirect: false,
        });
      }
    } catch (err) {
      isGenerating = false;
      messages.push({
        role: 'assistant',
        content: 'Unable to reach the server. Please check your network connection.',
        sources: [],
        scholarRedirect: false,
      });
    }

    renderMessages();
  }

  window.onLanguageChange = function () {
    renderConversationsList();
    renderMessages();
  };

  document.addEventListener('DOMContentLoaded', () => {
    loadConversations();
    renderMessages();

    document.getElementById('newChatBtn')?.addEventListener('click', startNewChat);

    const input = document.getElementById('aiInput');
    const sendBtn = document.getElementById('aiSendBtn');

    if (sendBtn) {
      sendBtn.addEventListener('click', () => {
        if (input) sendMessage(input.value);
      });
    }

    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          sendMessage(input.value);
        }
      });
    }

    // Check if user came from a quick-prompt card
    const query = sessionStorage.getItem('zf_initial_ai_query');
    if (query) {
      sessionStorage.removeItem('zf_initial_ai_query');
      setTimeout(() => sendMessage(query), 300);
    }
  });
})();
