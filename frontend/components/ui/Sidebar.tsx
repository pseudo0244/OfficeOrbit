"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Home, Building, Settings, Menu } from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="relative">
      {/* Toggle Button + Logo */}
      <div className="fixed top-4 left-4 z-50 flex flex-col items-center">
        <button
          className="p-2 bg-gray-900 text-white rounded-full shadow-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white p-6 transform ${
          isOpen ? "translate-x-0" : "-translate-x-72"
        } transition-transform duration-300 ease-in-out shadow-xl`}
      >
        <nav className="mt-8">
          <ul className="space-y-4">
            <li>
              <Link href="/home" className="flex items-center text-lg hover:text-gray-400 transition">
                <Home className="mr-2" size={20} />
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/office-management" className="flex items-center text-lg hover:text-gray-400 transition">
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
      </aside>
    </div>
  );
}
