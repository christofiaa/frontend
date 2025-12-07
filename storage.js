const Storage = {
    saveLastExpression(expr, res) {
        localStorage.setItem('lastExpression', JSON.stringify({ expr, res }));
    },

    getLastExpression() {
        const data = localStorage.getItem('lastExpression');
        return data ? JSON.parse(data) : null;
    },

    saveHistory(history) {
        localStorage.setItem('calcHistory', JSON.stringify(history));
    },

    getHistory() {
        const history = localStorage.getItem('calcHistory');
        return history ? JSON.parse(history) : [];
    }
};