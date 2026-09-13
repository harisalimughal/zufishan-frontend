import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useI18n, T } from '../i18n/I18nContext.jsx'
import { Brand } from './Tilemark.jsx'
import '../styles/app-shell.css'

const NAV = [
  { group: 'navLearn', items: [
    { to: '/courses', key: 'navCourses' },
    { to: '/mushaf', key: 'navMushaf' },
    { to: '/hifz', key: 'navHifz' },
  ]},
  { group: 'navPractice', items: [
    { to: '/practice', key: 'navDailyPractice' },
    { to: '/ai-assistant', key: 'navAiAssistant' },
    { to: '/fatwa', key: 'navFatwa' },
    { to: '/duas', key: 'navDuas' },
    { to: '/hijri', key: 'navHijri' },
    { to: '/zakat', key: 'navZakat' },
  ]},
  { group: 'navMore', items: [
    { to: '/marketplace', key: 'navMarketplace' },
    { to: '/community', key: 'navCommunity' },
  ]},
  { group: 'navAccount', items: [
    { to: '/profile', key: 'navProfile' },
  ]},
]

export default function AppShell({ titleKey, titleFallback, actions, children, extraCss }) {
  const { toggleLang } = useI18n()
  const [open, setOpen] = useState(true)

  return (
    <div className={open ? 'app sidebar-open' : 'app'}>
      {extraCss}
      <aside className="sidebar">
        <div>
          <Brand />
          <nav>
            {NAV.map((g) => (
              <span key={g.group}>
                <div className="nav-group-label"><T k={g.group} /></div>
                {g.items.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) => (isActive ? 'active' : '')}
                  >
                    <span className="dot"></span>
                    <span><T k={item.key} /></span>
                  </NavLink>
                ))}
              </span>
            ))}
          </nav>
        </div>
        <div className="sidebar-foot">
          <button
            className="lang-toggle"
            onClick={toggleLang}
            style={{ width: '100%', color: '#fff', borderColor: 'rgba(255,255,255,0.3)', marginBottom: 14 }}
          >
            اردو / EN
          </button>
          <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="user-chip link">
              <div className="av"></div>
              <div>
                <div className="name"><T k="userName" /></div>
                <div className="role"><T k="userRole" /></div>
              </div>
            </div>
          </Link>
        </div>
      </aside>

      <div className="sidebar-overlay"></div>

      <div className="main">
        <div className="topbar-inner">
          <div className="page-title-group">
            <button className="menu-toggle" aria-label="Toggle menu" onClick={() => setOpen((v) => !v)}>
              <span></span>
            </button>
            <div className="page-title">{titleKey ? <T k={titleKey} /> : titleFallback}</div>
          </div>
          <div className="topbar-actions">{actions}</div>
        </div>
        {children}
      </div>
    </div>
  )
}
