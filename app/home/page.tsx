/**
 * HomePage component
 *
 * Displays a summary view of the user's active motorcycle, with image,
 * maintenance tasks, and quick actions. Redirects to onboarding if no data.
 *
 * Data fetching:
 * - Relies on `useMotorcycles` hook to load motorcycles and update them.
 * - Replace the router push (`useRouter`) with `react-router-dom`’s `useNavigate`.
 */

import { useState } from "react"
import {
  BikeIcon as Motorcycle,
  ChevronLeft,
  ChevronRight,
  Wrench,
  Upload,
  Calendar,
  Clock,
} from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MobileNav } from "@/components/mobile-nav"
import { useMotorcycles } from "@/hooks/use-motorcycles"
import { useToast } from "@/components/ui/use-toast"

export function HomePage() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { motorcycles, isLoading, updateMotorcycle } = useMotorcycles()
  const [activeIndex, setActiveIndex] = useState(0)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="animate-pulse flex flex-col items-center">
          <Motorcycle className="h-12 w-12 text-primary mb-4" />
          <p className="text-muted-foreground">Loading your garage...</p>
        </div>
      </div>
    )
  }

  if (motorcycles.length === 0) {
    navigate("/onboarding")
    return null
  }

  const activeBike = motorcycles[activeIndex]

  const nextBike = () => {
    setActiveIndex((prev) => (prev + 1) % motorcycles.length)
  }

  const prevBike = () => {
    setActiveIndex((prev) => (prev - 1 + motorcycles.length) % motorcycles.length)
  }

  const handleCompleteTask = async (taskId: string) => {
    const updatedTasks = activeBike.maintenanceItems.map((item) =>
      item.id === taskId
        ? { ...item, completed: true, completedDate: new Date().toISOString() }
        : item,
    )

    const updatedMotorcycle = {
      ...activeBike,
      maintenanceItems: updatedTasks,
      lastUpdated: new Date().toISOString(),
    }

    await updateMotorcycle(updatedMotorcycle)

    toast({
      title: "Task completed",
      description: "Maintenance task marked as completed",
    })
  }

  const upcomingTasks = activeBike.maintenanceItems
    .filter((item) => !item.completed)
    .sort((a, b) => {
      const aMileage = activeBike.mileage % a.intervalMiles
      const bMileage = activeBike.mileage % b.intervalMiles
      return aMileage - bMileage
    })

  return (
    <>
      <div className="pb-24">
        <div className="relative w-full h-64 bg-muted">
          {activeBike.image ? (
            <img
              src={activeBike.image}
              alt={`${activeBike.make} ${activeBike.model}`}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-primary/10">
              <Motorcycle className="h-20 w-20 text-primary/50" />
            </div>
          )}

          {motorcycles.length > 1 && (
            <div className="absolute inset-x-0 bottom-0 flex justify-between items-center p-4">
              <Button
                size="icon"
                variant="secondary"
                className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm"
                onClick={prevBike}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="bg-black/50 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm">
                {activeIndex + 1} / {motorcycles.length}
              </div>
              <Button
                size="icon"
                variant="secondary"
                className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm"
                onClick={nextBike}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>

        <div className="container py-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">
                {activeBike.make} {activeBike.model}
              </h1>
              <div className="flex items-center gap-3 text-muted-foreground">
                <span>{activeBike.year}</span>
                <span>•</span>
                <span>{activeBike.mileage.toLocaleString()} mi</span>
              </div>
            </div>
            <Link to={`/motorcycle/${activeBike.id}`} className="text-primary text-sm">
              Edit
            </Link>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold flex items-center">
                <Wrench className="h-5 w-5 mr-2 text-primary" />
                Maintenance
              </h2>
              <Link to={`/motorcycle/${activeBike.id}`} className="text-primary text-sm">
                View All
              </Link>
            </div>

            {upcomingTasks.length > 0 ? (
              <div className="space-y-3">
                {upcomingTasks.slice(0, 3).map((task) => (
                  <Card key={task.id} className="p-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h4 className="font-medium text-sm">{task.title}</h4>
                        <p className="text-xs text-muted-foreground">{task.description}</p>
                        <div className="flex items-center mt-1 text-xs">
                          <span className="text-primary font-medium">
                            {(task.intervalMiles - (activeBike.mileage % task.intervalMiles)).toLocaleString()} miles
                            left
                          </span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 text-xs shrink-0"
                        onClick={() => handleCompleteTask(task.id)}
                      >
                        Complete
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-4">
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="bg-muted rounded-full p-3">
                    <Upload className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">No maintenance tasks yet</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Upload a service manual to generate maintenance tasks
                    </p>
                  </div>
                  <Button className="mt-2" size="sm" onClick={() => navigate("/upload-manual")}>
                    Upload Manual
                  </Button>
                </div>
              </Card>
            )}
          </div>

          {activeBike.maintenanceItems.length > 0 && (
            <Card>
              <CardContent className="p-4 space-y-3">
                <h3 className="font-medium">Maintenance Overview</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center p-2 bg-muted/50 rounded-lg">
                    <Clock className="h-4 w-4 mr-2 text-orange-500" />
                    <div>
                      <div className="text-sm font-medium">{upcomingTasks.length}</div>
                      <div className="text-xs text-muted-foreground">Upcoming</div>
                    </div>
                  </div>
                  <div className="flex items-center p-2 bg-muted/50 rounded-lg">
                    <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                    <div>
                      <div className="text-sm font-medium">
                        {activeBike.maintenanceItems.filter((item) => item.completed).length}
                      </div>
                      <div className="text-xs text-muted-foreground">Completed</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <MobileNav />
    </>
  )
}
