export const getToken = () => {
  return localStorage.getItem("token");
};

export const getAuthHeaders = () => {
  const token = getToken();

  return {
    Authorization: `Bearer ${token}`,
  };
};
