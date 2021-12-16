// When the "A" button is pressed, a laser is shot upward from the ship.
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    laser = sprites.createProjectileFromSprite(img`
        . . . . . . . . 2 . . . . . . . 
        . . . . . . . . 2 . . . . . . . 
        . . . . . . . . 2 . . . . . . . 
        . . . . . . . . 2 . . . . . . . 
        . . . . . . . . 2 . . . . . . . 
        . . . . . . . . 2 . . . . . . . 
        . . . . . . . . 2 . . . . . . . 
        . . . . . . . . 2 . . . . . . . 
        . . . . . . . . 2 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, ship, 0, -100)
})
function setRules () {
    info.setLife(3)
    info.setScore(0)
}
function buildShip () {
    ship = sprites.create(img`
        . . . . . . . c d . . . . . . . 
        . . . . . . . c d . . . . . . . 
        . . . . . . . c d . . . . . . . 
        . . . . . . . c b . . . . . . . 
        . . . . . . . f f . . . . . . . 
        . . . . . . . c 7 . . . . . . . 
        . . . . . . . f f . . . . . . . 
        . . . . . . . 8 7 . . . . . . . 
        . . . . . . 8 8 5 6 . . . . . . 
        . . . . . . 8 7 5 6 . . . . . . 
        . . . . . c c c 6 6 6 . . . . . 
        . . . . 8 8 7 7 7 5 6 6 . . . . 
        . . 8 f f f c c 6 6 f f 6 6 . . 
        . 8 8 8 8 6 6 7 7 7 7 5 7 6 6 . 
        8 8 8 8 8 8 6 6 7 7 7 5 7 7 6 6 
        8 8 8 8 8 8 6 6 7 7 7 7 5 7 6 6 
        `, SpriteKind.Player)
    ship.setPosition(75, 110)
    controller.moveSprite(ship, 150, 150)
    ship.setFlag(SpriteFlag.StayInScreen, true)
}
function setDifficulty () {
    game.showLongText("Choose your difficulty", DialogLayout.Bottom)
    difficulty = game.askForNumber("153151:Easy 253151:Medium 353151:Hard")
}
function makeAstroids () {
    asteroid = sprites.create(img`
        . . . . . . . . c c c c . . . . 
        . . . . c c c c c c c c c . . . 
        . . . c f c c a a a a c a c . . 
        . . c c f f f f a a a c a a c . 
        . . c c a f f c a a f f f a a c 
        . . c c a a a a b c f f f a a c 
        . c c c c a c c b a f c a a c c 
        c a f f c c c a b b 6 b b b c c 
        c a f f f f c c c 6 b b b a a c 
        c a a c f f c a 6 6 b b b a a c 
        c c b a a a a b 6 b b a b b a . 
        . c c b b b b b b b a c c b a . 
        . . c c c b c c c b a a b c . . 
        . . . . c b a c c b b b c . . . 
        . . . . c b b a a 6 b c . . . . 
        . . . . . . b 6 6 c c . . . . . 
        `, SpriteKind.Enemy)
    asteroid.setPosition(randint(0, 150), 0)
    asteroid.setVelocity(0, 50)
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy()
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy()
})
let asteroid: Sprite = null
let difficulty = 0
let ship: Sprite = null
let laser: Sprite = null
setDifficulty()
buildShip()
setRules()
game.onUpdateInterval(500, function () {
    if (difficulty == 153151) {
        for (let index = 0; index < 1; index++) {
            makeAstroids()
        }
    } else if (difficulty == 253151) {
        for (let index = 0; index < 2; index++) {
            makeAstroids()
        }
    } else {
        for (let index = 0; index < 3; index++) {
            makeAstroids()
        }
    }
})
