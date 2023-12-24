function draw() {
    try {
        const expression = document.getElementById('eq').value
        const expr = math.parse(expression)
        const xValues = math.range(-10, 10, 0.5).toArray()

        const yValues = xValues.map(function (x) {
            return expr.evaluate({ x: x })
        })

        const trace1 = {
            x: xValues,
            y: yValues,
            type: 'scatter',
            name: 'f(x)'
        }

        const derivative1 = math.derivative(expr, 'x')
        const yValuesDerivative1 = xValues.map(function (x) {
            return derivative1.evaluate({ x: x })
        })

        const trace2 = {
            x: xValues,
            y: yValuesDerivative1,
            type: 'scatter',
            name: "f'(x)"
        }

        const derivative2 = math.derivative(derivative1, 'x')
        const yValuesDerivative2 = xValues.map(function (x) {
            return derivative2.evaluate({ x: x })
        })

        const trace3 = {
            x: xValues,
            y: yValuesDerivative2,
            type: 'scatter',
            name: "f''(x)"
        }

        const layout = {
            margin: { t: 30 },
            xaxis: { title: 'x' },
            yaxis: { title: 'f(x)', domain: [0, 0.3] }
        }

        const dataPlot = [trace1]
        Plotly.newPlot('plot', dataPlot, layout)

        const dataDerivative1 = [trace2]
        Plotly.newPlot('derivative1', dataDerivative1, { ...layout, yaxis: { title: "f'(x)", domain: [0.35, 0.65] } })

        const dataDerivative2 = [trace3]
        Plotly.newPlot('derivative2', dataDerivative2, { ...layout, yaxis: { title: "f''(x)", domain: [0.7, 1] } })
    } catch (err) {
        console.error(err)
        alert(err)
    }
}

document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault()
    draw()
})

draw()
