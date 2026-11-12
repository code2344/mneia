import { Route, Routes } from "react-router";
import HomePage from "./pages/home";
import DashboardPage from "./pages/dashboard";
import DecksPage from "./pages/decks";
import LoginPage from "./pages/login";
import ReviewsPage from "./pages/reviews";
import AssessmentsPage from "./pages/assessments";
import ProgressPage from "./pages/progress";
import StudyPlanPage from "./pages/study-plan";

import ProtectedRoute from "./components/protected-route";
import { AuthProvider } from "./auth/auth-context";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/decks" element={<DecksPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/study-plan" element={<StudyPlanPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/assessments" element={<AssessmentsPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;