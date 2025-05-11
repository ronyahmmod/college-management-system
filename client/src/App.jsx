import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Attendance from "./pages/Attendance";
import CreateDepartment from "./pages/CreateDepartment";
import CreateSubject from "./pages/CreateSubject";
import ApplyStudent from "./pages/ApplyStudent";
import ApproveStudent from "./pages/ApproveStudent";
import ApproveAdmin from "./pages/ApproveAdmin";
import RegisterAdmin from "./pages/RegisterAdmin";
import DepartmentList from "./pages/DepartmentList";
import SubjectList from "./pages/SubjectList";
import TeacherList from "./pages/TeacherList";
import CreateTeacher from "./pages/CreateTeacher";
import { useContext } from "react";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        লোড হচ্ছে...
      </div>
    );
  if (!user) return <Navigate to="/login" />;
  if (!allowedRoles.includes(user.role))
    return (
      <div className="min-h-screen flex items-center justify-center">
        অ্যাক্সেস নিষিদ্ধ
      </div>
    );
  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/apply-student" element={<ApplyStudent />} />
        <Route path="/register-admin" element={<RegisterAdmin />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              allowedRoles={["student", "teacher", "admin", "superuser"]}
            >
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/attendance"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <Attendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-department"
          element={
            <ProtectedRoute allowedRoles={["admin", "superuser"]}>
              <CreateDepartment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-subject"
          element={
            <ProtectedRoute allowedRoles={["admin", "superuser"]}>
              <CreateSubject />
            </ProtectedRoute>
          }
        />
        <Route
          path="/approve-student"
          element={
            <ProtectedRoute allowedRoles={["admin", "superuser"]}>
              <ApproveStudent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/approve-admin"
          element={
            <ProtectedRoute allowedRoles={["superuser"]}>
              <ApproveAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/department-list"
          element={
            <ProtectedRoute allowedRoles={["admin", "superuser"]}>
              <DepartmentList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/subject-list"
          element={
            <ProtectedRoute allowedRoles={["admin", "superuser"]}>
              <SubjectList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-teacher"
          element={
            <ProtectedRoute allowedRoles={["admin", "superuser"]}>
              <CreateTeacher />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher-list"
          element={
            <ProtectedRoute allowedRoles={["admin", "superuser"]}>
              <TeacherList />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/apply-student" />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
