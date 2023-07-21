import React, { useState, useEffect } from "react";
import { fetchData } from "../../axios_URL";
import "../../style/User.css";
function User_page() {
  const [details, setDetails] = useState({});
  const [editDetails, setEditDetails] = useState({
    address: "",
    phonenumber: "",
    gender: "",
    city: "",
    profile_pictureURL: "",
  });
  const [password, setPassword] = useState({
    passwordold: "",
    passwordnew: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    fetchData("GET", "/user/getdetails")
      .then((response) => {
        setDetails(response.data);
        setEditDetails(response.data);
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
    fetchData("GET", "/user/showbooking")
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  }, []);
  const handleRemoveBooking = (id, type) => {
    let url = "";
    if (type === "event") {
      url = `/user/bookevent/${id}`;
    } else if (type === "tour") {
      url = `/user/booktour/${id}`;
    }
    fetchData("DELETE", url)
      .then((response) => {
        setBookings(bookings.filter((booking) => booking.id !== id));
        setSuccess("Booking removed successfully");
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
      window.location.reload();
  };
  const handleInputChange = (event) => {
    setEditDetails({
      ...editDetails,
      [event.target.name]: event.target.value,
    });
  };

  const handlePasswordChange = (event) => {
    setPassword({
      ...password,
      [event.target.name]: event.target.value,
    });
  };

  const handleDetailsSubmit = (event) => {
    event.preventDefault();
    fetchData("PUT", "/user/changedetails", editDetails)
      .then((response) => {
        setDetails(response.data);
        setEditDetails(response.data);
        setSuccess("User details updated successfully");
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();
    fetchData("POST", "/user/changepassword", password)
      .then((response) => {
        setPassword({
          passwordold: "",
          passwordnew: "",
        });
        setSuccess("Password changed successfully");
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  return (
    <div className="user-page">
      <h2>User Details</h2>
      <form onSubmit={handleDetailsSubmit}>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={editDetails.address}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Phone Number:
          <input
            type="text"
            name="phonenumber"
            value={editDetails.phonenumber}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Gender:
          <input
            type="text"
            name="gender"
            value={editDetails.gender}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          City:
          <input
            type="text"
            name="city"
            value={editDetails.city}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Update Details</button>
      </form>
      <br />
      <h2>Bookings</h2>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Name</th>
            <th>Date</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {bookings.bookings_tour?.map((booking) => (
        
        <tr key={booking.id}>
          <td>Tour</td>
          <td>{booking.tour_id}</td>
          <td>{booking.paid ? "Yes" : "No"}</td>
          <td>{booking.review ? "Yes" : "No"}</td>
          <td>{booking.state}</td>
          <td>
            <button onClick={() => handleRemoveBooking(booking.tour_id, "tour")}>
              Remove
            </button>
          </td>
        </tr>
      ))}
      {bookings.bookings_event?.map((booking) => (
        <tr key={booking.id}>
          <td>Event</td>
          <td>{booking.event_id}</td>
          <td>{booking.paid ? "Yes" : "No"}</td>
          <td>{booking.review ? "Yes" : "No"}</td>
          <td>{booking.state}</td>
          <td>
            <button
              onClick={() => handleRemoveBooking(booking.event_id, "event")}
            >
              Remove
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
      <h2>Change Password</h2>
      <form onSubmit={handlePasswordSubmit}>
        <label>
          Old Password:
          <input
            type="password"
            name="passwordold"
            value={password.passwordold}
            onChange={handlePasswordChange}
          />
        </label>
        <br />
        <label>
          New Password:
          <input
            type="password"
            name="passwordnew"
            value={password.passwordnew}
            onChange={handlePasswordChange}
          />
        </label>
        <br />
        <button type="submit">Change Password</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
}

export default User_page;
