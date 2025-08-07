import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { vehicleSchema } from "../utils/validation";
import { z } from "zod";
import {
  useAddVehicle,
  useDeleteVehicle,
  useUpdateVehicle,
  useVehicles,
} from "../api/vehicles";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

type VehicleFormData = z.infer<typeof vehicleSchema>;

export default function VehicleForm() {
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;
  const { data: vehicles } = useVehicles();
  const navigate = useNavigate();
  const addVehicle = useAddVehicle();
  const updateVehicle = useUpdateVehicle();
  const deleteVehicle = useDeleteVehicle();

  const vehicleToEdit = vehicles?.find((v) => v.id === id);

  const { register, handleSubmit, reset, formState } = useForm({
    resolver: zodResolver(vehicleSchema),
  });

  useEffect(() => {
    if (isEditMode && vehicleToEdit) {
      reset(vehicleToEdit);
    }
  }, [isEditMode, vehicleToEdit, reset]);

  const onSubmit = (data: VehicleFormData) => {
    if (isEditMode && vehicleToEdit) {
      updateVehicle.mutate(
        { ...data, id: vehicleToEdit.id },
        {
          onSuccess: () => navigate("/vehicles"),
        }
      );
    } else {
      addVehicle.mutate(data, {
        onSuccess: () => navigate("/vehicles"),
      });
    }
  };

  const handleDelete = () => {
    if (
      vehicleToEdit &&
      confirm("Da li ste sigurni da želite da obrišete vozilo?")
    ) {
      deleteVehicle.mutate(vehicleToEdit.id, {
        onSuccess: () => navigate("/vehicles"),
      });
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">
        {isEditMode ? "Izmeni vozilo" : "Dodaj vozilo"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("brand")}
          placeholder="Marka"
          className="w-full border rounded px-3 py-2"
        />
        {formState.errors.brand && (
          <p className="text-red-500">{formState.errors.brand.message}</p>
        )}

        <input
          {...register("model")}
          placeholder="Model"
          className="w-full border rounded px-3 py-2"
        />
        {formState.errors.model && (
          <p className="text-red-500">{formState.errors.model.message}</p>
        )}

        <input
          {...register("year", { valueAsNumber: true })}
          placeholder="Godina"
          type="number"
          className="w-full border rounded px-3 py-2"
        />
        {formState.errors.year && (
          <p className="text-red-500">{formState.errors.year.message}</p>
        )}

        <input
          {...register("registration")}
          placeholder="Registracija"
          className="w-full border rounded px-3 py-2"
        />
        {formState.errors.registration && (
          <p className="text-red-500">
            {formState.errors.registration.message}
          </p>
        )}

        <div className="flex flex-row justify-between">
          <button
            type="submit"
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer"
          >
            {isEditMode ? "Sačuvaj izmene" : "Dodaj vozilo"}
          </button>
          {isEditMode && (
            <button
              type="button"
              onClick={handleDelete}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
            >
              Obriši vozilo
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
