import { Route, Routes } from "react-router";
import LandingPage from "./pages/landing";
import NotFoundPage from "./pages/not-found"
import TermsPage from "./pages/terms";
import PrivacyPage from "./pages/privacy";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;