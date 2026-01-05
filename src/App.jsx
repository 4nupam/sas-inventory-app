import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";

/* ---------------- Lazy Imports ---------------- */

// Layout
const Navbar = lazy(() => import("./Components/Navbar"));

// Public pages
const HomeScreen = lazy(() => import("./Components/HomeScreen"));
const Login = lazy(() => import("./auth/Login"));
const Register = lazy(() => import("./auth/Register"));
const RegisterNewUser = lazy(() => import("./auth/RegisterNewUser"));

// Protected pages
const Dashboard = lazy(() => import("./Pages/Dashboard"));
const Inventory = lazy(() => import("./Pages/Inventory"));
const Orders = lazy(() => import("./Pages/Orders"));
const Leads = lazy(() => import("./Pages/Leads"));
const Report = lazy(() => import("./Pages/Report"));

/* ---------------- Loader ---------------- */

const PageLoader = () => (
  <div className="flex h-screen w-screen items-center justify-center">
    <span className="text-gray-600">Loading...</span>
  </div>
);

/* ---------------- Auth Utils ---------------- */

const isAuthenticated = () => {
  const authUser = localStorage.getItem("authUser");
  return Boolean(authUser);
};

/* ---------------- Layout ---------------- */

const AppLayout = () => {
  return (
    <div className="flex h-screen w-screen">
      <Navbar />
      <main className="flex-1 overflow-y-auto  p-6">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="orders" element={<Orders />} />
            <Route path="leads" element={<Leads />} />
            <Route path="reports" element={<Report />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

/* ---------------- Route Guards ---------------- */

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

/* ---------------- App ---------------- */

function App() {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>

          {/* ---------- Public Routes ---------- */}
          <Route path="/" element={<HomeScreen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-new-user" element={<RegisterNewUser />} />

          {/* ---------- Protected App ---------- */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="orders" element={<Orders />} />
            <Route path="leads" element={<Leads />} />
            <Route path="report" element={<Report />} />
          </Route>

          {/* ---------- Fallback ---------- */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
