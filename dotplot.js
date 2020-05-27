var contWidth = 1000;
var contHeight = 500;
var radius_dot = 2;
var cxval = radius_dot;
var cyval = radius_dot;
var step_val_x = radius_dot*3;
var step_val_y = radius_dot*3;
var data = [];
var z_index = 100;
var svglist = [];

for(var i = cyval; i<=contHeight-radius_dot; i+=step_val_y){
    for(var j = cxval; j<=contWidth-radius_dot;j+=step_val_x)
    data.push({
        "cx": j,
        "cy": i
    })
}

var svgContainer = d3.select("#container").append("svg").attr("width",0).attr("height",0).style("position","absolute").style("top",0).style("left",0).style("z-index",z_index);
var circles = svgContainer.selectAll("circle").data(data).enter().append("circle").attr("cx",d=>d.cx).attr("cy",d=>d.cy).attr("r",radius_dot).style("fill",'#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6));
svgContainer.transition().duration(1500).attr("width",contWidth).attr("height",contHeight);
svglist.push(svgContainer);

$("#next").click(function(){
    for(var i = 0; i < svglist.length; i++){
        var svg = svglist[i];
        var h = svg.attr("height");
        var w = svg.attr("width");
        var divid = Math.random() * (5 - 2) + 2;
        svg.transition().duration(1500).attr("width",w/divid).attr("height",h/divid);
    }
    z_index--;
    var svgContainer = d3.select("#container").append("svg").attr("width",contWidth).attr("height",contHeight).style("position","absolute").style("top",0).style("left",0).style("z-index",z_index);
    var circles = svgContainer.selectAll("circle").data(data).enter().append("circle").attr("cx",d=>d.cx).attr("cy",d=>d.cy).attr("r",radius_dot).style("fill",'#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6));
    svglist.push(svgContainer);
    while(1){
        var svg = svglist[0];
        var h = svg.attr("height");
        var w = svg.attr("width");
        if(w<radius_dot || h<radius_dot){
            svglist.shift();
        }
        else{
            break;
        }
    }
    console.log(svglist.length);
});