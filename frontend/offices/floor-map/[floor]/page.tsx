"use client"

import { useParams } from "next/navigation"
import FloorMapTool from "@/components/ui/FloorMapTool"

export default function FloorPage() {
  const { floor } = useParams()

  // Ensure floor is a valid number before passing it to FloorMapTool
  const floorNumber = Number(floor)

  if (isNaN(floorNumber)) {
    return <div className="p-6 text-red-500 text-center">Error: Invalid floor number</div>
  }

  return (
    <div className="p-6">
      <FloorMapTool />
    </div>
  )
}
