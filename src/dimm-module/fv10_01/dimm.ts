// Created from: src/interfaces/module_dimm_fv10_1.xml, object name="DIMM"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum StatisticStateType {
    Off = 0,
    Continuous = 1
}

enum EventType {
    OnChange = 0,
    OnSwitchOn = 1,
    OnSwitchOff = 2,
    OnRaiseValueSet = 3,
    OnLowerValueSet = 4,
    OnOutOfRange = 5
}

enum PropertyType {
    Value = 0,
    RampTime = 1,
    MinValue = 2,
    MaxValue = 3,
    StatisticState = 4,
    Load = 5
}

enum MethodType {
    Hold = 0,
    Switch = 1,
    SwitchOn = 2,
    SwitchOff = 3
}

declare class DimmRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface IDimm {
    /** Wykonuje przypisane komendy w przypadku zmiany wartości wyjścia */
    addOnChange: (callback: () => void) => void
    /** Wykonuje przypisane komendy gdy nastąpi ustawienie na wyjściu wartości 100% */
    addOnSwitchOn: (callback: () => void) => void
    /** Wykonuje przypisane komendy gdy nastąpi ustawienie na wyjściu wartości 0% */
    addOnSwitchOff: (callback: () => void) => void
    /** Zdarzenie wywoływane gdy ustawiana wartość jest większa od poprzedniej */
    addOnRaiseValueSet: (callback: () => void) => void
    /** Zdarzenie wywoływane gdy ustawiana wartość jest mniejsza od poprzedniej */
    addOnLowerValueSet: (callback: () => void) => void
    /** Zdarzenie wywoływane gdy ustawiana wartość jest spoza przedziału (MinValue - MaxValue) */
    addOnOutOfRange: (callback: () => void) => void
    /** Podaje aktualną wartość wyjścia */
    value: number
    /** Wartość opóźnienia przy zmianie intensywności świecenia (w ms) */
    rampTime: number
    /** Minimalna wartość jaka może przyjąć Value, próba ustawienia wartości mniejszej zwraca błąd */
    minValue: number
    /** Maksymalna wartość jaka może przyjąć Value, próba ustawienia wartości większej zwraca błąd */
    maxValue: number
    /** Włącza raportowanie pomiaru do modułu statystyk */
    statisticState: StatisticStateType
    /** Mnożnik mierzonej wartości */
    load: number
    /** Ustawia wartość wyjścia (0 lub 1) */
    setValue: (value: number) => void
    /** Ustawia czas narastania wartości wyjścia */
    setRampTime: (value: number) => void
    /** Ustawienie minimalnej wartości jaka może przyjąć wyjście */
    setMinValue: (value: number) => void
    /** Ustawienie maksymalnej wartości jaka może przyjąć wyjście */
    setMaxValue: (value: number) => void
    /** Realizuje funkcje rozjaśniania i ściemniania */
    hold: (ramp?: number) => void
    /** Zmienia wartość wyjścia na przeciwny (0/1) */
    switch: (time: number, ramp?: number) => void
    /** Ustawienie wartości wyjścia na 1 */
    switchOn: (time: number, ramp?: number) => void
    /** Ustawienie wartości wyjścia na 0 */
    switchOff: (time: number, ramp?: number) => void
}

class Dimm implements IDimm {
    private onChangeCallbacks: Array<() => void> = [];
    private onSwitchOnCallbacks: Array<() => void> = [];
    private onSwitchOffCallbacks: Array<() => void> = [];
    private onRaiseValueSetCallbacks: Array<() => void> = [];
    private onLowerValueSetCallbacks: Array<() => void> = [];
    private onOutOfRangeCallbacks: Array<() => void> = [];

