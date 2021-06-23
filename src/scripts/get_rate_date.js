// import {plot} from "./d3_graph"

// let baseCurrency = document.getElementById("baseCurrency").value;
// let targetCurrency = document.getElementById("targetCurrency").value;

export function searchRate(baseCurrency, targetCurrency){
     
        let api_key = '60908d461d6fcb402ec3279a3286c130';
        let url = 'https://api.currencyscoop.com/v1/latest' +'?base=' + baseCurrency + '&symbols=' + targetCurrency +
            '&api_key=' + api_key;
    fetch(url)
        .then(res => res.json()) 
        .then(data => {
            // console.log(data);
            // debugger 
            let currencyData = [];
            let baseRate = 1;
            let targetRate = data.response.rates[targetCurrency.toUpperCase()];

            currencyData.push({
                currency: baseCurrency,
                rate: baseRate
            });
            currencyData.push({
                currency: targetCurrency, 
                rate: targetRate
            })
            
            // debugger 
            console.log(currencyData);
            searchPlot(currencyData);

        })
}

export function searchPlot(selectData){
  

    let dataset = selectData.map((s) => s.rate);
    let dataCurrency = selectData.map((s) => s.currency);
    // debugger 
    let margin = 50;
    let svgWidth = 700 - 2 * margin;
    let svgHeight = 500 - 2 * margin;

    // let minYvalue = d3.min(dataset)* 0.9;
    let maxYvalue = d3.max(dataset)*1.1;

    let svg = d3.select('svg');

    // removing all chart info for animation over new chart
    svg
    .selectAll("g")
    .transition()
    .duration(0)
    .attr("svgWidth", 0).remove()

    let chart = svg.append('g')
    .attr('transform', `translate(${margin}, ${margin})`);

    let yScale = d3.scaleLinear()
        .domain([0, maxYvalue])
        .range([svgHeight, 0])
    

    chart.append('g')
        .transition()
        .duration(1000)
        .call(d3.axisLeft(yScale))


    let xScale = d3.scaleBand()
        .range([0, svgWidth])
        .domain(dataCurrency)
        .padding(0.2)
    // X axis
    chart.append('g')
        .attr('transform', `translate(0, ${svgHeight})`)
        .call(d3.axisBottom(xScale))
        .transition()
        .duration(1000)
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

  
    let tooltip = d3
        .select("body")
        .append('div')
        .style("opacity", 0)
        .attr('class', 'tooltip')			
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")

    let mouseover = function(d) {
        tooltip
            .style("opacity", 1)
        d3.select(this)
            .style("stroke", "black")
            .style("opacity", 1)
        }
    let mousemove = function(d,i) {
        return tooltip
            .style("top", (event.pageY)+"px")
            .style("left",(event.pageX)+"px")
            .style("background-color", "white")
            .style("border", "2px solid black")
            .style("padding", "5px")
            .style("border-radius", "3px")
            .html(`1 ${dataCurrency[0]} for ${dataset[1] + " " + dataCurrency[1]}`)}

    let mouseleave = function(d) {
        tooltip
            .style("opacity", 0)
        d3.select(this)
            .style("stroke", "none")
            .style("opacity", 0.8)
        }
  

    // Bars
 
    chart.selectAll()
        .data(selectData)
        .enter()
        .append('g')
        .append('rect')
            .attr('class', 'bar')
            .attr("x", d => xScale(d.currency))
            .attr('width', xScale.bandwidth())
            .attr("fill", "#69b3a2")
            /// no bar at beginning ///
            .attr('height', d => svgHeight - yScale(0))
            .attr("y", d => yScale(0))
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        // debugger; 
        .on("mouseleave", mouseleave)
        // tooltip
        
/// animation ///
    chart
        .selectAll("rect")
        .transition()   /// d3.js animation method///
        .duration(280)  ///speed///
        .attr("y", (d) => yScale(d.rate))  /// bar height ///
        .attr("height", (d) => svgHeight - yScale(d.rate))  ///starting point///
        .delay((d,i) => {return i* 10}) ///animation speed delayed///
        
        // Animation
    
    chart
        .selectAll("rect")
        .transition()   /// d3.js animation method///
        .duration(280)  ///speed///
        .attr("y", (d) => yScale(d.rate))  /// bar height ///
        .attr("height", (d) => svgHeight - yScale(d.rate))  ///starting point///
        .delay((d,i) => {return i* 10}) ///animation speed delayed///
        
   // Vertical chart text ///
   chart
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("class", "y-axis-label")
        .attr("y", -50)
        .attr("x", 0 - svgHeight / 2)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Currency Amount");

// horizontal chart text ///
    chart
        .append("text")
        .attr("class", "source-text")
        .attr("transform",
            "translate(15, " +
            (svgHeight + 55) + ")")
        .style("text-anchor", "left")
        .text("Source: Currency Scoop");

    /// append Title ///
        
    let nowDate = new Date();
    let date = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate(); 
   
    chart
        .append("text")
        .attr("x", (svgWidth / 2))             
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .text(`Real Time Exchange Rate As Of ${date}`);
}
