import { API_URL } from "@/src/services/api";
import { parseApiError } from "@/src/shared/utils/parseApiError";

export async function deleteChild(
  childId: number,
  token: string,
): Promise<void> {
  const response = await fetch(`${API_URL}/api/v1/children/${childId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response, "Failed to delete child"));
  }
}
