/**
 * ================= Joystick ==================
 * 
 *                                        
 * 
 *                                       x=512; y=1023
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
joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P14, joystickbit.ButtonType.down, function () {
    radio.sendString("E")
    basic.showLeds(`
        # # # # .
        # . . . .
        # # # # .
        # . . . .
        # # # # .
        `)
    joystickbit.Vibration_Motor(100)
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
        # # # . .
        # . . . .
        # # # . .
        # . . . .
        # . . . .
        `)
    joystickbit.Vibration_Motor(100)
})
function nastavit_rychlost_Mikrobit () {
    yMikrobit = input.acceleration(Dimension.Y)
    if (yMikrobit < -200) {
        rychlost += Math.map(yMikrobit, -1100, -200, 8, 0)
        if (rychlost > 100) {
            rychlost = 100
        }
    } else if (yMikrobit > 200) {
        rychlost += Math.map(yMikrobit, 200, 1100, 0, -8)
        if (rychlost < -100) {
            rychlost = -100
        }
    }
}
function nastavit_rychlost_Joystick () {
    yJoyStick = joystickbit.getRockerValue(joystickbit.rockerType.Y)
    if (yJoyStick > 600) {
        rychlost += Math.map(yJoyStick, 600, 1023, 0, 3)
        if (rychlost > 100) {
            rychlost = 100
        }
    } else if (yJoyStick < 450) {
        rychlost += Math.map(yJoyStick, 0, 450, -3, 0)
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
        serial.writeLine("rychlost=" + convertToText(rychlost) + ", lv=" + convertToText(lavyMotor) + ", pv=" + convertToText(pravyMotor) + ", ak_x=" + input.acceleration(Dimension.X) + ", ak_y=" + input.acceleration(Dimension.Y))
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
function nastavit_rychlosti_motorov_Mikrobit () {
    xMikrobit = input.acceleration(Dimension.X)
    if (xMikrobit < -200) {
        pravyMotor = rychlost
        lavyMotor = rychlost * Math.map(xMikrobit, -1100, -200, 0.2, 1)
    } else if (xMikrobit > 600) {
        pravyMotor = rychlost * Math.map(xMikrobit, 200, 1100, 1, 0.2)
        lavyMotor = rychlost
    } else {
        lavyMotor = rychlost
        pravyMotor = rychlost
    }
}
function nastavit_rychlosti_motorov_Joystick () {
    xJoystick = joystickbit.getRockerValue(joystickbit.rockerType.X)
    if (xJoystick < 450) {
        lavyMotor = rychlost
        pravyMotor = rychlost * Math.map(xJoystick, 0, 450, 0.4, 1)
    } else if (xJoystick > 600) {
        lavyMotor = rychlost * Math.map(xJoystick, 600, 1023, 1, 0.4)
        pravyMotor = rychlost
    } else {
        lavyMotor = rychlost
        pravyMotor = rychlost
    }
}
input.onLogoEvent(TouchButtonEvent.Touched, function () {
    if (stop == 0) {
        stop = 1
        radio.sendValue("lv", 0)
        radio.sendValue("pv", 0)
        rychlost = 0
        soundExpression.spring.play()
        basic.showLeds(`
            # # # # #
            # # # # #
            # # . # #
            # # # # #
            # # # # #
            `)
    } else {
        stop = 0
        soundExpression.happy.play()
        basic.showLeds(`
            . . # . .
            . # # # .
            # . # . #
            . . # . .
            . . # . .
            `)
    }
})
joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P13, joystickbit.ButtonType.down, function () {
    radio.sendString("D")
    basic.showLeds(`
        # # # . .
        # . . # .
        # . . # .
        # . . # .
        # # # . .
        `)
    joystickbit.Vibration_Motor(100)
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
    joystickbit.Vibration_Motor(100)
})
let xJoystick = 0
let xMikrobit = 0
let pravyMotor = 0
let lavyMotor = 0
let yJoyStick = 0
let yMikrobit = 0
let s = 0
let rychlost = 0
let stop = 0
stop = 1
basic.showLeds(`
    # # # # #
    # # # # #
    # # . # #
    # # # # #
    # # # # #
    `)
let blinkDisplay = 0
serial.redirectToUSB()
joystickbit.initJoystickBit()
radio.setGroup(1)
rychlost = 0
s = 0
let modeJoystick = 1
soundExpression.hello.play()
basic.forever(function () {
    if (stop == 0) {
        if (modeJoystick == 1) {
            nastavit_rychlost_Joystick()
            nastavit_rychlosti_motorov_Joystick()
        } else {
            nastavit_rychlost_Mikrobit()
            nastavit_rychlosti_motorov_Mikrobit()
        }
        radio.sendValue("lv", lavyMotor)
        radio.sendValue("pv", pravyMotor)
    }
    basic.pause(100)
})
