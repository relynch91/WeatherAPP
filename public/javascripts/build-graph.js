const d3 = require('d3');
const buildGraph = (data, value) => {
    let keyValue = ['Temperature (F)', 'Percentage (%)', 'Percentage (%)', 'Temperature (F) ',
        'WindSpeed (Knots)', 'True Wind Direction (Heading)']
    let dates = [];
    let values = [];
    let dataPackaged = data.map(function (d) {
        let answer = {};
        let key = new Date(d['time']);
        dates.push(key);
        let value = d['value'];
        values.push(value);
        answer['key'], answer['value'];
        answer['key'] = key;
        answer['value'] = value;
        return answer;
    })

    let margin = { top: 50, right: 50, bottom: 50, left: 50 };
    let width = 850 - margin.left - margin.right;
    let height = 600 - margin.top - margin.bottom;

    let x = d3.scaleTime()
        .domain(d3.extent(dates))
        .range([0, width]);
    let y = d3.scaleLinear()
        .domain([d3.min(values), d3.max(values)])
        .range([height, 0]);
    let line = d3.line()
        .x(function (d) { return x(d.key) })
        .y(function (d) { return y(d.value) })

    let svg = d3.select("#d3-graph")
        .append("svg")
        .classed("svg-class", true)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(y));

    svg.append("linearGradient")
        .attr("id", "line-gradient")
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", 0)
        .attr("y1", y(0))
        .attr("x2", 0)
        .attr("y2", y(d3.max(values)))
        .selectAll("stop")
        .data([
            { offset: "0%", color: "blue" },
            { offset: "100%", color: "red" }
        ])
        .enter().append("stop")
        .attr("offset", function (d) { return d.offset; })
        .attr("stop-color", function (d) { return d.color; });

    svg.append("path")
        .datum(dataPackaged)
        .attr("fill", "none")
        .attr("stroke", "url(#line-gradient)")
        .attr("stroke-width", 2)
        .attr("d", line);
        
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", - 50)
        .attr("x", - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text(keyValue[value]);
};

export default buildGraph