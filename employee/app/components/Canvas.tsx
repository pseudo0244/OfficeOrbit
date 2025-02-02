"use client"

import { useState, useRef, useEffect } from "react"
import { ZoomIn, ZoomOut } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CanvasProps {
  isSidebarOpen: boolean
}

export default function Canvas({ isSidebarOpen }: CanvasProps) {
  const [zoom, setZoom] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  const handleZoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom + 0.1, 2))
  }

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 0.1, 0.5))
  }

  useEffect(() => {
    const container = containerRef.current
    const image = imageRef.current

    if (!container || !image) return

    let isDragging = false
    let startX: number, startY: number, scrollLeft: number, scrollTop: number

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true
      startX = e.pageX - container.offsetLeft
      startY = e.pageY - container.offsetTop
      scrollLeft = container.scrollLeft
      scrollTop = container.scrollTop
    }

    const onMouseUp = () => {
      isDragging = false
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      e.preventDefault()
      const x = e.pageX - container.offsetLeft
      const y = e.pageY - container.offsetTop
      const walkX = (x - startX) * 2
      const walkY = (y - startY) * 2
      container.scrollLeft = scrollLeft - walkX
      container.scrollTop = scrollTop - walkY
    }

    container.addEventListener("mousedown", onMouseDown)
    container.addEventListener("mouseup", onMouseUp)
    container.addEventListener("mouseleave", onMouseUp)
    container.addEventListener("mousemove", onMouseMove)

    return () => {
      container.removeEventListener("mousedown", onMouseDown)
      container.removeEventListener("mouseup", onMouseUp)
      container.removeEventListener("mouseleave", onMouseUp)
      container.removeEventListener("mousemove", onMouseMove)
    }
  }, [])

  return (
    <div className="relative w-full h-[calc(100vh-120px)] bg-gray-200 rounded-lg overflow-hidden">
      <div
        className={`absolute top-2 ${isSidebarOpen ? "right-[330px]" : "right-2"} space-x-2 z-10 transition-all duration-300`}
      >
        <Button variant="secondary" size="icon" onClick={handleZoomIn}>
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="icon" onClick={handleZoomOut}>
          <ZoomOut className="h-4 w-4" />
        </Button>
      </div>
      <div ref={containerRef} className="w-full h-full overflow-auto" style={{ cursor: "grab" }}>
        <div
          ref={imageRef}
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: "top left",
            transition: "transform 0.3s ease",
            width: "fit-content",
            height: "fit-content",
            minWidth: "100%",
            minHeight: "100%",
          }}
        >
          <img
            src="/assets/Office1.jpg"
            alt="Office Layout"
            className="w-full h-full object-cover"
            style={{ pointerEvents: "none" }}
          />
        </div>
      </div>
    </div>
  )
}

