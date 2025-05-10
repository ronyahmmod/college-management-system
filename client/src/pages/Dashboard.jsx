import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-500 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">কলেজ ম্যানেজমেন্ট সিস্টেম</h1>
          <div>
            <span className="mr-4">স্বাগতম, {user?.email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
            >
              লগআউট
            </button>
          </div>
        </div>
      </nav>
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">
          {user?.role === "student" && "শিক্ষার্থী ড্যাশবোর্ড"}
          {user?.role === "teacher" && "শিক্ষক ড্যাশবোর্ড"}
          {user?.role === "admin" && "অ্যাডমিন ড্যাশবোর্ড"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {user?.role === "student" && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">রেজাল্ট শিট</h3>
              <p className="text-gray-600 mb-4">আপনার রেজাল্ট শিট দেখুন।</p>
              <button
                onClick={() => navigate("/results")}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                দেখুন
              </button>
            </div>
          )}
          {user?.role === "teacher" && (
            <>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">হাজিরা পোস্ট</h3>
                <p className="text-gray-600 mb-4">
                  শিক্ষার্থীদের হাজিরা রেকর্ড করুন।
                </p>
                <button
                  onClick={() => navigate("/attendance")}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  পোস্ট করুন
                </button>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">রেজাল্ট পোস্ট</h3>
                <p className="text-gray-600 mb-4">
                  শিক্ষার্থীদের রেজাল্ট পোস্ট করুন।
                </p>
                <button
                  onClick={() => navigate("/post-results")}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  পোস্ট করুন
                </button>
              </div>
            </>
          )}
          {user?.role === "admin" && (
            <>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">শিক্ষক তৈরি</h3>
                <p className="text-gray-600 mb-4">নতুন শিক্ষক যোগ করুন।</p>
                <button
                  onClick={() => navigate("/create-teacher")}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  তৈরি করুন
                </button>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">
                  রেজাল্ট পাবলিকেশন
                </h3>
                <p className="text-gray-600 mb-4">রেজাল্ট পাবলিশ করুন।</p>
                <button
                  onClick={() => navigate("/publish-results")}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  পাবলিশ করুন
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
