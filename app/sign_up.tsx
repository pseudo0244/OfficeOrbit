'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaUser, FaLock, FaBuilding, FaEnvelope, FaBriefcase } from 'react-icons/fa';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmployee, setIsEmployee] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [post, setPost] = useState('');
  const [ownerFirstName, setOwnerFirstName] = useState('');
  const [ownerLastName, setOwnerLastName] = useState('');
  const [ownerCompanyName, setOwnerCompanyName] = useState('');
  const [ownerPost, setOwnerPost] = useState('');

  const handleEmployeeCheckboxChange = () => {
    setIsEmployee(true);
    setIsOwner(false);  // Automatically uncheck company owner
  };

  const handleOwnerCheckboxChange = () => {
    setIsOwner(true);
    setIsEmployee(false);  // Automatically uncheck employee
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Signing in with:', { email, password, isEmployee, isOwner, firstName, lastName, companyName, post, ownerFirstName, ownerLastName, ownerCompanyName, ownerPost });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="employee"
              checked={isEmployee}
              onChange={handleEmployeeCheckboxChange}
              className="w-4 h-4"
            />
            <label htmlFor="employee" className="text-sm">Are you an office employee?</label>
          </div>
          {isEmployee && (
            <>
              <div className="flex items-center bg-gray-700 p-3 rounded-md">
                <FaUser className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="First Name"
                  className="bg-transparent flex-1 outline-none text-white"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center bg-gray-700 p-3 rounded-md">
                <FaUser className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="bg-transparent flex-1 outline-none text-white"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center bg-gray-700 p-3 rounded-md">
                <FaEnvelope className="text-gray-400 mr-2" />
                <input
                  type="email"
                  placeholder="Gmail ID"
                  className="bg-transparent flex-1 outline-none text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center bg-gray-700 p-3 rounded-md">
                <FaBuilding className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Company Name"
                  className="bg-transparent flex-1 outline-none text-white"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center bg-gray-700 p-3 rounded-md">
                <FaBriefcase className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Post"
                  className="bg-transparent flex-1 outline-none text-white"
                  value={post}
                  onChange={(e) => setPost(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="owner"
              checked={isOwner}
              onChange={handleOwnerCheckboxChange}
              className="w-4 h-4"
            />
            <label htmlFor="owner" className="text-sm">Are you a company owner?</label>
          </div>
          {isOwner && (
            <>
              <div className="flex items-center bg-gray-700 p-3 rounded-md">
                <FaUser className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Owner First Name"
                  className="bg-transparent flex-1 outline-none text-white"
                  value={ownerFirstName}
                  onChange={(e) => setOwnerFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center bg-gray-700 p-3 rounded-md">
                <FaUser className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Owner Last Name"
                  className="bg-transparent flex-1 outline-none text-white"
                  value={ownerLastName}
                  onChange={(e) => setOwnerLastName(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center bg-gray-700 p-3 rounded-md">
                <FaEnvelope className="text-gray-400 mr-2" />
                <input
                  type="email"
                  placeholder="Owner Gmail ID"
                  className="bg-transparent flex-1 outline-none text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center bg-gray-700 p-3 rounded-md">
                <FaBuilding className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Owner Company Name"
                  className="bg-transparent flex-1 outline-none text-white"
                  value={ownerCompanyName}
                  onChange={(e) => setOwnerCompanyName(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center bg-gray-700 p-3 rounded-md">
                <FaBriefcase className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Owner Post"
                  className="bg-transparent flex-1 outline-none text-white"
                  value={ownerPost}
                  onChange={(e) => setOwnerPost(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 transition-all py-2 rounded-md text-lg font-semibold"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}
