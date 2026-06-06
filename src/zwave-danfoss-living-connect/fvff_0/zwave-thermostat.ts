// Created from: src/interfaces/module_danfoss_living_connect.xml, object name="ZWAVE_THERMOSTAT"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum ProtectionStateType {
    Off = 0,
    On = 2
}

enum EventType {
    OnPointValueChange = 1,
    OnProtectionChange = 10,
    OnProtectionOn = 11,
    OnProtectionOff = 13
}

enum PropertyType {
    PointValue = 2,
    ProtectionState = 4
}

enum MethodType {}

declare class ZwaveThermostatRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface IZwaveThermostat {
    /** Zdarzenie wywoływane przy zmianie wartości zadanej temperatury */
    addOnPointValueChange: (callback: () => void) => void
    /** Zdarzenie wywoływane przy zmianie stanu blokady klawiszy */
    addOnProtectionChange: (callback: () => void) => void
    /** Zdarzenie wywoływane w przypadku włączenia blokady klawiszy */
    addOnProtectionOn: (callback: () => void) => void
    /** Zdarzenie wywoływane w przypadku wyłączenia blokady klawiszy */
    addOnProtectionOff: (callback: () => void) => void
    /** Wartość zadana temperatury w trybie automatycznym */
    pointValue: number
    /** Stan blokady klawiszy:\n0 - Off\n2 - On */
    protectionState: ProtectionStateType
}

class ZwaveThermostat implements IZwaveThermostat {
    private onPointValueChangeCallbacks: Array<() => void> = [];
    private onProtectionChangeCallbacks: Array<() => void> = [];
    private onProtectionOnCallbacks: Array<() => void> = [];
    private onProtectionOffCallbacks: Array<() => void> = [];

    constructor(private raw: ZwaveThermostatRaw) {
        this.raw.add_event(EventType.OnPointValueChange, () => {
            this.onPointValueChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnProtectionChange, () => {
            this.onProtectionChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnProtectionOn, () => {
            this.onProtectionOnCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnProtectionOff, () => {
            this.onProtectionOffCallbacks.forEach(callback => { callback(); });
        });
    }

    addOnPointValueChange(callback: () => void): void { this.onPointValueChangeCallbacks.push(callback); }
    addOnProtectionChange(callback: () => void): void { this.onProtectionChangeCallbacks.push(callback); }
    addOnProtectionOn(callback: () => void): void { this.onProtectionOnCallbacks.push(callback); }
    addOnProtectionOff(callback: () => void): void { this.onProtectionOffCallbacks.push(callback); }

    get pointValue(): number { return this.raw.get(PropertyType.PointValue); }
    set pointValue(val: number) { this.raw.set(PropertyType.PointValue, val); }
    get protectionState(): ProtectionStateType { return this.raw.get(PropertyType.ProtectionState); }
    set protectionState(val: ProtectionStateType) { this.raw.set(PropertyType.ProtectionState, val); }
}

class ZwaveThermostatRemote implements IZwaveThermostat {
    constructor(private objectName: string, private gate: RemoteGate) {}

    addOnPointValueChange(_callback: () => void): void { /* Remote events are not supported */ }
    addOnProtectionChange(_callback: () => void): void { /* Remote events are not supported */ }
    addOnProtectionOn(_callback: () => void): void { /* Remote events are not supported */ }
    addOnProtectionOff(_callback: () => void): void { /* Remote events are not supported */ }

    get pointValue(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.PointValue).build();
        return this.gate.runScript(cmd!);
    }
    set pointValue(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.PointValue).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
    get protectionState(): ProtectionStateType {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.ProtectionState).build();
        return this.gate.runScript(cmd!);
    }
    set protectionState(val: ProtectionStateType) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.ProtectionState).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
}

export { ZwaveThermostat, ZwaveThermostatRaw, ZwaveThermostatRemote, ProtectionStateType }
