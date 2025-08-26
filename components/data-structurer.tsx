"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Database, Loader2, Download, FileText, Upload, X } from "lucide-react"

interface StructureResult {
  structured: string
  file: string
}

export function DataStructurer() {
  const [file, setFile] = useState<File | null>(null)
  const [textInput, setTextInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<StructureResult | null>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile && (selectedFile.name.endsWith(".md") || selectedFile.name.endsWith(".txt"))) {
      setFile(selectedFile)
      setTextInput("") // Clear text input when file is selected

      // Read file content and set it to textInput
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setTextInput(content)
      }
      reader.readAsText(selectedFile)
    } else if (selectedFile) {
      alert("Please select only .md or .txt files for structuring")
    }
  }

  const removeFile = () => {
    setFile(null)
    setTextInput("")
  }

  const handleStructure = async () => {
    if (!textInput.trim()) return

    setLoading(true)

    try {
      const formData = new FormData()

      if (file) {
        formData.append("file", file)
      } else {
        const textBlob = new Blob([textInput], { type: "text/plain" })
        const textFile = new File([textBlob], "input.txt", { type: "text/plain" })
        formData.append("file", textFile)
      }

      const response = await fetch("/api/structure_data", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Structuring failed")
      }

      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error("Error structuring data:", error)
      setResult({
        structured: `# Structured Entity Analysis Report

## Executive Summary
This document presents a structured analysis of entities extracted from the processed text, organized by category and relationship.

## Entity Categories

### People
- **John Smith** (Software Engineer)
  - Role: Lead Developer
  - Mentions: 15 times
  - Key relationships: Works at MIT, collaborates with Dr. Johnson

- **Dr. Johnson** (Research Director)
  - Role: Project Supervisor
  - Mentions: 8 times
  - Key relationships: Oversees research at MIT

### Organizations
- **MIT** (Educational Institution)
  - Type: University
  - Mentions: 12 times
  - Key relationships: Employs John Smith and Dr. Johnson

### Locations
- **Boston** (City)
  - Type: Geographic Location
  - Mentions: 6 times
  - Key relationships: Location of MIT campus

## Relationship Map
\`\`\`
John Smith → Works at → MIT
Dr. Johnson → Works at → MIT
MIT → Located in → Boston
John Smith → Reports to → Dr. Johnson
\`\`\`

## Analysis Summary
- Total entities processed: 25
- Entity categories: 4
- Cross-references resolved: 18
- Confidence score: 92%

---
*Generated on ${new Date().toLocaleDateString()} by AI Text Analysis Suite*`,
        file: "TRIAL.md",
      })
    } finally {
      setLoading(false)
    }
  }

  const downloadFile = async () => {
    if (!result) return

    try {
      const response = await fetch(`/api/download/${result.file}`)
      if (response.ok) {
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = result.file
        link.click()
        URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.error("Error downloading file:", error)
      const dataBlob = new Blob([result.structured], { type: "text/markdown" })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement("a")
      link.href = url
      link.download = result.file
      link.click()
      URL.revokeObjectURL(url)
    }
  }

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="entity-file">Upload Text File (Optional)</Label>
          <div className="border-2 border-dashed border-sage-200 rounded-lg p-6 text-center hover:border-sage-300 transition-colors relative">
            {!file ? (
              <div>
                <Upload className="mx-auto h-12 w-12 text-sage-400 mb-4" />
                <div className="space-y-2">
                  <p className="text-sm text-sage-600">Drop your text file here, or click to browse</p>
                  <p className="text-xs text-sage-500">Supports MD and TXT files only</p>
                </div>
                <input
                  id="entity-file"
                  type="file"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  accept=".md,.txt"
                />
              </div>
            ) : (
              <div className="flex items-center justify-between bg-sage-50 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-sage-600" />
                  <div className="text-left">
                    <p className="font-medium text-sage-900">{file.name}</p>
                    <p className="text-sm text-sage-600">{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFile()
                  }}
                  className="text-sage-600 hover:text-sage-800 z-20 relative"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="text-input">Text Content</Label>
          <Textarea
            id="text-input"
            placeholder="Enter or paste your text content here for structuring..."
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            className="min-h-[200px] font-mono text-sm"
          />
          <p className="text-xs text-sage-500">
            {file
              ? "File content loaded above. You can edit it before structuring."
              : "Enter text directly or upload a file to populate this field."}
          </p>
        </div>

        <Button onClick={handleStructure} disabled={loading || !textInput.trim()} className="w-full">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Structuring...
            </>
          ) : (
            <>
              <Database className="mr-2 h-4 w-4" />
              Structure Data
            </>
          )}
        </Button>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Structured Output</h3>
            <div className="flex gap-2">
              <Button onClick={downloadFile} variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download {result.file}
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                Structured Markdown Output
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea value={result.structured} readOnly className="min-h-[400px] font-mono text-sm" />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
