// Created from: src/interfaces/module_butt_fv08_2.xml, object name="PANELSENSLIGHT"

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
    Sensitivity = 2,
    MinValue = 3,
    MaxValue = 4
}

enum MethodType {}

declare class PanelSensLightRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface IPanelSensLight {
    /** Zdarzenie wywoływane w przypadku zmiany stanu na przeciwny */
    addOnChange: (callback: () => void) => void
    /** Zdarzenie wywoływane przy zmianie wartości na wyższą (zbocze narastające) */
    addOnRise: (callback: () => void) => void
    /** Zdarzenie wywoływane przy zmianie wartości na niższą (zbocze opadające) */
    addOnLower: (callback: () => void) => void
    /** Zdarzenie wywoływane, gdy wartość na wyjściu znajduje się poza wyznaczonym zakresem (MinValue - MaxValue) */
    addOnOutOfRange: (callback: () => void) => void
    /** Wartość wejścia w zakresie od 0 do 100 % */
    readonly value: number
    /** Wielkość histerezy (dokładność 0.1%) określajaca czułość, przy której następuje wygenerowanie zdarzeń: OnChange, OnLower, OnRise */
    threshold: number
    /** Czas (w ms), dla którego próbkowane wartości są uśredniane */
    sensitivity: number
    /** Minimalna wartość cechy Value, której przekroczenie wywołuje zdarzenie OnOutOfRange */
    minValue: number
    /** Maksymalna wartość cechy Value, której przekroczenie wywołuje zdarzenie OnOutOfRange */
    maxValue: number
}

class PanelSensLight implements IPanelSensLight {
    private onChangeCallbacks: Array<() => void> = [];
    private onRiseCallbacks: Array<() => void> = [];
    private onLowerCallbacks: Array<() => void> = [];
    private onOutOfRangeCallbacks: Array<() => void> = [];

    constructor(private raw: PanelSensLightRaw) {
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
    }

    addOnChange(callback: () => void): void { this.onChangeCallbacks.push(callback); }
    addOnRise(callback: () => void): void { this.onRiseCallbacks.push(callback); }
    addOnLower(callback: () => void): void { this.onLowerCallbacks.push(callback); }
    addOnOutOfRange(callback: () => void): void { this.onOutOfRangeCallbacks.push(callback); }

    get value(): number { return this.raw.get(PropertyType.Value); }
    get threshold(): number { return this.raw.get(PropertyType.Threshold); }
    set threshold(val: number) { this.raw.set(PropertyType.Threshold, val); }
    get sensitivity(): number { return this.raw.get(PropertyType.Sensitivity); }
    set sensitivity(val: number) { this.raw.set(PropertyType.Sensitivity, val); }
    get minValue(): number { return this.raw.get(PropertyType.MinValue); }
    set minValue(val: number) { this.raw.set(PropertyType.MinValue, val); }
    get maxValue(): number { return this.raw.get(PropertyType.MaxValue); }
    set maxValue(val: number) { this.raw.set(PropertyType.MaxValue, val); }
}

class PanelSensLightRemote implements IPanelSensLight {
    constructor(private objectName: string, private gate: RemoteGate) {}

    addOnChange(_callback: () => void): void { /* Remote events are not supported */ }
    addOnRise(_callback: () => void): void { /* Remote events are not supported */ }
    addOnLower(_callback: () => void): void { /* Remote events are not supported */ }
    addOnOutOfRange(_callback: () => void): void { /* Remote events are not supported */ }

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
    get sensitivity(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Sensitivity).build();
        return this.gate.runScript(cmd!);
    }
    set sensitivity(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.Sensitivity).addParameter(val).build();
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

export { PanelSensLight, PanelSensLightRaw, PanelSensLightRemote }
