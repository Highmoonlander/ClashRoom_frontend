export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file1 = formData.get("file1") as File
    const file2 = formData.get("file2") as File

    if (!file1 || !file2) {
      return Response.json({ error: "Both files are required" }, { status: 400 })
    }

    // Create FormData for backend request
    const backendFormData = new FormData()
    backendFormData.append("file1", file1)
    backendFormData.append("file2", file2)
// process.env.NEXT_PUBLIC_API_URL ||
    const apiUrl =  "http://localhost:8000"
    const response = await fetch(`${apiUrl}/get_diff`, {
      method: "POST",
      body: backendFormData,
    })

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`)
    }

    const data = await response.json()
    return Response.json(data)
  } catch (error) {
    console.error("Get diff API error:", error)
    return Response.json({ error: "Comparison failed" }, { status: 500 })
  }
}
