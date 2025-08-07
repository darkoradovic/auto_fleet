import { create } from "zustand";
import { nanoid } from "nanoid";

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  registration: string;
}

const dummyVehicles: Vehicle[] = [
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

interface VehicleState {
  vehicles: Vehicle[];
  addVehicle: (vehicle: Omit<Vehicle, "id">) => void;
  updateVehicle: (id: string, updated: Omit<Vehicle, "id">) => void;
  deleteVehicle: (id: string) => void;
  getVehicleById: (id: string) => Vehicle | undefined;
}

export const useVehicleStore = create<VehicleState>((set, get) => ({
  vehicles: dummyVehicles,
  addVehicle: (vehicle) =>
    set((state) => ({
      vehicles: [...state.vehicles, { ...vehicle, id: nanoid() }],
    })),
  updateVehicle: (id, updated) =>
    set((state) => ({
      vehicles: state.vehicles.map((v) => (v.id === id ? { ...v, ...updated } : v)),
    })),
  deleteVehicle: (id) =>
    set((state) => ({
      vehicles: state.vehicles.filter((v) => v.id !== id),
    })),
  getVehicleById: (id) => get().vehicles.find((v) => v.id === id),
}));
