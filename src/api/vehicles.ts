import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { nanoid } from "nanoid";

type Vehicle = {
  id: string;
  brand: string;
  model: string;
  year: number;
  registration: string;
};

let vehicles: Vehicle[] = [
  { id: nanoid(), brand: "Audi", model: "A4", year: 2018, registration: "BG123-XY" },
   { id: nanoid(), brand: "BMW", model: "X3", year: 2020, registration: "NS456-ZZ" },
   { id: nanoid(), brand: "Fiat", model: "Punto", year: 2015, registration: "KG789-AB" },
   { id: nanoid(), brand: "Audi", model: "Q5", year: 2019, registration: "SU123-CD" },
   { id: nanoid(), brand: "Toyota", model: "Corolla", year: 2021, registration: "NI654-EF" },
   { id: nanoid(), brand: "BMW", model: "320i", year: 2017, registration: "BG987-GH" },
   { id: nanoid(), brand: "Ford", model: "Focus", year: 2016, registration: "ZA321-IJ" },
   { id: nanoid(), brand: "Audi", model: "A3", year: 2014, registration: "NS234-KL" },
   { id: nanoid(), brand: "Mercedes", model: "C200", year: 2019, registration: "BG345-MN" },
   { id: nanoid(), brand: "Volkswagen", model: "Golf", year: 2018, registration: "KG456-OP" },
];

export const useVehicles = () =>
    useQuery({
      queryKey: ["vehicles"],
      queryFn: () => Promise.resolve(vehicles),
    });
  

export const useAddVehicle = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (v: Omit<Vehicle, "id">) => {
      const newVehicle = { ...v, id: nanoid() };
      vehicles.push(newVehicle);
      return Promise.resolve(newVehicle);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["vehicles"] }),
  });
};

export const useUpdateVehicle = () => {
    const qc = useQueryClient();
    return useMutation({
      mutationFn: (updatedVehicle: Vehicle) => {
        vehicles = vehicles.map((v) =>
          v.id === updatedVehicle.id ? updatedVehicle : v
        );
        return Promise.resolve(updatedVehicle);
      },
      onSuccess: () => qc.invalidateQueries({ queryKey: ["vehicles"] }),
    });
  };
  
  export const useDeleteVehicle = () => {
    const qc = useQueryClient();
    return useMutation({
      mutationFn: (id: string) => {
        vehicles = vehicles.filter((v) => v.id !== id);
        return Promise.resolve(id);
      },
      onSuccess: () => qc.invalidateQueries({ queryKey: ["vehicles"] }),
    });
  };
  
