let curves = []


function rotate60(v) {
    return createVector((1/2) * v.x - (-sqrt(3)/2) * v.y, ( -sqrt(3)/2) * v.x + (1/2) * v.y)
  }
  
  
  class Point {
    constructor(x, y){
      this.x = x;
      this.y = y;
    }
  }
  
  
  function start_triangle(size) {
    p1 = new Point(0, - (sqrt(3)) * size / 3);
  
    p2 = new Point(p1.x + Math.cos(Math.PI / 3) * size, p1.y + Math.sin(Math.PI / 3) * size);
    p3 = new Point(p1.x + Math.cos(2* Math.PI / 3) * size, p1.y + Math.sin(2 * Math.PI / 3) * size);
  
    coords = [p1, p2, p3];
    return coords;
  }
  
  function draw_line(coords) {
    for (let i = 0; i < coords.length-1; i++) {
      line(coords[i].x, coords[i].y, coords[i+1].x, coords[i+1].y);
        if (count < coords.length-1 && wait <= 0) {
          count++;
          wait = 0;
        } else {
          count = 0;
        };
    }
    line(coords[0].x, coords[0].y, coords[coords.length-1].x, coords[coords.length-1].y);
  } 
  
  function phase_coords(n, size) {
    if (int(n) <= 0) {
      return start_triangle(size);
    } else {
      coords = phase_coords(n-1, size);
      new_coords = new Array();
      for (let i = 0; i < coords.length-1; i++) {
        p1 = coords[i];
        p5 = coords[i+1];
  
        p2 = new Point((2/3) * p1.x + (1/3) * p5.x, (2/3) * p1.y + (1/3) * p5.y);
        p4 = new Point((1/3) * p1.x + (2/3) * p5.x, (1/3) * p1.y + (2/3) * p5.y);
        v_rotated = rotate60(createVector(p4.x - p2.x, p4.y - p2.y));
        p3 = new Point(p2.x + v_rotated.x, p2.y + v_rotated.y);
              new_coords.push(p1, p2, p3, p4, p5);
      }
      
      p1 = coords[coords.length-1];
      p5 = coords[0];
  
      p2 = new Point((2/3) * p1.x + (1/3) * p5.x, (2/3) * p1.y + (1/3) * p5.y);
      p4 = new Point((1/3) * p1.x + (2/3) * p5.x, (1/3) * p1.y + (2/3) * p5.y);
      v_rotated = rotate60(createVector(p4.x - p2.x, p4.y - p2.y));
      p3 = new Point(p2.x + v_rotated.x, p2.y + v_rotated.y);
     
      new_coords.push(p1, p2, p3, p4, p5);
      
      return new_coords;
    }
  }
  

function setup () {
    for (i = 0; i < 7; i++) {
        curves.push(phase_coords(i, 1))
    }
}