    constructor(private raw: DimmRaw) {
        this.raw.add_event(EventType.OnChange, () => {
            this.onChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnSwitchOn, () => {
            this.onSwitchOnCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnSwitchOff, () => {
            this.onSwitchOffCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnRaiseValueSet, () => {
            this.onRaiseValueSetCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnLowerValueSet, () => {
            this.onLowerValueSetCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnOutOfRange, () => {
            this.onOutOfRangeCallbacks.forEach(callback => { callback(); });
        });
    }

    addOnChange(callback: () => void): void { this.onChangeCallbacks.push(callback); }
    addOnSwitchOn(callback: () => void): void { this.onSwitchOnCallbacks.push(callback); }
    addOnSwitchOff(callback: () => void): void { this.onSwitchOffCallbacks.push(callback); }
    addOnRaiseValueSet(callback: () => void): void { this.onRaiseValueSetCallbacks.push(callback); }
    addOnLowerValueSet(callback: () => void): void { this.onLowerValueSetCallbacks.push(callback); }
    addOnOutOfRange(callback: () => void): void { this.onOutOfRangeCallbacks.push(callback); }

    get value(): number { return this.raw.get(PropertyType.Value); }
    set value(val: number) { this.raw.set(PropertyType.Value, val); }
    get rampTime(): number { return this.raw.get(PropertyType.RampTime); }
    set rampTime(val: number) { this.raw.set(PropertyType.RampTime, val); }
    get minValue(): number { return this.raw.get(PropertyType.MinValue); }
    set minValue(val: number) { this.raw.set(PropertyType.MinValue, val); }
    get maxValue(): number { return this.raw.get(PropertyType.MaxValue); }
    set maxValue(val: number) { this.raw.set(PropertyType.MaxValue, val); }
    get statisticState(): StatisticStateType { return this.raw.get(PropertyType.StatisticState); }
    set statisticState(val: StatisticStateType) { this.raw.set(PropertyType.StatisticState, val); }
    get load(): number { return this.raw.get(PropertyType.Load); }
    set load(val: number) { this.raw.set(PropertyType.Load, val); }

    setValue(value: number): void { this.raw.set(PropertyType.Value, value); }
    setRampTime(value: number): void { this.raw.set(PropertyType.RampTime, value); }
    setMinValue(value: number): void { this.raw.set(PropertyType.MinValue, value); }
    setMaxValue(value: number): void { this.raw.set(PropertyType.MaxValue, value); }

    hold(ramp: number = 500): void {
        this.raw.execute(MethodType.Hold, ramp);
    }
    switch(time: number, ramp: number = 500): void {
        this.raw.execute(MethodType.Switch, time, ramp);
    }
    switchOn(time: number, ramp: number = 500): void {
        this.raw.execute(MethodType.SwitchOn, time, ramp);
    }
    switchOff(time: number, ramp: number = 500): void {
        this.raw.execute(MethodType.SwitchOff, time, ramp);
    }
}

class DimmRemote implements IDimm {
    constructor(private objectName: string, private gate: RemoteGate) {}

    addOnChange(_callback: () => void): void { /* Remote events are not supported */ }
    addOnSwitchOn(_callback: () => void): void { /* Remote events are not supported */ }
    addOnSwitchOff(_callback: () => void): void { /* Remote events are not supported */ }
    addOnRaiseValueSet(_callback: () => void): void { /* Remote events are not supported */ }
    addOnLowerValueSet(_callback: () => void): void { /* Remote events are not supported */ }
    addOnOutOfRange(_callback: () => void): void { /* Remote events are not supported */ }

    get value(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Value).build();
        return this.gate.runScript(cmd!);
    }
    set value(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.Value).addParameter(val).build();
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
    get statisticState(): StatisticStateType {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.StatisticState).build();
        return this.gate.runScript(cmd!);
    }
    set statisticState(val: StatisticStateType) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.StatisticState).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
    get load(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Load).build();
        return this.gate.runScript(cmd!);
    }
    set load(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.Load).addParameter(val).build();
        this.gate.runScript(cmd!);
    }

    setValue(value: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.Value).addParameter(value).build();
        this.gate.runScript(cmd!);
    }
    setRampTime(value: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.RampTime).addParameter(value).build();
        this.gate.runScript(cmd!);
    }
    setMinValue(value: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.MinValue).addParameter(value).build();
        this.gate.runScript(cmd!);
    }
    setMaxValue(value: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.MaxValue).addParameter(value).build();
        this.gate.runScript(cmd!);
    }

    hold(ramp: number = 500): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.Hold).addParameter(ramp).build();
        this.gate.runScript(cmd!);
    }
    switch(time: number, ramp: number = 500): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.Switch).addParameter(time).addParameter(ramp).build();
        this.gate.runScript(cmd!);
    }
    switchOn(time: number, ramp: number = 500): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SwitchOn).addParameter(time).addParameter(ramp).build();
        this.gate.runScript(cmd!);
    }
    switchOff(time: number, ramp: number = 500): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SwitchOff).addParameter(time).addParameter(ramp).build();
        this.gate.runScript(cmd!);
    }
}

export { Dimm, DimmRaw, DimmRemote, StatisticStateType }
