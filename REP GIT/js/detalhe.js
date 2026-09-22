(function () {
    const skeleton = document.getElementById("detalhe-skeleton");
    const conteudo = document.getElementById("detalhe-conteudo");
    const naoEncontrado = document.getElementById("detalhe-nao-encontrado");
    const breadcrumbTitulo = document.getElementById("breadcrumb-titulo");

    function obterIdDaUrl() {
        return new URLSearchParams(window.location.search).get("id");
    }

    function criarLinhaInfo(rotulo, valor) {
        const linha = document.createElement("li");
        const forte = document.createElement("strong");
        forte.textContent = rotulo + ": ";
        linha.appendChild(forte);
        linha.appendChild(document.createTextNode(valor));
        return linha;
    }

    function renderizarDetalhe(evento) {
        const card = document.createElement("div");
        card.className = "detail-card";

        const header = document.createElement("div");
        header.className = "header";

        if (evento.destaque) {
            const destaque = document.createElement("span");
            destaque.className = "highlight";
            destaque.textContent = "Destaque";
            header.appendChild(destaque);
        }

        const data = document.createElement("time");
        data.className = "date";
        data.textContent = EventosAPI.formatarData(evento.dataISO);
        header.appendChild(data);

        const categoria = document.createElement("p");
        categoria.className = "category";
        categoria.textContent = evento.categoria;

        const titulo = document.createElement("h1");
        titulo.className = "title";
        titulo.textContent = evento.titulo;

        const local = document.createElement("p");
        local.className = "place";
        local.textContent = evento.local;

        const information = document.createElement("div");
        information.className = "information";

        const quantidade = document.createElement("span");
        quantidade.className = "quantity";
        quantidade.textContent = evento.vagasRestantes > 0
            ? evento.vagasRestantes + " de " + evento.vagasTotais + " vagas restantes"
            : "Esgotado";

        const percentual = EventosAPI.calcularPercentualOcupacao(evento);
        const percentagem = document.createElement("span");
        percentagem.className = "percentage";
        percentagem.textContent = percentual + "%";

        const progress = document.createElement("div");
        progress.className = "progress";
        const progressContent = document.createElement("div");
        progressContent.className = "progress-content";
        progressContent.style.width = percentual + "%";
        progress.appendChild(progressContent);

        information.appendChild(quantidade);
        information.appendChild(percentagem);
        information.appendChild(progress);

        const descricao = document.createElement("p");
        descricao.className = "description";
        descricao.textContent = evento.descricaoCompleta;

        const infoLista = document.createElement("ul");
        infoLista.className = "detail-info";
        infoLista.appendChild(criarLinhaInfo("Horário", evento.horario));
        infoLista.appendChild(criarLinhaInfo("Endereço", evento.enderecoCompleto));
        infoLista.appendChild(criarLinhaInfo("Organização", evento.organizador));

        const inscricao = document.createElement("a");
        inscricao.className = "btn-cta";
        inscricao.href = "inscricao.html?id=" + evento.id;
        inscricao.textContent = "Quero me inscrever";

        card.appendChild(header);
        card.appendChild(categoria);
        card.appendChild(titulo);
        card.appendChild(local);
        card.appendChild(information);
        card.appendChild(descricao);
        card.appendChild(infoLista);
        card.appendChild(inscricao);

        conteudo.innerHTML = "";
        conteudo.appendChild(card);

        breadcrumbTitulo.textContent = evento.titulo;
        document.title = evento.titulo + " | Página de Eventos";
    }

    function exibirNaoEncontrado() {
        skeleton.hidden = true;
        conteudo.hidden = true;
        naoEncontrado.hidden = false;
        breadcrumbTitulo.textContent = "Evento não encontrado";
    }

    function inicializar() {
        const id = obterIdDaUrl();

        setTimeout(function () {
            const evento = id ? EventosAPI.buscarEventoPorId(id) : undefined;

            skeleton.hidden = true;

            if (!evento) {
                exibirNaoEncontrado();
                return;
            }

            renderizarDetalhe(evento);
            conteudo.hidden = false;
        }, 300);
    }

    inicializar();
})();
