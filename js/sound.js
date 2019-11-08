let sonido = document.getElementById("sonido")
let tankOn = document.createElement('audio')

sonido.addEventListener('mouseenter', function (event) {
    console.log(sonido)
    tankOn.src = 'sound/engine.mp3'
    tankOn.volume = .7
    tankOn.play()
})

sonido.addEventListener('mouseout', function (event) {
    tankOn.pause()
})
