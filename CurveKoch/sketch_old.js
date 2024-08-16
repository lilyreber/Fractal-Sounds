let center_x;
let center_y;
let SIZE;

let STROKE_COUNT = 3;
let mode_1 = 1
let max_preset_num = 2

let audio_on
let players = []
let players_current = []

let variables = {'Rotation Speed': 30, 'Figures per beat':1, 'Figure change per beat': 0, 
                 'Figures Offset': 50, 'Figures grow speed': 100, 'Grow limit': 4000,
                'Transparency speed': 0, 'Rose speed': 5, 'Frame rate': 32,
                'Note length': 4 * 32}

function change_mod(mode) {
  if (mode === 1) {
    rot_speed = 3
    figures_per_beat = 3
    figures_beat_change = 0
    figures_offset = 50
    grow_speed = 100
    grow_limit = 2000
    transparency_speed = 10
    rose_speed = 3
    frame_rate = 16
    note_len = 4 * 32
    audio_on = 1
  } else if (mode === 2) {
    rot_speed = 10
    figures_per_beat = 1
    figures_beat_change = 1
    figures_offset = 50
    grow_speed = 250
    grow_limit = 2000
    transparency_speed = 1
    rose_speed = 30
    frame_rate = 32
    note_len = 4 * 32
    audio_on = 1
  } else if (mode === 3) {
    rot_speed = 200
    figures_per_beat = 10
    figures_beat_change = 0
    figures_offset = 10
    grow_speed = 50
    grow_limit = 2000
    transparency_speed = 1
    rose_speed = 0
    frame_rate = 32*32
    note_len = 32*4
    audio_on = 1
  } else if (mode === 4) {
    rot_speed = 1000
    figures_per_beat = 4
    figures_beat_change = -2
    figures_offset = 300
    grow_speed = 400
    grow_limit = 2000
    transparency_speed = 8
    rose_speed = 20
    frame_rate = 64
    note_len = 4 * 32
    audio_on = 1
  } else if (mode === 5) {
    rot_speed = 1000
    figures_per_beat = 5
    figures_beat_change = 0
    figures_offset = 300
    grow_speed = 100
    grow_limit = 2000
    transparency_speed = 100
    rose_speed = 2
    frame_rate = 64
    note_len = 4 * 32 
    audio_on = 1
  } else if (mode === 6) {
    rot_speed = 3
    figures_per_beat = 3
    figures_beat_change = 0
    figures_offset = 40
    grow_speed = 50
    grow_limit = 2000
    transparency_speed = 0
    rose_speed = 0
    frame_rate = 64
    note_len = 4 * 32
    audio_on = 1
  } else if (mode === 7) {
    rot_speed = 0
    figures_per_beat = 3
    figures_beat_change = 0
    figures_offset = 25
    grow_speed = 25
    grow_limit = 2000
    transparency_speed = 20
    rose_speed = -30
    frame_rate = 16
    note_len = 16*64
    audio_on = 1
  }
}

current_objects = [] // [[n, size, color]]
function preload() {
  for (i = 0; i < 6; i++) {
    let player = new Tone.Player({
      url: str(pow(2,i)) + ".wav", // Укажите путь к вашему файлу .wav
      autostart: false, // Автоматически начинает воспроизведение после загрузки
      onload: () => {
      console.log('Звук' + str(i) + 'загружен и готов к воспроизведению!');
    }
  }).toDestination(); // Направляем вывод на колонки или наушники
    players.push(player)
  }
  players = shuffle(players)
};


let started = 0
let sliders = []
function setup() {
  createCanvas(windowWidth, windowHeight);
  center_x = windowWidth / 2;
  center_y = windowHeight / 2;
  background(color(50, 50, 50))
  angleMode(DEGREES);
  // for (i = 0; i < 11; i++) {
  //   sliders.push([new dataInput([20, 40 + 60*i], [0, 255], 80)])
  // }
  
}

let count = 0;
let wait = 0;

function fractals () {
  translate(width/2, height/2)
  angleMode(DEGREES);
  strokeWeight(5);
  rotate(variables['Rotation Speed']*frameCount)
  stroke(255, 255, 255, 100)
  strokeWeight(1);
  
  
  for (let i = 0; i < 6; i++) {
    draw_line(phase_coords(i, (i+1) * 10 + 100))
  } 
  draw_line(phase_coords(5, frameCount));
  draw_line(phase_coords(4, 300));
  draw_line(phase_coords(3, 100-(frameCount%100)));
  draw_line(phase_coords(4, 1000-(frameCount%1000)));

  stroke('white')
  strokeWeight(2);
  nlen = variables['Note length']
  c = frameCount
  
  draw_line(phase_coords(0, 30 * (3/2 - 2*abs((frameCount%nlen) - nlen/2)/nlen)));
  nlen /= 2
  draw_line(phase_coords(1, 60 * (3/2 - 2*abs((frameCount%nlen) - nlen/2)/nlen)));
  nlen /= 2
  draw_line(phase_coords(2, 90 * (3/2 - 2*abs((frameCount%nlen) - nlen/2)/nlen)));
  nlen /= 2
  draw_line(phase_coords(3, 135 * (3/2 - 2*abs((frameCount%nlen) - nlen/2)/nlen)));
  nlen /= 2
  draw_line(phase_coords(4, 170 * (3/2 - 2*abs((frameCount%nlen) - nlen/2)/nlen)));
  nlen /= 2
  draw_line(phase_coords(5, 270 * (3/2 - 2*abs((frameCount%nlen) - nlen/2)/nlen)));
  nlen /= 2

  nlen = variables['Note length']
  let curve_params = [[0, 0, 'purple', frameCount], [1, 0, 'blue', frameCount], [2, 0, 'green', frameCount], [3, 0, 'yellow', frameCount], [4, 0, 'orange', frameCount], [5, 0, 'red', frameCount]]
  for (i = 0; i < 6; i++) {
    if (frameCount%nlen === 0) {
      console.log(players)
      
      if (audio_on) {
        players[i].start()
      }
      for (j = 0; j < variables['Figures per beat']; j++) {
        current_objects.push([min(curve_params[i][0] + variables['Figures change per beat'], 6), curve_params[i][1] - variables['Figures Offset'] * j, curve_params[i][2], curve_params[i][3]])
      }
      //break
    } else {
      nlen /= 2
    }
  }
 

  new_current = []
  for (i = 0; i < current_objects.length; i++) {
    strokeWeight((6 - current_objects[i][0]))
    stroke(255, 255 - variables[rose_speed]*(frameCount - current_objects[i][3]), 255, 255 - variables['Transparency speed']*(frameCount - current_objects[i][3]))//current_objects[i][2], 1)
    draw_line(phase_coords(current_objects[i][0], current_objects[i][1]));
    current_objects[i][1] += variables['Figures grow speed']
    if (current_objects[i][1] < variables['Grow limit']) {
        new_current.push(current_objects[i])
    }
  }
  delete current_objects
  current_objects = new_current
  console.log()


}

class dataInput {
  constructor (pos, range, size) {
    this.pos = pos
    this.range = range
    this.size = size
    this.slider = createSlider(range[0], range[1]);
    this.slider.position(pos[0], pos[1]);
    this.slider.size(size)
  }
}

function draw() {
  change_mod(mode_1)
  frameRate(variables['Frame rate'])
  background("black");

  if (started) {
    fractals()
  }
  
}

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

function mousePressed() {
  started = 1
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


