/**
 * AddMotorcyclePage component
 *
 * Form interface to add a motorcycle to the user’s garage.
 * Handles image upload, basic details, and optional service manual processing.
 *
 * 🔧 Data logic: `addMotorcycle` and `motorcycles` must come from a custom hook (e.g. useMotorcycles).
 * 📦 Toasts and navigation should use React-compatible alternatives (e.g. react-router-dom for navigation).
 */

import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Camera, Upload } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { FileUpload } from "@/components/file-upload"
import { MobileNav } from "@/components/mobile-nav"
import { useMotorcycles } from "@/hooks/use-motorcycles"
import { generateId } from "@/lib/utils"
import { ResponsiveImage } from "@/components/ui/responsive-image"

export function AddMotorcyclePage() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { addMotorcycle, motorcycles } = useMotorcycles()
  const [isProcessing, setIsProcessing] = useState(false)
  const [motorcycleImage, setMotorcycleImage] = useState<string | null>(null)
  const [isFirstMotorcycle, setIsFirstMotorcycle] = useState(true)

  useEffect(() => {
    setIsFirstMotorcycle(motorcycles.length === 0)
  }, [motorcycles])

  useEffect(() => {
    const savedImage = localStorage.getItem("tempMotorcycleImage")
    if (savedImage) {
      setMotorcycleImage(savedImage)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const make = formData.get("make") as string
    const model = formData.get("model") as string
    const year = Number.parseInt(formData.get("year") as string)
    const mileage = Number.parseInt(formData.get("mileage") as string)

    if (!make || !model || !year || !mileage) {
      toast({
        title: "Missing information",
        description: "Please fill out all fields",
        variant: "destructive",
      })
      return
    }

    const motorcycle = {
      id: generateId(),
      make,
      model,
      year,
      mileage,
      maintenanceItems: [],
      lastUpdated: new Date().toISOString(),
      image: motorcycleImage || undefined,
    }

    await addMotorcycle(motorcycle)
    localStorage.removeItem("tempMotorcycleImage")

    toast({
      title: "Motorcycle added",
      description: "Your motorcycle has been added successfully",
    })

    navigate(isFirstMotorcycle ? "/home" : "/garage")
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const imageUrl = URL.createObjectURL(file)
    setMotorcycleImage(imageUrl)
  }

  const handleFileUpload = async (file: File) => {
    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Manual processed",
      description:
        "Your service manual has been processed successfully. You can now add your motorcycle details.",
    })

    setIsProcessing(false)
  }

  return (
    <>
      <div className="container py-4 pb-24">
        <div className="mb-4">
          <Button variant="ghost" size="sm" asChild className="p-0 h-8">
            <Link to={isFirstMotorcycle ? "/onboarding" : "/garage"}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-xl">
              {isFirstMotorcycle ? "Add Your First Motorcycle" : "Add Another Motorcycle"}
            </CardTitle>
            <CardDescription>Enter the details of your motorcycle</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Motorcycle Photo</Label>
                {motorcycleImage ? (
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                    <ResponsiveImage
                      src={motorcycleImage || "/placeholder.svg"}
                      alt="Your motorcycle"
                      className="object-cover"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute bottom-2 right-2"
                      type="button"
                      onClick={() => setMotorcycleImage(null)}
                    >
                      Change Photo
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer bg-muted/20 hover:bg-muted/30">
                      <div className="flex flex-col items-center justify-center pt-3 pb-3">
                        <Upload className="w-6 h-6 mb-1 text-primary" />
                        <p className="text-xs">Upload photo</p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>

                    <Button
                      variant="outline"
                      className="h-24 flex flex-col gap-1"
                      type="button"
                      onClick={() => {
                        toast({
                          title: "Camera access",
                          description: "This would open your camera to take a photo",
                        })
                      }}
                    >
                      <Camera className="h-6 w-6" />
                      <span className="text-xs">Take Photo</span>
                    </Button>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="make">Make</Label>
                <Input id="make" name="make" placeholder="Honda" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="model">Model</Label>
                <Input id="model" name="model" placeholder="CBR600RR" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    name="year"
                    type="number"
                    placeholder="2023"
                    inputMode="numeric"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mileage">Current Mileage</Label>
                  <Input
                    id="mileage"
                    name="mileage"
                    type="number"
                    placeholder="1200"
                    inputMode="numeric"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">
                {isFirstMotorcycle ? "Add Motorcycle" : "Add to Garage"}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t">
              <h3 className="text-sm font-medium mb-2">
                Upload Service Manual (Optional)
              </h3>
              <p className="text-xs text-muted-foreground mb-4">
                Upload your service manual to automatically generate maintenance tasks
              </p>
              <FileUpload
                onUpload={handleFileUpload}
                isProcessing={isProcessing}
                accept=".pdf,.jpg,.jpeg,.png"
              />
            </div>
          </CardContent>
        </Card>
      </div>
      <MobileNav />
    </>
  )
}
