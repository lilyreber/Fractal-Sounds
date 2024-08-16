//-----------------------------------------------------------------
// Создаём новый класс
class Particle {
    constructor(momentum, Tx, vel, mass, color, sound, c) { // он получает аргументы
        this.pos = createVector(random(-50 - c, 50 + c), random(-50 - c, 50 + c)); // после this. задаются параметры объекта, которые потом можно изменять
        this.momentum = momentum; 
        if (momentum < 0) {
            Tx = Tx + PI // если momentum меньше 0, разворачиваем частицу в противоположную сторону
        }
        this.angle = p5.Vector.fromAngle(Tx * 3); 
        // Tx - это угол в радианах, статическая функция fromAngle создаёт вектор с заданным углом
        // *3, чтобы частицы летели более разнообразно. Как мы видели в ОИЯИ, учёные очень стараются,
        // чтобы они летели прямо и не очень разлетались, а нам для зрелищности хочется обратного.
        this.vel = abs(vel * 3); // переводим отрицательные значения скорости в положительные
        this.angle.setMag(this.vel); // теперь магнитуда (длина) вектора angle равна vel
        this.acc = p5.Vector.random2D();
        this.acc.setMag(this.vel + this.mass);
        this.mass = pow(abs(mass), 1/4) * 10; // уменьшаем разброс массы, чтобы маленькие были больше,
        // а большие меньше. pow 1/3 – возедение в степень 1/3, т.е. кубический корень. 
        // * 30 можно менять, чтобы получить круги желаемого размера.
        this.color = color;
        this.alpha = color[3];
        this.sound = sound;
        this.rate = random(10, 1000); 
        this.sound.rate(this.rate);
        this.sound.loop(); // с фунцией loop() звук запускается и бесконечно повторяется
        // не забудьте кликнуть мышкой по окну, чтобы звук зазвучал!!
        this.volume = map(momentum, -95, 95, 0.01, 0.2) // громкость от 0.001 до 0.01 - это очень тихо (максимум 1)
        this.sound.setVolume(this.volume);
        // this.sound.setVolume(constrain(abs(mass / 100), 0.05, 0.5));
    }

    draw() {
        this.pos.add(this.angle); // прибавляем вектор к положению частицы каждый кадр, чтобы она двигалась
        // this.pos.add(this.acc)
        this.sound.pan(this.pos.x / (windowWidth / 2)); // стереопанорамирование (pan - панорама), от -1 до 1
        // при -1 звук слева, при +1 справа. Зависит от положения частицы по горизонтали
        let newRate = this.rate + (-this.pos.y / 2); // rate - скорость проигрывания mp3-файла.
        // Зависит от положения частицы по вертикали 
        newRate = constrain(newRate, 1, 1000); // ограничение скорости между 1x и 1000x (это можно убрать)
        this.sound.rate(newRate);
        fill(this.color[0], this.color[1], this.color[2], this.alpha);
        this.alpha = this.alpha + 5 + this.mass / 10;
        circle(this.pos.x, this.pos.y, this.mass);
        this.vel = this.vel + this.vel / 100 + this.mass / 40 // увеличиваем скорость каждый кадр
        this.angle.setMag(this.vel) // и, соответственно, увеличиваем длину вектора
        this.acc.add(p5.Vector.random2D())
        this.acc.setMag(this.vel)
        this.angle.add(this.acc);
        this.sound.setVolume(this.volume + map(
            abs(this.pos.x) + abs(this.pos.y), // громкость тоже увеличиваем по расстоянию от центра
            0, (windowHeight + windowWidth) / 2,
            0, 0.5)); // но не больше 0.5, а то будет зашквар и треск (хотя, возможно, это тоже иногда нужно)
        
    }
}