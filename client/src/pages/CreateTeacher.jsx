import { useState, useEffect } from "react";
import api from "../utils/api";

const CreateTeacher = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    subjects: [{ subject: "", paperCodes: [""] }],
  });
  const [departments, setDepartments] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await api.get("/departments");
        setDepartments(response.data.departments);
      } catch (err) {
        setError(err.response?.data?.message || "ডিপার্টমেন্ট লোড ব্যর্থ");
      }
    };
    const fetchSubjects = async () => {
      try {
        const response = await api.get("/subjects");
        setSubjects(response.data.subjects);
      } catch (err) {
        setError(err.response?.data?.message || "সাবজেক্ট লোড ব্যর্থ");
      }
    };
    fetchDepartments();
    fetchSubjects();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubjectChange = (index, field, value) => {
    const newSubjects = [...formData.subjects];
    if (field === "subject") {
      newSubjects[index].subject = value;
    } else if (field === "paperCode") {
      newSubjects[index].paperCodes = value
        .split(",")
        .map((code) => code.trim());
    }
    setFormData({ ...formData, subjects: newSubjects });
  };

  const addSubject = () => {
    setFormData({
      ...formData,
      subjects: [...formData.subjects, { subject: "", paperCodes: [""] }],
    });
  };

  const removeSubject = (index) => {
    const newSubjects = formData.subjects.filter((_, i) => i !== index);
    setFormData({ ...formData, subjects: newSubjects });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/teachers", formData);
      setSuccess("শিক্ষক সফলভাবে তৈরি হয়েছে");
      setError("");
      setFormData({
        name: "",
        email: "",
        phone: "",
        department: "",
        subjects: [{ subject: "", paperCodes: [""] }],
      });
    } catch (err) {
      setError(err.response?.data?.message || "শিক্ষক তৈরি ব্যর্থ");
      setSuccess("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">শিক্ষক তৈরি</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">
              নাম
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
            <label className="block text-gray-700 mb-2" htmlFor="email">
              ইমেইল
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="phone">
              ফোন
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="department">
              ডিপার্টমেন্ট
            </label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">ডিপার্টমেন্ট নির্বাচন করুন</option>
              {departments.map((dept) => (
                <option key={dept._id} value={dept._id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              সাবজেক্ট এবং পেপার কোড
            </label>
            {formData.subjects.map((subj, index) => (
              <div key={index} className="mb-2 p-4 border rounded">
                <div className="mb-2">
                  <label
                    className="block text-gray-700 mb-1"
                    htmlFor={`subject-${index}`}
                  >
                    সাবজেক্ট
                  </label>
                  <select
                    id={`subject-${index}`}
                    value={subj.subject}
                    onChange={(e) =>
                      handleSubjectChange(index, "subject", e.target.value)
                    }
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">সাবজেক্ট নির্বাচন করুন</option>
                    {subjects.map((subject) => (
                      <option key={subject._id} value={subject._id}>
                        {subject.name} ({subject.code})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-2">
                  <label
                    className="block text-gray-700 mb-1"
                    htmlFor={`paperCodes-${index}`}
                  >
                    পেপার কোড (কমা দিয়ে আলাদা করুন)
                  </label>
                  <input
                    type="text"
                    id={`paperCodes-${index}`}
                    value={subj.paperCodes.join(", ")}
                    onChange={(e) =>
                      handleSubjectChange(index, "paperCode", e.target.value)
                    }
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                {formData.subjects.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSubject(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    সরান
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addSubject}
              className="text-blue-500 hover:text-blue-700"
            >
              + নতুন সাবজেক্ট যোগ করুন
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            শিক্ষক তৈরি করুন
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTeacher;
