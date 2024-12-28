export const getVNReason = (status: string) => {
  switch (status) {
    case "SPAM":
      return "Spam";
    case "OFFENSIVE_CONTENT":
      return "Nội dung phản cảm";
    case "HARASSMENT":
      return "Quấy rối";
    case "INAPPROPRIATE_LANGUAGE":
      return "Ngôn ngữ không phù hợp";
    case "OTHER":
      return "Khác";
    default:
      return "Khác";
  }
};

export const getVNStatusName = (status: string) => {
  switch (status) {
    case "ACTIVE":
      return "Hoạt động";
    case "INACTIVE":
      return "Khoá";
    case "REVIEWING":
      return "Chờ duyệt";
    case "PUBLISHED":
      return "Xuất bản";
    case "REJECTED":
      return "Bị từ chối";
    case "BAN":
      return "Bị đình chỉ";
    case "DELETED":
      return "Bị xóa";
    default:
      return "Hoạt động";
  }
};
