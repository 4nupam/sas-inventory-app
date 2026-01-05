import { memo } from "react";
import { GrLinkNext } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

const HomeScreen = () => {
  const navigate = useNavigate();
  return (
    <section className="home-screen flex items-center justify-between h-screen w-screen px-10">
      <div className="flex flex-col mx-auto gap-4 items-center justify-center">
        <h1 className="font-bold text-5xl text-white">Welcome to Inventory App</h1>

        <button
          onClick={() => navigate("/login")}
          type="button"
          className="
          flex items-center gap-3 
          bg-black text-white 
          px-6 py-3 rounded-lg
          text-lg font-semibold
          hover:bg-gray-800 
          transition-all duration-300
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black
        "
          aria-label="Get started"
        >
          Let&apos;s Get Started
          <GrLinkNext size={20} />
        </button>
      </div>
    </section>
  );
};

export default memo(HomeScreen);
