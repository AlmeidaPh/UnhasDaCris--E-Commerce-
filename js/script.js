const DOM = {
  produtos: document.querySelector('.produtos'),
  categorias: document.querySelector('.categorias'),
  itensCarrinho: document.querySelector('.itensCarrinho'),
  total: document.querySelector('.total'),
  finalizarBtn: document.querySelector('.finalizarPedido'),
  seletorTema: document.getElementById('seletorTema')
};

let carrinho = [];

class utilitario {
  static formatarMoeda(valor) {
    return valor.toFixed(2).replace('.', ',');
  }

  static setCookie(nome, valor, dias = 7) {
    const data = new Date();
    data.setTime(data.getTime() + (dias * 24 * 60 * 60 * 1000));
    document.cookie = `${nome}=${valor};expires=${data.toUTCString()};path=/;SameSite=Lax`;
  }

  static getCookie(nome) {
    const nomeEQ = nome + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while(c.charAt(0) === ' ') c = c.substring(1);
      if(c.indexOf(nomeEQ) === 0) return c.substring(nomeEQ.length);
    }
    return null;
  }
}

class gerenciarTema {
  static async carregarTemas() {
    try {
      const response = await fetch('temas.json');
      this.temas = (await response.json()).temas;
      this.inicializarSeletor();
      this.aplicarTemaSalvo();
    } catch (error) {
      console.error('Erro ao carregar temas:', error);
      this.carregarTemaPadrao();
    }
  }

  static carregarTemaPadrao() {
    this.temas = [{
      nome: "Padrão",
      variaveis: {
        "--bege-rosado": "#D9C9BA",
        "--branco-rosado": "#F2E9E4",
        "--marrom-escuro": "#8C4D3F",
        "--marrom-claro": "#BF726B",
        "--rosa-poeira": "#D99B96",
        "--card-bg": "#FFFFFF",
        "--card-text": "#5A3E36"
      }
    }];
  }

  static inicializarSeletor() {
    DOM.seletorTema.innerHTML = this.temas.map((tema, index) => 
      `<option value="${index}">Tema ${tema.nome}</option>`
    ).join('');

    DOM.seletorTema.addEventListener('change', (e) => {
      this.mudarTema(e.target.value);
    });
  }

  static aplicarTemaSalvo() {
    const temaIndex = utilitario.getCookie('temaIndex') || 0;
    this.mudarTema(temaIndex);
  }

  static mudarTema(index) {
    const tema = this.temas[index];
    if (!tema) return;
    
    DOM.seletorTema.value = index;
    this.aplicarTema(tema.variaveis);
    utilitario.setCookie('temaIndex', index);
  }

  static aplicarTema(variaveis) {
    for (const [variavel, valor] of Object.entries(variaveis)) {
      document.documentElement.style.setProperty(variavel, valor);
    }
  }
}

class gerenciarProduto {
  static exibir(listaProdutos = produtos) {
    DOM.produtos.innerHTML = listaProdutos.map(produto => this.criarCardProduto(produto)).join('');
    this.adicionarEventosProdutos();
  }

  static criarCardProduto(produto) {
    return `
      <div class="produto" data-id="${produto.id}">
        <img src="${produto.imagem}" alt="${produto.nome}" loading="lazy">
        <h3>${produto.nome}</h3>
        <p class="descricao">${produto.descricao}</p>
        <p class="preco">R$ ${utilitario.formatarMoeda(produto.preco)}</p>
        <button class="adicionarCarrinho">Adicionar ao Carrinho</button>
      </div>
    `;
  }

  static adicionarEventosProdutos() {
    document.querySelectorAll('.adicionarCarrinho').forEach(btn => {
      btn.addEventListener('click', (e) => gerenciarCarrinho.adicionarItem(e));
    });
  }
}

class gerenciarCategoria {
  static exibir() {
    DOM.categorias.innerHTML = [
      '<li><button data-categoria="todos" class="active">Todos</button></li>',
      ...categorias.map(cat => `
        <li><button data-categoria="${cat}">${cat}</button></li>
      `)
    ].join('');

    this.adicionarEventosCategorias();
  }

  static adicionarEventosCategorias() {
    document.querySelectorAll('.categorias button').forEach(btn => {
      btn.addEventListener('click', (e) => this.filtrarProdutos(e));
    });
  }

  static filtrarProdutos(e) {
    const categoria = e.target.dataset.categoria;
    const produtosFiltrados = categoria === 'todos' 
      ? produtos 
      : produtos.filter(p => p.categoria === categoria);
    
    document.querySelectorAll('.categorias button').forEach(btn => {
      btn.classList.remove('active');
    });
    
    e.target.classList.add('active');
    gerenciarProduto.exibir(produtosFiltrados);
  }
}

class gerenciarCarrinho {
  static adicionarItem(e) {
    const id = Number(e.target.closest('.produto').dataset.id);
    const produto = produtos.find(p => p.id === id);
    
    const itemExistente = carrinho.find(item => item.id === id);
    if (itemExistente) {
      itemExistente.quantidade++;
    } else {
      carrinho.push({ ...produto, quantidade: 1 });
    }
    
    this.atualizar();
    this.salvarCarrinho();
  }

  static removerItem(e) {
    carrinho = carrinho.filter(item => item.id !== Number(e.target.dataset.id));
    this.atualizar();
    this.salvarCarrinho();
  }

  static atualizar() {
    carrinho = carrinho.filter(item => produtos.some(p => p.id === item.id));
    this.exibirItens();
    this.calcularTotal();
    this.adicionarEventosRemocao();
  }

  static exibirItens() {
    DOM.itensCarrinho.innerHTML = carrinho.map(item => `
      <div class="itemCarrinho">
        <img src="${item.imagem}" alt="${item.nome}" class="carrinho-imagem">
        <div class="carrinho-info">
          <span>${item.nome} (${item.quantidade}x)</span>
          <span>R$ ${utilitario.formatarMoeda(item.preco * item.quantidade)}</span>
        </div>
        <button data-id="${item.id}" class="removerItem">×</button>
      </div>
    `).join('');
  }

  static calcularTotal() {
    const total = carrinho.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
    DOM.total.textContent = `Total: R$ ${utilitario.formatarMoeda(total)}`;
  }

  static adicionarEventosRemocao() {
    document.querySelectorAll('.removerItem').forEach(btn => {
      btn.addEventListener('click', (e) => this.removerItem(e));
    });
  }

  static salvarCarrinho() {
    utilitario.setCookie('carrinho', JSON.stringify(carrinho));
  }

  static carregarCarrinho() {
    const carrinhoSalvo = utilitario.getCookie('carrinho');
    return carrinhoSalvo ? JSON.parse(carrinhoSalvo) : [];
  }

  static finalizarCompra() {
    if (carrinho.length === 0) {
      alert('Seu carrinho está vazio!');
      return;
    }
    
    alert(`Pedido finalizado! Total: R$ ${DOM.total.textContent.split('R$ ')[1]}`);
    carrinho = [];
    this.atualizar();
    this.salvarCarrinho();
  }
}

function inicializar() {
  carrinho = gerenciarCarrinho.carregarCarrinho();
  
  if (carrinho.length > 0) {
    gerenciarCarrinho.atualizar();
  }

  gerenciarProduto.exibir();
  gerenciarCategoria.exibir();
  gerenciarTema.carregarTemas();
  
  DOM.finalizarBtn.addEventListener('click', gerenciarCarrinho.finalizarCompra);
}

document.addEventListener('DOMContentLoaded', inicializar);