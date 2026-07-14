// Created from: src/interfaces/object_satel_v1.xml, object name="Satel" version="1"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnConnected = 0,
    OnDisconnected = 1,
    OnError = 2,
}

enum PropertyType {
    State = 0,
    LastError = 1,
    IP = 2,
    Port = 3,
    AdminPassword = 4,
    UpdateTime = 5,
    EncryptionEnabled = 6,
    EncryptionKey = 7,
}

enum StateType {
    Disconnected = 0,
    Connected = 1,
}

enum EncryptionEnabledType {
    False = 0,
    True = 1,
}

declare class SatelRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: number, ...args: any[]): any;
}

interface ISatel {
    /**
     * Zdarzenie wywoływane po nawiązaniu połączenia z centralką
     * @param callback
     */
    addOnConnected: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po zerwaniu połączenia z centralką
     * @param callback
     */
    addOnDisconnected: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po wystąpieniu błędu centralki (LastError)
     * @param callback
     */
    addOnError: (callback: () => void) => void
    /**
     * Ustawia wartość parametru UpdateTime
     * @param {number} time
     */
    setUpdateTime: (time: number) => void
    /**
     * Ustawia adres IP modułu ETHM (Satel)
     * @param {string} iP
     */
    setIP: (iP: string) => void
    /**
     * Ustawia port modułu ETHM (Satel)
     * @param {number} port
     */
    setPort: (port: number) => void
    /**
     * Ustawia hasło Administratora
     * @param {string} password
     */
    setAdminPassword: (password: string) => void
    /**
     * Załącza / wyłącza szyfrowanie
     * @param {EncryptionEnabledType} enabled
     */
    setEncryptionEnabled: (enabled: EncryptionEnabledType) => void
    /**
     * Ustawia klucz szyfrowania
     * @param {string} key
     */
    setEncryptionKey: (key: string) => void
    /** Stan centralki:0 - brak połączenia z centralką1 - połączono z centralką */
    readonly state: StateType
    /** Ostatni kod błędu modułu ETHM (Satel):0 - ok1 - nieprawidłowe hasło */
    readonly lastError: number
    /** Adres IP modułu ETHM (Satel) */
    iP: string
    /** Port modułu ETHM (Satel) */
    port: number
    /** Hasło administratora Satel */
    adminPassword: string
    /** Okres aktualizacji stanu centralki */
    updateTime: number
    /** Szyfrowanie:True - załączoneFalse - wyłączone */
    encryptionEnabled: EncryptionEnabledType
    /** Klucz szyfrowania Satel */
    encryptionKey: string
}

class Satel implements ISatel {
    private onConnectedCallbacks: Array<() => void> = [];
    private onDisconnectedCallbacks: Array<() => void> = [];
    private onErrorCallbacks: Array<() => void> = [];

