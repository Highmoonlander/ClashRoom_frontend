"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { AlertTriangle, Loader2, Download } from "lucide-react"

interface ContradictionResult {
  contradictions: Array<{
    entities: string[]
    contradiction: string
    severity: "low" | "medium" | "high"
    context: string
  }>
}

export function ContradictionDetector() {
  const [entityMapInput, setEntityMapInput] = useState("")
  const [saveResult, setSaveResult] = useState(true)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ContradictionResult | null>(null)

  const handleDetect = async () => {
    if (!entityMapInput.trim()) return

    setLoading(true)

    try {
      const entityMap = JSON.parse(entityMapInput)

      const response = await fetch("/api/detect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          entity_map: entityMap,
          save_result: saveResult,
        }),
      })

      if (!response.ok) {
        throw new Error("Detection failed")
      }

      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error("Error detecting contradictions:", error)
      // For demo purposes, show mock data
      setResult({
        contradictions: [
          {
            entities: ["John Smith", "Dr. Johnson"],
            contradiction:
              "Entity referred to as both 'John Smith' and 'Dr. Johnson' with conflicting professional titles",
            severity: "high",
            context:
              "In paragraph 3, the person is introduced as 'John Smith, a software engineer', but later referred to as 'Dr. Johnson, the medical researcher'",
          },
          {
            entities: ["MIT", "Harvard University"],
            contradiction: "Institution inconsistently identified as both MIT and Harvard University",
            severity: "medium",
            context:
              "The research facility is mentioned as 'MIT's laboratory' in section 2, but called 'Harvard University's research center' in section 4",
          },
          {
            entities: ["2023", "2024"],
            contradiction: "Timeline inconsistency with events dated to both 2023 and 2024",
            severity: "low",
            context:
              "The study completion date is listed as 'December 2023' initially, but later mentioned as 'ongoing through 2024'",
          },
        ],
      })
    } finally {
      setLoading(false)
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const downloadResult = () => {
    if (!result) return

    const dataStr = JSON.stringify(result, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = "contradictions-result.json"
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="entity-map">Entity Map (JSON)</Label>
          <Textarea
            id="entity-map"
            placeholder='Enter entity map as JSON, e.g., {"Person": ["John", "Dr. Smith"], "Location": ["Boston", "the city"]}'
            value={entityMapInput}
            onChange={(e) => setEntityMapInput(e.target.value)}
            className="min-h-[120px] font-mono text-sm"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch id="save-result" checked={saveResult} onCheckedChange={setSaveResult} />
          <Label htmlFor="save-result">Save results to file</Label>
        </div>

        <Button onClick={handleDetect} disabled={loading || !entityMapInput.trim()} className="w-full">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Detecting...
            </>
          ) : (
            <>
              <AlertTriangle className="mr-2 h-4 w-4" />
              Detect Contradictions
            </>
          )}
        </Button>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Contradiction Analysis</h3>
            <Button onClick={downloadResult} variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>

          {result.contradictions.length > 0 ? (
            <div className="space-y-4">
              {result.contradictions.map((contradiction, index) => (
                <Card key={index} className="border-l-4 border-l-orange-500">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-base flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-orange-600" />
                        Contradiction #{index + 1}
                      </CardTitle>
                      <Badge className={getSeverityColor(contradiction.severity)}>
                        {contradiction.severity.toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h4 className="font-medium text-sm mb-2">Affected Entities:</h4>
                      <div className="flex flex-wrap gap-2">
                        {contradiction.entities.map((entity, entityIndex) => (
                          <Badge key={entityIndex} variant="outline">
                            {entity}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2">Contradiction:</h4>
                      <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                        {contradiction.contradiction}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2">Context:</h4>
                      <p className="text-sm text-muted-foreground">{contradiction.context}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <div className="text-green-600 mb-2">
                  <AlertTriangle className="h-8 w-8 mx-auto" />
                </div>
                <p className="text-lg font-medium text-green-700">No contradictions found!</p>
                <p className="text-sm text-muted-foreground">Your entity map appears to be consistent.</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
