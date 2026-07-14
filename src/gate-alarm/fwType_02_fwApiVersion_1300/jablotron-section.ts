// Created from: src/interfaces/object_jablotron_section_v1.xml, object name="JablotronSection" version="1"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnStateChange = 0,
    OnArm = 1,
    OnDisarm = 2,
}

enum PropertyType {
    State = 0,
    Nr = 1,
    AccessCode = 2,
}

enum MethodType {
    Arm = 0,
    ArmPartially = 1,
    Disarm = 2,
}

declare class JablotronSectionRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface IJablotronSection {
    /**
     * Zdarzenie wywoływane przy zmianie stanu (niezależnie od wartości)
     * @param callback
     */
    addOnStateChange: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane przy uzbrojeniu sekcji
     * @param callback
     */
    addOnArm: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane przy rozbrojeniu sekcji
     * @param callback
     */
    addOnDisarm: (callback: () => void) => void
    /** Uzbraja sekcję */
    arm: () => void
    /** Częściowo uzbraja sekcję */
    armPartially: () => void
    /** Rozbraja sekcję */
    disarm: () => void
    /**
     * Ustawia parametr definiujący, do której sekcji odnosi się obiekt
     * @param {number} nr
     */
    setNr: (nr: number) => void
    /**
     * Ustawia kod dostępu, dla '*' zastosuje kod administratora
     * @param {string} code
     */
    setAccessCode: (code: string) => void
    /** Zwraca stan sekcji:1 - READY - normalny tryb pracy,2 - ARMED_PART - częściowe uzbrojenie sekcji,3 - ARMED - sekcja uzbrojona,4 - SERVICE - załączony tryb serwisowy,5 - BLOCKED - sekcja zablokowana,6 - OFF - sekcja wyłączona-1 - stan sekcji nieznany (brak połączenia z centralką) */
    readonly state: number
    /** Parametr definiujący, do której sekcji odnosi się obiekt */
    nr: number
    /** Kod dostępu, dla '*' zastosuje kod administratora */
    accessCode: string
}

class JablotronSection implements IJablotronSection {
    private onStateChangeCallbacks: Array<() => void> = [];
    private onArmCallbacks: Array<() => void> = [];
    private onDisarmCallbacks: Array<() => void> = [];

    constructor(private raw: JablotronSectionRaw) {
        this.raw.add_event(EventType.OnStateChange, () => {
            this.onStateChangeCallbacks.forEach(callback => { callback(); });
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
    addOnStateChange(callback: () => void): void {
        this.onStateChangeCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane przy uzbrojeniu sekcji
     * @param callback
     */
    addOnArm(callback: () => void): void {
        this.onArmCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane przy rozbrojeniu sekcji
     * @param callback
     */
    addOnDisarm(callback: () => void): void {
        this.onDisarmCallbacks.push(callback);
    }
    /** Uzbraja sekcję */
    arm(): void {
        this.raw.execute(MethodType.Arm);
    }
    /** Częściowo uzbraja sekcję */
    armPartially(): void {
        this.raw.execute(MethodType.ArmPartially);
    }
    /** Rozbraja sekcję */
    disarm(): void {
        this.raw.execute(MethodType.Disarm);
    }
    /**
     * Ustawia parametr definiujący, do której sekcji odnosi się obiekt
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
     * Zwraca stan sekcji:1 - READY - normalny tryb pracy,2 - ARMED_PART - częściowe uzbrojenie sekcji,3 - ARMED - sekcja uzbrojona,4 - SERVICE - załączony tryb serwisowy,5 - BLOCKED - sekcja zablokowana,6 - OFF - sekcja wyłączona-1 - stan sekcji nieznany (brak połączenia z centralką)
     * @returns {number}
     */
    get state(): number {
        return this.raw.get(PropertyType.State);
    }
    /**
     * Parametr definiujący, do której sekcji odnosi się obiekt
     * @returns {number}
     */
    get nr(): number {
        return this.raw.get(PropertyType.Nr);
    }
    set nr(value: number) {
        this.raw.set(PropertyType.Nr, value);
    }
    /**
     * Kod dostępu, dla '*' zastosuje kod administratora
     * @returns {string}
     */
    get accessCode(): string {
        return this.raw.get(PropertyType.AccessCode);
    }
    set accessCode(value: string) {
        this.raw.set(PropertyType.AccessCode, value);
    }
}

class JablotronSectionRemote implements IJablotronSection {
    constructor(private objectName: string, private gate: RemoteGate) {
    }

    /**
     * Zdarzenie wywoływane przy zmianie stanu (niezależnie od wartości)
     * @param callback
     */
    addOnStateChange(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane przy uzbrojeniu sekcji
     * @param callback
     */
    addOnArm(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane przy rozbrojeniu sekcji
     * @param callback
     */
    addOnDisarm(_callback: () => void): void {
        // Remote events are not supported
    }
    /** Uzbraja sekcję */
    arm(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.Arm)
            .build();
        this.gate.runScript(cmd!);
    }
    /** Częściowo uzbraja sekcję */
    armPartially(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.ArmPartially)
            .build();
        this.gate.runScript(cmd!);
    }
    /** Rozbraja sekcję */
    disarm(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.Disarm)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Ustawia parametr definiujący, do której sekcji odnosi się obiekt
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
     * Zwraca stan sekcji:1 - READY - normalny tryb pracy,2 - ARMED_PART - częściowe uzbrojenie sekcji,3 - ARMED - sekcja uzbrojona,4 - SERVICE - załączony tryb serwisowy,5 - BLOCKED - sekcja zablokowana,6 - OFF - sekcja wyłączona-1 - stan sekcji nieznany (brak połączenia z centralką)
     * @returns {number}
     */
    get state(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.State)
            .build();
        return this.gate.runScript(cmd!);
    }
    /**
     * Parametr definiujący, do której sekcji odnosi się obiekt
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
     * Kod dostępu, dla '*' zastosuje kod administratora
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

export { JablotronSection, JablotronSectionRaw, JablotronSectionRemote }
