"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

interface Floor {
  floorNumber: number
  map: string | null
}

interface Building {
  _id: string
  name: string
  address: string
  floors: Floor[]
}

interface FloorListProps {
  buildingId: string
}

export default function FloorList({ buildingId }: FloorListProps) {
  const [building, setBuilding] = useState<Building | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetch(`http://localhost:5002/api/buildings/get/${buildingId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setBuilding(data.data)
        } else {
          console.error("Failed to fetch building data")
        }
      })
      .catch((error) => {
        console.error("Error fetching building data:", error)
      })
  }, [buildingId])

  const handleFloorClick = (floorNumber: number) => {
    const floorId = `${buildingId}-${floorNumber}` // Generate unique floor ID
    localStorage.setItem("selectedFloorId", floorId) // Save floor ID
    localStorage.setItem("selectedBuildingId", buildingId) // Save building ID
    localStorage.setItem("selectedFloorNumber", floorNumber.toString()) // Save floor number

    router.push(`/office-management/floor-map-tool/${buildingId}/${floorNumber}`)
  }

  if (!building) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">{building.name} - Floors</h2>
      <ul className="space-y-2">
        {building.floors.map((floor) => (
          <li key={floor.floorNumber}>
            <Button onClick={() => handleFloorClick(floor.floorNumber)}>Floor {floor.floorNumber}</Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
