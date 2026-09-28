function renderChart(videos) {

    const canvas = document.getElementById("top10Chart");
    const ctx = canvas.getContext("2d");

    const labels = videos.map(video => {

        const words = video.title.split(" ");

        if (words.length <= 5) {
            return video.title;
        }

        return words.slice(0, 5).join(" ") + "...";
    });


    /*
     * PALETA
     *
     * Verde profundo: #0F3D2E
     * Verde-musgo:    #3F6F52
     * Verde-sinal:    #8FE3B0
     * Dourado:        #C99A44
     * Marfim:         #F3EFE6
     * Tinta:          #12201A
     */


    // Gradiente sutil da semana atual
    const currentGradient = ctx.createLinearGradient(
        0,
        0,
        0,
        500
    );

    currentGradient.addColorStop(
        0,
        "rgba(143, 227, 176, 0.95)"
    );

    currentGradient.addColorStop(
        1,
        "rgba(63, 111, 82, 0.75)"
    );


    // Gradiente discreto da semana anterior
    const previousGradient = ctx.createLinearGradient(
        0,
        0,
        0,
        500
    );

    previousGradient.addColorStop(
        0,
        "rgba(63, 111, 82, 0.65)"
    );

    previousGradient.addColorStop(
        1,
        "rgba(63, 111, 82, 0.35)"
    );


    new Chart(ctx, {

        type: "bar",

        data: {

            labels: labels,

            datasets: [

                {
                    label: "Semana anterior",

                    data: videos.map(
                        video => video.previous
                    ),

                    backgroundColor: previousGradient,

                    borderColor: "#3F6F52",

                    borderWidth: 1,

                    borderRadius: 4,

                    borderSkipped: false
                },

                {
                    label: "Semana atual",

                    data: videos.map(
                        video => video.current
                    ),

                    backgroundColor: currentGradient,

                    borderColor: "#8FE3B0",

                    borderWidth: 1,

                    borderRadius: 4,

                    borderSkipped: false
                }

            ]
        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            interaction: {
                intersect: false,
                mode: "index"
            },

            plugins: {

                legend: {
                    display: false
                },

                tooltip: {

                    backgroundColor: "#12201A",

                    borderColor: "rgba(143, 227, 176, 0.22)",

                    borderWidth: 1,

                    cornerRadius: 6,

                    padding: {
                        top: 12,
                        bottom: 12,
                        left: 14,
                        right: 14
                    },

                    displayColors: true,

                    boxWidth: 7,
                    boxHeight: 7,
                    boxPadding: 5,

                    titleMarginBottom: 9,

                    titleColor: "#F3EFE6",

                    bodyColor: "#B7C4BC",

                    titleFont: {
                        family: "JetBrains Mono",
                        size: 10,
                        weight: "600"
                    },

                    bodyFont: {
                        family: "JetBrains Mono",
                        size: 10,
                        weight: "500"
                    },

                    bodySpacing: 5,

                    callbacks: {

                        title: function (context) {

                            return videos[
                                context[0].dataIndex
                            ].title;

                        },

                        label: function (context) {

                            return (
                                " " +
                                context.dataset.label +
                                "    " +
                                formatNumber(context.raw)
                            );

                        }
                    }
                }


            },

            scales: {

                // x: {

                //     grid: {
                //         display: false
                //     },

                //     border: {
                //         display: false
                //     },

                //     ticks: {

                //         color: "#899990",

                //         font: {
                //             family: "JetBrains Mono",
                //             size: 9,
                //             weight: "500"
                //         },

                //         maxRotation: 45,

                //         minRotation: 25,

                //         padding: 8
                //     }
                // },

                x: {
                    grid: {
                        display: false
                    },

                    border: {
                        display: false
                    },

                    ticks: {
                        display: false
                    }
                },

                y: {

                    beginAtZero: true,

                    border: {
                        display: false
                    },

                    grid: {

                        color:
                            "rgba(243, 239, 230, 0.07)",

                        drawTicks: false
                    },

                    ticks: {

                        color: "#718278",

                        padding: 10,

                        font: {
                            family: "JetBrains Mono",
                            size: 9
                        },

                        callback: function (value) {

                            return formatNumber(value);

                        }
                    }
                }
            }
        }
    });
}
