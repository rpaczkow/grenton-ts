// Created from: src/interfaces/module_one_wire_fv03_28.xml, object name="ONEW_SENSOR"

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
    OnConnect = 4,
    OnDisconnect = 5
}

enum PropertyType {
    Value = 0,
    Threshold = 1,
    MinValue = 2,
    MaxValue = 3,
    Status = 4,
    HubSerialNumber = 5,
    SensorSerialNumber = 6,
    StatisticState = 7
}

enum MethodType {}

declare class OnewSensorRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface IOnewSensor {
    /** Zdarzenie wywoływane przy zmianie wartości wejścia */
    addOnValueChange: (callback: () => void) => void
    /** Zdarzenie wywoływane po przekroczeniu górnego progu histerezy (zbocze rosnące) */
    addOnValueRise: (callback: () => void) => void
    /** Zdarzenie wywoływane po przekroczeniu dolnego progu histerezy (zbocze opadające) */
    addOnValueLower: (callback: () => void) => void
    /** Zdarzenie wywoływane gdy wartość na wejściu znajduje się poza wyznaczonym zakresem (MinValue - MaxValue) */
    addOnOutOfRange: (callback: () => void) => void
    /** Zdarzenie wywoływane podczas połączenia się z czujnikiem */
    addOnConnect: (callback: () => void) => void
    /** Zdarzenie wywoływane podczas rozłączenia się z czujnikiem */
    addOnDisconnect: (callback: () => void) => void
    /** Wartość wejścia */
    readonly value: number
    /** Wielkość histerezy (dokładność 0.1 °C lub 0.1%), określająca czułość przy której następuje wygenerowanie zdarzeń: OnValueChange, OnValueLower, OnValueRise */
    threshold: number
    /** Wartość minimalna po przekroczeniu której generowane jest zdarzenie OnOutOfRange */
    minValue: number
    /** Wartość maksymalna po przekroczeniu której generowane jest zdarzenie OnOutOfRange */
    maxValue: number
    /** Status połączenia czujnika:\n0 - rozłączony,\n1 - połączony,\n2 - czujnik w stanie resetu,\n3 - brak połączenia z modułem (koncentratorem) */
    readonly status: number
    /** Numer seryjny modułu do którego podłączony jest czujnik. 0 oznacza, że czujnik nie został wykryty po włączeniu koncentratora */
    readonly hubSerialNumber: number
    /** Unikalny, pełny numer seryjny czujnika. 0 oznacza, że czujnik nie został wykryty po włączeniu koncentratora */
    readonly sensorSerialNumber: number
    /** Włącza raportowanie pomiaru do modułu statystyk */
    statisticState: StatisticStateType
}

class OnewSensor implements IOnewSensor {
    private onValueChangeCallbacks: Array<() => void> = [];
    private onValueRiseCallbacks: Array<() => void> = [];
    private onValueLowerCallbacks: Array<() => void> = [];
    private onOutOfRangeCallbacks: Array<() => void> = [];
    private onConnectCallbacks: Array<() => void> = [];
    private onDisconnectCallbacks: Array<() => void> = [];

    constructor(private raw: OnewSensorRaw) {
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
    addOnConnect(callback: () => void): void { this.onConnectCallbacks.push(callback); }
    addOnDisconnect(callback: () => void): void { this.onDisconnectCallbacks.push(callback); }

    get value(): number { return this.raw.get(PropertyType.Value); }
    get threshold(): number { return this.raw.get(PropertyType.Threshold); }
    set threshold(val: number) { this.raw.set(PropertyType.Threshold, val); }
    get minValue(): number { return this.raw.get(PropertyType.MinValue); }
    set minValue(val: number) { this.raw.set(PropertyType.MinValue, val); }
    get maxValue(): number { return this.raw.get(PropertyType.MaxValue); }
    set maxValue(val: number) { this.raw.set(PropertyType.MaxValue, val); }
    get status(): number { return this.raw.get(PropertyType.Status); }
    get hubSerialNumber(): number { return this.raw.get(PropertyType.HubSerialNumber); }
    get sensorSerialNumber(): number { return this.raw.get(PropertyType.SensorSerialNumber); }
    get statisticState(): StatisticStateType { return this.raw.get(PropertyType.StatisticState); }
    set statisticState(val: StatisticStateType) { this.raw.set(PropertyType.StatisticState, val); }
}

class OnewSensorRemote implements IOnewSensor {
    constructor(private objectName: string, private gate: RemoteGate) {}

    addOnValueChange(_callback: () => void): void { /* Remote events are not supported */ }
    addOnValueRise(_callback: () => void): void { /* Remote events are not supported */ }
    addOnValueLower(_callback: () => void): void { /* Remote events are not supported */ }
    addOnOutOfRange(_callback: () => void): void { /* Remote events are not supported */ }
    addOnConnect(_callback: () => void): void { /* Remote events are not supported */ }
    addOnDisconnect(_callback: () => void): void { /* Remote events are not supported */ }

    get value(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Value).build();
        return this.gate.runScript(cmd!);
    }
    get threshold(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Threshold).build();
        return this.gate.runScript(cmd!);
    }
    set threshold(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.Threshold).addParameter(val).build();
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
    get status(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Status).build();
        return this.gate.runScript(cmd!);
    }
    get hubSerialNumber(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.HubSerialNumber).build();
        return this.gate.runScript(cmd!);
    }
    get sensorSerialNumber(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.SensorSerialNumber).build();
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

export { OnewSensor, OnewSensorRaw, OnewSensorRemote, StatisticStateType }
