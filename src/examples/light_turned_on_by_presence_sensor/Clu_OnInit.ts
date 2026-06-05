// Script: switches on light when presence sensor is triggered.

import * as dIn from "../../digital-in-din/fv01_02/din"
import * as dOut from "../../io-module-din-8/fv02_02/dout"
import * as pre from "../../clu/presence-sensor/v2/presence-sensor"


declare const DIN4819: dIn.DInRaw; //Presence sensor contact Object Id
declare const PRE6713: pre.PresenceSensorRaw; //Presence sensor Object Id
declare const DOU3948: dOut.DOutRaw; //Light circuit Object Id

const garagePresenceSensorContact = new dIn.DIn(DIN4819);
const garagePresenseSensor = new pre.PresenceSensor(PRE6713);
const light = new dOut.DOut(DOU3948);

//Setup
garagePresenseSensor.timeout = 60; // 60 seconds

//ImpulseInput mode means that the presence sensor will switch on when presence is detected and switch off after the timeout has passed without detecting presence. The presence sensor will not switch off if the contact is opened, it will only reset the timeout. This means that if the contact is opened while presence is detected, the light will stay on until the timeout has passed without detecting presence.
garagePresenseSensor.mode = pre.ModeType.ImpulseInput; 

garagePresenceSensorContact.addOnSwitchOff(() => {
    //Trigger presence detection when the contact is opened.
    garagePresenseSensor.detectPresence();
});

garagePresenseSensor.addOnSwitchOn(() => {
    //Switch on the light when presence is detected.
    light.switchOn(0);
});

garagePresenseSensor.addOnSwitchOff(() => {
    //Switch off the light when presence is no longer detected and the timeout has passed.
    light.switchOff(0);
});
