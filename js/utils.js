function formatNumber(value) {
    return value.toLocaleString("pt-BR");
}

function calculateGrowth(previous, current) {
    return ((current - previous) / previous) * 100;
}

function getRankDifference(previousRank, currentRank) {
    return previousRank - currentRank;
}

function getRankChangeHTML(previousRank, currentRank) {

    const difference = getRankDifference(
        previousRank,
        currentRank
    );

    if (difference > 0) {
        return `
            <span class="rank-change up">
                ↑ ${difference}
            </span>
        `;
    }

    if (difference < 0) {
        return `
            <span class="rank-change down">
                ↓ ${Math.abs(difference)}
            </span>
        `;
    }

    return `
        <span class="rank-change same">
            —
        </span>
    `;
}

function getRankEmoji(rank) {

    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";

    return rank;
}

function getVideoShortName(title) {

    const titleLower = title.toLowerCase();

    if (titleLower.includes("playwright")) {
        return "Playwright";
    }

    if (titleLower.includes("cypress")) {
        return "Cypress";
    }

    if (titleLower.includes("postman")) {
        return "Postman";
    }

    if (titleLower.includes("grafana")) {
        return "Grafana k6";
    }

    if (titleLower.includes("jmeter")) {
        return "JMeter";
    }

    if (titleLower.includes("robot framework")) {
        return "Robot Framework";
    }

    if (titleLower.includes("manuais")) {
        return "Testes Manuais";
    }

    return title;
}
