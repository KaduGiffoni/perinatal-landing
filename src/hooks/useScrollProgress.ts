import { useEffect, useState } from "react";

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      const scrollTop = window.scrollY;

      const docHeight = document.body.scrollHeight - window.innerHeight;

      const progress = scrollTop / docHeight;

      setProgress(progress);
    };

    window.addEventListener("scroll", updateScroll);

    updateScroll();

    return () => {
      window.removeEventListener("scroll", updateScroll);
    };
  }, []);

  return progress;
}
