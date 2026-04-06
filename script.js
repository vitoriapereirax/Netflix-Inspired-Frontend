
// ===== Gerenciamento de Tema =====
// Elementos do DOM relacionados ao tema
const body = document.body;
const themeToggle = document.getElementById('theme-toggle');
const themeToggleContent = document.getElementById('theme-toggle-content');

// Função para obter o tema preferido (salvo ou do sistema)
const getPreferredTheme = () => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Função para aplicar o tema à página
const applyTheme = theme => {
    const isLight = theme === 'light';
    body.classList.toggle('light-mode', isLight);
    
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

// ===== Gerenciamento de Páginas =====
// Elementos adicionais do DOM
const voltarButtons = document.querySelectorAll('.btn-action');
const profileLinks = document.querySelectorAll('.profile > a');
const addProfileLink = document.querySelector('.profile-add > a');

// ===== Funções de Navegação =====

// Função para mostrar a página de cadastro
const showSignup = () => {
    loginPage.classList.add('hidden');
    mainPage.style.display = 'none';
    contentPage.classList.add('hidden');
    signupPage.classList.remove('hidden');
};

// Função para mostrar a página de login
const showLogin = () => {
    loginPage.classList.remove('hidden');
    mainPage.style.display = 'none';
    contentPage.classList.add('hidden');
    signupPage.classList.add('hidden');
};

// Função para mostrar a página de seleção de perfis
const showProfiles = () => {
    loginPage.classList.add('hidden');
    mainPage.style.display = 'flex';
    contentPage.classList.add('hidden');
    signupPage.classList.add('hidden');
};

// Função para mostrar a página de conteúdo (filmes/séries)
const showContent = () => {
    loginPage.classList.add('hidden');
    mainPage.style.display = 'none';
    contentPage.classList.remove('hidden');
    signupPage.classList.add('hidden');
};

// ===== Event Listeners =====

// Evento de submissão do formulário de login
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    showProfiles();
});

// Event listener para o botão "Cadastrar-se" na tela de login
if (signupRedirectBtn) {
    signupRedirectBtn.addEventListener('click', showSignup);
}

// Evento de submissão do formulário de cadastro
signupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // Aqui você pode adicionar validação adicional se necessário
    alert('Conta criada com sucesso!');
    showProfiles();
});

// Event listeners para cliques nos perfis existentes
profileLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        showContent();
    });
});

// Event listener para o perfil "Adicionar"
if (addProfileLink) {
    addProfileLink.addEventListener('click', (event) => {
        event.preventDefault();
        showSignup();
    });
}

// Event listener para o botão "Voltar" na página de cadastro
const backToProfilesBtn = document.getElementById('back-to-profiles');
if (backToProfilesBtn) {
    backToProfilesBtn.addEventListener('click', showProfiles);
}

// Event listeners para botões "Voltar" (geralmente levam para login)
voltarButtons.forEach(btn => {
    btn.addEventListener('click', showLogin);
});

// ===== Gerenciamento de Abas de Conteúdo =====
// Elementos das abas de navegação e seções de conteúdo
const navTabs = document.querySelectorAll('.nav-tab');
const contentSections = document.querySelectorAll('.content-section');

// Event listeners para as abas de navegação
navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove classe 'active' de todas as abas
        navTabs.forEach(t => t.classList.remove('active'));
        // Remove classe 'active' de todas as seções
        contentSections.forEach(section => section.classList.remove('active'));
        
        // Adiciona classe 'active' à aba clicada
        tab.classList.add('active');
        
        // Adiciona classe 'active' à seção correspondente
        const category = tab.getAttribute('data-category');
        const targetSection = document.getElementById(category);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    });
});

// ===== Menu de Perfil =====
// Elementos do menu dropdown do perfil
const profileMenu = document.getElementById('profile-menu');
const profileDropdown = document.getElementById('profile-dropdown');
const logoutBtn = document.getElementById('logout-btn');
const backProfilesBtn = document.getElementById('back-profiles-btn');

// Event listener para abrir/fechar o menu de perfil
if (profileMenu) {
    profileMenu.addEventListener('click', () => {
        profileDropdown.classList.toggle('hidden');
    });
}

// Event listener para fechar o menu ao clicar fora
document.addEventListener('click', (event) => {
    if (profileDropdown && !profileDropdown.classList.contains('hidden')) {
        if (!event.target.closest('.profile-menu') && !event.target.closest('.profile-dropdown')) {
            profileDropdown.classList.add('hidden');
        }
    }
});

// Event listener para o botão "Sair"
if (logoutBtn) {
    logoutBtn.addEventListener('click', showLogin);
}

// Event listener para o botão "Voltar para Perfis"
if (backProfilesBtn) {
    backProfilesBtn.addEventListener('click', () => {
        profileDropdown.classList.add('hidden');
        showProfiles();
    });
}     