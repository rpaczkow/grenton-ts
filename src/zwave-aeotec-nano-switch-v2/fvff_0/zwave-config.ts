// Created from: src/interfaces/module_aeotec_nano_switch_v2_ff.xml, object name="ZWAVE_CONFIG"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnBanned = 0
}

enum PropertyType {
    Register = 0,
    Value = 1,
    NodeID = 2,
    Banned = 3,
    FailCount = 4
}

enum MethodType {
    Set = 0,
    Get = 1,
    SetDefault = 2,
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
    /** Numer rejestru (parametru) konfiguracyjnego */
    readonly register: number
    /** wartość rejestru (parametru) konfiguracyjnego */
    readonly value: number
    /** Numer modułu (węzła) w sieci Z-Wave */
    readonly nodeID: number
    /** Zwraca informację o zablokowaniu komunikacji Z-Wave z modułem:\n0 - komunikacja z modułem nie jest zablokowana,\n1 - zablokowana komunikacja z modułem (moduł zbanowany) */
    readonly banned: number
    /** Liczba nieudanych prób komunikacji z modułem Z-Wave */
    readonly failCount: number
    /** Ustawia wartość danego rejestru (parametru) konfiguracyjnego */
    set: (register: number, value: number, size: number) => void
    /** Pobiera wartość danego rejestru (parametru) konfiguracyjnego */
    get: (register: number) => void
    /** Ustawia wartość domyślną dla danego rejestru (parametru) konfiguracyjnego */
    setDefault: (register: number) => void
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

    get register(): number { return this.raw.get(PropertyType.Register); }
    get value(): number { return this.raw.get(PropertyType.Value); }
    get nodeID(): number { return this.raw.get(PropertyType.NodeID); }
    get banned(): number { return this.raw.get(PropertyType.Banned); }
    get failCount(): number { return this.raw.get(PropertyType.FailCount); }

    set(register: number, value: number, size: number): void { this.raw.execute(MethodType.Set, register, value, size); }
    get(register: number): void { this.raw.execute(MethodType.Get, register); }
    setDefault(register: number): void { this.raw.execute(MethodType.SetDefault, register); }
    removeBan(): void { this.raw.execute(MethodType.RemoveBan); }
    clearFailCount(): void { this.raw.execute(MethodType.ClearFailCount); }
}

class ZwaveConfigRemote implements IZwaveConfig {
    constructor(private objectName: string, private gate: RemoteGate) {}

    addOnBanned(_callback: () => void): void { /* Remote events are not supported */ }

    get register(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Register).build();
        return this.gate.runScript(cmd!);
    }
    get value(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Value).build();
        return this.gate.runScript(cmd!);
    }
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

    set(register: number, value: number, size: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.Set).addParameter(register).addParameter(value).addParameter(size).build();
        this.gate.runScript(cmd!);
    }
    get(register: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.Get).addParameter(register).build();
        this.gate.runScript(cmd!);
    }
    setDefault(register: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SetDefault).addParameter(register).build();
        this.gate.runScript(cmd!);
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
