export const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString("en-GB", {
      dateStyle: "short",
      timeStyle: "medium",
    });
  };
  