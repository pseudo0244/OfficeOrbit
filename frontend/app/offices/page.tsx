"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Edit, Trash } from "lucide-react"

interface Office {
  id: number
  name: string
  address: string
  floors: number
  image: string
}

export default function OfficesPage() {
  const router = useRouter()
  const [offices, setOffices] = useState<Office[]>([])
  const [newOffice, setNewOffice] = useState<Omit<Office, "id">>({
    name: "",
    address: "",
    floors: 1,
    image: "",
  })

  const handleAddOffice = () => {
    const officeWithId = { ...newOffice, id: Date.now() }
    setOffices([...offices, officeWithId])
    setNewOffice({ name: "", address: "", floors: 1, image: "" })
  }

  const handleDeleteOffice = (id: number) => {
    setOffices(offices.filter((office) => office.id !== id))
  }

  const handleEditOffice = (office: Office) => {
    // Implement edit functionality
  }

  const handleFloorClick = (officeId: number, floorNumber: number) => {
    router.push(`/offices/${officeId}/floors/${floorNumber}`)
  }

  return (
    <div className="ml-64 p-8">
      <h1 className="text-3xl font-bold mb-8">Manage Offices</h1>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-4">Add New Office</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Office</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Office Name</Label>
              <Input
                id="name"
                value={newOffice.name}
                onChange={(e) => setNewOffice({ ...newOffice, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={newOffice.address}
                onChange={(e) => setNewOffice({ ...newOffice, address: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="floors">Number of Floors</Label>
              <Input
                id="floors"
                type="number"
                value={newOffice.floors}
                onChange={(e) => setNewOffice({ ...newOffice, floors: Math.max(1, Number.parseInt(e.target.value)) })}
              />
            </div>
            <div>
              <Label htmlFor="image">Display Image URL</Label>
              <Input
                id="image"
                value={newOffice.image}
                onChange={(e) => setNewOffice({ ...newOffice, image: e.target.value })}
              />
            </div>
            <Button onClick={handleAddOffice}>Add Office</Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="grid md:grid-cols-3 gap-6">
        {offices.map((office) => (
          <div key={office.id} className="bg-white rounded-lg shadow-md p-6">
            <img
              src={office.image || "/placeholder.png"}
              alt={office.name}
              className="w-full h-40 object-cover mb-4 rounded"
            />
            <h2 className="text-xl font-semibold mb-2">{office.name}</h2>
            <p className="text-gray-600 mb-2">{office.address}</p>
            <p className="text-gray-600 mb-4">Floors: {office.floors}</p>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {Array.from({ length: office.floors }, (_, i) => i + 1).map((floorNumber) => (
                <Button key={floorNumber} variant="outline" onClick={() => handleFloorClick(office.id, floorNumber)}>
                  Floor {floorNumber}
                </Button>
              ))}
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => handleEditOffice(office)}>
                <Edit className="mr-2" size={16} />
                Edit
              </Button>
              <Button variant="destructive" onClick={() => handleDeleteOffice(office.id)}>
                <Trash className="mr-2" size={16} />
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

