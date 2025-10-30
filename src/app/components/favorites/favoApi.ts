const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getFavorites = async (token: string) => {
  const response = await fetch(`${API_URL}/favorites`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch favorites");
  return response.json();
};

export const addToFavorites = async (productId: string, token: string) => {
  const response = await fetch(`${API_URL}/favorites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ productId }),
  });
  if (!response.ok)
  throw new Error("Failed to add to favorites");
  return response.json();
};

export const removeFromFavorites = async (productId: string, token: string) => {
  const response = await fetch(`${API_URL}/favorites/${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Failed to remove from favorites");
  return response.json();
};
