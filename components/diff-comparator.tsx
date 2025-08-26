"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GitCompare, Loader2, Plus, Minus, Upload, FileText, X } from "lucide-react"

interface DiffResult {
  added: string[]
  removed: string[]
}

export function DiffComparator() {
  const [selectedFile1, setSelectedFile1] = useState<File | null>(null)
  const [selectedFile2, setSelectedFile2] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<DiffResult | null>(null)

  const handleFile1Select = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile1(file)
    }
  }

  const handleFile2Select = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile2(file)
    }
  }

  const removeFile1 = () => {
    setSelectedFile1(null)
    const fileInput = document.getElementById("file1-upload") as HTMLInputElement
    if (fileInput) fileInput.value = ""
  }

  const removeFile2 = () => {
    setSelectedFile2(null)
    const fileInput = document.getElementById("file2-upload") as HTMLInputElement
    if (fileInput) fileInput.value = ""
  }

  const handleCompare = async () => {
    if (!selectedFile1 || !selectedFile2) return

    setLoading(true)

    try {
      const formData = new FormData()
      formData.append("file1", selectedFile1)
      formData.append("file2", selectedFile2)

      const response = await fetch("/api/get_diff", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Comparison failed")
      }

      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error("Error comparing files:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* First Document */}
        <div className="space-y-4">
          <Label>First Document</Label>
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center hover:border-gray-300 transition-colors">
            {selectedFile1 ? (
              <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-gray-600" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">{selectedFile1.name}</p>
                    <p className="text-sm text-gray-600">{(selectedFile1.size / 1024).toFixed(1)} KB</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={removeFile1} className="text-gray-600 hover:text-gray-800">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <Upload className="h-6 w-6 text-gray-400 mx-auto" />
                <div>
                  <Label htmlFor="file1-upload" className="cursor-pointer">
                    <span className="text-gray-600 hover:text-gray-800 font-medium">Upload first document</span>
                  </Label>
                  <input id="file1-upload" type="file" onChange={handleFile1Select} className="hidden" />
                </div>
                <p className="text-xs text-gray-500">Supports any file format</p>
              </div>
            )}
          </div>
        </div>

        {/* Second Document */}
        <div className="space-y-4">
          <Label>Second Document</Label>
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center hover:border-gray-300 transition-colors">
            {selectedFile2 ? (
              <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-gray-600" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">{selectedFile2.name}</p>
                    <p className="text-sm text-gray-600">{(selectedFile2.size / 1024).toFixed(1)} KB</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={removeFile2} className="text-gray-600 hover:text-gray-800">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <Upload className="h-6 w-6 text-gray-400 mx-auto" />
                <div>
                  <Label htmlFor="file2-upload" className="cursor-pointer">
                    <span className="text-gray-600 hover:text-gray-800 font-medium">Upload second document</span>
                  </Label>
                  <input id="file2-upload" type="file" onChange={handleFile2Select} className="hidden" />
                </div>
                <p className="text-xs text-gray-500">Supports any file format</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Button onClick={handleCompare} disabled={loading || !selectedFile1 || !selectedFile2} className="w-full">
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Comparing...
          </>
        ) : (
          <>
            <GitCompare className="mr-2 h-4 w-4" />
            Compare Documents
          </>
        )}
      </Button>

      {/* Results */}
{result && (
  <div className="grid gap-6 md:grid-cols-2">
    {/* Added Content */}
    <Card className="border-l-4 border-l-green-500">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2 text-green-700">
          <Plus className="h-4 w-4" />
          Added Content
          <Badge variant="secondary">{result?.added?.length ?? 0}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {result?.added && result.added.length > 0 ? (
            result.added.map((line, index) => (
              <div key={index} className="p-3 bg-green-50 border border-green-200 rounded-md">
                <p className="text-sm text-green-800">{line}</p>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground text-sm">No added content found</p>
          )}
        </div>
      </CardContent>
    </Card>

    {/* Removed Content */}
    <Card className="border-l-4 border-l-red-500">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2 text-red-700">
          <Minus className="h-4 w-4" />
          Removed Content
          <Badge variant="secondary">{result?.removed?.length ?? 0}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {result?.removed && result.removed.length > 0 ? (
            result.removed.map((line, index) => (
              <div key={index} className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-800">{line}</p>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground text-sm">No removed content found</p>
          )}
        </div>
      </CardContent>
    </Card>
  </div>

      )}
    </div>
  )
}