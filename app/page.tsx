import { FileProcessor } from "@/components/file-processor"
import { DiffComparator } from "@/components/diff-comparator"
import { DataStructurer } from "@/components/data-structurer"
import { ThemeToggle } from "@/components/theme-toggle"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, FileText, GitCompare, Database } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 relative">
          <div className="absolute top-0 right-0">
            <ThemeToggle />
          </div>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Brain className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-sans font-bold text-foreground">AI Text Analysis Suite</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Advanced coreference resolution and contradiction detection powered by AI. Process documents, compare texts,
            and uncover insights with precision.
          </p>
        </div>

        {/* Main Interface */}
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="process" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="process" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Process
              </TabsTrigger>
              <TabsTrigger value="diff" className="flex items-center gap-2">
                <GitCompare className="h-4 w-4" />
                Compare
              </TabsTrigger>
              <TabsTrigger value="structure" className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                Structure
              </TabsTrigger>
            </TabsList>

            <TabsContent value="process" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    File Processing & Entity Extraction
                  </CardTitle>
                  <CardDescription>
                    Upload a document to perform coreference resolution, extract entities, and detect contradictions
                    with AI-powered analysis.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FileProcessor />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="diff" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GitCompare className="h-5 w-5 text-primary" />
                    Document Comparison
                  </CardTitle>
                  <CardDescription>
                    Compare two documents to identify added and removed content with detailed diff analysis.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DiffComparator />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="structure" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-primary" />
                    Data Structuring
                  </CardTitle>
                  <CardDescription>
                    Upload entity map files to convert them into structured markdown or JSON format for better
                    organization.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DataStructurer />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
