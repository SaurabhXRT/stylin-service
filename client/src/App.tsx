import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { RegisterUserForm } from "./pages/auth/RegisterUser";
import { LoginUserForm } from "./pages/auth/LoginUser";
import { LoginStaffForm } from "./pages/auth/LoginStaff";
import { UserDashboard } from "./pages/user/UserDashboard";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { OwnerDashboard } from "./pages/owner/OwnerDashboard";
import { CreateSalonPage } from "./pages/owner/CreateSalon";
import CreateStaffPage from "./pages/owner/CreateStaff";
import { StaffTableOwner } from "./pages/owner/StaffTablePage";
import { StaffTable } from "./pages/user/StaffTable";
import { StaffServicePage } from "./pages/user/StaffServicePage";
import { StaffDashboardPage } from "./pages/staff/StaffDashboard";
import { LeavePage } from "./pages/staff/LeavePage";
import { CreateAttendanceTimings } from "./pages/owner/CreateAttendence";
import { LeaveApplicationTable } from "./pages/owner/LeaveApplicationTable";
import { AttendancePage } from "./pages/staff/AttendencePage";
import { StaffDetails } from "./pages/owner/StaffDetails";
import { StaffTableManager } from "./pages/staff/ManagerStaffs";
import { ManagerStaffDetails } from "./pages/staff/ManagerStaffDetails";
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
            path="/staff-dashboard"
            element={
              <ProtectedRoute role="Staff" component={StaffDashboardPage} />
            }
          />
          <Route
            path="/staff-dashboard/leave-page"
            element={<ProtectedRoute role="Staff" component={LeavePage} />}
          />
          <Route
            path="/staff-dashboard/salon/:salonId/staffs"
            element={
              <ProtectedRoute role="Staff" component={StaffTableManager} />
            }
          />
          <Route
            path="/staff-dashboard/staff/:staffId"
            element={
              <ProtectedRoute role="Staff" component={ManagerStaffDetails} />
            }
          />
          <Route
            path="/staff-dashboard/attendance-page"
            element={<ProtectedRoute role="Staff" component={AttendancePage} />}
          />
          <Route
            path="/owner-dashboard/create-salon"
            element={
              <ProtectedRoute role="Owner" component={CreateSalonPage} />
            }
          />
          <Route
            path="/owner-dashboard/salon/create-staff/:salonId"
            element={
              <ProtectedRoute role="Owner" component={CreateStaffPage} />
            }
          />
          <Route
            path="/owner-dashboard/salon/:salonId"
            element={
              <ProtectedRoute role="Owner" component={StaffTableOwner} />
            }
          />
          <Route
            path="/owner-dashboard/salon/create-attendance-timings/:salonId"
            element={
              <ProtectedRoute
                role="Owner"
                component={CreateAttendanceTimings}
              />
            }
          />
          <Route
            path="/owner-dashboard/staff/:staffId"
            element={<ProtectedRoute role="Owner" component={StaffDetails} />}
          />
          <Route
            path="/owner-dashboard/leave-application"
            element={
              <ProtectedRoute role="Owner" component={LeaveApplicationTable} />
            }
          />
          <Route
            path="/user-dashboard/salon/:salonId"
            element={<ProtectedRoute role="User" component={StaffTable} />}
          />
          <Route
            path="/user-dashboard/salon/staff/:staffId"
            element={
              <ProtectedRoute role="User" component={StaffServicePage} />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
