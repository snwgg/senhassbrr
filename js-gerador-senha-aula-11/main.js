const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVXYWZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvxywz';
const numeros = '0123456789';
const simbolos = '@!#$%&*()_-+=?';
const checkbox = document.querySelectorAll('.checkbox');
const gerarSenha = document.querySelector('#gerar-senha');
const campoSenha = document.querySelector('#campo-senha');
const copiarSenha = document.querySelector('#copiar-senha');
const campoNumeroCaracteres = document.querySelector('#numero-caracteres');
let tamanhoSenha = parseInt(campoNumeroCaracteres.value);

campoNumeroCaracteres.addEventListener('input', () => {
    tamanhoSenha = parseInt(campoNumeroCaracteres.value);
});

checkbox[0].addEventListener('click', () => {
    if (checkbox[0].checked) {
        for (let i = 1; i < checkbox.length; i++) {
            checkbox[i].checked = true;
        }
    } else {
        for (let i = 1; i < checkbox.length; i++) {
            checkbox[i].checked = false;
        }
    }
});

gerarSenha.addEventListener('click', () => {
    let senha = '';
    let caracteres = '';

    if (checkbox[1].checked) caracteres += letrasMaiusculas;
    if (checkbox[2].checked) caracteres += letrasMinusculas;
    if (checkbox[3].checked) caracteres += numeros;
    if (checkbox[4].checked) caracteres += simbolos;

    for (let i = 0; i < tamanhoSenha; i++) {
        senha += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }

    campoSenha.value = senha;
    atualizarForcaSenha(senha);
});

copiarSenha.addEventListener('click', () => {
    navigator.clipboard.writeText(campoSenha.value).then(() => {
        alert('Senha copiada para a área de transferência!');
        adicionarAoHistorico(campoSenha.value);
    });
});

function adicionarAoHistorico(senha) {
    const historicoSenhas = document.querySelector('#historico-senhas');
    const li = document.createElement('li');
    li.textContent = senha;
    historicoSenhas.appendChild(li);
}

function atualizarForcaSenha(senha) {
    const barraForca = document.querySelector('.forca');
    const entropiaTexto = document.querySelector('.entropia');
    const comprimento = senha.length;
    const tipos = [/[A-Z]/, /[a-z]/, /\d/, /[@!#$%&*()_\-+=?]/];
    let forca = comprimento > 7 ? 1 : 0;
    forca += tipos.reduce((acc, tipo) => acc + tipo.test(senha), 0);

    if (forca <= 2) {
        barraForca.className = 'forca fraca';
        entropiaTexto.textContent = 'Força da senha: Ruim';
    } else if (forca === 3) {
        barraForca.className = 'forca media';
        entropiaTexto.textContent = 'Força da senha: Bom';
    } else {
        barraForca.className = 'forca forte';
        entropiaTexto.textContent = 'Força da senha: Ótimo';
    }
}
