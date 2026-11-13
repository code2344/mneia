import { Route, Routes } from "react-router";
import LandingPage from "./pages/landing";
import NotFoundPage from "./pages/not-found"
import TermsPage from "./pages/terms";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;