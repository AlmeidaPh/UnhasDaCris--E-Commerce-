const produtos = [
    {
        id: 0,
        nome: "Kit Alongamento de Unhas",
        preco: 89.90,
        categoria: "Kits",
        imagem: "imgs/produtos/KitAlongamentodeUnhas.png",
        descricao: "Kit completo para alongamento em gel"
    },
    {
        id: 1,
        nome: "Esmalte Semipermanente",
        preco: 24.90,
        categoria: "Esmaltes",
        imagem: "imgs/produtos/EsmalteSemipermanente.png",
        descricao: "Esmalte rosa bebê - duração 15 dias"
    },
    {
        id: 2,
        nome: "Top Coat Brilho Intenso",
        preco: 32.50,
        categoria: "Tratamentos",
        imagem: "imgs/produtos/TopCoatBrilhoIntenso.png",
        descricao: "Selador de alta durabilidade"
    },
    {
        id: 3,
        nome: "Lixas para Unhas (Conjunto 5 unidades)",
        preco: 15.90,
        categoria: "Acessórios",
        imagem: "imgs/produtos/LixasParaUnhas_Conjunto5.png",
        descricao: "Conjunto de lixas para preparação das unhas"
    },
    {
        id: 4,
        nome: "Pó para Unhas de Acrigel",
        preco: 45.00,
        categoria: "Materiais",
        imagem: "imgs/produtos/PoParaUnhasDeAcrigel.png",
        descricao: "Pó profissional para técnica de acrigel"
    },
    {
        id: 5,
        nome: "Palitos de Laranjeira (100 unidades)",
        preco: 12.50,
        categoria: "Acessórios",
        imagem: "imgs/produtos/PalitosdeLaranjeira_100Unidades.png",
        descricao: "Palitos para cutícula descartáveis"
    },
    {
        id: 6,
        nome: "Luz LED para Unhas",
        preco: 129.90,
        categoria: "Equipamentos",
        imagem: "imgs/produtos/LuzLEDparaUnhas.png",
        descricao: "Secador LED profissional para unhas em gel"
    },
    {
        id: 7,
        nome: "Base Coat Fortalecedora",
        preco: 28.75,
        categoria: "Tratamentos",
        imagem: "imgs/produtos/BaseCoatFortalecedora.png",
        descricao: "Base para unhas fracas e quebradiças"
    },
    {
        id: 8,
        nome: "Kit Decoracao de Unhas",
        preco: 65.00,
        categoria: "Kits",
        imagem: "imgs/produtos/KitDecoracaodeUnhas.png",
        descricao: "Kit com adesivos, strass e pincéis para decoração"
    },
    {
        id: 9,
        nome: "Esmalte Vermelho Premium",
        preco: 29.90,
        categoria: "Esmaltes",
        imagem: "imgs/produtos/EsmalteVermelho.png",
        descricao: "Vermelho clássico de alta pigmentação"
    },
    {
        id: 10,
        nome: "Óleo para Cutículas",
        preco: 22.40,
        categoria: "Tratamentos",
        imagem: "imgs/produtos/OleoparaCuticulas.png",
        descricao: "Hidratante profissional para cutículas"
    },
    {
        id: 11,
        nome: "Pincéis para Nail Art (Conjunto 6)",
        preco: 38.90,
        categoria: "Acessórios",
        imagem: "imgs/produtos/PinceisparaNailArt_Conjunto6.png",
        descricao: "Pincéis profissionais para designs criativos"
    },
    {
        id: 12,
        nome: "Gel UV Builder",
        preco: 52.00,
        categoria: "Materiais",
        imagem: "imgs/produtos/GelUVBuilder.png",
        descricao: "Gel modelador para alongamento"
    },
    {
        id: 13,
        nome: "Removedor de Esmalte Sem Acetona",
        preco: 18.50,
        categoria: "Tratamentos",
        imagem: "imgs/produtos/RemovedordeEsmalteSemAcetona.png",
        descricao: "Removedor suave que não resseca as unhas"
    },
    {
        id: 14,
        nome: "Moldes para Unhas Francesinha",
        preco: 24.90,
        categoria: "Acessórios",
        imagem: "imgs/produtos/MoldesparaUnhasFrancesinha.png",
        descricao: "Moldes descartáveis para french perfeito"
    }
];

const categorias = [...new Set(produtos.map(produto => produto.categoria))];