$(document).ready(function() {
    initializeTransactionForm();
});

function initializeTransactionForm() {
    const uid = getValidTransactionUid(); 
    if (!isNewTransaction() && uid) {
        loadTransactionData(uid); // Carrega dados se for edição
    } else if (!isNewTransaction() && !uid) {
         redirectToHomeWithError("ID da transação inválido ou ausente.");
         return; 
    }
   
    setupEventListeners();
    
    toggleTransactionButton();
}

function getValidTransactionUid() {
    // Lógica de URL
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const uid = urlParams.get('uid');
        return (uid && typeof uid === 'string' && uid.length > 0) ? uid : null;
    } catch (error) {
        console.error("Erro ao processar URL:", error);
        return null;
    }
}

function isNewTransaction() {
    return !getValidTransactionUid();
}


function loadTransactionData(uid) {
    showLoading(); 
    transactionService.findByUid(uid)
        .then(transaction => {
            hideLoading(); 
            if (transaction) {
                populateFormFields(transaction); // Preenche o form 
            } else {
                redirectToHomeWithError("Transação não encontrada");
            }
        })
        .catch(error => {
            handleDataLoadError(error); 
        });
}

function populateFormFields(transaction) {
    
    $('#income').prop('checked', transaction.type === 'income');
    $('#expense').prop('checked', transaction.type === 'expense');

    $('#date').val(transaction.date || '');
    $('#value').val(transaction.money?.value || '');
    $('#currency').val(transaction.money?.currency || 'BRL');
    $('#transactionType').val(transaction.transactionType || '');
    $('#description').val(transaction.description || '');

    // Dispara manualmente os eventos change para revalidar o formulário
    $('#date').trigger('change');
    $('#value').trigger('change');
    $('#transactionType').trigger('change');

    
}


function handleDataLoadError(error) {
    hideLoading();
    console.error("Falha ao carregar transação:", error);
    redirectToHomeWithError("Erro ao carregar dados da transação");
}

function redirectToHomeWithError(message) {
    alert(message);
    window.location.href = 'home.html';
}

function setupEventListeners() {
    
    $('#date').on('change input', onChangeDate);
    $('#value').on('change input', onChangeValue);
    $('#transactionType').on('change input', onChangeTransactionType);

    // Evento de clique para os botões
    $('#transaction-button').on('click', handleTransaction);
    $('#cancel-button').on('click', cancel);

    
    $('input[name="type"]').on('change', function() {
       
       toggleTransactionButton(); // Revalida o botão 
    });
}


// Funções de validação e toggle 
function onChangeDate() {
    const date = $('#date').val();
    $('#date-required-erro').toggle(!date); // Mostra erro se data vazia
    toggleTransactionButton();
}

function onChangeValue() {
    const valueStr = $('#value').val();
    const value = parseFloat(valueStr);
    const hasValue = !isNaN(value) && valueStr !== ''; // Verifica se tem valor e não é NaN

    $('#value-required-erro').toggle(!hasValue); // Mostra se não tem valor válido
    $('#value-negative-erro').toggle(hasValue && value <= 0); // Mostra se tem valor e é <= 0
    toggleTransactionButton();
}

function onChangeTransactionType() {
    const transactionType = $('#transactionType').val();
    $('#transaction-type-required-erro').toggle(!transactionType); // Mostra se tipo vazio
    toggleTransactionButton();
}

function toggleTransactionButton() {
    
    $('#transaction-button').prop('disabled', !isFormValid());
}

function isFormValid() {
    const date = $('#date').val();
    const valueStr = $('#value').val();
    const value = parseFloat(valueStr);
    const transactionType = $('#transactionType').val();

    const isValueValid = !isNaN(value) && valueStr !== '' && value > 0;

    return !!date && isValueValid && !!transactionType;
}

// Lógica de salvar/atualizar 
function handleTransaction() {
    if (!isFormValid()) {
        showFormError("Preencha todos os campos obrigatórios corretamente.");
        return;
    }

    showLoading();
    const transactionData = prepareTransactionData(); 
    const uid = getValidTransactionUid();

    const actionPromise = isNewTransaction()
        ? transactionService.save(transactionData)
        : transactionService.update(uid, transactionData);

    actionPromise
        .then(() => {
            redirectToHomeAfterAction();
        })
        .catch(error => {
            const message = isNewTransaction() ? "Falha ao criar transação" : "Falha ao atualizar transação";
            handleTransactionError(message, error);
        });
}

function prepareTransactionData() {
    //jQuery .val() e .prop() para pegar os dados do formulário
    return {
        date: $('#date').val(),
        type: $('#expense').prop('checked') ? 'expense' : 'income',
        money: {
            currency: $('#currency').val(),
            value: parseFloat($('#value').val()),
        },
        transactionType: $('#transactionType').val(),
        description: $('#description').val(),
        user: {
            uid: firebase.auth().currentUser.uid,
        }
    };
}

function redirectToHomeAfterAction() {
    hideLoading();
    window.location.href = 'home.html';
}

function handleTransactionError(message, error = null) {
    hideLoading();
    console.error(message, error);
    alert(`${message}. Detalhes: ${error ? error.message : 'Erro desconhecido'}. Por favor, tente novamente.`);
}

function showFormError(message) {
    alert(message);
    const $firstError = $('.erro:visible').first(); // Seleciona o primeiro elemento com classe 'erro' que está visível
    if ($firstError.length) {
        // Rola a janela para que o erro fique visível 
         $('html, body').animate({
             scrollTop: $firstError.offset().top - 100 // Rola para 100px acima do erro
         }, 500); 
    }
}

// Função de cancelar 
function cancel() {
    window.location.href = 'home.html';
}

