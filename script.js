
/* ============================================
   STREAMIX - NETFLIX CLONE
   JavaScript Principal - Lógica da Aplicação
   ============================================
*/

// ===== SEÇÃO 1: GERENCIAMENTO DE TEMA (CLARO/ESCURO) =====
// Esta seção gerencia a alternância entre modo claro e escuro

/* Referências aos elementos do DOM para controle de tema */
const body = document.body;                                      // Elemento <body>
const themeToggle = document.getElementById('theme-toggle');     // Botão na página de perfis
const themeToggleContent = document.getElementById('theme-toggle-content'); // Botão na página de conteúdo

/* Função que retorna o tema preferido
   1. Primeiro verifica se há tema salvo no localStorage
   2. Se não houver, detecta a preferência do sistema operacional
   Retorna: 'dark' ou 'light' */
const getPreferredTheme = () => {
    const saved = localStorage.getItem('theme'); // Tenta recuperar tema salvo no navegador
    if (saved) return saved;                     // Se existe, usa essa preferência
    
    // Se não houver preferência salva, detecta o tema do sistema operacional
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Função para aplicar o tema à página
const applyTheme = theme => {
    const isLight = theme === 'light'; // Verifica se o tema atual é claro
    body.classList.toggle('light-mode', isLight); // Adiciona ou remove a classe light-mode
    
    // Atualiza o ícone do botão de tema na página de perfis
    if (themeToggle) {
        themeToggle.textContent = isLight ? '☀️' : '🌙';
        themeToggle.setAttribute('aria-label', isLight ? 'Ativar modo escuro' : 'Ativar modo claro');
    }
    
    // Atualiza o ícone do botão de tema na página de conteúdo
    if (themeToggleContent) {
        themeToggleContent.textContent = isLight ? '☀️' : '🌙';
        themeToggleContent.setAttribute('aria-label', isLight ? 'Ativar modo escuro' : 'Ativar modo claro');
    }
    
    // Salva a preferência no localStorage
    localStorage.setItem('theme', theme);
};

// Aplica o tema ao carregar a página
applyTheme(getPreferredTheme());

// Event listener para o botão de tema na página de perfis
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        applyTheme(body.classList.contains('light-mode') ? 'dark' : 'light');
    });
}

// Event listener para o botão de tema na página de conteúdo
if (themeToggleContent) {
    themeToggleContent.addEventListener('click', () => {
        applyTheme(body.classList.contains('light-mode') ? 'dark' : 'light');
    });
}

// ===== SEÇÃO 2: REFERÊNCIAS DO DOM - PÁGINAS E FORMULÁRIOS =====
// Referências aos elementos principais da página para controle de navegação

/* Elementos de cada página da aplicação */
const loginPage = document.getElementById('login-page');        // Tela de login
const mainPage = document.querySelector('main');               // Tela de seleção de perfis
const contentPage = document.getElementById('content-page');    // Tela de conteúdo (filmes/séries)
const signupPage = document.getElementById('signup-page');      // Tela de cadastro

/* Referências aos formulários */
const loginForm = document.getElementById('login-form');        // Formulário de login
const signupForm = document.getElementById('signup-form');      // Formulário de cadastro

/* Elementos adicionais do DOM */
const voltarButtons = document.querySelectorAll('.btn-action');  // Todos botões "Voltar" e "Gerenciar"
const profileLinks = document.querySelectorAll('.profile > a');  // Links dos perfis existentes
const addProfileLink = document.querySelector('.profile-add > a'); // Link do perfil "Adicionar"
const signupRedirectBtn = document.getElementById('signup-redirect'); // Botão "Cadastrar-se" na tela de login
const backToProfilesBtn = document.getElementById('back-to-profiles'); // Botão de retorno da tela de cadastro

// ===== SEÇÃO 3: FUNÇÕES DE NAVEGAÇÃO =====
// Essas funções controlam qual página é mostrada/escondida

/* Mostra a página de cadastro
   Esconde: login, perfis e conteúdo
   Mostra: cadastro */
const showSignup = () => {
    loginPage.classList.add('hidden');
    mainPage.style.display = 'none';
    contentPage.classList.add('hidden');
    signupPage.classList.remove('hidden');
};

/* Mostra a página de login
   Esconde: perfis, conteúdo e cadastro
   Mostra: login */
const showLogin = () => {
    loginPage.classList.remove('hidden');
    mainPage.style.display = 'none';
    contentPage.classList.add('hidden');
    signupPage.classList.add('hidden');
};

/* Mostra a página de seleção de perfis
   Esconde: login, conteúdo e cadastro
   Mostra: perfis */
const showProfiles = () => {
    loginPage.classList.add('hidden');
    mainPage.style.display = 'flex';      // Usa flex display para layout dos perfis
    contentPage.classList.add('hidden');
    signupPage.classList.add('hidden');
};

/* Mostra a página de conteúdo (filmes e séries)
   Esconde: login, perfis e cadastro
   Mostra: conteúdo */
const showContent = () => {
    loginPage.classList.add('hidden');
    mainPage.style.display = 'none';
    contentPage.classList.remove('hidden');
    signupPage.classList.add('hidden');
};

