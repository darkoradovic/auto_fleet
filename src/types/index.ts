
export interface Vehicle {
    id: string;
    brand: string;
    model: string;
    year: number;
    registration: string;
  }
  
export type ServiceType = "redovni" | "kvar";

export interface Service {
  id: string;
  vehicleId: string; 
  date: string;     
  description: string;
  price: number;
  type: ServiceType;
}