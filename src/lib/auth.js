export async function getProfile(token) {
    try {
      const res = await fetch("https://test-fe.mysellerpintar.com/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      return data;
    } catch (err) {
      console.error("Failed to fetch profile", err);
      return null;
    }
  }
  
export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("user_password");
    window.location.href = "/login"; // Redirect manual agar tetap client-side
    console.log("Redirecting to /login");
    }
}
