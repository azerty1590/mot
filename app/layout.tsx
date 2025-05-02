/**
 * RootLayout.tsx
 *
 * Ce composant définit la structure racine de l’application React,
 * incluant le fournisseur de thème, le système de toast et l’enregistrement du service worker.
 *
 * ✅ À brancher dans index.html ou main.tsx selon l’environnement (Vite, CRA…).
 * ✅ Le chargement de la police "Inter" est à gérer globalement via index.html ou CSS.
 */

import React, { ReactNode } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { RegisterSW } from "./register-sw"

import "./globals.css"

type RootLayoutProps = {
  children: ReactNode
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* TODO: Déplacer ce contenu dans index.html */}
        <title>MotoMaintain AI</title>
        <meta name="description" content="AI-powered motorcycle maintenance tracking" />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="generator" content="v0.dev" />
        {/* Police Inter : gérer via import CSS ou balise <link> dans index.html */}
      </head>
      <body className="font-sans"> {/* className à ajuster si police Inter est configurée ailleurs */}
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <main className="min-h-screen bg-background">{children}</main>
          <Toaster />
          <RegisterSW />
        </ThemeProvider>
      </body>
    </html>
  )
}
