import React, { useContext, useEffect, useRef, useState } from "react";
import { userContext } from "../../store/ContextStore";
import "./Profile.css";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProfileDetail = () => {
  const [profileUpdate, setProfileUpdate] = useState("");
  const fullNameRef = useRef();
  const photoUrlRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const redirect = useNavigate('')
  // const { token } = useContext(userContext);
  const token = useSelector((state) => state.auth.idToken);

  const fetchProfileUpdate = async () => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCu5UWll7yrSyYvqmDYmYLdxlWNkCixilI",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseData = response.json();
    console.log(responseData, "llllll");
    const usersData = responseData.users[0];
    fullNameRef.current.value = usersData.displayName;
    photoUrlRef.current.value = usersData.photoUrl;
  };

  const profileSubmitHandler = async (e) => {
    e.preventDefault();
    const enteredFullName = fullNameRef.current.value;
    const enteredphotoUrl = photoUrlRef.current.value;
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCu5UWll7yrSyYvqmDYmYLdxlWNkCixilI",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
            displayName: enteredFullName,
            photoUrl: enteredphotoUrl,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = await response.json();
      console.log(responseData, "photourl");
      alert("Profile updated successfully");
      setIsLoading(false);
      setProfileUpdate(responseData);
      redirect('/expenses')

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProfileUpdate();
  }, []);

  return (
    <div className="profile">
      <h3>Upadate Your Profile</h3>
      <form onSubmit={profileSubmitHandler}>
        <div className="control_1">
          <label>Full name</label>
          <input type="text" ref={fullNameRef} />
        </div>
        <div className="control_1">
          <label htmlFor="imageUrl">Profile Photo Url</label>
          <input ref={photoUrlRef} />
        </div>
        {isLoading && <p>sending request..!</p>}
        <div className="btn_update">
          <Button type="submit" variant="contained" color="success">
            update
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileDetail;
