"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useMapPoints, type Point } from "@/app/hooks/useMapPoints";
import CanvasMap from "@/components/ui/CanvasMap";
import { Button } from "@/components/ui/button";

export default function FloorMapTool() {
  const { buildingId, floorNumber } = useParams(); // Get dynamic params
  const {
    points,
    addPoint,
    updatePointPosition,
    updatePointDetails,
    zoom,
    zoomIn,
    zoomOut,
    pan,
    updatePan,
  } = useMapPoints();

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
  
    // Create a FormData object to send the file and floorId
    const formData = new FormData();
    formData.append("file", file);
    formData.append("floorId", "679ec4a03e6a96d782c0dc02"); // Replace with dynamic floorId if needed
  
    try {
      // Send the file to the backend
      const response = await fetch("http://localhost:5000/api/maps/upload", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Failed to upload image");
      }
  
      // Parse the response
      const data = await response.json();
  
      // Set the Cloudinary URL in the image state
      if (data.success && data.data.mapImagePath) {
        setImage(data.data.mapImagePath);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    }
  };

  const handleAddPoint = useCallback(
    (x: number, y: number, type: "employee" | "seat" | string, color: string) => {
      addPoint(x, y, type, color)
      setActivePointType(null)
    },
    [addPoint],
  )

  const handleSelectPoint = useCallback((point: Point) => {
    setSelectedPoint(point)
    setIsSidebarOpen(true)
  }, [])

  const handleDetailsSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (selectedPoint) {
        const formData = new FormData(e.currentTarget)
        const details = Object.fromEntries(formData.entries())
        updatePointDetails(selectedPoint.id, details)
      }
    },
    [selectedPoint, updatePointDetails],
  )

  const handleAddObjectType = useCallback(() => {
    if (newObjectType && newObjectColor) {
      addObjectType(newObjectType, newObjectColor)
      setNewObjectType("")
      setNewObjectColor("#000000")
    }
  }, [newObjectType, newObjectColor, addObjectType])

  const handleAddEmployee = useCallback(() => {
    if (newEmployeeName && newEmployeeRole) {
      addEmployee(newEmployeeName, newEmployeeRole)
      setNewEmployeeName("")
      setNewEmployeeRole("")
    }
  }, [newEmployeeName, newEmployeeRole, addEmployee])
  const [floorImage, setFloorImage] = useState<string | null>(null);


  useEffect(() => {
    fetch(`http://localhost:5002/api/buildings/${buildingId}/floors/${floorNumber}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setFloorImage(data.data.map);
      })
      .catch((err) => console.error("Error fetching floor data:", err));
  }, [buildingId, floorNumber]);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Floor Map - {floorNumber}</h2>
      
      <CanvasMap
        image={floorImage}
        points={points}
        zoom={zoom}
        pan={pan}
        onAddPoint={addPoint}
        onSelectPoint={(point) => console.log("Selected:", point)}
      />

      <div className="flex gap-2">
        <Button onClick={() => zoomIn()}>Zoom In</Button>
        <Button onClick={() => zoomOut()}>Zoom Out</Button>
      </div>
    </div>
  );
}
