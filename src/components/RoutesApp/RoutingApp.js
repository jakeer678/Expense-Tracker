import React, { Fragment } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import SignUp from "../PagesRoute/SignUp";
import StartingPage from "../PagesRoute/StartingPage";
import Home from "../PagesRoute/Home";
import Login from "../PagesRoute/Login";
import ForgotPassword from "../PagesRoute/ForgotPassword";
import ContactDetails from "../PagesRoute/ProfileDetail";

const RoutingApp = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <div>
                <Navbar />
                <Outlet />
              </div>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="/startingpage" element={<StartingPage />} />
            <Route path="/contactdetails" element={<ContactDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
};

export default RoutingApp;
