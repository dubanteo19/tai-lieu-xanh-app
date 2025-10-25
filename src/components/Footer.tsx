import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="flex gap-10 px-10 justify-between p-4">
      <p>Tài liệu xanh @2024 nền tảng chia sẽ tài liệu cho học sinh viên</p>
      <div className="flex gap-4 font-bold ">
        <Link to={"/home"}>Trang chủ</Link>
        <Link to={"/home"}>Giới thiệu</Link>
        <Link to={"/home"}>Quy định</Link>
      </div>
    </div>
  );
};
