import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "Obavezno"),
  password: z.string().min(1, "Obavezno"),
});

export const vehicleSchema = z.object({
  brand: z.string().min(1, "Obavezno"),
  model: z.string().min(1, "Obavezno"),
  year: z.coerce.number().min(1990).max(new Date().getFullYear()),
  registration: z.string().min(3),
});

export const serviceSchema = z.object({
  date: z.string().min(1, "Datum je obavezan"),
  description: z.string().min(3, "Opis je prekratak"),
  price: z.coerce.number().min(0),
  type: z.enum(["redovni", "kvar"]),
});
