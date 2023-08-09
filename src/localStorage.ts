import { productRequests } from "./data.json";

export const initializeLocalStorage = () => {
  if (typeof window !== "undefined") {
    const existingFeedbacks = JSON.parse(
      localStorage.getItem("feedbacks") || "[]"
    );
    if (existingFeedbacks.length === 0) {
      localStorage.setItem("feedbacks", JSON.stringify(productRequests));
    }
  }
};
