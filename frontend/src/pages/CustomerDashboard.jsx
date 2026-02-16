import { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function CustomerDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  // ================= FETCH BOOKINGS =================
  const fetchBookings = async () => {
    try {
      const response = await API.get("/bookings");
      setBookings(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load bookings");
      setLoading(false);
    }
  };

  // ================= FETCH SERVICES =================
  const fetchServices = async () => {
    try {
      const res = await API.get("/services");
      setServices(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load services");
    }
  };

  useEffect(() => {
    fetchBookings();
    fetchServices();
  }, []);

  // ================= LOGOUT =================
  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  // ================= SERVICE FILTER =================
  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      
      {/* ================= HEADER SECTION ================= */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          My Bookings
        </h1>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/booking")}
            className="bg-blue-600 text-white px-5 py-2 rounded-xl shadow hover:bg-blue-700 transition duration-300"
          >
            + Add New Booking
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-5 py-2 rounded-xl shadow hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>

      {/* ================= BOOKINGS TABLE ================= */}
      {loading ? (
        <p className="text-gray-500">Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-6 text-center text-gray-500">
          No bookings found.
        </div>
      ) : (
        <div className="overflow-x-auto mb-12">
          <table className="min-w-full bg-white rounded-2xl shadow-lg border border-gray-100">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-5 text-left">Vehicle Number</th>
                <th className="py-3 px-5 text-left">Service Type</th>
                <th className="py-3 px-5 text-left">Date</th>
                <th className="py-3 px-5 text-left">Time</th>
                <th className="py-3 px-5 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-5">{booking.vehicleNumber}</td>
                  <td className="py-3 px-5">{booking.serviceType}</td>
                  <td className="py-3 px-5">{booking.date}</td>
                  <td className="py-3 px-5">{booking.time}</td>
                  <td className="py-3 px-5">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold
                        ${
                          booking.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : booking.status === "Approved"
                            ? "bg-blue-100 text-blue-800"
                            : booking.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ================= SERVICES SECTION ================= */}
      <div className="mt-12">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Service Management
          </h1>

          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-4">#</th>
                <th className="p-4">Service Name</th>
                <th className="p-4">Description</th>
                <th className="p-4">Price</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center p-6 text-gray-500">
                    No services found.
                  </td>
                </tr>
              ) : (
                filteredServices.map((service, index) => (
                  <tr
                    key={service._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4 font-medium">{service.name}</td>
                    <td className="p-4 text-gray-600">
                      {service.description}
                    </td>
                    <td className="p-4 font-semibold">
                      Rs. {service.price}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default CustomerDashboard;