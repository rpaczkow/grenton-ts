// Created from: src/interfaces/module_2_0_MULTISENSOR_fv01_02.xml, object name="LIGHT_SENSOR_LUX"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum StatisticStateType {
    Off = 0,
    On = 1,
}

enum EventType {
    OnValueChange = 0,
    OnValueRise = 1,
    OnValueLower = 2,
    OnOutOfRange = 3,
    OnInRange = 4,
}

enum PropertyType {
    Value = 0,
    Threshold = 1,
    Sensitivity = 2,
    MinValue = 3,
    MaxValue = 4,
    StatisticState = 5,
}

declare class LightSensorLuxRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
}

interface ILightSensorLux {
    /**
     * Zdarzenie wywoływane w przypadku zmiany wartości cechy Value
     * @param callback
     */
    addOnValueChange: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane przy zmianie wartości na wyższą (zbocze narastające)
     * @param callback
     */
    addOnValueRise: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane przy zmianie wartości na niższą (zbocze opadające)
     * @param callback
     */
    addOnValueLower: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane, gdy wartość na wejściu znajduje się poza wyznaczonym zakresem (MinValue - MaxValue)
     * @param callback
     */
    addOnOutOfRange: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane, gdy wartość na wejściu powróciła do zakresu (MinValue - MaxValue)
     * @param callback
     */
    addOnInRange: (callback: () => void) => void
    /** Wartość natężenia światła w zakresie od 0 do 15000 lx */
    readonly value: number
    /** Wielkość histerezy (dokładność 0.1 lx) określająca czułość, przy której następuje wygenerowanie zdarzeń: OnValueChange, OnValueLower, OnValueRise */
    threshold: number
    /** Czas (w ms), dla którego próbkowane wartości są uśredniane */
    sensitivity: number
    /** Minimalna wartość cechy Value, której przekroczenie wywołuje zdarzenie OnOutOfRange */
    minValue: number
    /** Maksymalna wartość cechy Value, której przekroczenie wywołuje zdarzenie OnOutOfRange */
    maxValue: number
    /** Włącza raportowanie pomiaru do modułu statystyk */
    statisticState: StatisticStateType
}

class LightSensorLux implements ILightSensorLux {
    private onValueChangeCallbacks: Array<() => void> = [];
    private onValueRiseCallbacks: Array<() => void> = [];
    private onValueLowerCallbacks: Array<() => void> = [];
    private onOutOfRangeCallbacks: Array<() => void> = [];
    private onInRangeCallbacks: Array<() => void> = [];

    constructor(private raw: LightSensorLuxRaw) {
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
    }

    addOnValueChange(callback: () => void): void {
        this.onValueChangeCallbacks.push(callback);
    }
    addOnValueRise(callback: () => void): void {
        this.onValueRiseCallbacks.push(callback);
    }
    addOnValueLower(callback: () => void): void {
        this.onValueLowerCallbacks.push(callback);
    }
    addOnOutOfRange(callback: () => void): void {
        this.onOutOfRangeCallbacks.push(callback);
    }
    addOnInRange(callback: () => void): void {
        this.onInRangeCallbacks.push(callback);
    }
    get value(): number {
        return this.raw.get(PropertyType.Value);
    }
    get threshold(): number {
        return this.raw.get(PropertyType.Threshold);
    }
    set threshold(value: number) {
        this.raw.set(PropertyType.Threshold, value);
    }
    get sensitivity(): number {
        return this.raw.get(PropertyType.Sensitivity);
    }
    set sensitivity(value: number) {
        this.raw.set(PropertyType.Sensitivity, value);
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
    get statisticState(): StatisticStateType {
        return this.raw.get(PropertyType.StatisticState);
    }
    set statisticState(value: StatisticStateType) {
        this.raw.set(PropertyType.StatisticState, value);
    }
}

class LightSensorLuxRemote implements ILightSensorLux {
    constructor(private objectName: string, private gate: RemoteGate) {
    }

    addOnValueChange(_callback: () => void): void {
        // Remote events are not supported
    }
    addOnValueRise(_callback: () => void): void {
        // Remote events are not supported
    }
    addOnValueLower(_callback: () => void): void {
        // Remote events are not supported
    }
    addOnOutOfRange(_callback: () => void): void {
        // Remote events are not supported
    }
    addOnInRange(_callback: () => void): void {
        // Remote events are not supported
    }

    get value(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Value)
            .build();
        return this.gate.runScript(cmd!);
    }
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
    get sensitivity(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Sensitivity)
            .build();
        return this.gate.runScript(cmd!);
    }
    set sensitivity(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Sensitivity)
            .addParameter(value)
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

export { LightSensorLux, LightSensorLuxRaw, LightSensorLuxRemote, StatisticStateType }
