const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const createProduct = async ({
  name,
  description,
  staff: staff_data,
  category,
  duration,
  episode,
  company,
  sub_category,
  level,
  poster,
  file,
}) => {
  const API_URL = `${BASE_URL}/products/`;
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("company", company || "");
  formData.append("category", category);
  formData.append("sub_category", sub_category);
  formData.append("duration", duration);
  formData.append("episode", episode);
  formData.append("staff_data", JSON.stringify(staff_data || []));
  formData.append("level", level.toString());

  if (poster instanceof File) {
    formData.append("poster", poster);
  }
  if (file instanceof File) {
    formData.append("file", file);
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`, // Use Bearer to match backend
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server error: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (err) {
    console.error("Post new product failed:", err);
    throw err;
  }
};

const updateProduct = async ({
  id,
  name,
  description,
  staff: staff_data,
  category,
  duration,
  episode,
  company,
  sub_category,
  level,
  poster,
  file,
}) => {
  const token = localStorage.getItem("token");

  const data = {
    id,
    name,
    description,
    staff: staff_data,
    category: category.toString(),
    duration,
    episode: episode ? episode.toString() : undefined,
    company: company ? company.toString() : undefined,
    sub_category: sub_category.toString(),
    level: level.toString(),
  };

  const formData = new FormData();
  formData.append("data", JSON.stringify(data));
  if (poster) formData.append("poster", poster);
  if (file) formData.append("file", file);

  try {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: "PATCH",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server error: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (err) {
    console.error("update new product failed:", err);
    throw err;
  }
};

const getProductsByCatId = async (cat) => {
  try {
    const response = await fetch(
      `${BASE_URL}/subcategories/${cat}/get_products/`,
      {
        method: "get",
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server error: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (err) {
    console.error("Post new product failed:", err);
    throw err;
  }
};

const getProductsByCategoryId = async (cat) => {
  try {
    const response = await fetch(
      `${BASE_URL}/categories/${cat}/get_products/`,
      {
        method: "get",
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server error: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (err) {
    console.error("Post new product failed:", err);
    throw err;
  }
};

const getProductsByProductId = async (productId) => {
  try {
    const response = await fetch(`${BASE_URL}/products/${productId}/`, {
      method: "get",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server error: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (err) {
    console.error("Post new product failed:", err);
    throw err;
  }
};

export {
  createProduct,
  updateProduct,
  getProductsByCatId,
  getProductsByProductId,
  getProductsByCategoryId,
};
