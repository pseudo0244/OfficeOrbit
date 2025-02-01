import type React from "react"
import { useRef, useEffect, useState, useCallback } from "react"
import type { Point } from "../../app/hooks/useMapPoints"

interface CanvasMapProps {
  image: string | null
  points: Point[]
  zoom: number
  pan: { x: number; y: number }
  onAddPoint: (x: number, y: number, type: "employee" | "seat" | string, color: string) => void
  onSelectPoint: (point: Point) => void
  activePointType: "employee" | "seat" | string | null
  activeColor: string
}

const CanvasMap: React.FC<CanvasMapProps> = ({
  image,
  points,
  zoom,
  pan,
  onAddPoint,
  onSelectPoint,
  activePointType,
  activeColor,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [imageElement, setImageElement] = useState<HTMLImageElement | null>(null)

  useEffect(() => {
    if (image) {
      const img = new Image()
      img.src = image
      img.onload = () => setImageElement(img)
    }
  }, [image])

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas || !imageElement) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    ctx.save()
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.translate(pan.x, pan.y)
    ctx.scale(zoom, zoom)

    ctx.drawImage(imageElement, 0, 0)

    points.forEach((point) => {
      ctx.beginPath()
      ctx.arc(point.x, point.y, 5 / zoom, 0, 2 * Math.PI)
      ctx.fillStyle = point.color
      ctx.fill()

      // Display coordinates
      ctx.fillStyle = "white"
      ctx.strokeStyle = "black"
      ctx.font = `${12 / zoom}px Arial`
      ctx.lineWidth = 2 / zoom
      const coordText = `(${Math.round(point.x)}, ${Math.round(point.y)})`
      const textWidth = ctx.measureText(coordText).width
      ctx.strokeText(coordText, point.x - textWidth / 2, point.y - 10 / zoom)
      ctx.fillText(coordText, point.x - textWidth / 2, point.y - 10 / zoom)

      if (point.type === "seat" && point.details.name) {
        ctx.fillStyle = "black"
        ctx.font = `${12 / zoom}px Arial`
        ctx.fillText(point.details.name, point.x + 8 / zoom, point.y + 4 / zoom)
      }
    })

    ctx.restore()
  }, [imageElement, points, zoom, pan])

  useEffect(() => {
    drawCanvas()
  }, [drawCanvas])

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas || !activePointType || !imageElement) return

    const rect = canvas.getBoundingClientRect()
    const x = (event.clientX - rect.left - pan.x) / zoom
    const y = (event.clientY - rect.top - pan.y) / zoom

    // Ensure the click is within the image bounds
    if (x >= 0 && x <= imageElement.width && y >= 0 && y <= imageElement.height) {
      onAddPoint(x, y, activePointType, activeColor)
    }
  }

  const handleCanvasMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = (event.clientX - rect.left - pan.x) / zoom
    const y = (event.clientY - rect.top - pan.y) / zoom

    const clickedPoint = points.find(
      (point) => Math.sqrt(Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2)) < 5 / zoom,
    )

    canvas.style.cursor = clickedPoint ? "pointer" : activePointType ? "crosshair" : "default"
  }

  const handleCanvasMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = (event.clientX - rect.left - pan.x) / zoom
    const y = (event.clientY - rect.top - pan.y) / zoom

    const clickedPoint = points.find(
      (point) => Math.sqrt(Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2)) < 5 / zoom,
    )

    if (clickedPoint) {
      onSelectPoint(clickedPoint)
    } else if (activePointType) {
      handleCanvasClick(event)
    }
  }

  return (
    <canvas
      ref={canvasRef}
      onClick={handleCanvasClick}
      onMouseMove={handleCanvasMouseMove}
      onMouseDown={handleCanvasMouseDown}
      style={{ cursor: activePointType ? "crosshair" : "default" }}
    />
  )
}

export default CanvasMap