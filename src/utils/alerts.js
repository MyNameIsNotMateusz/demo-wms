import { toast } from "sonner";

export const handleError = (message) => {
  toast.error(message, {
    duration: 2500,
    position: "top-center",
  });
};

export const handleSuccess = (message) => {
  toast.success(message, {
    duration: 2500,
    position: "top-center",
  });
};
