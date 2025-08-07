import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type Service = {
  id: number;
  vehicleId: string;
  date: string;
  description: string;
  price: number;
  type: "redovni" | "kvar";
};

let services: Service[] = [
  {
    id: 1,
    vehicleId: 'h_678skaok976',
    date: "2025-01-01",
    description: "Zamena ulja",
    price: 50,
    type: "redovni",
  },
];

function getServicesByVehicleId(id: string) {
  return Promise.resolve(services.filter((s) => s.vehicleId === id));
}


export const useVehicleServices = (vehicleId: string) => {
  return useQuery({
    queryKey: ["services", vehicleId],
    queryFn: () => getServicesByVehicleId(vehicleId),
  });
};


export const useAddService = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (s: Omit<Service, "id">) => {
      const newService = { ...s, id: Date.now() };
      services.push(newService);
      return Promise.resolve(newService);
    },
    onSuccess: (_, { vehicleId }) => {
      qc.invalidateQueries({queryKey: ["services", vehicleId]});
    },
  });
};

export const useUpdateService = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (s: Service) => {
      services = services.map((item) => (item.id === s.id ? s : item));
      return Promise.resolve(s);
    },
    onSuccess: (_, s) => {
      qc.invalidateQueries({queryKey: ["services", s.vehicleId]});
    },
  });
};

export const useDeleteService = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => {
      const service = services.find((s) => s.id === id);
      if (service) {
        services = services.filter((s) => s.id !== id);
        return Promise.resolve(service);
      }
      return Promise.reject("Not found");
    },
    onSuccess: (deletedService) => {
      if (deletedService) {
        qc.invalidateQueries({queryKey: ["services", deletedService.vehicleId]});
      }
    },
  });
};
