export const formatDate = (date: Date): string => {
    try {
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
      const year = date.getFullYear();
  
      return `${day}/${month}/${year}`;
    } catch (error) {
      console.error("Error formatting date:", error);
      return "";
    }
  };
  
export const formatDateTime = (date: Date): string => {
    try {
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
  
      return `${hours}:${minutes} ${day}/${month}`;
    } catch (error) {
      console.error("Error formatting date:", error);
      return "";
    }
  };
