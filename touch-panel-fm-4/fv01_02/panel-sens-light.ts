// Created from: packages/grenton-api/interfaces/module_2_0_TOUCH_PANEL_FM_4_fv01_02.xml, object name="PANELSENSLIGHT" version="01.02"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnValueChange = 0,
    OnValueRise = 1,
    OnValueLower = 2,
    OnOutOfRange = 3,
}

enum PropertyType {
    Value = 0,
    Threshold = 1,
    Sensitivity = 2,
    MinValue = 3,
    MaxValue = 4,
}

declare class PanelSensLightRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
}

interface IPanelSensLight {
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
    /** Wartość wejścia w zakresie od 0 do 100 % */
    readonly value: number
    /** Wielkość histerezy (dokładność 0.1%) określająca czułość, przy której następuje wygenerowanie zdarzeń: OnValueChange, OnValueLower, OnValueRise */
    threshold: number
    /** Czas (w ms), dla którego próbkowane wartości są uśredniane */
    sensitivity: number
    /** Minimalna wartość cechy Value, której przekroczenie wywołuje zdarzenie OnOutOfRange */
    minValue: number
    /** Maksymalna wartość cechy Value, której przekroczenie wywołuje zdarzenie OnOutOfRange */
    maxValue: number
}

class PanelSensLightRemote implements IPanelSensLight {
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

    /** Wartość wejścia w zakresie od 0 do 100 % */
    get value(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Value)
            .build();
        return this.gate.runScript(cmd!);
    }

    /** Wielkość histerezy (dokładność 0.1%) określająca czułość, przy której następuje wygenerowanie zdarzeń: OnValueChange, OnValueLower, OnValueRise */
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

    /** Czas (w ms), dla którego próbkowane wartości są uśredniane */
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

    /** Minimalna wartość cechy Value, której przekroczenie wywołuje zdarzenie OnOutOfRange */
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

    /** Maksymalna wartość cechy Value, której przekroczenie wywołuje zdarzenie OnOutOfRange */
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

class PanelSensLight implements IPanelSensLight {
    private onValueChangeCallbacks: Array<() => void> = [];
    private onValueRiseCallbacks: Array<() => void> = [];
    private onValueLowerCallbacks: Array<() => void> = [];
    private onOutOfRangeCallbacks: Array<() => void> = [];

    constructor(private raw: PanelSensLightRaw) {
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
    }

    /**
     * Zdarzenie wywoływane w przypadku zmiany wartości cechy Value
     * @param callback
     */
    addOnValueChange(callback: () => void): void {
        this.onValueChangeCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane przy zmianie wartości na wyższą (zbocze narastające)
     * @param callback
     */
    addOnValueRise(callback: () => void): void {
        this.onValueRiseCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane przy zmianie wartości na niższą (zbocze opadające)
     * @param callback
     */
    addOnValueLower(callback: () => void): void {
        this.onValueLowerCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane, gdy wartość na wejściu znajduje się poza wyznaczonym zakresem (MinValue - MaxValue)
     * @param callback
     */
    addOnOutOfRange(callback: () => void): void {
        this.onOutOfRangeCallbacks.push(callback);
    }
    /** Wartość wejścia w zakresie od 0 do 100 % */
    get value(): number {
        return this.raw.get(PropertyType.Value);
    }
    /** Wielkość histerezy (dokładność 0.1%) określająca czułość, przy której następuje wygenerowanie zdarzeń: OnValueChange, OnValueLower, OnValueRise */
    get threshold(): number {
        return this.raw.get(PropertyType.Threshold);
    }
    set threshold(value: number) {
        this.raw.set(PropertyType.Threshold, value);
    }
    /** Czas (w ms), dla którego próbkowane wartości są uśredniane */
    get sensitivity(): number {
        return this.raw.get(PropertyType.Sensitivity);
    }
    set sensitivity(value: number) {
        this.raw.set(PropertyType.Sensitivity, value);
    }
    /** Minimalna wartość cechy Value, której przekroczenie wywołuje zdarzenie OnOutOfRange */
    get minValue(): number {
        return this.raw.get(PropertyType.MinValue);
    }
    set minValue(value: number) {
        this.raw.set(PropertyType.MinValue, value);
    }
    /** Maksymalna wartość cechy Value, której przekroczenie wywołuje zdarzenie OnOutOfRange */
    get maxValue(): number {
        return this.raw.get(PropertyType.MaxValue);
    }
    set maxValue(value: number) {
        this.raw.set(PropertyType.MaxValue, value);
    }
}

export { PanelSensLight, PanelSensLightRaw, PanelSensLightRemote }
