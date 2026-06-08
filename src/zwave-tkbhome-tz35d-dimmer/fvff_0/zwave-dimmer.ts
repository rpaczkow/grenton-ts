// Created from: src/interfaces/module_tkbhome_tz35d_ff.xml, object name="ZWAVE_DIMMER"

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
    MaxValue = 2
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
    /** Minimalna wartość ściemniacza w procentach */
    minValue: number
    /** Maksymalna wartość ściemniacza w procentach */
    maxValue: number
    /** Przełącza stan ściemniacza na przeciwny (używając wartości MinValue i MaxValue)\nTime - czas, na jaki ściemniacz ma zostać przełączony (wartość 0 oznacza czas nieograniczony) */
    switch: (time?: number) => void
    /** Przełącza stan ściemniacza na włączony (używając wartości MaxValue)\nTime - czas, na jaki ściemniacz ma zostać przełączony (wartość 0 oznacza czas nieograniczony) */
    switchOn: (time?: number) => void
    /** Przełącza stan ściemniacza na wyłączony (używając wartości MinValue)\nTime - czas, na jaki ściemniacz ma zostać przełączony (wartość 0 oznacza czas nieograniczony) */
    switchOff: (time?: number) => void
    /** Rozpoczyna i przetrzymuje akcje płynnego rozjaśniania/ściemniania w kierunku przeciwnym do poprzedniego */
    hold: () => void
    /** Rozpoczyna i przetrzymuje akcje płynnego rozjaśniania */
    holdUp: () => void
    /** Rozpoczyna i przetrzymuje akcje płynnego ściemniania */
    holdDown: () => void
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

    switch(time: number = 0): void { this.raw.execute(MethodType.Switch, time); }
    switchOn(time: number = 0): void { this.raw.execute(MethodType.SwitchOn, time); }
    switchOff(time: number = 0): void { this.raw.execute(MethodType.SwitchOff, time); }
    hold(): void { this.raw.execute(MethodType.Hold); }
    holdUp(): void { this.raw.execute(MethodType.HoldUp); }
    holdDown(): void { this.raw.execute(MethodType.HoldDown); }
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

    switch(time: number = 0): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.Switch).addParameter(time).build();
        this.gate.runScript(cmd!);
    }
    switchOn(time: number = 0): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SwitchOn).addParameter(time).build();
        this.gate.runScript(cmd!);
    }
    switchOff(time: number = 0): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SwitchOff).addParameter(time).build();
        this.gate.runScript(cmd!);
    }
    hold(): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.Hold).build();
        this.gate.runScript(cmd!);
    }
    holdUp(): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.HoldUp).build();
        this.gate.runScript(cmd!);
    }
    holdDown(): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.HoldDown).build();
        this.gate.runScript(cmd!);
    }
}

export { ZwaveDimmer, ZwaveDimmerRaw, ZwaveDimmerRemote }
