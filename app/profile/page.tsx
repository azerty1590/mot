/**
 * ProfilePage component
 *
 * This component allows users to manage their application settings such as theme,
 * notifications, and offline mode. It also displays app information.
 *
 * The theme switch is implemented using a local theme hook (`useLocalTheme`)
 * as a replacement for `next-themes`.
 */

import { useState, useEffect } from "react"
import { MoonIcon, SunIcon, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { MobileNav } from "@/components/mobile-nav"

/**
 * Custom hook to manage theme using localStorage.
 * This replaces `next-themes` for basic dark/light toggling.
 */
function useLocalTheme() {
  const [theme, setThemeState] = useState<"light" | "dark">("light")

  useEffect(() => {
    const stored = localStorage.getItem("theme")
    if (stored === "dark" || stored === "light") {
      setThemeState(stored)
      document.documentElement.classList.toggle("dark", stored === "dark")
    }
  }, [])

  const setTheme = (nextTheme: "light" | "dark") => {
    localStorage.setItem("theme", nextTheme)
    document.documentElement.classList.toggle("dark", nextTheme === "dark")
    setThemeState(nextTheme)
  }

  return { theme, setTheme }
}

export function ProfilePage() {
  const { theme, setTheme } = useLocalTheme()

  return (
    <>
      <div className="container py-4 space-y-4 pb-24">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5" />
            <h1 className="text-xl font-bold">Profile</h1>
          </div>
        </header>

        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-lg">App Settings</CardTitle>
            <CardDescription>Customize your app experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center">
                  {theme === "dark" ? (
                    <MoonIcon className="h-4 w-4 mr-2" />
                  ) : (
                    <SunIcon className="h-4 w-4 mr-2" />
                  )}
                  <span className="font-medium">Theme</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Switch between light and dark mode
                </p>
              </div>
              <Switch
                checked={theme === "dark"}
                onCheckedChange={(checked) =>
                  setTheme(checked ? "dark" : "light")
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="font-medium">Notifications</span>
                <p className="text-xs text-muted-foreground">
                  Receive maintenance reminders
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="font-medium">Offline Mode</span>
                <p className="text-xs text-muted-foreground">
                  Save data for offline use
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-lg">About</CardTitle>
            <CardDescription>App information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <h3 className="font-medium text-sm">MotoMaintain AI</h3>
              <p className="text-xs text-muted-foreground">Version 1.0.0</p>
              <p className="text-xs text-muted-foreground mt-2">
                AI-powered motorcycle maintenance tracking application. Upload
                your service manual and let AI generate your maintenance
                schedule.
              </p>
            </div>

            <div className="pt-2">
              <Button variant="outline" className="w-full text-sm" size="sm">
                Send Feedback
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <MobileNav />
    </>
  )
}
