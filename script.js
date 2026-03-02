// Sistema de Login e Cadastro via LocalStorage
const SiteDB = {
    registrar: function(nome, email, senha) {
        const dados = { nome, email, senha, saldo: 0.00 };
        localStorage.setItem(email, JSON.stringify(dados));
        localStorage.setItem('sessaoAtiva', email);
        return true;
    },
    
    getSessao: function() {
        const email = localStorage.getItem('sessaoAtiva');
        return email ? JSON.parse(localStorage.getItem(email)) : null;
    }
};

// Atualizar interface se logado
function atualizarUI() {
    const user = SiteDB.getSessao();
    if(user) {
        document.getElementById('user-area').innerHTML = `
            <div style="display:flex; align-items:center; gap:20px;">
                <div style="text-align:right">
                    <p style="color:var(--primary); font-weight:800; font-size:18px;">R$ ${user.saldo.toFixed(2)}</p>
                    <p style="font-size:10px; color:var(--text-muted)">SALDO DISPONÍVEL</p>
                </div>
                <button class="btn-signup" onclick="window.location.href='deposito.html'">DEPÓSITO</button>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', atualizarUI);
