// app/office-management/FloorList.tsx
"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface FloorListProps {
  floors: number
}

export default function FloorList({ floors }: FloorListProps) {
  const router = useRouter()

  const handleFloorClick = (floor: number) => {
    // Use router.push for client-side navigation
    router.push(`/office-management/${floor}`)
  }

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold mb-4">Select a Floor</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {Array.from({ length: floors }, (_, i) => i + 1).map((floor) => (
          <Button key={floor} onClick={() => handleFloorClick(floor)} className="w-full">
            Floor {floor}
          </Button>
        ))}
      </div>
    </div>
  )
}
