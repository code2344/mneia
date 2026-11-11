import { Link, Route, Routes } from "react-router";
import HomePage from "./pages/home";
import DashboardPage from "./pages/dashboard";
import DecksPage from "./pages/decks";
import LoginPage from "./pages/login";
import ProtectedRoute from "./components/protected-route";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/decks" element={<DecksPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;