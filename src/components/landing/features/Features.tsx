import React from "react";
import { MessagesSquare, Users, ShieldCheck } from "lucide-react";

const Features = () => {
  return (
    <section id="features" className="py-32 bg-white dark:bg-slate-800">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center gap-8">
          {/* Feature 1: Real-time Chat */}
          <div className="max-w-xs text-center flex flex-col items-center">
            <div className="flex justify-center items-center text-6xl text-indigo-600 rounded-full w-36 h-36 bg-indigo-100 mb-4">
              <MessagesSquare size={64} />
            </div>
            <div className="space-y-4 mt-3">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                Real-time Chat
              </h3>
              <p className="text-gray-600 dark:text-slate-200">
                Instantly send and receive messages in chat rooms with anyone.
              </p>
            </div>
          </div>

          {/* Feature 2: Multiple Participants */}
          <div className="max-w-xs text-center flex flex-col items-center">
            <div className="flex justify-center items-center text-6xl text-indigo-600 rounded-full w-36 h-36 bg-indigo-100 mb-4">
              <Users size={64} />
            </div>
            <div className="space-y-4 mt-3">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                Group Chat Rooms
              </h3>
              <p className="text-gray-600 dark:text-slate-200">
                Create or join chat rooms and connect with multiple people at
                once.
              </p>
            </div>
          </div>

          {/* Feature 3: Secure & Private */}
          <div className="max-w-xs text-center flex flex-col items-center">
            <div className="flex justify-center items-center text-6xl text-indigo-600 rounded-full w-36 h-36 bg-indigo-100 mb-4">
              <ShieldCheck size={64} />
            </div>
            <div className="space-y-4 mt-3">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                Secure & Private
              </h3>
              <p className="text-gray-600 dark:text-slate-200">
                Your conversations are private and secure within each chat room.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
