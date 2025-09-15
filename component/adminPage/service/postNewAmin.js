const createNewAdmin = async ({
  userName,
  password,
  isUserAcitve,
  role,
  name,
}) => {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Token ${token}`,
  };
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  try {
    const response = await fetch(`${BASE_URL}/User_Service/`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        username: userName,
        password,
        role,
        name,
        isUserAcitve,
      }),
    });

    if (!response.ok) throw new Error("Server error");

    return await response.json();
  } catch (err) {
    console.error("Post new admin failed:", err);
    throw err;
  }
};

const updateAdmin = async ({
  userName,
  password,
  isUserAcitve,
  role,
  name,
}) => {
  try {
    const response = await fetch(`${BASE_URL}/user_service/`, {
      method: "patch",
      headers: headers,
      body: JSON.stringify({
        userName,
        password,
        isUserAcitve,
        role,
        name,
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

const deleteAdmin = async ({
  userName,
  password,
  isUserAcitve,
  role,
  name,
}) => {
  try {
    const response = await fetch(`${BASE_URL}/user_service/`, {
      method: "delete",
      headers: headers,
      body: JSON.stringify({
        username: userName,
        password,
        role,
        name,
        isUserAcitve,
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

export { createNewAdmin, updateAdmin, deleteAdmin };
