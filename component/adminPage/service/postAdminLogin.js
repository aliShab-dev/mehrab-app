const postAdminLogin = async ({ userName, password }) => {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/admin_login/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userName,
          password,
        }),
      }
    );

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
