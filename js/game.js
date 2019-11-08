const game = {
    title: "Tank Party",
    author: "Marvin",
    liscense: undefined,
    version: "1.0",
    canvas: undefined,
    ctx: undefined,
    wWidth: undefined,
    wHeight: undefined,
    background: undefined,
    fps: 60,
    framesCounter: 0,
    bullets: [],
    wallsArr: [],
    music: new Audio('sound/sound.mp3'),
    keys: {
        SHIFT: 16,
        A: 65,
        S: 83,
        D: 68,
        W: 87,
        UP: 38,
        RIGTH: 39,
        DOWN: 40,
        LEFT: 37,
        SLASH: 191
    },
    ini() {
        this.canvas = document.getElementById('Mycanvas')
        this.ctx = this.canvas.getContext('2d')
        this.canvas.setAttribute('height', window.innerHeight)
        this.canvas.setAttribute('width', window.innerWidth)
        this.wWidth = window.innerWidth
        this.wHeight = window.innerHeight
        this.background = new Background(this.ctx, this.wWidth, this.wHeight)
        this.wallsArr.push(
            new Walls(this.ctx, this.wWidth * .2, this.wHeight * .15, this.wWidth * .2, this.wHeight * .31),
            new Walls(this.ctx, this.wWidth * .2, this.wHeight * .6, this.wWidth * .2, this.wHeight * .76),
            new Walls(this.ctx, this.wWidth * .38, this.wHeight * .4, this.wWidth * .38, this.wHeight * .56),
            new Walls(this.ctx, this.wWidth * .65, this.wHeight * .4, this.wWidth * .65, this.wHeight * .56),
            new Walls(this.ctx, this.wWidth * .82, this.wHeight * .15, this.wWidth * .82, this.wHeight * .31),
            new Walls(this.ctx, this.wWidth * .82, this.wHeight * .6, this.wWidth * .82, this.wHeight * .76))
        this.tank1 = new Player(this.ctx, this.wWidth, this.wHeight, "red", this.wWidth / 16, this.wHeight / 16, 20, 40)
        this.tank2 = new Player(this.ctx, this.wWidth, this.wHeight, "green", (this.wWidth - (this.wWidth / 10)), (this.wHeight - (this.wHeight / 5)), 300, 300)
        this.setEventListenersOn()
        this.setEventListenersOff()
        this.start()

    },
    start() {
        this.test = false
        this.interval = setInterval(() => {
            this.framesCounter++
            this.framesCounter > 800 ? this.framesCounter = 0 : null
            this.clear()
            this.drawAll()
            this.moveBullet()
            this.clearBullet()
            if (this.tank1.posX <= 0) {
                this.tank1.posX += 5
            } else if (this.tank1.posY <= 0) {
                this.tank1.posY += 5
            } else if (this.tank1.posX >= this.wWidth - this.tank1.width * 1.2) {
                this.tank1.posX -= 5
            } else if (this.tank1.posY >= this.wHeight - this.tank1.heigth * 1.2) {
                this.tank1.posY -= 5
            }
            else {
                this.tank1.moveUp()
                this.tank1.moveDown()
            }
            if (this.tank2.posX <= 0) {
                this.tank2.posX += 5
            } else if (this.tank2.posY <= 0) {
                this.tank2.posY += 5
            } else if (this.tank2.posX >= this.wWidth - this.tank2.width * 1.2) {
                this.tank2.posX -= 5
            } else if (this.tank2.posY >= this.wHeight - this.tank2.heigth * 1.2) {
                this.tank2.posY -= 5
            }
            else {
                this.tank2.moveUp()
                this.tank2.moveDown()
            }
            this.tank1.turnRight()
            this.tank1.turnLeft()
            this.tank2.turnLeft()
            this.tank2.turnRight()
            this.isCollitionTank()
            this.isCollitionWall()
            this.isCollitionBullet()
            this.scoreBoard()
            this.gameOver()
            this.backgroundMusic()
        }, 1000 / this.fps)
    },
    reset() {
        this.background = new Background(this.ctx, this.wWidth, this.wHeight, '../Game/map/bg.png')
    },
    clear() {
        this.ctx.clearRect(0, 0, this.wWidth, this.wHeight)
    },
    drawAll() {

        this.background.draw()
        this.wallsArr.forEach(wall => wall.draw())
        this.tank1.draw()
        this.tank2.draw()


    },
    setEventListenersOn() {
        document.addEventListener("keydown", e => {
            switch (e.keyCode) {
                case this.keys.A:
                    this.tank1.active.LEFT = true
                    break
                case this.keys.D:
                    this.tank1.active.RIGHT = true
                    break
                case this.keys.W:
                    this.tank1.active.UP = true
                    break
                case this.keys.S:
                    this.tank1.active.DOWN = true
                    break
                case this.keys.UP:
                    this.tank2.active.UP = true
                    break
                case this.keys.DOWN:
                    this.tank2.active.DOWN = true
                    break
                case this.keys.RIGTH:
                    this.tank2.active.RIGHT = true
                    break
                case this.keys.LEFT:
                    this.tank2.active.LEFT = true
                    break
                case this.keys.SHIFT:
                    this.newBullet(this.tank1.angle, this.tank1.posX, this.tank1.posY, "tank1")
                    let shot1 = document.createElement("audio")
                    shot1.src = "sound/gunshot.mp3"
                    shot1.volume = .5
                    shot1.play()
                    break
                case this.keys.SLASH:
                    this.newBullet(this.tank2.angle, this.tank2.posX, this.tank2.posY, "tank2")
                    let shot2 = document.createElement('audio')
                    shot2.src = "sound/gunshot.mp3"
                    shot2.volume = .5
                    shot2.play()
                    break

            }

        })
    },
    setEventListenersOff() {
        document.addEventListener("keyup", e => {
            switch (e.keyCode) {
                case this.keys.A:
                    this.tank1.active.LEFT = false
                    break
                case this.keys.D:
                    this.tank1.active.RIGHT = false
                    break
                case this.keys.W:
                    this.tank1.active.UP = false
                    break
                case this.keys.S:
                    this.tank1.active.DOWN = false
                    break
                case this.keys.UP:
                    this.tank2.active.UP = false
                    break
                case this.keys.DOWN:
                    this.tank2.active.DOWN = false
                    break
                case this.keys.RIGTH:
                    this.tank2.active.RIGHT = false
                    break
                case this.keys.LEFT:
                    this.tank2.active.LEFT = false
                    break
            }
        })
    },
    newBullet(angle, posX, posY, origin) {
        angle -= 90
        let velX = Math.cos(angle * Math.PI / 180) * 15
        let velY = Math.sin(angle * Math.PI / 180) * 15
        let bullet = new Bullets(this.ctx, 20, 20, posX + (this.tank1.width / 2), posY + (this.tank1.heigth / 2), velX, velY, origin)
        this.bullets.push(bullet)
    },
    moveBullet() {
        this.bullets.forEach(bullet => bullet.draw())
    },
    clearBullet() {
        this.bullets.forEach((bullet, index) => {
            !(bullet.posX > 0 && bullet.posX < this.wWidth && bullet.posY > 0 && bullet.posY < this.wHeight) ? this.bullets.splice(index, 1) : null
            //Creo una caja de colision que si no se cumple elimina del array el bullet 
        })
    },
    isCollitionTank() {

        this.bullets.forEach((e, index) => {
            if (e.origin == "tank1") {
                if (this.tank2.posX + this.tank2.width >= e.posX && this.tank2.posX <= (e.posX + e.width) && this.tank2.posY + this.tank2.heigth >= e.posY && this.tank2.posY <= e.posY + e.heigth) {
                    this.tank2.life--
                    this.bullets.splice(index, 1)
                } else if (this.tank1.posX >= e.posX && this.tank1.posX <= (e.posX + e.width) && this.tank1.posY >= e.posY && this.tank1.posY <= e.posY + e.heigth) {
                    this.tank1.life--
                    this.bullets.splice(index, 1)
                }
            } else if (e.origin == "tank2") {
                if (this.tank1.posX + this.tank1.width >= e.posX && this.tank1.posX <= (e.posX + e.width) && this.tank1.posY + this.tank1.heigth >= e.posY && this.tank1.posY <= e.posY + e.heigth) {
                    this.tank1.life--
                    this.bullets.splice(index, 1)
                } else if (this.tank2.posX >= e.posX && this.tank2.posX <= (e.posX + e.width) && this.tank2.posY >= e.posY && this.tank2.posY <= e.posY + e.heigth) {
                    this.tank2.life--
                    this.bullets.splice(index, 1)
                }
            }

        }
        )

    },
    isCollitionWall() {
        this.wallsArr.some(wall => {
            if (this.tank1.posX + this.tank1.width >= wall.beginX && this.tank1.posX <= (wall.beginX + wall.width) && this.tank1.posY + this.tank1.heigth >= wall.beginY && this.tank1.posY <= wall.beginY + (wall.endY - wall.beginY)) {
                if (this.tank1.posX + this.tank1.heigth >= wall.beginX) {
                    this.tank1.active.UP = false
                }
            } else if (this.tank2.posX + this.tank2.width >= wall.beginX && this.tank2.posX <= (wall.beginX + wall.width) && this.tank2.posY + this.tank2.heigth >= wall.beginY && this.tank2.posY <= wall.beginY + (wall.endY - wall.beginY)) {
                if (this.tank2.posX + this.tank2.heigth >= wall.beginX) {
                    this.tank2.active.UP = false
                }
            }
        })
    },
    isCollitionBullet() {
        this.bullets.some(bul => {
            this.wallsArr.some(wall => {
                if (bul.posX + bul.width >= wall.beginX && bul.posX <= (wall.beginX + wall.width) && bul.posY + bul.heigth >= wall.beginY && bul.posY <= wall.beginY + (wall.endY - wall.beginY)) {
                    if (bul.posX + bul.width >= wall.beginX || bul.posX <= (wall.beginX + wall.width)) {
                        bul.velX *= -1
                    } else if (bul.posY + (bul.heigth) >= wall.beginY || bul.posY <= wall.beginY + (wall.endY - wall.beginY)) {
                        bul.velY *= -1
                    }
                }
            })
        })
    },
    scoreBoard() {
        this.ctx.font = '48px serif'
        this.ctx.fillText(`Life ${this.tank1.life}`, this.wWidth * 0.05, this.wHeight * .90)
        this.ctx.fillText(`Life ${this.tank2.life}`, this.wWidth * .85, this.wHeight * .1)
    },
    gameOver() {
        if (this.tank1.life == 0 || this.tank2.life == 0) {
            this.ctx.font = '150px serif'
            this.ctx.fillStyle = 'red'
            this.ctx.fillText("GAME OVER", this.wWidth * .18, this.wHeight * .20)
            this.background.finalDraw()
            clearInterval(this.interval)


        }
    },
    backgroundMusic() {
        this.music.volume = .3
        this.music.play()
    }
}