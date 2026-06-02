// Created from: packages/grenton-api/interfaces/module_SMART_PANEL_FM_4_fv04_03.xml, object name="PANELSENSLIGHT" version="04.03"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnChange = 0,
    OnRaiseValue = 1,
    OnLowerValue = 2,
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
    addOnChange: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane przy zmianie wartości na wyższą (zbocze narastające)
     * @param callback
     */
    addOnRaiseValue: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane przy zmianie wartości na niższą (zbocze opadające)
     * @param callback
     */
    addOnLowerValue: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane, gdy wartość na wejściu znajduje się poza wyznaczonym zakresem (MinValue - MaxValue)
     * @param callback
     */
    addOnOutOfRange: (callback: () => void) => void
    /** Wartość wejścia w zakresie od 0 do 100 % */
    readonly value: number
    /** Wielkość histerezy (dokładność 0.1%) określająca czułość, przy której następuje wygenerowanie zdarzeń: OnChange, OnLowerValue, OnRaiseValue */
    threshold: number
    /** Okres (w ms), w którym próbkowane wartości są uśredniane */
    sensitivity: number
    /** Minimalna wartość cechy Value, której przekroczenie wywołuje zdarzenie OnOutOfRange */
    minValue: number
    /** Maksymalna wartość cechy Value, której przekroczenie wywołuje zdarzenie OnOutOfRange */
    maxValue: number
}

class PanelSensLightRemote implements IPanelSensLight {
    constructor(private objectName: string, private gate: RemoteGate) {
    }

    addOnChange(_callback: () => void): void {
        // Remote events are not supported
    }
    addOnRaiseValue(_callback: () => void): void {
        // Remote events are not supported
    }
    addOnLowerValue(_callback: () => void): void {
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

    /** Wielkość histerezy (dokładność 0.1%) określająca czułość, przy której następuje wygenerowanie zdarzeń: OnChange, OnLowerValue, OnRaiseValue */
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

    /** Okres (w ms), w którym próbkowane wartości są uśredniane */
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
    private onChangeCallbacks: Array<() => void> = [];
    private onRaiseValueCallbacks: Array<() => void> = [];
    private onLowerValueCallbacks: Array<() => void> = [];
    private onOutOfRangeCallbacks: Array<() => void> = [];

    constructor(private raw: PanelSensLightRaw) {
        this.raw.add_event(EventType.OnChange, () => {
            this.onChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnRaiseValue, () => {
            this.onRaiseValueCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnLowerValue, () => {
            this.onLowerValueCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnOutOfRange, () => {
            this.onOutOfRangeCallbacks.forEach(callback => { callback(); });
        });
    }

    /**
     * Zdarzenie wywoływane w przypadku zmiany wartości cechy Value
     * @param callback
     */
    addOnChange(callback: () => void): void {
        this.onChangeCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane przy zmianie wartości na wyższą (zbocze narastające)
     * @param callback
     */
    addOnRaiseValue(callback: () => void): void {
        this.onRaiseValueCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane przy zmianie wartości na niższą (zbocze opadające)
     * @param callback
     */
    addOnLowerValue(callback: () => void): void {
        this.onLowerValueCallbacks.push(callback);
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
    /** Wielkość histerezy (dokładność 0.1%) określająca czułość, przy której następuje wygenerowanie zdarzeń: OnChange, OnLowerValue, OnRaiseValue */
    get threshold(): number {
        return this.raw.get(PropertyType.Threshold);
    }
    set threshold(value: number) {
        this.raw.set(PropertyType.Threshold, value);
    }
    /** Okres (w ms), w którym próbkowane wartości są uśredniane */
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
