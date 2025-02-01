"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import FloorMapTool from "@/components/ui/FloorMapTool"

export default function FloorPage({ params }: { params: { officeId: string; floorNumber: string } }) {
  const router = useRouter()
  const [officeName, setOfficeName] = useState("")

  useEffect(() => {
    // In a real application, you would fetch the office data from an API
    // For now, we'll use mock data
    setOfficeName("Sample Office")
  }, [])

  return (
    <div className="ml-64">
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-4">
          {officeName} - Floor {params.floorNumber}
        </h1>
        <Button onClick={() => router.push("/offices")} className="mb-4">
          Back to Offices
        </Button>
      </div>
      <FloorMapTool officeId={params.officeId} floorNumber={params.floorNumber} />
    </div>
  )
}

