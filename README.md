# Projeto de Finanças Pessoais

Basicamente, este é um site simples que ajuda a controlar as finanças pessoais. Você pode criar uma conta, registrar o dinheiro que entra e sai, e ver tudo listado.

## O que eu usei pra fazer?

*   **`HTML` e `CSS`:** Para montar a estrutura das páginas e deixar com uma aparência legal. O básico de qualquer site.
*   **`JavaScript` e `jQuery`:** Para fazer as coisas funcionarem na tela – validar o que você digita nos formulários, mostrar/esconder mensagens de erro, fazer os botões funcionarem e atualizar a lista de transações sem recarregar a página inteira. `jQuery` foi escolhido por ser mais simples para mexer nos elementos da página.
*   **`Firebase`:** Ele guarda as informações da sua conta (login e senha, de forma segura) e salva todas as suas transações financeiras online. Assim, você não perde seus dados e pode acessar de qualquer lugar.
    *   *Firebase Authentication:* Para contas de usuário.
    *   *Firebase Firestore:* Para guardar os dados das transações.

## O que dá pra fazer no site?

*   Criar uma conta nova ou entrar com seu email e senha.
*   Adicionar uma nova transação (se foi grana que entrou ou saiu, a data, o valor, etc.).
*   Ver a lista de todas as transações que você já cadastrou.
*   Clicar em uma transação para editar (se errou alguma coisa).
*   Apagar uma transação que não quer mais.
*   Se esquecer a senha, tem um botão pra pedir uma recuperação por email.

## Os Perrengues da Construção (Notas do Dev)

Foi uma tarefa dificil. Fazia muito tempo que eu não usava programação web, então foi meio que reaprender na marra. A parte de conectar com o `Firebase` deu dor de cabeça – nada funcionava direito no começo, tive que refazer a parte do banco de dados umas duas vezes até o login pegar no tranco.

Minha ideia inicial era fazer o backend do site com `Node.js`, mas eu me bati muito com erros e decidi mudar a rota. Acabei usando o `Firebase` para fazer tudo (contas e dados) e o `jQuery` para deixar o site interativo. Foi a saída mais simples para conseguir entregar o projeto funcionando, mesmo que não tenha sido exatamente como eu planejei no início.s
