class Paddle {
    constructor() {
        this.x = width/2
        this.y = height*0.95
    }
    draw() {
        push()
        rectMode(CENTER)
        fill('white')
        rect(this.x, this.y, width/8, height/20)
        pop()
    }
    controls() {
        if(controls == 0) {
            let up = keyIsDown(87) || keyIsDown(38)
            if((keyIsDown(68) || keyIsDown(39)) && this.x < width-width/16) {
                if(up) this.x += width/75
                else this.x += width/150
            }
            if((keyIsDown(65) || keyIsDown(37)) && this.x > width/16) {
                if(up) this.x -= width/75
                else this.x -= width/150
            }
        } else {
            this.x += (mouseX-this.x)/10
        }
    }
}

class Ball {
    constructor() {
        this.x = width/2
        this.y = height/2

        this.velX = 0
        this.velY = height/100
    }
    draw() {
        push()
        rectMode(CENTER)
        fill('white')
        rect(this.x, this.y, height/20, height/20)
        pop()
    }
    physc() {
        this.x += this.velX
        this.y += this.velY

        if(this.y > height*0.9 && this.y < height*0.95) {
            if(this.x < paddle.x+width/16+height/40 && this.x > paddle.x-width/16-height/40) {
                this.velY = 0-this.velY
                this.velX = (this.x-paddle.x)/(width/200)
                ball.x += ball.velX
                ball.y += ball.velY
            }
        }
        if(this.y > height-height/40) {
            ball = new Ball()
            paused = true
            background(0)
            balls--
        }

        if(this.x > width-height/40) {
            this.velX = 0-this.velX
            this.x += this.velX
        }
        if(this.x < height/40) {
            this.velX = 0-this.velX
            this.x += this.velX
        }
        if(this.y < height/40) {
            this.velY = 0-this.velY
            this.y += this.velY
        }
    }
}

class Brick {
    constructor(x, y, color) {
        this.x = x
        this.y = y
        this.color = color
        this.on = true
    }
    draw() {
        push()
        rectMode(CENTER)
        fill(this.color, 100, 100)
        rect(this.x, this.y, ceil(width/22), height/20)
        pop()
        this.physc()
    }
    physc() {
        if(ball.y-height/40 < this.y+height/40 && ball.y+height/40 > this.y-height/40) {
            if(ball.x-height/40 < this.x+width/44 && ball.x+height/40 > this.x-width/44) {
                this.on = false
                brickcount--
                score+=10
                balls++
                ball.velY = 0-ball.velY
                ball.x += ball.velX
                ball.y += ball.velY
            }
        }
    }
}