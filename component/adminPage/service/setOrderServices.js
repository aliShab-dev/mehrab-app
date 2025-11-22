const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getOrders = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${BASE_URL}/instruction/orders/`, {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Fetch error:", err);
    return [];
  }
};

export const postOrder = async ({
  firstName,
  lastName,
  phoneNumber,
  socialMedia,
  orderBy,
  publication,
  description,
  sample,
}) => {
  try {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("orderer_firstname", firstName);
    formData.append("orderer_lastname", lastName);
    formData.append("phone_number", phoneNumber);
    formData.append("social_media_link", socialMedia);
    formData.append("to_order", orderBy);
    formData.append("publication_platform", publication);
    formData.append("description", description);
    formData.append("sample_file", sample);

    const response = await fetch(`${BASE_URL}/instruction/orders/`, {
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

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Fetch error:", err);
    return [];
  }
};
