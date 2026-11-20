const apiUrl = import.meta.env.VITE_API_URL;
import { ApiError } from "./errors";

export async function getDueReviews() {
  const response = await fetch(`${apiUrl}/reviews/due`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new ApiError(
      response.status === 500
        ? "Internal error"
        : "Could not load due cards",
      response.status,
    );
  }

  return response.json();
}

export async function submitReview(
  cardId: string,
  rating: 1 | 2 | 3 | 4,
) {
  const response = await fetch(`${apiUrl}/reviews`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cardId,
      rating,
    }),
  });

  if (!response.ok) {
    throw new ApiError("Could not submit review", response.status)
  }

  return response.json();
}