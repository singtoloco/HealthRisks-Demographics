// @TODO: YOUR CODE HERE!
console.log("Check app.js");


// function makeResponsive() {

    // if the SVG area isn't empty when the browser loads,
    // remove it and replace it with a resized version of the chart
    // var svgArea = d3.select("body").select("svg");
  
    // // clear svg is not empty
    // if (!svgArea.empty()) {
    //   svgArea.remove();
    // }
  
    // SVG wrapper dimensions are determined by the current width and
    // height of the browser window.
    // var svgWidth = window.innerWidth;
    // var svgHeight = window.innerHeight;

    var svgWidth = 700;
    var svgHeight = 500;

    console.log(svgWidth);
  
    var margin = {
      top: 50,
      bottom: 50,
      right: 50,
      left: 50
    };
  
    var height = svgHeight - margin.top - margin.bottom;
    var width = svgWidth - margin.left - margin.right;
  
    // Append SVG element
    var svg = d3
      .select(".chart")
      .append("svg")
      .attr("height", svgHeight)
      .attr("width", svgWidth);
  
    // Append group element
    var chartGroup = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
    // Read CSV
    d3.csv("assets/data/data.csv")
      .then(function(healthData) {

        console.log(healthData);
  
        // create date parser
        // var dateParser = d3.timeParse("%d-%b");
  
        // parse data
        healthData.forEach(function(data) {
        //   data.date = dateParser(data.date);
          data.poverty = +data.poverty;
          data.healthcare = +data.healthcare;
        });
  
        // create scales
        var xLinearScale = d3.scaleLinear()
          .domain(d3.extent(healthData, d => d.poverty))
          // .domain([0, d3.max(healthData, d => d.poverty)])
          .range([0, width]);
  
        var yLinearScale = d3.scaleLinear()
          .domain([0, d3.max(healthData, d => d.healthcare)])
          .range([height, 0]);
  
        // create axes
        var xAxis = d3.axisBottom(xLinearScale);
        var yAxis = d3.axisLeft(yLinearScale);
  
        // append axes
        chartGroup.append("g")
          .attr("transform", `translate(0, ${height})`)
          .call(xAxis);
  
        chartGroup.append("g")
          .call(yAxis);  

  
        // append circles
        var circlesGroup = chartGroup.selectAll("circle")
          .data(healthData)
          .enter()
          .append("circle")
          .attr("cx", d => xLinearScale(d.poverty))
          .attr("cy", d => yLinearScale(d.healthcare))
          // .attr("text", d => d.abbr)  //not working
          .attr("r", "8")
          .attr("fill", "lightblue")
          .attr("stroke-width", "1")
          .attr("stroke", "grey");
        
        // console.log(healthData);
        healthData.forEach(function(data){
          console.log(data.poverty);
          console.log(data.healthcare);
          console.log(data.abbr);
        });

        //append text on circles
        var textGroup = chartGroup.selectAll("text")
          .data(healthData)
          .enter()
          .append("text")
          .attr("x", d => xLinearScale(d.poverty))
          .attr("y", d => yLinearScale(d.healthcare))          
          .attr("text-anchor", "middle")
          .attr("fill", "black")  
          .style("font-size", "7px") 
          .text(function(d) { return d.abbr; });


        //append circles (alt)
        // var g = chartGroup.selectALL(null)
        //   .data(healthData)
        //   .enter()
        //   .append("g")
        //   .attr("transform", `translate(${xLinearScale(d.poverty)}, ${yLinearScale(d.healthcare)})`);        
        
        // g.append("circle")
        //   .attr("r", "5")
        //   .attr("fill","blue")       
        //   .attr("stroke-width", "1")
        //   .attr("stroke", "grey");        
        
        // g.append("text")
        //   .text(function(d) { return d.abbr; });


              
        
        // // Date formatter to display dates nicely
        // var dateFormatter = d3.timeFormat("%d-%b");
  
        // // Step 1: Initialize Tooltip
        // var toolTip = d3.tip()
        //   .attr("class", "tooltip")
        //   .offset([80, -60]) //by default d3 tooltip position will be right on top of data point
        //   .html(function(d) {
        //     return (`<strong>${dateFormatter(d.date)}<strong><hr>${d.medals}
        //     medal(s) won`);
        //     // return (`<h7>${dateFormatter(d.date)}<h7><hr><p>${d.medals}
        //     // medal(s) won<p>`);
        //   });
  
        // // Step 2: Create the tooltip in chartGroup.
        // chartGroup.call(toolTip);
  
        // // Step 3: Create "mouseover" event listener to display tooltip
        // circlesGroup.on("mouseover", function(d) {
        //   // toolTip.show(d, this);
        //   toolTip.show(d);
        //   //without 'this', the tooltip will show at the same position, 
        //   //no matter which data point we have mouse over on
        // })
        // // Step 4: Create "mouseout" event listener to hide tooltip
        //   .on("mouseout", function(d) {
        //     toolTip.hide(d);
        //   });
      }); //END: Read csv
//   }
  
  // When the browser loads, makeResponsive() is called.
//   makeResponsive();
  
  // When the browser window is resized, makeResponsive() is called.
//   d3.select(window).on("resize", makeResponsive);