import { useEffect, useRef, useState } from 'react'

const routes = { 'homepage.html': '/', 'course-catalogue.html': '/courses', 'community.html': '/community', 'duas.html': '/duas', 'fatwa.html': '/fatwa', 'hifz-tracker.html': '/hifz', 'hijri-calendar.html': '/hijri', 'lesson-player.html': '/lesson', 'login.html': '/login', 'marketplace.html': '/marketplace', 'mushaf.html': '/mushaf', 'practice-hub.html': '/practice', 'profile.html': '/profile', 'signup.html': '/signup', 'zakat-calculator.html': '/zakat' }

function publicUrl(value, base) {
  if (!value || value.startsWith('#') || /^(https?:|mailto:|tel:|data:)/.test(value)) return value
  const url = new URL(value, new URL(base, window.location.origin))
  const target = Object.keys(routes).find((page) => url.pathname.endsWith(`/${page}`))
  return target ? routes[target] : url.pathname
}

// Each legacy page's script needs two things that are normally in tension:
//   1. Its own top-level `let`/`const` (e.g. `activeCat`, `t`) must not
//      collide with another page's script of the same name, now that
//      navigation keeps the JS context alive instead of doing a full reload.
//   2. Its top-level `function`s must still land on `window`, because every
//      page uses inline `onclick="handleSubmit()"`-style handlers that can
//      only find a plain global function.
// A <script type="module"> satisfies (1) but breaks (2) — modules never
// expose their functions on window, which is why "Sign in as Learner" (and
// other onclick buttons) stopped responding. Running the code through an
// *indirect* eval satisfies both: indirect eval's top-level let/const get a
// fresh scope on every call (no collisions), while its top-level function
// declarations are still installed on the global object, exactly like a
// classic script.
const indirectEval = (0, eval)
async function runScript(src) {
  const response = await fetch(src)
  if (!response.ok) throw new Error(`Could not load ${src}`)
  const code = await response.text()
  indirectEval(`${code}\n//# sourceURL=${src}`)
}

// Stylesheets are shared across pages (base.css, app-shell.css, etc). Keep a
// persistent cache keyed by URL so navigating never tears down and reloads
// CSS that the next page also needs — that gap of unstyled markup was what
// caused elements like the sidebar logo to briefly render at full/native
// size before shrinking down once the styles reapplied.
const styleCache = new Map()
function ensureStylesheet(href) {
  if (!styleCache.has(href)) {
    styleCache.set(href, new Promise((resolve) => {
      const link = document.createElement('link')
      link.rel = 'stylesheet'; link.href = href
      link.onload = () => resolve(); link.onerror = () => resolve()
      document.head.appendChild(link)
    }))
  }
  return styleCache.get(href)
}

export default function StaticPage({ page, onNavigate }) {
  const [html, setHtml] = useState('')
  const containerRef = useRef(null)

  // Intercept clicks on internal nav links (they're plain <a href="..."> tags
  // in the legacy markup) so navigation updates the URL and swaps content in
  // place, instead of letting the browser do a full page reload/flash.
  useEffect(() => {
    const container = containerRef.current
    if (!container || !onNavigate) return
    function handleClick(event) {
      const anchor = event.target.closest('a[href]')
      if (!anchor || anchor.target === '_blank') return
      const href = anchor.getAttribute('href')
      if (!Object.values(routes).includes(href)) return
      event.preventDefault()
      if (href === window.location.pathname) return
      window.history.pushState({}, '', href)
      onNavigate(href)
    }
    container.addEventListener('click', handleClick)
    return () => container.removeEventListener('click', handleClick)
  }, [onNavigate, html])

  useEffect(() => {
    let active = true; const source = `/legacy/pages/${page}`
    async function render() {
      const response = await fetch(source); if (!response.ok) throw new Error(`Unable to load ${page}`)
      const doc = new DOMParser().parseFromString(await response.text(), 'text/html')
      if (!active) return
      document.title = doc.title || 'Zulfishan'; document.documentElement.lang = doc.documentElement.lang || 'en'; document.documentElement.dir = doc.documentElement.dir || 'ltr'
      // Apply the saved drawer choice before this page is painted. This avoids
      // the sidebar briefly opening on every page navigation.
      const app = doc.querySelector('.app')
      if (app && localStorage.getItem('zf_sidebar_open') === 'false') app.classList.remove('sidebar-open')
      const styleHrefs = [...doc.querySelectorAll('link[rel="stylesheet"]')].map((link) => publicUrl(link.getAttribute('href'), source))
      await Promise.all(styleHrefs.map(ensureStylesheet))
      if (!active) return
      doc.body.querySelectorAll('[src]').forEach((node) => node.setAttribute('src', publicUrl(node.getAttribute('src'), source)))
      doc.body.querySelectorAll('[href]').forEach((node) => node.setAttribute('href', publicUrl(node.getAttribute('href'), source)))
      const pageScripts = [...doc.body.querySelectorAll('script[src]')]
      pageScripts.forEach((script) => script.remove())
      setHtml(doc.body.innerHTML)
      requestAnimationFrame(async () => {
        for (const item of pageScripts) {
          if (!active) return
          try { await runScript(publicUrl(item.getAttribute('src'), source)) } catch (error) { console.error(error) }
        }
        if (active) document.dispatchEvent(new Event('DOMContentLoaded'))
      })
    }
    render().catch((error) => { console.error(error); if (active) setHtml('<p style="padding:2rem">This page could not be loaded.</p>') })
    return () => { active = false }
  }, [page])
  return <div ref={containerRef} dangerouslySetInnerHTML={{ __html: html }} />
}
