"use client"

import { CheckCircle, Clock, Wrench } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { MaintenanceTask } from "@/types"

interface MaintenanceItemProps {
  task: MaintenanceTask
  currentMileage: number
  onComplete?: () => void
  completed?: boolean
}

export function MaintenanceItem({ task, currentMileage, onComplete, completed = false }: MaintenanceItemProps) {
  const milesUntilDue = task.intervalMiles - (currentMileage % task.intervalMiles)
  const isDueSoon = milesUntilDue < 500

  return (
    <Card className={`p-3 ${completed ? "bg-muted/50" : ""}`}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center">
            {completed ? (
              <CheckCircle className="h-4 w-4 mr-1.5 text-green-500 shrink-0" />
            ) : isDueSoon ? (
              <Clock className="h-4 w-4 mr-1.5 text-orange-500 shrink-0" />
            ) : (
              <Wrench className="h-4 w-4 mr-1.5 text-blue-500 shrink-0" />
            )}
            <h4 className="font-medium text-sm">{task.title}</h4>
          </div>
          <p className="text-xs text-muted-foreground">{task.description}</p>

          {!completed && (
            <div className="flex items-center mt-1 text-xs text-muted-foreground">
              <span className="mr-3">Every {task.intervalMiles.toLocaleString()} miles</span>
              <span>
                Every {task.intervalMonths} {task.intervalMonths === 1 ? "month" : "months"}
              </span>
            </div>
          )}

          {completed && task.completedDate && (
            <div className="text-xs text-muted-foreground mt-1">
              Completed on {new Date(task.completedDate).toLocaleDateString()}
            </div>
          )}
        </div>

        {!completed && onComplete && (
          <Button size="sm" variant="outline" onClick={onComplete} className="h-7 text-xs shrink-0">
            Complete
          </Button>
        )}
      </div>
    </Card>
  )
}
