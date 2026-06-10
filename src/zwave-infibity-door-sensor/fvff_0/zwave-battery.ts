// Created from: src/interfaces/module_infibity_door_sensor_ff.xml, object name="ZWAVE_BATTERY"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnBatteryLevelChange = 0,
    OnLowBattery = 1,
    OnBatteryGood = 2,
    OnBatteryDischarge = 3
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
    addOnBatteryLevelChange: (callback: () => void) => void
    /** Zdarzenie wywoływane po wykryciu spadku poziomu baterii poniżej poziomu ostrzegawczego */
    addOnLowBattery: (callback: () => void) => void
    /** Zdarzenie wywoływane po wykryciu powrotu poziomu baterii do wartości powyżej poziomu ostrzegawczego */
    addOnBatteryGood: (callback: () => void) => void
    /** Zdarzenie wywoływane gdy urządzenie zgłasza rozładowanie baterii */
    addOnBatteryDischarge: (callback: () => void) => void
    /** Poziom baterii modułu Z-Wave w procentach */
    readonly batteryLevel: number
    /** Poziom baterii modułu Z-Wave, poniżej którego generowane są zdarzenia ostrzegawcze */
    warningLevel: number
    /** Ustawia poziom ostrzegawczy baterii modułu Z-Wave */
    setWarningLevel: (value: number) => void
}

class ZwaveBattery implements IZwaveBattery {
    private onBatteryLevelChangeCallbacks: Array<() => void> = [];
    private onLowBatteryCallbacks: Array<() => void> = [];
    private onBatteryGoodCallbacks: Array<() => void> = [];
    private onBatteryDischargeCallbacks: Array<() => void> = [];

    constructor(private raw: ZwaveBatteryRaw) {
        this.raw.add_event(EventType.OnBatteryLevelChange, () => {
            this.onBatteryLevelChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnLowBattery, () => {
            this.onLowBatteryCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnBatteryGood, () => {
            this.onBatteryGoodCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnBatteryDischarge, () => {
            this.onBatteryDischargeCallbacks.forEach(callback => { callback(); });
        });
    }

    addOnBatteryLevelChange(callback: () => void): void { this.onBatteryLevelChangeCallbacks.push(callback); }
    addOnLowBattery(callback: () => void): void { this.onLowBatteryCallbacks.push(callback); }
    addOnBatteryGood(callback: () => void): void { this.onBatteryGoodCallbacks.push(callback); }
    addOnBatteryDischarge(callback: () => void): void { this.onBatteryDischargeCallbacks.push(callback); }

    get batteryLevel(): number { return this.raw.get(PropertyType.BatteryLevel); }
    get warningLevel(): number { return this.raw.get(PropertyType.WarningLevel); }
    set warningLevel(val: number) { this.raw.set(PropertyType.WarningLevel, val); }

    setWarningLevel(value: number): void { this.raw.set(PropertyType.WarningLevel, value); }
}

class ZwaveBatteryRemote implements IZwaveBattery {
    constructor(private objectName: string, private gate: RemoteGate) {}

    addOnBatteryLevelChange(_callback: () => void): void { /* Remote events are not supported */ }
    addOnLowBattery(_callback: () => void): void { /* Remote events are not supported */ }
    addOnBatteryGood(_callback: () => void): void { /* Remote events are not supported */ }
    addOnBatteryDischarge(_callback: () => void): void { /* Remote events are not supported */ }

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

    setWarningLevel(value: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.WarningLevel).addParameter(value).build();
        this.gate.runScript(cmd!);
    }
}

export { ZwaveBattery, ZwaveBatteryRaw, ZwaveBatteryRemote }
