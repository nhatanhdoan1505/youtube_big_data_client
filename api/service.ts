export const checkExpiredToken = async () => {
  const token = localStorage.getItem("token");
  if (!token) return;
  const date = localStorage.getItem("date");
};
