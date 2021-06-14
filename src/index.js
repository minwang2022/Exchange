import "./styles/main.scss";
import {myFunction, GetSelectedValue} from "./scripts/dropdown";
// import { render } from "sass";


function reRender(){
    d3.csv("currencies.csv", d => {
        return {
            Currency: d["Currency"],
            "May 20": +d["2020-05"], 
            "Jun 20": +d["2020-06"], 
            "Jul 20": +d["2020-07"], 
            "Aug 20": +d["2020-08"], 
            "Sept 20": +d["2020-09"], 
            "Oct 20": +d["2020-10"], 
            "Nov 20": +d["2020-11"], 
            "Dec 20": +d["2020-12"], 
            "Jan 21": +d["2021-01"], 
            "Feb 21": +d["2021-02"], 
            "Mar 21": +d["2021-03"], 
            "Apr 21": +d["2021-04"], 
            "May 21": +d["2021-05"], 
        };
    }).then(data => {
        let currencyData = {};

        for (let i = 0; i < data.length; i++) {
            let plotData = []
            for (let key in data[i]){
                if (key !="Currency"){
                    plotData.push({
                        month: key,
                        rate: +data[i][key]
                    })
                };
            };
            currencyData[data[i]["Currency"]] = plotData;

        };
        
        let dropdownCurrency = GetSelectedValue() || ("JPY");
        plot(currencyData, dropdownCurrency)
            // debugger
    });
} 


function plot(allData, dropDown){
    let selectData = allData[dropDown];
    
    let dataset = selectData.map((s) => s.rate);
    let datatime = selectData.map((s) => s.month);
    // debugger 
    let margin = 50;
    let svgWidth = 700 - 2 * margin;
    let svgHeight = 500 - 2 * margin;

    let minYvalue = d3.min(dataset)* 0.99
    let maxYvalue = d3.max(dataset)*1.01

    
    let svg = d3.select('svg');
    // debugger 
    
    // removing all chart info for animation over new chart
    svg
        .selectAll("g")
        .transition()
        .duration(0)
        .attr("svgWidth", 0).remove()
        // .ease("exp")  

    let chart = svg.append('g')
        .attr('transform', `translate(${margin}, ${margin})`);

    let yScale = d3.scaleLinear()
        .domain([minYvalue, maxYvalue])
        .range([svgHeight, 0])
        

    chart.append('g')
        .transition()
        .duration(1000)
        .call(d3.axisLeft(yScale));

    let xScale = d3.scaleBand()
        .range([0, svgWidth])
        .domain(datatime)
        .padding(0.2)
    //   debugger

    /// append x axis data text/// 
    chart.append('g')
        .attr('transform', `translate(0, ${svgHeight})`)
        .call(d3.axisBottom(xScale))
        .transition()
        .duration(1000)
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    const barGroups = chart.selectAll()
      .data(selectData)
      .enter()
      .append('g')

    
    /// Bar ///
    barGroups
        .append('rect')
        .attr('class', 'bar')
        .attr("x", d => xScale(d.month))
        .attr('width', xScale.bandwidth())
        .attr("fill", "#69b3a2")
        /// no bar at beginning ///
        .attr('height', d => svgHeight - yScale(0))
        .attr("y", d => yScale(0))
        
    /// animation ///
    chart
        .selectAll("rect")
        .transition()   /// d3.js animation method///
        .duration(800)  ///speed///
        .attr("y", (d) => yScale(d.rate))  /// bar height ///
        .attr("height", (d) => svgHeight - yScale(d.rate))  ///starting point///
        .delay((d,i) => {return i* 100}) ///animation speed delayed///
        
        
 
    // chart
    //     .selectAll()
    //     .data(selectData)
    //     .enter()
    //     .append('g')
    //     .append('text')
    //     .attr('class', 'value')
    //     .attr('x', (a) => xScale(a.month) + xScale.bandwidth() / 2)
    //     .attr('y', (a) => yScale(a.rate) + 15)
    //     .attr('text-anchor', 'middle')
    //     .text((a) => Math.round(a.rate * 1000)/1000)
        
        // Vertical chart text ///
    chart
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("class", "y-axis-label")
        .attr("y", -50)
        .attr("x", 0 - svgHeight / 2)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Exchange Rate Over One US Dollar ($1)");
    
    // horizontal chart text ///
    chart
        .append("text")
        .attr("class", "source-text")
        .attr("transform",
          "translate(15, " +
          (svgHeight + 55) + ")")
        .style("text-anchor", "left")
        .text("Source: FED");

    /// append Title ///
    chart
        .append("text")
        .attr("x", (svgWidth / 2))             
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .text("Yearly USD Exchange Rate");
}

document.addEventListener('DOMContentLoaded', (e) => {
    // GetSelectedValue()
    
    document.getElementById("dropdownbtn").addEventListener("click", myFunction); 
    document.getElementById("myDropdown").addEventListener("change", reRender)
    


    // console.log("helloooooo")
});
