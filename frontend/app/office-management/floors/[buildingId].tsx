'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/router"; // Import useRouter from 'next/router'

interface Floor {
  floorNumber: number;
  map: string | null;
}

interface Building {
  name: string;
  address: string;
  floors: Floor[];
}

export default function FloorList() {
  const router = useRouter();
  const { buildingId } = router.query; // Get buildingId from the query

  const [building, setBuilding] = useState<Building | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (router.isReady && buildingId) { // Check if the router is ready and buildingId is present
      console.log("Building ID:", buildingId);  // Debugging line

      setLoading(true);

      fetch(`http://localhost:5000/api/buildings/get/${buildingId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setBuilding(data.data);
          } else {
            console.error("No data found for this building ID");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching building data:", error);
          setLoading(false);
        });
    }
  }, [buildingId, router.isReady]); // Make sure it triggers when router is ready

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : building ? (
        <div>
          <h2 className="text-xl font-semibold">{building.name} - Floors</h2>
          <p>{building.address}</p>

          <div className="mt-4">
            <h3 className="font-semibold">Floors:</h3>
            <ul>
              {building.floors.map((floor, index) => (
                <li key={index} className="ml-4">
                  Floor {floor.floorNumber}
                  {floor.map && (
                    <div className="text-sm text-gray-500">Map: {floor.map}</div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p>No building found for ID: {buildingId}</p>
      )}
    </div>
  );
}
