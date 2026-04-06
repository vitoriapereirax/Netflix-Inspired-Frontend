
// ===== Gerenciamento de Tema =====
const body = document.body;
const themeToggle = document.getElementById('theme-toggle');
const themeToggleContent = document.getElementById('theme-toggle-content');

const getPreferredTheme = () => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const applyTheme = theme => {
    const isLight = theme === 'light';
    body.classList.toggle('light-mode', isLight);
    
    if (themeToggle) {
        themeToggle.textContent = isLight ? '☀️' : '🌙';
        themeToggle.setAttribute('aria-label', isLight ? 'Ativar modo escuro' : 'Ativar modo claro');
    }
    
    if (themeToggleContent) {
        themeToggleContent.textContent = isLight ? '☀️' : '🌙';
        themeToggleContent.setAttribute('aria-label', isLight ? 'Ativar modo escuro' : 'Ativar modo claro');
    }
    
    localStorage.setItem('theme', theme);
};

applyTheme(getPreferredTheme());

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        applyTheme(body.classList.contains('light-mode') ? 'dark' : 'light');
    });
}

if (themeToggleContent) {
    themeToggleContent.addEventListener('click', () => {
        applyTheme(body.classList.contains('light-mode') ? 'dark' : 'light');
    });
}

// ===== Gerenciamento de Páginas =====
const loginPage = document.getElementById('login-page');
const mainPage = document.querySelector('main');
const contentPage = document.getElementById('content-page');
const signupPage = document.getElementById('signup-page');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const voltarButtons = document.querySelectorAll('.btn-action');
const profileLinks = document.querySelectorAll('.profile > a');
const addProfileLink = document.querySelector('.profile-add > a');

const showSignup = () => {
    loginPage.classList.add('hidden');
    mainPage.style.display = 'none';
    contentPage.classList.add('hidden');
    signupPage.classList.remove('hidden');
};

const showLogin = () => {
    loginPage.classList.remove('hidden');
    mainPage.style.display = 'none';
    contentPage.classList.add('hidden');
    signupPage.classList.add('hidden');
};

const showProfiles = () => {
    loginPage.classList.add('hidden');
    mainPage.style.display = 'flex';
    contentPage.classList.add('hidden');
    signupPage.classList.add('hidden');
};

const showContent = () => {
    loginPage.classList.add('hidden');
    mainPage.style.display = 'none';
    contentPage.classList.remove('hidden');
    signupPage.classList.add('hidden');
};

// Evento de login
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    showProfiles();
});

// Evento do botão Cadastrar-se na tela de login
const signupRedirectBtn = document.getElementById('signup-redirect');
if (signupRedirectBtn) {
    signupRedirectBtn.addEventListener('click', showSignup);
}

// Evento de cadastro
signupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // Aqui você pode adicionar validação adicional se necessário
    alert('Conta criada com sucesso!');
    showProfiles();
});

// Eventos de clique nos perfis
profileLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        showContent();
    });
});

// Evento de clique no perfil "Adicionar"
if (addProfileLink) {
    addProfileLink.addEventListener('click', (event) => {
        event.preventDefault();
        showSignup();
    });
}

// Botão voltar na página de cadastro
const backToProfilesBtn = document.getElementById('back-to-profiles');
if (backToProfilesBtn) {
    backToProfilesBtn.addEventListener('click', showProfiles);
}

// Botões "Voltar"
voltarButtons.forEach(btn => {
    btn.addEventListener('click', showLogin);
});

// ===== Gerenciamento de Abas de Conteúdo =====
const navTabs = document.querySelectorAll('.nav-tab');
const contentSections = document.querySelectorAll('.content-section');

navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove classe active de todas as abas
        navTabs.forEach(t => t.classList.remove('active'));
        // Remove classe active de todas as seções
        contentSections.forEach(section => section.classList.remove('active'));
        
        // Adiciona classe active à aba clicada
        tab.classList.add('active');
        
        // Adiciona classe active à seção correspondente
        const category = tab.getAttribute('data-category');
        const targetSection = document.getElementById(category);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    });
});

// ===== Menu de Perfil =====
const profileMenu = document.getElementById('profile-menu');
const profileDropdown = document.getElementById('profile-dropdown');
const logoutBtn = document.getElementById('logout-btn');
const backProfilesBtn = document.getElementById('back-profiles-btn');

if (profileMenu) {
    profileMenu.addEventListener('click', () => {
        profileDropdown.classList.toggle('hidden');
    });
}

// Fechar menu ao clicar fora
document.addEventListener('click', (event) => {
    if (profileDropdown && !profileDropdown.classList.contains('hidden')) {
        if (!event.target.closest('.profile-menu') && !event.target.closest('.profile-dropdown')) {
            profileDropdown.classList.add('hidden');
        }
    }
});

// Logout
if (logoutBtn) {
    logoutBtn.addEventListener('click', showLogin);
}

// Voltar para perfis
if (backProfilesBtn) {
    backProfilesBtn.addEventListener('click', () => {
        profileDropdown.classList.add('hidden');
        showProfiles();
    });
}     