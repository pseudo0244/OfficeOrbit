"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import AddOffice from "./AddOffice"
import OldOfficeForm from "./OldOfficeForm"

interface Office {
  name: string
  address: string
  floors: { floorNumber: number; map: string | null }[]
}

interface Building {
  _id: string
  name: string
  address: string
  floors: { floorNumber: number; map: string | null }[]
}

export default function OfficeDashboard() {
  const [showAddOffice, setShowAddOffice] = useState(false)
  const [officeType, setOfficeType] = useState<"old" | "new" | null>(null)
  const [offices, setOffices] = useState<Building[]>([])
  const [expandedOffice, setExpandedOffice] = useState<string | null>(null)
  const [viewFloorsOfficeId, setViewFloorsOfficeId] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetch("http://localhost:5002/api/buildings/all")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setOffices(data.data)
        }
      })
  }, [])

  const handleAddOffice = (office: Office) => {
    setOffices((prevOffices) => [...prevOffices, office as Building])
  }

  const handleDeleteOffice = async (buildingId: string) => {
    try {
      const res = await fetch(`http://localhost:5002/api/buildings/delete/${buildingId}`, {
        method: "DELETE",
      })

      const data = await res.json()

      if (data.success) {
        setOffices((prevOffices) => prevOffices.filter((office) => office._id !== buildingId))
      } else {
        alert("Failed to delete office")
      }
    } catch (error) {
      console.error("Error deleting office:", error)
      alert("Error deleting office")
    }
  }

  const handleOfficeClick = (officeId: string) => {
    setExpandedOffice(expandedOffice === officeId ? null : officeId)
  }

  const handleFloorClick = (buildingId: string, floorNumber: number) => {
    const floorId = `${buildingId}-${floorNumber}`; // Generate a unique floor ID
    localStorage.setItem("selectedFloorId", floorId); // Store in local storage
    console.log("Stored Floor ID:", floorId); // Debugging
    
    router.push(`/office-management/floor-map-tool/${buildingId}/${floorNumber}`);
  };
  

  const handleViewFloors = (buildingId: string) => {
    setViewFloorsOfficeId(viewFloorsOfficeId === buildingId ? null : buildingId)
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
            offices.map((office) => (
              <li key={office._id} className="border p-4 mb-4 rounded-lg">
                <div
                  className="font-semibold cursor-pointer hover:text-blue-600"
                  onClick={() => handleOfficeClick(office._id)}
                >
                  {office.name}
                </div>
                <div>{office.address}</div>

                <div className="mt-2 space-x-4">
                  <Button onClick={() => handleViewFloors(office._id)}>View Floors</Button>
                  <Button variant="destructive" onClick={() => handleDeleteOffice(office._id)}>
                    Delete
                  </Button>
                </div>

                {viewFloorsOfficeId === office._id && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold">Floors</h3>
                    <ul>
                      {office.floors.map((floor) => (
                        <li key={floor.floorNumber} className="mt-2">
                          <Button onClick={() => handleFloorClick(office._id, floor.floorNumber)}>
                            Floor {floor.floorNumber}
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
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