$(document).ready(function() {
   
    $('#name').on('input change', onChangeName); 
    $('#email').on('input change', onChangeEmail);
    $('#senha').on('input change', onChangePassword);
    $('#confirm-senha').on('input change', onChangeConfirmPassword);

    
    $('#register-button').on('click', register); // Botão de Cadastro
    $('button.solid').on('click', login);       // Botão de Login (usando classe 'solid')

    // Inicializa validações e estado do botão
    onChangeName(); 
    onChangeEmail();
    onChangePassword();
    onChangeConfirmPassword(); 
});

// Firebase Auth State Change Listener 
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        window.location.href = 'home.html';
    }
    
});

// Funções de validação e 

function onChangeName() { 
    const name = $('#name').val();
    $('#name-required-erro').toggle(!name); // Mostra erro se nome vazio
    toggleRegisterButtonDisabled();
}

function onChangeEmail() {
    const email = $('#email').val();
    $('#email-required-erro').toggle(!email);
   
    $('#email-invalid-erro').toggle(!!email && !validateEmail(email));
    toggleRegisterButtonDisabled();
}

function onChangePassword() {
    const password = $('#senha').val();
    $('#password-required-erro').toggle(!password);
    $('#password-min-erro').toggle(!!password && password.length < 6); // Mostra se tem senha E é menor que 6
    validatePasswordMatch(); // Verifica se as senhas batem
    toggleRegisterButtonDisabled();
}

function onChangeConfirmPassword() {
    validatePasswordMatch(); // Apenas verifica se as senhas batem
    toggleRegisterButtonDisabled();
}

function validatePasswordMatch() {
    const password = $('#senha').val();
    const confirmPassword = $('#confirm-senha').val();
    // Mostra erro se a confirmação não estiver vazia E for diferente da senha
    $('#confirm-password-does-not-match-erro').toggle(!!confirmPassword && password !== confirmPassword);
}

function toggleRegisterButtonDisabled() {
    // Habilita/desabilita o botão baseado na validade do formulário
    $('#register-button').prop('disabled', !isFormValid());
}

function isFormValid() {
    const name = $('#name').val();
    if (!name) return false; // Nome é obrigatório

    const email = $('#email').val();
    if (!email || !validateEmail(email)) {
        return false;
    }
    const password = $('#senha').val();
    if (!password || password.length < 6) {
        return false;
    }
    const confirmPassword = $('#confirm-senha').val();
    if (password !== confirmPassword) {
        return false;
    }
    return true; // Se passou por todas as verificações
}

function register() {
    if (!isFormValid()) return; // Segurança extra

    showLoading();
    const email = $('#email').val();
    const password = $('#senha').val();
    

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        
    })
    .then(() => {
        hideLoading();
        window.location.href = 'home.html';
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    });
}

function login() { 
    window.location.href = 'login2.html';
}


function getErrorMessage(error) {
    
    switch (error.code) {
        case 'auth/email-already-in-use':
            return 'Este e-mail já está cadastrado.';
        case 'auth/invalid-email':
            return 'O formato do e-mail é inválido.';
        case 'auth/weak-password':
            return 'A senha é muito fraca. Use pelo menos 6 caracteres.';
        default:
            console.error("Register error:", error);
            return 'Erro ao cadastrar: ' + error.message;
    }
}

