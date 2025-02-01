// pages/home.tsx
import Link from 'next/link';

const Home = () => {
  return (
    <div className="flex h-screen bg-white text-black">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-6">
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
              <Link href="/profile" className="block text-lg hover:text-gray-400 transition">
                User Profile
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-white overflow-auto">
        <h2 className="text-3xl font-semibold mb-6">Welcome to the Floor Plan Management App</h2>
        <p className="text-lg mb-6">Here you can manage your floor plans, review feedback, and much more!</p>

        {/* Calendar Section */}
        <div className="bg-gray-100 text-black p-6 rounded-lg shadow-lg mb-8">
          <h3 className="text-2xl font-semibold mb-4">Floor Plan Calendar</h3>
          <p className="text-gray-700 mb-4">Check out upcoming events and tasks related to your floor plans:</p>
          <div className="bg-white p-4 rounded-lg">
            {/* Simple Calendar (Just a representation here) */}
            <div className="grid grid-cols-7 gap-2">
              <div className="text-center text-sm font-semibold">Sun</div>
              <div className="text-center text-sm font-semibold">Mon</div>
              <div className="text-center text-sm font-semibold">Tue</div>
              <div className="text-center text-sm font-semibold">Wed</div>
              <div className="text-center text-sm font-semibold">Thu</div>
              <div className="text-center text-sm font-semibold">Fri</div>
              <div className="text-center text-sm font-semibold">Sat</div>
            </div>
            <div className="grid grid-cols-7 gap-2 mt-2">
              {/* Sample Dates */}
              <div className="text-center text-sm text-gray-500">1</div>
              <div className="text-center text-sm text-gray-500">2</div>
              <div className="text-center text-sm text-gray-500">3</div>
              <div className="text-center text-sm text-gray-500">4</div>
              <div className="text-center text-sm text-gray-500">5</div>
              <div className="text-center text-sm text-gray-500">6</div>
              <div className="text-center text-sm text-gray-500">7</div>
              <div className="text-center text-sm text-gray-500">8</div>
              <div className="text-center text-sm text-gray-500">9</div>
              <div className="text-center text-sm text-gray-500">10</div>
              <div className="text-center text-sm text-gray-500">11</div>
              <div className="text-center text-sm text-gray-500">12</div>
              <div className="text-center text-sm text-gray-500">13</div>
              <div className="text-center text-sm text-gray-500">14</div>
              <div className="text-center text-sm text-gray-500">15</div>
              <div className="text-center text-sm text-gray-500">16</div>
              <div className="text-center text-sm text-gray-500">17</div>
              <div className="text-center text-sm text-gray-500">18</div>
              <div className="text-center text-sm text-gray-500">19</div>
              <div className="text-center text-sm text-gray-500">20</div>
              <div className="text-center text-sm text-gray-500">21</div>
              <div className="text-center text-sm text-gray-500">22</div>
              <div className="text-center text-sm text-gray-500">23</div>
              <div className="text-center text-sm text-gray-500">24</div>
              <div className="text-center text-sm text-gray-500">25</div>
              <div className="text-center text-sm text-gray-500">26</div>
              <div className="text-center text-sm text-gray-500">27</div>
              <div className="text-center text-sm text-gray-500">28</div>
              <div className="text-center text-sm text-gray-500">29</div>
              <div className="text-center text-sm text-gray-500">30</div>
              <div className="text-center text-sm text-gray-500">31</div>
            </div>
          </div>
        </div>

        {/* Star Rating Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-2">User Ratings</h3>
          <div className="flex items-center space-x-2 text-yellow-500">
            {/* Stars */}
            <span>★★★★★</span>
          </div>
          <p className="text-gray-700">4.9/5 based on 120 reviews</p>
        </div>

        {/* Reviews Section */}
        <div className="bg-gray-100 text-black p-6 rounded-lg shadow-lg mb-8">
          <h3 className="text-2xl font-semibold mb-4">Reviews</h3>
          <div className="space-y-4">
            {/* Review 1 */}
            <div className="border-b border-gray-400 pb-4">
              <p className="font-semibold">Jane Doe</p>
              <div className="flex items-center space-x-2 text-yellow-500">
                <span>★★★★★</span>
                <p className="text-sm text-gray-500">5/5</p>
              </div>
              <p className="mt-2 text-gray-700">"This app has revolutionized how we manage our office space. The layout is easy to use, and I love the ability to interact with the floor plans directly."</p>
            </div>
            {/* Review 2 */}
            <div className="border-b border-gray-400 pb-4">
              <p className="font-semibold">John Smith</p>
              <div className="flex items-center space-x-2 text-yellow-500">
                <span>★★★★★</span>
                <p className="text-sm text-gray-500">5/5</p>
              </div>
              <p className="mt-2 text-gray-700">"A great tool for our team to visualize our office layouts. The ease of use and customer support are outstanding!"</p>
            </div>
            {/* Review 3 */}
            <div className="pb-4">
              <p className="font-semibold">Emily Johnson</p>
              <div className="flex items-center space-x-2 text-yellow-500">
                <span>★★★★☆</span>
                <p className="text-sm text-gray-500">4/5</p>
              </div>
              <p className="mt-2 text-gray-700">"I love the functionality of the app, though I hope to see more features for real-time collaboration in future updates."</p>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="bg-gray-100 text-black p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4">Get Started Today</h3>
          <p className="text-lg mb-4">Start managing your floor plans efficiently and create beautiful layouts with our user-friendly platform.</p>
          <Link href="/signup">
            <span className="inline-block bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition">Sign Up Now</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
