const API_URL = 'http://localhost:3000/items';
let conceptsData = [];

// Inicialização
document.addEventListener('DOMContentLoaded', async () => {
  await fetchConcepts();
  navigate('home');
});

// Busca dados da API
async function fetchConcepts() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Falha ao buscar dados');
    conceptsData = await response.json();
  } catch (error) {
    console.error('Erro na API:', error);
    alert('Não foi possível conectar ao servidor. Verifique se o backend está rodando.');
  }
}

// Sistema de Navegação (SPA)
function navigate(viewId) {
  // Esconde todas as views
  document.querySelectorAll('.view').forEach(view => {
    view.classList.remove('active');
  });
  
  // Remove classe active dos botões
  document.querySelectorAll('nav button').forEach(btn => {
    btn.classList.remove('active');
  });

  // Mostra a view solicitada
  document.getElementById(viewId).classList.add('active');
  
  // Adiciona estado visual no botão correspondente (se existir)
  const navBtn = document.getElementById(`nav-${viewId}`);
  if (navBtn) navBtn.classList.add('active');

  // Lógicas específicas de cada página
  if (viewId === 'geral') renderGeral();
  if (viewId === 'random') renderRandom();
  if (viewId === 'pesquisa') {
    document.getElementById('search-input').focus();
    handleSearch(); // Renderiza tudo vazio ou lista completa inicialmente
  }
}

// Renderiza Página Geral
function renderGeral() {
  const container = document.getElementById('geral-container');
  container.innerHTML = conceptsData.map(item => createCardHTML(item)).join('');
}

// Renderiza Página de Pesquisa
function handleSearch() {
  const query = document.getElementById('search-input').value.toLowerCase();
  const container = document.getElementById('pesquisa-container');
  
  if (!query) {
    container.innerHTML = '<p style="color: var(--text-secondary)">Digite algo para começar a pesquisar...</p>';
    return;
  }

  const results = conceptsData.filter(item => {
    const searchString = `
      ${item.titulo} 
      ${item.descricao} 
      ${item.categoria} 
      ${item.palavrasChave ? item.palavrasChave.join(' ') : ''}
    `.toLowerCase();
    
    return searchString.includes(query);
  });

  if (results.length === 0) {
    container.innerHTML = '<p style="color: var(--text-secondary)">Nenhum conceito encontrado.</p>';
    return;
  }

  container.innerHTML = results.map(item => createCardHTML(item)).join('');
}

// Renderiza Conceito Aleatório
function renderRandom() {
  const container = document.getElementById('random-container');
  if (conceptsData.length === 0) return;
  
  const randomIndex = Math.floor(Math.random() * conceptsData.length);
  const randomItem = conceptsData[randomIndex];
  
  container.innerHTML = createCardHTML(randomItem);
}

// Redireciona para um conceito específico baseado no Código (Relacionados)
function showConceptByCode(codigo) {
  // O código recebido pode ser string, e no JSON pode ser número (ex: 2.1)
  const item = conceptsData.find(c => String(c.codigo) === String(codigo));
  
  if (item) {
    navigate('detalhe');
    const container = document.getElementById('detalhe-container');
    container.innerHTML = createCardHTML(item);
  } else {
    alert(`O conceito com código [${codigo}] ainda não foi documentado na base atual.`);
  }
}

// Gera o HTML do Card reutilizável
function createCardHTML(item) {
  const palavrasChave = item.palavrasChave 
    ? `<div class="card-section-title">Palavras-chave:</div>
       <ul class="card-list">${item.palavrasChave.map(p => `<li>${p}</li>`).join('')}</ul>` 
    : '';

  const exemplos = item.exemplos 
    ? `<div class="card-section-title">Exemplos:</div>
       <ul class="card-list">${item.exemplos.map(e => `<li>${e}</li>`).join('')}</ul>` 
    : '';

  const relacionados = item.relacionados && item.relacionados.length > 0
    ? `<div class="card-section-title">Relacionados:</div>
       <div class="tags">
         ${item.relacionados.map(rel => 
           `<span class="tag-link" onclick="showConceptByCode('${rel}')">${rel}</span>`
         ).join('')}
       </div>`
    : '';

  return `
    <div class="card">
      <div class="card-header">
        <div>
          <div class="card-category">${item.categoria} ${item.subCategoria ? `> ${item.subCategoria}` : ''}</div>
          <h3 class="card-title">${item.titulo}</h3>
        </div>
        <div class="card-code">#${item.codigo}</div>
      </div>
      <p class="card-desc-short">"${item.descricaoCurta}"</p>
      <p class="card-desc">${item.descricao}</p>
      ${palavrasChave}
      ${exemplos}
      ${relacionados}
    </div>
  `;
}