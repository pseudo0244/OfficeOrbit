"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useMapPoints, type Point } from "@/app/hooks/useMapPoints";
import CanvasMap from "@/components/ui/CanvasMap";
import { Button } from "@/components/ui/button";

export default function FloorMapTool() {
  const { buildingId, floorNumber } = useParams(); // Get dynamic params
  const { points, addPoint, deletePoint } = useMapPoints(buildingId as string, Number(floorNumber));
  
  const [floorImage, setFloorImage] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Fetch floor image
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
        activePointType="seat"
        activeColor="red"
      />

      <div className="flex gap-2">
        <Button onClick={() => setZoom(zoom + 0.1)}>Zoom In</Button>
        <Button onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}>Zoom Out</Button>
      </div>
    </div>
  );
}
