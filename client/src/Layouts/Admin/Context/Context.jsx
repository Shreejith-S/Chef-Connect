import React, { createContext } from "react";
import { useState } from "react";
import { global } from "../../Config/Configure";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { useEffect } from "react";

export const AdminContext = createContext();

export default function Context({ children }) {
  let navigate = useNavigate();
  const { pathname } = useLocation();
  const { host } = global;
  const [state, setState] = useState(true);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState("/admin/DashBoard");
  const [active, setActive] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [chefs, setChefs] = useState([]);
  const [singleChef, setSingleChef] = useState(null);
  const [cuisines, setCuisines] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [report, setReport] = useState({
    customerCount: 0,
    chefCount: 0,
    cuisineCount: 0,
  });
  const [chefVarieties, setChefVarieties] = useState({
    vegChefs: 0,
    nonVegChefs: 0,
    flexChefs: 0,
  });

  useEffect(() => {
    if (pathname == "/admin/DashBoard") {
      setActive("DashBoard");
    } else if (pathname == "/admin/Customers") {
      setActive("Customers");
    } else if (pathname == "/admin/Chefs") {
      setActive("Chefs");
    } else if (pathname == "/admin/Cuisines") {
      setActive("Cuisines");
    } else if (pathname == "/admin/Bookings") {
      setActive("Bookings");
    } else {
      setActive(null);
    }
  }, [pathname]);
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
    let token = localStorage.getItem("adminToken");
    axios
      .get(`${host}/admin/getProfile`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        setAdmin(res.data.admin);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("adminToken") != null) {
      getProfile();
    } else {
      setAdmin(null);
      navigate("/admin/");
    }
  }, [state]);

  const adminLogin = async (data) => {
    axios
      .post(`${host}/admin/Login`, data)
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          localStorage.setItem("adminToken", res.data.token);
          setAdmin(res.data.admin);
          setState(!state);
          directAlert("success", res.data.message, 3000);
          navigate("/admin/Dashboard");
        } else {
          directAlert("error", res.data.message, 3000);
        }
      })
      .catch((err) => {
        directAlert("error", err.response.data.message, 3000);
      });
  };

  const updateProfile = async (data) => {
    let token = localStorage.getItem("adminToken");

    axios
      .put(`${host}/admin/updateProfile`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          setAdmin(res.data.admin);
          setState(!state);
          autoCloseAlert(
            res.data.message,
            "Your profile will load here ",
            3000
          );
        } else {
          directAlert("error", res.data.message, 3000);
        }
      })
      .catch((err) => {
        directAlert("error", err.response.data.message, 3000);
      });
  };

  const customerLogout = () => {
    localStorage.removeItem("adminToken");
    setAdmin(null);
    setState(!state);
    directAlert("success", "logged out successfully", 3000);
    navigate("/admin/");
  };

  const getAllCustomers = async () => {
    let token = localStorage.getItem("adminToken");
    axios
      .get(`${host}/admin/getAllCustomers`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success);
        setCustomers(res.data.customers);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const updateCustomerStatus = async (id, status) => {
    let token = localStorage.getItem("adminToken");
    axios
      .put(
        `${host}/admin/updateCustomerStatus/${id}`,
        { status },
        {
          headers: { "auth-token": token },
        }
      )
      .then((res) => {
        if (res.data.success);
        directAlert(res.data.color, res.data.message, 2000);
        setState(!state);
        getAllCustomers();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const getAllCUisines = async () => {
    let token = localStorage.getItem("adminToken");
    axios
      .get(`${host}/admin/getAllCUisines`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success);
        setCuisines(res.data.cuisines);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const insertNewCuisine = async (data) => {
    let token = localStorage.getItem("adminToken");
    axios
      .post(`${host}/admin/insertNewCuisine`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success);
        directAlert("success", res.data.message, 2000);
        getAllCUisines();
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const deleteCuisine = async (id) => {
    let token = localStorage.getItem("adminToken");
    axios
      .delete(`${host}/admin/deleteCuisine/${id}`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success);
        directAlert("success", res.data.message, 2000);
        getAllCUisines();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const getAllChefs = async () => {
    let token = localStorage.getItem("adminToken");
    axios
      .get(`${host}/admin/getAllChefs`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success);
        setChefs(res.data.chefs);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const insertNewChef = async (data) => {
    let token = localStorage.getItem("adminToken");
    axios
      .post(`${host}/admin/insertNewChef`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          directAlert("success", res.data.message, 2000);
          getAllChefs();
          navigate("/admin/Chefs");
        } else {
          directAlert("error", res.data.message, 2000);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const deleteChef = async (id) => {
    let token = localStorage.getItem("adminToken");
    axios
      .delete(`${host}/admin/deleteChef/${id}`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success);
        directAlert("success", res.data.message, 2000);
        getAllChefs();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const getSingleChef = async (id) => {
    let token = localStorage.getItem("adminToken");
    axios
      .get(`${host}/admin/getSingleChef/${id}`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success);
        setSingleChef(res.data.chef);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const updateChef = async (id, data) => {
    let token = localStorage.getItem("adminToken");
    axios
      .put(`${host}/admin/updateChef/${id}`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          directAlert("success", res.data.message, 2000);
          getAllChefs();
          setTimeout(() => {
            navigate("/admin/Chefs");
          }, 1000);
        } else {
          directAlert("error", res.data.message, 2000);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const getCounts = async (id) => {
    let token = localStorage.getItem("adminToken");
    axios
      .get(`${host}/admin/getCounts`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success);
        setReport({
          customerCount: res.data.customerCount,
          chefCount: res.data.chefCount,
          cuisineCount: res.data.cuisineCount,
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const getChefBasedOnMealType = async (id) => {
    let token = localStorage.getItem("adminToken");
    axios
      .get(`${host}/admin/getChefBasedOnMealType`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success);
        setChefVarieties({
          vegChefs: res.data.vegChefs,
          nonVegChefs: res.data.nonVegChefs,
          flexChefs: res.data.flexChefs,
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const getAllBookings = async (id) => {
    let token = localStorage.getItem("adminToken");
    axios
      .get(`${host}/admin/getAllBookings`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success);
        setBookings(res.data.bookings);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const updateBooking = async (id, data) => {
    let token = localStorage.getItem("adminToken");
    axios
      .put(`${host}/admin/updateBooking/${id}`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          directAlert("success", res.data.message, 2000);
          getAllBookings();
        } else {
          directAlert("error", res.data.message, 2000);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const updatePaymentForBooking = async (id, data) => {
    let token = localStorage.getItem("adminToken");
    axios
      .put(`${host}/admin/updatePaymentForBooking/${id}`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          directAlert("success", res.data.message, 2000);
          getAllBookings();
        } else {
          directAlert("error", res.data.message, 2000);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <AdminContext.Provider
      value={{
        state,
        setState,
        host,
        loading,
        setLoading,
        navigate,
        pathname,
        adminLogin,
        admin,
        setAdmin,
        customerLogout,
        updateProfile,
        active,
        setActive,
        customers,
        getAllCustomers,
        updateCustomerStatus,
        chefs,
        getAllChefs,
        insertNewChef,
        deleteChef,
        cuisines,
        getAllCUisines,
        insertNewCuisine,
        deleteCuisine,
        getSingleChef,
        singleChef,
        updateChef,
        report,
        getCounts,
        getChefBasedOnMealType,
        chefVarieties,
        bookings,
        getAllBookings,
        updateBooking,
        updatePaymentForBooking,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}
