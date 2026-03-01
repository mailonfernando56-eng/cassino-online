function abrirModal(id) { document.getElementById(id).style.display = 'flex'; }
function fecharModal(id) { document.getElementById(id).style.display = 'none'; }

// FUNÇÃO DE CADASTRO (Banco de Dados Local)
function registrarUsuario() {
    const user = {
        cpf: document.getElementById('regCpf').value,
        email: document.getElementById('regEmail').value,
        senha: document.getElementById('regSenha').value,
        saldo: 0
    };

    if(!user.email || !user.senha) return alert("Preencha tudo!");

    localStorage.setItem(user.email, JSON.stringify(user));
    alert("Cadastro realizado com sucesso!");
    fecharModal('modalCadastro');
}

// FUNÇÃO DE LOGIN
function fazerLogin() {
    const email = document.getElementById('logEmail').value;
    const senha = document.getElementById('logSenha').value;
    
    const usuarioSalvo = JSON.parse(localStorage.getItem(email));

    if(usuarioSalvo && usuarioSalvo.senha === senha) {
        document.getElementById('authSection').innerHTML = `<span>Olá, ${email} | Saldo: R$ 0,00</span>`;
        fecharModal('modalLogin');
    } else {
        alert("Usuário ou senha incorretos!");
    }
}
