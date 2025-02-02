import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function OfficeForm() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [floors, setFloors] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const office = {
      name,
      address,
      floors,
    };

    try {
      const response = await fetch("http://localhost:5000/api/buildings/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(office),
      });

      const data = await response.json();
      console.log("Server Response:", data);
    } catch (error) {
      console.error("Error creating office:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Office Name</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="address">Address</Label>
        <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="floors">Number of Floors</Label>
        <Input
          id="floors"
          type="number"
          value={floors}
          onChange={(e) => setFloors(parseInt(e.target.value, 10))}
          required
          min={1}
        />
      </div>
      <Button type="submit">Create Office</Button>
    </form>
  );
}
