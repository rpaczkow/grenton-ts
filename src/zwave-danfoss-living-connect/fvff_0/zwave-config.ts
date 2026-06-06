// Created from: src/interfaces/module_danfoss_living_connect.xml, object name="ZWAVE_CONFIG"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnBanned = 0
}

enum PropertyType {
    NodeID = 2,
    Banned = 3,
    FailCount = 4
}

enum MethodType {
    RemoveBan = 3,
    ClearFailCount = 4
}

declare class ZwaveConfigRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface IZwaveConfig {
    /** Zdarzenie wywoływane gdy urządzenie zostanie zbanowane */
    addOnBanned: (callback: () => void) => void
    /** Numer modułu (węzła) w sieci Z-Wave */
    readonly nodeID: number
    /** Zwraca informację o zablokowaniu komunikacji Z-Wave z modułem: 0 - komunikacja z modułem nie jest zablokowana, 1 - zablokowana komunikacja z modułem */
    readonly banned: number
    /** Liczba nieudanych prób komunikacji z modułem Z-Wave */
    readonly failCount: number
    /** Zdejmuje blokadę komunikacji z modułem Z-Wave */
    removeBan: () => void
    /** Czyści liczbę nieudanych prób komunikacji */
    clearFailCount: () => void
}

class ZwaveConfig implements IZwaveConfig {
    private onBannedCallbacks: Array<() => void> = [];

    constructor(private raw: ZwaveConfigRaw) {
        this.raw.add_event(EventType.OnBanned, () => {
            this.onBannedCallbacks.forEach(callback => { callback(); });
        });
    }

    addOnBanned(callback: () => void): void { this.onBannedCallbacks.push(callback); }

    get nodeID(): number { return this.raw.get(PropertyType.NodeID); }
    get banned(): number { return this.raw.get(PropertyType.Banned); }
    get failCount(): number { return this.raw.get(PropertyType.FailCount); }

    removeBan(): void { this.raw.execute(MethodType.RemoveBan); }
    clearFailCount(): void { this.raw.execute(MethodType.ClearFailCount); }
}

class ZwaveConfigRemote implements IZwaveConfig {
    constructor(private objectName: string, private gate: RemoteGate) {}

    addOnBanned(_callback: () => void): void { /* Remote events are not supported */ }

    get nodeID(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.NodeID).build();
        return this.gate.runScript(cmd!);
    }
    get banned(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Banned).build();
        return this.gate.runScript(cmd!);
    }
    get failCount(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.FailCount).build();
        return this.gate.runScript(cmd!);
    }

    removeBan(): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.RemoveBan).build();
        this.gate.runScript(cmd!);
    }
    clearFailCount(): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.ClearFailCount).build();
        this.gate.runScript(cmd!);
    }
}

export { ZwaveConfig, ZwaveConfigRaw, ZwaveConfigRemote }
