
export const getRelativeTime = (pastDateStr) => {
    const past = new Date(pastDateStr);
    const now = new Date();
    const msPerDay = 1000 * 60 * 60 * 24;

    const daysAgo = Math.floor((now - past) / msPerDay);

    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

    if (Math.abs(daysAgo) > 30) {
        const monthsAgo = (past.getFullYear() - now.getFullYear()) * 12 + (past.getMonth() - now.getMonth());
        return rtf.format(monthsAgo, 'month');
    }

    return rtf.format(daysAgo, 'day');
}

export const getLabelForCount = (num) => {
    if (num === "" || num.length <= 3)
        return num;
    else if (num.length <= 5)
        return (parseInt(num) / 1000).toFixed(1) + " K";
    else if (num.length <= 7)
        return (parseInt(num) / 100000).toFixed(1) + " lakh";
    else
        return (parseInt(num) / 1000000).toFixed(1) + " M";
}
