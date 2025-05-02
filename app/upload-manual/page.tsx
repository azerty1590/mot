/**
 * UploadManualPage component
 *
 * This page allows users to upload their motorcycle service manual (PDF or image)
 * to generate a personalized maintenance schedule using AI. The upload simulation
 * mimics backend processing and gives user feedback via toasts.
 *
 * The back navigation uses `react-router-dom`'s `Link`, and the file handling
 * logic should be replaced with actual API upload logic in production.
 */

import { useState } from "react"
import { ArrowLeft, FileText } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { FileUpload } from "@/components/file-upload"
import { MobileNav } from "@/components/mobile-nav"

export function UploadManualPage() {
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)

  const handleFileUpload = async (file: File) => {
    setIsProcessing(true)

    // Simulate upload/processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Manual processed",
      description:
        "Your service manual has been processed successfully. You can now view your maintenance schedule.",
    })

    setIsProcessing(false)
  }

  return (
    <>
      <div className="container py-4 pb-24">
        <div className="mb-4">
          <Button variant="ghost" size="sm" asChild className="p-0 h-8">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader className="py-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <CardTitle className="text-xl">Upload Service Manual</CardTitle>
            </div>
            <CardDescription>
              Upload your motorcycle's service manual to automatically generate
              a maintenance schedule
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <FileUpload
                onUpload={handleFileUpload}
                isProcessing={isProcessing}
                accept=".pdf,.jpg,.jpeg,.png"
              />

              <div className="rounded-lg border p-4 bg-muted/50">
                <h3 className="font-medium mb-2 text-sm">How it works</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Our AI will analyze your service manual to create a
                  personalized maintenance schedule for your motorcycle.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 shrink-0">
                      1
                    </span>
                    <span>
                      Upload your motorcycle's service manual PDF or images
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 shrink-0">
                      2
                    </span>
                    <span>
                      Our AI extracts maintenance intervals and procedures
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 shrink-0">
                      3
                    </span>
                    <span>
                      Get a personalized maintenance schedule for your
                      motorcycle
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <MobileNav />
    </>
  )
}
