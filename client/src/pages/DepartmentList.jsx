import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/api";

const DepartmentList = () => {
  const { user } = useContext(AuthContext);
  const [departments, setDepartments] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const fetchDepartments = async () => {
    try {
      const response = await api.get(
        `/departments?page=${currentPage}&limit=10&search=${search}`
      );
      setDepartments(response.data.departments);
      setTotalPages(response.data.totalPages);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "ডিপার্টমেন্ট লোড ব্যর্থ");
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, [currentPage, search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
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
        <h2 className="text-2xl font-bold mb-6">ডিপার্টমেন্ট লিস্ট</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <input
            type="text"
            placeholder="ডিপার্টমেন্ট সার্চ করুন..."
            value={search}
            onChange={handleSearch}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {departments.length === 0 ? (
          <p className="text-gray-600">কোনো ডিপার্টমেন্ট পাওয়া যায়নি</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow">
                <thead>
                  <tr className="bg-blue-500 text-white">
                    <th className="p-3 text-left">কোড</th>
                    <th className="p-3 text-left">নাম</th>
                    <th className="p-3 text-left">বর্ণনা</th>
                    <th className="p-3 text-left">তৈরির তারিখ</th>
                  </tr>
                </thead>
                <tbody>
                  {departments.map((dept) => (
                    <tr key={dept._id} className="border-b">
                      <td className="p-3">{dept.code}</td>
                      <td className="p-3">{dept.name}</td>
                      <td className="p-3">{dept.description}</td>
                      <td className="p-3">
                        {new Date(dept.createdAt).toLocaleDateString()}
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

export default DepartmentList;
