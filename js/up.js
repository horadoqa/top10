async function calcularMaiorCrescimento() {

    try {

        const response = await fetch("data/semanas.json");

        if (!response.ok) {
            throw new Error(
                `Erro ao carregar semanas.json: ${response.status}`
            );
        }

        const data = await response.json();

        const semanaAnterior = data.semanaAnterior.videos;
        const semanaAtual = data.semanaAtual.videos;


        const resultados = semanaAtual
            .map(videoAtual => {

                const videoAnterior = semanaAnterior.find(
                    video => video.url === videoAtual.url
                );

                if (!videoAnterior) {
                    return null;
                }

                const crescimento =
                    videoAtual.views - videoAnterior.views;

                const crescimentoPercentual =
                    videoAnterior.views > 0
                        ? (crescimento / videoAnterior.views) * 100
                        : 0;

                return {
                    title: videoAtual.title,
                    url: videoAtual.url,

                    viewsAnterior: videoAnterior.views,
                    viewsAtual: videoAtual.views,

                    crescimento: crescimento,

                    crescimentoPercentual:
                        crescimentoPercentual
                };

            })
            .filter(Boolean);


        // Encontra o maior crescimento
        const maiorCrescimento = resultados.reduce(
            (maior, video) => {

                return video.crescimento > maior.crescimento
                    ? video
                    : maior;

            }
        );


        let nomeVideo = maiorCrescimento.title;

        // Alternativa usando uma função chamada getVideoShortName em utils.js
        // const nomeVideo = getVideoShortName(video.title);

        if (
            maiorCrescimento.title
                .toLowerCase()
                .includes("playwright")
        ) {
            nomeVideo = "Playwright";

        } else if (
            maiorCrescimento.title
                .toLowerCase()
                .includes("cypress")
        ) {
            nomeVideo = "Cypress";

        } else if (
            maiorCrescimento.title
                .toLowerCase()
                .includes("postman")
        ) {
            nomeVideo = "Postman";

        } else if (
            maiorCrescimento.title
                .toLowerCase()
                .includes("grafana")
        ) {
            nomeVideo = "Grafana k6";

        } else if (
            maiorCrescimento.title
                .toLowerCase()
                .includes("jmeter")
        ) {
            nomeVideo = "JMeter";

        } else if (
            maiorCrescimento.title
                .toLowerCase()
                .includes("robot framework")
        ) {
            nomeVideo = "Robot Framework";
        }


        // Valor do crescimento
        const crescimentoElement =
            document.getElementById("maior-crescimento");

        if (crescimentoElement) {

            crescimentoElement.textContent =
                `+${maiorCrescimento.crescimento}`;
        }


        // Nome do vídeo
        const videoElement =
            document.getElementById(
                "maior-crescimento-video"
            );

        if (videoElement) {

            videoElement.textContent =
                nomeVideo;
        }


        // Retorna todos os dados caso sejam necessários
        return maiorCrescimento;


    } catch (error) {

        console.error(
            "Erro ao calcular maior crescimento:",
            error
        );
    }
}


calcularMaiorCrescimento();


async function carregarLiderRanking() {

    try {

        const response = await fetch("data/semanas.json");

        if (!response.ok) {
            throw new Error(
                `Erro ao carregar semanas.json: ${response.status}`
            );
        }

        const data = await response.json();

        const videos = data.semanaAtual.videos;


        // Encontra o vídeo que está em primeiro lugar
        const lider = videos.find(
            video => video.rank === 1
        );


        if (!lider) {
            console.warn(
                "Nenhum vídeo encontrado no primeiro lugar."
            );

            return;
        }


        /*
         * Define um nome curto para o vídeo
         */
        let nomeVideo = lider.title;

        if (
            lider.title
                .toLowerCase()
                .includes("playwright")
        ) {
            nomeVideo = "Playwright";

        } else if (
            lider.title
                .toLowerCase()
                .includes("cypress")
        ) {
            nomeVideo = "Cypress";

        } else if (
            lider.title
                .toLowerCase()
                .includes("postman")
        ) {
            nomeVideo = "Postman";

        } else if (
            lider.title
                .toLowerCase()
                .includes("grafana")
        ) {
            nomeVideo = "Grafana k6";

        } else if (
            lider.title
                .toLowerCase()
                .includes("jmeter")
        ) {
            nomeVideo = "JMeter";

        } else if (
            lider.title
                .toLowerCase()
                .includes("robot framework")
        ) {
            nomeVideo = "Robot Framework";
        }


        // Atualiza a posição
        const rankElement =
            document.getElementById("lider-ranking");

        if (rankElement) {

            rankElement.textContent =
                `#${lider.rank}`;
        }


        // Atualiza o nome
        const videoElement =
            document.getElementById(
                "lider-ranking-video"
            );

        if (videoElement) {

            videoElement.textContent =
                nomeVideo;
        }


    } catch (error) {

        console.error(
            "Erro ao carregar líder do ranking:",
            error
        );
    }
}


carregarLiderRanking();
