'use client';

import { useState } from 'react';
import Link from 'next/link';

const Home = () => {
  const [floorName, setFloorName] = useState('');
  const [building, setBuilding] = useState('');
  const [status, setStatus] = useState('');
  const [mapInput, setMapInput] = useState('');
  const [floorDetails, setFloorDetails] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = () => {
    const newFloor = {
      floorName,
      building,
      status,
      mapInput,
    };

    setFloorDetails([...floorDetails, newFloor]);

    // Clear the form fields
    setFloorName('');
    setBuilding('');
    setStatus('');
    setMapInput('');
    setIsModalOpen(false); // Close the modal after saving
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-black text-white p-4">
        <h1 className="text-2xl font-bold mb-8">FloorPlan App</h1>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link href="/home" className="block text-lg">
                Home
              </Link>
            </li>
            <li>
              <Link href="/maps" className="block text-lg">
                Maps
              </Link>
            </li>
            <li>
              <Link href="/floors" className="block text-lg">
                Floors
              </Link>
            </li>
            <li>
              <Link href="/profile" className="block text-lg">
                User Profile
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold">Floors</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md"
          >
            Create Floor
          </button>
        </div>

        {/* Floor Details Displayed Horizontally */}
        <div className="mt-8">
          <h3 className="text-2xl mb-4">Floor Details</h3>
          <div className="flex space-x-6 overflow-x-auto">
            {floorDetails.map((floor, index) => (
              <div
                key={index}
                className="bg-white text-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 min-w-max"
              >
                <h4 className="font-semibold text-xl mb-2">{floor.floorName}</h4>
                <p className="text-sm text-gray-600"><strong>Building:</strong> {floor.building}</p>
                <p className="text-sm text-gray-600"><strong>Status:</strong> {floor.status}</p>
                <p className="text-sm text-gray-600"><strong>Map:</strong> {floor.mapInput}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for Input */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h3 className="text-2xl mb-4">Create a New Floor</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Floor Name"
                value={floorName}
                onChange={(e) => setFloorName(e.target.value)}
                className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
              />
              <input
                type="text"
                placeholder="Building"
                value={building}
                onChange={(e) => setBuilding(e.target.value)}
                className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
              />
              <input
                type="text"
                placeholder="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
              />
              <input
                type="text"
                placeholder="Map Input"
                value={mapInput}
                onChange={(e) => setMapInput(e.target.value)}
                className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
              />
              <div className="flex justify-between mt-4">
              <button
  onClick={handleSave}
  className="bg-black text-white py-2 px-6 rounded-full shadow-md transition duration-300 ease-in-out hover:bg-gray-800 hover:shadow-lg hover:-translate-y-1"
>
  Save
</button>
<button
  onClick={() => setIsModalOpen(false)}
  className="bg-black text-white py-2 px-6 rounded-full shadow-md transition duration-300 ease-in-out hover:bg-gray-800 hover:shadow-lg hover:-translate-y-1"
>
  Cancel
</button>

</div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
