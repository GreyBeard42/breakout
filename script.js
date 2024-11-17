let paddle, ball
let paused, controls, font
let balls, score, level
let bricks = []
let brickcount

function preload() {
    font = loadFont("https://greybeard42.github.io/homepage.ttf")
}

function setup() {
    let cnvs = createCanvas(windowWidth-15, windowHeight*0.9)
    cnvs.parent("canvas")
    colorMode(HSB, 100)
    noStroke()

    paddle = new Paddle()
    ball = new Ball()

    balls = 5
    score = 0
    level = 0
    brickcount = 0

    paused = true

    background(0)
}

function draw() {
    if(brickcount <= 0) buildLevel()
    textFont(font)
    if(keyIsPressed) controls = 0
    if(!paused) {
        background(0)

        ball.physc()
        ball.draw()

        paddle.controls()
        paddle.draw()

        bricks.forEach((b) => {
            if(b.on) b.draw()
        })
    } else {
        background(0)
        fill('white')
        textAlign(CENTER)
        textSize(width/50)

        if(balls>0) {
            ball.draw()
            paddle.draw()
            text("Press space or click to start", width/2, height/10)
            if(keyIsDown(32)) {
                paused = false
                controls = 0
            }
            if(mouseIsPressed) {
                paused = false
                controls = 1
            }
        } else {
            text("Game Over", width/2, height/10)
        }
    }
    data()
    
}

function buildLevel() {
    level++
    balls++
    brickcount = 120
    for(let x=0; x<20; x++) {
        for(let y=0; y<6; y++) {
            bricks.push(new Brick((x+0.5)*width/20, (y+2)*height/17, y*17))
        }
    }
}

function data() {
    let x = width/100
    for(let i=0; i<balls; i++) {
        push()
        rectMode(CENTER)
        fill("white")
        rect(x, height/40, height/40)
        pop()
        x+=width/60
    }
    textSize(width/65)
    textAlign(LEFT, TOP)
    text("SCORE: "+score+"   |   LEVEL: "+level, x, 5)
}