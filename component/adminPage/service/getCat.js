const getCategories = async () => {
  try {
    const response = await fetch(
      "http://10.133.56.89:8000/api/subcategories/",
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
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

export default getCategories;
