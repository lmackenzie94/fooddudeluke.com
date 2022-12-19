'use client'

import { useEffect, useState } from 'react'

export default function useRefresh() {
  const [admin, setAdmin] = useState({
    isAdmin: false,
    token: '',
  })
  const [refreshError, setRefreshError] = useState<string>('')

  useEffect(() => {
    const isAdmin = localStorage.getItem('fdl-admin-token') ? true : false

    if (!isAdmin) {
      setAdmin({
        isAdmin: false,
        token: '',
      })
      return
    }

    const fdlAdminToken = localStorage.getItem('fdl-admin-token')

    setAdmin({
      isAdmin: true,
      token: fdlAdminToken,
    })
  }, [])

  const handleRefresh = async () => {
    const fdlAdminToken = admin.token
    try {
      const res = await fetch('/api/refresh', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${fdlAdminToken}`,
        },
      })

      const data = await res.json()

      // handle the 401 cases
      if (!res.ok) {
        throw new Error(data.message)
      }

      console.log('DATA', data)
      window.location.reload() // immediately reload to trigger rebuild

      // REMEMBER: 400 errors aren't caught by try/catch, must handle them manually
      // catch handles errors such as incorrect URLs, network errors, etc.
    } catch (e) {
      console.log('Fetch failed: ', e.message)
      setRefreshError(e.message)
    }
  }

  return { isAdmin: admin.isAdmin, handleRefresh, refreshError }
}
