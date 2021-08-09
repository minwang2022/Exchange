import "./styles/main.scss";
import {myFunction, GetSelectedValue} from "./scripts/dropdown";
import { searchRate} from "./scripts/get_rate_date";
import { Callbacks } from "jquery";
import { plot } from "./scripts/d3_graph";
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
        console.log(currencyData);
        plot(currencyData, dropdownCurrency)
            // debugger
    });
} 



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

searchRate("USD", "CAD");
