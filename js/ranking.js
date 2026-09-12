function renderRanking(videos) {

    const rankingBody =
        document.getElementById("rankingBody");

    rankingBody.innerHTML = "";

    videos
        .sort((a, b) => a.rankCurrent - b.rankCurrent)
        .forEach(video => {

            const growth = calculateGrowth(
                video.previous,
                video.current
            );

            const rankHTML = getRankChangeHTML(
                video.rankPrevious,
                video.rankCurrent
            );

            const emoji = getRankEmoji(
                video.rankCurrent
            );

            const row = document.createElement("tr");

            row.innerHTML = `

                <td class="position ${
                    video.rankCurrent <= 3
                        ? "top"
                        : ""
                }">
                    ${emoji}
                </td>

                <td class="video-title">
                    <a
                        href="${video.url}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        ${video.title}
                    </a>
                </td>

                <td class="views previous-value">
                    ${formatNumber(video.previous)}
                </td>

                <td class="views current-value">
                    ${formatNumber(video.current)}
                </td>

                <td>
                    <span class="growth">
                        ↑ ${growth.toFixed(1)}%
                    </span>
                </td>

                <td>
                    ${rankHTML}
                </td>

            `;

            rankingBody.appendChild(row);
        });
}
