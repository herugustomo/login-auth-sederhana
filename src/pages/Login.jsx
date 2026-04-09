import axios from "axios";
import { Moon, Sun } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const validasiForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email atau username wajib diisi";
    }

    if (!password.trim()) {
      newErrors.password = "Password wajib diisi";
    } else if (password.length < 6) {
      newErrors.password = "Password minimal 6 karakter";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validasiForm()) return;

    setLoading(true);

    try {
      await axios.post(
        "http://localhost:5000/api/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );

      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 py-6 sm:px-6 lg:px-8 transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800"
          : "bg-gradient-to-br from-slate-100 to-slate-200"
      }`}
    >
      <button
        type="button"
        onClick={() => setDarkMode(!darkMode)}
        className={`absolute right-5 top-5 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium shadow-lg transition ${
          darkMode
            ? "bg-slate-800 text-white hover:bg-slate-700"
            : "bg-white text-slate-700 hover:bg-slate-100"
        }`}
      >
        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        {darkMode ? "Light" : "Dark"}
      </button>
      <div
        className={`w-full max-w-5xl overflow-hidden rounded-3xl shadow-2xl transition-colors duration-300 ${
          darkMode ? "bg-slate-900" : "bg-white"
        }`}
      >
        <div className="grid min-h-[620px] grid-cols-1 lg:grid-cols-2">
          <div
            className={`hidden lg:flex flex-col justify-center px-10 py-12 transition-colors duration-300 ${
              darkMode ? "bg-slate-800 text-white" : "bg-slate-900 text-white"
            }`}
          >
            <div className="max-w-md">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-slate-300">
                Secure Access
              </p>
              <h1 className="text-4xl font-bold leading-tight">
                Selamat datang kembali
              </h1>
              <p className="mt-5 text-base leading-7 text-slate-300">
                Masuk ke dashboard untuk mengelola data, memantau aktivitas, dan
                mengakses fitur aplikasi dengan aman.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center px-5 py-8 sm:px-8 md:px-10 lg:px-12">
            <div className="w-full max-w-md">
              <div className="mb-8 text-center lg:text-left">
                <h2
                  className={`text-3xl font-bold sm:text-4xl ${
                    darkMode ? "text-white" : "text-slate-800"
                  }`}
                >
                  Login
                </h2>
                <p
                  className={`mt-2 text-sm sm:text-base ${
                    darkMode ? "text-slate-300" : "text-slate-500"
                  }`}
                >
                  Masuk untuk melanjutkan ke dashboard
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                autoComplete="off"
                className="space-y-5"
              >
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Email / Username
                  </label>
                  <input
                    type="text"
                    value={email}
                    name="username"
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Masukkan email atau username"
                    className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none transition focus:ring-4 sm:text-base ${
                      darkMode
                        ? "border-slate-700 bg-slate-800 text-white placeholder:text-slate-400 focus:border-slate-500 focus:ring-slate-700"
                        : "border-slate-300 bg-white text-slate-900 focus:border-slate-500 focus:ring-slate-200"
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      name="new-password"
                      autoComplete="new-password"
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Masukkan password"
                      className={`w-full rounded-2xl border px-4 py-3 pr-20 text-sm outline-none transition focus:ring-4 sm:text-base ${
                        darkMode
                          ? "border-slate-700 bg-slate-800 text-white placeholder:text-slate-400 focus:border-slate-500 focus:ring-slate-700"
                          : "border-slate-300 bg-white text-slate-900 focus:border-slate-500 focus:ring-slate-200"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-600"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.password}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70 sm:text-base"
                >
                  {loading ? "Loading..." : "Login"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
