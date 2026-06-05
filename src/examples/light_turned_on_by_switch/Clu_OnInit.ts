// Script: toggles a light every time a switch is clicked.

import * as dIn from "../../digital-in-din/fv01_02/din"
import * as dOut from "../../io-module-din-8/fv02_02/dout"



declare const DIN6061: dIn.DInRaw; //Object Id for switch
declare const DOU9906: dOut.DOutRaw; //Object Id for light out

const lightSwitch = new dIn.DIn(DIN6061);
const light = new dOut.DOut(DOU9906);

lightSwitch.addOnClick(() => {
    light.switch(0)
});