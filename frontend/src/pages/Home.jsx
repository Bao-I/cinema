import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { Play, Clock, Star, User, LogOut } from "lucide-react";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Kiểm tra trạng thái đăng nhập từ localStorage
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await api.get("/movies");
        const movieData = Array.isArray(res.data)
          ? res.data
          : res.data.data || [];
        setMovies(movieData);
      } catch (err) {
        console.error(err);
        setError("Không thể kết nối đến máy chủ.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const handleLogout = () => {
    localStorage.clear(); // Xóa token và thông tin user
    window.location.reload(); // Load lại trang để cập nhật giao diện
  };

  // ===== GIAO DIỆN LOADING (SKELETON) =====
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] p-8">
        <div className="container mx-auto">
          <div className="h-10 w-64 bg-slate-700 animate-pulse rounded mb-10"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="bg-slate-800 rounded-2xl h-[400px] animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white pb-20">
      {/* HERO SECTION (BANNER) */}
      <div className="relative h-[45vh] mb-10 overflow-hidden flex items-center bg-gradient-to-r from-red-900 via-slate-900 to-black">
        {/* NÚT ĐĂNG KÝ / ĐĂNG NHẬP (TOP RIGHT) */}
        <div className="absolute top-6 right-6 flex gap-4 z-20">
          {user ? (
            <div className="flex items-center gap-4 bg-black/40 backdrop-blur-md p-2 rounded-full border border-white/10">
              <div className="flex items-center gap-2 px-3">
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center font-bold">
                  {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
                <span className="font-medium text-sm">Chào, {user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-white/10 hover:bg-red-600 p-2 rounded-full transition-colors group"
                title="Đăng xuất"
              >
                <LogOut size={18} className="group-hover:text-white" />
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="px-6 py-2 rounded-full font-semibold hover:bg-white/10 transition"
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-full font-bold shadow-lg shadow-red-600/30 transition"
              >
                Đăng ký
              </Link>
            </>
          )}
        </div>

        <div className="container mx-auto px-6 z-10">
          <h1 className="text-6xl font-black mb-4 tracking-tighter italic">
            CINEMA<span className="text-red-600">PRO</span>
          </h1>
          <p className="text-gray-300 max-w-lg text-lg leading-relaxed">
            Trải nghiệm những bộ phim bom tấn mới nhất với chất lượng hình ảnh
            4K sắc nét và âm thanh sống động.
          </p>
        </div>
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>

      <div className="container mx-auto px-6">
        {/* TIÊU ĐỀ DANH SÁCH */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-2 h-8 bg-red-600 rounded-full"></div>
          <h2 className="text-2xl font-bold uppercase tracking-wider">
            Phim đang chiếu
          </h2>
        </div>

        {error && (
          <p className="text-red-400 bg-red-900/20 p-4 rounded-lg border border-red-500/50">
            {error}
          </p>
        )}

        {/* GRID PHIM */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {movies.length > 0
            ? movies.map((m) => (
                <div
                  key={m._id}
                  className="group relative bg-slate-800 rounded-2xl overflow-hidden shadow-2xl hover:shadow-red-500/20 transition-all duration-500 hover:-translate-y-2 border border-slate-700 hover:border-red-500/50"
                >
                  {/* POSTER */}
                  <div className="relative aspect-[2/3] overflow-hidden">
                    <img
                      src={m.poster}
                      alt={m.title}
                      className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/300x450?text=No+Poster";
                      }}
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center gap-4">
                      <button className="bg-red-600 hover:bg-red-700 p-4 rounded-full transition transform translate-y-4 group-hover:translate-y-0">
                        <Play fill="white" size={24} />
                      </button>
                      <span className="text-xs font-semibold uppercase tracking-widest text-white">
                        Xem ngay
                      </span>
                    </div>
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1">
                      <Clock size={12} className="text-red-500" /> {m.duration}{" "}
                      PHÚT
                    </div>
                  </div>

                  {/* INFO */}
                  <div className="p-4 bg-gradient-to-b from-slate-800 to-slate-900">
                    <h3 className="text-md font-bold truncate group-hover:text-red-500 transition-colors uppercase leading-tight">
                      {m.title}
                    </h3>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-1 text-yellow-400">
                        <Star size={14} fill="currentColor" />
                        <span className="text-xs font-bold text-gray-300">
                          8.9
                        </span>
                      </div>
                      <span className="text-[10px] text-gray-400 border border-gray-600 px-2 py-0.5 rounded uppercase">
                        4K / Vietsub
                      </span>
                    </div>
                  </div>
                </div>
              ))
            : !loading && (
                <p className="col-span-full text-center text-gray-500 py-20">
                  Hiện chưa có phim nào trong danh sách.
                </p>
              )}
        </div>
      </div>
    </div>
  );
}
