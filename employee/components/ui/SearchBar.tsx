import Link from "next/link"
import { Home, Building, Settings } from "lucide-react"

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-900 text-white p-6 h-screen">
      <h1 className="text-2xl font-bold mb-8">Office Orbit</h1>
      <nav>
        <ul className="space-y-4">
          <li>
            <Link href="/home" className="flex items-center text-lg hover:text-gray-400 transition">
              <Home className="mr-2" size={20} />
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/offices" className="flex items-center text-lg hover:text-gray-400 transition">
              <Building className="mr-2" size={20} />
              Offices
            </Link>
          </li>
          <li>
            <Link href="/settings" className="flex items-center text-lg hover:text-gray-400 transition">
              <Settings className="mr-2" size={20} />
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

