import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'

const I18nContext = createContext(null)

function storageKey(pathname) {
  return pathname === '/' ? 'zf_lang_home' : 'zf_lang_app'
}

export function I18nProvider({ translations, children }) {
  const { pathname } = useLocation()
  const key = storageKey(pathname)
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem(key) || 'en'
    } catch {
      return 'en'
    }
  })

  useEffect(() => {
    try {
      setLang(localStorage.getItem(key) || 'en')
    } catch {
      setLang('en')
    }
  }, [key])

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang === 'ur' ? 'ur' : 'en')
    document.documentElement.setAttribute('dir', lang === 'ur' ? 'rtl' : 'ltr')
  }, [lang])

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next = prev === 'ur' ? 'en' : 'ur'
      try {
        localStorage.setItem(key, next)
      } catch {
        /* ignore */
      }
      return next
    })
  }, [key])

  const t = useCallback(
    (k) => {
      const dict = translations?.[lang] || translations?.en || {}
      if (dict[k] !== undefined) return dict[k]
      return translations?.en?.[k] ?? k
    },
    [lang, translations],
  )

  const value = useMemo(
    () => ({ lang, setLang, toggleLang, t, translations }),
    [lang, toggleLang, t, translations],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  return useContext(I18nContext)
}

export function T({ k }) {
  const { t } = useI18n()
  return t(k)
}

export function Html({ as: Tag = 'span', k, ...rest }) {
  const { t } = useI18n()
  return <Tag {...rest} dangerouslySetInnerHTML={{ __html: t(k) }} />
}
