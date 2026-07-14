// Created from: src/interfaces/module_2_0_ROLLER_SHUTTER_DIN_3_fv02_02.xml, object name="PowerSupplyVoltage"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnValueChange = 0,
    OnValueLower = 1,
    OnValueRise = 2,
    OnOutOfRange = 3,
    OnInRange = 6,
}

enum PropertyType {
    Value = 0,
    ValuePercent = 1,
    Sensitivity = 3,
    MinValue = 5,
    MaxValue = 6,
}

declare class PowerSupplyVoltageRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
}

interface IPowerSupplyVoltage {
    /**
     * Zdarzenie wywoływane przy zmianie wartości napięcia zasilania
     * @param callback
     */
    addOnValueChange: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane przy zmianie wartości napięcia zasilania na niższą (zbocze opadające)
     * @param callback
     */
    addOnValueLower: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane przy zmianie wartości napięcia zasilania na wyższą (zbocze narastające)
     * @param callback
     */
    addOnValueRise: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane gdy napięcia zasilania znajduje się poza wyznaczonym zakresem (MinValue - MaxValue)
     * @param callback
     */
    addOnOutOfRange: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane gdy wartość napięcia zasilania powróci do wyznaczonego zakresu (MinValue - MaxValue)
     * @param callback
     */
    addOnInRange: (callback: () => void) => void
    /** Wartość napięcia zasilania */
    readonly value: number
    /** Wartość napięcia zasilania jako procent wartości maksymalnej (MaxValue) */
    readonly valuePercent: number
    /** Czułość - minimalna zmiana wartości napięcia zasilania, która wywołuje zdarzenia OnValueChange, OnValueLower lub OnValueRise */
    sensitivity: number
    /**
     * Ustawia czułość pomiaru napięcia zasilania
     * @param {number} value
     */
    setSensitivity: (value: number) => void
    /** Wartość minimalna napięcia zasilania po przekroczeniu której generowane jest zdarzenie OnOutOfRange */
    minValue: number
    /**
     * Ustawia wartość MinValue
     * @param {number} value
     */
    setMinValue: (value: number) => void
    /** Wartość maksymalna napięcia zasilania po przekroczeniu której generowane jest zdarzenie OnOutOfRange */
    maxValue: number
    /**
     * Ustawia wartość MaxValue
     * @param {number} value
     */
    setMaxValue: (value: number) => void
}

class PowerSupplyVoltageRemote implements IPowerSupplyVoltage {
    constructor(private objectName: string, private gate: RemoteGate) {
    }

    addOnValueChange(_callback: () => void): void {
        // Remote events are not supported
    }
    addOnValueLower(_callback: () => void): void {
        // Remote events are not supported
    }
    addOnValueRise(_callback: () => void): void {
        // Remote events are not supported
    }
    addOnOutOfRange(_callback: () => void): void {
        // Remote events are not supported
    }
    addOnInRange(_callback: () => void): void {
        // Remote events are not supported
    }

    /** Wartość napięcia zasilania */
    get value(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Value)
            .build();
        return this.gate.runScript(cmd!);
    }

    /** Wartość napięcia zasilania jako procent wartości maksymalnej (MaxValue) */
    get valuePercent(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.ValuePercent)
            .build();
        return this.gate.runScript(cmd!);
    }

    /** Czułość - minimalna zmiana wartości napięcia zasilania, która wywołuje zdarzenia OnValueChange, OnValueLower lub OnValueRise */
    get sensitivity(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Sensitivity)
            .build();
        return this.gate.runScript(cmd!);
    }
    set sensitivity(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Sensitivity)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Ustawia czułość pomiaru napięcia zasilania
     * @param {number} value
     */
    setSensitivity(value: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Sensitivity)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Wartość minimalna napięcia zasilania po przekroczeniu której generowane jest zdarzenie OnOutOfRange */
    get minValue(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.MinValue)
            .build();
        return this.gate.runScript(cmd!);
    }
    set minValue(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.MinValue)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Ustawia wartość MinValue
     * @param {number} value
     */
    setMinValue(value: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.MinValue)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Wartość maksymalna napięcia zasilania po przekroczeniu której generowane jest zdarzenie OnOutOfRange */
    get maxValue(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.MaxValue)
            .build();
        return this.gate.runScript(cmd!);
    }
    set maxValue(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.MaxValue)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Ustawia wartość MaxValue
     * @param {number} value
     */
    setMaxValue(value: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.MaxValue)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
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

    /**
     * Zdarzenie wywoływane przy zmianie wartości napięcia zasilania
     * @param callback
     */
    addOnValueChange(callback: () => void): void {
        this.onValueChangeCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane przy zmianie wartości napięcia zasilania na niższą (zbocze opadające)
     * @param callback
     */
    addOnValueLower(callback: () => void): void {
        this.onValueLowerCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane przy zmianie wartości napięcia zasilania na wyższą (zbocze narastające)
     * @param callback
     */
    addOnValueRise(callback: () => void): void {
        this.onValueRiseCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane gdy napięcia zasilania znajduje się poza wyznaczonym zakresem (MinValue - MaxValue)
     * @param callback
     */
    addOnOutOfRange(callback: () => void): void {
        this.onOutOfRangeCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane gdy wartość napięcia zasilania powróci do wyznaczonego zakresu (MinValue - MaxValue)
     * @param callback
     */
    addOnInRange(callback: () => void): void {
        this.onInRangeCallbacks.push(callback);
    }
    /** Wartość napięcia zasilania */
    get value(): number {
        return this.raw.get(PropertyType.Value);
    }
    /** Wartość napięcia zasilania jako procent wartości maksymalnej (MaxValue) */
    get valuePercent(): number {
        return this.raw.get(PropertyType.ValuePercent);
    }
    /** Czułość - minimalna zmiana wartości napięcia zasilania, która wywołuje zdarzenia OnValueChange, OnValueLower lub OnValueRise */
    get sensitivity(): number {
        return this.raw.get(PropertyType.Sensitivity);
    }
    set sensitivity(value: number) {
        this.raw.set(PropertyType.Sensitivity, value);
    }
    /**
     * Ustawia czułość pomiaru napięcia zasilania
     * @param {number} value
     */
    setSensitivity(value: number): void {
        this.raw.set(PropertyType.Sensitivity, value);
    }
    /** Wartość minimalna napięcia zasilania po przekroczeniu której generowane jest zdarzenie OnOutOfRange */
    get minValue(): number {
        return this.raw.get(PropertyType.MinValue);
    }
    set minValue(value: number) {
        this.raw.set(PropertyType.MinValue, value);
    }
    /**
     * Ustawia wartość MinValue
     * @param {number} value
     */
    setMinValue(value: number): void {
        this.raw.set(PropertyType.MinValue, value);
    }
    /** Wartość maksymalna napięcia zasilania po przekroczeniu której generowane jest zdarzenie OnOutOfRange */
    get maxValue(): number {
        return this.raw.get(PropertyType.MaxValue);
    }
    set maxValue(value: number) {
        this.raw.set(PropertyType.MaxValue, value);
    }
    /**
     * Ustawia wartość MaxValue
     * @param {number} value
     */
    setMaxValue(value: number): void {
        this.raw.set(PropertyType.MaxValue, value);
    }
}

export { PowerSupplyVoltage, PowerSupplyVoltageRaw, PowerSupplyVoltageRemote }
