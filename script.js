document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;

    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleContent = document.getElementById('theme-toggle-content');

    const video = document.getElementById('tudum-video');
    const container = document.getElementById('video-container');

    const loginPage = document.getElementById('login-page');
    const mainPage = document.querySelector('main');
    const contentPage = document.getElementById('content-page');
    const signupPage = document.getElementById('signup-page');

    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    const voltarButtons = document.querySelectorAll('.btn-action');
    const profileLinks = document.querySelectorAll('.profile > a');
    const addProfileLink = document.querySelector('.profile-add > a');
    const signupRedirectBtn = document.getElementById('signup-redirect');
    const backToProfilesBtn = document.getElementById('back-to-profiles');

    const navTabs = document.querySelectorAll('.nav-tab');
    const contentSections = document.querySelectorAll('.content-section');

    const profileMenu = document.getElementById('profile-menu');
    const profileDropdown = document.getElementById('profile-dropdown');
    const logoutBtn = document.getElementById('logout-btn');
    const backProfilesBtn = document.getElementById('back-profiles-btn');

    const getPreferredTheme = () => {
        const saved = localStorage.getItem('theme');
        if (saved) return saved;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    const applyTheme = (theme) => {
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

    const showLogin = () => {
        if (loginPage) loginPage.classList.remove('hidden');
        if (mainPage) mainPage.style.display = 'none';
        if (contentPage) contentPage.classList.add('hidden');
        if (signupPage) signupPage.classList.add('hidden');
    };

    const showProfiles = () => {
        if (loginPage) loginPage.classList.add('hidden');
        if (mainPage) mainPage.style.display = 'flex';
        if (contentPage) contentPage.classList.add('hidden');
        if (signupPage) signupPage.classList.add('hidden');
    };

    const showContent = () => {
        if (loginPage) loginPage.classList.add('hidden');
        if (mainPage) mainPage.style.display = 'none';
        if (contentPage) contentPage.classList.remove('hidden');
        if (signupPage) signupPage.classList.add('hidden');
    };

    const showSignup = () => {
        if (loginPage) loginPage.classList.add('hidden');
        if (mainPage) mainPage.style.display = 'none';
        if (contentPage) contentPage.classList.add('hidden');
        if (signupPage) signupPage.classList.remove('hidden');
    };

    const handleIntroEnd = () => {
        if (!container) return;

        container.classList.add('animate');

        setTimeout(() => {
            container.style.display = 'none';
            if (loginPage) {
                loginPage.classList.remove('hidden');
                loginPage.classList.add('show');
            }
        }, 1200);
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

    if (video) {
        document.addEventListener('click', () => {
            video.muted = false;
            video.currentTime = 0.05;
            video.play().catch(() => {});
        }, { once: true });

        video.addEventListener('ended', handleIntroEnd);
        setTimeout(handleIntroEnd, 6000);
    } else if (loginPage) {
        loginPage.classList.remove('hidden');
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            showProfiles();
        });
    }

    if (signupRedirectBtn) {
        signupRedirectBtn.addEventListener('click', showSignup);
    }

    if (signupForm) {
        signupForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const password = document.getElementById('signup-password');
            const confirmPassword = document.getElementById('confirm-password');

            if (password && confirmPassword && password.value !== confirmPassword.value) {
                alert('As senhas não coincidem.');
                return;
            }

            alert('Conta criada com sucesso!');
            showProfiles();
        });
    }

    profileLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            showContent();
        });
    });

    if (addProfileLink) {
        addProfileLink.addEventListener('click', (event) => {
            event.preventDefault();
            showSignup();
        });
    }

    if (backToProfilesBtn) {
        backToProfilesBtn.addEventListener('click', showProfiles);
    }

    voltarButtons.forEach(btn => {
        btn.addEventListener('click', showLogin);
    });

    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            navTabs.forEach(t => t.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));

            tab.classList.add('active');

            const category = tab.getAttribute('data-category');
            const targetSection = document.getElementById(category);
            if (targetSection) targetSection.classList.add('active');
        });
    });

    if (profileMenu && profileDropdown) {
        profileMenu.addEventListener('click', (event) => {
            event.stopPropagation();
            profileDropdown.classList.toggle('hidden');
        });
    }

    document.addEventListener('click', (event) => {
        if (profileDropdown && !profileDropdown.classList.contains('hidden')) {
            if (!event.target.closest('.profile-menu') && !event.target.closest('.profile-dropdown')) {
                profileDropdown.classList.add('hidden');
            }
        }
    });

    if (logoutBtn) {
        logoutBtn.addEventListener('click', showLogin);
    }

    if (backProfilesBtn) {
        backProfilesBtn.addEventListener('click', () => {
            if (profileDropdown) profileDropdown.classList.add('hidden');
            showProfiles();
        });
    }
});