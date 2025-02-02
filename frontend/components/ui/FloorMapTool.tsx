"use client"

import { useState, useEffect } from "react"
import { useMapPoints, type Point } from "../../../frontend/app/hooks/useMapPoints"
import CanvasMap from "@/components/ui/CanvasMap"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"

interface FloorMapToolProps {
  buildingId: string
  floorNumber: number
}

export default function FloorMapTool({ buildingId, floorNumber }: FloorMapToolProps) {
  const { points, addPoint, updatePoint, deletePoint } = useMapPoints(buildingId, floorNumber)
  const [selectedPoint, setSelectedPoint] = useState<Point | null>(null)
  const [isAddingPoint, setIsAddingPoint] = useState(false)
  const [newPoint, setNewPoint] = useState<Point>({ x: 0, y: 0, type: "seat", color: "red" })
  const [floorImage, setFloorImage] = useState<string | null>(null)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const fetchFloorData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5002/api/buildings/${buildingId}/floors/${floorNumber}`
        )
        const data = await response.json()

        if (data.success) {
          setFloorImage(data.data.map) // Assuming the API returns the map image URL
        }
      } catch (error) {
        console.error("Error fetching floor data:", error)
      }
    }

    fetchFloorData()
  }, [buildingId, floorNumber])

  const handleAddPoint = (x: number, y: number, type: string, color: string) => {
    addPoint({ x, y, type, color })
  }

  const handlePointClick = (point: Point) => {
    setSelectedPoint(point)
  }

  return (
    <div className="flex flex-col gap-4">
      <CanvasMap
        image={floorImage}
        points={points}
        zoom={zoom}
        pan={pan}
        onAddPoint={handleAddPoint}
        onSelectPoint={handlePointClick}
        activePointType="seat"
        activeColor="red"
      />
      <div className="flex gap-2">
        <Button onClick={() => setIsAddingPoint(true)}>
          <Plus />
        </Button>
        {selectedPoint && (
          <>
            <Button onClick={() => updatePoint(selectedPoint)}>Update</Button>
            <Button variant="destructive" onClick={() => deletePoint(selectedPoint)}>
              Delete
            </Button>
          </>
        )}
      </div>
    </div>
  )
}