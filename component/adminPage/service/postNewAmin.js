const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const getTokenHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Token ${localStorage.getItem("token")}`,
});

export const getAdmins = async () => {
  try {
    const response = await fetch(`${BASE_URL}/User_Service/`, {
      method: "GET",
      headers: getTokenHeaders(),
      cache: "no-store",
    });

    if (!response.ok) throw new Error("Server error");
    return await response.json();
  } catch (err) {
    console.error("Get admin failed:", err);
    throw err;
  }
};

export const createNewAdmin = async ({
  permissions,
  userName,
  password,
  isUserAcitve,
  role,
  name,
}) => {
  try {
    const response = await fetch(`${BASE_URL}/User_Service/`, {
      method: "POST",
      headers: getTokenHeaders(),
      body: JSON.stringify({
        username: userName,
        password,
        role,
        name,
        isUserAcitve,
        permissions,
      }),
    });

    if (!response.ok) throw new Error("Server error");
    return await response.json();
  } catch (err) {
    console.error("Create admin failed:", err);
    throw err;
  }
};

export const updateAdmin = async ({
  permissions,
  userName,
  password,
  isUserAcitve,
  role,
  name,
}) => {
  try {
    const response = await fetch(`${BASE_URL}/user_service/`, {
      method: "PATCH",
      headers: getTokenHeaders(),
      body: JSON.stringify({
        username: userName,
        password,
        role,
        name,
        isUserAcitve,
        permissions,
      }),
    });

    if (!response.ok) throw new Error("Server error");
    return await response.json();
  } catch (err) {
    console.error("Update admin failed:", err);
    throw err;
  }
};

export const deleteAdmin = async ({ userName }) => {
  try {
    const response = await fetch(`${BASE_URL}/user_service/`, {
      method: "DELETE",
      headers: getTokenHeaders(),
      body: JSON.stringify({ username: userName }),
    });

    if (!response.ok) throw new Error("Server error");
    return await response.json();
  } catch (err) {
    console.error("Delete admin failed:", err);
    throw err;
  }
};
