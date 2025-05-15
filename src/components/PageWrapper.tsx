'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // تأخير ثانيتين

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <motion.div
          className="w-14 h-14 border-4 border-t-transparent border-amber-500 rounded-full animate-spin"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
        />
      </div>
    )
  }

  return <>{children}</>
}