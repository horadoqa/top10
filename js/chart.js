function renderChart(videos) {

    const canvas =
        document.getElementById("top10Chart");

    const ctx = canvas.getContext("2d");

    const labels = videos.map(video => {

        const words = video.title.split(" ");

        if (words.length <= 5) {
            return video.title;
        }

        return words.slice(0, 5).join(" ") + "...";
    });


    // Gradiente da semana atual
    const gradient = ctx.createLinearGradient(
        0,
        0,
        0,
        500
    );

    gradient.addColorStop(0, "#8b85ff");
    gradient.addColorStop(1, "#00d4ff");


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

                    backgroundColor:
                        "rgba(71,85,105,.55)",

                    borderColor: "#64748b",

                    borderWidth: 1,

                    borderRadius: 7,

                    borderSkipped: false
                },

                {
                    label: "Semana atual",

                    data: videos.map(
                        video => video.current
                    ),

                    backgroundColor: gradient,

                    borderColor: "#8b85ff",

                    borderWidth: 1,

                    borderRadius: 7,

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

                    backgroundColor: "#0b1020",

                    borderColor:
                        "rgba(255,255,255,.10)",

                    borderWidth: 1,

                    titleColor: "#fff",

                    bodyColor: "#cbd5e1",

                    padding: 14,

                    callbacks: {

                        title: function(context) {

                            return videos[
                                context[0].dataIndex
                            ].title;

                        },

                        label: function(context) {

                            return `
                                ${context.dataset.label}:
                                ${formatNumber(context.raw)}
                                visualizações
                            `;
                        }
                    }
                }
            },

            scales: {

                x: {

                    grid: {
                        display: false
                    },

                    ticks: {

                        color: "#94a3b8",

                        font: {
                            size: 10
                        },

                        maxRotation: 45,

                        minRotation: 25
                    }
                },

                y: {

                    beginAtZero: true,

                    grid: {

                        color:
                            "rgba(255,255,255,.06)"
                    },

                    ticks: {

                        color: "#64748b",

                        callback: function(value) {

                            return formatNumber(value);

                        }
                    }
                }
            }
        }
    });
}
