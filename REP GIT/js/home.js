(function () {
    const listaEventos = document.getElementById("lista-eventos");
    const contadorEventos = document.getElementById("contador-eventos");
    const buscaEventos = document.getElementById("busca-eventos");
    const filtroItens = document.querySelectorAll(".filter-list .item");

    function criarCardEvento(evento) {
        const card = document.createElement("article");
        card.className = "card";

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

        const titulo = document.createElement("h3");
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
            ? evento.vagasRestantes + " vagas restantes"
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

        const link = document.createElement("a");
        link.className = "link";
        link.href = "evento.html?id=" + evento.id;
        link.textContent = "Ver detalhes";

        card.appendChild(header);
        card.appendChild(categoria);
        card.appendChild(titulo);
        card.appendChild(local);
        card.appendChild(information);
        card.appendChild(link);

        return card;
    }

    function renderizarSkeleton(quantidade) {
        listaEventos.innerHTML = "";
        for (let i = 0; i < quantidade; i++) {
            const skeleton = document.createElement("div");
            skeleton.className = "card skeleton";
            listaEventos.appendChild(skeleton);
        }
    }

    function renderizarLista(eventos) {
        listaEventos.innerHTML = "";

        if (eventos.length === 0) {
            const vazio = document.createElement("div");
            vazio.className = "empty-state";
            const mensagem = document.createElement("p");
            mensagem.textContent = "Nenhum evento encontrado.";
            vazio.appendChild(mensagem);
            listaEventos.appendChild(vazio);
            return;
        }

        eventos.forEach(function (evento) {
            listaEventos.appendChild(criarCardEvento(evento));
        });
    }

    function atualizarContador(quantidade) {
        contadorEventos.textContent = quantidade + (quantidade === 1 ? " evento encontrado" : " eventos encontrados");
    }

    function obterFiltrosAtuais() {
        const itemAtivo = document.querySelector(".filter-list .item.active");
        return {
            termo: buscaEventos.value,
            categoria: itemAtivo ? itemAtivo.dataset.categoria : "todos"
        };
    }

    function aplicarFiltros() {
        const eventos = EventosAPI.filtrarEventos(obterFiltrosAtuais());
        renderizarLista(eventos);
        atualizarContador(eventos.length);
    }

    function inicializar() {
        renderizarSkeleton(6);

        buscaEventos.addEventListener("input", aplicarFiltros);

        filtroItens.forEach(function (item) {
            item.addEventListener("click", function () {
                filtroItens.forEach(function (outro) {
                    outro.classList.remove("active");
                });
                item.classList.add("active");
                aplicarFiltros();
            });
        });

        setTimeout(aplicarFiltros, 300);
    }

    inicializar();
})();
