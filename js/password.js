const apiURL = 'http://localhost:8080/usuarios'

const formReport = document.getElementById('changePassword');

if (formReport) {
    formReport.addEventListener('submit', async function (e) {
        e.preventDefault();


        const usuarioLocalStorage = localStorage.getItem('usuario');
        let usuarioLogadoNome = null;
        let usuarioLogadoEmail = null;
        let usuarioLogadoSenha = null;
        let usuarioLogadoId = null;

        if (usuarioLocalStorage) {
            try {
                const usuarioObj = JSON.parse(usuarioLocalStorage);
                usuarioLogadoNome = usuarioObj.nome;
                usuarioLogadoEmail = usuarioObj.email;
                usuarioLogadoSenha = usuarioObj.senha;
                usuarioLogadoId = usuarioObj.id;
            } catch (e) {
                console.error("Erro ao converter o usuário do localStorage:", e);
            }
        }



        const senhaNova = document.getElementById('senhaNova').value;
        const senhaDenovo = document.getElementById('senhaDenovo').value;

        if (senhaNova !== senhaDenovo) {
            alert("As senhas devem ser iguais")
        } else {
            const numSenha = Array.from(senhaNova);
            const numSenha2 = Array.from(senhaDenovo);

            if (numSenha.length < 8 || numSenha2.length < 8) {
                alert("A senha deve ter no mínimo 8 caracteres")
            } else if (senhaNova == usuarioLogadoSenha) {
                alert("A senha não pode ser a mesma")
            } else {
                try {

                    const dadosUsuario = {
                        nome: usuarioLogadoNome,
                        email: usuarioLogadoEmail,
                        senha: senhaNova
                    };

                    await atualizarSenha(usuarioLogadoId, dadosUsuario);

                    localStorage.removeItem('usuario');

                    window.location.assign("../html/login.html")
                } catch (erro) {

                    console.error("Erro na operação:", erro);
                    alert("Ops! Ocorreu um erro ao salvar. Verifique o console do navegador (F12).");
                }
            }
        }

    })
}

//PUT livros
async function atualizarSenha(id, dadosUsuario) {
    await fetch(`${apiURL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosUsuario)
    });

}

function logout() {
    // --- LÓGICA DE LOGOUT ---
    const linkLogout = document.getElementById('logout');

    if (linkLogout) {
        linkLogout.addEventListener('click', (e) => {
            e.preventDefault();

            // Remove os dados da sessão do usuário
            localStorage.removeItem('usuario');

            // Redireciona para a página inicial/login se necessário
            window.location.assign("../html/mainPage.html")
        });
    }
}
