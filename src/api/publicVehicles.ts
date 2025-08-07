import { useQuery } from "@tanstack/react-query";

export type PublicVehicle = {
  id: number;
  brand: string;
  model: string;
  year: number;
};

const allVehicles: PublicVehicle[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  brand: ["Toyota", "BMW", "Audi", "Ford", "Renault"][i % 5],
  model: `Model-${i + 1}`,
  year: 2010 + (i % 15),
}));

export const usePublicVehicles = ({
  brandFilter,
  yearFilter,
  page,
  limit = 12,
}: {
  brandFilter?: string;
  yearFilter?: number;
  page: number;
  limit?: number;
}) =>
  useQuery({
    queryKey: ["publicVehicles", brandFilter, yearFilter, page],
    queryFn: () => {
      let filtered = allVehicles;

      if (brandFilter) {
        filtered = filtered.filter((v) =>
          v.brand.toLowerCase().includes(brandFilter.toLowerCase())
        );
      }

      if (yearFilter) {
        filtered = filtered.filter((v) => v.year === yearFilter);
      }

      const start = (page - 1) * limit;
      const end = start + limit;
      const paginated = filtered.slice(start, end);

      return Promise.resolve({
        data: paginated,
        total: filtered.length,
      });
    },
  });
