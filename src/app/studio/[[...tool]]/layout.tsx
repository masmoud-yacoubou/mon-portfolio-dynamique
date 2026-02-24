// src/app/studio/layout.tsx
export const metadata = {
  title: 'Sanity Studio',
  description: 'Gestion du contenu',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}