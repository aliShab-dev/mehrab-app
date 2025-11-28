const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getsocialMedia = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${BASE_URL}/api/social_media/`, {
      method: "GET",
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

export const postsocialMedia = async ({ link, platform, platform_name }) => {
  try {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("link", link);
    formData.append("platform", platform);
    formData.append("platform_name", platform_name);

    const response = await fetch(`${BASE_URL}/api/social_media/`, {
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

export const deletesocialMedia = async ({ id }) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${BASE_URL}/api/social_media/${id}`, {
      method: "DELETE",
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
