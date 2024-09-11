import React, { createContext } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect } from "react";
import axios from "axios";
import { global } from "../../Config/Configure";

export const CustomerContext = createContext();
export default function Context({ children }) {
  let navigate = useNavigate();
  const { pathname } = useLocation();
  const { host } = global;
  const [state, setState] = useState(true);
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [cuisines, setCuisines] = useState([]);
  const [chefs, setChefs] = useState([]);
  const [myBookings, setMyBookings] = useState([]);

  //alerts
  const autoCloseAlert = (msgTitle, msgHtml, msgTimer) => {
    let timerInterval;
    Swal.fire({
      title: msgTitle,
      html: msgHtml + " in <b></b> milliseconds.",
      timer: msgTimer,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup().querySelector("b");
        timerInterval = setInterval(() => {
          timer.textContent = `${Swal.getTimerLeft()}`;
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        // console.log("I was closed by the timer");
      }
    });
  };

  const confirmation = (
    mainSubTitle,
    confirmButtonLabel,
    cancelMessage,
    successTitle,
    successSubTitle,
    performAction
  ) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: mainSubTitle,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: confirmButtonLabel,
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          performAction();
          swalWithBootstrapButtons.fire({
            title: successTitle,
            text: successSubTitle,
            icon: "success",
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: cancelMessage,
            icon: "error",
          });
        }
      });
  };

  const directAlert = (type, message, time) => {
    Swal.fire({
      position: "center",
      icon: type,
      title: message,
      showConfirmButton: false,
      timer: time,
    });
  };

  //functions
  const getProfile = async () => {
    let token = localStorage.getItem("customerToken");
    axios
      .get(`${host}/customer/getProfile`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        setCustomer(res.data.customer);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("customerToken") != null) {
      getProfile();
    } else {
      if (pathname != "/" && pathname != "/About" && pathname != "/Chefs") {
        navigate("/");
      }
      setCustomer(null);
    }
  }, [state]);

  const customerLogin = async (data) => {
    axios
      .post(`${host}/customer/Login`, data)
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          localStorage.setItem("customerToken", res.data.token);
          setCustomer(res.data.customer);
          setState(!state);
          directAlert("success", "You have successfully logged in", 3000);
          navigate("/");
        } else {
          directAlert("error", res.data.message, 3000);
        }
      })
      .catch((err) => {
        directAlert("error", err.response.data.message, 3000);
      });
  };
  const customerRegister = async (data) => {
    axios
      .post(`${host}/customer/Register`, data)
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          directAlert("success", res.data.message, 3000);
          navigate("/Login");
        } else {
          directAlert("error", res.data.message, 3000);
        }
      })
      .catch((err) => {
        directAlert("error", err.response.data.message, 3000);
      });
  };

  const customerLogout = () => {
    localStorage.removeItem("customerToken");
    setCustomer(null);
    setState(!state);
    directAlert("success", "You have successfully logged out", 3000);
    navigate("/");
  };
  const updateProfile = (data) => {
    let token = localStorage.getItem("customerToken");
    axios
      .put(`${host}/customer/updateProfile`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        console.log(res.data);
        setCustomer(res.data.customer);
        setState(!state);
        autoCloseAlert(res.data.message, "Your profile load here ", 3000);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const viewAllCuisines = () => {
    let token = localStorage.getItem("customerToken");
    axios
      .get(`${host}/customer/viewAllCuisines`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          setCuisines(res.data.cuisines);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const viewAllChefs = () => {
    axios
      .get(`${host}/customer/viewAllChefs`)
      .then((res) => {
        if (res.data.success) {
          setChefs(res.data.chefs);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const book = (data) => {
    let token = localStorage.getItem("customerToken");
    axios
      .post(`${host}/customer/book`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          autoCloseAlert(
            res.data.message,
            "Your booking history load here ",
            3000
          );
          navigate("/Bookings");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getMyBookings = () => {
    let token = localStorage.getItem("customerToken");
    axios
      .get(`${host}/customer/getMyBookings`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          setMyBookings(res.data.bookings);
        } else {
          setMyBookings([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const cancelMyBooking = (id) => {
    let token = localStorage.getItem("customerToken");
    axios
      .put(
        `${host}/customer/cancelMyBooking/${id}`,
        {},
        {
          headers: { "auth-token": token },
        }
      )
      .then((res) => {
        if (res.data.success) {
          autoCloseAlert(
            res.data.message,
            "Your booking history load here ",
            3000
          );
          getMyBookings();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const payForBooking = (id, data) => {
    let token = localStorage.getItem("customerToken");
    axios
      .put(
        `${host}/customer/payForBooking/${id}`,
        { data },
        {
          headers: { "auth-token": token },
        }
      )
      .then((res) => {
        if (res.data.success) {
          directAlert("success", res.data.message, 3000);
          getMyBookings();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const giveFeedbackForBooking = (id, data) => {
    let token = localStorage.getItem("customerToken");
    axios
      .put(`${host}/customer/giveFeedbackForBooking/${id}`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          directAlert("success", res.data.message, 3000);
          getMyBookings();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const RateChef = (id, data) => {
    let token = localStorage.getItem("customerToken");
    axios
      .put(`${host}/customer/RateChef/${id}`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          directAlert("success", res.data.message, 3000);
          getMyBookings();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <CustomerContext.Provider
      value={{
        state,
        setState,
        loading,
        setLoading,
        customer,
        setCustomer,
        pathname,
        host,
        navigate,
        customerLogin,
        customerRegister,
        customerLogout,
        updateProfile,
        viewAllCuisines,
        cuisines,
        viewAllChefs,
        chefs,
        book,
        getMyBookings,
        myBookings,
        cancelMyBooking,
        payForBooking,
        giveFeedbackForBooking,RateChef
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
}
