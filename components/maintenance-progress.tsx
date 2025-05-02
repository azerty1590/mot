import { CheckCircle, Clock } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import type { Motorcycle } from "@/types"

interface MaintenanceProgressProps {
  motorcycle: Motorcycle
}

export function MaintenanceProgress({ motorcycle }: MaintenanceProgressProps) {
  // Calculate upcoming maintenance
  const upcomingTasks = motorcycle.maintenanceItems
    .filter((item) => !item.completed)
    .sort((a, b) => {
      const aMileage = motorcycle.mileage + a.intervalMiles
      const bMileage = motorcycle.mileage + b.intervalMiles
      return aMileage - bMileage
    })
    .slice(0, 3)

  // Calculate completion percentage
  const totalTasks = motorcycle.maintenanceItems.length
  const completedTasks = motorcycle.maintenanceItems.filter((item) => item.completed).length
  const completionPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  return (
    <div className="space-y-3">
      {totalTasks > 0 ? (
        <>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span>Maintenance Status</span>
              <span>
                {completedTasks}/{totalTasks} complete
              </span>
            </div>
            <Progress value={completionPercentage} className="h-1.5" />
          </div>

          <div className="space-y-1.5">
            {upcomingTasks.length > 0 ? (
              <>
                <h4 className="text-xs font-medium">Next up:</h4>
                {upcomingTasks.map((task) => {
                  const milesUntilDue = task.intervalMiles - (motorcycle.mileage % task.intervalMiles)
                  const isDueSoon = milesUntilDue < 500

                  return (
                    <div key={task.id} className="flex items-center justify-between text-xs">
                      <div className="flex items-center">
                        {isDueSoon ? (
                          <Clock className="h-3.5 w-3.5 mr-1 text-orange-500" />
                        ) : (
                          <CheckCircle className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                        )}
                        <span className={isDueSoon ? "text-orange-500 font-medium" : ""}>{task.title}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{milesUntilDue.toLocaleString()} mi left</span>
                    </div>
                  )
                })}
              </>
            ) : (
              <p className="text-xs text-muted-foreground">All maintenance tasks completed!</p>
            )}
          </div>
        </>
      ) : (
        <p className="text-xs text-muted-foreground">
          No maintenance tasks yet. Upload a service manual to get started.
        </p>
      )}
    </div>
  )
}
