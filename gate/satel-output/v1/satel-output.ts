// Created from: packages/grenton-api/interfaces/object_satel_output_v1.xml, object name="SatelOutput" version="1"

import { rawExecutionBuilderFactory } from "../../../core/execution-builder"
import { RemoteGate } from "../../../core/remote-gate"

enum EventType {
    OnChange = 0,
    OnSwitchOn = 1,
    OnSwitchOff = 2
}

enum PropertyType {
    Value = 0,
    Nr = 1,
    UserPassword = 2
}

enum MethodType {
    SwitchOn = 0,
    SwitchOff = 1
}

enum ValueType {
    Off = 0,
    On = 1
}

declare class SatelOutputRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface ISatelOutput {
    /**
     * Zdarzenie wywoływane przy zmianie stanu (niezależnie od wartości)
     * @param callback
     */
    addOnChange: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane przy ustawieniu On na wyjściu
     * @param callback
     */
    addOnSwitchOn: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane przy ustawieniu Off na wyjściu
     * @param callback
     */
    addOnSwitchOff: (callback: () => void) => void
    /** Załącza wyjście */
    switchOn: () => void
    /** Wyłącza wyjście */
    switchOff: () => void
    /** Zwraca stan wyjścia: 1 - wyjście załączone, 0 - wyjście wyłączone, -1 - stan wyjścia nieznany (brak połączenia z centralką) */
    readonly value: ValueType
    /** Parametr definiujący, do którego wyjścia odnosi się obiekt */
    nr: number
    /** Hasło użytkownika, dla _ zastosuje hasło administratora */
    userPassword: string
}

class SatelOutput implements ISatelOutput {
    private onChangeCallbacks: Array<() => void> = [];
    private onSwitchOnCallbacks: Array<() => void> = [];
    private onSwitchOffCallbacks: Array<() => void> = [];

    constructor(private raw: SatelOutputRaw) {
        this.raw.add_event(EventType.OnChange, () => {
            this.onChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnSwitchOn, () => {
            this.onSwitchOnCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnSwitchOff, () => {
            this.onSwitchOffCallbacks.forEach(callback => { callback(); });
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
     * Zdarzenie wywoływane przy ustawieniu On na wyjściu
     * @param callback
     */
    addOnSwitchOn(callback: () => void): void {
        this.onSwitchOnCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane przy ustawieniu Off na wyjściu
     * @param callback
     */
    addOnSwitchOff(callback: () => void): void {
        this.onSwitchOffCallbacks.push(callback);
    }
    /** Załącza wyjście */
    switchOn(): void {
        this.raw.execute(MethodType.SwitchOn);
    }
    /** Wyłącza wyjście */
    switchOff(): void {
        this.raw.execute(MethodType.SwitchOff);
    }
    /**
     * Zwraca stan wyjścia: 1 - wyjście załączone, 0 - wyjście wyłączone, -1 - stan wyjścia nieznany (brak połączenia z centralką)
     * @returns {ValueType}
     */
    get value(): ValueType {
        return this.raw.get(PropertyType.Value);
    }
    /**
     * Parametr definiujący, do którego wyjścia odnosi się obiekt
     * @returns {number}
     */
    get nr(): number {
        return this.raw.get(PropertyType.Nr);
    }
    set nr(value: number) {
        this.raw.set(PropertyType.Nr, value);
    }
    /**
     * Hasło użytkownika, dla _ zastosuje hasło administratora
     * @returns {string}
     */
    get userPassword(): string {
        return this.raw.get(PropertyType.UserPassword);
    }
    set userPassword(value: string) {
        this.raw.set(PropertyType.UserPassword, value);
    }
}

class SatelOutputRemote implements ISatelOutput {
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
     * Zdarzenie wywoływane przy ustawieniu On na wyjściu
     * @param callback
     */
    addOnSwitchOn(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane przy ustawieniu Off na wyjściu
     * @param callback
     */
    addOnSwitchOff(_callback: () => void): void {
        // Remote events are not supported
    }

    /** Załącza wyjście */
    switchOn(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.SwitchOn)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Wyłącza wyjście */
    switchOff(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.SwitchOff)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Zwraca stan wyjścia: 1 - wyjście załączone, 0 - wyjście wyłączone, -1 - stan wyjścia nieznany (brak połączenia z centralką)
     * @returns {ValueType}
     */
    get value(): ValueType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Value)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Parametr definiujący, do którego wyjścia odnosi się obiekt
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
     * Hasło użytkownika, dla _ zastosuje hasło administratora
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

export {
    SatelOutput, SatelOutputRaw, SatelOutputRemote, ValueType
}
