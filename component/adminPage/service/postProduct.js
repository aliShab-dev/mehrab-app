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
  const token = localStorage.getItem("token");

  const data = {
    name,
    description,
    staff: staff_data,
    category: category.toString(),
    duration,
    episode: episode.toString(),
    company: company ? company.toString() : undefined,
    sub_category: sub_category.toString(),
    level: level.toString(),
  };

  const formData = new FormData();
  formData.append("data", JSON.stringify(data));
  if (poster) formData.append("poster", poster);
  if (file) formData.append("file", file);

  try {
    const response = await fetch("http://10.133.56.89:8000/api/products/", {
      method: "POST",
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
    const response = await fetch(`http://10.133.56.89:8000/api/products/${id}`, {
      method: "PATCH",
      headers: {
        // Authorization: `Token ${token}`,
      },
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
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(
      `http://10.133.56.89:8000/api/subcategories/${cat}/get_products`,
      {
        method: "get",
        headers: {
          Authorization: `Token ${token}`,
        },
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

export { createProduct, getProductsByCatId, updateProduct };
