/**
 * MotorcycleList.tsx
 *
 * Affiche une liste de motos sous forme de cartes cliquables avec image, infos et menu d’actions.
 *
 * ✅ Utilise `react-router-dom` pour les liens.
 * ✅ Utilise `img` HTML en remplacement de `next/image` pour la compatibilité.
 */

import { Gauge, MoreHorizontal } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Motorcycle } from "@/types"

interface MotorcycleListProps {
  motorcycles: Motorcycle[]
}

export function MotorcycleList({ motorcycles }: MotorcycleListProps) {
  return (
    <div className="space-y-2">
      {motorcycles.map((motorcycle) => (
        <div
          key={motorcycle.id}
          className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
        >
          <Link to={`/motorcycle/${motorcycle.id}`} className="flex-1 flex items-center gap-3">
            {motorcycle.image ? (
              <div className="relative h-12 w-16 rounded-md overflow-hidden shrink-0">
                <img
                  src={motorcycle.image || "/placeholder.svg"}
                  alt={`${motorcycle.make} ${motorcycle.model}`}
                  className="object-cover h-full w-full"
                />
              </div>
            ) : (
              <div className="h-12 w-16 bg-muted rounded-md flex items-center justify-center shrink-0">
                <Gauge className="h-6 w-6 text-muted-foreground" />
              </div>
            )}

            <div>
              <h3 className="font-medium text-sm">
                {motorcycle.make} {motorcycle.model}
              </h3>
              <p className="text-xs text-muted-foreground">
                {motorcycle.year} • {motorcycle.mileage.toLocaleString()} mi
              </p>
            </div>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to={`/motorcycle/${motorcycle.id}`}>View Details</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ))}
    </div>
  )
}
