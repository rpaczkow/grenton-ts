// Created from: packages/grenton-api/interfaces/module_one_wire_fv01_28.xml, object name="ONEW_SENSOR" version="01" typeId="28"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnChange = 0,
    OnRise = 1,
    OnLower = 2,
    OnOutOfRange = 3
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
    /**
     * Zdarzenie wywoływane przy zmianie wartości wyjścia
     * @param callback
     */
    addOnChange: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po przekroczeniu górnego progu histerezy (zbocze rosnące)
     * @param callback
     */
    addOnRise: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po przekroczeniu dolnego progu histerezy (zbocze opadające)
     * @param callback
     */
    addOnLower: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane gdy wartość na wejściu znajduje się poza wyznaczonym zakresem (MinValue - MaxValue)
     * @param callback
     */
    addOnOutOfRange: (callback: () => void) => void
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

    constructor(private raw: OnewSensorRaw) {
        this.raw.add_event(EventType.OnChange, () => {
            this.onChangeCallbacks.forEach(callback => {
                callback();
            });
        });

        this.raw.add_event(EventType.OnRise, () => {
            this.onRiseCallbacks.forEach(callback => {
                callback();
            });
        });

        this.raw.add_event(EventType.OnLower, () => {
            this.onLowerCallbacks.forEach(callback => {
                callback();
            });
        });

        this.raw.add_event(EventType.OnOutOfRange, () => {
            this.onOutOfRangeCallbacks.forEach(callback => {
                callback();
            });
        });
    }

    /**
     * Zdarzenie wywoływane przy zmianie wartości wyjścia
     * @param callback
     */
    addOnChange(callback: () => void): void {
        this.onChangeCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po przekroczeniu górnego progu histerezy (zbocze rosnące)
     * @param callback
     */
    addOnRise(callback: () => void): void {
        this.onRiseCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po przekroczeniu dolnego progu histerezy (zbocze opadające)
     * @param callback
     */
    addOnLower(callback: () => void): void {
        this.onLowerCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane gdy wartość na wejściu znajduje się poza wyznaczonym zakresem (MinValue - MaxValue)
     * @param callback
     */
    addOnOutOfRange(callback: () => void): void {
        this.onOutOfRangeCallbacks.push(callback);
    }
    /**
     * Wartość wejścia
     * @returns {number}
     */
    get value(): number {
        return this.raw.get(PropertyType.Value);
    }
    /**
     * Wielkość histerezy (dokładność 0.1 °C lub 0.1%), określajaca czułość przy której następuje wygenerowanie zdarzeń: OnChange, OnLower, OnRise
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
}

class OnewSensorRemote implements IOnewSensor {
    constructor(private objectName: string, private gate: RemoteGate) {

    }

    /**
     * Zdarzenie wywoływane przy zmianie wartości wyjścia
     * @param callback
     */
    addOnChange(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane po przekroczeniu górnego progu histerezy (zbocze rosnące)
     * @param callback
     */
    addOnRise(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane po przekroczeniu dolnego progu histerezy (zbocze opadające)
     * @param callback
     */
    addOnLower(_callback: () => void): void {
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
     * Wielkość histerezy (dokładność 0.1 °C lub 0.1%), określajaca czułość przy której następuje wygenerowanie zdarzeń: OnChange, OnLower, OnRise
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
}

export { OnewSensor, OnewSensorRaw, OnewSensorRemote }
