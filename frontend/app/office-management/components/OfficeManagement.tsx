"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import AddOffice from "./AddOffice"
import OldOfficeForm from "./OldOfficeForm"

interface Office {
  name: string
  address: string
  floors: number
}

export default function OfficeDashboard() {
  const [showAddOffice, setShowAddOffice] = useState(false)
  const [officeType, setOfficeType] = useState<"old" | "new" | null>(null)
  const [offices, setOffices] = useState<Office[]>([])
  const router = useRouter()

  // Load offices from localStorage when the component mounts
  useEffect(() => {
    const storedOffices = localStorage.getItem("offices")
    if (storedOffices) {
      setOffices(JSON.parse(storedOffices))
    }
  }, [])

  // Save offices to localStorage whenever the list changes
  useEffect(() => {
    if (offices.length > 0) {
      localStorage.setItem("offices", JSON.stringify(offices))
    }
  }, [offices])

  const handleAddOffice = (office: Office) => {
    setOffices((prevOffices) => [...prevOffices, office])
  }

  const handleDeleteOffice = (index: number) => {
    const updatedOffices = offices.filter((_, i) => i !== index)
    setOffices(updatedOffices)
  }

  const handleEditOffice = (index: number, updatedOffice: Office) => {
    const updatedOffices = [...offices]
    updatedOffices[index] = updatedOffice
    setOffices(updatedOffices)
  }

  const handleGoToFloor = (officeName: string, floors: number) => {
    // Redirect to the floor selection page for the selected office
    router.push(`/office-management/floor-list/${officeName}/${floors}`)
  }

  return (
    <div>
      {!showAddOffice && <Button onClick={() => setShowAddOffice(true)}>Add Offices</Button>}
      {showAddOffice && !officeType && <AddOffice onSelect={(type) => setOfficeType(type)} />}
      {officeType === "old" && <OldOfficeForm onAddOffice={handleAddOffice} />}
      {officeType === "new" && <p>Hello World</p>}

      <div className="mt-8">
        <h2 className="text-xl font-semibold">Offices</h2>
        <ul>
          {offices.length > 0 ? (
            offices.map((office, index) => (
              <li key={index} className="border p-4 mb-4 rounded-lg">
                <div className="font-semibold">{office.name}</div>
                <div>{office.address}</div>
                <div>{office.floors} Floors</div>
                <div className="mt-2 space-x-4">
                  <Button onClick={() => handleEditOffice(index, office)}>Edit</Button>
                  <Button variant="destructive" onClick={() => handleDeleteOffice(index)}>Delete</Button>
                  <Button onClick={() => handleGoToFloor(office.name, office.floors)}>Go to Floor</Button>
                </div>
              </li>
            ))
          ) : (
            <p>No offices added yet.</p>
          )}
        </ul>
      </div>
    </div>
  )
}
