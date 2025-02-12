const token = localStorage.getItem("token");
const BASE_URL = "http://localhost:5000/api";

export const getUserProfile = async () => {
  const response = await fetch(`${BASE_URL}/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data.results;
};
