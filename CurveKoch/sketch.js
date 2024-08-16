function setup() {
  createCanvas(windowWidth, windowHeight);
  
}


function draw() {
  translate(windowWidth / 2, windowHeight / 2);
  background('pink');
  draw_line(phase_coords(1,300));
}



class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}


function start_square(size) {
  p1 = new Point(-size/2, size/2);
  p2 = new Point(-size/2, -size/2);
  p3 = new Point(size/2, -size/2);
  p4 = new Point(size/2, size/2);
  return [p1, p2, p3, p4]
}


function draw_line(coords) {
  for (let i = 0; i < coords.length-1; i++) {
    line(coords[i].x, coords[i].y, coords[i+1].x, coords[i+1].y);
  }
} 




function phase_coords(n, size) {
  if (int(n) <= 0) {
    return start_square(size);
  } else {
    coords = phase_coords(n-1, size);
    new_coords = new Array();
    let status = 0;
    for (let i = 0; i < coords.length-1; i++) {
      p1 = coords[i];
      p5 = coords[i+1];

      if (i % 3 === 0) {
        p2 = new Point(p1.x + size / 3, p1.y);
        p3 = new Point(p2.x, p2.y + size/3);
        p4 = new Point(p3.x - size / 3, p3.y);
      }

      if (i % 3 === 1) {
         p2 = new Point(p1.x + size / 3, p1.y);
        //p3 = new Point(p2.x, p2.y - size/3);
        //p4 = new Point(p3.x + size / 3, p3.y);
      }

      if (i % 3 === 2) {
        p2 = new Point(p1.x + size / 3, p1.y);
        p3 = new Point(p2.x, p2.y + size/3);
        p4 = new Point(p3.x - size / 3, p3.y);
      }
      
      new_coords.push(p1, p2, p3, p4, p5);
    }
    
    p1 = coords[coords.length-1];
    p5 = coords[0];

    p2 = new Point((2/3) * p1.x + (1/3) * p5.x, (2/3) * p1.y + (1/3) * p5.y);
    p4 = new Point((1/3) * p1.x + (2/3) * p5.x, (1/3) * p1.y + (2/3) * p5.y);
    v_rotated = rotate60(createVector(p4.x - p2.x, p4.y - p2.y));
    p3 = new Point(p2.x + v_rotated.x, p2.y + v_rotated.y);
   
    new_coords.push(p1, p2, p3, p4, p5);
    //circle(p1.x, p1.y, 10)
    
    return new_coords;
  }
}