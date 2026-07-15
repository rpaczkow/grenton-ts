// Created from: src/interfaces/module_fakro_amz_solar.xml, object name="ZWAVE_BATTERY"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnChange = 0,
    OnLowBattery = 1,
    OnBatteryGood = 2
}

enum PropertyType {
    BatteryLevel = 0,
    WarningLevel = 1
}

enum MethodType {}

declare class ZwaveBatteryRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface IZwaveBattery {
    /** Zdarzenie wywoływane przy zmianie wartości poziomu baterii */
    addOnChange: (callback: () => void) => void
    /** Zdarzenie wywoływane po wykryciu spadku poziomu baterii poniżej poziomu ostrzegawczego */
    addOnLowBattery: (callback: () => void) => void
    /** Zdarzenie wywoływane po wykryciu powrotu poziomu baterii do wartości powyżej poziomu ostrzegawczego */
    addOnBatteryGood: (callback: () => void) => void
    /** Poziom baterii modułu Z-Wave w procentach */
    readonly batteryLevel: number
    /** Poziom baterii modułu Z-Wave, poniżej którego generowane są zdarzenia ostrzegawcze */
    warningLevel: number
    /** Ustawia poziom ostrzegawczy baterii modułu Z-Wave */
    setWarningLevel: (warningLevel: number) => void
}

class ZwaveBattery implements IZwaveBattery {
    private onChangeCallbacks: Array<() => void> = [];
    private onLowBatteryCallbacks: Array<() => void> = [];
    private onBatteryGoodCallbacks: Array<() => void> = [];

    constructor(private raw: ZwaveBatteryRaw) {
        this.raw.add_event(EventType.OnChange, () => {
            this.onChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnLowBattery, () => {
            this.onLowBatteryCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnBatteryGood, () => {
            this.onBatteryGoodCallbacks.forEach(callback => { callback(); });
        });
    }

    addOnChange(callback: () => void): void { this.onChangeCallbacks.push(callback); }
    addOnLowBattery(callback: () => void): void { this.onLowBatteryCallbacks.push(callback); }
    addOnBatteryGood(callback: () => void): void { this.onBatteryGoodCallbacks.push(callback); }

    get batteryLevel(): number { return this.raw.get(PropertyType.BatteryLevel); }
    get warningLevel(): number { return this.raw.get(PropertyType.WarningLevel); }
    set warningLevel(val: number) { this.raw.set(PropertyType.WarningLevel, val); }

    setWarningLevel(warningLevel: number): void { this.raw.set(PropertyType.WarningLevel, warningLevel); }
}

class ZwaveBatteryRemote implements IZwaveBattery {
    constructor(private objectName: string, private gate: RemoteGate) {}

    addOnChange(_callback: () => void): void { /* Remote events are not supported */ }
    addOnLowBattery(_callback: () => void): void { /* Remote events are not supported */ }
    addOnBatteryGood(_callback: () => void): void { /* Remote events are not supported */ }

    get batteryLevel(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.BatteryLevel).build();
        return this.gate.runScript(cmd!);
    }
    get warningLevel(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.WarningLevel).build();
        return this.gate.runScript(cmd!);
    }
    set warningLevel(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.WarningLevel).addParameter(val).build();
        this.gate.runScript(cmd!);
    }

    setWarningLevel(warningLevel: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.WarningLevel).addParameter(warningLevel).build();
        this.gate.runScript(cmd!);
    }
}

export { ZwaveBattery, ZwaveBatteryRaw, ZwaveBatteryRemote }
