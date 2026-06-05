// Created from: src/interfaces/module_fibaro_dimmer_0.xml, object name="ZWAVE_DIMMER"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnValueChange = 0,
    OnSwitchOn = 1,
    OnSwitchOff = 2,
    OnValueRise = 3,
    OnValueLower = 4
}

enum PropertyType {
    Value = 0,
    MinValue = 1,
    MaxValue = 2,
    RampTime = 3
}

enum MethodType {
    Switch = 0,
    SwitchOn = 1,
    SwitchOff = 2,
    Hold = 3,
    HoldUp = 4,
    HoldDown = 5
}

declare class ZwaveDimmerRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface IZwaveDimmer {
    /** Zdarzenie wywoływane przy zmianie wartości ściemniacza */
    addOnValueChange: (callback: () => void) => void
    /** Zdarzenie wywoływane przy zmianie stanu ściemniacza na włączony (wartość większa niż MinValue) */
    addOnSwitchOn: (callback: () => void) => void
    /** Zdarzenie wywoływane przy zmianie stanu ściemniacza na wyłączony (wartość mniejsza lub równa MinValue) */
    addOnSwitchOff: (callback: () => void) => void
    /** Zdarzenie wywoływane przy wzroście wartości ściemniacza */
    addOnValueRise: (callback: () => void) => void
    /** Zdarzenie wywoływane przy spadku wartości ściemniacza */
    addOnValueLower: (callback: () => void) => void
    /** Aktualna wartość ściemniacza w procentach */
    value: number
    /** Minimalna wartość ściemniacza */
    minValue: number
    /** Maksymalna wartość ściemniacza */
    maxValue: number
    /** Wartość opóźnienia przy zmianie intensywności świecenia (w ms) */
    rampTime: number
    /** Przełącza stan ściemniacza na przeciwny (używając wartości MinValue i MaxValue) */
    switch: (time: number, rampTime?: number) => void
    /** Przełącza stan ściemniacza na włączony (używając wartości MaxValue) */
    switchOn: (time: number, rampTime?: number) => void
    /** Przełącza stan ściemniacza na wyłączony (używając wartości MinValue) */
    switchOff: (time: number, rampTime?: number) => void
    /** Rozpoczyna i przetrzymuje akcje płynnego rozjaśniania/ściemniania w kierunku przeciwnym do poprzedniego */
    hold: (rampTime?: number) => void
    /** Rozpoczyna i przetrzymuje akcje płynnego rozjaśniania */
    holdUp: (rampTime?: number) => void
    /** Rozpoczyna i przetrzymuje akcje płynnego ściemniania */
    holdDown: (rampTime?: number) => void
}

class ZwaveDimmer implements IZwaveDimmer {
    private onValueChangeCallbacks: Array<() => void> = [];
    private onSwitchOnCallbacks: Array<() => void> = [];
    private onSwitchOffCallbacks: Array<() => void> = [];
    private onValueRiseCallbacks: Array<() => void> = [];
    private onValueLowerCallbacks: Array<() => void> = [];

    constructor(private raw: ZwaveDimmerRaw) {
        this.raw.add_event(EventType.OnValueChange, () => {
            this.onValueChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnSwitchOn, () => {
            this.onSwitchOnCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnSwitchOff, () => {
            this.onSwitchOffCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnValueRise, () => {
            this.onValueRiseCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnValueLower, () => {
            this.onValueLowerCallbacks.forEach(callback => { callback(); });
        });
    }

    addOnValueChange(callback: () => void): void { this.onValueChangeCallbacks.push(callback); }
    addOnSwitchOn(callback: () => void): void { this.onSwitchOnCallbacks.push(callback); }
    addOnSwitchOff(callback: () => void): void { this.onSwitchOffCallbacks.push(callback); }
    addOnValueRise(callback: () => void): void { this.onValueRiseCallbacks.push(callback); }
    addOnValueLower(callback: () => void): void { this.onValueLowerCallbacks.push(callback); }

    get value(): number { return this.raw.get(PropertyType.Value); }
    set value(val: number) { this.raw.set(PropertyType.Value, val); }
    get minValue(): number { return this.raw.get(PropertyType.MinValue); }
    set minValue(val: number) { this.raw.set(PropertyType.MinValue, val); }
    get maxValue(): number { return this.raw.get(PropertyType.MaxValue); }
    set maxValue(val: number) { this.raw.set(PropertyType.MaxValue, val); }
    get rampTime(): number { return this.raw.get(PropertyType.RampTime); }
    set rampTime(val: number) { this.raw.set(PropertyType.RampTime, val); }

    switch(time: number, rampTime: number = 0): void {
        this.raw.execute(MethodType.Switch, time, rampTime);
    }
    switchOn(time: number, rampTime: number = 0): void {
        this.raw.execute(MethodType.SwitchOn, time, rampTime);
    }
    switchOff(time: number, rampTime: number = 0): void {
        this.raw.execute(MethodType.SwitchOff, time, rampTime);
    }
    hold(rampTime: number = 15000): void {
        this.raw.execute(MethodType.Hold, rampTime);
    }
    holdUp(rampTime: number = 15000): void {
        this.raw.execute(MethodType.HoldUp, rampTime);
    }
    holdDown(rampTime: number = 15000): void {
        this.raw.execute(MethodType.HoldDown, rampTime);
    }
}

class ZwaveDimmerRemote implements IZwaveDimmer {
    constructor(private objectName: string, private gate: RemoteGate) {}

    addOnValueChange(_callback: () => void): void { /* Remote events are not supported */ }
    addOnSwitchOn(_callback: () => void): void { /* Remote events are not supported */ }
    addOnSwitchOff(_callback: () => void): void { /* Remote events are not supported */ }
    addOnValueRise(_callback: () => void): void { /* Remote events are not supported */ }
    addOnValueLower(_callback: () => void): void { /* Remote events are not supported */ }

    get value(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Value).build();
        return this.gate.runScript(cmd!);
    }
    set value(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.Value).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
    get minValue(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.MinValue).build();
        return this.gate.runScript(cmd!);
    }
    set minValue(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.MinValue).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
    get maxValue(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.MaxValue).build();
        return this.gate.runScript(cmd!);
    }
    set maxValue(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.MaxValue).addParameter(val).build();
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

    switch(time: number, rampTime: number = 0): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.Switch).addParameter(time).addParameter(rampTime).build();
        this.gate.runScript(cmd!);
    }
    switchOn(time: number, rampTime: number = 0): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SwitchOn).addParameter(time).addParameter(rampTime).build();
        this.gate.runScript(cmd!);
    }
    switchOff(time: number, rampTime: number = 0): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SwitchOff).addParameter(time).addParameter(rampTime).build();
        this.gate.runScript(cmd!);
    }
    hold(rampTime: number = 15000): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.Hold).addParameter(rampTime).build();
        this.gate.runScript(cmd!);
    }
    holdUp(rampTime: number = 15000): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.HoldUp).addParameter(rampTime).build();
        this.gate.runScript(cmd!);
    }
    holdDown(rampTime: number = 15000): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.HoldDown).addParameter(rampTime).build();
        this.gate.runScript(cmd!);
    }
}

export { ZwaveDimmer, ZwaveDimmerRaw, ZwaveDimmerRemote }
