// Base de dados de jogos
const gamesData = [
    { id: 1, name: "Mega Moolah", category: "Slot", img: "https://picsum.photos/id/104/400/300", jackpot: "Progressivo" },
    { id: 2, name: "Starburst", category: "Slot", img: "https://picsum.photos/id/155/400/300", jackpot: "Clássico" },
    { id: 3, name: "Book of Dead", category: "Slot", img: "https://picsum.photos/id/169/400/300", jackpot: "Alta volatilidade" },
    { id: 4, name: "Blackjack VIP", category: "Mesa", img: "https://picsum.photos/id/20/400/300", jackpot: "Mesa ao vivo" },
    { id: 5, name: "Roleta Evolution", category: "Live", img: "https://picsum.photos/id/22/400/300", jackpot: "Roleta" },
    { id: 6, name: "Dragon's Luck", category: "Slot", img: "https://picsum.photos/id/29/400/300", jackpot: "Megaways" },
    { id: 7, name: "Poker Texas", category: "Poker", img: "https://picsum.photos/id/77/400/300", jackpot: "Multiplayer" },
    { id: 8, name: "Gonzo's Quest", category: "Slot", img: "https://picsum.photos/id/96/400/300", jackpot: "Aventura" },
];

const newReleases = [
    { id: 9, name: "Space Wars", category: "Slot", img: "https://picsum.photos/id/119/400/300", jackpot: "Novo" },
    { id: 10, name: "Mega Roulette", category: "Live", img: "https://picsum.photos/id/124/400/300", jackpot: "Ao vivo" },
    { id: 11, name: "Buffalo Blitz", category: "Slot", img: "https://picsum.photos/id/127/400/300", jackpot: "Megaways" },
    { id: 12, name: "Cash Inferno", category: "Slot", img: "https://picsum.photos/id/13/400/300", jackpot: "Fogo" },
];

// Função para criar card do jogo
function createGameCard(game) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'game-card';
    cardDiv.setAttribute('data-id', game.id);
    
    cardDiv.innerHTML = `
        <img src="${game.img}" alt="${game.name}" loading="lazy" onerror="this.src='https://picsum.photos/id/1/400/300'">
        <div class="game-info">
            <div class="game-title">${game.name}</div>
            <div class="game-category">
                <i class="fas fa-tag"></i>
                <span>${game.category}</span>
                ${game.jackpot ? `<span>• ${game.jackpot}</span>` : ''}
            </div>
        </div>
        <div class="play-btn">JOGAR AGORA</div>
    `;
    
    cardDiv.addEventListener('click', () => {
        showToast(`🎮 Iniciando ${game.name}...`);
    });
    
    return cardDiv;
}

// Função para renderizar todos os jogos
function renderGames() {
    const grid = document.getElementById('gamesGrid');
    if (grid) {
        grid.innerHTML = '';
        gamesData.forEach(game => {
            grid.appendChild(createGameCard(game));
        });
    }
    
    const newGrid = document.getElementById('newGamesGrid');
    if (newGrid) {
        newGrid.innerHTML = '';
        newReleases.forEach(game => {
            newGrid.appendChild(createGameCard(game));
        });
    }
}

// Função para mostrar toast
function showToast(message, duration = 2000) {
    const toast = document.getElementById('toastMsg');
    if (!toast) return;
    
    toast.textContent = message;
    toast.style.opacity = '1';
    
    setTimeout(() => {
        toast.style.opacity = '0';
    }, duration);
}

// Bottom navigation active state
function initBottomNav() {
    const bottomItems = document.querySelectorAll('.bottom-item');
    bottomItems.forEach(item => {
        item.addEventListener('click', function() {
            bottomItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            const tab = this.getAttribute('data-tab');
            let message = '';
            switch(tab) {
                case 'home': message = '🏠 Página inicial'; break;
                case 'slots': message = '🎰 Slots carregando...'; break;
                case 'live': message = '🎲 Cassino ao vivo'; break;
                case 'profile': message = '👤 Faça login para acessar seu perfil'; break;
                default: message = '📱 Navegando...';
            }
            showToast(message);
        });
    });
}

// Event listeners para botões de autenticação
function initAuthButtons() {
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const bonusBtn = document.getElementById('bonusBtn');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', () => showToast('🔐 Área de login em breve'));
    }
    
    if (signupBtn) {
        signupBtn.addEventListener('click', () => showToast('📝 Cadastro disponível em breve'));
    }
    
    if (bonusBtn) {
        bonusBtn.addEventListener('click', () => showToast('🎁 Bônus resgatado! Verifique seu e-mail.'));
    }
}

// Sidebar items (desktop)
function initSidebar() {
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            const icons = ['home', 'dice-d6', 'crown', 'user', 'gift'];
            showToast(`📱 ${icons[index]} - Em desenvolvimento`);
        });
    });
}

// Search functionality
function initSearch() {
    const searchInput = document.querySelector('.search-bar-mobile input');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const searchTerm = e.target.value.trim();
                if (searchTerm) {
                    showToast(`🔍 Buscando por: "${searchTerm}"`);
                }
            }
        });
    }
}

// View all buttons
function initViewAll() {
    const viewAllBtns = document.querySelectorAll('.view-all');
    viewAllBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            showToast('📱 Em breve: Todos os jogos');
        });
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    renderGames();
    initBottomNav();
    initAuthButtons();
    initSidebar();
    initSearch();
    initViewAll();
});
