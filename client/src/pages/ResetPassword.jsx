import React, { useState } from "react";
import store from "../zustandStore/store";
import { resetPasswordAPI } from "../router/apis";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FormField } from "../Helpers/pageHelpers";

export const isPasswordComplex = (password) => {
  // Customize this function based on your complexity requirements
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasDigit = /\d/.test(password);
  return hasUpperCase && hasLowerCase && hasDigit;
};

export const ResetPassword = () => {
  const { resetPassword, setResetPassword } = store();
  const { newPassword, confirmPassword } = resetPassword;
  const [passwordVisible, setPasswordVisible] = useState(false);
  const changePage = useNavigate();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setResetPassword({ ...resetPassword, [name]: value });
  };

  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const inputType = passwordVisible ? "text" : "password";
  const userId = window.location.pathname.split("/").pop();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    // Password match check
    if (newPassword !== confirmPassword) {
      toast.success("Passwords do not match");
      return;
    }

    // Password complexity check (you can customize this check based on your requirements)
    if (!isPasswordComplex(newPassword)) {
      toast.error(
        "Password must contain at least one uppercase letter, one lowercase letter, and one digit"
      );
      return;
    }
    resetPasswordAPI({ userId, newPassword })
      .then((res) => {
        setResetPassword({
          newPassword: "",
          confirmPassword: "",
        });
        toast.success(res.data.message);
        if (res.data.message === "Password updated") {
          changePage("/login");
        }
      })
      .catch((error) => {
        toast.error(error.response.data.errorMessage);
      });
  };

  return (
    <>
      <h2 className='card-title text-center mb-3'>Reset Your password</h2>
      <div className='container login-form-container'>
        <form onSubmit={handleSubmit} className='all-form login-form'>
          <div className='row'>
            <div className='col-12 col-md-6'>
              <FormField
                label='New Password'
                type={inputType}
                name='newPassword'
                value={newPassword}
                onChange={handleInputChange}
                placeholder='Enter the Password'
              />
            </div>
            <div className='col-12 col-md-6'>
              <FormField
                label='Confirm Password'
                type={inputType}
                name='confirmPassword'
                value={confirmPassword}
                onChange={handleInputChange}
                placeholder='Enter the re-enter Password'
              />
            </div>
            <div>
              <input
                type='checkbox'
                id='showPassword'
                checked={passwordVisible}
                onChange={handleTogglePasswordVisibility}
              />
              <label htmlFor='showPassword'>Show Password</label>
            </div>
            <button className='btn btn-danger' type='submit'>
              Change Password
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
