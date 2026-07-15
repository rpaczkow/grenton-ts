// Created from: src/interfaces/module_one_wire_fv01_28.xml, object name="ONEW_SENSOR"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnChange = 0,
    OnRise = 1,
    OnLower = 2,
    OnOutOfRange = 3,
    OnConnect = 4,
    OnDisconnect = 5
}

enum PropertyType {
    Value = 0,
    Threshold = 1,
    MinValue = 2,
    MaxValue = 3
}

enum MethodType {}

declare class OnewSensorRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface IOnewSensor {
    /** Zdarzenie wywoływane przy zmianie wartości wyjścia */
    addOnChange: (callback: () => void) => void
    /** Zdarzenie wywoływane po przekroczeniu górnego progu histerezy (zbocze rosnące) */
    addOnRise: (callback: () => void) => void
    /** Zdarzenie wywoływane po przekroczeniu dolnego progu histerezy (zbocze opadające) */
    addOnLower: (callback: () => void) => void
    /** Zdarzenie wywoływane gdy wartość na wejściu znajduje się poza wyznaczonym zakresem (MinValue - MaxValue) */
    addOnOutOfRange: (callback: () => void) => void
    /** Zdarzenie wywoływane podczas połączenia się z czujnikiem */
    addOnConnect: (callback: () => void) => void
    /** Zdarzenie wywoływane podczas rozłączenia się z czujnikiem */
    addOnDisconnect: (callback: () => void) => void
    /** Wartość wejścia */
    readonly value: number
    /** Wielkość histerezy (dokładność 0.1 °C lub 0.1%), określajaca czułość przy której następuje wygenerowanie zdarzeń: OnChange, OnLower, OnRise */
    threshold: number
    /** Wartość minimalna po przekroczeniu której generowane jest zdarzenie OnOutOfRange */
    minValue: number
    /** Wartość maksymalna po przekroczeniu której generowane jest zdarzenie OnOutOfRange */
    maxValue: number
}

class OnewSensor implements IOnewSensor {
    private onChangeCallbacks: Array<() => void> = [];
    private onRiseCallbacks: Array<() => void> = [];
    private onLowerCallbacks: Array<() => void> = [];
    private onOutOfRangeCallbacks: Array<() => void> = [];
    private onConnectCallbacks: Array<() => void> = [];
    private onDisconnectCallbacks: Array<() => void> = [];

    constructor(private raw: OnewSensorRaw) {
        this.raw.add_event(EventType.OnChange, () => {
            this.onChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnRise, () => {
            this.onRiseCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnLower, () => {
            this.onLowerCallbacks.forEach(callback => { callback(); });
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

    addOnChange(callback: () => void): void { this.onChangeCallbacks.push(callback); }
    addOnRise(callback: () => void): void { this.onRiseCallbacks.push(callback); }
    addOnLower(callback: () => void): void { this.onLowerCallbacks.push(callback); }
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
}

class OnewSensorRemote implements IOnewSensor {
    constructor(private objectName: string, private gate: RemoteGate) {}

    addOnChange(_callback: () => void): void { /* Remote events are not supported */ }
    addOnRise(_callback: () => void): void { /* Remote events are not supported */ }
    addOnLower(_callback: () => void): void { /* Remote events are not supported */ }
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
}

export { OnewSensor, OnewSensorRaw, OnewSensorRemote }
