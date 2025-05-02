/**
 * SplashScreen.tsx
 *
 * Ce composant agit comme un écran de chargement qui redirige l’utilisateur
 * vers l’onboarding ou la page d’accueil selon qu’il possède des motos enregistrées.
 *
 * ✅ Appels de données gérés via le hook `useMotorcycles`.
 * ✅ Redirection assurée via `useNavigate` de react-router-dom.
 */

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { BikeIcon as Motorcycle } from "lucide-react"

import { useMotorcycles } from "@/hooks/use-motorcycles"
import { MobileNav } from "@/components/mobile-nav"

export function SplashScreen() {
  const navigate = useNavigate()
  const { motorcycles, isLoading } = useMotorcycles()
  const [isRedirecting, setIsRedirecting] = useState(false)

  useEffect(() => {
    if (isLoading) return

    const timer = setTimeout(() => {
      setIsRedirecting(true)

      if (motorcycles.length === 0) {
        navigate("/onboarding")
      } else {
        navigate("/home")
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [isLoading, motorcycles, navigate])

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-white">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 p-6 rounded-full">
              <Motorcycle className="h-16 w-16 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">MotoMaintain AI</h1>
          <p className="text-muted-foreground mb-8">
            Your motorcycle maintenance assistant
          </p>

          <div
            className={`transition-opacity duration-300 ${
              isRedirecting ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          </div>
        </div>
      </div>
      <MobileNav />
    </>
  )
}
