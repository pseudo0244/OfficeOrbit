"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function ProfilePage() {
  const [name, setName] = useState<string>("John Doe")
  const [employeeId, setEmployeeId] = useState<string>("12345")
  const [email, setEmail] = useState<string>("john.doe@example.com")
  const [role, setRole] = useState<string>("Software Engineer")
  const router = useRouter()

  const handleSave = () => {
    // Handle saving the updated data
    console.log("Profile saved:", { name, employeeId, email, role })
    
    // Redirect to the previous page after saving
    router.back()
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6">Edit Profile</h1>
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">Name</label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label htmlFor="employeeId" className="block text-sm font-medium">Employee ID</label>
          <Input
            id="employeeId"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className="mt-1"
            placeholder="Enter your employee ID"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium">Role</label>
          <Input
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-1"
            placeholder="Enter your role"
          />
        </div>

        <div className="mt-6">
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
    </div>
  )
}
