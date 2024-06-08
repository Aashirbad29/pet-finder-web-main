import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardLayout from "./layout/dashboard";
import ProtectedRoute from "./pages/protected-route";
import Login from "./pages/login/login";
import Dashboard from "./pages/dashboard/dashboard";
import HomePage from "./pages/home/home";
import Contact from "./pages/contact/contact";
import Pets from "./pages/pets/pets";
import About from "./pages/about/about";
import SignUp from "./pages/sign-up/sign-up";
import HomeLayout from "./layout/home-layout";
import PageNotFound from "./pages/pagenotfound/pagenotfound";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />

          <Route path="/" element={<HomeLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/pets" element={<Pets />} />
            <Route path="/about" element={<About />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
