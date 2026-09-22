(function () {
    const inscricaoVazio = document.getElementById("inscricao-vazio");
    const inscricaoConteudo = document.getElementById("inscricao-conteudo");
    const inscricaoConfirmada = document.getElementById("inscricao-confirmada");
    const resumoEvento = document.getElementById("resumo-evento");
    const form = document.getElementById("form-inscricao");
    const campoNome = document.getElementById("campo-nome");
    const campoEmail = document.getElementById("campo-email");
    const codigoConfirmacao = document.getElementById("codigo-confirmacao");
    const linkVoltarEvento = document.getElementById("link-voltar-evento");

    const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let eventoAtual;

    function obterIdDaUrl() {
        return new URLSearchParams(window.location.search).get("id");
    }

    function renderizarResumo(evento) {
        resumoEvento.innerHTML = "";

        const intro = document.createElement("p");
        intro.className = "place";
        intro.textContent = "Você está se inscrevendo em:";

        const titulo = document.createElement("h1");
        titulo.className = "title";
        titulo.textContent = evento.titulo;

        const categoria = document.createElement("p");
        categoria.className = "category";
        categoria.textContent = evento.categoria;

        const data = document.createElement("time");
        data.className = "date";
        data.textContent = EventosAPI.formatarData(evento.dataISO);

        const local = document.createElement("p");
        local.className = "place";
        local.textContent = evento.local;

        resumoEvento.appendChild(intro);
        resumoEvento.appendChild(titulo);
        resumoEvento.appendChild(categoria);
        resumoEvento.appendChild(data);
        resumoEvento.appendChild(local);
    }

    function carregarEvento() {
        const id = obterIdDaUrl();
        eventoAtual = id ? EventosAPI.buscarEventoPorId(id) : undefined;

        if (!eventoAtual) {
            inscricaoVazio.hidden = false;
            return;
        }

        renderizarResumo(eventoAtual);
        inscricaoConteudo.hidden = false;
    }

    function exibirErro(campo, mensagemId, mensagem) {
        const erro = document.getElementById(mensagemId);
        erro.textContent = mensagem;
        erro.hidden = false;
        campo.classList.add("invalid");
    }

    function limparErro(campo, mensagemId) {
        const erro = document.getElementById(mensagemId);
        erro.hidden = true;
        campo.classList.remove("invalid");
    }

    function validarFormulario() {
        let valido = true;

        if (campoNome.value.trim().length < 3) {
            exibirErro(campoNome, "erro-nome", "Digite pelo menos 3 letras.");
            valido = false;
        } else {
            limparErro(campoNome, "erro-nome");
        }

        if (!REGEX_EMAIL.test(campoEmail.value.trim())) {
            exibirErro(campoEmail, "erro-email", "Digite um e-mail válido.");
            valido = false;
        } else {
            limparErro(campoEmail, "erro-email");
        }

        return valido;
    }

    function handleSubmit(evento) {
        evento.preventDefault();

        if (!validarFormulario()) {
            return;
        }

        const resultado = EventosAPI.inscreverEvento(eventoAtual.id, {
            nome: campoNome.value.trim(),
            email: campoEmail.value.trim()
        });

        codigoConfirmacao.textContent = resultado.codigoConfirmacao;
        linkVoltarEvento.href = "evento.html?id=" + eventoAtual.id;

        inscricaoConteudo.hidden = true;
        inscricaoConfirmada.hidden = false;
    }

    function inicializar() {
        carregarEvento();
        form.addEventListener("submit", handleSubmit);
        campoNome.addEventListener("input", function () {
            limparErro(campoNome, "erro-nome");
        });
        campoEmail.addEventListener("input", function () {
            limparErro(campoEmail, "erro-email");
        });
    }

    inicializar();
})();
