// utils/api/api.js
import axios from "axios";

const api = axios.create({
  baseURL:
    "mongodb+srv://riddhi973797:LB7JOo5N1fQ9MyPi@cluster0.x5k8jsm.mongodb.net/hasti", // Replace with your API base URL
});

export const registration = async (data) => {
  try {
    const response = await api.post("/hasti", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchItems = async () => {
  try {
    const response = await api.get("/hasti");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateItem = async (itemId, newData) => {
  try {
    const response = await api.put(`/hasti/${itemId}`, newData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteItem = async (itemId) => {
  try {
    const response = await api.delete(`/hasti/${itemId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