    constructor(private raw: SatelRaw) {
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
     * Zdarzenie wywoływane po nawiązaniu połączenia z centralką
     * @param callback
     */
    addOnConnected(callback: () => void): void {
        this.onConnectedCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po zerwaniu połączenia z centralką
     * @param callback
     */
    addOnDisconnected(callback: () => void): void {
        this.onDisconnectedCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po wystąpieniu błędu centralki (LastError)
     * @param callback
     */
    addOnError(callback: () => void): void {
        this.onErrorCallbacks.push(callback);
    }
    /**
     * Ustawia wartość parametru UpdateTime
     * @param {number} time
     */
    setUpdateTime(time: number): void {
        this.raw.set(PropertyType.UpdateTime, time);
    }
    /**
     * Ustawia adres IP modułu ETHM (Satel)
     * @param {string} iP
     */
    setIP(iP: string): void {
        this.raw.set(PropertyType.IP, iP);
    }
    /**
     * Ustawia port modułu ETHM (Satel)
     * @param {number} port
     */
    setPort(port: number): void {
        this.raw.set(PropertyType.Port, port);
    }
    /**
     * Ustawia hasło Administratora
     * @param {string} password
     */
    setAdminPassword(password: string): void {
        this.raw.set(PropertyType.AdminPassword, password);
    }
    /**
     * Załącza / wyłącza szyfrowanie
     * @param {EncryptionEnabledType} enabled
     */
    setEncryptionEnabled(enabled: EncryptionEnabledType): void {
        this.raw.set(PropertyType.EncryptionEnabled, enabled);
    }
    /**
     * Ustawia klucz szyfrowania
     * @param {string} key
     */
    setEncryptionKey(key: string): void {
        this.raw.set(PropertyType.EncryptionKey, key);
    }
    /**
     * Stan centralki:0 - brak połączenia z centralką1 - połączono z centralką
     * @returns {StateType}
     */
    get state(): StateType {
        return this.raw.get(PropertyType.State);
    }
    /**
     * Ostatni kod błędu modułu ETHM (Satel):0 - ok1 - nieprawidłowe hasło
     * @returns {number}
     */
    get lastError(): number {
        return this.raw.get(PropertyType.LastError);
    }
    /**
     * Adres IP modułu ETHM (Satel)
     * @returns {string}
     */
    get iP(): string {
        return this.raw.get(PropertyType.IP);
    }
    set iP(value: string) {
        this.raw.set(PropertyType.IP, value);
    }
    /**
     * Port modułu ETHM (Satel)
     * @returns {number}
     */
    get port(): number {
        return this.raw.get(PropertyType.Port);
    }
    set port(value: number) {
        this.raw.set(PropertyType.Port, value);
    }
    /**
     * Hasło administratora Satel
     * @returns {string}
     */
    get adminPassword(): string {
        return this.raw.get(PropertyType.AdminPassword);
    }
    set adminPassword(value: string) {
        this.raw.set(PropertyType.AdminPassword, value);
    }
    /**
     * Okres aktualizacji stanu centralki
     * @returns {number}
     */
    get updateTime(): number {
        return this.raw.get(PropertyType.UpdateTime);
    }
    set updateTime(value: number) {
        this.raw.set(PropertyType.UpdateTime, value);
    }
    /**
     * Szyfrowanie:True - załączoneFalse - wyłączone
     * @returns {EncryptionEnabledType}
     */
    get encryptionEnabled(): EncryptionEnabledType {
        return this.raw.get(PropertyType.EncryptionEnabled);
    }
    set encryptionEnabled(value: EncryptionEnabledType) {
        this.raw.set(PropertyType.EncryptionEnabled, value);
    }
    /**
     * Klucz szyfrowania Satel
     * @returns {string}
     */
    get encryptionKey(): string {
        return this.raw.get(PropertyType.EncryptionKey);
    }
    set encryptionKey(value: string) {
        this.raw.set(PropertyType.EncryptionKey, value);
    }
}

class SatelRemote implements ISatel {
    constructor(private objectName: string, private gate: RemoteGate) {
    }

    /**
     * Zdarzenie wywoływane po nawiązaniu połączenia z centralką
     * @param callback
     */
    addOnConnected(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane po zerwaniu połączenia z centralką
     * @param callback
     */
    addOnDisconnected(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane po wystąpieniu błędu centralki (LastError)
     * @param callback
     */
    addOnError(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Ustawia wartość parametru UpdateTime
     * @param {number} time
     */
    setUpdateTime(time: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.UpdateTime)
            .addParameter(time)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Ustawia adres IP modułu ETHM (Satel)
     * @param {string} iP
     */
    setIP(iP: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.IP)
            .addParameter(iP)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Ustawia port modułu ETHM (Satel)
     * @param {number} port
     */
    setPort(port: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Port)
            .addParameter(port)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Ustawia hasło Administratora
     * @param {string} password
     */
    setAdminPassword(password: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.AdminPassword)
            .addParameter(password)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Załącza / wyłącza szyfrowanie
     * @param {EncryptionEnabledType} enabled
     */
    setEncryptionEnabled(enabled: EncryptionEnabledType): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.EncryptionEnabled)
            .addParameter(enabled)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Ustawia klucz szyfrowania
     * @param {string} key
     */
    setEncryptionKey(key: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.EncryptionKey)
            .addParameter(key)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Stan centralki:0 - brak połączenia z centralką1 - połączono z centralką
     * @returns {StateType}
     */
    get state(): StateType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.State)
            .build();
        return this.gate.runScript(cmd!);
    }
    /**
     * Ostatni kod błędu modułu ETHM (Satel):0 - ok1 - nieprawidłowe hasło
     * @returns {number}
     */
    get lastError(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.LastError)
            .build();
        return this.gate.runScript(cmd!);
    }
    /**
     * Adres IP modułu ETHM (Satel)
     * @returns {string}
     */
    get iP(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.IP)
            .build();
        return this.gate.runScript(cmd!);
    }
    set iP(value: string) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.IP)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Port modułu ETHM (Satel)
     * @returns {number}
     */
    get port(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Port)
            .build();
        return this.gate.runScript(cmd!);
    }
    set port(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Port)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Hasło administratora Satel
     * @returns {string}
     */
    get adminPassword(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.AdminPassword)
            .build();
        return this.gate.runScript(cmd!);
    }
    set adminPassword(value: string) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.AdminPassword)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Okres aktualizacji stanu centralki
     * @returns {number}
     */
    get updateTime(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.UpdateTime)
            .build();
        return this.gate.runScript(cmd!);
    }
    set updateTime(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.UpdateTime)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Szyfrowanie:True - załączoneFalse - wyłączone
     * @returns {EncryptionEnabledType}
     */
    get encryptionEnabled(): EncryptionEnabledType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.EncryptionEnabled)
            .build();
        return this.gate.runScript(cmd!);
    }
    set encryptionEnabled(value: EncryptionEnabledType) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.EncryptionEnabled)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Klucz szyfrowania Satel
     * @returns {string}
     */
    get encryptionKey(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.EncryptionKey)
            .build();
        return this.gate.runScript(cmd!);
    }
    set encryptionKey(value: string) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.EncryptionKey)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
}

export { Satel, SatelRaw, SatelRemote, StateType, EncryptionEnabledType }