// ===== SEÇÃO 4: EVENT LISTENERS PRINCIPAIS =====
// Detecta ações do usuário e executa as funções correspondentes

/* Listener do formulário de login (botão "Entrar")
   Quando o usuário submete o formulário:
   1. Previne comportamento padrão (recarregamento)
   2. Conduz para a página de perfis */
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    showProfiles();
});

/* Listener do botão "Cadastrar-se" na tela de login
   Ao clicar, vai direto para a página de cadastro */
if (signupRedirectBtn) {
    signupRedirectBtn.addEventListener('click', showSignup);
}

/* Listener do formulário de cadastro (botão "Cadastrar")
   Quando o usuário submete o formulário de cadastro:
   1. Previne comportamento padrão
   2. Mostra alerta de sucesso
   3. Retorna para a página de perfis */
signupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // Aqui você pode adicionar validação adicional se necessário
    alert('Conta criada com sucesso!');
    showProfiles();
});

/* Listeners para os perfis existentes
   Quando clica em qualquer perfil (Ahri, Dex, Lux, Thresh):
   1. Previne comportamento padrão
   2. Vai para a página de conteúdo (filmes/séries) */
profileLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        showContent();
    });
});

/* Listener para o perfil "Adicionar"
   Quando clica no perfil "Adicionar":
   1. Previne comportamento padrão
   2. Vai para a página de cadastro */
if (addProfileLink) {
    addProfileLink.addEventListener('click', (event) => {
        event.preventDefault();
        showSignup();
    });
}

/* Listener do botão "Voltar" na página de cadastro
   Retorna para a página de perfis sem completar o cadastro */
if (backToProfilesBtn) {
    backToProfilesBtn.addEventListener('click', () => {
        showProfiles(); // Exibe a lista de perfis
    });
}

/* Listeners para todos botões "Voltar" na página de perfis
   Retorna para a página de login */
voltarButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        showLogin(); // Exibe a tela de login principal
    });
});

// ===== SEÇÃO 5: GERENCIAMENTO DE ABAS DE CONTEÚDO =====
// Controla a alternância entre diferentes categorias de filmes/séries

/* Referências às abas (botões de navegação) e seções de conteúdo */
const navTabs = document.querySelectorAll('.nav-tab');              // Todos os botões (Início, Filmes, etc)
const contentSections = document.querySelectorAll('.content-section'); // Todas as seções de conteúdo

/* Event listeners para as abas de navegação
   Quando clica em uma aba (Início, Filmes, Séries, etc):
   1. Remove classe 'active' de todas as outras abas e seções
   2. Adiciona classe 'active' à aba clicada
   3. Mostra a seção correspondente */
navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove classe 'active' de todas as abas
        navTabs.forEach(t => t.classList.remove('active'));
        // Remove classe 'active' de todas as seções
        contentSections.forEach(section => section.classList.remove('active'));
        
        // Adiciona classe 'active' à aba clicada
        tab.classList.add('active');
        
        /* Procura pela seção correspondente e a ativa
           data-category contém o ID da seção (ex: "filmes", "series") */
        const category = tab.getAttribute('data-category');
        const targetSection = document.getElementById(category);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    });
});

// ===== SEÇÃO 6: MENU DE PERFIL (DROPDOWN) =====
// Gerencia a abertura/fechamento do menu de sair na navbar

/* Referências aos elementos do menu dropdown */
const profileMenu = document.getElementById('profile-menu');           // Botão 👤 na navbar
const profileDropdown = document.getElementById('profile-dropdown');   // Menu dropdown
const logoutBtn = document.getElementById('logout-btn');              // Botão "Sair"
const backProfilesBtn = document.getElementById('back-profiles-btn'); // Botão "Voltar para Perfis"

/* Event listener para abrir/fechar o menu dropdown
   Clica no ícone 👤 para alternar visibilidade do menu */
if (profileMenu) {
    profileMenu.addEventListener('click', () => {
        profileDropdown.classList.toggle('hidden'); // Alterna classe 'hidden'
    });
}

/* Event listener para fechar o menu ao clicar fora dele
   Detecta cliques em toda a página:
   - Se clicou fora do menu, fecha-o
   - Se clicou no menu ou botão, mantém aberto */
document.addEventListener('click', (event) => {
    if (profileDropdown && !profileDropdown.classList.contains('hidden')) {
        // Verifica se o clique foi fora do menu E fora do botão
        if (!event.target.closest('.profile-menu') && !event.target.closest('.profile-dropdown')) {
            profileDropdown.classList.add('hidden'); // Fecha o menu
        }
    }
});

/* Event listener para o botão "Sair"
   Volta para a página de login */
if (logoutBtn) {
    logoutBtn.addEventListener('click', showLogin);
}

/* Event listener para o botão "Voltar para Perfis"
   1. Fecha o menu dropdown
   2. Volta para a página de seleção de perfis */
if (backProfilesBtn) {
    backProfilesBtn.addEventListener('click', () => {
        profileDropdown.classList.add('hidden');  // Fecha o menu
        showProfiles();                            // Vai para perfis
    });
}     