export const validateUserForm = (userFormData, mode, userRows, handleError) => {
  const { name, email, password, position, role, is_staff } = userFormData;

  if (
    mode === "create" &&
    userRows.some((u) => u.email.toLowerCase() === email.toLowerCase())
  ) {
    handleError("A user with this email already exists.");
    return false;
  }

  const isMissingRequiredFields =
    !name || !email || !position || !role || (mode === "create" && !password);

  if (isMissingRequiredFields) {
    handleError(
      "Please fill in all required fields: name, email, password (for new users), position, and role.",
    );
    return false;
  }

  if (role === "admin" && !is_staff) {
    handleError(
      'For an "admin" account, the Is Staff checkbox must be checked.',
    );
    return false;
  }

  if (mode === "create") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      handleError(
        "Please enter a valid email address (example: name@domain.com).",
      );
      return false;
    }

    if (password.length < 8) {
      handleError("Password must be at least 8 characters long.");
      return false;
    }

    if (/^\d+$/.test(password)) {
      handleError("Password cannot consist of only numbers.");
      return false;
    }

    if (
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[0-9]/.test(password)
    ) {
      handleError(
        "Password must contain at least one uppercase letter, one lowercase letter, and one number.",
      );
      return false;
    }
  }

  return true;
};
