export const validateChangePassword = (formData, handleError) => {
  const { old_password, new_password, confirm_new_password } = formData;

  if (!old_password || !new_password || !confirm_new_password) {
    handleError("Please fill in all fields.");
    return false;
  }

  if (new_password.length < 8) {
    handleError("Password must be at least 8 characters long.");
    return false;
  }

  if (/^\d+$/.test(new_password)) {
    handleError("Password cannot consist of only numbers.");
    return false;
  }

  if (
    !/[A-Z]/.test(new_password) ||
    !/[a-z]/.test(new_password) ||
    !/[0-9]/.test(new_password)
  ) {
    handleError(
      "Password must contain at least one uppercase letter, one lowercase letter, and one number.",
    );
    return false;
  }

  if (new_password !== confirm_new_password) {
    handleError("New password and confirm password do not match.");
    return false;
  }

  return true;
};
