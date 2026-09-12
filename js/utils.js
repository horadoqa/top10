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
