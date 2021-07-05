joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P14, joystickbit.ButtonType.down, function () {
    basic.showLeds(`
        # # # # .
        # . . . .
        # # # # .
        # . . . .
        # # # # .
        `)
    rychlost = -100
})
input.onButtonPressed(Button.A, function () {
    radio.sendString("A")
    basic.showLeds(`
        . # # . .
        # . . # .
        # # # # .
        # . . # .
        # . . # .
        `)
})
joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P15, joystickbit.ButtonType.down, function () {
    radio.sendString("F")
    basic.showLeds(`
        # # # # .
        # . . . .
        # # # # .
        # . . . .
        # . . . .
        `)
})
function nastavit_rychlost_Joystick () {
    y = joystickbit.getRockerValue(joystickbit.rockerType.Y)
    if (y > 600) {
        rychlost += Math.map(y, 600, 1023, 0, 4)
        if (rychlost > 100) {
            rychlost = 100
        }
    }
    if (y < 450) {
        rychlost += Math.map(y, 0, 450, -4, 0)
        if (rychlost < -100) {
            rychlost = -100
        }
    }
}
input.onButtonPressed(Button.AB, function () {
    radio.sendString("AB")
    basic.showLeds(`
        . # # # .
        # . # . #
        # # # # .
        # . # . #
        # . # # .
        `)
})
function vypis () {
    s += 1
    if (s > 9) {
        s = 0
        serial.writeLine("rychlost=" + convertToText(rychlost) + ", lv=" + convertToText(lavyMotor) + ", pv=" + convertToText(pravyMotor))
    }
}
input.onButtonPressed(Button.B, function () {
    radio.sendString("B")
    basic.showLeds(`
        # # # . .
        # . . # .
        # # # . .
        # . . # .
        # # # . .
        `)
})
function nastavit_rychlosti_motorov_Joystick () {
    x = joystickbit.getRockerValue(joystickbit.rockerType.X)
    if (x < 450) {
        lavyMotor = rychlost
        pravyMotor = rychlost * Math.map(x, 0, 450, 0.2, 1)
    } else if (x > 600) {
        lavyMotor = rychlost * Math.map(x, 600, 1023, 1, 0.2)
        pravyMotor = rychlost
    } else {
        lavyMotor = rychlost
        pravyMotor = rychlost
    }
    radio.sendValue("lv", lavyMotor)
    radio.sendValue("pv", lavyMotor)
}
joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P13, joystickbit.ButtonType.down, function () {
    basic.showLeds(`
        . # # # .
        # . # . #
        # . # . #
        . . # . .
        . . # . .
        `)
    rychlost = 100
})
joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P12, joystickbit.ButtonType.down, function () {
    radio.sendString("C")
    basic.showLeds(`
        # # # # .
        # . . # .
        # . . . .
        # . . # .
        # # # # .
        `)
})
input.onGesture(Gesture.ThreeG, function () {
    basic.showLeds(`
        . # # # .
        # # # # #
        # # . # #
        # # # # #
        . # # # .
        `)
    rychlost = 0
})
let x = 0
let pravyMotor = 0
let lavyMotor = 0
let y = 0
let s = 0
let rychlost = 0
serial.redirectToUSB()
joystickbit.initJoystickBit()
radio.setGroup(1)
basic.showIcon(IconNames.SmallSquare)
rychlost = 0
s = 0
/**
 * x=512; y=1023
 * 
 *                                                   |
 * 
 *                                                   |
 * 
 * x=1023; y=512 --------- x=512; y=512 ---------- x=0; y=512
 * 
 *                                                   |
 * 
 *                                                   |
 * 
 *                                        x=512; y=0
 */
basic.forever(function () {
    let modeJoystick = 0
    if (modeJoystick) {
        nastavit_rychlost_Joystick()
        nastavit_rychlosti_motorov_Joystick()
    } else {
    	
    }
    vypis()
    basic.pause(100)
})
