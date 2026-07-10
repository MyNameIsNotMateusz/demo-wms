import { toast } from "sonner";

export const handleError = (message, duration = 2500) => {
  toast.error(message, {
    duration,
    position: "top-center",
  });
};

export const handleSuccess = (message) => {
  toast.success(message, {
    duration: 2500,
    position: "top-center",
  });
};
