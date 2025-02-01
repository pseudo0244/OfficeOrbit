import { Button } from "@/components/ui/button"

interface AddOfficeProps {
  onSelect: (type: "old" | "new") => void
}

export default function AddOffice({ onSelect }: AddOfficeProps) {
  return (
    <div className="space-x-4">
      <Button onClick={() => onSelect("old")}>Old Office</Button>
      <Button onClick={() => onSelect("new")}>New Office</Button>
    </div>
  )
}

