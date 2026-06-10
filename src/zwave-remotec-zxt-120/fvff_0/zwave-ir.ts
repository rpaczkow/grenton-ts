// Created from: src/interfaces/module_remotec_zxt120.xml, object name="ZWAVE_IR"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EmitterPowerType {
    Normal = 0,
    High = 255
}

enum SurroundIrControlType {
    Disable = 0,
    Enable = 255
}

enum EventType {
    OnIrSend = 0,
    OnLearningStatusChange = 1,
    OnLearningOK = 2,
    OnLearning = 3,
    OnLearningFail = 5
}

enum PropertyType {
    AcDeviceNumber = 1,
    EmitterPower = 2,
    LearningStatus = 7,
    SurroundIrControl = 8
}

enum MethodType {
    SendCode = 0,
    LearnCode = 1
}

declare class ZwaveIrRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface IZwaveIr {
    /** Zdarzenie wywoływane w momencie wysłania kodu IR */
    addOnIrSend: (callback: () => void) => void
    /** Zdarzenie wywoływane w momencie zmiany statusu trybu uczenia kodu IR */
    addOnLearningStatusChange: (callback: () => void) => void
    /** Zdarzenie wywoływane w momencie zmiany statusu trybu uczenia kodu IR na "OK" */
    addOnLearningOK: (callback: () => void) => void
    /** Zdarzenie wywoływane w momencie zmiany statusu trybu uczenia kodu IR na "Learning" */
    addOnLearning: (callback: () => void) => void
    /** Zdarzenie wywoływane w momencie zmiany statusu trybu uczenia kodu IR na "Learning Fail" */
    addOnLearningFail: (callback: () => void) => void
    /** Wysyła kod IR */
    sendCode: (codeNumber: number) => void
    /** Wywołuje tryb uczenia kodu IR */
    learnCode: (codeNumber: number) => void
    /** Numer urządzenia AC z wewnętrznej biblioteki kodów IR */
    acDeviceNumber: number
    /** Moc zewnętrznego nadajnika podczerwieni:\n0 - Normal,\n255 - High (wysoka) */
    emitterPower: EmitterPowerType
    /** Status uczenia kodu IR:\n0 - kanał IR bezczynny,\n1 - uczenie zakończone powodzeniem,\n2 - trwa procedura uczenia,\n4 - uczenie zakończone niepowodzeniem */
    readonly learningStatus: number
    /** Wielokierunkowa transmisja sygnału IR:\n0 - Disable (wyłączona),\n255 - Enable (załączona) */
    surroundIrControl: SurroundIrControlType
    /** Ustawia numer urządzenia AC z wewnętrznej biblioteki kodów IR */
    setAcDeviceNumber: (acDeviceNumber: number) => void
    /** Ustawia moc zewnętrznego nadajnika podczerwieni */
    setEmitterPower: (emitterPower: EmitterPowerType) => void
    /** Ustawia wielokierunkowość sygnału IR */
    setSurroundIrControl: (surroundIrControl: SurroundIrControlType) => void
}

class ZwaveIr implements IZwaveIr {
    private onIrSendCallbacks: Array<() => void> = [];
    private onLearningStatusChangeCallbacks: Array<() => void> = [];
    private onLearningOKCallbacks: Array<() => void> = [];
    private onLearningCallbacks: Array<() => void> = [];
    private onLearningFailCallbacks: Array<() => void> = [];

