(function () {
  emailjs.init("YkHRVe-WXUksw3Q2d");
})();

function validate() {
  let name = document.querySelector(".username");
  let email = document.querySelector(".email");
  let msg = document.querySelector(".message");
  let btn = document.querySelector(".submit");

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (name.value == "" || email.value == "" || msg.value == "") {
      emptyerror();
    } else {
      if (
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value) &&
        name.value.match(/^[A-Za-z]+$/)
      ) {
        sendmail(name.value, email.value, msg.value);
        success();
        name.value = "";
        email.value = "";
        msg.value = "";
      } else {
        error();
      }
    }
  });
}
validate();

function sendmail(name, email, msg) {
  return emailjs.send("service_5a1ui0a", "template_hovqdin", {
    from_name: name,
    to_name: email,
    message: msg,
  });
}

function emptyerror() {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Fields cannot be empty!",
  });
}

function error() {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Something went wrong!",
  });
}

function success() {
  Swal.fire({
    icon: "success",
    title: "Success...",
    text: "Successfully sent message",
  });
}
