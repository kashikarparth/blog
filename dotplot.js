$(document).ready(function(){
    var contWidth = ($(window).width());
    var contHeight = ($(window).height()*0.85);
    var radius_dot = 4;
    var cxval = radius_dot;
    var cyval = radius_dot;
    var step_val_x = radius_dot*3;
    var step_val_y = radius_dot*3;
    var data = [];
    var z_index = 19;
    var svglist = [];
    var duration = 1500;
    var activetext = 0;
    var divlist = [6.32,2.061,5.081,3.217,2.13,3.585,3.464,2.273,1.59,2.52,2.99,6.667,33.911,4.183,1.14,1.73,1.01,85];
    var divind = 0;

    var collist = ["FFEB3B","03A9F4","f44336","FAFAFA","FFEB3B","03A9F4","f44336","FAFAFA","FFEB3B","03A9F4","f44336","FAFAFA","FFEB3B","03A9F4","f44336","FAFAFA","FFEB3B","03A9F4","f44336"]
    var colind = 0;

    $("#container").height(contHeight);
    $("#container").width(contWidth);

    for(var i = cyval; i<=contHeight-radius_dot; i+=step_val_y){
        for(var j = cxval; j<=contWidth-radius_dot;j+=step_val_x)
        data.push({
            "cx": j,
            "cy": i
        })
    }
    
    
    
    //add initial svg
    var svgContainer = d3.select("#container").append("svg").attr("width",contWidth).attr("height",0).style("position","absolute").style("top",0).style("left",0).style("z-index",z_index);
    var circles = svgContainer.selectAll("circle").data(data).enter().append("circle").attr("cx",d=>d.cx).attr("cy",d=>d.cy).attr("r",radius_dot).style("fill",collist[colind]);
    svgContainer.transition().duration(duration).ease(d3.easeSin).attr("height",contHeight);
    var circlecol = circles.style("fill");
    svglist.push(svgContainer);
    $("#textcontainer").children().eq(activetext).css("color",circlecol);
    colind++;

    $("#next").click(function(){
        //add new svg, base
        z_index--;
        svgContainer = svgContainer.select(function() {
            return this.parentNode.insertBefore(this.cloneNode(true), this.nextSibling);
          });
        svgContainer.style("z-index",z_index);
        svgContainer.selectAll("circle").style("fill",collist[colind]);
        

        //shrink preexisting svg
        var divid = divlist[divind];
        divind++;
        for(var i = 0; i < svglist.length; i++){
            var svg = svglist[i];
            var h = svg.attr("height");
            var w = svg.attr("width");
            svg.transition().duration(duration).attr("width",w/divid).attr("height",h/divid);
        }

        //change the text 
        $("#textcontainer").fadeOut(duration/2,function(){
            $(this).children().eq(activetext).addClass("hidden");
            activetext+=1;
            $(this).children().eq(activetext).removeClass();
            $(this).children().eq(activetext).css("color",collist[colind]);
            $(this).fadeIn(duration/2);
            colind++;
        });

        //delete invisible svg
        svglist.push(svgContainer);
        while(1){
            var svg = svglist[0];
            var h = svg.attr("height");
            var w = svg.attr("width");
            if(w<radius_dot || h<radius_dot){
                svg.remove();
                svglist.shift();
            }
            else{
                break;
            }
        }



    });
});
