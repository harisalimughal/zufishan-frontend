import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import StaticPage from './components/StaticPage.jsx'

const routes = {
  '/': 'homepage.html', '/home': 'homepage.html', '/courses': 'course-catalogue.html',
  '/community': 'community.html', '/duas': 'duas.html', '/fatwa': 'fatwa.html',
  '/hifz': 'hifz-tracker.html', '/hijri': 'hijri-calendar.html', '/lesson': 'lesson-player.html',
  '/login': 'login.html', '/marketplace': 'marketplace.html', '/mushaf': 'mushaf.html',
  '/practice': 'practice-hub.html', '/profile': 'profile.html', '/signup': 'signup.html',
  '/zakat': 'zakat-calculator.html', '/teacher-dashboard': 'teacher-dashboard.html',
  '/teacher-profile': 'teacher-profile.html', '/vendor-dashboard': 'vendor-dashboard.html',
  '/admin-dashboard': 'admin-dashboard.html', '/vendor-profile': 'vendor-profile.html',
  '/admin-profile': 'admin-profile.html', '/ai-assistant': 'ai-assistant.html',
  '/sharia-audit-advisory': 'sharia-audit-advisory.html', '/zakat-management': 'zakat-management.html',
  '/corporate-trainings': 'corporate-trainings.html', '/enquiry': 'service-enquiry.html',
}

function App() {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    // Keeps the app in sync when the user uses the browser's back/forward buttons.
    const onPopState = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const page = routes[path] ?? 'homepage.html'
  return <motion.main initial={false}><StaticPage page={page} onNavigate={setPath} /></motion.main>
}

export default App
