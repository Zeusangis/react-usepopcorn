import { useEffect } from "react";

export function useKey(key, action) {
  useEffect(() => {
    function handleEscape(e) {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        action();
      }
    }
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [action, key]);
}
