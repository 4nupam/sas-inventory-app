import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { auth_service } from "../api/service";

const RegisterNewUser = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: "",
    mailingName: "",
    phone: "",
    email: "",
    address: "",
    panNumber: "",
    logo: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /* ---------------- Handlers ---------------- */

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleFileChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      logo: file,
    }));
  }, []);

  /* ---------------- Validation ---------------- */

  const validateForm = () => {
    if (!formData.companyName.trim()) return "Company name is required";
    if (!formData.phone.trim()) return "Phone number is required";
    if (!formData.email.trim()) return "Email is required";
    if (!formData.address.trim()) return "Address is required";
    if (!formData.panNumber.trim()) return "PAN number is required";
    return null;
  };

  /* ---------------- Submit ---------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const payload = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        payload.append(key, value);
      }
    });

    /* ---------- CLEAN PAYLOAD LOG (Backend Friendly) ---------- */
    console.group("📦 Company Registration Payload");
    payload.forEach((value, key) => {
      if (value instanceof File) {
        console.log(`${key}:`, {
          name: value.name,
          type: value.type,
          size: `${(value.size / 1024).toFixed(2)} KB`,
        });
      } else {
        console.log(`${key}:`, value);
      }
    });
    console.groupEnd();

    try {
      setLoading(true);
      setError(null);

      await auth_service.registerCompany(payload);

      navigate("/dashboard");
    } catch (err) {
      console.error("Company registration failed:", err);
      setError(
        err?.response?.data?.message ||
          "Company registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen w-screen register_screen flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white/20 text-(--primary-color) rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Company Registration
        </h1>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <Input
            label="Company Name"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
          />

          <Input
            label="Mailing Name"
            name="mailingName"
            value={formData.mailingName}
            onChange={handleChange}
          />

          <Input
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            type="tel"
            required
          />

          <Input
            label="Help Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            required
          />

          <div className="md:col-span-2">
            <label className="block text-sm font-medium">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              required
              className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <Input
            label="PAN Number"
            name="panNumber"
            value={formData.panNumber}
            onChange={handleChange}
            required
          />

          <div className="md:col-span-2">
            <label className="block text-sm font-medium">
              Upload Company Logo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 w-full text-sm text-(--primary-color) bg-white p-3 rounded-xl"
            />
          </div>

          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              disabled={loading}
              className="
                w-full bg-black text-white py-3 rounded-md font-semibold
                hover:bg-gray-800 transition disabled:opacity-60
              "
            >
              {loading ? "Saving..." : "Save & Continue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* ---------------- Reusable Input ---------------- */

const Input = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
}) => (
  <div>
    <label className="block text-sm font-medium">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="
        mt-1 w-full border rounded-md px-3 py-2
        focus:outline-none focus:ring-2 focus:ring-black
      "
    />
  </div>
);

export default RegisterNewUser;
