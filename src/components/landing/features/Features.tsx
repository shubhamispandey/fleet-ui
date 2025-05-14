import React from "react";

const Features = () => {
  return (
    <section id="features" className="py-32 bg-white dark:bg-slate-800">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center gap-8">
          {/* Feature 1 */}
          <div className="max-w-xs text-center flex flex-col items-center">
            <div className="flex justify-center items-center text-6xl text-indigo-600 rounded-full w-36 h-36 bg-indigo-100 mb-4">
              <i className="lni lni-video"></i>
            </div>
            <div className="space-y-4 mt-3">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                Video Conferencing
              </h3>
              <p className="text-gray-600 dark:text-slate-200">
                You can make a video conference in a meeting.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="max-w-xs text-center flex flex-col items-center">
            <div className="flex justify-center items-center text-6xl text-indigo-600 rounded-full w-36 h-36 bg-indigo-100 mb-4">
              <i className="lni lni-comments"></i>
            </div>
            <div className="space-y-4 mt-3">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                Start a text Chat
              </h3>
              <p className="text-gray-600 dark:text-slate-200">
                Text chat can be started in every room between anyone in the
                room.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="max-w-xs text-center flex flex-col items-center">
            <div className="flex justify-center items-center text-6xl text-indigo-600 rounded-full w-36 h-36 bg-indigo-100 mb-4">
              <i className="lni lni-control-panel"></i>
            </div>
            <div className="space-y-4 mt-3">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                Easy Controls
              </h3>
              <p className="text-gray-600 dark:text-slate-200">
                Get easy controls for audio and video conferencing with device
                selection.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
