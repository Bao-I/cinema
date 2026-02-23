import Movie from "../models/Movie.js";

// Danh sách phim bạn muốn "Code cứng" để nó tự vào DB
const initialMovies = [
  {
    title: "Lật Mặt 7: Một Điều Ước",
    poster:
      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/m9YpS27X5I2mS0j2L6H6C1Z3Y2I.jpg",
    duration: 138,
    description:
      "Câu chuyện về tình cảm gia đình cảm động của bà Hai và 5 người con.",
  },
  {
    title: "Mai",
    poster:
      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/uDBy99pU7Xf0fXN2G5m1y6X2b3p.jpg",
    duration: 131,
    description: "Bộ phim xoay quanh cuộc đời nhiều biến cố của Mai.",
  },
  {
    title: "Deadpool & Wolverine",
    poster:
      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/8cdcl3SXO0o79v9H6v6Yf6yYvNp.jpg",
    duration: 127,
    description: "Hai siêu anh hùng nổi loạn hợp tác trong nhiệm vụ nguy hiểm.",
  },
  {
    title: "Avengers: Endgame",
    poster:
      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    duration: 181,
    description: "Trận chiến cuối cùng của biệt đội Avengers chống lại Thanos.",
  },
  {
    title: "Spider-Man: No Way Home",
    poster:
      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    duration: 148,
    description: "Spider-Man đối mặt đa vũ trụ hỗn loạn.",
  },
  {
    title: "Avatar: The Way of Water",
    poster:
      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
    duration: 192,
    description: "Gia đình Jake Sully khám phá đại dương Pandora.",
  },
  {
    title: "Oppenheimer",
    poster:
      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/ptpr0kGAckfQkJeJIt8st5dglvd.jpg",
    duration: 180,
    description: "Câu chuyện về cha đẻ bom nguyên tử.",
  },
  {
    title: "Barbie",
    poster:
      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
    duration: 114,
    description: "Hành trình khám phá thế giới thật của Barbie.",
  },
  {
    title: "The Batman",
    poster:
      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    duration: 176,
    description: "Batman điều tra chuỗi án mạng tại Gotham.",
  },
  {
    title: "Doctor Strange in the Multiverse of Madness",
    poster:
      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg",
    duration: 126,
    description: "Doctor Strange bước vào đa vũ trụ nguy hiểm.",
  },
  {
    title: "Fast X",
    poster:
      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/fiVW06jE7z9YnO4trhaMEdclSiC.jpg",
    duration: 141,
    description: "Dom Toretto đối đầu kẻ thù nguy hiểm nhất.",
  },
  {
    title: "John Wick: Chapter 4",
    poster:
      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
    duration: 169,
    description: "John Wick chiến đấu để giành tự do.",
  },
  {
    title: "Dune: Part One",
    poster:
      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
    duration: 155,
    description: "Cuộc chiến quyền lực trên hành tinh sa mạc Arrakis.",
  },
  {
    title: "The Super Mario Bros. Movie",
    poster:
      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
    duration: 92,
    description: "Mario bước vào thế giới nấm đầy phiêu lưu.",
  },
  {
    title: "Kung Fu Panda 4",
    poster:
      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg",
    duration: 94,
    description: "Po tiếp tục hành trình trở thành chiến binh rồng.",
  },
  {
    title: "Inside Out 2",
    poster:
      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
    duration: 100,
    description: "Những cảm xúc mới xuất hiện trong tâm trí Riley.",
  },
  {
    title: "Aquaman and the Lost Kingdom",
    poster:
      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/8xV47NDrjdZDpkVcCFqkdHa3T0C.jpg",
    duration: 124,
    description: "Aquaman bảo vệ Atlantis khỏi hiểm họa mới.",
  },
  {
    title: "Transformers: Rise of the Beasts",
    poster:
      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/gPbM0MK8CP8A174rmUwGsADNYKD.jpg",
    duration: 127,
    description: "Autobots hợp tác với Maximals cứu Trái Đất.",
  },
  {
    title: "Mission: Impossible – Dead Reckoning",
    poster:
      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/NNxYkU70HPurnNCSiCjYAmacwm.jpg",
    duration: 163,
    description: "Ethan Hunt thực hiện nhiệm vụ nguy hiểm nhất.",
  },
  {
    title: "Godzilla x Kong: The New Empire",
    poster:
      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
    duration: 115,
    description: "Hai titan hợp lực chống lại mối đe dọa cổ đại.",
  },
];

// Hàm tự động đẩy dữ liệu vào DB (Seeding)
export const seedMovies = async () => {
  try {
    const count = await Movie.countDocuments();
    if (count === 0) {
      await Movie.insertMany(initialMovies);
      console.log("✅ Đã tự động thêm phim mẫu vào MongoDB!");
    }
  } catch (error) {
    console.log("❌ Lỗi Seeding:", error);
  }
};

export const getMovies = async (req, res) => {
  const movies = await Movie.find().sort({ createdAt: -1 });
  res.json(movies);
};

// Thêm lại hàm này để file routes không bị lỗi import
export const addMovie = async (req, res) => {
  const movie = await Movie.create(req.body);
  res.json(movie);
};
