import { create } from "zustand";
import { nanoid } from "nanoid";
import type { Service } from "../types";

interface ServiceState {
  services: Service[];
  addService: (service: Omit<Service, "id">) => void;
  updateService: (id: string, updated: Omit<Service, "id" | "vehicleId">) => void;
  deleteService: (id: string) => void;
  getServicesByVehicleId: (vehicleId: string) => Service[];
  getServiceById: (id: string) => Service | undefined;
}

export const useServiceStore = create<ServiceState>((set, get) => ({
  services: [],
  addService: (service) =>
    set((state) => ({
      services: [...state.services, { ...service, id: nanoid() }],
    })),
  updateService: (id, updated) =>
    set((state) => ({
      services: state.services.map((s) =>
        s.id === id ? { ...s, ...updated } : s
      ),
    })),
  deleteService: (id) =>
    set((state) => ({
      services: state.services.filter((s) => s.id !== id),
    })),
  getServicesByVehicleId: (vehicleId) =>
    get().services.filter((s) => s.vehicleId === vehicleId),
  getServiceById: (id) => get().services.find((s) => s.id === id),
}));
