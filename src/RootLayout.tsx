/**
 * RootLayout.tsx
 *
 * Composant racine de l'application React, avec support thème + toast + SW.
 */

import React, { ReactNode } from "react"


import "./globals.css"

type RootLayoutProps = {
  children: ReactNode
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        {/* À déplacer dans index.html dans un projet Vite */}
        <title>MotoMaintain AI</title>
        <meta name="description" content="AI-powered motorcycle maintenance tracking" />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="generator" content="v0.dev" />
      </head>
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <main className="min-h-screen bg-background">{children}</main>
          <Toaster />
          <RegisterSW />
        </ThemeProvider>
      </body>
    </html>
  )
}
