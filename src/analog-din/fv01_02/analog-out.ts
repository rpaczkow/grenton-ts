// Created from: src/interfaces/module_2_0_ANALOG_DIN_fv01_02.xml, object name="AnalogOUT"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnValueChange = 0,
    OnValueLower = 1,
    OnValueRise = 2,
    OnOutOfRange = 3,
    OnSwitchOn = 4,
    OnSwitchOff = 5,
}

enum PropertyType {
    Value = 0,
    ScaledValue = 1,
    Scale = 2,
    Ramp = 3,
    MinValue = 4,
    MaxValue = 5,
}

enum MethodType {
    SetValue = 0,
    SetScaledValue = 1,
    SetScale = 2,
    SetRamp = 3,
    HoldValue = 6,
    Switch = 7,
    SwitchOn = 8,
    SwitchOff = 9,
}

declare class AnalogOutRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): void;
}

interface IAnalogOut {
    /**
     * Zdarzenie wywoływane przy zmianie wartości wyjścia
     * @param callback
     */
    addOnValueChange: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane przy zmianie wartości na niższą (zbocze opadające)
     * @param callback
     */
    addOnValueLower: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane przy zmianie wartości na wyższą (zbocze narastające)
     * @param callback
     */
    addOnValueRise: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane gdy wartość na wyjściu znajduje się poza wyznaczonym zakresem (MinValue - MaxValue)
     * @param callback
     */
    addOnOutOfRange: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane gdy wyjście ma wartość większą od zera
     * @param callback
     */
    addOnSwitchOn: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane gdy wyjście osiągnie wartość MinValue
     * @param callback
     */
    addOnSwitchOff: (callback: () => void) => void
    /** Wartość wyjścia */
    value: number
    /**
     * Ustawia wartość wyjścia (0.0-10.0V)
     * @param {number} value
     */
    setValue: (value: number) => void
    /** Przeskalowana wartość wyjścia */
    readonly scaledValue: number
    /**
     * Ustawia wartość po przeskalowaniu
     * @param {number} scaledValue
     */
    setScaledValue: (scaledValue: number) => void
    /** Skala */
    scale: number
    /**
     * Ustawia skalę
     * @param {number} scale
     */
    setScale: (scale: number) => void
    /** Czas narastania */
    ramp: number
    /**
     * Ustawia czas narastania
     * @param {number} ramp
     */
    setRamp: (ramp: number) => void
    /** Wartość minimalna po przekroczeniu której generowane jest zdarzenie OnOutRange */
    minValue: number
    /** Wartość maksymalna po przekroczeniu której generowane jest zdarzenie OnOutRange */
    maxValue: number
    /**
     * Zmniejsza lub zwiększa wartość wyjścia z użyciem rampy podanej w parametrze. Jeśli parametr rampy nie zostanie podany, używa rampy domyślnej
     * @param {number} ramp
     */
    holdValue: (ramp: number) => void
    /**
     * Przełącza stan wyjścia na przeciwny (MinValue - MaxValue)
     * @param {number} time
     * @param {number} ramp
     */
    switch: (time: number, ramp?: number) => void
    /**
     * Ustawia na wyjściu wartość MaxValue
     * @param {number} time
     * @param {number} ramp
     */
    switchOn: (time: number, ramp?: number) => void
    /**
     * Ustawia na wyjściu wartość MinValue
     * @param {number} time
     * @param {number} ramp
     */
    switchOff: (time: number, ramp?: number) => void
}

class AnalogOut implements IAnalogOut {
    private onValueChangeCallbacks: Array<() => void> = [];
    private onValueLowerCallbacks: Array<() => void> = [];
    private onValueRiseCallbacks: Array<() => void> = [];
    private onOutOfRangeCallbacks: Array<() => void> = [];
    private onSwitchOnCallbacks: Array<() => void> = [];
    private onSwitchOffCallbacks: Array<() => void> = [];

