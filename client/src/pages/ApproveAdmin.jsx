import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/api";

const ApproveAdmin = () => {
  const { user } = useContext(AuthContext);
  const [admins, setAdmins] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await api.get("/admins/pending");
        setAdmins(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "অ্যাডমিন লোড ব্যর্থ");
      }
    };
    fetchAdmins();
  }, []);

  const handleApprove = async (adminId, status) => {
    try {
      await api.post(`/admins/approve/${adminId}`, { status });
      setSuccess(
        `অ্যাডমিন ${status === "approved" ? "অনুমোদিত" : "প্রত্যাখ্যাত"} হয়েছে`
      );
      setError("");
      setAdmins(admins.filter((admin) => admin._id !== adminId));
    } catch (err) {
      setError(err.response?.data?.message || "অনুমোদন ব্যর্থ");
      setSuccess("");
    }
  };

  if (user?.role !== "superuser") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        অ্যাক্সেস নিষিদ্ধ
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-6">অ্যাডমিন অনুমোদন</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        {admins.length === 0 ? (
          <p className="text-gray-600">কোনো পেন্ডিং আবেদন নেই</p>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {admins.map((admin) => (
              <div key={admin._id} className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">{admin.name}</h3>
                <p className="text-gray-600 mb-4">ইমেইল: {admin.email}</p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleApprove(admin._id, "approved")}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                  >
                    অনুমোদন
                  </button>
                  <button
                    onClick={() => handleApprove(admin._id, "rejected")}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                  >
                    প্রত্যাখ্যান
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApproveAdmin;
