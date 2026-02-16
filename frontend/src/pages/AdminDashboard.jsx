import { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

function AdminDashboard() {
  const { logout } = useContext(AuthContext);

  // ================= BOOKINGS STATE =================
  const [bookings, setBookings] = useState([]);
  const [bookingSearch, setBookingSearch] = useState("");

  // ================= SERVICES STATE =================
  const [services, setServices] = useState([]);
  const [serviceSearch, setServiceSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
  });

  // ================= FETCH DATA =================
  useEffect(() => {
    fetchBookings();
    fetchServices();
  }, []);

  const fetchBookings = async () => {
    const res = await API.get("/bookings");
    setBookings(res.data);
  };

  const fetchServices = async () => {
    const res = await API.get("/services");
    setServices(res.data);
  };

  // ================= BOOKING ACTIONS =================
  const updateStatus = async (id, status) => {
    await API.put(`/bookings/${id}/status`, { status });
    fetchBookings();
  };

  const getStatusBadge = (status) => {
    const base = "px-3 py-1 rounded-full text-xs font-semibold";
    switch (status) {
      case "Pending":
        return `${base} bg-yellow-100 text-yellow-700`;
      case "Approved":
        return `${base} bg-blue-100 text-blue-700`;
      case "Completed":
        return `${base} bg-green-100 text-green-700`;
      case "Rejected":
        return `${base} bg-red-100 text-red-700`;
      default:
        return base;
    }
  };

  // ================= SERVICE ACTIONS =================
  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    try {
      setLoading(true);

      if (editingService) {
        await API.put(`/services/${editingService._id}`, form);
      } else {
        await API.post("/services", form);
      }

      setForm({ name: "", description: "", price: "" });
      setEditingService(null);
      setIsOpen(false);
      fetchServices();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteService = async (id) => {
    if (!window.confirm("Delete this service?")) return;
    await API.delete(`/services/${id}`);
    fetchServices();
  };

  // ================= FILTERED DATA =================
  const filteredBookings = bookings.filter((b) =>
    b.customerName.toLowerCase().includes(bookingSearch.toLowerCase()) ||
    b.vehicleNumber.toLowerCase().includes(bookingSearch.toLowerCase()) ||
    b.serviceType.toLowerCase().includes(bookingSearch.toLowerCase()) ||
    b.status.toLowerCase().includes(bookingSearch.toLowerCase())
  );

  const filteredServices = services.filter((s) =>
    s.name.toLowerCase().includes(serviceSearch.toLowerCase()) ||
    s.description?.toLowerCase().includes(serviceSearch.toLowerCase())
  );

  // ================= UI =================
  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-10">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Admin Dashboard
        </h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* ================= BOOKINGS SECTION ================= */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">
            Booking Management
          </h2>

          <input
            type="text"
            placeholder="Search bookings..."
            value={bookingSearch}
            onChange={(e) => setBookingSearch(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Vehicle</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Service</th>
                <th className="p-4">Date</th>
                <th className="p-4">Time</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center p-6 text-gray-500">
                    No bookings found.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => (
                  <tr key={b._id} className="border-t hover:bg-gray-50">
                    <td className="p-4">{b.customerName}</td>
                    <td className="p-4">{b.vehicleNumber}</td>
                    <td className="p-4">{b.phone}</td>
                    <td className="p-4">{b.serviceType}</td>
                    <td className="p-4">
                      {new Date(b.date).toLocaleDateString()}
                    </td>
                    <td className="p-4">{b.time}</td>
                    <td className="p-4">
                      <span className={getStatusBadge(b.status)}>
                        {b.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => updateStatus(b._id, "Approved")}
                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(b._id, "Rejected")}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => updateStatus(b._id, "Completed")}
                        className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                      >
                        Complete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= SERVICES SECTION ================= */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">
            Service Management
          </h2>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
            >
              + Add Service
            </button>

            <input
              type="text"
              placeholder="Search services..."
              value={serviceSearch}
              onChange={(e) => setServiceSearch(e.target.value)}
              className="border border-gray-300 rounded-xl px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
              <tr>
                <th className="p-4">#</th>
                <th className="p-4">Service Name</th>
                <th className="p-4">Description</th>
                <th className="p-4">Price</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center p-6 text-gray-500">
                    No services found.
                  </td>
                </tr>
              ) : (
                filteredServices.map((service, index) => (
                  <tr key={service._id} className="border-t hover:bg-gray-50">
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4 font-medium">{service.name}</td>
                    <td className="p-4 text-gray-600">
                      {service.description}
                    </td>
                    <td className="p-4 font-semibold">
                      Rs.{service.price}
                    </td>
                    <td className="p-4 text-right space-x-3">
                      <button
                        onClick={() => {
                          setEditingService(service);
                          setForm({
                            name: service.name,
                            description: service.description,
                            price: service.price,
                          });
                          setIsOpen(true);
                        }}
                        className="text-blue-500 hover:text-blue-700 font-medium"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDeleteService(service._id)}
                        className="text-red-500 hover:text-red-700 font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* ================= ADD / EDIT SERVICE MODAL ================= */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingService ? "Edit Service" : "Add New Service"}
            </h2>

            <form onSubmit={handleServiceSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Service Name"
                className="w-full border rounded-lg px-3 py-2"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                required
              />

              <textarea
                placeholder="Description"
                className="w-full border rounded-lg px-3 py-2"
                rows="3"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />

              <input
                type="number"
                placeholder="Price (LKR)"
                className="w-full border rounded-lg px-3 py-2"
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: e.target.value })
                }
                required
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    setEditingService(null);
                    setForm({
                      name: "",
                      description: "",
                      price: "",
                    });
                  }}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  {loading
                    ? "Saving..."
                    : editingService
                    ? "Update Service"
                    : "Save Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default AdminDashboard;