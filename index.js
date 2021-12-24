const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")


canvas.width = 700
canvas.height = 700
function Vector(x, y, z) {
    this.x = x
    this.y = y
    this.z = z
}

let zoom = 30

let angle = 0

let mesh = {
    triangles: [
        [new Vector(-1, 1, -1), new Vector(-1, 1, 1), new Vector(0, 0, 0)],
        [new Vector(1, 1, -1), new Vector(1, 1, 1), new Vector(0, 0, 0)],
        [new Vector(-1, 1, -1), new Vector(1, 1, -1), new Vector(0, 0, 0)],
        [new Vector(-1, 1, 1), new Vector(1, 1, 1), new Vector(0, 0, 0)],
    ]
}
//Rotation
function rotateX(angle, vector) {
    const matrix = [
        [1, 0, 0],
        [0, Math.cos(angle), -Math.sin(angle)],
        [0, Math.sin(angle), Math.cos(angle)],
    ]
    let newX = vector.x * matrix[0][0] + vector.y * matrix[0][1] + vector.z * matrix[0][2]
    let newY = vector.x * matrix[1][0] + vector.y * matrix[1][1] + vector.z * matrix[1][2]
    let newZ = vector.x * matrix[2][0] + vector.y * matrix[2][1] + vector.z * matrix[2][2]
    return new Vector(newX, newY, newZ)
}
function rotateY(angle, vector) {
    const matrix = [
        [Math.cos(angle), 0, Math.sin(angle)],
        [0, 1, 0],
        [-Math.sin(angle), 0, Math.cos(angle)],
    ]
    let newX = vector.x * matrix[0][0] + vector.y * matrix[0][1] + vector.z * matrix[0][2]
    let newY = vector.x * matrix[1][0] + vector.y * matrix[1][1] + vector.z * matrix[1][2]
    let newZ = vector.x * matrix[2][0] + vector.y * matrix[2][1] + vector.z * matrix[2][2]
    return new Vector(newX, newY, newZ)
}
function rotateZ(angle, vector) {
    const matrix = [
        [Math.cos(angle), -Math.sin(angle), 0],
        [Math.sin(angle), Math.cos(angle), 0],
        [0, 0, 1],
    ]
    let newX = vector.x * matrix[0][0] + vector.y * matrix[0][1] + vector.z * matrix[0][2]
    let newY = vector.x * matrix[1][0] + vector.y * matrix[1][1] + vector.z * matrix[1][2]
    let newZ = vector.x * matrix[2][0] + vector.y * matrix[2][1] + vector.z * matrix[2][2]
    return new Vector(newX, newY, newZ)
}
function toPlane(vector) {
    return { x: vector.x, y: vector.y }
}
function drawLine(vector1, vector2, color = "#fff") {
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.moveTo(canvas.width / 2 + vector1.x * zoom, canvas.height / 2 + vector1.y * zoom)
    ctx.lineTo(canvas.width / 2 + vector2.x * zoom, canvas.height / 2 + vector2.y * zoom)
    ctx.stroke()
    ctx.closePath()
    ctx.strokeStyle = "#000"
}

function drawMesh(mesh, color = "#fff") {
    mesh.triangles.forEach(triangle => {
        triangle.map((vector, i) => {
            if (i == triangle.length - 1)
                drawLine(toPlane(rotateZ(angle,rotateY(angle, rotateX(angle, vector)))), toPlane(rotateZ(angle,rotateY(angle, rotateX(angle, triangle[0])))), color)
            else
                drawLine(toPlane(rotateZ(angle,rotateY(angle, rotateX(angle, vector)))), toPlane(rotateZ(angle,rotateY(angle, rotateX(angle, triangle[i + 1])))), color)
        })
    })
}
function draw() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height)
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    drawMesh(mesh, "#f36")
    angle += Math.PI / 180 * 1
    requestAnimationFrame(draw)
}

draw()