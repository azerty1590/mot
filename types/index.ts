export interface Motorcycle {
  id: string
  make: string
  model: string
  year: number
  mileage: number
  maintenanceItems: MaintenanceTask[]
  lastUpdated: string
  image?: string
}

export interface MaintenanceTask {
  id: string
  title: string
  description: string
  intervalMiles: number
  intervalMonths: number
  completed: boolean
  completedDate?: string
  priority: "low" | "medium" | "high"
}
