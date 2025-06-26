export const setLocalStorageWithTTL = (key: string, value: any, ttl: number) => {
    const expiry = Date.now() + ttl; // Calculate expiry time
    const data = { value, expiry };
    localStorage.setItem(key, JSON.stringify(data));
  };
  
  export const getLocalStorageWithTTL = (key: string) => {
    if (typeof window === "undefined") return null;
  
    const data = localStorage.getItem(key);
    if (!data) return null;
  
    const { value, expiry } = JSON.parse(data);
    if (Date.now() > expiry) {
      localStorage.removeItem(key); // Remove expired item
      return null;
    }
    return value;
  };
  
  export const removeLocalStorageItem = (key: string) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key);
    }
  };