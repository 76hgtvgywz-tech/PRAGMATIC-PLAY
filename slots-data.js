/**
 * Данные всех слотов Pragmatic Play
 * Используйте для быстрого создания страниц
 */

const slotsData = {
    // Самые популярные слоты
    "gates-of-olympus": {
        title: "Gates of Olympus",
        name: "Gates of Olympus",
        rtp: "96,50%",
        maxWin: "x5.000",
        date: "2020",
        volatility: "ВЫСОКАЯ",
        lines: "20",
        minBet: "0.20",
        maxBet: "100",
        hasFreeSpins: "ЕСТЬ",
        canBuyBonus: "ЕСТЬ",
        hasTurbo: "ЕСТЬ",
        hasAnte: "НЕТ",
        hasDemo: "ЕСТЬ"
    },
    "zeus-vs-hades": {
        title: "Zeus vs Hades",
        name: "Zeus vs Hades",
        rtp: "96,07%",
        maxWin: "x15.000",
        date: "2023",
        volatility: "ВЫСОКАЯ",
        lines: "20",
        minBet: "0.20",
        maxBet: "100",
        hasFreeSpins: "ЕСТЬ",
        canBuyBonus: "ЕСТЬ",
        hasTurbo: "ЕСТЬ",
        hasAnte: "НЕТ",
        hasDemo: "ЕСТЬ"
    },
    "the-dog-house": {
        title: "The Dog House",
        name: "The Dog House",
        rtp: "96,51%",
        maxWin: "x6.750",
        date: "2019",
        volatility: "ВЫСОКАЯ",
        lines: "20",
        minBet: "0.20",
        maxBet: "125",
        hasFreeSpins: "ЕСТЬ",
        canBuyBonus: "НЕТ",
        hasTurbo: "ЕСТЬ",
        hasAnte: "НЕТ",
        hasDemo: "ЕСТЬ"
    },
    "starlight-princess": {
        title: "Starlight Princess",
        name: "Starlight Princess",
        rtp: "96,50%",
        maxWin: "x5.000",
        date: "2021",
        volatility: "ВЫСОКАЯ",
        lines: "20",
        minBet: "0.20",
        maxBet: "100",
        hasFreeSpins: "ЕСТЬ",
        canBuyBonus: "ЕСТЬ",
        hasTurbo: "ЕСТЬ",
        hasAnte: "НЕТ",
        hasDemo: "ЕСТЬ"
    },
    
    // Версия 1000
    "gates-of-olympus-1000": {
        title: "Gates of Olympus 1000",
        name: "Gates of Olympus 1000",
        rtp: "96,50%",
        maxWin: "x15.000",
        date: "2023",
        volatility: "ВЫСОКАЯ",
        lines: "20",
        minBet: "0.20",
        maxBet: "240",
        hasFreeSpins: "ЕСТЬ",
        canBuyBonus: "ЕСТЬ",
        hasTurbo: "ЕСТЬ",
        hasAnte: "НЕТ",
        hasDemo: "ЕСТЬ"
    },
    "big-bass-bonanza-1000": {
        title: "Big Bass Bonanza 1000",
        name: "Big Bass Bonanza 1000",
        rtp: "94,51%",
        maxWin: "x13.334",
        date: "2023",
        volatility: "ВЫСОКАЯ",
        lines: "10",
        minBet: "0.10",
        maxBet: "250",
        hasFreeSpins: "ЕСТЬ",
        canBuyBonus: "НЕТ",
        hasTurbo: "ЕСТЬ",
        hasAnte: "НЕТ",
        hasDemo: "ЕСТЬ"
    },
    "starlight-princess-1000": {
        title: "Starlight Princess 1000",
        name: "Starlight Princess 1000",
        rtp: "96,50%",
        maxWin: "x15.000",
        date: "2023",
        volatility: "ВЫСОКАЯ",
        lines: "20",
        minBet: "0.20",
        maxBet: "240",
        hasFreeSpins: "ЕСТЬ",
        canBuyBonus: "ЕСТЬ",
        hasTurbo: "ЕСТЬ",
        hasAnte: "НЕТ",
        hasDemo: "ЕСТЬ"
    },
    
    // Добавьте данные для остальных 65+ слотов по аналогии
    // Пример для Bigger Bass Bonanza:
    "bigger-bass-bonanza": {
        title: "Bigger Bass Bonanza",
        name: "Bigger Bass Bonanza",
        rtp: "96,71%",
        maxWin: "x4.000",
        date: "2021",
        volatility: "ВЫСОКАЯ",
        lines: "12",
        minBet: "9.60",
        maxBet: "19200",
        hasFreeSpins: "ЕСТЬ",
        canBuyBonus: "НЕТ",
        hasTurbo: "ЕСТЬ",
        hasAnte: "НЕТ",
        hasDemo: "ЕСТЬ"
    }
};

// Экспорт для использования в других файлах
if (typeof module !== 'undefined' && module.exports) {
    module.exports = slotsData;
}