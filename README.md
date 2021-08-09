# Exchange Rate Visualization Project 

## Background and Overview
- Purpose of this project is to compare exchange rate over major currencies on daily basic and min, max, median spot over historical data.

## Now playing at https://minwang2022.github.io/Exchange/

## Technologies Used

* Javascript
* Node
* D3.js
* Vanilla DOM Manipulation
* CSS
* HTML
* SASS
* Webpack
* Currency Scoope API
* Fetch API
* Github Pages

## Features

### Data Visualization 
A user can choose a Currency, by clicking a currency in the dropdown list, or by input a base currency and input a comparable currency in the input boxes. D3.js was utilized to provide an interactive bar graph, displaying real time exchange rate or historical data over 12 months period. Bars, when hovered over, will provide the exchange rate from base currency to comparable currency. 

![exchange](https://user-images.githubusercontent.com/72528915/128746023-1aacdac6-fc0c-47f9-a52d-a2bfb89abd96.gif)


### Bar Graph Code Snippet
D3.js was used to create the bar graph as well as generating the rate' information, which was done by appending tags to the html body to be able to display over any region of the graph.
```js
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
    
  ```

### JS Custom Animations
When switching between currency or interacting with the currencies' historical data in drapdown list custom JS animations were built utilizing the asynchronous nature of JS. 

![animation](https://user-images.githubusercontent.com/72528915/128748086-c285427e-3521-4c17-af19-701000110844.gif)

### Animation code Snippet
Code that constantly watch for updates and trigger re-render once user request is sent.
```js
    document.addEventListener('DOMContentLoaded', (e) => {
    

        document.getElementById("dropdownbtn").addEventListener("click", myFunction); 
        document.getElementById("myDropdown").addEventListener("change", reRender);
        
        document.getElementById("submit").addEventListener("click", (e) => {
            e.preventDefault()

            let baseCurrency = document.getElementById("baseCurrency").value;
            let targetCurrency = document.getElementById("targetCurrency").value;
            
            searchRate(baseCurrency, targetCurrency);

            // clear input text //
            document.getElementById("baseCurrency").value = "";
            document.getElementById("targetCurrency").value = "";
            
        })
        
        // modal //
        let modal = document.getElementById("myModal");

        document.getElementById("myBtn").addEventListener("click", function(e){
            e.preventDefault()
            modal.style.display = "block";
        }); 
        document.getElementsByClassName("close")[0].addEventListener("click", function(e){
            modal.style.display = "none";
        }); 
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    });
```
