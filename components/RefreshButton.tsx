'use client'

import useRefresh from 'hooks/useRefresh'
import { useState } from 'react'

export default function RefreshButton({ buttonStyles = '' }) {
  const { isAdmin, handleRefresh, refreshError } = useRefresh()

  return (
    <>
      {!isAdmin && !refreshError && (
        <button onClick={handleRefresh} className={buttonStyles}>
          🔄
        </button>
      )}
      {refreshError && <p className="text-xs text-orange">⚠️ {refreshError}</p>}
    </>
  )
}
