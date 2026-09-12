async function init() {

    try {

        const response =
            await fetch("data/semanas.json");

        const data =
            await response.json();


        const semanaAnterior =
            data.semanaAnterior.videos;

        const semanaAtual =
            data.semanaAtual.videos;


        /*
         * Junta os dados das duas semanas
         * utilizando a URL do vídeo como identificador.
         */
        const videos = semanaAtual.map(videoAtual => {

            const videoAnterior =
                semanaAnterior.find(
                    video =>
                        video.url === videoAtual.url
                );

            return {

                rankPrevious:
                    videoAnterior?.rank ?? null,

                rankCurrent:
                    videoAtual.rank,

                previous:
                    videoAnterior?.views ?? 0,

                current:
                    videoAtual.views,

                title:
                    videoAtual.title,

                url:
                    videoAtual.url
            };
        });


        // ==========================================
        // RESUMO
        // ==========================================

        const totalPrevious =
            videos.reduce(
                (sum, video) =>
                    sum + video.previous,
                0
            );

        const totalCurrent =
            videos.reduce(
                (sum, video) =>
                    sum + video.current,
                0
            );


        const totalGrowth =
            calculateGrowth(
                totalPrevious,
                totalCurrent
            );


        document.getElementById(
            "totalCurrent"
        ).textContent =
            formatNumber(totalCurrent);


        document.getElementById(
            "totalGrowth"
        ).textContent =
            `+${totalGrowth.toFixed(1)}% vs. semana anterior`;


        // ==========================================
        // RANKING
        // ==========================================

        renderRanking(videos);


        // ==========================================
        // GRÁFICO
        // ==========================================

        renderChart(videos);


    } catch (error) {

        console.error(
            "Erro ao carregar os dados:",
            error
        );

    }
}


document.addEventListener(
    "DOMContentLoaded",
    init
);
