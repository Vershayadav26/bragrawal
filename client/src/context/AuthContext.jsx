import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import api from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('gis_user') || 'null')
    } catch {
      return null
    }
  })
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('gis_token')
    if (!token) {
      setReady(true)
      return
    }
    api
      .get('/auth/me')
      .then((res) => {
        setUser(res.data.user)
        localStorage.setItem('gis_user', JSON.stringify(res.data.user))
      })
      .catch(() => {
        setUser(null)
        localStorage.removeItem('gis_token')
        localStorage.removeItem('gis_user')
      })
      .finally(() => setReady(true))
  }, [])

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password })
    localStorage.setItem('gis_token', data.token)
    localStorage.setItem('gis_user', JSON.stringify(data.user))
    setUser(data.user)
    return data.user
  }

  const logout = () => {
    localStorage.removeItem('gis_token')
    localStorage.removeItem('gis_user')
    setUser(null)
  }

  const dashboardPath =
    user?.role === 'ADMIN' ? '/admin' : user?.role === 'TEACHER' ? '/teacher' : user?.role === 'STUDENT' ? '/student' : '/login'

  const value = useMemo(
    () => ({ user, ready, login, logout, dashboardPath }),
    [user, ready, dashboardPath],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
