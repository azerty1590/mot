/**
 * OnboardingPage component
 *
 * This component walks users through uploading or skipping the photo of their motorcycle
 * as the first onboarding step. It handles image preview, simulates an upload delay,
 * and stores the selected image in localStorage for the next step.
 *
 * Navigation is handled with react-router-dom's useNavigate.
 * Toasts are used for feedback (missing image, camera notice, etc.).
 */

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Camera, Upload, BikeIcon as Motorcycle, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

export function OnboardingPage() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [motorcycleImage, setMotorcycleImage] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)

    setTimeout(() => {
      const imageUrl = URL.createObjectURL(file)
      setMotorcycleImage(imageUrl)
      setIsUploading(false)
    }, 1000)
  }

  const handleContinue = () => {
    if (!motorcycleImage) {
      toast({
        title: "Image required",
        description:
          "Please upload a photo of your motorcycle to continue",
        variant: "destructive",
      })
      return
    }

    localStorage.setItem("tempMotorcycleImage", motorcycleImage)
    navigate("/add-motorcycle")
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-2">
              <div className="bg-primary/10 p-3 rounded-full">
                <Motorcycle className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl">Get Started</CardTitle>
            <CardDescription>
              Add your first motorcycle to begin
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="font-medium text-sm mb-1">
                Take a photo of your motorcycle
              </h3>
              <p className="text-xs text-muted-foreground">
                This helps us identify your motorcycle and personalize your
                maintenance schedule
              </p>
            </div>

            {motorcycleImage ? (
              <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                <img
                  src={motorcycleImage || "/placeholder.svg"}
                  alt="Your motorcycle"
                  className="object-cover w-full h-full"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute bottom-2 right-2"
                  onClick={() => setMotorcycleImage(null)}
                >
                  Change Photo
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-muted/20 hover:bg-muted/30">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-primary" />
                      <p className="mb-1 text-sm font-medium">
                        Upload photo
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG or HEIC
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isUploading}
                    />
                  </label>
                </div>

                <Button
                  variant="outline"
                  className="flex-1 h-24 flex flex-col gap-2"
                  disabled={isUploading}
                  onClick={() => {
                    toast({
                      title: "Camera access",
                      description:
                        "This would open your camera to take a photo",
                    })
                  }}
                >
                  <Camera className="h-6 w-6" />
                  <span>Take Photo</span>
                </Button>

                <Button
                  variant="outline"
                  className="flex-1 h-24 flex flex-col gap-2"
                  disabled={isUploading}
                  onClick={() => {
                    setMotorcycleImage(
                      "/placeholder.svg?height=400&width=600"
                    )
                  }}
                >
                  <Motorcycle className="h-6 w-6" />
                  <span>Skip for now</span>
                </Button>
              </div>
            )}

            {isUploading && (
              <div className="text-center py-2">
                <div className="animate-pulse text-sm text-muted-foreground">
                  Uploading your motorcycle photo...
                </div>
              </div>
            )}

            <div className="rounded-lg border p-3 bg-muted/20">
              <div className="flex items-center mb-2">
                <FileText className="h-4 w-4 mr-2 text-primary" />
                <h3 className="text-sm font-medium">
                  Have a service manual?
                </h3>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                Upload your motorcycle's service manual and our AI will
                create a personalized maintenance schedule for you.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => navigate("/upload-manual")}
              >
                Upload Service Manual
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              onClick={handleContinue}
              disabled={isUploading}
            >
              Continue with Photo
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
