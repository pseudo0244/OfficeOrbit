// pages/home.tsx
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
      <div className="flex-1 p-8 text-black">
        <h2 className="text-3xl font-semibold mb-4">Welcome to the Floor Plan Management App</h2>
        <p className="text-lg">Here you can manage your floor plans and more!</p>
      </div>
    </div>
  );
};

export default Home;
