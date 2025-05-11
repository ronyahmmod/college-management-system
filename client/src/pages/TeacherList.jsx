import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/api";

const TeacherList = () => {
  const { user } = useContext(AuthContext);
  const [teachers, setTeachers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState("");

  const fetchDepartments = async () => {
    try {
      const response = await api.get("/departments");
      setDepartments(response.data.departments);
    } catch (err) {
      setError(err.response?.data?.message || "ডিপার্টমেন্ট লোড ব্যর্থ");
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await api.get(
        `/teachers?page=${currentPage}&limit=10&search=${search}&department=${departmentFilter}`
      );
      setTeachers(response.data.teachers);
      setTotalPages(response.data.totalPages);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "শিক্ষক লোড ব্যর্থ");
    }
  };

  useEffect(() => {
    fetchDepartments();
    fetchTeachers();
  }, [currentPage, search, departmentFilter]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleDepartmentFilter = (e) => {
    setDepartmentFilter(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
        <h2 className="text-2xl font-bold mb-6">শিক্ষক লিস্ট</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4 flex space-x-4">
          <input
            type="text"
            placeholder="শিক্ষক সার্চ করুন..."
            value={search}
            onChange={handleSearch}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={departmentFilter}
            onChange={handleDepartmentFilter}
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">সব ডিপার্টমেন্ট</option>
            {departments.map((dept) => (
              <option key={dept._id} value={dept._id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>
        {teachers.length === 0 ? (
          <p className="text-gray-600">কোনো শিক্ষক পাওয়া যায়নি</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow">
                <thead>
                  <tr className="bg-blue-500 text-white">
                    <th className="p-3 text-left">নাম</th>
                    <th className="p-3 text-left">ইমেইল</th>
                    <th className="p-3 text-left">ডিপার্টমেন্ট</th>
                    <th className="p-3 text-left">সাবজেক্ট</th>
                    <th className="p-3 text-left">তৈরির তারিখ</th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map((teacher) => (
                    <tr key={teacher._id} className="border-b">
                      <td className="p-3">{teacher.name}</td>
                      <td className="p-3">{teacher.email}</td>
                      <td className="p-3">
                        {teacher.department?.name || "N/A"}
                      </td>
                      <td className="p-3">
                        {teacher.subjects.map((subj, index) => (
                          <div key={index}>
                            {subj.subject?.name} ({subj.subject?.code}):{" "}
                            {subj.paperCodes.join(", ")}
                          </div>
                        ))}
                      </td>
                      <td className="p-3">
                        {new Date(teacher.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-center space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 rounded ${
                      currentPage === page
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TeacherList;
