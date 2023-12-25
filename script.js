function draw() {
    try {
        const expression = document.getElementById('eq').value;
        const sanitizedExpression = expression.replace(/tlog\(/g, 't*log(');
        const expr = math.parse(sanitizedExpression);
        const tValues = math.range(0, 10, 0.5).toArray();

        const xValues = tValues.map(function (t) {
            return expr.evaluate({ t: t });
        });

        const trace1 = {
            x: tValues,
            y: xValues,
            type: 'scatter',
            name: 'x(t)'
        };

        const velocity = math.derivative(expr, 't');
        const vValues = tValues.map(function (t) {
            return velocity.evaluate({ t: t });
        });

        const trace2 = {
            x: tValues,
            y: vValues,
            type: 'scatter',
            name: "v(t)"
        };

        const acceleration = math.derivative(velocity, 't');
        const aValues = tValues.map(function (t) {
            return acceleration.evaluate({ t: t });
        });

        const trace3 = {
            x: tValues,
            y: aValues,
            type: 'scatter',
            name: "a(t)"
        };

        const layout = {
            margin: { t: 30 },
            yaxis: { title: 'x(t)', domain: [0, 1] },
            width: 300,
            height: 300
        };

        const dataPlot = [trace1];
        Plotly.newPlot('plot', dataPlot, { ...layout, xaxis: { title: 't, c' } });

        const dataVelocity = [trace2];
        Plotly.newPlot('derivative1', dataVelocity, { ...layout, xaxis: { title: 't, c' }, yaxis: { title: "v(t), м/c", domain: [0, 1] } });

        const dataAcceleration = [trace3];
        Plotly.newPlot('derivative2', dataAcceleration, { ...layout, xaxis: { title: 't, c' }, yaxis: { title: "a(t), м/c^2", domain: [0, 1] } });

    } catch (err) {
        alert("Неверная формула.");
    }
}

document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault();
    draw();
});

draw();
