import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { RegisterUserForm } from "./pages/auth/RegisterUser";
import { LoginUserForm } from "./pages/auth/LoginUser";
import { LoginStaffForm } from "./pages/auth/LoginStaff";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<RegisterUserForm />} />
          <Route path="/login" element={<LoginUserForm />} />
          <Route path="/login-staff" element={<LoginStaffForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
