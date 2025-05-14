import Image from "next/image";
import Link from "next/link";
import React from "react";

const People = () => {
  return (
    <div className="p-2 w-full">
      <div className="flex items-center gap-2 p-4 shadow-md rounded-md w-full">
        <Image src={"/img/avatars/b8.webp"} alt="user" width={40} height={40} />
        <div className="ms-4">
          <h2 className="font-semibold">Swati Ojha</h2>
          <h2 className="text-[12px] text-slate-600">UI / UX Designer</h2>
        </div>
        <Link
          href={"auth/dashboard/people/2"}
          className="bg-primary rounded-full p-2 text-lg w-8 h-8 flex items-center transition justify-center text-slate-200 ms-auto hover:scale-105 active:border-2 active:border-primary active:bg-white active:text-primary"
        >
          <i className="lni lni-comments-alt-2"></i>
        </Link>
      </div>
    </div>
  );
};

export default People;
