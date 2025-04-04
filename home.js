function newTransaction() {
  window.location.href = "transaction.html";
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    findTransactions(user);
  }
});

function findTransactions(user) {
  showLoading();
  transactionService
    .findByUser(user)
    .then((transactions) => {
      hideLoading();
      addTransactionsToScreen(transactions);
    })
    .catch((error) => {
      hideLoading();
      console.log(error);
      alert("Erro ao recuperar transações");
    });
}

function addTransactionsToScreen(transactions) {
  const $orderedList = $("#trans");

  $orderedList.empty();

  if (transactions.length === 0) {
    const emptyStateHtml = `
      <div class="empty-state">
        <i class="fas fa-wallet"></i>
        <h3>Nenhuma transação encontrada</h3>
        <p>Clique no botão + para adicionar uma nova transação</p>
      </div>
    `;

    $orderedList.html(emptyStateHtml);
    return;
  }

  transactions.forEach((transaction) => {
    const liHtml = `
      <li class="${transaction.type}" id="${
      transaction.uid
    }" style="display: none;">
          <div class="transaction-content">
              <p class="transaction-date">${formatDate(transaction.date)}</p>
              <p class="transaction-value">${formatMoney(transaction.money)}</p>
              <p class="transaction-type">${transaction.transactionType}</p>
              ${
                transaction.description
                  ? `<p class="transaction-description">${transaction.description}</p>`
                  : ""
              }
          </div>
          <button class="delete-btn" title="Excluir transação">
              <i class='fas fa-trash'></i>
          </button>
      </li>
    `;

    const $li = $(liHtml);

    $li.find(".delete-btn").on("click", function (event) {
      event.stopPropagation();
      askDeleteTransaction(transaction.uid, event);
    });

    $li.on("click", function () {
      window.location.href = `transaction.html?uid=${transaction.uid}`;
    });

    $orderedList.append($li);

    $li.fadeIn(300);
  });
}

function askDeleteTransaction(uid, event) {
  event.stopPropagation();
  const confirmDelete = confirm("Deseja realmente excluir esta transação?");
  if (confirmDelete) {
    deleteTransaction(uid);
  }
}

function deleteTransaction(uid) {
  showLoading();
  transactionService
    .remove(uid)
    .then(() => {
      hideLoading();
      S;
      $("#" + uid).fadeOut(300, function () {
        $(this).remove();
      });
    })
    .catch((error) => {
      hideLoading();
      console.error("Error deleting transaction:", error);
      alert("Erro ao excluir transação: " + error.message);
    });
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("pt-BR");
}

function formatMoney(money) {
  const value =
    typeof money.value === "string"
      ? parseFloat(money.value.replace(",", "."))
      : money.value;

  const currencySymbol = money.currency ? money.currency : "BRL";
  return `${currencySymbol} ${value.toFixed(2)}`;
}
