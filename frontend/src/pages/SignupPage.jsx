import { useState, useContext } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function SignupPage() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/auth/register", userData);

      // ✅ Auto login after register
      login(res.data.token);

      // Always customer → redirect to user dashboard
      navigate("/customer-dashboard");

    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-500 to-green-700">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Customer Sign Up
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-3">{error}</p>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full border rounded-lg px-4 py-2"
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            required
            className="w-full border rounded-lg px-4 py-2"
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg"
          >
            Create Customer Account
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link to="/login">
            <button className="mt-2 w-full bg-gray-200 py-2 rounded-lg hover:bg-gray-300">
              Back to Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;