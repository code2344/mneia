import { Route, Routes } from "react-router";
import HomePage from "./pages/home";
import DashboardPage from "./pages/dashboard";
import DecksPage from "./pages/decks";
import LoginPage from "./pages/login";
import ReviewsPage from "./pages/reviews";
import AssessmentsPage from "./pages/assessments";
import ProgressPage from "./pages/progress";
import StudyPlanPage from "./pages/study-plan";
import AppLayout from "./components/outlet";
import FileBrowserLayout from "./components/file-browser-layout";

import ProtectedRoute from "./components/protected-route";
import { AuthProvider } from "./auth/auth-context";

import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/study-plan" element={<StudyPlanPage />} />
            <Route path="/progress" element={<ProgressPage />} />
        
            <Route element={<FileBrowserLayout />}>
              <Route path="/decks" element={<DecksPage />} />
              <Route path="/assessments" element={<AssessmentsPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
      <Analytics />
    </AuthProvider>
  );
}

export default App;