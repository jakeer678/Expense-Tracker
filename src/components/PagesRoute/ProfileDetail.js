import React, { useContext, useEffect, useRef, useState } from "react";
import { userContext } from "../../store/ContextStore";

const ProfileDetail = () => {
  const [profileUpdate, setProfileUpdate] = useState("");
  const fullNameRef = useRef();
  const photoUrlRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useContext(userContext);

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
      alert("Profile updated successfully")
      setIsLoading(false);
      setProfileUpdate(responseData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProfileUpdate();
  }, []);

  return (
    <div>
      <h1>Contact Deatil</h1>
      <form onSubmit={profileSubmitHandler}>
        <div>
          <label>Full name</label>
          <input type="text" ref={fullNameRef} />
        </div>
        <div>
          <label htmlFor="imageUrl">Profile Photo Url</label>
          <input ref={photoUrlRef} />
        </div>
        {isLoading && <p>sending request..!</p>}
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default ProfileDetail;
