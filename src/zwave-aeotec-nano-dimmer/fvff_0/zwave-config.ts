// Created from: src/interfaces/module_aeotec_nano_dimmer_ff.xml, object name="ZWAVE_CONFIG"

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
    /** Wartość rejestru (parametru) konfiguracyjnego */
    readonly value: number
    /** Numer modułu (węzła) w sieci Z-Wave */
    readonly nodeID: number
    /** Zwraca informację o zablokowaniu komunikacji Z-Wave z modułem */
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

    /** Zdarzenie wywoływane gdy urządzenie zostanie zbanowane */
    addOnBanned(callback: () => void): void { this.onBannedCallbacks.push(callback); }

    /** Numer rejestru (parametru) konfiguracyjnego */
    get register(): number { return this.raw.get(PropertyType.Register); }
    /** Wartość rejestru (parametru) konfiguracyjnego */
    get value(): number { return this.raw.get(PropertyType.Value); }
    /** Numer modułu (węzła) w sieci Z-Wave */
    get nodeID(): number { return this.raw.get(PropertyType.NodeID); }
    /** Zwraca informację o zablokowaniu komunikacji Z-Wave z modułem */
    get banned(): number { return this.raw.get(PropertyType.Banned); }
    /** Liczba nieudanych prób komunikacji z modułem Z-Wave */
    get failCount(): number { return this.raw.get(PropertyType.FailCount); }

    /** Ustawia wartość danego rejestru (parametru) konfiguracyjnego */
    set(register: number, value: number, size: number): void {
        this.raw.execute(MethodType.Set, register, value, size);
    }
    /** Pobiera wartość danego rejestru (parametru) konfiguracyjnego */
    get(register: number): void {
        this.raw.execute(MethodType.Get, register);
    }
    /** Ustawia wartość domyślną dla danego rejestru (parametru) konfiguracyjnego */
    setDefault(register: number): void {
        this.raw.execute(MethodType.SetDefault, register);
    }
    /** Zdejmuje blokadę komunikacji z modułem Z-Wave */
    removeBan(): void {
        this.raw.execute(MethodType.RemoveBan);
    }
    /** Czyści liczbę nieudanych prób komunikacji */
    clearFailCount(): void {
        this.raw.execute(MethodType.ClearFailCount);
    }
}

class ZwaveConfigRemote implements IZwaveConfig {
    constructor(private objectName: string, private gate: RemoteGate) {}

    addOnBanned(_callback: () => void): void { /* Remote events are not supported */ }

    /** Numer rejestru (parametru) konfiguracyjnego */
    get register(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Register).build();
        return this.gate.runScript(cmd!);
    }
    /** Wartość rejestru (parametru) konfiguracyjnego */
    get value(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Value).build();
        return this.gate.runScript(cmd!);
    }
    /** Numer modułu (węzła) w sieci Z-Wave */
    get nodeID(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.NodeID).build();
        return this.gate.runScript(cmd!);
    }
    /** Zwraca informację o zablokowaniu komunikacji Z-Wave z modułem */
    get banned(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Banned).build();
        return this.gate.runScript(cmd!);
    }
    /** Liczba nieudanych prób komunikacji z modułem Z-Wave */
    get failCount(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.FailCount).build();
        return this.gate.runScript(cmd!);
    }

    /** Ustawia wartość danego rejestru (parametru) konfiguracyjnego */
    set(register: number, value: number, size: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.Set).addParameter(register).addParameter(value).addParameter(size).build();
        this.gate.runScript(cmd!);
    }
    /** Pobiera wartość danego rejestru (parametru) konfiguracyjnego */
    get(register: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.Get).addParameter(register).build();
        this.gate.runScript(cmd!);
    }
    /** Ustawia wartość domyślną dla danego rejestru (parametru) konfiguracyjnego */
    setDefault(register: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SetDefault).addParameter(register).build();
        this.gate.runScript(cmd!);
    }
    /** Zdejmuje blokadę komunikacji z modułem Z-Wave */
    removeBan(): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.RemoveBan).build();
        this.gate.runScript(cmd!);
    }
    /** Czyści liczbę nieudanych prób komunikacji */
    clearFailCount(): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.ClearFailCount).build();
        this.gate.runScript(cmd!);
    }
}

export { ZwaveConfig, ZwaveConfigRaw, ZwaveConfigRemote }