    constructor(private raw: AnalogOutRaw) {
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
        this.raw.add_event(EventType.OnSwitchOn, () => {
            this.onSwitchOnCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnSwitchOff, () => {
            this.onSwitchOffCallbacks.forEach(callback => { callback(); });
        });
    }

    addOnValueChange(callback: () => void): void {
        this.onValueChangeCallbacks.push(callback);
    }
    addOnValueLower(callback: () => void): void {
        this.onValueLowerCallbacks.push(callback);
    }
    addOnValueRise(callback: () => void): void {
        this.onValueRiseCallbacks.push(callback);
    }
    addOnOutOfRange(callback: () => void): void {
        this.onOutOfRangeCallbacks.push(callback);
    }
    addOnSwitchOn(callback: () => void): void {
        this.onSwitchOnCallbacks.push(callback);
    }
    addOnSwitchOff(callback: () => void): void {
        this.onSwitchOffCallbacks.push(callback);
    }
    get value(): number {
        return this.raw.get(PropertyType.Value);
    }
    set value(value: number) {
        this.raw.set(PropertyType.Value, value);
    }
    setValue(value: number): void {
        this.raw.set(PropertyType.Value, value);
    }
    get scaledValue(): number {
        return this.raw.get(PropertyType.ScaledValue);
    }
    setScaledValue(scaledValue: number): void {
        this.raw.set(PropertyType.ScaledValue, scaledValue);
    }
    get scale(): number {
        return this.raw.get(PropertyType.Scale);
    }
    set scale(value: number) {
        this.raw.set(PropertyType.Scale, value);
    }
    setScale(scale: number): void {
        this.raw.set(PropertyType.Scale, scale);
    }
    get ramp(): number {
        return this.raw.get(PropertyType.Ramp);
    }
    set ramp(value: number) {
        this.raw.set(PropertyType.Ramp, value);
    }
    setRamp(ramp: number): void {
        this.raw.set(PropertyType.Ramp, ramp);
    }
    get minValue(): number {
        return this.raw.get(PropertyType.MinValue);
    }
    set minValue(value: number) {
        this.raw.set(PropertyType.MinValue, value);
    }
    get maxValue(): number {
        return this.raw.get(PropertyType.MaxValue);
    }
    set maxValue(value: number) {
        this.raw.set(PropertyType.MaxValue, value);
    }
    holdValue(ramp: number): void {
        this.raw.execute(MethodType.HoldValue, ramp);
    }
    switch(time: number, ramp: number = 0): void {
        this.raw.execute(MethodType.Switch, time, ramp);
    }
    switchOn(time: number, ramp: number = 0): void {
        this.raw.execute(MethodType.SwitchOn, time, ramp);
    }
    switchOff(time: number, ramp: number = 0): void {
        this.raw.execute(MethodType.SwitchOff, time, ramp);
    }
}

class AnalogOutRemote implements IAnalogOut {
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
    addOnSwitchOn(_callback: () => void): void {
        // Remote events are not supported
    }
    addOnSwitchOff(_callback: () => void): void {
        // Remote events are not supported
    }

    get value(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Value)
            .build();
        return this.gate.runScript(cmd!);
    }
    set value(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Value)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
    setValue(value: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Value)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
    get scaledValue(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.ScaledValue)
            .build();
        return this.gate.runScript(cmd!);
    }
    setScaledValue(scaledValue: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.ScaledValue)
            .addParameter(scaledValue)
            .build();
        this.gate.runScript(cmd!);
    }
    get scale(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Scale)
            .build();
        return this.gate.runScript(cmd!);
    }
    set scale(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Scale)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
    setScale(scale: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Scale)
            .addParameter(scale)
            .build();
        this.gate.runScript(cmd!);
    }
    get ramp(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Ramp)
            .build();
        return this.gate.runScript(cmd!);
    }
    set ramp(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Ramp)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
    setRamp(ramp: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Ramp)
            .addParameter(ramp)
            .build();
        this.gate.runScript(cmd!);
    }
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
    holdValue(ramp: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.HoldValue)
            .addParameter(ramp)
            .build();
        this.gate.runScript(cmd!);
    }
    switch(time: number, ramp: number = 0): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.Switch)
            .addParameter(time)
            .addParameter(ramp)
            .build();
        this.gate.runScript(cmd!);
    }
    switchOn(time: number, ramp: number = 0): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.SwitchOn)
            .addParameter(time)
            .addParameter(ramp)
            .build();
        this.gate.runScript(cmd!);
    }
    switchOff(time: number, ramp: number = 0): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.SwitchOff)
            .addParameter(time)
            .addParameter(ramp)
            .build();
        this.gate.runScript(cmd!);
    }
}

export { AnalogOut, AnalogOutRaw, AnalogOutRemote }
