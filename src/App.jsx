import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";

import Dashboard from "./pages/Dashboard";
import CreateOrder from "./pages/Orders/CreateOrder";

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/createOrder" element={<CreateOrder />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
