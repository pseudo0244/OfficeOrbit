import { useState, useCallback } from "react"

export interface Employee {
  id: string
  name: string
  role: string
  assigned: boolean
}

export interface Point {
  id: string
  x: number
  y: number
  type: "employee" | "seat" | string
  color: string
  details: {
    name?: string
    role?: string
    description?: string
    employeeId?: string
  }
}

export interface ObjectType {
  name: string
  color: string
}

export function useMapPoints() {
  const [points, setPoints] = useState<Point[]>([])
  const [employees, setEmployees] = useState<Employee[]>([])
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [objectTypes, setObjectTypes] = useState<ObjectType[]>([
    { name: "Chair", color: "#FF5733" },
    { name: "Table", color: "#33FF57" },
    { name: "Computer", color: "#3357FF" },
    { name: "seat", color: "#FFA500" },
  ])

  const addPoint = useCallback((x: number, y: number, type: "employee" | "seat" | string, color: string) => {
    const newPoint: Point = {
      id: Date.now().toString(),
      x,
      y,
      type,
      color,
      details: {},
    }
    setPoints((prevPoints) => [...prevPoints, newPoint])
  }, [])

  const updatePointPosition = useCallback((id: string, x: number, y: number) => {
    setPoints((prevPoints) => prevPoints.map((point) => (point.id === id ? { ...point, x, y } : point)))
  }, [])

  const updatePointDetails = useCallback((id: string, details: Partial<Point["details"]>) => {
    setPoints((prevPoints) =>
      prevPoints.map((point) => (point.id === id ? { ...point, details: { ...point.details, ...details } } : point)),
    )
  }, [])

  const addEmployee = useCallback((name: string, role: string) => {
    const newEmployee: Employee = {
      id: Date.now().toString(),
      name,
      role,
      assigned: false,
    }
    setEmployees((prevEmployees) => [...prevEmployees, newEmployee])
  }, [])

  const allocateSeats = useCallback(() => {
    const availableSeats = points.filter((point) => point.type === "seat" && !point.details.employeeId)
    const unassignedEmployees = employees.filter((employee) => !employee.assigned)

    const updatedPoints = [...points]
    const updatedEmployees = [...employees]

    unassignedEmployees.forEach((employee, index) => {
      if (index < availableSeats.length) {
        const seat = availableSeats[index]
        updatedPoints[updatedPoints.findIndex((p) => p.id === seat.id)] = {
          ...seat,
          details: {
            ...seat.details,
            employeeId: employee.id,
            name: employee.name,
            role: employee.role,
          },
        }
        updatedEmployees[updatedEmployees.findIndex((e) => e.id === employee.id)] = {
          ...employee,
          assigned: true,
        }
      }
    })

    setPoints(updatedPoints)
    setEmployees(updatedEmployees)
  }, [points, employees])

  const addObjectType = useCallback((name: string, color: string) => {
    setObjectTypes((prev) => [...prev, { name, color }])
  }, [])

  const zoomIn = useCallback(() => setZoom((z) => Math.min(z * 1.2, 5)), [])
  const zoomOut = useCallback(() => setZoom((z) => Math.max(z / 1.2, 0.5)), [])

  const updatePan = useCallback((dx: number, dy: number) => {
    setPan((prevPan) => ({ x: prevPan.x + dx, y: prevPan.y + dy }))
  }, [])

  return {
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
  }
}

