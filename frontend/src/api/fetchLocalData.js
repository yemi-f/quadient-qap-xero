export const fetchLocalData = async (fileName) => {
  try {
    const response = await fetch(`/data/${fileName}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${fileName}: ${response.statusText}`);
    }

    // Check if the response is actually JSON
    const contentType = response.headers.get("Content-Type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Response is not JSON.");
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch error: ", error);
    throw new Error(error.message);
  }
};
