import { validateUserForm } from "./userValidation";

describe("validateUserForm", () => {
  it("should return false if the user already exists.", () => {
    const userFormData = {
      name: "User",
      email: "user@gmail.com",
      password: "Password123",
      position: "Employee",
      role: "accountant",
      is_staff: true,
    };
    const mode = "create";
    const userRows = [
      {
        email: "User@gmail.com",
      },
    ];

    const result = validateUserForm(userFormData, mode, userRows, () => {});

    expect(result).toBe(false);
  });

  it("should return false if required fields are missing.", () => {
    const userFormData = {
      name: "User",
      email: "user@gmail.com",
      password: "",
      position: "Employee",
      role: "accountant",
      is_staff: true,
    };
    const mode = "create";
    const userRows = [];

    const result = validateUserForm(userFormData, mode, userRows, () => {});

    expect(result).toBe(false);
  });

  it("should return false if the role is admin and is_staff is not checked.", () => {
    const userFormData = {
      name: "User",
      email: "user@gmail.com",
      password: "Password123",
      position: "Employee",
      role: "admin",
      is_staff: false,
    };
    const mode = "create";
    const userRows = [];

    const result = validateUserForm(userFormData, mode, userRows, () => {});

    expect(result).toBe(false);
  });

  it("should return false if the e-mail has an incorrect format.", () => {
    const userFormData = {
      name: "User",
      email: "user",
      password: "Password123",
      position: "Employee",
      role: "admin",
      is_staff: true,
    };
    const mode = "create";
    const userRows = [];

    const result = validateUserForm(userFormData, mode, userRows, () => {});

    expect(result).toBe(false);
  });

  it("should return false if the password is shorter than 8 characters.", () => {
    const userFormData = {
      name: "User",
      email: "user@gmail.com",
      password: "Pass123",
      position: "Employee",
      role: "admin",
      is_staff: true,
    };
    const mode = "create";
    const userRows = [];

    const result = validateUserForm(userFormData, mode, userRows, () => {});

    expect(result).toBe(false);
  });

  it("should return false if the password consists only of numbers.", () => {
    const userFormData = {
      name: "User",
      email: "user@gmail.com",
      password: "12345678",
      position: "Employee",
      role: "admin",
      is_staff: true,
    };
    const mode = "create";
    const userRows = [];

    const result = validateUserForm(userFormData, mode, userRows, () => {});

    expect(result).toBe(false);
  });

  it("should return false if the password does not contain the required characters.", () => {
    const userFormData = {
      name: "User",
      email: "user@gmail.com",
      password: "password123",
      position: "Employee",
      role: "admin",
      is_staff: true,
    };
    const mode = "create";
    const userRows = [];

    const result = validateUserForm(userFormData, mode, userRows, () => {});

    expect(result).toBe(false);
  });

  it("should return true when the form is valid.", () => {
    const userFormData = {
      name: "User",
      email: "user@gmail.com",
      password: "Password123",
      position: "Employee",
      role: "admin",
      is_staff: true,
    };
    const mode = "create";
    const userRows = [];

    const result = validateUserForm(userFormData, mode, userRows, () => {});

    expect(result).toBe(true);
  });
});
