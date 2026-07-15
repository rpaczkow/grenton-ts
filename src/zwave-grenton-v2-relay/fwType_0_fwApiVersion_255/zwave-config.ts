// Created from: src/interfaces/module_grenton_v2_relay_zwave_ff.xml, object name="ZWAVE_CONFIG"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum StandaloneType {
    Off = 0,
    On = 1
}

enum EventType {
    OnBanned = 0
}

enum PropertyType {
    Register = 0,
    Value = 1,
    NodeID = 2,
    Banned = 3,
    FailCount = 4,
    Repeaters = 5,
    RepeatersList = 6,
    Standalone = 7
}

enum MethodType {
    Set = 0,
    Get = 1,
    SetDefault = 2,
    RemoveBan = 3,
    ClearFailCount = 4,
    UpdateNeighbours = 5
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
    /** Ilość urządzeń pośredniczących w komunikacji pomiędzy CLUZ a danym modułem */
    readonly repeaters: number
    /** Lista urządzeń (NodeID) pośredniczących w komunikacji pomiędzy CLUZ a modułem */
    readonly repeatersList: string
    /** Ustawienie wewnętrznego połączenia pomiędzy wejściami oraz wyjściami urządzenia */
    standalone: StandaloneType
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
    /** Wywołuje akcję aktualizacji i przebudowy sieci Z-Wave (ilość modułów sąsiadujących, sposób komunikacji z CLUZ) dla danego modułu */
    updateNeighbours: () => void
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
    get repeaters(): number { return this.raw.get(PropertyType.Repeaters); }
    get repeatersList(): string { return this.raw.get(PropertyType.RepeatersList); }
    get standalone(): StandaloneType { return this.raw.get(PropertyType.Standalone); }
    set standalone(val: StandaloneType) { this.raw.set(PropertyType.Standalone, val); }

    set(register: number, value: number, size: number): void { this.raw.execute(MethodType.Set, register, value, size); }
    get(register: number): void { this.raw.execute(MethodType.Get, register); }
    setDefault(register: number): void { this.raw.execute(MethodType.SetDefault, register); }
    removeBan(): void { this.raw.execute(MethodType.RemoveBan); }
    clearFailCount(): void { this.raw.execute(MethodType.ClearFailCount); }
    updateNeighbours(): void { this.raw.execute(MethodType.UpdateNeighbours); }
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
    get repeaters(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Repeaters).build();
        return this.gate.runScript(cmd!);
    }
    get repeatersList(): string {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.RepeatersList).build();
        return this.gate.runScript(cmd!);
    }
    get standalone(): StandaloneType {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Standalone).build();
        return this.gate.runScript(cmd!);
    }
    set standalone(val: StandaloneType) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.Standalone).addParameter(val).build();
        this.gate.runScript(cmd!);
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
    updateNeighbours(): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.UpdateNeighbours).build();
        this.gate.runScript(cmd!);
    }
}

export { ZwaveConfig, ZwaveConfigRaw, ZwaveConfigRemote, StandaloneType }
