// Created from: src/interfaces/module_philio_psm01_0.xml, object name="ZWAVE_ANALOG_SENSOR"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnValueChange = 0,
    OnValueRise = 1,
    OnValueLower = 2,
    OnOutOfRange = 3,
    OnInRange = 4
}

enum PropertyType {
    Value = 0,
    MinValue = 1,
    MaxValue = 2
}

enum MethodType {
    SetMinValue = 1,
    SetMaxValue = 2
}

declare class ZwaveAnalogSensorRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface IZwaveAnalogSensor {
    /** Zdarzenie wywoływane przy zmianie wartości sensora */
    addOnValueChange: (callback: () => void) => void
    /** Zdarzenie wywoływane przy zmianie wartości sensora na wyższą niż poprzednia */
    addOnValueRise: (callback: () => void) => void
    /** Zdarzenie wywoływane przy zmianie wartości sensora na niższą niż poprzednia */
    addOnValueLower: (callback: () => void) => void
    /** Zdarzenie wywoływane przy przekroczeniu jednej z wartości progowych MinValue - MaxValue */
    addOnOutOfRange: (callback: () => void) => void
    /** Zdarzenie wywoływane przy powrocie wartości do przedziału wewnątrz wartości progowych MinValue - MaxValue */
    addOnInRange: (callback: () => void) => void
    /** Aktualna wartość sensora */
    readonly value: number
    /** Wartość, poniżej której generowane jest zdarzenie OnOutOfRange */
    minValue: number
    /** Wartość, powyżej której generowane jest zdarzenie OnOutOfRange */
    maxValue: number
    /** Ustawia dolna wartość progowa zdarzenia OnOutOfRange */
    setMinValue: (minValue: number) => void
    /** Ustawia górna wartość progowa zdarzenia OnOutOfRange */
    setMaxValue: (maxValue: number) => void
}

class ZwaveAnalogSensor implements IZwaveAnalogSensor {
    private onValueChangeCallbacks: Array<() => void> = [];
    private onValueRiseCallbacks: Array<() => void> = [];
    private onValueLowerCallbacks: Array<() => void> = [];
    private onOutOfRangeCallbacks: Array<() => void> = [];
    private onInRangeCallbacks: Array<() => void> = [];

    constructor(private raw: ZwaveAnalogSensorRaw) {
        this.raw.add_event(EventType.OnValueChange, () => {
            this.onValueChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnValueRise, () => {
            this.onValueRiseCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnValueLower, () => {
            this.onValueLowerCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnOutOfRange, () => {
            this.onOutOfRangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnInRange, () => {
            this.onInRangeCallbacks.forEach(callback => { callback(); });
        });
    }

    addOnValueChange(callback: () => void): void { this.onValueChangeCallbacks.push(callback); }
    addOnValueRise(callback: () => void): void { this.onValueRiseCallbacks.push(callback); }
    addOnValueLower(callback: () => void): void { this.onValueLowerCallbacks.push(callback); }
    addOnOutOfRange(callback: () => void): void { this.onOutOfRangeCallbacks.push(callback); }
    addOnInRange(callback: () => void): void { this.onInRangeCallbacks.push(callback); }

    get value(): number { return this.raw.get(PropertyType.Value); }
    get minValue(): number { return this.raw.get(PropertyType.MinValue); }
    set minValue(val: number) { this.raw.set(PropertyType.MinValue, val); }
    get maxValue(): number { return this.raw.get(PropertyType.MaxValue); }
    set maxValue(val: number) { this.raw.set(PropertyType.MaxValue, val); }

    setMinValue(minValue: number): void { this.raw.execute(MethodType.SetMinValue, minValue); }
    setMaxValue(maxValue: number): void { this.raw.execute(MethodType.SetMaxValue, maxValue); }
}

class ZwaveAnalogSensorRemote implements IZwaveAnalogSensor {
    constructor(private objectName: string, private gate: RemoteGate) {}

    addOnValueChange(_callback: () => void): void { /* Remote events are not supported */ }
    addOnValueRise(_callback: () => void): void { /* Remote events are not supported */ }
    addOnValueLower(_callback: () => void): void { /* Remote events are not supported */ }
    addOnOutOfRange(_callback: () => void): void { /* Remote events are not supported */ }
    addOnInRange(_callback: () => void): void { /* Remote events are not supported */ }

    get value(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Value).build();
        return this.gate.runScript(cmd!);
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

    setMinValue(minValue: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SetMinValue).addParameter(minValue).build();
        this.gate.runScript(cmd!);
    }
    setMaxValue(maxValue: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SetMaxValue).addParameter(maxValue).build();
        this.gate.runScript(cmd!);
    }
}

export { ZwaveAnalogSensor, ZwaveAnalogSensorRaw, ZwaveAnalogSensorRemote }
