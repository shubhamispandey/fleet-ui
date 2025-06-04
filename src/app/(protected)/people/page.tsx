// People.tsx
import Image from "next/image";
import Link from "next/link";
import React from "react";

const People = () => {
  const people = [
    {
      id: "1",
      name: "Swati Ojha",
      role: "UI/UX Designer",
      status: "Online",
      avatar: "/img/avatars/b8.webp",
    },
    {
      id: "2",
      name: "Alex Johnson",
      role: "Frontend Developer",
      status: "Away",
      avatar: "/img/avatars/g1.webp",
    },
    {
      id: "3",
      name: "Michael Chen",
      role: "Product Manager",
      status: "Offline",
      avatar: "/img/avatars/b7.webp",
    },
  ];

  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Team Members</h1>
        <p className="text-gray-500">Collaborate with your team members</p>
      </div>

      {people.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-indigo-100 p-5 rounded-full mb-6">
            <i className="lni lni-users text-indigo-600 text-4xl"></i>
          </div>
          <h3 className="text-xl font-medium text-gray-800 mb-2">
            No team members
          </h3>
          <p className="text-gray-500 max-w-md mb-4">
            Add team members to start collaborating on projects
          </p>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition">
            Invite People
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {people.map((person) => (
            <div
              key={person.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-all hover:shadow-md"
            >
              <div className="p-5 flex items-start gap-4">
                <Image
                  src={person.avatar}
                  alt={person.name}
                  width={56}
                  height={56}
                  className="rounded-lg border border-gray-100"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">{person.name}</h3>
                  <p className="text-sm text-gray-500">{person.role}</p>
                  <div className="flex items-center mt-1">
                    <span
                      className={`w-2 h-2 rounded-full mr-2 ${
                        person.status === "Online"
                          ? "bg-green-500"
                          : person.status === "Away"
                          ? "bg-yellow-500"
                          : "bg-gray-400"
                      }`}
                    ></span>
                    <span className="text-xs text-gray-500">
                      {person.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-100 px-5 py-3 flex">
                <Link
                  href={`auth/dashboard/people/${person.id}`}
                  className="flex-1 text-center py-2 text-indigo-600 hover:text-indigo-800 font-medium transition flex items-center justify-center gap-2"
                >
                  <i className="lni lni-comments-alt-2"></i>
                  Message
                </Link>
                <button className="flex-1 text-center py-2 text-gray-600 hover:text-gray-800 font-medium transition flex items-center justify-center gap-2">
                  <i className="lni lni-user"></i>
                  Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default People;
