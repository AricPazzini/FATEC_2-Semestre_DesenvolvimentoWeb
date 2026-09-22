window.EventosAPI = (function () {
    const MESES = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

    const eventos = [
        {
            id: "workshop-1",
            categoria: "Workshop",
            titulo: "HTML do Zero ao Avançado",
            destaque: true,
            dataISO: "2026-09-12",
            horario: "19h às 22h",
            local: "Bloco C, sala 4",
            enderecoCompleto: "Campus Fatec São Paulo - Bloco C, sala 4",
            organizador: "Prof. Ana Ribeiro",
            vagasTotais: 40,
            vagasRestantes: 17,
            descricaoCompleta: "Um mergulho prático em HTML semântico, formulários e acessibilidade, saindo do zero até estruturas de página complexas."
        },
        {
            id: "workshop-2",
            categoria: "Workshop",
            titulo: "CSS Avançado na Prática",
            destaque: false,
            dataISO: "2026-09-20",
            horario: "14h às 17h",
            local: "Bloco C, sala 2",
            enderecoCompleto: "Campus Fatec São Paulo - Bloco C, sala 2",
            organizador: "Prof. Ana Ribeiro",
            vagasTotais: 30,
            vagasRestantes: 9,
            descricaoCompleta: "Layouts com Flexbox e Grid, CSS nesting nativo e variáveis, construindo componentes reais do zero."
        },
        {
            id: "palestra-1",
            categoria: "Palestra",
            titulo: "Carreira em Tecnologia: por onde começar",
            destaque: true,
            dataISO: "2026-09-15",
            horario: "19h às 21h",
            local: "Auditório principal",
            enderecoCompleto: "Campus Fatec São Paulo - Auditório principal",
            organizador: "Núcleo de Carreiras Fatec",
            vagasTotais: 120,
            vagasRestantes: 54,
            descricaoCompleta: "Profissionais da área contam como entraram no mercado e respondem perguntas sobre estágio, portfólio e entrevistas."
        },
        {
            id: "palestra-2",
            categoria: "Palestra",
            titulo: "Inteligência Artificial no dia a dia",
            destaque: false,
            dataISO: "2026-10-02",
            horario: "19h às 21h",
            local: "Auditório principal",
            enderecoCompleto: "Campus Fatec São Paulo - Auditório principal",
            organizador: "Núcleo de Carreiras Fatec",
            vagasTotais: 120,
            vagasRestantes: 12,
            descricaoCompleta: "Como ferramentas de IA já mudam o dia a dia de desenvolvedores, e o que vale a pena aprender agora."
        },
        {
            id: "hackathon-1",
            categoria: "Hackathon",
            titulo: "Hackathon Fatec 24h",
            destaque: true,
            dataISO: "2026-10-10",
            horario: "08h de sáb. às 08h de dom.",
            local: "Laboratório de Redes",
            enderecoCompleto: "Campus Fatec São Paulo - Laboratório de Redes",
            organizador: "Diretório Acadêmico",
            vagasTotais: 60,
            vagasRestantes: 6,
            descricaoCompleta: "24 horas em equipe pra tirar uma ideia do papel. Premiação pros três melhores projetos, comida e café inclusos."
        },
        {
            id: "hackathon-2",
            categoria: "Hackathon",
            titulo: "Hack for Good",
            destaque: false,
            dataISO: "2026-11-07",
            horario: "09h às 21h",
            local: "Laboratório de Redes",
            enderecoCompleto: "Campus Fatec São Paulo - Laboratório de Redes",
            organizador: "Diretório Acadêmico",
            vagasTotais: 50,
            vagasRestantes: 50,
            descricaoCompleta: "Um dia de hackathon voltado a projetos de impacto social, em parceria com ONGs da região."
        },
        {
            id: "meetup-1",
            categoria: "Meetup",
            titulo: "Meetup de Desenvolvedores Web",
            destaque: false,
            dataISO: "2026-09-25",
            horario: "19h às 21h",
            local: "Espaço Coworking",
            enderecoCompleto: "Rua das Palmeiras, 120 - Espaço Coworking",
            organizador: "Comunidade DevSP",
            vagasTotais: 50,
            vagasRestantes: 22,
            descricaoCompleta: "Bate-papo informal sobre front-end, back-end e carreira, com pizza e networking depois."
        },
        {
            id: "meetup-2",
            categoria: "Meetup",
            titulo: "Meetup UX & Produto",
            destaque: false,
            dataISO: "2026-10-16",
            horario: "19h às 21h",
            local: "Espaço Coworking",
            enderecoCompleto: "Rua das Palmeiras, 120 - Espaço Coworking",
            organizador: "Comunidade DevSP",
            vagasTotais: 40,
            vagasRestantes: 0,
            descricaoCompleta: "Discussões sobre pesquisa com usuários, prototipação e o dia a dia de quem trabalha com produto."
        },
        {
            id: "curso-1",
            categoria: "Curso",
            titulo: "Curso de JavaScript Moderno",
            destaque: true,
            dataISO: "2026-09-18",
            horario: "19h às 22h",
            local: "Bloco C, sala 4",
            enderecoCompleto: "Campus Fatec São Paulo - Bloco C, sala 4",
            organizador: "Prof. Rafael Nunes",
            vagasTotais: 35,
            vagasRestantes: 15,
            descricaoCompleta: "ES2022+, assincronismo, módulos e as bases pra trabalhar com qualquer framework depois."
        },
        {
            id: "curso-2",
            categoria: "Curso",
            titulo: "Curso de Banco de Dados",
            destaque: false,
            dataISO: "2026-10-05",
            horario: "19h às 22h",
            local: "Bloco C, sala 5",
            enderecoCompleto: "Campus Fatec São Paulo - Bloco C, sala 5",
            organizador: "Prof. Rafael Nunes",
            vagasTotais: 35,
            vagasRestantes: 3,
            descricaoCompleta: "Modelagem relacional, SQL na prática e uma introdução a bancos não relacionais."
        },
        {
            id: "show-1",
            categoria: "Show",
            titulo: "Show de Encerramento do Semestre",
            destaque: true,
            dataISO: "2026-12-05",
            horario: "20h",
            local: "Pátio Central",
            enderecoCompleto: "Campus Fatec São Paulo - Pátio Central",
            organizador: "Diretório Acadêmico",
            vagasTotais: 300,
            vagasRestantes: 180,
            descricaoCompleta: "Fechamento do semestre com bandas de alunos, food trucks e premiação dos projetos do ano."
        },
        {
            id: "show-2",
            categoria: "Show",
            titulo: "Noite Acústica Fatec",
            destaque: false,
            dataISO: "2026-11-21",
            horario: "19h",
            local: "Pátio Central",
            enderecoCompleto: "Campus Fatec São Paulo - Pátio Central",
            organizador: "Diretório Acadêmico",
            vagasTotais: 150,
            vagasRestantes: 40,
            descricaoCompleta: "Uma noite mais tranquila, com apresentações acústicas de bandas e solistas da comunidade Fatec."
        }
    ];

    function listarEventos() {
        return eventos.slice();
    }

    function buscarEventoPorId(id) {
        return eventos.find(function (evento) {
            return evento.id === id;
        });
    }

    function filtrarEventos(filtros) {
        const termo = (filtros && filtros.termo ? filtros.termo : "").trim().toLowerCase();
        const categoria = filtros && filtros.categoria ? filtros.categoria : "";

        return eventos.filter(function (evento) {
            const bateTermo = !termo || evento.titulo.toLowerCase().includes(termo);
            const bateCategoria = !categoria || categoria === "todos" || evento.categoria === categoria;
            return bateTermo && bateCategoria;
        });
    }

    function formatarData(dataISO) {
        const partes = dataISO.split("-");
        const ano = partes[0];
        const mes = MESES[Number(partes[1]) - 1];
        const dia = Number(partes[2]);
        return dia + " de " + mes + ". " + ano;
    }

    function calcularPercentualOcupacao(evento) {
        const ocupadas = evento.vagasTotais - evento.vagasRestantes;
        return Math.round((ocupadas / evento.vagasTotais) * 100);
    }

    function gerarCodigoConfirmacao() {
        return "INSC-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    }

    function inscreverEvento(eventoId, dados) {
        const evento = buscarEventoPorId(eventoId);
        if (!evento) {
            return { sucesso: false };
        }

        if (evento.vagasRestantes > 0) {
            evento.vagasRestantes -= 1;
        }

        return {
            sucesso: true,
            codigoConfirmacao: gerarCodigoConfirmacao(),
            evento: evento,
            nome: dados.nome,
            email: dados.email
        };
    }

    return {
        listarEventos: listarEventos,
        buscarEventoPorId: buscarEventoPorId,
        filtrarEventos: filtrarEventos,
        formatarData: formatarData,
        calcularPercentualOcupacao: calcularPercentualOcupacao,
        inscreverEvento: inscreverEvento
    };
})();
