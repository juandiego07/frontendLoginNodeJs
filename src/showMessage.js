import swal from "sweetalert2";

const showMessage = (status, message) => {
  swal.fire({
    icon: status ? "success" : "error",
    text: message,
    timer: 2000,
  });
};

export default showMessage;
