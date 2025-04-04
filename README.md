# Sistema Simples de Finanças Pessoais

Um site simples para ajudar a controlar as finanças pessoais. Permite criar uma conta, registrar entradas e saídas de dinheiro, e ver tudo listado.

## O que dá pra fazer:

*   Criar uma conta nova ou entrar com seu email e senha.
*   Adicionar novas transações (entrada/saída, data, valor, etc.).
*   Ver a lista de todas as suas transações.
*   Editar transações existentes.
*   Apagar transações.
*   Recuperar a senha por email, caso esqueça.

## Tecnologias Usadas:

*   **HTML/CSS:** Estrutura e aparência das páginas.
*   **JavaScript (com jQuery):** Para deixar o site interativo (validação de formulários, atualização dinâmica da lista, etc.). *jQuery foi usado pela simplicidade em manipular os elementos da página.*
*   **Firebase:** Como "backend" completo:
    *   **Authentication:** Cuida do login, cadastro e segurança das contas.
    *   **Firestore:** Guarda online os dados das transações financeiras.

## Desafios e Aprendizados:

O desenvolvimento teve seus desafios, principalmente por ser um retorno ao desenvolvimento web depois de um tempo. A integração com o Firebase deu trabalho no início (problemas de login/banco de dados que exigiram refazer algumas partes).

A ideia original era usar Node.js para o backend, mas acabei optando pela solução completa do Firebase e usando jQuery no frontend por ser uma abordagem mais direta e viável para entregar o projeto funcionando dentro do prazo e com as dificuldades encontradas. Apesar dos obstáculos, foi uma boa experiência para relembrar e aplicar conceitos.
