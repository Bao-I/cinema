import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const submit = async () => {
    try {
      await api.post("/auth/register", form);
      alert("Đăng ký thành công! Hãy đăng nhập.");
      navigate("/login");
    } catch (err) {
      alert("Email đã tồn tại!");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
      <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-red-500">
          ĐĂNG KÝ
        </h2>
        <div className="space-y-4">
          <input
            className="w-full p-3 bg-slate-800 rounded-lg border border-slate-700 outline-none focus:border-red-500"
            placeholder="Tên của bạn"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
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
            onClick={submit}
            className="w-full bg-red-600 py-3 rounded-lg font-bold hover:bg-red-700 transition"
          >
            Đăng ký ngay
          </button>
        </div>
      </div>
    </div>
  );
}
