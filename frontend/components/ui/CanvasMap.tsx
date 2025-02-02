"use client";

import { useRef, useEffect } from "react";
import { Point } from "@/app/hooks/useMapPoints";

interface CanvasMapProps {
  image: string | null;
  points: Point[];
  zoom: number;
  pan: { x: number; y: number };
  onAddPoint: (x: number, y: number, type: string, color: string) => void;
  onSelectPoint: (point: Point) => void;
}

export default function CanvasMap({
  image,
  points,
  zoom,
  pan,
  onAddPoint,
  onSelectPoint,
}: CanvasMapProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw floor map image
    if (image) {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        ctx.drawImage(img, pan.x, pan.y, img.width * zoom, img.height * zoom);

        // Draw points
        points.forEach((point) => {
          ctx.fillStyle = point.color;
          ctx.beginPath();
          ctx.arc(point.x, point.y, 8, 0, Math.PI * 2);
          ctx.fill();
        });
      };
    }
  }, [image, points, zoom, pan]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) / zoom - pan.x;
    const y = (event.clientY - rect.top) / zoom - pan.y;

    onAddPoint(x, y, "seat", "#FFA500");
  };

  return <canvas ref={canvasRef} onClick={handleCanvasClick} className="border w-full h-auto" />;
}
