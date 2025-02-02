"use client"

import { useState } from "react"
import Header from "./components/Header"
import Canvas from "./components/Canvas"
import BookingSidebar from "./components/BookingSideBar"

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleBookSeat = () => {
    setIsSidebarOpen(true)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header onBookSeat={handleBookSeat} />
      <main className="flex-grow flex flex-col p-4">
        <Canvas isSidebarOpen={isSidebarOpen} />
      </main>
      <BookingSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </div>
  )
}

