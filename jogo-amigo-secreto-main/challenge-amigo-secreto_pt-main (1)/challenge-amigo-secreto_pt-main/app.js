//O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação. Aqui você deverá desenvolver a lógica para resolver o problema.
// Declaração do array que armazenará os nomes dos amigos
// Array que armazena os nomes dos amigos
let amigos = loadAmigosFromStorage();

// Função para carregar amigos do localStorage (caso o usuário recarregue a página)
function loadAmigosFromStorage() {
  const amigosStorage = localStorage.getItem('amigos');
  return amigosStorage ? JSON.parse(amigosStorage) : [];
}

// Função para salvar amigos no localStorage
function saveAmigosToStorage() {
  localStorage.setItem('amigos', JSON.stringify(amigos));
}

// Função para adicionar amigo
function adicionarAmigo() {
  const nomeInput = document.getElementById('amigo');
  const nome = nomeInput.value.trim(); // Remove espaços antes e depois

  // Verifica se o nome não está vazio e se já não foi adicionado
  if (nome === "") {
    alert("Por favor, insira um nome.");
    return;
  }
  if (amigos.includes(nome)) {
    alert("Este nome já foi adicionado.");
    return;
  }

  amigos.push(nome); // Adiciona o nome ao array
  saveAmigosToStorage(); // Salva no localStorage
  nomeInput.value = ''; // Limpa o campo de entrada
  mostrarAmigos(); // Atualiza a lista
}

// Função para mostrar a lista de amigos
function mostrarAmigos() {
  const listaAmigos = document.getElementById('listaAmigos');
  listaAmigos.innerHTML = ''; // Limpa a lista existente

  amigos.forEach((amigo, index) => {
    const li = document.createElement('li');
    li.textContent = amigo;
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remover';
    removeBtn.onclick = () => removerAmigo(index);
    li.appendChild(removeBtn);
    listaAmigos.appendChild(li);
  });
}

// Função para remover um amigo da lista
function removerAmigo(index) {
  amigos.splice(index, 1); // Remove o amigo pelo índice
  saveAmigosToStorage(); // Atualiza o armazenamento
  mostrarAmigos(); // Atualiza a lista na interface
}

// Função para sortear o amigo secreto
function sortearAmigo() {
  if (amigos.length === 0) {
    alert("A lista de amigos está vazia! Adicione alguns amigos primeiro.");
    return;
  }

  const indiceSorteado = Math.floor(Math.random() * amigos.length);
  const amigoSorteado = amigos[indiceSorteado];

  // Exibe o resultado do sorteio
  const resultado = document.getElementById('resultado');
  resultado.innerHTML = `O amigo secreto sorteado é: <strong>${amigoSorteado}</strong>`;
  // Exibe o nome sorteado com animação suave
  resultado.style.opacity = 0;
  setTimeout(() => {
    resultado.style.transition = "opacity 1s";
    resultado.style.opacity = 1;
  }, 100);
}

// Inicializa a interface carregando os amigos e mostrando o sorteio
document.addEventListener('DOMContentLoaded', () => {
  mostrarAmigos();
});
