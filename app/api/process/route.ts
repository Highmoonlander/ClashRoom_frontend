export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    console.log("Incoming formData:", formData)

    const file = formData.get("file") as File
    if (!file) {
      console.error("❌ No file received from client")
      return Response.json({ error: "File is required" }, { status: 400 })
    }

    console.log("✅ Got file:", file.name, file.size)

    // Forward to FastAPI
    const backendFormData = new FormData()
    backendFormData.append("file", file)
// process.env.NEXT_PUBLIC_API_URL ||
    const apiUrl =  "http://localhost:8000"
    console.log("➡️ Forwarding to backend:", apiUrl + "/process")

    const response = await fetch(`${apiUrl}/process`, {
      method: "POST",
      body: backendFormData,
    })

    console.log("⬅️ Backend response status:", response.status)

    if (!response.ok) {
      const text = await response.text()
      console.error("Backend error:", text)
      throw new Error(`Backend responded with status: ${response.status}`)
    }

    const data = await response.json()
    return Response.json(data)
  } catch (error) {
    console.error("Process API error:", error)
    return Response.json({ error: "Processing failed" }, { status: 500 })
  }
}