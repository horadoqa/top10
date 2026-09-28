function getWeekNumber(date = new Date()) {

const d = new Date(
    Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
    )
);

// ISO 8601: segunda-feira = início da semana
const day = d.getUTCDay() || 7;

d.setUTCDate(d.getUTCDate() + 4 - day);

const yearStart = new Date(
    Date.UTC(d.getUTCFullYear(), 0, 1)
);

return Math.ceil(
    (((d - yearStart) / 86400000) + 1) / 7
);

}

// Calcula a semana atual
const week = getWeekNumber();

// Insere o resultado no elemento #week
const weekElement = document.getElementById("week");

if (weekElement) {
weekElement.textContent = week;
}