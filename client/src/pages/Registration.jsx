import React, { useState } from "react";
import store from "../zustandStore/store";
import { Link, useNavigate } from "react-router-dom";
import {
  register,
  login,
  allowUser,
  verifyUser,
  forgotPasswordAPI,
} from "../router/apis";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { isPasswordComplex } from "./ResetPassword";
import { FormField, DropdownOptions } from "../Helpers/pageHelpers";
import toast from "react-hot-toast";

export const Registration = () => {
  const { user, setUser } = store();
  const { firstName, lastName, email, password, userType } = user;
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubmitForm = (event) => {
    event.preventDefault();

    if (
      !firstName.length ||
      !lastName.length ||
      !email.length ||
      !password.length ||
      !userType
    ) {
      toast.error("Enter required fields");
    } else if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    } else if (!isPasswordComplex(password)) {
      toast.error(
        "Password must contain at least one uppercase letter, one lowercase letter, and one digit"
      );
      return;
    } else {
      register(user)
        .then((res) => {
          setUser({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            userType: "",
          });
          toast.success(res.data.message);
        })
        .catch((error) => {
          toast.error(error.response.data.errorMessage);
        });
    }
  };
  return (
    <>
      <h2 className='card-title text-center mb-3'>
        Register for A Teaching tool for Accountancy and Accounting Data
      </h2>
      <div className='container login-form-container'>
        <form onSubmit={handleSubmitForm} className='all-form login-form'>
          <div className='row'>
            <div className='col-6 col-md-6'>
              <FormField
                label='First Name'
                type='text'
                name='firstName'
                value={firstName}
                onChange={handleInputChange}
                placeholder='Enter your first name'
              />
            </div>
            <div className='col-6 col-md-6'>
              <FormField
                label='Last Name'
                type='text'
                name='lastName'
                value={lastName}
                onChange={handleInputChange}
                placeholder='Enter your last name'
              />
            </div>
          </div>
          <FormField
            label='Email Address'
            type='email'
            name='email'
            value={email}
            onChange={handleInputChange}
            placeholder='Enter your email'
          />
          <FormField
            label='Password'
            type='password'
            name='password'
            value={password}
            onChange={handleInputChange}
            placeholder='Enter your password'
          />
          <div className='row'>
            <div className='col-6 col-md-6'>
              <label htmlFor='userType' className='form-label '>
                User Type
              </label>
              <DropdownOptions
                options={["", "teacher", "student"]}
                name='userType'
                value={userType}
                onChange={handleInputChange}
              />
            </div>
            <div className='col-6 col-md-6'>
              <button type='submit' className='btn btn-success mt-2'>
                Register
              </button>
              <div className='form-options'>
                <Link className='links' to='/login'>
                  Already have an account? Login here.
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export const Login = () => {
  const { userLogin, setLogin, forgotPasswordEmail, setForgotPassword } =
    store();
  const { email, password } = userLogin;
  const portal = useNavigate();
  const [ShowForgot, setShowForgot] = useState(false);

  const openModel = () => {
    setShowForgot(true);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLogin({ ...userLogin, [name]: value });
  };
  const handleForgotPassword = (event) => {
    setForgotPassword((event.target.name = event.target.value));
  };
  const handleLogin = (e) => {
    e.preventDefault();
    if ((email.length && password.length) === 0) {
      toast.error(" Please Enter your Email and Password");
    } else {
      login(userLogin)
        .then((res) => {
          allowUser(res.data.user);
          if (verifyUser() && verifyUser().userType === "student") {
            portal("/student");
          } else if (verifyUser() && verifyUser().userType === "teacher") {
            portal("/teacher");
          }
        })
        .catch((error) => {
          toast.error(error.response.data.errorMessage);
        });
    }
  };
  const handleForgot = (e) => {
    e.preventDefault();
    if (forgotPasswordEmail.length === 0) {
      toast.error(" please enter email id");
    } else {
      forgotPasswordAPI({ forgotPasswordEmail })
        .then((res) => {
          toast.success(res.data.message);
          setShowForgot(false);
          setForgotPassword("");
        })
        .catch((error) => {
          toast.error(error.response.data.errorMessage);
        });
    }
  };

  return (
    <>
      <h2 className='card-title text-center mb-3'>
        Login for A Teaching tool for Accountancy and Accounting Data
      </h2>
      <div className='container login-form-container'>
        <form onSubmit={handleLogin} className='all-form login-form'>
          <FormField
            label='Email Address'
            type='email'
            name='email'
            value={email}
            onChange={handleInputChange}
            placeholder='Enter your email'
          />
          <FormField
            label='Password'
            type='password'
            name='password'
            value={password}
            onChange={handleInputChange}
            placeholder='Enter your password'
          />

          <button className='btn btn-success m-0' type='submit'>
            Login
          </button>

          <div className='form-options'>
            <Link className='links' to='/registration'>
              Don't have an account? Sign up here.
            </Link>

            <button
              className='btn btn-danger m-0'
              type='button'
              onClick={openModel}
            >
              Forgot your password?
            </button>
          </div>
        </form>
        <Modal
          centered
          isOpen={ShowForgot}
          toggle={() => setShowForgot(!ShowForgot)}
        >
          <ModalHeader toggle={() => setShowForgot(!ShowForgot)}>
            Forgot Password
          </ModalHeader>
          <ModalBody>
            <form onSubmit={handleForgot} className='all-form'>
              <FormField
                label='Email'
                type='email'
                name='forgotPasswordEmail'
                value={forgotPasswordEmail}
                onChange={handleForgotPassword}
                placeholder='Enter your Email'
              />
              <button className='btn btn-success m-0' type='submit'>
                submit
              </button>
            </form>
          </ModalBody>
        </Modal>
      </div>
    </>
  );
};
