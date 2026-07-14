// Created from: src/interfaces/module_2_0_IO_MODULE_DIN_8_fv01_02.xml, object name="PowerSupplyVoltage"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnValueChange = 0,
    OnValueLower = 1,
    OnValueRise = 2,
    OnOutOfRange = 3,
    OnInRange = 6
}

enum PropertyType {
    Value = 0,
    ValuePercent = 1,
    Sensitivity = 3,
    MinValue = 5,
    MaxValue = 6
}

declare class PowerSupplyVoltageRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
}

interface IPowerSupplyVoltage {
    /** Zdarzenie wywoływane przy zmianie wartości napięcia zasilania */
    addOnValueChange: (callback: () => void) => void
    /** Zdarzenie wywoływane przy zmianie wartości napięcia zasilania na niższą (zbocze opadające) */
    addOnValueLower: (callback: () => void) => void
    /** Zdarzenie wywoływane przy zmianie wartości napięcia zasilania na wyższą (zbocze narastające) */
    addOnValueRise: (callback: () => void) => void
    /** Zdarzenie wywoływane gdy napięcia zasilania znajduje się poza wyznaczonym zakresem (MinValue - MaxValue) */
    addOnOutOfRange: (callback: () => void) => void
    /** Zdarzenie wywoływane gdy wartość napięcia zasilania powróci do wyznaczonego zakresu (MinValue - MaxValue) */
    addOnInRange: (callback: () => void) => void
    /** Wartość napięcia zasilania */
    readonly value: number
    /** Wartość napięcia zasilania jako procent wartości maksymalnej (MaxValue) */
    readonly valuePercent: number
    /** Czułość - minimalna zmiana wartości napięcia zasilania, która wywołuje zdarzenia OnValueChange, OnValueLower lub OnValueRise */
    sensitivity: number
    /** Ustawia czułość pomiaru napięcia zasilania */
    setSensitivity: (sensitivity: number) => void
    /** Wartość minimalna napięcia zasilania po przekroczeniu której generowane jest zdarzenie OnOutOfRange */
    minValue: number
    /** Ustawia wartość MinValue */
    setMinValue: (minValue: number) => void
    /** Wartość maksymalna napięcia zasilania po przekroczeniu której generowane jest zdarzenie OnOutOfRange */
    maxValue: number
    /** Ustawia wartość MaxValue */
    setMaxValue: (maxValue: number) => void
}

class PowerSupplyVoltage implements IPowerSupplyVoltage {
    private onValueChangeCallbacks: Array<() => void> = [];
    private onValueLowerCallbacks: Array<() => void> = [];
    private onValueRiseCallbacks: Array<() => void> = [];
    private onOutOfRangeCallbacks: Array<() => void> = [];
    private onInRangeCallbacks: Array<() => void> = [];

    constructor(private raw: PowerSupplyVoltageRaw) {
        this.raw.add_event(EventType.OnValueChange, () => {
            this.onValueChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnValueLower, () => {
            this.onValueLowerCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnValueRise, () => {
            this.onValueRiseCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnOutOfRange, () => {
            this.onOutOfRangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnInRange, () => {
            this.onInRangeCallbacks.forEach(callback => { callback(); });
        });
    }

    addOnValueChange(callback: () => void): void { this.onValueChangeCallbacks.push(callback); }
    addOnValueLower(callback: () => void): void { this.onValueLowerCallbacks.push(callback); }
    addOnValueRise(callback: () => void): void { this.onValueRiseCallbacks.push(callback); }
    addOnOutOfRange(callback: () => void): void { this.onOutOfRangeCallbacks.push(callback); }
    addOnInRange(callback: () => void): void { this.onInRangeCallbacks.push(callback); }

    get value(): number { return this.raw.get(PropertyType.Value); }
    get valuePercent(): number { return this.raw.get(PropertyType.ValuePercent); }
    get sensitivity(): number { return this.raw.get(PropertyType.Sensitivity); }
    set sensitivity(val: number) { this.raw.set(PropertyType.Sensitivity, val); }
    setSensitivity(sensitivity: number): void { this.raw.set(PropertyType.Sensitivity, sensitivity); }
    get minValue(): number { return this.raw.get(PropertyType.MinValue); }
    set minValue(val: number) { this.raw.set(PropertyType.MinValue, val); }
    setMinValue(minValue: number): void { this.raw.set(PropertyType.MinValue, minValue); }
    get maxValue(): number { return this.raw.get(PropertyType.MaxValue); }
    set maxValue(val: number) { this.raw.set(PropertyType.MaxValue, val); }
    setMaxValue(maxValue: number): void { this.raw.set(PropertyType.MaxValue, maxValue); }
}

class PowerSupplyVoltageRemote implements IPowerSupplyVoltage {
    constructor(private objectName: string, private gate: RemoteGate) {}

    addOnValueChange(_callback: () => void): void { /* Remote events are not supported */ }
    addOnValueLower(_callback: () => void): void { /* Remote events are not supported */ }
    addOnValueRise(_callback: () => void): void { /* Remote events are not supported */ }
    addOnOutOfRange(_callback: () => void): void { /* Remote events are not supported */ }
    addOnInRange(_callback: () => void): void { /* Remote events are not supported */ }

    get value(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Value).build();
        return this.gate.runScript(cmd!);
    }
    get valuePercent(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.ValuePercent).build();
        return this.gate.runScript(cmd!);
    }
    get sensitivity(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Sensitivity).build();
        return this.gate.runScript(cmd!);
    }
    set sensitivity(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.Sensitivity).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
    setSensitivity(sensitivity: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.Sensitivity).addParameter(sensitivity).build();
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
    setMinValue(minValue: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.MinValue).addParameter(minValue).build();
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
    setMaxValue(maxValue: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.MaxValue).addParameter(maxValue).build();
        this.gate.runScript(cmd!);
    }
}

export { PowerSupplyVoltage, PowerSupplyVoltageRaw, PowerSupplyVoltageRemote }
