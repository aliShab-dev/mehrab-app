const postAdminLogin = async ({ userName, password }) => {
  try {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    const response = await fetch(`${BASE_URL}/admin_login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userName,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error("Server error");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Post new admin failed:", err);
    throw err;
  }
};

export default postAdminLogin;
