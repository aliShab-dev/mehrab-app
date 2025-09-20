const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const getCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/subcategories/`, {
      method: "GET",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data || [];
  } catch (err) {
    console.error("Fetch error:", err);
    return [];
  }
};

export default getCategories;
