"use client"

import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Upload, Download, Loader2, FileText, X, AlertTriangle } from "lucide-react"
import { Switch } from "@/components/ui/switch"

interface ContradictionPair {
  s1: string
  s2: string
}

export function FileProcessor() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [saveResults, setSaveResults] = useState(true)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ContradictionPair[] | null>(null)
  const [progress, setProgress] = useState(0)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && (file.name.endsWith(".md") || file.name.endsWith(".txt"))) {
      setSelectedFile(file)
    } else if (file) {
      alert("Please select only .md or .txt files for processing")
    }
  }

  const removeFile = () => {
    setSelectedFile(null)
    const fileInput = document.getElementById("file-upload") as HTMLInputElement
    if (fileInput) fileInput.value = ""
  }

  const handleProcess = async () => {
    if (!selectedFile) return

    setLoading(true)
    setProgress(0)

    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 10, 90))
    }, 200)

    try {
      const formData = new FormData()
      formData.append("file", selectedFile)

      const response = await fetch("/api/process", {
        method: "POST",
        body: formData,
      })
      
      if (!response.ok) {
        throw new Error("Processing failed")
      }
      console.log(response)
      const data = await response.json()
      console.log(data.contradictions)

      setResult(data.contradictions) // ✅ correct
      setProgress(100)
    } catch (error) {
      console.error("Error processing file:", error)
      setResult([])
      setProgress(100)
    } finally {
      clearInterval(progressInterval)
      setLoading(false)
    }
  }

  const downloadResult = () => {
    if (!result) return
    const dataStr = JSON.stringify(result, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = "processing-result.json"
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="grid gap-4">
        <div className="space-y-4">
          <Label>Upload Document</Label>
          <div className="border-2 border-dashed border-sage-200 rounded-lg p-6 text-center hover:border-sage-300 transition-colors">
            {selectedFile ? (
              <div className="flex items-center justify-between bg-sage-50 rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-sage-600" />
                  <div className="text-left">
                    <p className="font-medium text-sage-900">{selectedFile.name}</p>
                    <p className="text-sm text-sage-600">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={removeFile} className="text-sage-600 hover:text-sage-800">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <Upload className="h-8 w-8 text-sage-400 mx-auto" />
                <div>
                  <Label htmlFor="file-upload" className="cursor-pointer">
                    <span className="text-sage-600 hover:text-sage-800 font-medium">Click to upload</span>
                    <span className="text-sage-500"> or drag and drop</span>
                  </Label>
                  <Input
                    id="file-upload"
                    type="file"
                    accept=".txt,.md"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
                <p className="text-xs text-sage-500">Supports TXT and MD files only</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Switch id="save-results" checked={saveResults} onCheckedChange={setSaveResults} />
          <Label htmlFor="save-results">Save results to file</Label>
        </div>

        <Button onClick={handleProcess} disabled={loading || !selectedFile} className="w-full">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing & Detecting Contradictions...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Process & Detect Contradictions
            </>
          )}
        </Button>
      </div>

      {/* Progress */}
      {loading && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Processing document...</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Contradiction Detection Results</h3>
            <Button onClick={downloadResult} variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>

          {result.length > 0 ? (
            <div className="space-y-4">
              {result.map((pair, index) => (
                <Card key={index} className="border-l-4 border-l-red-500">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      Contradiction {index + 1}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p><span className="font-medium">Statement 1:</span> {pair.s1}</p>
                      <p><span className="font-medium">Statement 2:</span> {pair.s2}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center text-gray-500">
                <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <p>No contradictions detected in the document.</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}