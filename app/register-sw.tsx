/**
 * RegisterSW.tsx
 *
 * Ce composant enregistre un Service Worker et affiche une notification
 * d'installation si l'application est installable en PWA.
 *
 * ✅ À utiliser à la racine de l’application (ex: dans RootLayout).
 * ✅ Nécessite que le fichier `/service-worker.js` existe à la racine publique.
 */

import { useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"

export function RegisterSW() {
  const { toast } = useToast()

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/service-worker.js")
          .then((registration) => {
            console.log("Service Worker registered with scope:", registration.scope)
          })
          .catch((error) => {
            console.error("Service Worker registration failed:", error)
          })
      })
    }

    let deferredPrompt: any
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault()
      deferredPrompt = e

      toast({
        title: "Install MotoMaintain AI",
        description: "Install this app on your device for offline access",
        action: (
          <button
            className="bg-primary text-primary-foreground px-3 py-1.5 text-xs rounded-md"
            onClick={() => {
              deferredPrompt.prompt()
              deferredPrompt.userChoice.then((choiceResult: any) => {
                if (choiceResult.outcome === "accepted") {
                  console.log("User accepted the install prompt")
                }
                deferredPrompt = null
              })
            }}
          >
            Install
          </button>
        ),
        duration: 10000,
      })
    })
  }, [toast])

  return null
}
