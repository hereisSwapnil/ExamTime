import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar/Navbar";

export default function LayoutDashboard() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
