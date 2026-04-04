
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
const loginForm = document.getElementById('login-form');
const voltarButtons = document.querySelectorAll('.btn-action');
const profileLinks = document.querySelectorAll('.profile > a');

const showLogin = () => {
    loginPage.classList.remove('hidden');
    mainPage.style.display = 'none';
    contentPage.classList.add('hidden');
};

const showProfiles = () => {
    loginPage.classList.add('hidden');
    mainPage.style.display = 'flex';
    contentPage.classList.add('hidden');
};

const showContent = () => {
    loginPage.classList.add('hidden');
    mainPage.style.display = 'none';
    contentPage.classList.remove('hidden');
};

// Evento de login
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    showProfiles();
});

// Eventos de clique nos perfis
profileLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        showContent();
    });
});

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