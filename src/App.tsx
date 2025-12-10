import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Onboarding from "./pages/Onboarding";
import VolunteerDashboard from "./pages/VolunteerDashboard";
import DebrisReport from "./pages/DebrisReport";
import VolunteerProfile from "./pages/VolunteerProfile";
import CoordinatorDashboard from "./pages/CoordinatorDashboard";
import TaskDetails from "./pages/TaskDetails";
import TaskComplete from "./pages/TaskComplete";
import TaskHistory from "./pages/TaskHistory";
import Leaderboard from "./pages/Leaderboard";
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
          <Route path="/register" element={<Register />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/volunteer" element={<VolunteerDashboard />} />
          <Route path="/volunteer/report" element={<DebrisReport />} />
          <Route path="/volunteer/profile" element={<VolunteerProfile />} />
          <Route path="/volunteer/task/:id" element={<TaskDetails />} />
          <Route path="/volunteer/task/:id/complete" element={<TaskComplete />} />
          <Route path="/volunteer/history" element={<TaskHistory />} />
          <Route path="/volunteer/leaderboard" element={<Leaderboard />} />
          <Route path="/coordinator" element={<CoordinatorDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
