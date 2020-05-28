$(document).ready(function(){
    var contWidth = ($(window).width())*(0.6);
    var contHeight = ($(window).height())*(0.7);
    var radius_dot = 2;
    var cxval = radius_dot;
    var cyval = radius_dot;
    var step_val_x = radius_dot*3;
    var step_val_y = radius_dot*3;
    var data = [];
    var z_index = 100;
    var svglist = [];
    var duration = 1500;

    var activetext = 0;
    

    for(var i = cyval; i<=contHeight-radius_dot; i+=step_val_y){
        for(var j = cxval; j<=contWidth-radius_dot;j+=step_val_x)
        data.push({
            "cx": j,
            "cy": i
        })
    }
    
    $("#container").height(contHeight);
    $("#container").width(contWidth);
    
    
    var svgContainer = d3.select("#container").append("svg").attr("width",contWidth).attr("height",0).style("position","absolute").style("top",0).style("left",0).style("z-index",z_index);
    var circles = svgContainer.selectAll("circle").data(data).enter().append("circle").attr("cx",d=>d.cx).attr("cy",d=>d.cy).attr("r",radius_dot).style("fill",'#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6));
    svgContainer.transition().duration(duration).ease(d3.easeSin).attr("height",contHeight);
    var circlecol = circles.style("fill");
    svglist.push(svgContainer);
    $("#textcontainer").children().eq(activetext).css("color",circlecol);

    $("#next").click(function(){
        var divid = Math.random() * (5 - 2) + 2;
        for(var i = 0; i < svglist.length; i++){
            var svg = svglist[i];
            var h = svg.attr("height");
            var w = svg.attr("width");
            svg.transition().duration(duration).attr("width",w/divid).attr("height",h/divid);
        }
        z_index--;
        var svgContainer = d3.select("#container").append("svg").attr("width",contWidth).attr("height",contHeight).style("position","absolute").style("top",0).style("left",0).style("z-index",z_index);
        var circles = svgContainer.selectAll("circle").data(data).enter().append("circle").attr("cx",d=>d.cx).attr("cy",d=>d.cy).attr("r",radius_dot).style("fill",'#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6));
        var circlecol = circles.style("fill");
        console.log(circlecol);
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
        $("#textcontainer").fadeOut(duration/2,function(){
            $(this).children().eq(activetext).addClass("hidden");
            activetext+=1;
            $(this).children().eq(activetext).removeClass();
            $(this).children().eq(activetext).css("color",circlecol);
            $(this).fadeIn(duration/2);
        });
    });
});
