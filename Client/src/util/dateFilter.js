function getStartOfWeek(date) {
    const currentDay = date.getDay();
    const diff = date.getDate() - currentDay + (currentDay == 1 ? 0 : (currentDay == 0 ? -6 : 1));
    const startOfWeek = new Date(date);
    startOfWeek.setDate(diff);
    startOfWeek.setHours(0, 0, 0, 0);
    return startOfWeek;
};

function getEndOfWeek(date) {
    const endOfWeek = new Date(date);
    endOfWeek.setDate(date.getDate() - date.getDay() + 7);
    endOfWeek.setHours(23, 59, 59, 999);
    return endOfWeek;
};

export function getTodaysRecords(array) {
    const today = new Date(Date.now());
    today.setHours(0, 0, 0, 0);
    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);

    return array.filter((date) => new Date(date) >= today && new Date(date) <= endOfDay);
};

export function getThisWeeksRecords(array) {
    const today = new Date(Date.now());
    const startOfWeek = getStartOfWeek(today);
    const endOfWeek = getEndOfWeek(today);

    return array.filter((date) => new Date(date) >= startOfWeek && new Date(date) <= endOfWeek);
};