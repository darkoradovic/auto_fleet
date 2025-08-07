import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Vehicles from "./pages/Vehicles";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import VehicleForm from "./pages/VehiclesForm";
import Navbar from "./components/Navbar";
import VehicleServices from "./pages/VehicleServices";
import PublicVehicles from "./pages/PublicVehicles";

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/vehicles"
          element={
            <ProtectedRoute>
              <Vehicles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vehicles/add"
          element={
            <ProtectedRoute>
              <VehicleForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vehicles/edit/:id"
          element={
            <ProtectedRoute>
              <VehicleForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vehicles/:id/services"
          element={
            <ProtectedRoute>
              <VehicleServices />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/vehicles" />} />
        <Route path="/publicVehicles" element={<PublicVehicles />} />
      </Routes>
    </div>
  );
}
