// Created from: packages/grenton-api/interfaces/module_one_wire_fv03_28.xml, object name="ONEW_SENSOR" version="03" typeId="28"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

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

enum StatusType {
    Disconnected = 0,
    Connected = 1,
    ResetState = 2,
    Unreachable = 3
}

enum StatisticStateType {
    Off = 0,
    On = 1
}

declare class OnewSensorRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface IOnewSensor {
    /**
     * Zdarzenie wywoływane przy zmianie wartości wejścia
     * @param callback
     */
    addOnValueChange: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po przekroczeniu górnego progu histerezy (zbocze rosnące)
     * @param callback
     */
    addOnValueRise: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po przekroczeniu dolnego progu histerezy (zbocze opadające)
     * @param callback
     */
    addOnValueLower: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane gdy wartość na wejściu znajduje się poza wyznaczonym zakresem (MinValue - MaxValue)
     * @param callback
     */
    addOnOutOfRange: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane podczas połączenia się z czujnikiem
     * @param callback
     */
    addOnConnect: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane podczas rozłączenia się z czujnikiem
     * @param callback
     */
    addOnDisconnect: (callback: () => void) => void
    /** Wartość wejścia */
    readonly value: number
    /** Wielkość histerezy (dokładność 0.1 °C lub 0.1%), określająca czułość przy której następuje wygenerowanie zdarzeń: OnValueChange, OnValueLower, OnValueRise */
    threshold: number
    /** Wartość minimalna po przekroczeniu której generowane jest zdarzenie OnOutOfRange */
    minValue: number
    /** Wartość maksymalna po przekroczeniu której generowane jest zdarzenie OnOutOfRange */
    maxValue: number
    /** Status połączenia czujnika: 0 - rozłączony, 1 - połączony, 2 - czujnik w stanie resetu, 3 - brak połączenia z modułem (koncentratorem) */
    readonly status: StatusType
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
            this.onValueChangeCallbacks.forEach(callback => {
                callback();
            });
        });

        this.raw.add_event(EventType.OnValueRise, () => {
            this.onValueRiseCallbacks.forEach(callback => {
                callback();
            });
        });

        this.raw.add_event(EventType.OnValueLower, () => {
            this.onValueLowerCallbacks.forEach(callback => {
                callback();
            });
        });

        this.raw.add_event(EventType.OnOutOfRange, () => {
            this.onOutOfRangeCallbacks.forEach(callback => {
                callback();
            });
        });

        this.raw.add_event(EventType.OnConnect, () => {
            this.onConnectCallbacks.forEach(callback => {
                callback();
            });
        });

        this.raw.add_event(EventType.OnDisconnect, () => {
            this.onDisconnectCallbacks.forEach(callback => {
                callback();
            });
        });
    }

    /**
     * Zdarzenie wywoływane przy zmianie wartości wejścia
     * @param callback
     */
    addOnValueChange(callback: () => void): void {
        this.onValueChangeCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po przekroczeniu górnego progu histerezy (zbocze rosnące)
     * @param callback
     */
    addOnValueRise(callback: () => void): void {
        this.onValueRiseCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po przekroczeniu dolnego progu histerezy (zbocze opadające)
     * @param callback
     */
    addOnValueLower(callback: () => void): void {
        this.onValueLowerCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane gdy wartość na wejściu znajduje się poza wyznaczonym zakresem (MinValue - MaxValue)
     * @param callback
     */
    addOnOutOfRange(callback: () => void): void {
        this.onOutOfRangeCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane podczas połączenia się z czujnikiem
     * @param callback
     */
    addOnConnect(callback: () => void): void {
        this.onConnectCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane podczas rozłączenia się z czujnikiem
     * @param callback
     */
    addOnDisconnect(callback: () => void): void {
        this.onDisconnectCallbacks.push(callback);
    }
    /**
     * Wartość wejścia
     * @returns {number}
     */
    get value(): number {
        return this.raw.get(PropertyType.Value);
    }
    /**
     * Wielkość histerezy (dokładność 0.1 °C lub 0.1%), określająca czułość przy której następuje wygenerowanie zdarzeń: OnValueChange, OnValueLower, OnValueRise
     * @returns {number}
     */
    get threshold(): number {
        return this.raw.get(PropertyType.Threshold);
    }
    set threshold(value: number) {
        this.raw.set(PropertyType.Threshold, value);
    }
    /**
     * Wartość minimalna po przekroczeniu której generowane jest zdarzenie OnOutOfRange
     * @returns {number}
     */
    get minValue(): number {
        return this.raw.get(PropertyType.MinValue);
    }
    set minValue(value: number) {
        this.raw.set(PropertyType.MinValue, value);
    }
    /**
     * Wartość maksymalna po przekroczeniu której generowane jest zdarzenie OnOutOfRange
     * @returns {number}
     */
    get maxValue(): number {
        return this.raw.get(PropertyType.MaxValue);
    }
    set maxValue(value: number) {
        this.raw.set(PropertyType.MaxValue, value);
    }
    /**
     * Status połączenia czujnika: 0 - rozłączony, 1 - połączony, 2 - czujnik w stanie resetu, 3 - brak połączenia z modułem (koncentratorem)
     * @returns {StatusType}
     */
    get status(): StatusType {
        return this.raw.get(PropertyType.Status);
    }
    /**
     * Numer seryjny modułu do którego podłączony jest czujnik. 0 oznacza, że czujnik nie został wykryty po włączeniu koncentratora
     * @returns {number}
     */
    get hubSerialNumber(): number {
        return this.raw.get(PropertyType.HubSerialNumber);
    }
    /**
     * Unikalny, pełny numer seryjny czujnika. 0 oznacza, że czujnik nie został wykryty po włączeniu koncentratora
     * @returns {number}
     */
    get sensorSerialNumber(): number {
        return this.raw.get(PropertyType.SensorSerialNumber);
    }
    /**
     * Włącza raportowanie pomiaru do modułu statystyk
     * @returns {StatisticStateType}
     */
    get statisticState(): StatisticStateType {
        return this.raw.get(PropertyType.StatisticState);
    }
    set statisticState(value: StatisticStateType) {
        this.raw.set(PropertyType.StatisticState, value);
    }
}

class OnewSensorRemote implements IOnewSensor {
    constructor(private objectName: string, private gate: RemoteGate) {

    }

    /**
     * Zdarzenie wywoływane przy zmianie wartości wejścia
     * @param callback
     */
    addOnValueChange(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane po przekroczeniu górnego progu histerezy (zbocze rosnące)
     * @param callback
     */
    addOnValueRise(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane po przekroczeniu dolnego progu histerezy (zbocze opadające)
     * @param callback
     */
    addOnValueLower(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane gdy wartość na wejściu znajduje się poza wyznaczonym zakresem (MinValue - MaxValue)
     * @param callback
     */
    addOnOutOfRange(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane podczas połączenia się z czujnikiem
     * @param callback
     */
    addOnConnect(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane podczas rozłączenia się z czujnikiem
     * @param callback
     */
    addOnDisconnect(_callback: () => void): void {
        // Remote events are not supported
    }

    /**
     * Wartość wejścia
     * @returns {number}
     */
    get value(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Value)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Wielkość histerezy (dokładność 0.1 °C lub 0.1%), określająca czułość przy której następuje wygenerowanie zdarzeń: OnValueChange, OnValueLower, OnValueRise
     * @returns {number}
     */
    get threshold(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Threshold)
            .build();
        return this.gate.runScript(cmd!);
    }

    set threshold(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Threshold)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Wartość minimalna po przekroczeniu której generowane jest zdarzenie OnOutOfRange
     * @returns {number}
     */
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
     * Wartość maksymalna po przekroczeniu której generowane jest zdarzenie OnOutOfRange
     * @returns {number}
     */
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
     * Status połączenia czujnika: 0 - rozłączony, 1 - połączony, 2 - czujnik w stanie resetu, 3 - brak połączenia z modułem (koncentratorem)
     * @returns {StatusType}
     */
    get status(): StatusType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Status)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Numer seryjny modułu do którego podłączony jest czujnik. 0 oznacza, że czujnik nie został wykryty po włączeniu koncentratora
     * @returns {number}
     */
    get hubSerialNumber(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.HubSerialNumber)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Unikalny, pełny numer seryjny czujnika. 0 oznacza, że czujnik nie został wykryty po włączeniu koncentratora
     * @returns {number}
     */
    get sensorSerialNumber(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.SensorSerialNumber)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Włącza raportowanie pomiaru do modułu statystyk
     * @returns {StatisticStateType}
     */
    get statisticState(): StatisticStateType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.StatisticState)
            .build();
        return this.gate.runScript(cmd!);
    }

    set statisticState(value: StatisticStateType) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.StatisticState)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
}

export { OnewSensor, OnewSensorRaw, OnewSensorRemote, StatusType, StatisticStateType }
