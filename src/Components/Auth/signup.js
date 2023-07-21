import React, { useState } from "react";
import "../../style/Signup.css";
import { fetchData } from "../../axios_URL";
import myImage from "./signup.png";
import Firebase from "./Firebase";
import { CgSpinner } from "react-icons/cg";
import PhoneInput from "react-phone-input-2";
import 'bootstrap/dist/css/bootstrap.css';

function SignUpForm() {
  const [ph, setPh] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    name: "",
    phonenumber: "",
    gender: "",
    dateOfBirth: "",
    city: "",
    address: "",
    profile_pictureurl: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const check_email = await fetchData(
      "get",
      `/check-email/${formData.email}`,
      null,
      setError
    );

    if (!check_email.data) {
      setError(
        "Email address already exists. Please use a different email address."
      );
      return;
    }
    console.log(ph);
    const formDataObj = new FormData();
    formDataObj.append("email", formData.email);
    formDataObj.append("username", formData.username);
    formDataObj.append("password", formData.password);
    formDataObj.append("name", formData.name);
    formDataObj.append("phonenumber", ph);
    formDataObj.append("gender", formData.gender);
    formDataObj.append("dateOfBirth", formData.dateOfBirth);
    formDataObj.append("city", formData.city);
    formDataObj.append("address", formData.address);
    if (formData.profile_pictureurl) {
      formDataObj.append("profile_pictureurl", formData.profile_pictureurl);
    }
    localStorage.removeItem("token");
    try {
      const response = await fetchData(
        "post",
        "/signup",
        formDataObj,
        setError
      );
    } catch (error) {
      window.location.href = "/login";
    }
  };

  const handleChange = (event) => {
    if (event.target.name === "profile_pictureurl") {
      setFormData({
        ...formData,
        profile_pictureurl: event.target.files[0],
        profile_pictureurl: URL.createObjectURL(event.target.files[0]),
      });
    } else {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    }
  };
  {
    return (
      <>
        <div className="signup-container">
          <div className="signup-img">
            <img src={myImage} alt="My Image" />
          </div>

          <div className="signup-form-container ">
            {error && <p className="error-message">{error}</p>}
            <form className="signup-form" onSubmit={handleSubmit}>
              <h1>Sign Up</h1>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phonenumber">Phone Number:</label>
                <PhoneInput
                  country={"sy"}
                  value={ph}
                  onChange={setPh}
                  inputStyle={{ width: "100%" }}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="gender">Gender:</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="dateOfBirth">Date of Birth:</label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="city">City:</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address:</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="profile_pictureurl">Profile Picture:</label>
                <input
                  type="file"
                  accept="image/*"
                  id="profile_pictureurl"
                  name="profile_pictureurl"
                  onChange={handleChange}
                />
                {formData.profile_pictureurl && (
                  <div className="profile-picture-container">
                    <img
                      src={formData.profile_pictureurl}
                      alt="Profile"
                      className="profile-picture"
                    />
                  </div>
                )}
              </div>
              <button type="submit">
                Submit
                {success && (
                  <CgSpinner size={20} className="mt-1 animate-spin" />
                )}
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default SignUpForm;
