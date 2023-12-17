"use strict"

function plotGraphs() {
    const equationX = document.getElementById('equationX').value;
    const equationRegex = /^(-)?(\d+(\.\d+)?|\.\d+) \* t( ([+\-] (\d+(\.\d+)?|\.\d+) \* t( \* t)?)*)?$/;

    if (!equationRegex.test(equationX)) {
        alert("Ошибка в формуле. Пример формулы: '0.3 * t - 1 * t * t'");
    } else {
        const time = [];
        for (let t = 0; t <= 10; t += 0.1) {
            time.push(t);
        }

        const xValues = time.map(t => eval(equationX));
        const vValues = calculateDerivative(xValues, time);
        const aValues = calculateDerivative(vValues, time);

        plotGraph('plotX', time, xValues, 'Время (с)', 'Координата x', 'x(t)');
        plotGraph('plotV', time, vValues, 'Время (с)', 'Скорость v', 'v(t)');
        plotGraph('plotA', time, aValues, 'Время (с)', 'Ускорение a', 'a(t)');
    }
}

function calculateDerivative(y, x) {
    const derivative = [];
    for (let i = 0; i < y.length - 1; i++) {
        const slope = (y[i + 1] - y[i]) / (x[i + 1] - x[i]);
        derivative.push(slope);
    }
    derivative.push(derivative[derivative.length - 1]);
    return derivative;
}

function plotGraph(containerId, xData, yData, xLabel, yLabel, title) {
    const trace = {
        x: xData,
        y: yData,
        type: 'scatter',
        mode: 'lines',
        name: yLabel
    };

    const layout = {
        title: title,
        xaxis: {
            title: xLabel
        },
        yaxis: {
            title: yLabel
        }
    };

    const data = [trace];

    Plotly.newPlot(containerId, data, layout);
}