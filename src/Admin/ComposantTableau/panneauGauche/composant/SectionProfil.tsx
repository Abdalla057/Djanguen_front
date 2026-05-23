import { User } from "lucide-react";
import React from "react";

const SectionProfil = () => {
  return (
    <div
      className="
        bg-white
        rounded-[28px]
        shadow-lg
        p-6
        flex flex-col
        items-center
        justify-center
        text-center
        w-full
      "
    >
      {/* Avatar */}
      <div
        className="
          w-24 h-24
          rounded-full
          bg-gradient-to-br
          from-indigo-200
          to-violet-300
          flex items-center justify-center
          mb-4
        "
      >
        <User className="w-10 h-10 text-white" />
      </div>

      {/* Nom */}
      <h2 className="text-lg font-bold text-slate-800">
        Stella Walton
      </h2>

      {/* Role */}
      <p className="text-sm text-slate-500 mt-1">
        Student
      </p>

      {/* Bouton */}
      <button
        className="
          mt-5
          px-6 py-2.5
          rounded-full
          bg-indigo-600
          hover:bg-indigo-700
          text-white
          text-sm
          font-medium
          transition-all
        "
      >
        Profile
      </button>
    </div>
  );
};

export default SectionProfil;