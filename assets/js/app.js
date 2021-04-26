

var svgArea = d3.select('body').select('svg');

// set width and heigh
var svgWidth = 980;
var svgHeight = 760;

// set page margins
var chartMargin = {
    top: 25,
    right: 25,
    bottom: 200,
    left: 200
};

var chartWidth = svgWidth - chartMargin.right - chartMargin.left;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// append a div class to the scatter element
var svg = d3.select("#scatter")
            .append('svg')
            .attr('height',svgHeight)
            .attr('width', svgWidth);

            
//append an svg group            
var chartGroup = svg.append('g')
    .attr('transform', `translate(${chartMargin.left}, ${chartMargin.top})`)
    .classed('chart',true)

// select initial parameters by initializing x and y variables
var xAxis = 'poverty'
var yAxis = 'healthcare'


    // Read in data
    // Create the graph
    d3.csv('assets/data/data.csv').then(function(censusData) {
    
   
    censusData.forEach(function(data){
        data.obesity = +data.obesity
        data.smokes = +data.smokes
        data.healthcare = +data.healthcare
        data.age = +data.age
        data.income = +data.income
        data.poverty = +data.poverty
            
    })

    
    var yScale = d3.scaleLinear()
        .domain(d3.extent(censusData,d=>d.healthcare))
        .range([chartHeight,0]);

    var xScale = d3.scaleLinear()
        .domain(d3.extent(censusData,d=>d.poverty))
        .range([0,chartWidth]);
    
    var leftAxis = d3.axisLeft(yScale);
    var bottomAxis = d3.axisBottom(xScale);

    chartGroup.append('g').attr('id','x-axis').attr('transform', `translate(0,${chartHeight})`).call(bottomAxis);
    chartGroup.append('g').attr('id','y-axis').call(leftAxis);

    

    var circles = chartGroup.append('g').selectAll('circle').data(censusData);


    circles.enter()
        .append('circle')
        .classed('stateCircle',true)
        .attr('cx',d => xScale(d.poverty))
        .attr('cy',d => yScale(d.healthcare))
        .attr('r',8)
        .attr('stroke-width',2);


    var stateText = chartGroup.append('g').selectAll('text');

    stateText.data(censusData)
        .enter()
        .append('text')
        .classed('stateText',true)
        .attr('transform',d => `translate(${xScale(d.poverty)},${yScale(d.healthcare)+3})`)
        .text(d => d.abbr)
        .attr('font-size','7px')

    var ageLabel = chartGroup.append('text')
        .attr('id','age')
        .attr('transform',`translate(${chartWidth/2}, ${chartHeight+chartMargin.top + 10})`)
        .classed('aText active',true)
        .text('Age Median')
    
    var incomeLabel = chartGroup.append('text')
        .attr('id','income')
        .attr('transform',`translate(${chartWidth/2}, ${chartHeight+chartMargin.top + 30})`)
        .classed('aText inactive',true)
        .text('Household Income (Median)')

    var povertyLabel = chartGroup.append('text')
        .attr('id','poverty')
        .attr('transform', `translate(${(chartWidth)/2}, ${chartHeight + chartMargin.top + 50})`)
        .classed('aText inactive',true)
        .text('In Poverty(%)')

    var obeseLabel = chartGroup.append('text')
        .attr('id','obesity')
        .attr('transform',`translate(${-75}, ${chartHeight/2}) rotate(-90)`)
        .classed('aText active',true)
        .text('Obese(%)')

    var smokesLabel = chartGroup.append('text')
        .attr('id','smokes')
        .attr('transform',`translate(${-55}, ${chartHeight/2}) rotate(-90)`)
        .classed('aText inactive',true)
        .text('Smokes (%)')

    var healthcareLabel = chartGroup.append('text')
    .attr('id','healthcare')
    .attr('transform',`translate(${-35}, ${chartHeight/2}) rotate(-90)`)
    .classed('aText inactive',true)
    .text('Lack of Healthcare(%)')


    ageLabel.on('mouseover',function(){
            d3.select(this).style('cursor','pointer')
        })
        .on('mouseout',function(){
            d3.select(this).style('cursor','default')
        })
        .on('click',function(){
            xAxis = 'age';
            clickoption(xAxis,yAxis);
            d3.select(this).attr('class','aText active');
            d3.select('#income').attr('class','aText inactive');
            d3.select('#poverty').attr('class','aText inactive');
        })

    incomeLabel.on('mouseover',function(){
        d3.select(this).style('cursor','pointer')
    })
    .on('mouseout',function(){
        d3.select(this).style('cursor','default')
    })
    .on('click',function(){
        xAxis = 'income';
        clickoption(xAxis,yAxis);
        d3.select(this).attr('class','aText active');
        d3.select('#age').attr('class','aText inactive');
        d3.select('#poverty').attr('class','aText inactive');
    })
    
    povertyLabel.on('mouseover',function(){
        d3.select(this).style('cursor','pointer')
    })
    .on('mouseout',function(){
        d3.select(this).style('cursor','default')
    })
    .on('click',function(){
        xAxis = 'poverty';
        clickoption(xAxis,yAxis);
        d3.select(this).attr('class','aText active');
        d3.select('#age').attr('class','aText inactive');
        d3.select('#income').attr('class','aText inactive');
    })

    smokesLabel.on('mouseover',function(){
        d3.select(this).style('cursor','pointer')
        })
        .on('mouseout',function(){
            d3.select(this).style('cursor','default')
        })
        .on('click',function(){
            yAxis = 'smokes';
            Clickoption(xAxis,yAxis);
            d3.select(this).attr('class','aText active');
            d3.select('#healthcare').attr('class','aText inactive');            
            d3.select('#obesity').attr('class','aText inactive');
        });

    healthcareLabel.on('mouseover',function(){
        d3.select(this).style('cursor','pointer')
        })
        .on('mouseout',function(){
            d3.select(this).style('cursor','default')
        })
        .on('click',function(){
            yAxis = 'healthcare';
            Clickoption(xAxis,yAxis);
            d3.select(this).attr('class','aText active');
            d3.select('#smokes').attr('class','aText inactive');
            d3.select('#obesity').attr('class','aText inactive');
        });
    
    obeseLabel.on('mouseover',function(){
        d3.select(this).style('cursor','pointer')
        })
        .on('mouseout',function(){
            d3.select(this).style('cursor','default')
        })
        .on('click',function(){
            yAxis = 'obesity';
            Clickoption(xAxis,yAxis);
            d3.select(this).attr('class','aText active');
            d3.select('#smokes').attr('class','aText inactive');
            d3.select('#healthcare').attr('class','aText inactive');
        });

}).catch(function(error){
    console.log(error);

});

