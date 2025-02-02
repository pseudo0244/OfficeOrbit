"use client"

import { useState, useEffect } from "react"
import { X, Edit, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Booking {
  id: string
  date: string
  fromTime: string
  toTime: string
  xCoordinate: string
  yCoordinate: string
}

interface BookingSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function BookingSidebar({ isOpen, onClose }: BookingSidebarProps) {
  const [date, setDate] = useState("")
  const [fromTime, setFromTime] = useState("")
  const [toTime, setToTime] = useState("")
  const [xCoordinate, setXCoordinate] = useState("") // X coordinate state
  const [yCoordinate, setYCoordinate] = useState("") // Y coordinate state
  const [bookings, setBookings] = useState<Booking[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    // Fetch bookings from API or local storage
    const savedBookings = localStorage.getItem("bookings")
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings))
    }
  }, [])

  const saveBookings = (newBookings: Booking[]) => {
    setBookings(newBookings)
    localStorage.setItem("bookings", JSON.stringify(newBookings))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      const updatedBookings = bookings.map((booking) =>
        booking.id === editingId
          ? { ...booking, date, fromTime, toTime, xCoordinate, yCoordinate }
          : booking
      )
      saveBookings(updatedBookings)
      setEditingId(null)
    } else {
      const newBooking: Booking = {
        id: Date.now().toString(),
        date,
        fromTime,
        toTime,
        xCoordinate,
        yCoordinate,
      }
      saveBookings([...bookings, newBooking])
    }
    resetForm()
  }

  const handleEdit = (booking: Booking) => {
    setDate(booking.date)
    setFromTime(booking.fromTime)
    setToTime(booking.toTime)
    setXCoordinate(booking.xCoordinate) // Set X coordinate for editing
    setYCoordinate(booking.yCoordinate) // Set Y coordinate for editing
    setEditingId(booking.id)
  }

  const handleDelete = (id: string) => {
    const updatedBookings = bookings.filter((booking) => booking.id !== id)
    saveBookings(updatedBookings)
  }

  const resetForm = () => {
    setDate("")
    setFromTime("")
    setToTime("")
    setXCoordinate("") // Reset X coordinate
    setYCoordinate("") // Reset Y coordinate
    setEditingId(null)
  }

  if (!isOpen) return null

  return (
    <div
      className={`fixed inset-y-0 right-0 w-80 bg-white shadow-lg p-4 transform transition-all duration-300 ease-in-out overflow-y-auto ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <Button variant="ghost" onClick={onClose} className="absolute top-2 right-2">
        <X className="h-6 w-6" />
      </Button>
      <h2 className="text-xl font-bold mb-4">Book Your Seat</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="date">Date</Label>
          <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="fromTime">From Time</Label>
          <Input id="fromTime" type="time" value={fromTime} onChange={(e) => setFromTime(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="toTime">To Time</Label>
          <Input id="toTime" type="time" value={toTime} onChange={(e) => setToTime(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="xCoordinate">X Coordinate</Label>
          <Input
            id="xCoordinate"
            type="text"
            value={xCoordinate}
            onChange={(e) => setXCoordinate(e.target.value)}
            required
            placeholder="Enter X coordinate"
          />
        </div>
        <div>
          <Label htmlFor="yCoordinate">Y Coordinate</Label>
          <Input
            id="yCoordinate"
            type="text"
            value={yCoordinate}
            onChange={(e) => setYCoordinate(e.target.value)}
            required
            placeholder="Enter Y coordinate"
          />
        </div>
        <Button type="submit" className="w-full">
          {editingId ? "Update Booking" : "Book Seat"}
        </Button>
      </form>
      <ScrollArea className="h-[calc(100vh-400px)] mt-6">
        <h3 className="font-semibold mb-2">Your Bookings</h3>
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-gray-100 p-2 rounded mb-2 flex justify-between items-center">
            <div>
              <p className="font-medium">{booking.date}</p>
              <p className="text-sm text-gray-600">
                {booking.fromTime} - {booking.toTime}
              </p>
              <p className="text-sm text-gray-600">
                Coordinates: {booking.xCoordinate}, {booking.yCoordinate}
              </p>
            </div>
            <div>
              <Button variant="ghost" size="icon" onClick={() => handleEdit(booking)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(booking.id)}>
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  )
}
