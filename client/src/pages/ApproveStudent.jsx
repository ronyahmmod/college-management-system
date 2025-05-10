import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/api";

const ApproveStudent = () => {
  const { user } = useContext(AuthContext);
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({ roll: "", subjects: "" });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get("/students/pending");
        setStudents(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "শিক্ষার্থী লোড ব্যর্থ");
      }
    };
    fetchStudents();
  }, []);

  const handleApprove = async (studentId, status) => {
    try {
      await api.post(`/students/approve/${studentId}`, { status });
      setSuccess(
        `শিক্ষার্থী ${
          status === "approved" ? "অনুমোদিত" : "প্রত্যাখ্যাত"
        } হয়েছে`
      );
      setError("");
      setStudents(students.filter((student) => student._id !== studentId));
    } catch (err) {
      setError(err.response?.data?.message || "অনুমোদন ব্যর্থ");
      setSuccess("");
    }
  };

  const handleAssign = async (studentId) => {
    try {
      const subjects = formData.subjects.split(",").map((s) => s.trim());
      await api.post(`/students/assign/${studentId}`, {
        roll: formData.roll,
        subjects,
      });
      setSuccess("রোল এবং সাবজেক্ট অ্যাসাইন করা হয়েছে");
      setError("");
      setFormData({ roll: "", subjects: "" });
      setStudents(students.filter((student) => student._id !== studentId));
    } catch (err) {
      setError(err.response?.data?.message || "অ্যাসাইন ব্যর্থ");
      setSuccess("");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!["admin", "superuser"].includes(user?.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        অ্যাক্সেস নিষিদ্ধ
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-6">শিক্ষার্থী অনুমোদন</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        {students.length === 0 ? (
          <p className="text-gray-600">কোনো পেন্ডিং আবেদন নেই</p>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {students.map((student) => (
              <div key={student._id} className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">{student.name}</h3>
                <p className="text-gray-600 mb-2">ইমেইল: {student.email}</p>
                <p className="text-gray-600 mb-2">ফোন: {student.phone}</p>
                <p className="text-gray-600 mb-4">
                  ডিপার্টমেন্ট আইডি: {student.department}
                </p>
                <div className="flex space-x-4 mb-4">
                  <button
                    onClick={() => handleApprove(student._id, "approved")}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                  >
                    অনুমোদন
                  </button>
                  <button
                    onClick={() => handleApprove(student._id, "rejected")}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                  >
                    প্রত্যাখ্যান
                  </button>
                </div>
                {student.status === "approved" && (
                  <div>
                    <h4 className="text-md font-semibold mb-2">
                      রোল এবং সাবজেক্ট অ্যাসাইন
                    </h4>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 mb-2"
                        htmlFor={`roll-${student._id}`}
                      >
                        রোল
                      </label>
                      <input
                        type="text"
                        id={`roll-${student._id}`}
                        name="roll"
                        value={formData.roll}
                        onChange={handleChange}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 mb-2"
                        htmlFor={`subjects-${student._id}`}
                      >
                        সাবজেক্ট আইডি (কমা দিয়ে আলাদা করুন)
                      </label>
                      <input
                        type="text"
                        id={`subjects-${student._id}`}
                        name="subjects"
                        value={formData.subjects}
                        onChange={handleChange}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <button
                      onClick={() => handleAssign(student._id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    >
                      অ্যাসাইন করুন
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApproveStudent;
