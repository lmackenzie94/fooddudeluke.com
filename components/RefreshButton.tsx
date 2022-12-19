'use client'

import useRefresh from 'hooks/useRefresh'

export default function RefreshButton({ buttonStyles = '' }) {
  const { isAdmin, handleRefresh, refreshError } = useRefresh()

  return (
    <>
      {isAdmin && !refreshError && (
        <button onClick={handleRefresh} className={buttonStyles}>
          🔄
        </button>
      )}
      {refreshError && <p className="text-xs text-orange">⚠️ {refreshError}</p>}
    </>
  )
}
