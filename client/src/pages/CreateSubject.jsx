import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/api";

const CreateSubject = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    department: "",
    paperCodes: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        paperCodes: formData.paperCodes.split(",").map((code) => code.trim()),
      };
      await api.post("/subjects", payload);
      setSuccess("সাবজেক্ট সফলভাবে তৈরি হয়েছে");
      setError("");
      setFormData({ name: "", code: "", department: "", paperCodes: "" });
    } catch (err) {
      setError(err.response?.data?.message || "সাবজেক্ট তৈরি ব্যর্থ");
      setSuccess("");
    }
  };

  if (!["admin", "superuser"].includes(user?.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        অ্যাক্সেস নিষিদ্ধ
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          সাবজেক্ট তৈরি করুন
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">
              সাবজেক্টের নাম
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="code">
              সাবজেক্ট কোড
            </label>
            <input
              type="text"
              id="code"
              name="code"
              value={formData.code}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="department">
              ডিপার্টমেন্ট আইডি
            </label>
            <input
              type="text"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="paperCodes">
              পত্র কোড (কমা দিয়ে আলাদা করুন)
            </label>
            <input
              type="text"
              id="paperCodes"
              name="paperCodes"
              value={formData.paperCodes}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            তৈরি করুন
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSubject;
