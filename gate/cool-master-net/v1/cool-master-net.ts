// Created from: packages/grenton-api/interfaces/object_coolmasternet_v1.xml, object name="CoolMasterNet" version="1"

import { rawExecutionBuilderFactory } from "../../../core/execution-builder"
import { RemoteGate } from "../../../core/remote-gate"

enum EventType {
    OnConnected = 0,
    OnDisconnected = 1,
    OnError = 2
}

enum PropertyType {
    SN = 0,
    Host = 1,
    UpdatePeriod = 2,
    Status = 3,
    ErrorCode = 4
}

enum MethodType {
    TurnAllOn = 0,
    TurnAllOff = 1,
    Command1 = 2,
    Command2 = 3
}

declare class CoolMasterNetRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface ICoolMasterNet {
    /**
     * Zdarzenie wywoływane po nawiązaniu połączenia z jednostką
     * @param callback
     */
    addOnConnected: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po zerwaniu połączenia z jednostką
     * @param callback
     */
    addOnDisconnected: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po wystąpieniu błędu
     * @param callback
     */
    addOnError: (callback: () => void) => void
    /** Włącza wszystkie klimatyzatory */
    turnAllOn: () => void
    /** Wyłącza wszystkie klimatyzatory */
    turnAllOff: () => void
    /**
     * Wykonuje komendę REST v1
     * @param {string} command
     */
    command1: (command: string) => void
    /**
     * Wykonuje komendę REST v2
     * @param {string} command
     */
    command2: (command: string) => void
    sn: string
    /** Adres jednostki CoolMasterNet w formie http://host:port */
    host: string
    /** Okres aktualizacji stanu */
    updatePeriod: number
    /** Stan połączenia: 0 - brak połączenia, 1 - połączono */
    readonly status: number
    /** Ostatni kod błędu CoolMasterNet: 0 - brak błędu, 1 - błąd nawiązywania połączenia TCP, lub kod błędu HTTP */
    readonly errorCode: number
}

class CoolMasterNet implements ICoolMasterNet {
    private onConnectedCallbacks: Array<() => void> = [];
    private onDisconnectedCallbacks: Array<() => void> = [];
    private onErrorCallbacks: Array<() => void> = [];

    constructor(private raw: CoolMasterNetRaw) {
        this.raw.add_event(EventType.OnConnected, () => {
            this.onConnectedCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnDisconnected, () => {
            this.onDisconnectedCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnError, () => {
            this.onErrorCallbacks.forEach(callback => { callback(); });
        });
    }

    /**
     * Zdarzenie wywoływane po nawiązaniu połączenia z jednostką
     * @param callback
     */
    addOnConnected(callback: () => void): void {
        this.onConnectedCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po zerwaniu połączenia z jednostką
     * @param callback
     */
    addOnDisconnected(callback: () => void): void {
        this.onDisconnectedCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po wystąpieniu błędu
     * @param callback
     */
    addOnError(callback: () => void): void {
        this.onErrorCallbacks.push(callback);
    }
    /** Włącza wszystkie klimatyzatory */
    turnAllOn(): void {
        this.raw.execute(MethodType.TurnAllOn);
    }
    /** Wyłącza wszystkie klimatyzatory */
    turnAllOff(): void {
        this.raw.execute(MethodType.TurnAllOff);
    }
    /**
     * Wykonuje komendę REST v1
     * @param {string} command
     */
    command1(command: string): void {
        this.raw.execute(MethodType.Command1, command);
    }
    /**
     * Wykonuje komendę REST v2
     * @param {string} command
     */
    command2(command: string): void {
        this.raw.execute(MethodType.Command2, command);
    }
    get sn(): string {
        return this.raw.get(PropertyType.SN);
    }
    set sn(value: string) {
        this.raw.set(PropertyType.SN, value);
    }
    /**
     * Adres jednostki CoolMasterNet w formie http://host:port
     * @returns {string}
     */
    get host(): string {
        return this.raw.get(PropertyType.Host);
    }
    set host(value: string) {
        this.raw.set(PropertyType.Host, value);
    }
    /**
     * Okres aktualizacji stanu
     * @returns {number}
     */
    get updatePeriod(): number {
        return this.raw.get(PropertyType.UpdatePeriod);
    }
    set updatePeriod(value: number) {
        this.raw.set(PropertyType.UpdatePeriod, value);
    }
    /**
     * Stan połączenia: 0 - brak połączenia, 1 - połączono
     * @returns {number}
     */
    get status(): number {
        return this.raw.get(PropertyType.Status);
    }
    /**
     * Ostatni kod błędu CoolMasterNet: 0 - brak błędu, 1 - błąd nawiązywania połączenia TCP, lub kod błędu HTTP
     * @returns {number}
     */
    get errorCode(): number {
        return this.raw.get(PropertyType.ErrorCode);
    }
}

class CoolMasterNetRemote implements ICoolMasterNet {
    constructor(private objectName: string, private gate: RemoteGate) {

    }

    /**
     * Zdarzenie wywoływane po nawiązaniu połączenia z jednostką
     * @param callback
     */
    addOnConnected(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane po zerwaniu połączenia z jednostką
     * @param callback
     */
    addOnDisconnected(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane po wystąpieniu błędu
     * @param callback
     */
    addOnError(_callback: () => void): void {
        // Remote events are not supported
    }

    /** Włącza wszystkie klimatyzatory */
    turnAllOn(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.TurnAllOn)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Wyłącza wszystkie klimatyzatory */
    turnAllOff(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.TurnAllOff)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Wykonuje komendę REST v1
     * @param {string} command
     */
    command1(command: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.Command1)
            .addParameter(command)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Wykonuje komendę REST v2
     * @param {string} command
     */
    command2(command: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.Command2)
            .addParameter(command)
            .build();
        this.gate.runScript(cmd!);
    }

    get sn(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.SN)
            .build();
        return this.gate.runScript(cmd!);
    }

    set sn(value: string) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.SN)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Adres jednostki CoolMasterNet w formie http://host:port
     * @returns {string}
     */
    get host(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Host)
            .build();
        return this.gate.runScript(cmd!);
    }

    set host(value: string) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Host)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Okres aktualizacji stanu
     * @returns {number}
     */
    get updatePeriod(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.UpdatePeriod)
            .build();
        return this.gate.runScript(cmd!);
    }

    set updatePeriod(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.UpdatePeriod)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Stan połączenia: 0 - brak połączenia, 1 - połączono
     * @returns {number}
     */
    get status(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Status)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Ostatni kod błędu CoolMasterNet: 0 - brak błędu, 1 - błąd nawiązywania połączenia TCP, lub kod błędu HTTP
     * @returns {number}
     */
    get errorCode(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.ErrorCode)
            .build();
        return this.gate.runScript(cmd!);
    }
}

export {
    CoolMasterNet, CoolMasterNetRaw, CoolMasterNetRemote
}
