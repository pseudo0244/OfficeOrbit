"use client"

import type React from "react"
import { useState, useCallback, useEffect } from "react"
import { useMapPoints, type Point } from "./hooks/useMapPoints"
import CanvasMap from "@/components/ui/CanvasMap"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ZoomIn, ZoomOut, User, X, Plus, UserPlus } from "lucide-react"

export default function FloorMapTool() {
  const [image, setImage] = useState<string | null>(null)
  const [activePointType, setActivePointType] = useState<"employee" | "seat" | string | null>(null)
  const [selectedPoint, setSelectedPoint] = useState<Point | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [newObjectType, setNewObjectType] = useState("")
  const [newObjectColor, setNewObjectColor] = useState("#000000")
  const [newEmployeeName, setNewEmployeeName] = useState("")
  const [newEmployeeRole, setNewEmployeeRole] = useState("")
  const {
    points,
    addPoint,
    updatePointPosition,
    updatePointDetails,
    employees,
    addEmployee,
    allocateSeats,
    zoom,
    zoomIn,
    zoomOut,
    pan,
    updatePan,
    objectTypes,
    addObjectType,
  } = useMapPoints()

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setImage(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

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

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "+") zoomIn()
      if (event.key === "-") zoomOut()
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [zoomIn, zoomOut])

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 p-4 overflow-hidden">
        <div className="mb-4 flex items-center space-x-4">
          <Input type="file" onChange={handleImageUpload} accept="image/*" className="w-64" />
          <Button
            onClick={() => setActivePointType("seat")}
            variant={activePointType === "seat" ? "default" : "outline"}
          >
            <User className="w-4 h-4 mr-2" />
            Add Seat
          </Button>
          <Select onValueChange={(value) => setActivePointType(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select object" />
            </SelectTrigger>
            <SelectContent>
              {objectTypes.map((objectType) => (
                <SelectItem key={objectType.name} value={objectType.name}>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: objectType.color }} />
                    {objectType.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={zoomIn}>
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button onClick={zoomOut}>
            <ZoomOut className="w-4 h-4" />
          </Button>
          <span className="text-sm font-medium">Zoom: {(zoom * 100).toFixed(0)}%</span>
        </div>
        <div className="mb-4 flex items-center space-x-4">
          <Input
            type="text"
            placeholder="New object type"
            value={newObjectType}
            onChange={(e) => setNewObjectType(e.target.value)}
          />
          <Input
            type="color"
            value={newObjectColor}
            onChange={(e) => setNewObjectColor(e.target.value)}
            className="w-12 h-8 p-0"
          />
          <Button onClick={handleAddObjectType}>
            <Plus className="w-4 h-4 mr-2" />
            Add Object Type
          </Button>
        </div>
        <div className="mb-4 flex items-center space-x-4">
          <Input
            type="text"
            placeholder="Employee Name"
            value={newEmployeeName}
            onChange={(e) => setNewEmployeeName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Employee Role"
            value={newEmployeeRole}
            onChange={(e) => setNewEmployeeRole(e.target.value)}
          />
          <Button onClick={handleAddEmployee}>
            <UserPlus className="w-4 h-4 mr-2" />
            Add Employee
          </Button>
          <Button onClick={allocateSeats}>Allocate Seats</Button>
        </div>
        <div className="relative h-[calc(100vh-300px)] bg-white rounded-lg shadow-md overflow-hidden">
          <CanvasMap
            image={image}
            points={points}
            zoom={zoom}
            pan={pan}
            onAddPoint={handleAddPoint}
            onSelectPoint={handleSelectPoint}
            activePointType={activePointType}
            activeColor={objectTypes.find((ot) => ot.name === activePointType)?.color || "#3b82f6"}
          />
        </div>
      </div>
      {isSidebarOpen && (
        <div className="w-80 p-4 bg-white shadow-lg overflow-auto">
          <Button
            className="absolute top-2 right-2"
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
          {selectedPoint && (
            <>
              <h2 className="text-2xl font-bold mb-4">
                {selectedPoint.type === "seat" ? "Seat Details" : `${selectedPoint.type} Details`}
              </h2>
              <form onSubmit={handleDetailsSubmit} className="space-y-4">
                {selectedPoint.type === "seat" ? (
                  <>
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" name="name" defaultValue={selectedPoint.details.name} readOnly />
                    </div>
                    <div>
                      <Label htmlFor="role">Role</Label>
                      <Input id="role" name="role" defaultValue={selectedPoint.details.role} readOnly />
                    </div>
                  </>
                ) : (
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Input id="description" name="description" defaultValue={selectedPoint.details.description} />
                  </div>
                )}
                {selectedPoint.type !== "seat" && <Button type="submit">Save</Button>}
              </form>
            </>
          )}
        </div>
      )}
      <div className="w-64 p-4 bg-white shadow-lg overflow-auto">
        <h2 className="text-2xl font-bold mb-4">Employees</h2>
        <ul className="space-y-2">
          {employees.map((employee) => (
            <li key={employee.id} className="flex justify-between items-center">
              <span>{employee.name}</span>
              <span className="text-sm text-gray-500">{employee.assigned ? "Assigned" : "Unassigned"}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

