import { Link } from "react-router-dom";
import { useAuth } from "../store/auth";
import { CiLogout } from "react-icons/ci";
import { MdOutlineAddCircle } from "react-icons/md";
import { FaCar } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-500 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between h-auto sm:h-20">
      <div className="flex justify-between items-center w-full sm:w-auto mb-3 sm:mb-0">
        <Link to="/" className="text-xl text-white font-bold">
          AutoFleet
        </Link>
        <Link
          to="/publicVehicles"
          className="flex flex-row gap-2 items-center text-sm text-white sm:ml-6"
        >
          <FaCar />
          <span>Javna lista vozila</span>
        </Link>
      </div>

      {user && (
        <div className="flex items-center gap-3 min-w-[150px] justify-end">
          <Link
            to="/vehicles/add"
            className="flex items-center gap-2 bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 text-sm sm:text-base"
          >
            <MdOutlineAddCircle />
            <span className="hidden sm:inline">Dodaj vozilo</span>
          </Link>

          <button
            onClick={logout}
            className="bg-white w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
            aria-label="Logout"
          >
            <CiLogout size={20} color="black" />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
