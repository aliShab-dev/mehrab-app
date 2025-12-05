const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const createProduct = async ({
  name,
  description,
  staff: staff_data = [],
  category,
  duration,
  episode,
  company,
  sub_category,
  level,
  poster,
  files,
  file,
}) => {
  const API_URL = `${BASE_URL}/api/products/`;
  const token = localStorage.getItem("token");

  const formData = new FormData();

  formData.append("name", name);
  formData.append("description", description || "");
  formData.append("company", company || "");
  formData.append("category", category);
  formData.append("sub_category", sub_category);
  formData.append("level", level.toString());

  if (duration) formData.append("duration", duration);

  const episodeInt = episode && !isNaN(episode) ? parseInt(episode, 10) : null;
  if (!isNaN(episodeInt) && episodeInt > 0) {
    formData.append("episode", episodeInt.toString());
  }

  if (staff_data && staff_data.length > 0) {
    formData.append("staff_data", JSON.stringify(staff_data));
  }

  if (poster instanceof File) {
    formData.append("poster", poster);
  }

  let filesToSend = [];

  if (Array.isArray(files) && files.length > 0) {
    filesToSend = files.map((item) => ({
      file: item.file,
      title: item.title || "",
    }));
  } else if (file) {
    console.log(file)

    const rawFiles = Array.isArray(file) ? file : [file];
    filesToSend = rawFiles.map((f, i) => ({
      file: f,
      title: f.name.split(".").slice(0, -1).join(".") || `فایل ${i + 1}`,
    }));
  }

  filesToSend.forEach((item, index) => {
    formData.append(`files[${index}][file]`, item.file);
    formData.append(`files[${index}][title]`, item.title);
  });

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
      },
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        `Server error: ${response.status} - ${JSON.stringify(result)}`
      );
    }

    return result;
  } catch (err) {
    console.error("Create product failed:", err);
    throw err;
  }
};

const updateProduct = async ({
  id,
  name,
  description,
  staff: staff_data = [],
  category,
  duration,
  episode,
  company,
  sub_category,
  level,
  poster,
  files,
  file,
}) => {
  const API_URL = `${BASE_URL}/api/products/${id}/`;
  const token = localStorage.getItem("token");

  const formData = new FormData();

  formData.append("name", name);
  formData.append("description", description || "");
  formData.append("company", company || "");
  formData.append("category", category);
  formData.append("sub_category", sub_category);
  formData.append("level", level.toString());

  if (duration) formData.append("duration", duration);

  const episodeInt = episode && !isNaN(episode) ? parseInt(episode, 10) : null;
  if (!isNaN(episodeInt) && episodeInt > 0) {
    formData.append("episode", episodeInt.toString());
  }

  if (staff_data && staff_data.length > 0) {
    formData.append("staff_data", JSON.stringify(staff_data));
  }

  if (poster instanceof File) {
    formData.append("poster", poster);
  }

  let filesToSend = [];

  if (Array.isArray(files) && files.length > 0) {
    filesToSend = files.map((item) => ({
      file: item.file,
      title: item.title || "",
    }));
  } else if (file) {
    console.log(file)
    const rawFiles = Array.isArray(file) ? file : [file];
    filesToSend = rawFiles.map((f, i) => ({
      file: f,
      title: f.name.split(".").slice(0, -1).join(".") || `فایل ${i + 1}`,
    }));
  }

  filesToSend.forEach((item, index) => {
    formData.append(`files[${index}][file]`, item.file);
    formData.append(`files[${index}][title]`, item.title);
  });

  try {
    const response = await fetch(API_URL, {
      method: "PATCH",
      headers: {
        Authorization: `Token ${token}`,
      },
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        `Server error: ${response.status} - ${JSON.stringify(result)}`
      );
    }

    return result;
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
      throw new Error(
        `Server error: ${productId} ${response.status} - ${errorText}`
      );
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
