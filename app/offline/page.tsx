/**
 * OfflinePage component
 *
 * This component displays an offline fallback state with an icon, description,
 * and a button to retry navigation to the homepage.
 *
 * To handle reconnection or retries, consider managing network status with a
 * custom hook or an event listener on `window.navigator.onLine`.
 */

import { WifiOff } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/empty-state"

export function OfflinePage() {
  return (
    <div className="container py-12 flex items-center justify-center min-h-screen">
      <EmptyState
        title="You're offline"
        description="Please check your internet connection and try again."
        icon={<WifiOff className="h-12 w-12" />}
        action={
          <Button asChild>
            <Link to="/">Try Again</Link>
          </Button>
        }
      />
    </div>
  )
}
