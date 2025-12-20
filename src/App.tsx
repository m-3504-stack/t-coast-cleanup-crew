import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import CoordinatorLogin from "./pages/CoordinatorLogin";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Onboarding from "./pages/Onboarding";
import VolunteerDashboard from "./pages/VolunteerDashboard";
import VolunteerSettings from "./pages/VolunteerSettings";
import DebrisReport from "./pages/DebrisReport";
import VolunteerProfile from "./pages/VolunteerProfile";
import CoordinatorDashboard from "./pages/CoordinatorDashboard";
import TaskDetails from "./pages/TaskDetails";
import TaskComplete from "./pages/TaskComplete";
import TaskHistory from "./pages/TaskHistory";
import Leaderboard from "./pages/Leaderboard";
import NotificationCenter from "./pages/NotificationCenter";
import HotspotMap from "./pages/coordinator/HotspotMap";
import ReportReview from "./pages/coordinator/ReportReview";
import TaskReview from "./pages/coordinator/TaskReview";
import ScheduleManager from "./pages/coordinator/ScheduleManager";
import VolunteerManagement from "./pages/coordinator/VolunteerManagement";
import VolunteerTaskHistory from "./pages/coordinator/VolunteerTaskHistory";
import CoordinatorLeaderboard from "./pages/coordinator/CoordinatorLeaderboard";
import CoordinatorSettings from "./pages/coordinator/CoordinatorSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/coordinator-login" element={<CoordinatorLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/onboarding" element={<Onboarding />} />
          
          {/* Volunteer Routes */}
          <Route path="/volunteer" element={<VolunteerDashboard />} />
          <Route path="/volunteer/report" element={<DebrisReport />} />
          <Route path="/volunteer/profile" element={<VolunteerProfile />} />
          <Route path="/volunteer/settings" element={<VolunteerSettings />} />
          <Route path="/volunteer/task/:id" element={<TaskDetails />} />
          <Route path="/volunteer/task/:id/complete" element={<TaskComplete />} />
          <Route path="/volunteer/history" element={<TaskHistory />} />
          <Route path="/volunteer/leaderboard" element={<Leaderboard />} />
          <Route path="/volunteer/notifications" element={<NotificationCenter />} />
          
          {/* Coordinator Routes */}
          <Route path="/coordinator" element={<CoordinatorDashboard />} />
          <Route path="/coordinator/hotspots" element={<HotspotMap />} />
          <Route path="/coordinator/reports" element={<ReportReview />} />
          <Route path="/coordinator/tasks" element={<TaskReview />} />
          <Route path="/coordinator/schedules" element={<ScheduleManager />} />
          <Route path="/coordinator/schedules/new" element={<ScheduleManager />} />
          <Route path="/coordinator/volunteers" element={<VolunteerManagement />} />
          <Route path="/coordinator/volunteers/:volunteerId/history" element={<VolunteerTaskHistory />} />
          <Route path="/coordinator/leaderboard" element={<CoordinatorLeaderboard />} />
          <Route path="/coordinator/settings" element={<CoordinatorSettings />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
