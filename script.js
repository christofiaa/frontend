document.addEventListener('DOMContentLoaded', () => {
    const expressionEl = document.getElementById('expression');
    const resultEl = document.getElementById('result');
    let currentExpression = '';
    let lastResult = null;

    // Загружаем последнее выражение из памяти
    const last = Storage.getLastExpression();
    if (last) {
        currentExpression = last.expr;
        expressionEl.textContent = currentExpression || '0';
        resultEl.textContent = last.res;
    }

    // Обработчики кнопок
    document.querySelectorAll('.num').forEach(btn => {
        btn.addEventListener('click', () => {
            currentExpression += btn.dataset.num;
            expressionEl.textContent = currentExpression;
        });
    });

    document.querySelectorAll('.op').forEach(btn => {
        btn.addEventListener('click', () => {
            const op = btn.dataset.op;
            currentExpression += ` ${op} `;
            expressionEl.textContent = currentExpression;
        });
    });

    document.getElementById('equals').addEventListener('click', evaluate);

    document.querySelector('[data-action="clear"]').addEventListener('click', () => {
        currentExpression = '';
        expressionEl.textContent = '0';
        resultEl.textContent = '0';
    });

    document.querySelector('[data-action="backspace"]').addEventListener('click', () => {
        currentExpression = currentExpression.trim().slice(0, -1).trim();
        expressionEl.textContent = currentExpression || '0';
    });

    document.querySelector('[data-action="percent"]').addEventListener('click', () => {
        try {
            const val = eval(currentExpression) / 100;
            resultEl.textContent = val;
        } catch {
            resultEl.textContent = 'Error';
        }
    });

    document.querySelector('[data-action="dot"]').addEventListener('click', () => {
        if (!currentExpression.split(' ').pop().includes('.')) {
            currentExpression += '.';
            expressionEl.textContent = currentExpression;
        }
    });

    function evaluate() {
        try {
            // Заменяем ^ на ** для степени
            let expr = currentExpression.replace(/\^/g, '**');
            const result = eval(expr);
            resultEl.textContent = result;
            History.add(currentExpression, result);
            Storage.saveLastExpression(currentExpression, result);
            lastResult = result;
        } catch (error) {
            resultEl.textContent = 'Error';
        }
    }

    // Поддержка клавиатуры
    document.addEventListener('keydown', (e) => {
        if (e.key >= '0' && e.key <= '9') {
            currentExpression += e.key;
            expressionEl.textContent = currentExpression;
        } else if (['+', '-', '*', '/'].includes(e.key)) {
            currentExpression += ` ${e.key} `;
            expressionEl.textContent = currentExpression;
        } else if (e.key === 'Enter' || e.key === '=') {
            evaluate();
        } else if (e.key === 'Escape') {
            currentExpression = '';
            expressionEl.textContent = '0';
            resultEl.textContent = '0';
        } else if (e.key === 'Backspace') {
            currentExpression = currentExpression.trim().slice(0, -1).trim();
            expressionEl.textContent = currentExpression || '0';
        } else if (e.key === '.') {
            if (!currentExpression.split(' ').pop().includes('.')) {
                currentExpression += '.';
                expressionEl.textContent = currentExpression;
            }
        }
    });
});