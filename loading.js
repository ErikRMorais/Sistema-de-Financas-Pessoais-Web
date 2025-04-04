
// loading.js - Versão com jQuery

function showLoading() {
  // Usa jQuery para criar o elemento, começar escondido, adicionar ao body e fazer fade in
  $('<div class="loading centralizar"><label>Carregando...</label></div>')
    .hide()           // Começa escondido
    .appendTo('body') // Adiciona ao body
    .fadeIn(200);     // Efeito de fade in suave
}

function hideLoading() {
  // Usa jQuery para selecionar todos os elementos com a classe 'loading',
  // fazer fade out e depois removê-los do DOM
  $('.loading').fadeOut(200, function() {
    $(this).remove(); // Remove o elemento após o fade out completar
  });
}