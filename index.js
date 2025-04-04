$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const emailParam = urlParams.get("email");
  if (emailParam) {
    $("#email").val(emailParam);
    onChangeEmail();
  }

  $("#senha").on("keypress", function (e) {
    if (e.key === "Enter" && !$("#login-button").prop("disabled")) {
      login();
    }
  });

  $("#email").on("input change", onChangeEmail);
  $("#senha").on("input change", onChangePassword);

  $("#login-button").on("click", login);
  $("#register-button").on("click", register);
  $("#recover-password-button").on("click", recoverPassword);

  toggleButtonsDisabled();
  toggleEmailErrors();
  togglePasswordErrors();
});

firebase.auth().onAuthStateChanged(function (user) {
  showLoading();
  if (user) {
    window.location.href = "home.html";
  } else {
    hideLoading();
  }
});

function onChangeEmail() {
  toggleButtonsDisabled();
  toggleEmailErrors();
}

function onChangePassword() {
  toggleButtonsDisabled();
  togglePasswordErrors();
}

function login() {
  showLoading();
  const email = $("#email").val();
  const password = $("#senha").val();

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      hideLoading();
      window.location.href = "home.html";
    })
    .catch((error) => {
      hideLoading();
      alert(getErrorMessage(error));
    });
}

function getErrorMessage(error) {
  switch (error.code) {
    case "auth/invalid-email":
    case "auth/invalid-credential":
      return "E-mail ou senha inválidos";

    case "auth/too-many-requests":
      return "Muitas tentativas. Bloqueado temporariamente. Tente mais tarde.";
    default:
      console.error("Login error:", error);
      return "Erro ao fazer login: " + error.message;
  }
}

function register() {
  window.location.href = "register.html";
}

function toggleButtonsDisabled() {
  const emailValid = isEmailValid();

  $("#recover-password-button").prop("disabled", !emailValid);

  const passwordValid = isPasswordValid();
  $("#login-button").prop("disabled", !emailValid || !passwordValid);
}

function toggleEmailErrors() {
  const email = $("#email").val();

  $("#email-required-erro").toggle(!email);

  $("#email-invalid-erro").toggle(!!email && !validateEmail(email));
}

function togglePasswordErrors() {
  const password = $("#senha").val();
  $("#password-required-erro").toggle(!password);
}

function recoverPassword() {
  showLoading();
  const email = $("#email").val();
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      hideLoading();
      alert("E-mail de recuperação enviado para: " + email);
    })
    .catch((error) => {
      hideLoading();
      alert(getErrorMessage(error));
    });
}

function isEmailValid() {
  const email = $("#email").val();

  return email && typeof validateEmail === "function" && validateEmail(email);
}

function isPasswordValid() {
  const password = $("#senha").val();
  return !!password;
}
