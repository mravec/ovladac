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
    modeJoystick = 0
    basic.showLeds(`
        . . # . .
        . . # . .
        # # # # #
        . . # . .
        . . # . .
        `)
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
        rychlost += Math.map(yJoyStick, 600, 1023, 0, 8)
        if (rychlost > 100) {
            rychlost = 100
        }
    } else if (yJoyStick < 450) {
        rychlost += Math.map(yJoyStick, 0, 450, -8, 0)
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
        lavyMotor = rychlost
        pravyMotor = rychlost * Math.map(xMikrobit, -1100, -200, 0.2, 1)
    } else if (xMikrobit > 600) {
        lavyMotor = rychlost * Math.map(xMikrobit, 200, 1100, 1, 0.2)
        pravyMotor = rychlost
    } else {
        lavyMotor = rychlost
        pravyMotor = rychlost
    }
}
function nastavit_rychlosti_motorov_Joystick () {
    xJoystick = joystickbit.getRockerValue(joystickbit.rockerType.X)
    if (xJoystick < 450) {
        lavyMotor = rychlost
        pravyMotor = rychlost * Math.map(xJoystick, 0, 450, 0.2, 1)
    } else if (xJoystick > 600) {
        lavyMotor = rychlost * Math.map(xJoystick, 600, 1023, 1, 0.2)
        pravyMotor = rychlost
    } else {
        lavyMotor = rychlost
        pravyMotor = rychlost
    }
}
input.onLogoEvent(TouchButtonEvent.Touched, function () {
    basic.showLeds(`
        . # # # .
        # # # # #
        # # . # #
        # # # # #
        . # # # .
        `)
    rychlost = 0
})
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
    modeJoystick = 1
    basic.showLeds(`
        . # # # .
        # . # . #
        . . # . .
        # . # . #
        . # # # .
        `)
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
	
})
let xJoystick = 0
let xMikrobit = 0
let pravyMotor = 0
let lavyMotor = 0
let yJoyStick = 0
let yMikrobit = 0
let modeJoystick = 0
let s = 0
let rychlost = 0
serial.redirectToUSB()
joystickbit.initJoystickBit()
radio.setGroup(1)
basic.showIcon(IconNames.SmallSquare)
rychlost = 0
s = 0
modeJoystick = 1
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
basic.forever(function () {
    if (modeJoystick == 1) {
        nastavit_rychlost_Joystick()
        nastavit_rychlosti_motorov_Joystick()
    } else {
        nastavit_rychlost_Mikrobit()
        nastavit_rychlosti_motorov_Mikrobit()
    }
    radio.sendValue("lv", lavyMotor)
    radio.sendValue("pv", lavyMotor)
    vypis()
    basic.pause(100)
})
