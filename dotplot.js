var svgContainer = d3.select("body").append("svg").attr("width",0).attr("height",0);

//svgContainer.append("circle").attr("cx",2).attr("cy",2).attr("r",2);

var contWidth = 1000;
var contHeight = 500;
var radius_dot = 2;
var cxval = radius_dot;
var cyval = radius_dot;
var step_val_x = radius_dot*3;
var step_val_y = radius_dot*3;
var data = [];

for(var i = cyval; i<=contHeight-radius_dot; i+=step_val_y){
    for(var j = cxval; j<=contWidth-radius_dot;j+=step_val_x)
    data.push({
        "cx": j,
        "cy": i
    })
}

var circles = svgContainer.selectAll("circle").data(data).enter().append("circle").attr("cx",d=>d.cx).attr("cy",d=>d.cy).attr("r",radius_dot);
svgContainer.transition().duration(1500).attr("width",contWidth).attr("height",contHeight);