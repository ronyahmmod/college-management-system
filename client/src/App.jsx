import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route
            path="/"
            element={
              <h1 className="text-3xl font-bold text-center mt-10">
                College Management System
              </h1>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
