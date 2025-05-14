import Image from "next/image";
import React from "react";

const Home = () => {
  return (
    <section className="bg-[url('/img/landing/hero/hero-bg.svg')] dark:bg-slate-800 bg-cover bg-bottom bg-no-repeat -mt-[5rem] relative pt-48 pb-12 min-h-[120vh]">
      <div className="container mx-auto">
        <div className="md:grid md:grid-rows-1 md:grid-cols-2">
          <div className="mb-10 mt-10 md:mb-0  animate__animated animate__fadeInUp">
            <h2 className="text-6xl text-white font-bold mb-8">
              Create a Meeting
            </h2>
            <p className="text-white text-lg mb-8 max-w-[500px]">
              Please, enter the meeting id if you want to join the meeting or
              create a meeting
            </p>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 p-2 px-3 border-2 border-white rounded-md text-[15px] bg-white text-slate-700">
                <i className="lni lni-video"></i> Create a Meeting
              </button>
              <button className="flex items-center gap-2 p-2 px-3 border-2 border-white rounded-md text-[15px] text-white transition hover:bg-white hover:text-slate-900">
                <i className="lni lni-bubble"></i>Join a Meeting
              </button>
            </div>
          </div>
          <div className="w-full mt-2 overflow-hidden md:absolute md:top-20 md:right-0 md:w-1/2 animate__animated animate__fadeInUp animate__delay-0.5s">
            <Image
              className="min-w-[80vw]"
              src={"/img/landing/hero/hero-img.png"}
              alt="hero image"
              width={900}
              height={600}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
