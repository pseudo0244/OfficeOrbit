'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import AddOffice from "./AddOffice";
import OldOfficeForm from "./OldOfficeForm";

interface Office {
  name: string;
  address: string;
  floors: { floorNumber: number; map: string | null }[];
}

interface Building {
  _id: string;
  name: string;
  address: string;
  floors: { floorNumber: number; map: string | null }[];
}

export default function OfficeDashboard() {
  const [showAddOffice, setShowAddOffice] = useState(false);
  const [officeType, setOfficeType] = useState<"old" | "new" | null>(null);
  const [offices, setOffices] = useState<Building[]>([]);
  const router = useRouter();

  // Load offices from the backend API
  useEffect(() => {
    fetch("http://localhost:5000/api/buildings/all")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setOffices(data.data);
        }
      });
  }, []);

  const handleAddOffice = (office: Office) => {
    setOffices((prevOffices) => [...prevOffices, office]);
  };

  const handleDeleteOffice = async (buildingId: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/buildings/delete/${buildingId}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (data.success) {
        // Update the local state to remove the office from the list
        setOffices((prevOffices) => prevOffices.filter((office) => office._id !== buildingId));
      } else {
        alert('Failed to delete office');
      }
    } catch (error) {
      console.error("Error deleting office:", error);
      alert('Error deleting office');
    }
  };

  const handleEditOffice = (index: number, updatedOffice: Office) => {
    const updatedOffices = [...offices];
    updatedOffices[index] = updatedOffice;
    setOffices(updatedOffices);
  };

  const handleGoToFloor = async (buildingId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/buildings/get/${buildingId}`);
      const data = await response.json();

      if (data.success) {
        router.push(`/office-management/floors/${buildingId}`);
      } else {
        alert("Building not found");
      }
    } catch (error) {
      console.error("Error fetching building:", error);
      alert("Error fetching building data");
    }
  };

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
              <li key={office._id} className="border p-4 mb-4 rounded-lg">
                <div className="font-semibold">{office.name}</div>
                <div>{office.address}</div>
                <div className="mt-2 space-x-4">
                  <Button onClick={() => handleEditOffice(index, office)}>Edit</Button>
                  <Button variant="destructive" onClick={() => handleDeleteOffice(office._id)}>
                    Delete
                  </Button>
                  <Button onClick={() => handleGoToFloor(office._id)}>
                    Go to Floors
                  </Button>
                </div>

                {/* Render Floors if available */}
                {office.floors.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-semibold">Floors:</h3>
                    <ul>
                      {office.floors.map((floor, floorIndex) => (
                        <li key={floorIndex} className="ml-4">
                          Floor {floor.floorNumber}
                          {floor.map && (
                            <div className="text-sm text-gray-500">Map: {floor.map}</div>
                          )}
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
  );
}
