// Created from: src/interfaces/module_analog_f01_0.xml, object name="AnalogIN"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnChangeValue = 0,
    OnLowerValue = 1,
    OnRiseValue = 2,
    OnOutRange = 3,
    OnSwitchOn = 4,
    OnSwitchOff = 5
}

enum PropertyType {
    Value = 0,
    ValuePercent = 1,
    Scale = 2,
    Sensitivity = 3,
    Inertia = 4,
    MinValue = 5,
    MaxValue = 6
}

enum MethodType {}

declare class AnalogInRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface IAnalogIn {
    /** Zdarzenie wywoływane przy zmianie wartości wyjścia */
    addOnChangeValue: (callback: () => void) => void
    /** Zdarzenie wywoływane przy zmianie wartości na niższą (zbocze opadające) */
    addOnLowerValue: (callback: () => void) => void
    /** Zdarzenie wywoływane przy zmianie wartości na wyższą (zbocze narastające) */
    addOnRiseValue: (callback: () => void) => void
    /** Zdarzenie wywoływane gdy wartość na wyjściu znajduje się poza wyznaczonym zakresem (MinValue - MaxValue) */
    addOnOutRange: (callback: () => void) => void
    /** Zdarzenie wywoływane gdy wyjście osiągnie wartość MaxValue */
    addOnSwitchOn: (callback: () => void) => void
    /** Zdarzenie wywoływane gdy wyjście osiągnie wartość MinValue */
    addOnSwitchOff: (callback: () => void) => void
    /** Wartość wejścia po przeskalowaniu */
    readonly value: number
    /** Wartość wejścia po przeskalowaniu jako procent wartości maksymalnej (MaxValue) */
    readonly valuePercent: number
    /** Parametr przez jaki mnożona jest wartość odczytana na wejściu */
    scale: number
    /** Czułość - minimalna zmiana wartości na wejściu która wywołuje zdarzenia OnChangeValue, OnLowerValue lub OnRaiseValue */
    sensitivity: number
    /** Wartość inercji wejścia */
    inertia: number
    /** Wartość minimalna po przekroczeniu której generowane jest zdarzenie OnOutRange */
    minValue: number
    /** Wartość maksymalna po przekroczeniu której generowane jest zdarzenie OnOutRange */
    maxValue: number
    /** Ustawia skalę */
    setScale: (value: number) => void
    /** Ustawia wartość czułości wejścia */
    setSensitivity: (value: number) => void
    /** Ustawia wartość inercji wejścia */
    setInertia: (value: number) => void
    /** Ustawia wartość MinValue */
    setMin: (value: number) => void
    /** Ustawia wartość MaxValue */
    setMax: (value: number) => void
}

class AnalogIn implements IAnalogIn {
    private onChangeValueCallbacks: Array<() => void> = [];
    private onLowerValueCallbacks: Array<() => void> = [];
    private onRiseValueCallbacks: Array<() => void> = [];
    private onOutRangeCallbacks: Array<() => void> = [];
    private onSwitchOnCallbacks: Array<() => void> = [];
    private onSwitchOffCallbacks: Array<() => void> = [];

    constructor(private raw: AnalogInRaw) {
        this.raw.add_event(EventType.OnChangeValue, () => {
            this.onChangeValueCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnLowerValue, () => {
            this.onLowerValueCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnRiseValue, () => {
            this.onRiseValueCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnOutRange, () => {
            this.onOutRangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnSwitchOn, () => {
            this.onSwitchOnCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnSwitchOff, () => {
            this.onSwitchOffCallbacks.forEach(callback => { callback(); });
        });
    }

    addOnChangeValue(callback: () => void): void { this.onChangeValueCallbacks.push(callback); }
    addOnLowerValue(callback: () => void): void { this.onLowerValueCallbacks.push(callback); }
    addOnRiseValue(callback: () => void): void { this.onRiseValueCallbacks.push(callback); }
    addOnOutRange(callback: () => void): void { this.onOutRangeCallbacks.push(callback); }
    addOnSwitchOn(callback: () => void): void { this.onSwitchOnCallbacks.push(callback); }
    addOnSwitchOff(callback: () => void): void { this.onSwitchOffCallbacks.push(callback); }

    get value(): number { return this.raw.get(PropertyType.Value); }
    get valuePercent(): number { return this.raw.get(PropertyType.ValuePercent); }
    get scale(): number { return this.raw.get(PropertyType.Scale); }
    set scale(val: number) { this.raw.set(PropertyType.Scale, val); }
    get sensitivity(): number { return this.raw.get(PropertyType.Sensitivity); }
    set sensitivity(val: number) { this.raw.set(PropertyType.Sensitivity, val); }
    get inertia(): number { return this.raw.get(PropertyType.Inertia); }
    set inertia(val: number) { this.raw.set(PropertyType.Inertia, val); }
    get minValue(): number { return this.raw.get(PropertyType.MinValue); }
    set minValue(val: number) { this.raw.set(PropertyType.MinValue, val); }
    get maxValue(): number { return this.raw.get(PropertyType.MaxValue); }
    set maxValue(val: number) { this.raw.set(PropertyType.MaxValue, val); }

    setScale(value: number): void { this.raw.set(PropertyType.Scale, value); }
    setSensitivity(value: number): void { this.raw.set(PropertyType.Sensitivity, value); }
    setInertia(value: number): void { this.raw.set(PropertyType.Inertia, value); }
    setMin(value: number): void { this.raw.set(PropertyType.MinValue, value); }
    setMax(value: number): void { this.raw.set(PropertyType.MaxValue, value); }
}

class AnalogInRemote implements IAnalogIn {
    constructor(private objectName: string, private gate: RemoteGate) {}

    addOnChangeValue(_callback: () => void): void { /* Remote events are not supported */ }
    addOnLowerValue(_callback: () => void): void { /* Remote events are not supported */ }
    addOnRiseValue(_callback: () => void): void { /* Remote events are not supported */ }
    addOnOutRange(_callback: () => void): void { /* Remote events are not supported */ }
    addOnSwitchOn(_callback: () => void): void { /* Remote events are not supported */ }
    addOnSwitchOff(_callback: () => void): void { /* Remote events are not supported */ }

    get value(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Value).build();
        return this.gate.runScript(cmd!);
    }
    get valuePercent(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.ValuePercent).build();
        return this.gate.runScript(cmd!);
    }
    get scale(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Scale).build();
        return this.gate.runScript(cmd!);
    }
    set scale(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.Scale).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
    get sensitivity(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Sensitivity).build();
        return this.gate.runScript(cmd!);
    }
    set sensitivity(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.Sensitivity).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
    get inertia(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Inertia).build();
        return this.gate.runScript(cmd!);
    }
    set inertia(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.Inertia).addParameter(val).build();
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

    setScale(value: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.Scale).addParameter(value).build();
        this.gate.runScript(cmd!);
    }
    setSensitivity(value: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.Sensitivity).addParameter(value).build();
        this.gate.runScript(cmd!);
    }
    setInertia(value: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.Inertia).addParameter(value).build();
        this.gate.runScript(cmd!);
    }
    setMin(value: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.MinValue).addParameter(value).build();
        this.gate.runScript(cmd!);
    }
    setMax(value: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.MaxValue).addParameter(value).build();
        this.gate.runScript(cmd!);
    }
}

export { AnalogIn, AnalogInRaw, AnalogInRemote }
