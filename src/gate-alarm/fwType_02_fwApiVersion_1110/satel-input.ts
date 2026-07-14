// Created from: src/interfaces/object_satel_input_v1.xml, object name="SatelInput" version="1"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnChange = 0,
    OnSwitchOn = 1,
    OnSwitchOff = 2,
}

enum PropertyType {
    Value = 0,
    Nr = 1,
}

enum ValueType {
    Normal = 0,
    Violated = 1,
}

declare class SatelInputRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: number, ...args: any[]): any;
}

interface ISatelInput {
    /**
     * Zdarzenie wywoływane przy zmianie stanu (niezależnie od wartości)
     * @param callback
     */
    addOnChange: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane przy ustawieniu Violated na wejściu
     * @param callback
     */
    addOnSwitchOn: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane przy ustawieniu Normal na wejściu
     * @param callback
     */
    addOnSwitchOff: (callback: () => void) => void
    /**
     * Ustawia parametr definiujący, do którego wejścia odnosi się obiekt
     * @param {number} nr
     */
    setNr: (nr: number) => void
    /** Zwraca stan wejścia:1 - wejście naruszone,0 - wejście nienaruszone,-1 - stan wejścia nieznany (brak połączenia  z centralką) */
    readonly value: ValueType
    /** Parametr definiujący, do którego wejścia odnosi się obiekt */
    nr: number
}

class SatelInput implements ISatelInput {
    private onChangeCallbacks: Array<() => void> = [];
    private onSwitchOnCallbacks: Array<() => void> = [];
    private onSwitchOffCallbacks: Array<() => void> = [];

    constructor(private raw: SatelInputRaw) {
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
     * Zdarzenie wywoływane przy ustawieniu Violated na wejściu
     * @param callback
     */
    addOnSwitchOn(callback: () => void): void {
        this.onSwitchOnCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane przy ustawieniu Normal na wejściu
     * @param callback
     */
    addOnSwitchOff(callback: () => void): void {
        this.onSwitchOffCallbacks.push(callback);
    }
    /**
     * Ustawia parametr definiujący, do którego wejścia odnosi się obiekt
     * @param {number} nr
     */
    setNr(nr: number): void {
        this.raw.set(PropertyType.Nr, nr);
    }
    /**
     * Zwraca stan wejścia:1 - wejście naruszone,0 - wejście nienaruszone,-1 - stan wejścia nieznany (brak połączenia  z centralką)
     * @returns {ValueType}
     */
    get value(): ValueType {
        return this.raw.get(PropertyType.Value);
    }
    /**
     * Parametr definiujący, do którego wejścia odnosi się obiekt
     * @returns {number}
     */
    get nr(): number {
        return this.raw.get(PropertyType.Nr);
    }
    set nr(value: number) {
        this.raw.set(PropertyType.Nr, value);
    }
}

class SatelInputRemote implements ISatelInput {
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
     * Zdarzenie wywoływane przy ustawieniu Violated na wejściu
     * @param callback
     */
    addOnSwitchOn(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane przy ustawieniu Normal na wejściu
     * @param callback
     */
    addOnSwitchOff(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Ustawia parametr definiujący, do którego wejścia odnosi się obiekt
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
     * Zwraca stan wejścia:1 - wejście naruszone,0 - wejście nienaruszone,-1 - stan wejścia nieznany (brak połączenia  z centralką)
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
     * Parametr definiujący, do którego wejścia odnosi się obiekt
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
}

export { SatelInput, SatelInputRaw, SatelInputRemote, ValueType }
