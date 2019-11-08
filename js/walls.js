class Walls {
    constructor(ctx, beginX, beginY, endX, endY) {
        this.ctx = ctx
        this.color = "#3D7D48"
        this.beginX = beginX
        this.beginY = beginY
        this.endX = endX
        this.endY = endY
        this.width = 30
        this.line = 15
        this.gap = 1

    }
    draw() {
        this.ctx.strokeStyle = this.color
        this.ctx.lineWidth = this.width
        this.ctx.beginPath()
        this.ctx.setLineDash([this.line, this.gap])
        this.ctx.moveTo(this.beginX, this.beginY)
        this.ctx.lineTo(this.endX, this.endY)
        this.ctx.stroke()
    }
}