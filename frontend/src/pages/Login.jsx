import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user)); // Lưu thông tin user
      alert("Đăng nhập thành công!");
      navigate("/"); // Chuyển về trang chủ
    } catch (err) {
      alert("Sai email hoặc mật khẩu!");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
      <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-red-500">
          ĐĂNG NHẬP
        </h2>
        <div className="space-y-4">
          <input
            className="w-full p-3 bg-slate-800 rounded-lg border border-slate-700 outline-none focus:border-red-500"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            className="w-full p-3 bg-slate-800 rounded-lg border border-slate-700 outline-none focus:border-red-500"
            type="password"
            placeholder="Mật khẩu"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            onClick={login}
            className="w-full bg-red-600 py-3 rounded-lg font-bold hover:bg-red-700 transition"
          >
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
}
