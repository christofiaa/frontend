const History = {
    list: Storage.getHistory(),

    add(expression, result) {
        const record = { expression, result, timestamp: new Date().toLocaleString() };
        this.list.unshift(record);
        if (this.list.length > 20) this.list.pop(); // ограничиваем 20 записей
        Storage.saveHistory(this.list);
        this.render();
    },

    clear() {
        this.list = [];
        Storage.saveHistory(this.list);
        this.render();
    },

    render() {
        const listEl = document.getElementById('history-list');
        listEl.innerHTML = '';
        this.list.forEach(record => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${record.expression}</strong> = ${record.result} <br><small>${record.timestamp}</small>`;
            li.addEventListener('click', () => {
                document.getElementById('expression').textContent = record.expression;
                document.getElementById('result').textContent = record.result;
            });
            listEl.appendChild(li);
        });
    }
};

// Инициализация истории при загрузке
document.addEventListener('DOMContentLoaded', () => {
    History.render();
    document.getElementById('clear-history').addEventListener('click', () => History.clear());
});