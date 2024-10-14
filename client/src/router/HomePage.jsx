import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { verifyUser, declineUser, getUser } from "./apis";

const HomePage = () => {
  const access = verifyUser();
  const portal = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const logout = () => {
    declineUser(() => portal("/login"));
  };

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <div id='navbar-main'>
      <nav className='navbar navbar-expand-md navbar-light bg-light'>
        <div className='container-fluid'>
          <Link className='navbar-brand' to={`${location.pathname}`}>
            <button className='btn btn'>
              <div className='user-icon'>
                {access && (
                  <>
                    {getUser("user")
                      .email.split("@")[0]
                      .charAt(0)
                      .toUpperCase()}
                  </>
                )}
              </div>
            </button>
            <b> Accounting EdTool</b>
          </Link>

          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarNav'
            aria-controls='navbarNav'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>

          <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav ml-auto'>
              {!access && (
                <>
                  <li className={`nav-item ${isActive("/registration")}`}>
                    <Link className='nav-link' to='/registration'>
                      Register
                    </Link>
                  </li>
                  <li className={`nav-item ${isActive("/login")}`}>
                    <Link className='nav-link' to='/login'>
                      Login
                    </Link>
                  </li>
                </>
              )}

              {access && access.userType === "student" && (
                <>
                  <li className={`nav-item ${isActive("/student")}`}>
                    <Link className='nav-link' to='/student'>
                      Topics
                    </Link>
                  </li>
                  <li className={`nav-item ${isActive("/report")}`}>
                    <Link className='nav-link' to='/report'>
                      Report
                    </Link>
                  </li>
                </>
              )}

              {access && access.userType === "teacher" && (
                <>
                  <li className={`nav-item ${isActive("/dashboard")}`}>
                    <Link className='nav-link' to='/dashboard'>
                      Dashboard
                    </Link>
                  </li>
                  <li className={`nav-item ${isActive("/teacher")}`}>
                    <Link className='nav-link' to='/teacher'>
                      Add
                    </Link>
                  </li>
                  <li className={`nav-item ${isActive("/otherTopics")}`}>
                    <Link className='nav-link' to='/otherTopics'>
                      Topics
                    </Link>
                  </li>
                  <li className={`nav-item ${isActive("/questions")}`}>
                    <Link className='nav-link' to='/questions'>
                      Questions
                    </Link>
                  </li>
                </>
              )}

              {access && (
                <>
                  <li className='nav-item'>
                    <div
                      className='btn-group'
                      onMouseEnter={() => setDropdownOpen(true)}
                      onMouseLeave={() => setDropdownOpen(false)}
                    >
                      <button className='btn btn-danger'>
                        {getUser("user").email.split("@")[0]}
                      </button>
                      <button
                        type='button'
                        className='btn btn-danger dropdown-toggle dropdown-toggle-split'
                        data-toggle='dropdown'
                        aria-haspopup='true'
                        aria-expanded={dropdownOpen}
                      >
                        <span className='sr-only'>Toggle Dropdown</span>
                      </button>
                      <div
                        className={`dropdown-menu ${
                          dropdownOpen ? "show" : ""
                        }`}
                        onClick={toggleDropdown}
                      >
                        <span className='dropdown-item'>
                          <i>{getUser("user").email}</i>
                        </span>
                        <div className='dropdown-divider'></div>
                        <button
                          className='dropdown-item btn btn-outline-danger'
                          onClick={logout}
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  </li>
                  <span className='loader-time'></span>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default HomePage;
