import { validateChangePassword } from "./validateChangePassword";

describe("validateChangePassword", () => {
  it("should return false when one of the required fields is missing.", () => {
    const formData = {
      old_password: "",
      new_password: "NewPassword1",
      confirm_new_password: "NewPassword1",
    };

    const result = validateChangePassword(formData, () => {});

    expect(result).toBe(false);
  });

  it("should return false if the password is shorter than 8 characters.", () => {
    const formData = {
      old_password: "OldPassword1",
      new_password: "NPass1",
      confirm_new_password: "NPass1",
    };

    const result = validateChangePassword(formData, () => {});

    expect(result).toBe(false);
  });

  it("should return false if the password consists only of numbers.", () => {
    const formData = {
      old_password: "OldPassword1",
      new_password: "12345678",
      confirm_new_password: "12345678",
    };

    const result = validateChangePassword(formData, () => {});

    expect(result).toBe(false);
  });

  it("should return false if the password does not contain the required characters.", () => {
    const formData = {
      old_password: "OldPassword1",
      new_password: "NewPassword",
      confirm_new_password: "NewPassword",
    };

    const result = validateChangePassword(formData, () => {});

    expect(result).toBe(false);
  });

  it("should return false when the new password and confirm password do not match.", () => {
    const formData = {
      old_password: "OldPassword1",
      new_password: "NewPassword1",
      confirm_new_password: "NewPassword2",
    };

    const result = validateChangePassword(formData, () => {});

    expect(result).toBe(false);
  });

  it("should return true when the form is valid.", () => {
    const formData = {
      old_password: "OldPassword1",
      new_password: "NewPassword1",
      confirm_new_password: "NewPassword1",
    };

    const result = validateChangePassword(formData, () => {});

    expect(result).toBe(true);
  });
});
