(() => {
  const $ = (s, p = document) => p.querySelector(s);
  const $$ = (s, p = document) => [...p.querySelectorAll(s)];

  const STORAGE_KEYS = {
    globalTheme: 'netflixpro_theme',
    globalProfile: 'netflixpro_profile',
    profilesData: 'netflixpro_profiles_data'
  };

  const CONTENT = [
    {
      id: 'stranger-things',
      title: 'Stranger Things',
      meta: '4 temporadas • 16 • Ficção científica, Suspense',
      description: 'Quando um garoto desaparece, uma pequena cidade descobre segredos sombrios, experimentos secretos e uma garota com poderes extraordinários.',
      image: 'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg',
      tag: '9.0/10',
      trailerKey: 'b9EkMc79ZSU'
    },
    {
      id: 'dark',
      title: 'Dark',
      meta: '3 temporadas • 16 • Mistério, Drama',
      description: 'O desaparecimento de crianças expõe os segredos de quatro famílias e revela uma complexa conspiração envolvendo viagens no tempo.',
      image: 'https://image.tmdb.org/t/p/w500/5LoHuHWA4H8jElFlZDvsmU2n63b.jpg',
      tag: '8.7/10',
      trailerKey: 'rrwycJ08PSA'
    },
    {
      id: 'the-witcher',
      title: 'The Witcher',
      meta: '3 temporadas • 18 • Fantasia, Ação',
      description: 'Geralt de Rívia, um caçador de monstros solitário, tenta encontrar seu lugar em um mundo onde pessoas podem ser mais cruéis que criaturas.',
      image: 'https://image.tmdb.org/t/p/w500/cZ0d3rtvXPVvuiX22sP79K3Hmjz.jpg',
      tag: '8.2/10',
      trailerKey: 'ndl1W4ltcmg'
    },
    {
      id: 'la-casa-de-papel',
      title: 'La Casa de Papel',
      meta: '5 temporadas • 16 • Crime, Suspense',
      description: 'Um grupo de assaltantes liderado pelo Professor executa roubos ambiciosos enquanto tenta escapar da polícia e dos próprios conflitos.',
      image: 'https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg',
      tag: '8.3/10',
      trailerKey: '_InqQJRqGW4'
    },
    {
      id: 'breaking-bad',
      title: 'Breaking Bad',
      meta: '5 temporadas • 18 • Crime, Drama',
      description: 'Após ser diagnosticado com câncer, um professor de química decide produzir metanfetamina para garantir o futuro de sua família.',
      image: 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg',
      tag: '9.5/10',
      trailerKey: 'HhesaQXLuRY'
    },
    {
      id: 'peaky-blinders',
      title: 'Peaky Blinders',
      meta: '6 temporadas • 16 • Crime, Drama',
      description: 'Na Birmingham do pós-guerra, Tommy Shelby lidera uma gangue ambiciosa enquanto expande seu império criminoso.',
      image: 'https://image.tmdb.org/t/p/w500/vUUqzWa2LnHIVqkaKVlVGkVcZIW.jpg',
      tag: '8.8/10',
      trailerKey: 'oVzVdvGIC7U'
    },
    {
      id: 'vikings',
      title: 'Vikings',
      meta: '6 temporadas • 16 • Aventura, Drama',
      description: 'Ragnar Lothbrok desafia tradições e busca glória ao explorar terras desconhecidas e liderar expedições lendárias.',
      image: 'https://image.tmdb.org/t/p/w500/bQLrHIRNEkE3PdIWQrZHynQZazu.jpg',
      tag: '8.5/10',
      trailerKey: '9GgxinPwAGc'
    },
    {
      id: 'round-6',
      title: 'Round 6',
      meta: '2 temporadas • 16 • Suspense, Drama',
      description: 'Centenas de pessoas endividadas aceitam participar de jogos infantis mortais por uma fortuna capaz de mudar suas vidas.',
      image: 'https://image.tmdb.org/t/p/w500/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg',
      tag: '8.0/10',
      trailerKey: 'oqxAJKy0ii4'
    }
  ];

  const DEFAULT_PROFILE_STATE = {
    myList: [],
    favorites: [],
    recent: [],
    progress: {},
    theme: 'dark'
  };

  const globalState = {
    activeProfile: safeGet(STORAGE_KEYS.globalProfile) || null,
    theme: safeGet(STORAGE_KEYS.globalTheme) || 'dark',
    menuOpen: false,
    currentContent: null,
    data: safeJsonGet(STORAGE_KEYS.profilesData, {})
  };

  const els = {
    heroMedia: $('#heroMedia'),
    heroTitle: $('#heroTitle'),
    heroMeta: $('#heroMeta'),
    heroSynopsis: $('#heroSynopsis'),
    heroTrailer: $('#heroTrailer'),
    introScreen: $('#introScreen'),
    introLogoBtn: $('#introLogoBtn'),
    introAudio: $('#introAudio'),
    loadingScreen: $('#loadingScreen'),
    profileScreen: $('#profileScreen'),
    homeScreen: $('#homeScreen'),
    detailScreen: $('#detailScreen'),
    profiles: $$('.profile'),
    currentProfile: $('#currentProfile'),
    profileAvatar: $('#profileAvatar'),
    profileBtn: $('#profileBtn'),
    manageProfiles: $('#manageProfiles'),
    modal: $('#profileModal'),
    modalTitle: $('#modalTitle'),
    modalDescription: $('#modalDescription'),
    modalMeta: $('#modalMeta'),
    modalTrailer: $('#modalTrailer'),
    closeProfileModal: $('#closeProfileModal'),
    modalAddListBtn: $('#modalAddListBtn'),
    watchNowBtn: $('#watchNowBtn'),
    themeToggle: $('#themeToggle'),
    homeProfile: $('#homeProfile'),
    heroPlayBtn: $('#heroPlayBtn'),
    heroInfoBtn: $('#heroInfoBtn'),
    addToListBtn: $('#addToListBtn'),
    homeSearch: $('#homeSearch'),
    searchInput: $('#searchInput'),
    voiceSearch: $('#voiceSearch'),
    toastContainer: $('#toast-container'),
    mobileMenuBtn: $('#mobileMenuBtn'),
    topNav: $('#topNav'),
    rowTrending: $('#rowTrending'),
    rowContinue: $('#rowContinue'),
    rowRecent: $('#rowRecent'),
    rowRecommendations: $('#rowRecommendations'),
    rowMyList: $('#rowMyList'),
    backToHomeBtn: $('#backToHomeBtn'),
    detailImage: $('#detailImage'),
    detailTitle: $('#detailTitle'),
    detailMeta: $('#detailMeta'),
    detailDescription: $('#detailDescription'),
    detailTrailer: $('#detailTrailer'),
    detailWatchBtn: $('#detailWatchBtn'),
    detailListBtn: $('#detailListBtn'),
    favoritesBtn: $('#favoritesBtn'),
    favoritesCount: $('#favoritesCount'),
    listCount: $('#listCount'),
    topLogo: $('#topLogo')
  };

  function safeGet(key) {
    try { return localStorage.getItem(key); } catch { return null; }
  }

  function safeSet(key, value) {
    try { localStorage.setItem(key, value); } catch {}
  }

  function safeJsonGet(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  function profileKey(name) {
    return `profile:${name || 'convidado'}`;
  }

  function cloneDefaultState() {
    return {
      myList: [],
      favorites: [],
      recent: [],
      progress: {},
      theme: 'dark'
    };
  }

  function getProfileState(name) {
    const key = profileKey(name);
    if (!globalState.data[key]) globalState.data[key] = cloneDefaultState();
    return globalState.data[key];
  }

  function saveProfilesData() {
    safeSet(STORAGE_KEYS.profilesData, JSON.stringify(globalState.data));
  }

  function activeState() {
    return getProfileState(globalState.activeProfile);
  }

  function setTheme(theme) {
    const themes = ['dark', 'light', 'purple', 'pink', 'badge'];
    const safeTheme = themes.includes(theme) ? theme : 'dark';
    document.documentElement.setAttribute('data-theme', safeTheme);
    globalState.theme = safeTheme;
    safeSet(STORAGE_KEYS.globalTheme, safeTheme);

    if (els.themeToggle) {
      els.themeToggle.textContent = safeTheme === 'dark' ? '☀' : '🌙';
      els.themeToggle.setAttribute('aria-label', safeTheme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro');
    }
  }

  function buildYouTubeEmbed(key) {
    const params = new URLSearchParams({
      autoplay: '1',
      mute: '1',
      controls: '0',
      rel: '0',
      modestbranding: '1',
      playsinline: '1'
    });
    return `https://www.youtube.com/embed/${key}?${params.toString()}`;
  }

  function updateTrailer(iframe, key) {
    if (!iframe) return;
    iframe.src = key ? buildYouTubeEmbed(key) : '';
  }

  function applyHeroContent(content) {
    if (!content) return;
    if (els.heroTitle) els.heroTitle.textContent = content.title.toUpperCase();
    if (els.heroMeta) els.heroMeta.textContent = content.meta;
    if (els.heroSynopsis) els.heroSynopsis.textContent = content.description;
    if (els.heroMedia) els.heroMedia.style.backgroundImage = `url('${content.image}')`;
    updateTrailer(els.heroTrailer, content.trailerKey);
  }

  function showToast(icon, message, color = '#e50914') {
    if (!els.toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.borderLeft = `4px solid ${color}`;
    toast.innerHTML = `<div>${icon}</div><div>${message}</div>`;
    els.toastContainer.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 2200);
  }

  function activateScreen(screen) {
    [els.profileScreen, els.homeScreen].forEach(el => el?.classList.remove('active-screen'));
    screen?.classList.add('active-screen');
  }

  function updateCounters() {
    const st = activeState();
    if (els.listCount) els.listCount.textContent = st.myList.length;
    if (els.favoritesCount) els.favoritesCount.textContent = st.favorites.length;
  }

  function persistActiveState() {
    const key = profileKey(globalState.activeProfile || 'convidado');
    globalState.data[key] = activeState();
    saveProfilesData();
    updateCounters();
  }

  function isFavorite(title) {
    return activeState().favorites.some(item => item.title === title);
  }

  function inMyList(title) {
    return activeState().myList.some(item => item.title === title);
  }

  function getContentByTitle(title) {
    return CONTENT.find(item => item.title === title) || globalState.currentContent;
  }

  function toggleFavorite(content = globalState.currentContent) {
    if (!content) return;
    const st = activeState();
    const idx = st.favorites.findIndex(item => item.title === content.title);
    if (idx >= 0) {
      st.favorites.splice(idx, 1);
      showToast('♡', `${content.title} removido dos favoritos`);
    } else {
      st.favorites.push(content);
      showToast('♥', `${content.title} adicionado aos favoritos`);
    }
    persistActiveState();
    renderAllLists();
    refreshCurrentButtons();
  }

  function toggleMyList(content = globalState.currentContent) {
    if (!content) return;
    const st = activeState();
    const idx = st.myList.findIndex(item => item.title === content.title);
    if (idx >= 0) {
      st.myList.splice(idx, 1);
      showToast('−', `${content.title} removido da sua lista`);
    } else {
      st.myList.push(content);
      showToast('＋', `${content.title} adicionado à sua lista`);
    }
    persistActiveState();
    renderAllLists();
    refreshCurrentButtons();
  }

  function saveRecent(content) {
    if (!content) return;
    const st = activeState();
    st.recent = [content, ...st.recent.filter(item => item.title !== content.title)].slice(0, 10);
    persistActiveState();
  }

  function saveProgress(title, percent) {
    const st = activeState();
    st.progress[title] = percent;
    persistActiveState();
  }

  function simulateWatchProgress() {
    if (!globalState.currentContent) return;
    const st = activeState();
    const current = st.progress[globalState.currentContent.title] || 0;
    const next = Math.min(current + 15, 100);
    saveProgress(globalState.currentContent.title, next);
    saveRecent(globalState.currentContent);
    renderAllLists();
    showToast('▶', `${globalState.currentContent.title}: ${next}% assistido`);
  }

  function createCard(item, mode = '') {
    const card = document.createElement('div');
    card.className = 'movie-card reveal-card';
    card.style.backgroundImage = `url('${item.image}')`;
    card.dataset.title = item.title;
    card.dataset.tag = mode === 'recommendation' ? 'Recomendado' : mode === 'recent' ? 'Recente' : item.tag || '';

    if (isFavorite(item.title)) card.classList.add('is-favorite');

    const progress = activeState().progress[item.title];
    if (progress) {
      card.classList.add('progress');
      const bar = document.createElement('div');
      bar.className = 'progress-bar';
      bar.style.width = `${progress}%`;
      card.appendChild(bar);
    }

    card.addEventListener('click', () => {
      globalState.currentContent = item;
      applyHeroContent(item);
      openModal(item);
      saveRecent(item);
      refreshCurrentButtons();
    });

    return card;
  }

  function renderRow(container, items, mode = '') {
    if (!container) return;
    container.innerHTML = '';
    if (!items.length && container === els.rowMyList) {
      const empty = document.createElement('div');
      empty.className = 'movie-card empty-state';
      empty.dataset.empty = 'true';
      container.appendChild(empty);
      return;
    }
    items.forEach(item => container.appendChild(createCard(item, mode)));
  }

  function renderAllLists() {
    const st = activeState();
    updateCounters();

    renderRow(els.rowTrending, CONTENT, 'trending');

    const continueItems = st.recent.length ? [st.recent[0]] : [CONTENT[0]];
    renderRow(els.rowContinue, continueItems, 'continue');

    renderRow(els.rowRecent, st.recent.slice(0, 8), 'recent');

    const source = [...st.favorites, ...st.myList, ...st.recent];
    const unique = [];
    source.forEach(item => {
      if (!unique.some(u => u.title === item.title)) unique.push(item);
    });
    renderRow(els.rowRecommendations, (unique.length ? unique : CONTENT).slice(0, 8), 'recommendation');
    renderRow(els.rowMyList, st.myList, 'mylist');
  }

  function setCurrentContent(content) {
    if (!content) return;
    globalState.currentContent = content;
    applyHeroContent(content);

    if (els.detailTitle) els.detailTitle.textContent = content.title;
    if (els.detailMeta) els.detailMeta.textContent = content.meta;
    if (els.detailDescription) els.detailDescription.textContent = content.description;
    if (els.detailImage) {
      els.detailImage.src = content.image;
      els.detailImage.alt = content.title;
    }

    updateTrailer(els.detailTrailer, content.trailerKey);
    refreshCurrentButtons();
  }

  function refreshCurrentButtons() {
    const content = globalState.currentContent;
    if (!content) return;

    if (els.detailListBtn) {
      els.detailListBtn.textContent = inMyList(content.title) ? '✓ Na minha lista' : '＋ Minha lista';
    }
    if (els.addToListBtn) {
      els.addToListBtn.textContent = inMyList(content.title) ? '✓ Na minha lista' : '＋ Minha lista';
    }
    if (els.modalAddListBtn) {
      els.modalAddListBtn.textContent = inMyList(content.title) ? '✓ Na minha lista' : '＋ Minha lista';
    }
  }

  function openModal(content) {
    if (!els.modal || !content) return;
    els.modalTitle.textContent = content.title;
    els.modalDescription.textContent = content.description;
    els.modalMeta.textContent = content.meta;
    updateTrailer(els.modalTrailer, content.trailerKey);
    if (!els.modal.open) els.modal.showModal();
  }

  function closeModal() {
    if (!els.modal) return;
    updateTrailer(els.modalTrailer, '');
    els.modal.close();
  }

  function openDetail(content) {
    if (!content || !els.detailScreen) return;
    setCurrentContent(content);
    els.detailScreen.classList.add('active-detail');
    els.detailScreen.setAttribute('aria-hidden', 'false');
    saveRecent(content);
  }

  function closeDetail() {
    if (!els.detailScreen) return;
    els.detailScreen.classList.remove('active-detail');
    els.detailScreen.setAttribute('aria-hidden', 'true');
    updateTrailer(els.detailTrailer, '');
  }

  async function playIntroAudio() {
    const audio = els.introAudio;
    if (!audio) return true;
    try {
      audio.currentTime = 0;
      audio.volume = 0.85;
      await audio.play();
      return true;
    } catch {
      return false;
    }
  }

  function selectProfile(profile, notify = true) {
    const name = profile.dataset.profile || 'convidado';
    const label = name.charAt(0).toUpperCase() + name.slice(1);
    const img = $('img', profile);

    globalState.activeProfile = name;
    safeSet(STORAGE_KEYS.globalProfile, name);

    if (els.currentProfile) els.currentProfile.textContent = label;
    if (img && els.profileAvatar) els.profileAvatar.src = img.src;
    if (els.topLogo && img) {
      els.topLogo.innerHTML = `<img src="${img.src}" alt="${label}" style="width:40px;height:40px;border-radius:50%;object-fit:cover">`;
    }

    const st = activeState();
    setTheme(st.theme || globalState.theme);

    const heroPick = st.recent[0] || st.myList[0] || st.favorites[0] || CONTENT[Math.floor(Math.random() * CONTENT.length)];
    setCurrentContent(heroPick);
    renderAllLists();
    activateScreen(els.homeScreen);

    if (notify) showToast('🎬', `Bem-vindo, ${label}!`);
  }

  function setupProfiles() {
    els.profiles.forEach(profile => {
      profile.addEventListener('click', e => {
        e.preventDefault();
        selectProfile(profile, true);
      });
    });
  }

  function setupTheme() {
    els.themeToggle?.addEventListener('click', () => {
      const st = activeState();
      const themes = ['dark', 'light', 'purple', 'pink', 'badge'];
      const currentIndex = themes.indexOf(st.theme || globalState.theme);
      const nextTheme = themes[(currentIndex + 1) % themes.length];
      st.theme = nextTheme;
      persistActiveState();
      setTheme(nextTheme);
      showToast('🌓', `Tema ${nextTheme} ativado`);
    });
  }

  function setupModal() {
    els.manageProfiles?.addEventListener('click', () => {
      const temp = {
        title: 'Gerenciar Perfis',
        description: 'Cada perfil mantém sua lista, favoritos, progresso e tema separadamente para uma experiência personalizada.',
        meta: 'Perfis independentes',
        trailerKey: '',
        image: ''
      };
      globalState.currentContent = temp;
      openModal(temp);
    });

    els.heroInfoBtn?.addEventListener('click', () => {
      if (globalState.currentContent) openModal(globalState.currentContent);
    });

    els.closeProfileModal?.addEventListener('click', closeModal);
    els.modal?.addEventListener('click', e => {
      if (e.target === els.modal) closeModal();
    });

    els.modalAddListBtn?.addEventListener('click', () => {
      if (!globalState.currentContent || !globalState.currentContent.id) return;
      toggleMyList(globalState.currentContent);
    });

    els.watchNowBtn?.addEventListener('click', () => {
      if (!globalState.currentContent || !globalState.currentContent.id) return;
      closeModal();
      openDetail(globalState.currentContent);
      simulateWatchProgress();
    });
  }

  function setupSearch() {
    els.homeSearch?.addEventListener('input', e => {
      const term = e.target.value.toLowerCase().trim();
      $$('.movie-card').forEach(card => {
        if (card.dataset.empty === 'true') return;
        const title = (card.dataset.title || '').toLowerCase();
        card.style.display = title.includes(term) ? '' : 'none';
      });
    });

    els.searchInput?.addEventListener('input', e => {
      const term = e.target.value.toLowerCase().trim();
      els.profiles.forEach(profile => {
        const name = (profile.dataset.profile || '').toLowerCase();
        profile.style.display = name.includes(term) ? '' : 'block';
      });
    });
  }

  function setupVoice() {
    if (!els.voiceSearch) return;
    if (!('webkitSpeechRecognition' in window)) {
      els.voiceSearch.style.display = 'none';
      return;
    }

    els.voiceSearch.addEventListener('click', () => {
      const recognition = new webkitSpeechRecognition();
      recognition.lang = 'pt-BR';
      recognition.start();
      recognition.onresult = event => {
        const spoken = event.results[0][0].transcript;
        els.searchInput.value = spoken;
        els.searchInput.dispatchEvent(new Event('input'));
        showToast('🎤', `Buscando: ${spoken}`);
      };
      recognition.onerror = () => showToast('❌', 'Microfone não disponível');
    });
  }

  function openMenu() {
    globalState.menuOpen = true;
    els.topNav?.classList.add('open');
    els.mobileMenuBtn?.setAttribute('aria-expanded', 'true');
    if (els.mobileMenuBtn) els.mobileMenuBtn.textContent = '✕';
  }

  function closeMenu() {
    globalState.menuOpen = false;
    els.topNav?.classList.remove('open');
    els.mobileMenuBtn?.setAttribute('aria-expanded', 'false');
    if (els.mobileMenuBtn) els.mobileMenuBtn.textContent = '☰';
  }

  function setupMenu() {
    els.mobileMenuBtn?.addEventListener('click', () => {
      globalState.menuOpen ? closeMenu() : openMenu();
    });

    $$('.top-nav-link').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        $$('.top-nav-link').forEach(item => item.classList.remove('active'));
        link.classList.add('active');
        showToast('📺', `Seção: ${link.textContent.trim()}`);
        if (window.innerWidth <= 980) closeMenu();
      });
    });
  }

  function setupActions() {
    els.heroPlayBtn?.addEventListener('click', () => {
      if (!globalState.currentContent) return;
      openDetail(globalState.currentContent);
      simulateWatchProgress();
    });

    els.addToListBtn?.addEventListener('click', () => {
      if (!globalState.currentContent || !globalState.currentContent.id) return;
      toggleMyList(globalState.currentContent);
    });

    els.homeProfile?.addEventListener('click', () => {
      activateScreen(els.profileScreen);
      showToast('👥', 'Escolha outro perfil');
    });

    els.profileBtn?.addEventListener('click', () => {
      activateScreen(els.profileScreen);
      showToast('👤', 'Gerencie ou troque seu perfil');
    });

    els.backToHomeBtn?.addEventListener('click', closeDetail);
    els.detailWatchBtn?.addEventListener('click', simulateWatchProgress);
    els.detailListBtn?.addEventListener('click', () => {
      if (!globalState.currentContent || !globalState.currentContent.id) return;
      toggleMyList(globalState.currentContent);
    });

    els.favoritesBtn?.addEventListener('click', () => {
      const st = activeState();
      if (!st.favorites.length) {
        showToast('♡', 'Você ainda não favoritou nada');
        return;
      }
      openDetail(st.favorites[0]);
    });

    $$('.row-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = document.getElementById(btn.dataset.target);
        if (!target) return;
        const direction = btn.textContent.trim() === '‹' ? -1 : 1;
        target.scrollBy({ left: direction * 320, behavior: 'smooth' });
      });
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && els.modal?.open) closeModal();
      if (e.key === 'Escape' && els.detailScreen?.classList.contains('active-detail')) closeDetail();
      if (e.key === '/' && els.homeScreen?.classList.contains('active-screen')) {
        e.preventDefault();
        els.homeSearch?.focus();
      }
    });

    els.introLogoBtn?.addEventListener('click', async () => {
      await playIntroAudio();
      startIntro();
    });
  }

  function startIntro() {
    setTimeout(() => els.introScreen?.classList.add('is-hidden'), 1600);
    setTimeout(() => {
      els.loadingScreen?.classList.add('is-hidden');
      activateScreen(globalState.activeProfile ? els.homeScreen : els.profileScreen);
    }, 2100);
  }

  function bootSequence() {
    setTheme(globalState.theme);
    const first = CONTENT[Math.floor(Math.random() * CONTENT.length)];
    setCurrentContent(first);

    if (globalState.activeProfile) {
      const profile = els.profiles.find(p => p.dataset.profile === globalState.activeProfile);
      if (profile) {
        const st = getProfileState(globalState.activeProfile);
        setTheme(st.theme || globalState.theme);
        selectProfile(profile, false);
      }
    }

    renderAllLists();
  }

  function init() {
    bootSequence();
    setupProfiles();
    setupTheme();
    setupModal();
    setupSearch();
    setupVoice();
    setupMenu();
    setupActions();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();