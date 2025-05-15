import React from 'react'
import { useLocale } from 'next-intl'

const Loading = () => {
  const locale = useLocale()
  const Arabic = locale === 'ar'

  return (
    <div className="flex items-center justify-center h-[80vh] bg-white dark:bg-black">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          {Arabic ? 'جاري التحميل...' : 'Loading...'}
        </p>
      </div>
    </div>
  )
}

export default Loading