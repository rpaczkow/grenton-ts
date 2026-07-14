// Created from: src/interfaces/object_jablotron_output_v1.xml, object name="JablotronOutput" version="1"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnChange = 0,
    OnSwitchOn = 1,
    OnSwitchOff = 2,
}

enum PropertyType {
    State = 0,
    Nr = 1,
    AccessCode = 2,
}

enum MethodType {
    SwitchOn = 0,
    SwitchOff = 1,
}

enum StateType {
    Off = 0,
    On = 1,
}

declare class JablotronOutputRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface IJablotronOutput {
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
    /**
     * Ustawia parametr definiujący, do którego wyjścia odnosi się obiekt
     * @param {number} nr
     */
    setNr: (nr: number) => void
    /**
     * Ustawia kod dostępu, dla '*' zastosuje kod administratora
     * @param {string} code
     */
    setAccessCode: (code: string) => void
    /** Zwraca stan wyjścia:1 - wyjście załączone,0 - wyjście wyłączone-1 - stan wyjścia nieznany (brak połączenia z centralką) */
    readonly state: StateType
    /** Parametr definiujący, do którego wyjścia odnosi się obiekt */
    nr: number
    /** Kod dostępu, dla * zastosuje kod administratora */
    accessCode: string
}

class JablotronOutput implements IJablotronOutput {
    private onChangeCallbacks: Array<() => void> = [];
    private onSwitchOnCallbacks: Array<() => void> = [];
    private onSwitchOffCallbacks: Array<() => void> = [];

    constructor(private raw: JablotronOutputRaw) {
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
     * Ustawia parametr definiujący, do którego wyjścia odnosi się obiekt
     * @param {number} nr
     */
    setNr(nr: number): void {
        this.raw.set(PropertyType.Nr, nr);
    }
    /**
     * Ustawia kod dostępu, dla '*' zastosuje kod administratora
     * @param {string} code
     */
    setAccessCode(code: string): void {
        this.raw.set(PropertyType.AccessCode, code);
    }
    /**
     * Zwraca stan wyjścia:1 - wyjście załączone,0 - wyjście wyłączone-1 - stan wyjścia nieznany (brak połączenia z centralką)
     * @returns {StateType}
     */
    get state(): StateType {
        return this.raw.get(PropertyType.State);
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
     * Kod dostępu, dla * zastosuje kod administratora
     * @returns {string}
     */
    get accessCode(): string {
        return this.raw.get(PropertyType.AccessCode);
    }
    set accessCode(value: string) {
        this.raw.set(PropertyType.AccessCode, value);
    }
}

class JablotronOutputRemote implements IJablotronOutput {
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
     * Ustawia parametr definiujący, do którego wyjścia odnosi się obiekt
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
     * Ustawia kod dostępu, dla '*' zastosuje kod administratora
     * @param {string} code
     */
    setAccessCode(code: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.AccessCode)
            .addParameter(code)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Zwraca stan wyjścia:1 - wyjście załączone,0 - wyjście wyłączone-1 - stan wyjścia nieznany (brak połączenia z centralką)
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
     * Kod dostępu, dla * zastosuje kod administratora
     * @returns {string}
     */
    get accessCode(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.AccessCode)
            .build();
        return this.gate.runScript(cmd!);
    }
    set accessCode(value: string) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.AccessCode)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
}

export { JablotronOutput, JablotronOutputRaw, JablotronOutputRemote, StateType }
