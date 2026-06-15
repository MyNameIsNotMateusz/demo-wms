import { useEffect } from "react";

export const useBarcodeScanner = (onScan) => {
  useEffect(() => {
    let buffer = "";
    let lastTime = 0;
    const SCAN_DELAY_THRESHOLD = 20;

    const handleKeyDown = (e) => {
      if (e.key === "Shift") return;

      const currentTime = Date.now();

      if (lastTime && currentTime - lastTime > SCAN_DELAY_THRESHOLD) {
        buffer = "";
      }

      lastTime = currentTime;

      if (e.key === "Enter" || e.key === "Tab") {
        if (buffer.length > 0) {
          onScan(buffer);
        }

        buffer = "";
        e.preventDefault();
      } else {
        buffer += e.key;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onScan]);
};
