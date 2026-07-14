// Created from: src/interfaces/module_grenton_v2_led_zwave_ff.xml, object name="ZWAVE_1W_SENSOR"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum StatisticStateType {
    Off = 0,
    On = 1
}

enum EventType {
    OnValueChange = 0,
    OnValueRise = 1,
    OnValueLower = 2,
    OnOutOfRange = 3,
    OnInRange = 4,
    OnConnect = 5,
    OnDisconnect = 6
}

enum PropertyType {
    Value = 0,
    MinValue = 1,
    MaxValue = 2,
    Status = 3,
    StatisticState = 4
}

declare class Zwave1wSensorRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
}

interface IZwave1wSensor {
    /** Zdarzenie wywoływane przy zmianie wartości wyjścia */
    addOnValueChange: (callback: () => void) => void
    /** Zdarzenie wywoływane po przekroczeniu górnego progu histerezy (zbocze rosnące) */
    addOnValueRise: (callback: () => void) => void
    /** Zdarzenie wywoływane po przekroczeniu dolnego progu histerezy (zbocze opadające) */
    addOnValueLower: (callback: () => void) => void
    /** Zdarzenie wywoływane gdy wartość na wyjściu znajduje się poza wyznaczonym zakresem (MinValue - MaxValue) */
    addOnOutOfRange: (callback: () => void) => void
    /** Zdarzenie wywoływane przy powrocie wartości do przedziału wewnątrz wartości progowych (MinValue - MaxValue) */
    addOnInRange: (callback: () => void) => void
    /** Zdarzenie wywoływane podczas połączenia się z czujnikiem */
    addOnConnect: (callback: () => void) => void
    /** Zdarzenie wywoływane podczas rozłączenia się z czujnikiem */
    addOnDisconnect: (callback: () => void) => void
    /** Wartość wejścia */
    readonly value: number
    /** Wartość minimalna po przekroczeniu której generowane jest zdarzenie OnOutRange */
    minValue: number
    /** Wartość maksymalna po przekroczeniu której generowane jest zdarzenie OnOutRange */
    maxValue: number
    /** Status połączenia czujnika:\n0 - rozłączony,\n1 - połączony */
    readonly status: number
    /** Włącza raportowanie pomiaru do modułu statystyk */
    statisticState: StatisticStateType
}

class Zwave1wSensor implements IZwave1wSensor {
    private onValueChangeCallbacks: Array<() => void> = [];
    private onValueRiseCallbacks: Array<() => void> = [];
    private onValueLowerCallbacks: Array<() => void> = [];
    private onOutOfRangeCallbacks: Array<() => void> = [];
    private onInRangeCallbacks: Array<() => void> = [];
    private onConnectCallbacks: Array<() => void> = [];
    private onDisconnectCallbacks: Array<() => void> = [];

    constructor(private raw: Zwave1wSensorRaw) {
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
        this.raw.add_event(EventType.OnConnect, () => {
            this.onConnectCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnDisconnect, () => {
            this.onDisconnectCallbacks.forEach(callback => { callback(); });
        });
    }

    addOnValueChange(callback: () => void): void { this.onValueChangeCallbacks.push(callback); }
    addOnValueRise(callback: () => void): void { this.onValueRiseCallbacks.push(callback); }
    addOnValueLower(callback: () => void): void { this.onValueLowerCallbacks.push(callback); }
    addOnOutOfRange(callback: () => void): void { this.onOutOfRangeCallbacks.push(callback); }
    addOnInRange(callback: () => void): void { this.onInRangeCallbacks.push(callback); }
    addOnConnect(callback: () => void): void { this.onConnectCallbacks.push(callback); }
    addOnDisconnect(callback: () => void): void { this.onDisconnectCallbacks.push(callback); }

    get value(): number { return this.raw.get(PropertyType.Value); }
    get minValue(): number { return this.raw.get(PropertyType.MinValue); }
    set minValue(val: number) { this.raw.set(PropertyType.MinValue, val); }
    get maxValue(): number { return this.raw.get(PropertyType.MaxValue); }
    set maxValue(val: number) { this.raw.set(PropertyType.MaxValue, val); }
    get status(): number { return this.raw.get(PropertyType.Status); }
    get statisticState(): StatisticStateType { return this.raw.get(PropertyType.StatisticState); }
    set statisticState(val: StatisticStateType) { this.raw.set(PropertyType.StatisticState, val); }
}

class Zwave1wSensorRemote implements IZwave1wSensor {
    constructor(private objectName: string, private gate: RemoteGate) {}

    addOnValueChange(_callback: () => void): void { /* Remote events are not supported */ }
    addOnValueRise(_callback: () => void): void { /* Remote events are not supported */ }
    addOnValueLower(_callback: () => void): void { /* Remote events are not supported */ }
    addOnOutOfRange(_callback: () => void): void { /* Remote events are not supported */ }
    addOnInRange(_callback: () => void): void { /* Remote events are not supported */ }
    addOnConnect(_callback: () => void): void { /* Remote events are not supported */ }
    addOnDisconnect(_callback: () => void): void { /* Remote events are not supported */ }

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
    get status(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Status).build();
        return this.gate.runScript(cmd!);
    }
    get statisticState(): StatisticStateType {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.StatisticState).build();
        return this.gate.runScript(cmd!);
    }
    set statisticState(val: StatisticStateType) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.StatisticState).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
}

export { Zwave1wSensor, Zwave1wSensorRaw, Zwave1wSensorRemote, StatisticStateType }
