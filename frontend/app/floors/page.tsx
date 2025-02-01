'use client';

import { useState } from 'react';
import Link from 'next/link';

const Home = () => {
  const [floorName, setFloorName] = useState('');
  const [building, setBuilding] = useState(''); // Now directly references the building name
  const [status, setStatus] = useState('');
  const [mapInput, setMapInput] = useState<any>(null); // Image object
  const [floorDetails, setFloorDetails] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBuildingName, setNewBuildingName] = useState('');
  const [isAddBuildingModalOpen, setIsAddBuildingModalOpen] = useState(false);
  const [buildings, setBuildings] = useState<any[]>([]); // Buildings now as objects with name and id

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
    setMapInput(null); // Reset image on save
    setIsModalOpen(false); // Close the modal after saving
  };

  const handleAddBuilding = () => {
    if (newBuildingName.trim() !== '') {
      const newBuilding = { id: Date.now(), name: newBuildingName }; // Creating unique ID
      setBuildings([...buildings, newBuilding]); // Add the new building to the list
      setBuilding(newBuilding.id); // Set the newly added building as selected
      setNewBuildingName(''); // Clear the input field
      setIsAddBuildingModalOpen(false); // Close the add building modal
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setMapInput(reader.result); // Store the uploaded image's data URL
        };
        reader.readAsDataURL(file); // Read the image as a data URL
      }
    }
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
            className="bg-gray-900 hover:bg-gray-700 text-white py-2 px-4 rounded-md"
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
                <div className="text-sm text-gray-600">
                  <strong>Map:</strong>
                  {floor.mapInput ? (
                    <img src={floor.mapInput} alt="Map" className="mt-2 w-64 h-64 object-cover" />
                  ) : (
                    <p>No map uploaded</p>
                  )}
                </div>
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

              {/* Updated Building Selection */}
              <div className="flex items-center space-x-4">
                <p className="text-gray-600">Building: {building ? `Building ${building}` : 'Select or Add Building'}</p>
                <button
                  onClick={() => setIsAddBuildingModalOpen(true)}
                  className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800"
                >
                  Add/View Buildings
                </button>
              </div>

              <input
                type="text"
                placeholder="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
              />
              {/* Image upload for map */}
              <div>
                <label htmlFor="mapInput" className="block text-sm text-gray-600">Upload Map Image</label>
                <input
                  type="file"
                  id="mapInput"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-md mt-2"
                />
                {mapInput && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">Preview:</p>
                    <img
                      src={mapInput}
                      alt="Uploaded Map"
                      className="w-64 h-64 object-cover mt-2"
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-between mt-4">
                <button
                  onClick={handleSave}
                  className="bg-black text-white py-2 px-6 rounded-md shadow-md transition duration-300 ease-in-out hover:bg-gray-800 hover:shadow-lg hover:-translate-y-1"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-black text-white py-2 px-6 rounded-md shadow-md transition duration-300 ease-in-out hover:bg-gray-800 hover:shadow-lg hover:-translate-y-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Building Modal */}
      {isAddBuildingModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h3 className="text-2xl mb-4">Add New Building</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter Building Name"
                value={newBuildingName}
                onChange={(e) => setNewBuildingName(e.target.value)}
                className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
              />
              <div className="flex justify-between mt-4">
                <button
                  onClick={handleAddBuilding}
                  className="bg-black text-white py-2 px-6 rounded-md shadow-md transition duration-300 ease-in-out hover:bg-gray-800 hover:shadow-lg hover:-translate-y-1"
                >
                  Add
                </button>
                <button
                  onClick={() => setIsAddBuildingModalOpen(false)}
                  className="bg-black text-white py-2 px-6 rounded-md shadow-md transition duration-300 ease-in-out hover:bg-gray-800 hover:shadow-lg hover:-translate-y-1"
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
