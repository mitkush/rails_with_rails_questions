import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'

const SideBar = ({ toggleSidebar, isCollapsed }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="d-flex flex-column min-vh-100 px-3 pt-2 text-white">
        <a
          href="#"
          onClick={toggleSidebar}
          className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <span className="fs-5 d-none d-sm-inline">
            {isCollapsed ? "Open" : "Menu"}
          </span>
        </a>

        <ul
          className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
          id="menu"
        >
          <li className="nav-item">
            <p
              className="nav-link align-middle px-0"
              onClick={() => navigate(`/`)}
            >
              <i className="fs-4 bi-house"></i>{" "}
              <span className={`ms-1 ${isCollapsed ? "d-none" : "d-inline"}`}>
                Home
              </span>
            </p>
          </li>
          <li>
            <a href="#" className="nav-link px-0 align-middle" onClick={() => navigate(`/`)}>
              <i className="fs-4 bi-person-bounding-box"></i>{" "}
              <span className={`ms-1 ${isCollapsed ? "d-none" : "d-inline"}`}>
                Profile
              </span>
            </a>
          </li>
        </ul>

        <div className="dropdown pb-4 mt-auto position-absolute" style={{ bottom: "0%" }}>
          <a
            href="#"
            className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
            id="dropdownUser1"
            data-bs-toggle="dropdown"
          >
            <img
              src="https://github.com/mdo.png"
              alt="hugenerd"
              width="30"
              height="30"
              className="rounded-circle"
            />
            <span className={`ms-1 ${isCollapsed ? "d-none" : "d-inline"}`}>
              loser
            </span>
          </a>
          <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
            <li>
              <a className="dropdown-item" href="#">
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
