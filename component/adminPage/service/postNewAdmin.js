const postNewAdmin = async ({ name, userName, password }) => {
  try {
    const response = await fetch("http://192.168.43.89:8000/User_Service/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        username: userName,
        password,
        role: "admin",
        name,
        is_user_active: true,
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

export default postNewAdmin;
