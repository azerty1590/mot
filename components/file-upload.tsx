"use client"

import type React from "react"

import { useState } from "react"
import { FileText, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface FileUploadProps {
  onUpload: (file: File) => Promise<void>
  isProcessing: boolean
  accept?: string
}

export function FileUpload({ onUpload, isProcessing, accept = ".pdf" }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [progress, setProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFile = e.dataTransfer.files?.[0]
    if (droppedFile) {
      setFile(droppedFile)
    }
  }

  const handleUpload = async () => {
    if (!file) return

    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 200)

    try {
      await onUpload(file)
      setFile(null)
      setProgress(0)
    } catch (error) {
      console.error("Upload failed:", error)
    } finally {
      clearInterval(interval)
    }
  }

  return (
    <div className="space-y-3">
      <div
        className={`border-2 border-dashed rounded-lg p-4 text-center ${
          isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/20"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="rounded-full bg-primary/10 p-2">
            <Upload className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-sm font-medium">Upload Service Manual</h3>
          <p className="text-xs text-muted-foreground max-w-xs">Tap to browse or drag and drop your PDF or image</p>

          <label htmlFor="file-upload" className="mt-1 w-full">
            <div className="bg-primary text-primary-foreground px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer text-center">
              Browse Files
            </div>
            <input
              id="file-upload"
              type="file"
              className="sr-only"
              accept={accept}
              onChange={handleFileChange}
              disabled={isProcessing}
            />
          </label>
        </div>
      </div>

      {file && (
        <div className="border rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="rounded-full bg-primary/10 p-1.5">
                <FileText className="h-3.5 w-3.5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-medium">{file.name}</p>
                <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>

            <Button size="sm" onClick={handleUpload} disabled={isProcessing} className="h-7 text-xs">
              {isProcessing ? "Processing..." : "Upload"}
            </Button>
          </div>

          {progress > 0 && <Progress value={progress} className="mt-3 h-1.5" />}
        </div>
      )}

      {isProcessing && (
        <div className="text-center py-2">
          <div className="animate-pulse text-xs text-muted-foreground">Processing your service manual with AI...</div>
        </div>
      )}
    </div>
  )
}
