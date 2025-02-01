"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

interface Office {
  id: number
  name: string
  address: string
  floors: number
  image: string
}

export default function OfficePage({ params }: { params: { officeId: string } }) {
  const router = useRouter()
  const [office, setOffice] = useState<Office | null>(null)

  useEffect(() => {
    // In a real application, you would fetch the office data from an API
    // For now, we'll use mock data
    const mockOffice: Office = {
      id: Number.parseInt(params.officeId),
      name: "Sample Office",
      address: "123 Main St, City, Country",
      floors: 5,
      image: "/placeholder.png",
    }
    setOffice(mockOffice)
  }, [params.officeId])

  const handleFloorClick = (floorNumber: number) => {
    router.push(`/offices/${params.officeId}/floors/${floorNumber}`)
  }

  if (!office) {
    return <div className="ml-64 p-8">Loading...</div>
  }

  return (
    <div className="ml-64 p-8">
      <h1 className="text-3xl font-bold mb-8">{office.name}</h1>
      <p className="text-gray-600 mb-4">{office.address}</p>
      <h2 className="text-2xl font-semibold mb-4">Floors</h2>
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: office.floors }, (_, i) => i + 1).map((floorNumber) => (
          <Button key={floorNumber} onClick={() => handleFloorClick(floorNumber)}>
            Floor {floorNumber}
          </Button>
        ))}
      </div>
    </div>
  )
}

