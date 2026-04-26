const perguntas = [
    { pergunta: "O que é um firewall?", respostas: ["Antivírus", "Sistema de segurança de rede", "Sistema operacional"], correta: 1 },
    { pergunta: "Qual a função principal?", respostas: ["Acelerar internet", "Bloquear acessos indevidos", "Criar sites"], correta: 1 },
    { pergunta: "Firewall pode ser:", respostas: ["Só software", "Só hardware", "Software e hardware"], correta: 2 },
    { pergunta: "Onde é usado?", respostas: ["Só no PC", "Só servidor", "Entre redes"], correta: 2 },
    { pergunta: "Firewall NÃO faz:", respostas: ["Filtrar tráfego", "Monitorar", "Remover vírus"], correta: 2 },
    { pergunta: "Firewall de pacotes faz:", respostas: ["Analisa dados", "Filtra pacotes", "Cria redes"], correta: 1 },
    { pergunta: "NAT significa:", respostas: ["Network Address Translation", "New Access Tool", "Net App Tech"], correta: 0 },
    { pergunta: "NGFW faz:", respostas: ["Só bloqueio", "Proteção avançada", "Só hardware"], correta: 1 },
    { pergunta: "DMZ é:", respostas: ["Rede interna", "Zona pública controlada", "HD externo"], correta: 1 },
    { pergunta: "Atualizar firewall serve para:", respostas: ["Melhorar segurança", "Deixar lento", "Mudar cor"], correta: 0 }
];

let indice = 0;
let pontos = 0;
let player;
let playerPronto = false;


const videos = {
    alto: "csQswuvRR2U",
    medio: "wJpCFIUG0sQ",
    baixo: "0m6cMGrHRz0"
};


function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0',
        width: '0',
        videoId: '',
        playerVars: {
            autoplay: 1,
            controls: 0
        },
        events: {
            'onReady': function () {
                playerPronto = true;
            }
        }
    });
}

function iniciarQuiz() {
    document.getElementById("intro").classList.add("hidden");
    document.getElementById("quiz").classList.remove("hidden");
    mostrarPergunta();
}

function mostrarPergunta() {
    let q = perguntas[indice];

    document.getElementById("contador").innerText =
        `Pergunta ${indice + 1} de ${perguntas.length}`;

    document.getElementById("pergunta").innerText = q.pergunta;

    let progresso = ((indice + 1) / perguntas.length) * 100;
    document.getElementById("progress-bar").style.width = progresso + "%";

    let respostasDiv = document.getElementById("respostas");
    respostasDiv.innerHTML = "";

    q.respostas.forEach((resposta, i) => {
        let btn = document.createElement("button");
        btn.innerText = resposta;
        btn.onclick = () => verificarResposta(i);
        respostasDiv.appendChild(btn);
    });
}

function verificarResposta(respostaEscolhida) {
    if (respostaEscolhida === perguntas[indice].correta) {
        pontos++;
    }

    indice++;

    if (indice < perguntas.length) {
        mostrarPergunta();
    } else {
        mostrarResultado();
    }
}

function tocarResultado() {
    if (!playerPronto) {
        setTimeout(tocarResultado, 500);
        return;
    }

    let videoID;

    if (pontos > 6) {
        videoID = videos.alto;
    } else if (pontos === 1) {
        videoID = videos.baixo;
    } else {
        videoID = videos.medio;
    }

    player.loadVideoById(videoID);
}

function mostrarResultado() {
    document.getElementById("quiz").classList.add("hidden");
    document.getElementById("resultado").classList.remove("hidden");

    document.getElementById("pontuacao").innerText =
        `Você acertou ${pontos} de ${perguntas.length}`;

    tocarResultado();
}

function reiniciar() {
    indice = 0;
    pontos = 0;

    document.getElementById("progress-bar").style.width = "0%";

    document.getElementById("resultado").classList.add("hidden");
    document.getElementById("intro").classList.remove("hidden");

    if (player && playerPronto) {
        player.stopVideo();
    }
}