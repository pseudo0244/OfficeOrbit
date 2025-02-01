import Link from 'next/link';

const Home = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-black text-white p-4">
        <h1 className="text-2xl font-bold mb-8">FloorPlan App</h1>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link href="/home" className="block text-lg hover:text-gray-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/maps" className="block text-lg hover:text-gray-400 transition">
                Maps
              </Link>
            </li>
            <li>
              <Link href="/floors" className="block text-lg hover:text-gray-400 transition">
                Floors
              </Link>
            </li>
            <li>
              <Link href="/profile" className="block text-lg text-purple-400 font-semibold">
                User Profile
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content - Profile Page */}
      <div className="flex-1 p-8">
        <h2 className="text-3xl font-semibold mb-4">Employee Profile</h2>

        {/* Profile Information */}
        <div className="bg-black text-white p-6 rounded-lg shadow-md">
          <div className="flex justify-center mb-6">
            {/* Placeholder for Profile Image */}
            <div className="w-32 h-32 rounded-full bg-gray-300 flex justify-center items-center">
              {/* Image will be placed here */}
              <img 
                src="/app/image/images(4).jpg" 
                alt="Profile" 
                className="w-full h-full object-cover rounded-full" 
              />
            </div>
          </div>

          {/* Employee Details */}
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-semibold">Name:</span>
              <span className="text-gray-300">John Doe</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Employee ID:</span>
              <span className="text-gray-300">E1234567</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Email ID:</span>
              <span className="text-gray-300">johndoe@example.com</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Post:</span>
              <span className="text-gray-300">Software Engineer</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Company:</span>
              <span className="text-gray-300">TechCorp Inc.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
