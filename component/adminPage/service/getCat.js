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
    // Ensure we always return an array, even if data is null/undefined
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Fetch error:", err);
    // Always return an empty array on error
    return [];
  }
};

export default getCategories;
