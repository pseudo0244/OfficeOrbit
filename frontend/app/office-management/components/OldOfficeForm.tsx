"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import FloorList from "./FloorList"

interface OldOfficeFormProps {
  onAddOffice: (office: { name: string, address: string, floors: number }) => void
}

export default function OldOfficeForm({ onAddOffice }: OldOfficeFormProps) {
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [floors, setFloors] = useState(0)
  const [showFloors, setShowFloors] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddOffice({ name, address, floors })
    setShowFloors(true)
  }

  return (
    <div className="space-y-4">
      {!showFloors ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Office Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="floors">Number of Floors</Label>
            <Input
              id="floors"
              type="number"
              value={floors}
              onChange={(e) => setFloors(Number.parseInt(e.target.value))}
              required
              min={1}
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      ) : (
        <FloorList floors={floors} onFloorClick={() => {}} />
      )}
    </div>
  )
}
