$(() => {
  let canvas;
  let c;
  let brush = {
    x: 0,
    y: 0,
    color: "#000000",
    size: 10,
    down: false,
  };

  let strokes = [];
  let currentStroke = null;

  const redraw = () => {
    c.clearRect(0,0,canvas[0].width,canvas[0].height);
    c.lineCap = "round";
    for (let i = 0; i < strokes.length; i++) {
      let s = strokes[i];
      c.strokeStyle = s.color;
      c.lineWidth = s.size;
      c.beginPath();
      c.moveTo(s.points[0].x, s.points[0].y);
      for (let j = 0; j < s.points.length; j++) {
        c.lineTo(s.points[j].x, s.points[j].y);
      }
      c.stroke();
    }
  }

  const init = () => {
    canvas = $("canvas");
    canvas.attr({
      width: window.innerWidth,
      height: window.innerHeight
    })

    c = canvas[0].getContext("2d");

    const mouseEvent = (e) => {
      brush.x = event.layerX;
      brush.y = event.layerY;

      currentStroke.points.push({
        x: brush.x,
        y: brush.y
      });

      redraw();
    }

    $("canvas").mousedown(() => {
      brush.down = true;

      currentStroke = {
        color: brush.color,
        size: brush.size,
        points: []
      };

      strokes.push(currentStroke);

      mouseEvent(event);
      redraw();
    });
    $("canvas").mouseup(() => {
      brush.down = false;
      mouseEvent(event);
    });
    $("canvas").mousemove(() => {
      if (brush.down) {
        mouseEvent(event);
      };
    });

    $("#undo").click(() => {
      strokes.pop();
      redraw();
    });
    $("#clear").click(() => {
      strokes = [];
      redraw();
    });

    $("#colorpicker").on("input", function(){ //not sure why this doesnt work with arrow syntax
      brush.color = this.value; //i believe its due to the "this.value" being in a different scope
    });

    $("#brushsize").on("input", function(){
      brush.size = this.value;
      $("#brushsizenumber").text(brush.size);
    });

    $(window).resize(function(){
      canvas.attr({
        width: window.innerWidth,
        height: window.innerHeight
      });
      redraw();
    });
  }

init();
});
