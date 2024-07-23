'use client'
 
import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
 
const App = dynamic(() => import('../App'), { ssr: false })

const validRoutes = ["/", "/wrath", "/monitr"]
 
export function Client() {
  useEffect(() => {
    if (!validRoutes.includes(window.location.pathname)) {
      history.replaceState({}, "", "/")
    }
  }, [])

  return <App />
}