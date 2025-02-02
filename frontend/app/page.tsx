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
