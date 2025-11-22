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
  const API_URL = `${BASE_URL}/api/products/`;
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
  if (Array.isArray(file)) {
    file.forEach((f, index) => {
      formData.append("file", f);
    });
  } else if (file instanceof File) {
    formData.append("file", file);
  }

  console.log("inside: ", file);

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
  const API_URL = `${BASE_URL}/api/products/${id}/`;
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

  if (poster instanceof File) formData.append("poster", poster);
  if (file instanceof File) formData.append("file", file);

  try {
    const response = await fetch(API_URL, {
      method: "PATCH",
      headers: {
        Authorization: `Token ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server error: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (err) {
    console.error("Update product failed:", err);
    throw err;
  }
};

const deleteProduct = async (id) => {
  const API_URL = `${BASE_URL}/api/products/${id}/`;
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(API_URL, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server error: ${response.status} - ${errorText}`);
    }

    try {
      return await response.json();
    } catch {
      return { success: true, message: "Product deleted successfully" };
    }
  } catch (err) {
    console.error("Delete product failed:", err);
    throw err;
  }
};

const getProductsByCatId = async (cat) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/subcategories/${cat}/get_products/`,
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
      `${BASE_URL}/api/categories/${cat}/get_products/`,
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
    const response = await fetch(`${BASE_URL}/api/products/${productId}/`, {
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
  deleteProduct,
  getProductsByCatId,
  getProductsByProductId,
  getProductsByCategoryId,
};
