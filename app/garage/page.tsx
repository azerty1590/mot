/**
 * GaragePage component
 *
 * Displays the user's list of motorcycles with search and add functionality.
 * It fetches data using the custom `useMotorcycles` hook.
 *
 * Data fetching:
 * - The `useMotorcycles` hook should encapsulate logic to call an external API or local storage.
 * - Replace it with a suitable `useEffect` + `useState` or use React Query if needed.
 */

import { useState } from "react"
import { BikeIcon as Motorcycle, Plus, Search } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { EmptyState } from "@/components/empty-state"
import { MotorcycleList } from "@/components/motorcycle-list"
import { MobileNav } from "@/components/mobile-nav"
import { useMotorcycles } from "@/hooks/use-motorcycles"
import { Card } from "@/components/ui/card"

export function GaragePage() {
  const { motorcycles, isLoading } = useMotorcycles()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredMotorcycles = motorcycles.filter(
    (motorcycle) =>
      motorcycle.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      motorcycle.model.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <>
      <div className="container py-4 space-y-4 pb-24">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Motorcycle className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-bold">Your Garage</h1>
          </div>
          <Button size="sm" asChild>
            <Link to="/add-motorcycle">
              <Plus className="mr-2 h-4 w-4" />
              Add Motorcycle
            </Link>
          </Button>
        </header>

        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search motorcycles..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {isLoading ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 rounded-lg bg-muted/50 animate-pulse" />
            ))}
          </div>
        ) : filteredMotorcycles.length === 0 ? (
          searchQuery ? (
            <EmptyState
              title="No results found"
              description="Try adjusting your search terms"
              icon={<Search className="h-10 w-10" />}
            />
          ) : (
            <EmptyState
              title="No motorcycles yet"
              description="Add your first motorcycle to get started with maintenance tracking."
              action={
                <Button asChild>
                  <Link to="/add-motorcycle">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Motorcycle
                  </Link>
                </Button>
              }
            />
          )
        ) : (
          <>
            <MotorcycleList motorcycles={filteredMotorcycles} />

            {/* Add motorcycle card at the bottom */}
            <Card className="border-dashed border-2 border-primary/30 bg-primary/5 p-4 flex flex-col items-center justify-center">
              <Plus className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-medium text-center mb-1">Add Another Motorcycle</h3>
              <p className="text-sm text-muted-foreground text-center mb-3">
                Add another motorcycle to your garage
              </p>
              <Button asChild>
                <Link to="/add-motorcycle">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Motorcycle
                </Link>
              </Button>
            </Card>
          </>
        )}
      </div>
      <MobileNav />
    </>
  )
}
