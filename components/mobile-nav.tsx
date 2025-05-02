/**
 * MobileNav.tsx
 *
 * Barre de navigation mobile fixe en bas de l’écran,
 * avec surlignage dynamique de la page active.
 *
 * ✅ `react-router-dom` est utilisé à la place de `next/link`.
 * ✅ Le chemin courant est extrait via `useLocation`.
 */

import { BikeIcon as Motorcycle, Home, User, FileText } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

import { cn } from "@/lib/utils"

interface MobileNavProps {
  currentPath?: string
}

export function MobileNav({ currentPath }: MobileNavProps) {
  const location = useLocation()
  const activePath = currentPath || location.pathname

  const navItems = [
    {
      name: "Home",
      href: "/home",
      icon: Home,
    },
    {
      name: "Garage",
      href: "/garage",
      icon: Motorcycle,
    },
    {
      name: "Manual",
      href: "/upload-manual",
      icon: FileText,
    },
    {
      name: "Profile",
      href: "/profile",
      icon: User,
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-md">
      <nav className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive =
            (item.href === "/home" && (activePath === "/home" || activePath === "/")) ||
            (item.href !== "/home" && activePath.startsWith(item.href)) ||
            (item.href === "/garage" && activePath.startsWith("/motorcycle/"))

          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex flex-col items-center justify-center py-4 px-2 w-full",
                isActive ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon
                className={cn("h-5 w-5 mb-1", isActive ? "text-primary" : "text-muted-foreground")}
              />
              <span className="text-xs">{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
