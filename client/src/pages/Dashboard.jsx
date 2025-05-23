import { useContext } from "react";
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
          {user?.role === "superuser" && "সুপার ইউজার ড্যাশবোর্ড"}
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
          {["admin", "superuser"].includes(user?.role) && (
            <>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">
                  ডিপার্টমেন্ট তৈরি
                </h3>
                <p className="text-gray-600 mb-4">
                  নতুন ডিপার্টমেন্ট যোগ করুন।
                </p>
                <button
                  onClick={() => navigate("/create-department")}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  তৈরি করুন
                </button>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">
                  ডিপার্টমেন্ট লিস্ট
                </h3>
                <p className="text-gray-600 mb-4">ডিপার্টমেন্টগুলো দেখুন।</p>
                <button
                  onClick={() => navigate("/department-list")}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  দেখুন
                </button>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">সাবজেক্ট তৈরি</h3>
                <p className="text-gray-600 mb-4">নতুন সাবজেক্ট যোগ করুন।</p>
                <button
                  onClick={() => navigate("/create-subject")}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  তৈরি করুন
                </button>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">সাবজেক্ট লিস্ট</h3>
                <p className="text-gray-600 mb-4">সাবজেক্টগুলো দেখুন।</p>
                <button
                  onClick={() => navigate("/subject-list")}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  দেখুন
                </button>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">
                  শিক্ষার্থী অনুমোদন
                </h3>
                <p className="text-gray-600 mb-4">
                  শিক্ষার্থীদের আবেদন অনুমোদন করুন।
                </p>
                <button
                  onClick={() => navigate("/approve-student")}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  অনুমোদন করুন
                </button>
              </div>
            </>
          )}
          {user?.role === "superuser" && (
            <>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">
                  অ্যাডমিন রেজিস্ট্রেশন
                </h3>
                <p className="text-gray-600 mb-4">
                  নতুন অ্যাডমিন রেজিস্টার করুন।
                </p>
                <button
                  onClick={() => navigate("/register-admin")}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  রেজিস্টার করুন
                </button>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">অ্যাডমিন অনুমোদন</h3>
                <p className="text-gray-600 mb-4">
                  অ্যাডমিনদের আবেদন অনুমোদন করুন।
                </p>
                <button
                  onClick={() => navigate("/approve-admin")}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  অনুমোদন করুন
                </button>
              </div>
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
                <h3 className="text-lg font-semibold mb-2">শিক্ষক অনুমোদন</h3>
                <p className="text-gray-600 mb-4">নতুন শিক্ষক অনুমোদন করুন।</p>
                <button
                  onClick={() => navigate("/teacher-list")}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  অনুমোদন করুন
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
