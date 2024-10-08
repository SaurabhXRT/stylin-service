import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { RegisterUserForm } from "./pages/auth/RegisterUser";
import { LoginUserForm } from "./pages/auth/LoginUser";
import { LoginStaffForm } from "./pages/auth/LoginStaff";
import { UserDashboard } from "./pages/user/UserDashboard";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { OwnerDashboard } from "./pages/owner/OwnerDashboard";
import { CreateSalonPage } from "./pages/owner/CreateSalon";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<RegisterUserForm />} />
          <Route path="/login" element={<LoginUserForm />} />
          <Route path="/login-staff" element={<LoginStaffForm />} />
          <Route
            path="/user-dashboard"
            element={<ProtectedRoute role="User" component={UserDashboard} />}
          />
          <Route
            path="/owner-dashboard"
            element={<ProtectedRoute role="Owner" component={OwnerDashboard} />}
          />
          <Route
            path="/owner-dashboard/create-salon"
            element={
              <ProtectedRoute role="Owner" component={CreateSalonPage} />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
