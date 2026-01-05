export const handleApiError = (error) => {
  if (error.response) {
    return error.response.data?.message || "Server error";
  }
  if (error.request) {
    return "Network error";
  }
  return "Unexpected error";
};
