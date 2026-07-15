// Created from: src/interfaces/module_fibaro_rgbw_ff.xml, object name="ZWAVE_RGBW_LED"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnChange = 0,
    OnSwitchOn = 1,
    OnSwitchOff = 2
}

enum PropertyType {
    Red = 0,
    Green = 1,
    Blue = 2,
    White = 3,
    RampTime = 8
}

enum MethodType {
    SetRed = 0,
    SetGreen = 1,
    SetBlue = 2,
    SetWhite = 3,
    SetRampTime = 8
}

declare class ZwaveRgbwLedRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface IZwaveRgbwLed {
    /** Zdarzenie wywoływane przy zmianie wartości modułu */
    addOnChange: (callback: () => void) => void
    /** Zdarzenie wywoływane przy zmianie stanu na włączony */
    addOnSwitchOn: (callback: () => void) => void
    /** Zdarzenie wywoływane przy zmianie stanu modułu na wyłączony) */
    addOnSwitchOff: (callback: () => void) => void
    /** Wartość składowej R(0-255) - kolor czerwony */
    red: number
    /** Wartość składowej G(0-255) - kolor zielony */
    green: number
    /** Wartość składowej B(0-255) - kolor niebieski */
    blue: number
    /** Wartość składowej W(0-255) - kolor biały */
    white: number
    /** Czas narastania/opadania zmiany wartości modułu w milisekundach */
    rampTime: number
    /** Ustawia wartość składowej R(0-255) - kolor czerwony */
    setRed: (value: number) => void
    /** Ustawia wartość składowej G(0-255) - kolor zielony */
    setGreen: (value: number) => void
    /** Ustawia wartość składowej B(0-255) - kolor niebieski */
    setBlue: (value: number) => void
    /** Ustawia wartość składowej W(0-255) - kolor biały */
    setWhite: (value: number) => void
    /** Ustawia czas narastania/opadania zmiany wartości modułu */
    setRampTime: (rampTime: number) => void
}

class ZwaveRgbwLed implements IZwaveRgbwLed {
    private onChangeCallbacks: Array<() => void> = [];
    private onSwitchOnCallbacks: Array<() => void> = [];
    private onSwitchOffCallbacks: Array<() => void> = [];

    constructor(private raw: ZwaveRgbwLedRaw) {
        this.raw.add_event(EventType.OnChange, () => {
            this.onChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnSwitchOn, () => {
            this.onSwitchOnCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnSwitchOff, () => {
            this.onSwitchOffCallbacks.forEach(callback => { callback(); });
        });
    }

    addOnChange(callback: () => void): void { this.onChangeCallbacks.push(callback); }
    addOnSwitchOn(callback: () => void): void { this.onSwitchOnCallbacks.push(callback); }
    addOnSwitchOff(callback: () => void): void { this.onSwitchOffCallbacks.push(callback); }

    get red(): number { return this.raw.get(PropertyType.Red); }
    set red(val: number) { this.raw.set(PropertyType.Red, val); }
    get green(): number { return this.raw.get(PropertyType.Green); }
    set green(val: number) { this.raw.set(PropertyType.Green, val); }
    get blue(): number { return this.raw.get(PropertyType.Blue); }
    set blue(val: number) { this.raw.set(PropertyType.Blue, val); }
    get white(): number { return this.raw.get(PropertyType.White); }
    set white(val: number) { this.raw.set(PropertyType.White, val); }
    get rampTime(): number { return this.raw.get(PropertyType.RampTime); }
    set rampTime(val: number) { this.raw.set(PropertyType.RampTime, val); }

    setRed(value: number): void { this.raw.execute(MethodType.SetRed, value); }
    setGreen(value: number): void { this.raw.execute(MethodType.SetGreen, value); }
    setBlue(value: number): void { this.raw.execute(MethodType.SetBlue, value); }
    setWhite(value: number): void { this.raw.execute(MethodType.SetWhite, value); }
    setRampTime(rampTime: number): void { this.raw.execute(MethodType.SetRampTime, rampTime); }
}

class ZwaveRgbwLedRemote implements IZwaveRgbwLed {
    constructor(private objectName: string, private gate: RemoteGate) {}

    addOnChange(_callback: () => void): void { /* Remote events are not supported */ }
    addOnSwitchOn(_callback: () => void): void { /* Remote events are not supported */ }
    addOnSwitchOff(_callback: () => void): void { /* Remote events are not supported */ }

    get red(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Red).build();
        return this.gate.runScript(cmd!);
    }
    set red(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.Red).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
    get green(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Green).build();
        return this.gate.runScript(cmd!);
    }
    set green(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.Green).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
    get blue(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Blue).build();
        return this.gate.runScript(cmd!);
    }
    set blue(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.Blue).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
    get white(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.White).build();
        return this.gate.runScript(cmd!);
    }
    set white(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.White).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
    get rampTime(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.RampTime).build();
        return this.gate.runScript(cmd!);
    }
    set rampTime(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.RampTime).addParameter(val).build();
        this.gate.runScript(cmd!);
    }

    setRed(value: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SetRed).addParameter(value).build();
        this.gate.runScript(cmd!);
    }
    setGreen(value: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SetGreen).addParameter(value).build();
        this.gate.runScript(cmd!);
    }
    setBlue(value: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SetBlue).addParameter(value).build();
        this.gate.runScript(cmd!);
    }
    setWhite(value: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SetWhite).addParameter(value).build();
        this.gate.runScript(cmd!);
    }
    setRampTime(rampTime: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SetRampTime).addParameter(rampTime).build();
        this.gate.runScript(cmd!);
    }
}

export { ZwaveRgbwLed, ZwaveRgbwLedRaw, ZwaveRgbwLedRemote }
