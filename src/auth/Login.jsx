import { useState } from "react";
import { auth_service } from "../api/service";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Login Form Data:", formData); // ✅ console for API
    navigate("/dashboard");
    localStorage.setItem(
      "authUser",
      JSON.stringify({ username: formData.username })
    ); // Mock auth storage
    try {
      setLoading(true);

      // Example API call (enable when backend is ready)
      const response = await auth_service.login(formData);
      console.log("Login Success:", response.data);
    } catch (error) {
      console.error("Login Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen Login_screen w-screen flex items-center justify-center  px-4">
      <div className="w-full max-w-md bg-gray-300/80 p-6 rounded-lg shadow-md">
        <h1 className="text-2xl text-(--primary-color) font-bold mb-6 text-center">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-(--primary-color)"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
              className="
                mt-1 block w-full px-3 py-2 
                text-(--primary-color)
                 rounded-md border-2 focus:ring-2 focus:ring-black
              "
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-(--primary-color)"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="
                mt-1 block w-full px-3 py-2 
                border rounded-md 
                text-(--primary-color)
                focus:outline-none focus:ring-2 focus:ring-black
              "
            />
          </div>

          <div className="flex justify-end">
            <span className="text-sm text-blue-600 cursor-pointer hover:underline">
              Forgot Password?
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="
              w-full bg-black text-white 
              py-2 rounded-md font-semibold
              hover:bg-gray-800 transition
              disabled:opacity-60 disabled:cursor-not-allowed
            "
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <span>
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </span>
      </div>
    </div>
  );
};

export default Login;
