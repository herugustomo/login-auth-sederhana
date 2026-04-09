import axios from "axios";
import { Moon, Sun, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getDashboard = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/dashboard", {
          withCredentials: true,
        });

        setUser(res.data.user);
      } catch (error) {
        navigate("/login");
      }
    };

    getDashboard();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/logout",
        {},
        {
          withCredentials: true,
        },
      );

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`min-h-screen p-4 sm:p-6 transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800"
          : "bg-slate-100"
      }`}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between gap-3">
          <h1
            className={`text-2xl font-bold sm:text-3xl ${
              darkMode ? "text-white" : "text-slate-800"
            }`}
          >
            Dashboard
          </h1>

          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium shadow-md transition ${
              darkMode
                ? "bg-slate-800 text-white hover:bg-slate-700"
                : "bg-white text-slate-700 hover:bg-slate-100"
            }`}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            {darkMode ? "Light" : "Dark"}
          </button>
        </div>

        <div
          className={`rounded-3xl p-6 shadow-xl transition-colors duration-300 sm:p-8 ${
            darkMode ? "bg-slate-900" : "bg-white"
          }`}
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p
                className={`text-sm font-medium uppercase tracking-[0.2em] ${
                  darkMode ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Welcome Back
              </p>
              <h2
                className={`mt-2 text-2xl font-bold sm:text-3xl ${
                  darkMode ? "text-white" : "text-slate-800"
                }`}
              >
                Selamat datang, kamu berhasil login
              </h2>
              <p
                className={`mt-3 text-sm sm:text-base ${
                  darkMode ? "text-slate-300" : "text-slate-600"
                }`}
              >
                Kelola akun dan akses fitur dashboard dengan aman.
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>

          {user && (
            <div
              className={`mt-8 rounded-2xl border p-5 transition-colors duration-300 ${
                darkMode
                  ? "border-slate-700 bg-slate-800"
                  : "border-slate-200 bg-slate-50"
              }`}
            >
              <p
                className={`text-sm font-medium ${
                  darkMode ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Informasi Akun
              </p>
              <p
                className={`mt-2 text-base sm:text-lg ${
                  darkMode ? "text-white" : "text-slate-800"
                }`}
              >
                Email: {user.email}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
