import React, { useRef, useEffect, useState } from 'react'
import { Point } from '../../app/hooks/useMapPoints'

interface CanvasMapProps {
  image: string | null
  points: Point[]
  zoom: number
  pan: { x: number; y: number }
  onAddPoint: (x: number, y: number, type: string, color: string) => void
  onSelectPoint: (point: Point) => void
  activePointType: string | null
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
  const containerRef = useRef<HTMLDivElement>(null)
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const img = new Image()
    img.onload = () => {
      setCanvasSize({ width: img.width, height: img.height })
      canvas.width = img.width
      canvas.height = img.height
      redrawCanvas()
    }
    if (image) {
      img.src = image
    }
  }, [image])

  useEffect(() => {
    redrawCanvas()
  }, [points, zoom, pan]) // Removed unnecessary dependency: canvasSize

  const redrawCanvas = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (image) {
      const img = new Image()
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        drawPoints()
      }
      img.src = image
    } else {
      drawPoints()
    }
  }

  const drawPoints = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    points.forEach((point) => {
      ctx.beginPath()
      ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI)
      ctx.fillStyle = point.color
      ctx.fill()
    })
  }

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!activePointType) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = (event.clientX - rect.left) / zoom - pan.x
    const y = (event.clientY - rect.top) / zoom - pan.y

    onAddPoint(x, y, activePointType, activeColor)
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-auto"
      style={{
        cursor: activePointType ? 'crosshair' : 'default',
      }}
    >
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: '0 0',
          position: 'absolute',
          left: `${pan.x}px`,
          top: `${pan.y}px`,
        }}
      />
    </div>
  )
}

export default CanvasMap
