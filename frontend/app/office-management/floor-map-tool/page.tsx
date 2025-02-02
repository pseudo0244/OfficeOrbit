"use client"

import { useParams } from "next/navigation"
import FloorMapTool from "@/components/ui/FloorMapTool"

export default function FloorPage() {
  const { floor } = useParams()

  // Ensure floor is a valid number before passing it to FloorMapTool
  const floorNumber = Number(floor) // Using Number() instead of parseInt()

  if (isNaN(floorNumber)) {
    return <div>Error: Invalid floor number</div> // Handle invalid cases
  }

  return (
    <div className="p-6">
      <FloorMapTool floor={floorNumber} />
    </div>
  )
}