function clickoption(x,y){
    
    d3.csv('assets/data/data.csv').then(function(censusData) {
    
        //Parse data
        censusData.forEach(function(data){
            data.obesity = +data.obesity
            data.smokes = +data.smokes
            data.healthcare = +data.healthcare
            data.age = +data.age
            data.income = +data.income
            data.poverty = +data.poverty
            
        })
    
        //next create linear scales for the axis
        var XScale = d3.scaleLinear()
            .domain(d3.extent(censusData,d=>d[x]))
            .range([0,chartWidth]);

        var YScale = d3.scaleLinear()
            .domain(d3.extent(censusData,d=>d[y]))
            .range([chartHeight,0]);
    
        var LeftAxis = d3.axisLeft(YScale);
        var BottomAxis = d3.axisBottom(XScale); 

        d3.select('#y-axis')
            .transition()
            .duration(1000)
            .call(LeftAxis)
        
        d3.select('#x-axis')
            .transition()
            .duration(1000)
            .call(BottomAxis)
        
        
        var circles = d3.selectAll('circle').data(censusData);
        circles.transition()
            .duration(1000)
            .attr('cx',d => XScale(d[x]))
            .attr('cy',d => YScale(d[y]));

        var text = d3.selectAll('.stateText').data(censusData);
        text.transition()
            .duration(1000)
            .attr('transform',d => `translate(${XScale(d[x])},${YScale(d[y])+3})`)

            
    })
}
