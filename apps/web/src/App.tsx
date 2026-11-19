import { Route, Routes } from "react-router";
import AppLoading from "./components/app-loading";
import HomePage from "./pages/home";
import DashboardPage from "./pages/dashboard";
import DecksPage from "./pages/decks";
import DeckPage from "./pages/deck";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup"
import ReviewsPage from "./pages/reviews";
import AssessmentsPage from "./pages/assessments";
import ProgressPage from "./pages/progress";
import StudyPlanPage from "./pages/study-plan";
import AppLayout from "./components/outlet";
import FileBrowserLayout from "./components/file-browser-layout";

import ProtectedRoute from "./components/protected-route";
import { AuthProvider } from "./auth/auth-context";

import { Analytics } from "@vercel/analytics/react";
import { Suspense } from "react";
import VercelToolbarGated from "./components/vercel-toolbar";

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<AppLoading />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
  
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/reviews" element={<ReviewsPage />} />
              <Route path="/study-plan" element={<StudyPlanPage />} />
              <Route path="/progress" element={<ProgressPage />} />
              <Route element={<FileBrowserLayout title="My Decks" />}>
                <Route path="/decks" element={<DecksPage />} />
              </Route>
              <Route path="/decks/:deckId" element={<DeckPage />} />
              <Route element={<FileBrowserLayout title="My Assessments" />}>
                <Route path="/assessments" element={<AssessmentsPage />} />
              </Route>
            </Route>
          </Route>
        </Routes>
        <Analytics />
        <VercelToolbarGated />
      </Suspense>
    </AuthProvider>
  );
}

export default App;