import { useState, useEffect } from "react";
import API from "../api/axios";

function BookingPage() {
  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    vehicleNumber: "",
    serviceType: "",
    date: "",
    time: "",
  });

  const [services, setServices] = useState([]);

  useEffect(() => {
    API.get("/services").then((res) => setServices(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/bookings", form);
    alert("Booking Submitted Successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Book Vehicle Service
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setForm({ ...form, customerName: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Phone Number"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Vehicle Number"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setForm({
                ...form,
                vehicleNumber: e.target.value,
              })
            }
          />

          <select
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setForm({
                ...form,
                serviceType: e.target.value,
              })
            }
          >
            <option value="">Select Service</option>
            {services.map((s) => (
              <option key={s._id} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              onChange={(e) =>
                setForm({ ...form, date: e.target.value })
              }
            />
            <input
              type="time"
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              onChange={(e) =>
                setForm({ ...form, time: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Submit Booking
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookingPage;