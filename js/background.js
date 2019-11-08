class Background {
    constructor(ctx, w, h) {
        this.ctx = ctx
        this.width = w
        this.heigth = h
        this.image = new Image()
        this.image.src = "map/background.png"
        this.final = new Image()
        this.final.src = "map/explosion.png"
    }
    draw() {
        this.ctx.drawImage(this.image, 0, 0, this.width, this.heigth)
        // this.ctx.save()
    }
    finalDraw() {
        this.ctx.drawImage(this.final, this.width * .25, this.heigth * .40, this.width * .5, this.heigth * .45)
    }
}