    constructor(private raw: ZwaveIrRaw) {
        this.raw.add_event(EventType.OnIrSend, () => {
            this.onIrSendCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnLearningStatusChange, () => {
            this.onLearningStatusChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnLearningOK, () => {
            this.onLearningOKCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnLearning, () => {
            this.onLearningCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnLearningFail, () => {
            this.onLearningFailCallbacks.forEach(callback => { callback(); });
        });
    }

    addOnIrSend(callback: () => void): void { this.onIrSendCallbacks.push(callback); }
    addOnLearningStatusChange(callback: () => void): void { this.onLearningStatusChangeCallbacks.push(callback); }
    addOnLearningOK(callback: () => void): void { this.onLearningOKCallbacks.push(callback); }
    addOnLearning(callback: () => void): void { this.onLearningCallbacks.push(callback); }
    addOnLearningFail(callback: () => void): void { this.onLearningFailCallbacks.push(callback); }

    sendCode(codeNumber: number): void { this.raw.execute(MethodType.SendCode, codeNumber); }
    learnCode(codeNumber: number): void { this.raw.execute(MethodType.LearnCode, codeNumber); }

    get acDeviceNumber(): number { return this.raw.get(PropertyType.AcDeviceNumber); }
    set acDeviceNumber(val: number) { this.raw.set(PropertyType.AcDeviceNumber, val); }
    get emitterPower(): EmitterPowerType { return this.raw.get(PropertyType.EmitterPower); }
    set emitterPower(val: EmitterPowerType) { this.raw.set(PropertyType.EmitterPower, val); }
    get learningStatus(): number { return this.raw.get(PropertyType.LearningStatus); }
    get surroundIrControl(): SurroundIrControlType { return this.raw.get(PropertyType.SurroundIrControl); }
    set surroundIrControl(val: SurroundIrControlType) { this.raw.set(PropertyType.SurroundIrControl, val); }

    setAcDeviceNumber(acDeviceNumber: number): void { this.raw.set(PropertyType.AcDeviceNumber, acDeviceNumber); }
    setEmitterPower(emitterPower: EmitterPowerType): void { this.raw.set(PropertyType.EmitterPower, emitterPower); }
    setSurroundIrControl(surroundIrControl: SurroundIrControlType): void { this.raw.set(PropertyType.SurroundIrControl, surroundIrControl); }
}

class ZwaveIrRemote implements IZwaveIr {
    constructor(private objectName: string, private gate: RemoteGate) {}

    addOnIrSend(_callback: () => void): void { /* Remote events are not supported */ }
    addOnLearningStatusChange(_callback: () => void): void { /* Remote events are not supported */ }
    addOnLearningOK(_callback: () => void): void { /* Remote events are not supported */ }
    addOnLearning(_callback: () => void): void { /* Remote events are not supported */ }
    addOnLearningFail(_callback: () => void): void { /* Remote events are not supported */ }

    sendCode(codeNumber: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SendCode).addParameter(codeNumber).build();
        this.gate.runScript(cmd!);
    }
    learnCode(codeNumber: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.LearnCode).addParameter(codeNumber).build();
        this.gate.runScript(cmd!);
    }

    get acDeviceNumber(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.AcDeviceNumber).build();
        return this.gate.runScript(cmd!);
    }
    set acDeviceNumber(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.AcDeviceNumber).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
    get emitterPower(): EmitterPowerType {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.EmitterPower).build();
        return this.gate.runScript(cmd!);
    }
    set emitterPower(val: EmitterPowerType) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.EmitterPower).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
    get learningStatus(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.LearningStatus).build();
        return this.gate.runScript(cmd!);
    }
    get surroundIrControl(): SurroundIrControlType {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.SurroundIrControl).build();
        return this.gate.runScript(cmd!);
    }
    set surroundIrControl(val: SurroundIrControlType) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.SurroundIrControl).addParameter(val).build();
        this.gate.runScript(cmd!);
    }

    setAcDeviceNumber(acDeviceNumber: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.AcDeviceNumber).addParameter(acDeviceNumber).build();
        this.gate.runScript(cmd!);
    }
    setEmitterPower(emitterPower: EmitterPowerType): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.EmitterPower).addParameter(emitterPower).build();
        this.gate.runScript(cmd!);
    }
    setSurroundIrControl(surroundIrControl: SurroundIrControlType): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.SurroundIrControl).addParameter(surroundIrControl).build();
        this.gate.runScript(cmd!);
    }
}

export { ZwaveIr, ZwaveIrRaw, ZwaveIrRemote, EmitterPowerType, SurroundIrControlType }
