// Versão com mais feedback
if (typeof firebase !== 'undefined') {
    firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
            console.log('Usuário não autenticado, redirecionando...');
            window.location.href = 'login2.html';
        } else {
            console.log('Usuário autenticado:', user.email);
        }
    });
} else {
    alert('Erro: Firebase não carregado. Recarregue a página.');
}