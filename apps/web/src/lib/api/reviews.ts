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