class Player {
    constructor(ctx, w, h, type, posX, posY, trasX, trasY) {
        this.ctx = ctx
        this.gameWidth = w
        this.gameHeigth = h
        this.image = new Image()
        this.image.src = type == 'red' ? "../Game/img/redtank.png" : "../Game/img/greentank.png"
        this.bullets = []
        this.width = 61
        this.heigth = 87
        this.posX = posX
        this.posY = posY
        this.angle = 0
        this.trasX = trasX
        this.trasY = trasY
        this.velX = 2
        this.velY = 2
        this.life = 10
        this.active = {
            FIRE: false,
            UP: false,
            DOWN: false,
            RIGHT: false,
            LEFT: false
        }
    }
    draw() {
        this.ctx.save()
        // this.ctx.translate(this.posX + this.width / 2, this.posY + this.heigth / 2);
        // this.ctx.rotate((Math.PI / 180) * this.angle)
        // this.ctx.translate(-20, -40);
        this.ctx.drawImage(this.image, -this.posX / this.trasX, -this.posY / this.trasY, this.width, this.heigth)
        // this.ctx.restore()
    }
    moveUp() {
        if (this.active.UP == true) {
            this.posX += this.velX * Math.sin(this.angle * Math.PI / 180)
            this.posY += -(this.velY * Math.cos(this.angle * Math.PI / 180))
        }

    }
    moveDown() {
        if (this.active.DOWN == true) {
            this.posX += -(this.velX * Math.sin(this.angle * Math.PI / 180))
            this.posY += this.velY * Math.cos(this.angle * Math.PI / 180)
        }
    }
    turnRight() {
        if (this.active.RIGHT == true) {
            this.angle += 5
        }
    }
    turnLeft() {
        if (this.active.LEFT == true) {
            this.angle -= 5
        }
    }

}