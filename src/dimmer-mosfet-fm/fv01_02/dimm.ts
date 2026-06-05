// Created from: src/interfaces/module_2_0_DIMMER_MOSFET_FM_fv01_02.xml, object name="DIMM"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum StatisticStateType {
    Off = 0,
    Continuous = 1
}

enum DimmingEdgeType {
    TrailingEdge = 0,
    LeadingEdge = 1
}

enum EventType {
    OnValueChange = 0,
    OnSwitchOn = 1,
    OnSwitchOff = 2,
    OnValueRise = 3,
    OnValueLower = 4,
    OnOutOfRange = 5
}

enum PropertyType {
    Value = 0,
    RampTime = 1,
    MinValue = 2,
    MaxValue = 3,
    StatisticState = 4,
    Load = 5,
    StartLevel = 6,
    DimmingEdge = 7,
    DistributedLogicGroup = 8
}

enum MethodType {
    HoldValue = 0,
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
    /** Zdarzenie wywoływane przy zmianie wartości wyjścia */
    addOnValueChange: (callback: () => void) => void
    /** Zdarzenie wywoływane przy zmianie wartości wyjścia z MinValue na wartość większą */
    addOnSwitchOn: (callback: () => void) => void
    /** Zdarzenie wywoływane przy zmianie wartości wyjścia na MinValue */
    addOnSwitchOff: (callback: () => void) => void
    /** Zdarzenie wywoływane przy zmianie wartości wyjścia na większą niż poprzednia */
    addOnValueRise: (callback: () => void) => void
    /** Zdarzenie wywoływane przy zmianie wartości wyjścia na mniejszą niż poprzednia */
    addOnValueLower: (callback: () => void) => void
    /** Zdarzenie wywoływane przy zmianie wartości wyjścia na wartość spoza zakresu (MinValue - MaxValue) */
    addOnOutOfRange: (callback: () => void) => void
    /** Podaje aktualną wartość wyjścia (0.0 - 1.0) */
    value: number
    /** Wartość opóźnienia czasu rozjaśniania lub ściemniania wyjścia (w ms) */
    rampTime: number
    /** Minimalna wartość jaka może przyjąć Value */
    minValue: number
    /** Maksymalna wartość jaka może przyjąć Value */
    maxValue: number
    /** Włącza raportowanie pomiaru do modułu statystyk */
    statisticState: StatisticStateType
    /** Mnożnik mierzonej wartości */
    load: number
    /** Zwraca aktualną wartość progu załączenia wyjścia (0.0 - 1.0) */
    startLevel: number
    /** Zwraca aktualny typ rodzaju ściemniania */
    dimmingEdge: DimmingEdgeType
    /** Grupa Distributed Logic - grupa broadcastowa dla rozproszonej logiki */
    distributedLogicGroup: number
    /** Realizuje funkcję rozjaśniania/ściemniania wyjścia z użyciem Rampy podanej w parametrze */
    holdValue: (ramp?: number) => void
    /** Zmienia wartość wyjścia na przeciwny (MinValue - MaxValue) */
    switch: (time: number, ramp?: number) => void
    /** Ustawienie wartości wyjścia na MaxValue */
    switchOn: (time: number, ramp?: number) => void
    /** Ustawienie wartości wyjścia na MinValue */
    switchOff: (time: number, ramp?: number) => void
}

class Dimm implements IDimm {
    private onValueChangeCallbacks: Array<() => void> = [];
    private onSwitchOnCallbacks: Array<() => void> = [];
    private onSwitchOffCallbacks: Array<() => void> = [];
    private onValueRiseCallbacks: Array<() => void> = [];
    private onValueLowerCallbacks: Array<() => void> = [];
    private onOutOfRangeCallbacks: Array<() => void> = [];

    constructor(private raw: DimmRaw) {
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
        this.raw.add_event(EventType.OnOutOfRange, () => {
            this.onOutOfRangeCallbacks.forEach(callback => { callback(); });
        });
    }

    addOnValueChange(callback: () => void): void { this.onValueChangeCallbacks.push(callback); }
    addOnSwitchOn(callback: () => void): void { this.onSwitchOnCallbacks.push(callback); }
    addOnSwitchOff(callback: () => void): void { this.onSwitchOffCallbacks.push(callback); }
    addOnValueRise(callback: () => void): void { this.onValueRiseCallbacks.push(callback); }
    addOnValueLower(callback: () => void): void { this.onValueLowerCallbacks.push(callback); }
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
    get startLevel(): number { return this.raw.get(PropertyType.StartLevel); }
    set startLevel(val: number) { this.raw.set(PropertyType.StartLevel, val); }
    get dimmingEdge(): DimmingEdgeType { return this.raw.get(PropertyType.DimmingEdge); }
    set dimmingEdge(val: DimmingEdgeType) { this.raw.set(PropertyType.DimmingEdge, val); }
    get distributedLogicGroup(): number { return this.raw.get(PropertyType.DistributedLogicGroup); }
    set distributedLogicGroup(val: number) { this.raw.set(PropertyType.DistributedLogicGroup, val); }

    holdValue(ramp: number = 500): void {
        this.raw.execute(MethodType.HoldValue, ramp);
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

    addOnValueChange(_callback: () => void): void { /* Remote events are not supported */ }
    addOnSwitchOn(_callback: () => void): void { /* Remote events are not supported */ }
    addOnSwitchOff(_callback: () => void): void { /* Remote events are not supported */ }
    addOnValueRise(_callback: () => void): void { /* Remote events are not supported */ }
    addOnValueLower(_callback: () => void): void { /* Remote events are not supported */ }
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
    get startLevel(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.StartLevel).build();
        return this.gate.runScript(cmd!);
    }
    set startLevel(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.StartLevel).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
    get dimmingEdge(): DimmingEdgeType {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.DimmingEdge).build();
        return this.gate.runScript(cmd!);
    }
    set dimmingEdge(val: DimmingEdgeType) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.DimmingEdge).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
    get distributedLogicGroup(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.DistributedLogicGroup).build();
        return this.gate.runScript(cmd!);
    }
    set distributedLogicGroup(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.DistributedLogicGroup).addParameter(val).build();
        this.gate.runScript(cmd!);
    }

    holdValue(ramp: number = 500): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.HoldValue).addParameter(ramp).build();
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

export { Dimm, DimmRaw, DimmRemote, StatisticStateType, DimmingEdgeType }
