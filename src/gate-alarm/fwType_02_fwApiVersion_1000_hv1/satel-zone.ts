// Created from: src/interfaces/object_satel_zone_v1.xml, object name="SatelZone" version="1"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnChange = 0,
    OnArm = 1,
    OnDisarm = 2,
}

enum PropertyType {
    Value = 0,
    Nr = 1,
    UserPassword = 2,
}

enum MethodType {
    ArmZone = 0,
    DisarmZone = 1,
}

declare class SatelZoneRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface ISatelZone {
    /**
     * Zdarzenie wywoływane przy zmianie stanu (niezależnie od wartości)
     * @param callback
     */
    addOnChange: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane przy uzbrojeniu strefy
     * @param callback
     */
    addOnArm: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane przy rozbrojeniu strefy
     * @param callback
     */
    addOnDisarm: (callback: () => void) => void
    /** Uzbraja strefę */
    armZone: () => void
    /** Rozbraja strefę */
    disarmZone: () => void
    /**
     * Ustawia parametr definiujący, do której strefy odnosi się obiekt
     * @param {number} nr
     */
    setNr: (nr: number) => void
    /**
     * Ustawia hasło użytkownika, dla '_' zastosuje hasło administratora
     * @param {string} password
     */
    setUserPassword: (password: string) => void
    /** Zwraca stan strefy:1 - strefa uzbrojona,0 - strefa rozbrojona,-1 - stan strefy nieznany (brak połączenia z centralką) */
    readonly value: number
    /** Parametr definiujący, do której strefy odnosi się obiekt */
    nr: number
    /** Hasło użytkownika, dla '_' zastosuje hasło administratora */
    userPassword: string
}

class SatelZone implements ISatelZone {
    private onChangeCallbacks: Array<() => void> = [];
    private onArmCallbacks: Array<() => void> = [];
    private onDisarmCallbacks: Array<() => void> = [];

    constructor(private raw: SatelZoneRaw) {
        this.raw.add_event(EventType.OnChange, () => {
            this.onChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnArm, () => {
            this.onArmCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnDisarm, () => {
            this.onDisarmCallbacks.forEach(callback => { callback(); });
        });
    }

    /**
     * Zdarzenie wywoływane przy zmianie stanu (niezależnie od wartości)
     * @param callback
     */
    addOnChange(callback: () => void): void {
        this.onChangeCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane przy uzbrojeniu strefy
     * @param callback
     */
    addOnArm(callback: () => void): void {
        this.onArmCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane przy rozbrojeniu strefy
     * @param callback
     */
    addOnDisarm(callback: () => void): void {
        this.onDisarmCallbacks.push(callback);
    }
    /** Uzbraja strefę */
    armZone(): void {
        this.raw.execute(MethodType.ArmZone);
    }
    /** Rozbraja strefę */
    disarmZone(): void {
        this.raw.execute(MethodType.DisarmZone);
    }
    /**
     * Ustawia parametr definiujący, do której strefy odnosi się obiekt
     * @param {number} nr
     */
    setNr(nr: number): void {
        this.raw.set(PropertyType.Nr, nr);
    }
    /**
     * Ustawia hasło użytkownika, dla '_' zastosuje hasło administratora
     * @param {string} password
     */
    setUserPassword(password: string): void {
        this.raw.set(PropertyType.UserPassword, password);
    }
    /**
     * Zwraca stan strefy:1 - strefa uzbrojona,0 - strefa rozbrojona,-1 - stan strefy nieznany (brak połączenia z centralką)
     * @returns {number}
     */
    get value(): number {
        return this.raw.get(PropertyType.Value);
    }
    /**
     * Parametr definiujący, do której strefy odnosi się obiekt
     * @returns {number}
     */
    get nr(): number {
        return this.raw.get(PropertyType.Nr);
    }
    set nr(value: number) {
        this.raw.set(PropertyType.Nr, value);
    }
    /**
     * Hasło użytkownika, dla '_' zastosuje hasło administratora
     * @returns {string}
     */
    get userPassword(): string {
        return this.raw.get(PropertyType.UserPassword);
    }
    set userPassword(value: string) {
        this.raw.set(PropertyType.UserPassword, value);
    }
}

class SatelZoneRemote implements ISatelZone {
    constructor(private objectName: string, private gate: RemoteGate) {
    }

    /**
     * Zdarzenie wywoływane przy zmianie stanu (niezależnie od wartości)
     * @param callback
     */
    addOnChange(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane przy uzbrojeniu strefy
     * @param callback
     */
    addOnArm(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane przy rozbrojeniu strefy
     * @param callback
     */
    addOnDisarm(_callback: () => void): void {
        // Remote events are not supported
    }
    /** Uzbraja strefę */
    armZone(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.ArmZone)
            .build();
        this.gate.runScript(cmd!);
    }
    /** Rozbraja strefę */
    disarmZone(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.DisarmZone)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Ustawia parametr definiujący, do której strefy odnosi się obiekt
     * @param {number} nr
     */
    setNr(nr: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Nr)
            .addParameter(nr)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Ustawia hasło użytkownika, dla '_' zastosuje hasło administratora
     * @param {string} password
     */
    setUserPassword(password: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.UserPassword)
            .addParameter(password)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Zwraca stan strefy:1 - strefa uzbrojona,0 - strefa rozbrojona,-1 - stan strefy nieznany (brak połączenia z centralką)
     * @returns {number}
     */
    get value(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Value)
            .build();
        return this.gate.runScript(cmd!);
    }
    /**
     * Parametr definiujący, do której strefy odnosi się obiekt
     * @returns {number}
     */
    get nr(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Nr)
            .build();
        return this.gate.runScript(cmd!);
    }
    set nr(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Nr)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Hasło użytkownika, dla '_' zastosuje hasło administratora
     * @returns {string}
     */
    get userPassword(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.UserPassword)
            .build();
        return this.gate.runScript(cmd!);
    }
    set userPassword(value: string) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.UserPassword)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
}

export { SatelZone, SatelZoneRaw, SatelZoneRemote }
