// Created from: src/interfaces/module_fibaro_dimmer2_0.xml, object name="ZWAVE_POWER_METER"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnValueChange = 0,
    OnPowerWarning = 1,
    OnPowerGood = 2
}

enum PropertyType {
    Value = 0,
    WarningLevel = 1
}

enum MethodType {}

declare class ZwavePowerMeterRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface IZwavePowerMeter {
    /** Zdarzenie wywoływane przy zmianie wartości mocy */
    addOnValueChange: (callback: () => void) => void
    /** Zdarzenie wywoływane po wykryciu wzrostu mocy powyżej poziomu ostrzegawczego */
    addOnPowerWarning: (callback: () => void) => void
    /** Zdarzenie wywoływane po wykryciu powrotu mocy do wartości poniżej poziomu ostrzegawczego */
    addOnPowerGood: (callback: () => void) => void
    /** Aktualna moc pobierana przez urządzenie */
    readonly value: number
    /** Poziom mocy, powyżej którego generowane są zdarzenia ostrzegawcze */
    warningLevel: number
}

class ZwavePowerMeter implements IZwavePowerMeter {
    private onValueChangeCallbacks: Array<() => void> = [];
    private onPowerWarningCallbacks: Array<() => void> = [];
    private onPowerGoodCallbacks: Array<() => void> = [];

    constructor(private raw: ZwavePowerMeterRaw) {
        this.raw.add_event(EventType.OnValueChange, () => {
            this.onValueChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnPowerWarning, () => {
            this.onPowerWarningCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnPowerGood, () => {
            this.onPowerGoodCallbacks.forEach(callback => { callback(); });
        });
    }

    addOnValueChange(callback: () => void): void { this.onValueChangeCallbacks.push(callback); }
    addOnPowerWarning(callback: () => void): void { this.onPowerWarningCallbacks.push(callback); }
    addOnPowerGood(callback: () => void): void { this.onPowerGoodCallbacks.push(callback); }

    /** Aktualna moc pobierana przez urządzenie */
    get value(): number { return this.raw.get(PropertyType.Value); }
    /** Poziom mocy, powyżej którego generowane są zdarzenia ostrzegawcze */
    get warningLevel(): number { return this.raw.get(PropertyType.WarningLevel); }
    set warningLevel(val: number) { this.raw.set(PropertyType.WarningLevel, val); }
}

class ZwavePowerMeterRemote implements IZwavePowerMeter {
    constructor(private objectName: string, private gate: RemoteGate) {}

    addOnValueChange(_callback: () => void): void { /* Remote events are not supported */ }
    addOnPowerWarning(_callback: () => void): void { /* Remote events are not supported */ }
    addOnPowerGood(_callback: () => void): void { /* Remote events are not supported */ }

    /** Aktualna moc pobierana przez urządzenie */
    get value(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Value).build();
        return this.gate.runScript(cmd!);
    }
    /** Poziom mocy, powyżej którego generowane są zdarzenia ostrzegawcze */
    get warningLevel(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.WarningLevel).build();
        return this.gate.runScript(cmd!);
    }
    set warningLevel(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.WarningLevel).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
}

export { ZwavePowerMeter, ZwavePowerMeterRaw, ZwavePowerMeterRemote }
