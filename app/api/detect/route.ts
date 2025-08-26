export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { entity_map, save_result } = body

    // In a real implementation, you would call your FastAPI backend here
    // const response = await fetch('http://your-backend:8000/detect', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ entity_map, save_result })
    // })

    // For demo purposes, return mock data based on input
    const mockResponse = {
      contradictions: [
        {
          entities: ["John Smith", "Dr. Johnson"],
          contradiction: "Same person referred to with different names and conflicting professional backgrounds",
          severity: "high" as const,
          context:
            "Entity appears as 'John Smith, software engineer' in paragraph 1 but as 'Dr. Johnson, medical researcher' in paragraph 3",
        },
        {
          entities: ["MIT", "Harvard"],
          contradiction: "Institution inconsistently identified across document sections",
          severity: "medium" as const,
          context:
            "Research location mentioned as 'MIT laboratory' initially but later referred to as 'Harvard research facility'",
        },
      ],
    }

    return Response.json(mockResponse)
  } catch (error) {
    return Response.json({ error: "Detection failed" }, { status: 500 })
  }
}
