import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";

import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import CreateOrder from "./pages/Orders/CreateOrder";
import practice from "./practice";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          element={
            <AppLayout>
              <Outlet />
            </AppLayout>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/createOrder" element={<CreateOrder />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
