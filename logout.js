function logout() {
    showLoading();
    firebase
      .auth()
      .signOut()
      .then(() => {
        hideLoading();
        window.location.href = "login2.html";
      })
      .catch((error) => {
        hideLoading();
        alert("Erro ao sair: " + error.message);
      });
  }
  