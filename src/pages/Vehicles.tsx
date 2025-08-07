import { useVehicles } from "../api/vehicles";
import { Link } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";

export default function Vehicles() {
  const { data, isLoading, error } = useVehicles();

  if (isLoading) return <p>Učitavanje vozila...</p>;
  if (error) return <p>Greška pri učitavanju vozila</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Vozila</h2>

      <ul>
        {data?.map((v) => (
          <li
            key={v.id}
            className="border p-2 rounded mb-2 flex justify-between items-center"
          >
            <span>
              {v.brand} {v.model} ({v.year}) - {v.registration}
            </span>
            <div className="flex flex-row items-center gap-2">
              <Link
                to={`/vehicles/edit/${v.id}`}
                className="text-blue-600 hover:underline"
              >
                <FaPen />
              </Link>
              <Link
                to={`/vehicles/${v.id}/services`}
                className="text-blue-600 hover:underline ml-4"
              >
                <FaGear />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
