import { usePublicVehicles } from "../api/publicVehicles";
import { useState } from "react";

export default function PublicVehicles() {
  const [brand, setBrand] = useState("");
  const [year, setYear] = useState<number | undefined>();
  const [page, setPage] = useState(1);

  const { data, isLoading } = usePublicVehicles({
    brandFilter: brand,
    yearFilter: year,
    page,
  });

  const totalPages = data ? Math.ceil(data.total / 12) : 1;

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Javna Lista Vozila</h1>

      <div className="flex gap-4 flex-wrap mb-6">
        <input
          placeholder="Pretraga po marki"
          value={brand}
          onChange={(e) => {
            setBrand(e.target.value);
            setPage(1);
          }}
          className="border px-3 py-2 rounded"
        />
        <input
          placeholder="Godina"
          type="number"
          value={year ?? ""}
          onChange={(e) => {
            setYear(e.target.value ? Number(e.target.value) : undefined);
            setPage(1);
          }}
          className="border px-3 py-2 rounded"
        />
      </div>

      {isLoading ? (
        <p>Učitavanje...</p>
      ) : data?.data.length === 0 ? (
        <p className="text-center text-gray-500">
          Nema vozila po zadatoj pretrazi.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data?.data.map((v) => (
            <div key={v.id} className="border p-4 rounded shadow">
              <h3 className="font-bold text-lg">
                {v.brand} {v.model}
              </h3>
              <p>Godina: {v.year}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 flex gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Prethodna
        </button>
        <span className="px-4 py-2">
          Strana {page} / {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Sledeća
        </button>
      </div>
    </div>
  );
}
