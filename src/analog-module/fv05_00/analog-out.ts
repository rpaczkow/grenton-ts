// Created from: src/interfaces/module_analog_f05_0.xml, object name="AnalogOUT"

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
    ScaledValue = 1,
    Scale = 2,
    Ramp = 3,
    MinValue = 4,
    MaxValue = 5
}

enum MethodType {
    Hold = 6,
    Switch = 7,
    SwitchOn = 8,
    SwitchOff = 9
}

declare class AnalogOutRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface IAnalogOut {
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
    /** Wartość wyjścia */
    value: number
    /** Przeskalowana wartość wyjścia */
    scaledValue: number
    /** Skala */
    scale: number
    /** Czas narastania */
    ramp: number
    /** Wartość minimalna po przekroczeniu której generowane jest zdarzenie OnOutRange */
    minValue: number
    /** Wartość maksymalna po przekroczeniu której generowane jest zdarzenie OnOutRange */
    maxValue: number
    /** Ustawia wartość wyjścia (0.0-10.0V) */
    setValue: (value: number) => void
    /** Ustawia wartość po przeskalowaniu */
    setScaledValue: (value: number) => void
    /** Ustawia skalę */
    setScale: (value: number) => void
    /** Ustawia czas narastania */
    setRamp: (value: number) => void
    /** Ustawia wartość minimalną */
    setMin: (value: number) => void
    /** Ustawia wartość maksymalną */
    setMax: (value: number) => void
    /** Zmniejsza lub zwiększa wartość wyjścia z użyciem rampy podanej w parametrze. Jeśli parametr rampy nie zostanie podany, używa rampy domyślnej */
    hold: (ramp: number) => void
    /** Przełącza stan wyjścia na przeciwny (MinValue - MaxValue) */
    switch: (time: number, ramp?: number) => void
    /** Ustawia na wyjściu wartość MaxValue */
    switchOn: (time: number, ramp?: number) => void
    /** Ustawia na wyjściu wartość MinValue */
    switchOff: (time: number, ramp?: number) => void
}

class AnalogOut implements IAnalogOut {
    private onChangeValueCallbacks: Array<() => void> = [];
    private onLowerValueCallbacks: Array<() => void> = [];
    private onRiseValueCallbacks: Array<() => void> = [];
    private onOutRangeCallbacks: Array<() => void> = [];
    private onSwitchOnCallbacks: Array<() => void> = [];
    private onSwitchOffCallbacks: Array<() => void> = [];

    constructor(private raw: AnalogOutRaw) {
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
    set value(val: number) { this.raw.set(PropertyType.Value, val); }
    get scaledValue(): number { return this.raw.get(PropertyType.ScaledValue); }
    set scaledValue(val: number) { this.raw.set(PropertyType.ScaledValue, val); }
    get scale(): number { return this.raw.get(PropertyType.Scale); }
    set scale(val: number) { this.raw.set(PropertyType.Scale, val); }
    get ramp(): number { return this.raw.get(PropertyType.Ramp); }
    set ramp(val: number) { this.raw.set(PropertyType.Ramp, val); }
    get minValue(): number { return this.raw.get(PropertyType.MinValue); }
    set minValue(val: number) { this.raw.set(PropertyType.MinValue, val); }
    get maxValue(): number { return this.raw.get(PropertyType.MaxValue); }
    set maxValue(val: number) { this.raw.set(PropertyType.MaxValue, val); }

    setValue(value: number): void { this.raw.set(PropertyType.Value, value); }
    setScaledValue(value: number): void { this.raw.set(PropertyType.ScaledValue, value); }
    setScale(value: number): void { this.raw.set(PropertyType.Scale, value); }
    setRamp(value: number): void { this.raw.set(PropertyType.Ramp, value); }
    setMin(value: number): void { this.raw.set(PropertyType.MinValue, value); }
    setMax(value: number): void { this.raw.set(PropertyType.MaxValue, value); }

    hold(ramp: number): void {
        this.raw.execute(MethodType.Hold, ramp);
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
    set value(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.Value).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
    get scaledValue(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.ScaledValue).build();
        return this.gate.runScript(cmd!);
    }
    set scaledValue(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.ScaledValue).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
    get scale(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Scale).build();
        return this.gate.runScript(cmd!);
    }
    set scale(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.Scale).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
    get ramp(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Ramp).build();
        return this.gate.runScript(cmd!);
    }
    set ramp(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.Ramp).addParameter(val).build();
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

    setValue(value: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.Value).addParameter(value).build();
        this.gate.runScript(cmd!);
    }
    setScaledValue(value: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.ScaledValue).addParameter(value).build();
        this.gate.runScript(cmd!);
    }
    setScale(value: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.Scale).addParameter(value).build();
        this.gate.runScript(cmd!);
    }
    setRamp(value: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.Ramp).addParameter(value).build();
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

    hold(ramp: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.Hold).addParameter(ramp).build();
        this.gate.runScript(cmd!);
    }
    switch(time: number, ramp: number = 0): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.Switch).addParameter(time).addParameter(ramp).build();
        this.gate.runScript(cmd!);
    }
    switchOn(time: number, ramp: number = 0): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SwitchOn).addParameter(time).addParameter(ramp).build();
        this.gate.runScript(cmd!);
    }
    switchOff(time: number, ramp: number = 0): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SwitchOff).addParameter(time).addParameter(ramp).build();
        this.gate.runScript(cmd!);
    }
}

export { AnalogOut, AnalogOutRaw, AnalogOutRemote }
