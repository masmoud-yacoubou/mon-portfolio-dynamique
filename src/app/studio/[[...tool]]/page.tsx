"use client"

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'
import { useEffect, useState } from 'react'

export default function StudioPage() {
  const [mounted, setMounted] = useState(false)

  // On attend que le composant soit monté côté client 
  // avant d'afficher le Studio. Cela règle l'erreur <noscript>.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-white">
      <NextStudio config={config} />
    </div>
  )
}