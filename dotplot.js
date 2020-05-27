var contWidth = 1000;
var contHeight = 500;
var radius_dot = 2;
var cxval = radius_dot;
var cyval = radius_dot;
var step_val_x = radius_dot*3;
var step_val_y = radius_dot*3;
var data = [];
var z_index = 100;

for(var i = cyval; i<=contHeight-radius_dot; i+=step_val_y){
    for(var j = cxval; j<=contWidth-radius_dot;j+=step_val_x)
    data.push({
        "cx": j,
        "cy": i
    })
}

var svgContainer = d3.select("#container").append("svg").attr("width",0).attr("height",0).style("position","absolute").style("top",0).style("left",0).style("z-index",z_index);
var circles = svgContainer.selectAll("circle").data(data).enter().append("circle").attr("cx",d=>d.cx).attr("cy",d=>d.cy).attr("r",radius_dot).style("fill","red");
svgContainer.transition().duration(1500).attr("width",contWidth).attr("height",contHeight);


$("#next").click(function(){
    z_index--;
    svgContainer.transition().duration(1500).attr("width",contWidth/3).attr("height",contHeight/3);
    var svgContainer2 = d3.select("#container").append("svg").attr("width",contWidth).attr("height",contHeight).style("position","absolute").style("top",0).style("left",0).style("z-index",z_index);
    var circles2 = svgContainer2.selectAll("circle").data(data).enter().append("circle").attr("cx",d=>d.cx).attr("cy",d=>d.cy).attr("r",radius_dot).style("fill","green");
});