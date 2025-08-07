import { useParams } from "react-router-dom";
import {
  useVehicleServices,
  useAddService,
  useDeleteService,
  useUpdateService,
} from "../api/services";
import { useVehicles } from "../api/vehicles";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { serviceSchema } from "../utils/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

type FormData = z.infer<typeof serviceSchema>;

export default function VehicleServices() {
  const { id } = useParams<{ id: string }>();
  const vehicleId = id ?? "";
  const { data: vehicles } = useVehicles();
  const { data: services } = useVehicleServices(vehicleId);
  const addService = useAddService();
  const updateService = useUpdateService();
  const deleteService = useDeleteService();

  const vehicle = vehicles?.find((v) => v.id === vehicleId);
  const [editService, setEditService] = useState<number | null>(null);

  const { register, handleSubmit, reset, setValue } = useForm({
    resolver: zodResolver(serviceSchema),
  });

  const onSubmit = (data: FormData) => {
    if (editService) {
      updateService.mutate(
        { ...data, vehicleId, id: editService },
        { onSuccess: () => setEditService(null) }
      );
    } else {
      addService.mutate({ ...data, vehicleId });
    }
    reset();
  };

  const onEdit = (service: any) => {
    setEditService(service.id);
    setValue("date", service.date);
    setValue("description", service.description);
    setValue("price", service.price);
    setValue("type", service.type);
  };

  const onDelete = (id: number) => {
    if (confirm("Obrisati servis?")) {
      deleteService.mutate(id);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl mb-4">
        Servisi za: {vehicle?.brand} {vehicle?.model}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
        <input
          type="date"
          {...register("date")}
          className="w-full border rounded-md p-2"
        />
        <input
          placeholder="Opis"
          {...register("description")}
          className="w-full border rounded-md p-2"
        />
        <input
          type="number"
          placeholder="Cena"
          {...register("price")}
          className="w-full border rounded-md p-2"
        />
        <select {...register("type")} className="w-full border rounded-md p-2">
          <option value="redovni">Redovni</option>
          <option value="kvar">Kvar</option>
        </select>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          {editService ? "Sačuvaj izmene" : "Dodaj servis"}
        </button>
        {editService && (
          <button
            type="button"
            onClick={() => {
              setEditService(null);
              reset();
            }}
            className="ml-2 bg-gray-400 text-white px-4 py-2 rounded"
          >
            Otkaži
          </button>
        )}
      </form>

      <ul className="space-y-3">
        {services?.map((s) => (
          <li
            key={s.id}
            className="border p-3 rounded flex justify-between items-center"
          >
            <div>
              <p className="font-medium">
                {s.date} / {s.type.toUpperCase()}
              </p>
              <p>{s.description}</p>
              <p className="text-sm text-gray-600">Cena: {s.price}€</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(s)}
                className="text-blue-600 hover:underline"
              >
                Izmeni
              </button>
              <button
                onClick={() => onDelete(s.id)}
                className="text-red-600 hover:underline"
              >
                Obriši
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
