class Bullets {
    constructor(ctx, width, heigth, posX, posY, velX, velY, origin) {
        this.ctx = ctx
        this.image = new Image()
        this.image.src = "./img/bullet.png"
        this.width = width
        this.heigth = heigth
        this.posX = posX
        this.posY = posY
        this.velX = velX
        this.velY = velY
        this.origin = origin

    }
    draw(angle) {
        this.move()
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.heigth)
    }
    move() {
        this.posX += this.velX
        this.posY += this.velY
        if (this.posY > window.innerHeight - this.heigth) {
            this.velY *= -1
        } else if (this.posY < this.heigth) {
            this.velY *= -1
        }
    }
}