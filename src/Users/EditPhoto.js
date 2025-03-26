import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";

function EditPhoto() {
  let current_user = useSelector((state) => state.userState.current_user);
  const dispatch = useDispatch();
  const cookies = new Cookies();

  const updatePhoto = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profile_picture", e.target.image.files[0]);
    formData.append("password", e.target[1].value);
    // let photo = {
    //   photo: e.target.image.files[0],
    //   password: e.target[1].value
    // };
    let recPack = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${cookies.get("jwt-token")}`,
      },
      body: formData,
    };
    fetch(`http://localhost:3000/api/v1/profilepicture`, recPack)
      .then((res) => res.json())
      .then((data) => (dispatch({ type: "EDIT", current_user: data.user}), console.log(data)));
    // get users
    e.target.reset();
    //   navigate back to profile
  };
  return (
    <div>
      <form onSubmit={(e) => updatePhoto(e)}>
        <input
          type="file"
          name="image"
          id="profile_picture"
          placeholder="Choose Photo"
        ></input>
        <input type="text" placeholder="Enter password to cont."></input>
        <input
          type="submit"
          style={{ backgroundColor: "yellow", color: "black" }}
        ></input>
      </form>
    </div>
  );
}

export default EditPhoto;
