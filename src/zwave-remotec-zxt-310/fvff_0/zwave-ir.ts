// Created from: src/interfaces/module_remotec_zxt310.xml, object name="ZWAVE_IR"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EmitterPowerType {
    Normal = 0,
    High = 255
}

enum TransmissionModeType {
    Continuous = 0,
    SingleShot = 255
}

enum EventType {
    OnIrSend = 0,
    OnLearningStatusChange = 1,
    OnLearningOK = 2,
    OnLearning = 3,
    OnCommandFull = 4,
    OnLearningFail = 5
}

enum PropertyType {
    PortRouting = 0,
    AvDeviceNumber = 1,
    EmitterPower = 2,
    TransmissionMode = 3,
    EndpointNumber = 4,
    FirmwareVersion = 5,
    LibraryVersion = 6,
    LearningStatus = 7
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
    /** Zdarzenie wywoływane w momencie zmiany statusu trybu uczenia kodu IR na "Command Full" */
    addOnCommandFull: (callback: () => void) => void
    /** Zdarzenie wywoływane w momencie zmiany statusu trybu uczenia kodu IR na "Learning Fail" */
    addOnLearningFail: (callback: () => void) => void
    /** Wysyła kod IR */
    sendCode: (codeNumber: number) => void
    /** Wywołuje tryb uczenia kodu IR */
    learnCode: (codeNumber: number) => void
    /** Przekierowanie wyjściowego portu IR:\n1 – wewnętrzny port IR,\n2-6 – zewnętrzne porty IR */
    portRouting: number
    /** Numer urządzenia AV z wewnętrznej biblioteki kodów IR */
    avDeviceNumber: number
    /** Moc zewnętrznego nadajnika podczerwieni:\n0 - Normal,\n255 - High (wysoka) */
    emitterPower: EmitterPowerType
    /** Tryb transmisji IR:\n0 - Continuous - transmisja ciągła,\n255 - Single shot - pojedynczy impuls */
    transmissionMode: TransmissionModeType
    /** Wybór kontrolowanego endpointu */
    endpointNumber: number
    /** Wersja oprogramowania */
    readonly firmwareVersion: number
    /** Wersja biblioteki */
    readonly libraryVersion: number
    /** Status uczenia kodu IR:\n0 - kanał IR bezczynny,\n1 - uczenie zakończone powodzeniem,\n2 - trwa procedura uczenia,\n3 - osiągnięto maksymalną ilość kodów dla danego Endpointa,\n4 - uczenie zakończone niepowodzeniem */
    readonly learningStatus: number
}

class ZwaveIr implements IZwaveIr {
    private onIrSendCallbacks: Array<() => void> = [];
    private onLearningStatusChangeCallbacks: Array<() => void> = [];
    private onLearningOKCallbacks: Array<() => void> = [];
    private onLearningCallbacks: Array<() => void> = [];
    private onCommandFullCallbacks: Array<() => void> = [];
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
        this.raw.add_event(EventType.OnCommandFull, () => {
            this.onCommandFullCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnLearningFail, () => {
            this.onLearningFailCallbacks.forEach(callback => { callback(); });
        });
    }

    addOnIrSend(callback: () => void): void { this.onIrSendCallbacks.push(callback); }
    addOnLearningStatusChange(callback: () => void): void { this.onLearningStatusChangeCallbacks.push(callback); }
    addOnLearningOK(callback: () => void): void { this.onLearningOKCallbacks.push(callback); }
    addOnLearning(callback: () => void): void { this.onLearningCallbacks.push(callback); }
    addOnCommandFull(callback: () => void): void { this.onCommandFullCallbacks.push(callback); }
    addOnLearningFail(callback: () => void): void { this.onLearningFailCallbacks.push(callback); }

    sendCode(codeNumber: number): void { this.raw.execute(MethodType.SendCode, codeNumber); }
    learnCode(codeNumber: number): void { this.raw.execute(MethodType.LearnCode, codeNumber); }

    get portRouting(): number { return this.raw.get(PropertyType.PortRouting); }
    set portRouting(val: number) { this.raw.set(PropertyType.PortRouting, val); }
    get avDeviceNumber(): number { return this.raw.get(PropertyType.AvDeviceNumber); }
    set avDeviceNumber(val: number) { this.raw.set(PropertyType.AvDeviceNumber, val); }
    get emitterPower(): EmitterPowerType { return this.raw.get(PropertyType.EmitterPower); }
    set emitterPower(val: EmitterPowerType) { this.raw.set(PropertyType.EmitterPower, val); }
    get transmissionMode(): TransmissionModeType { return this.raw.get(PropertyType.TransmissionMode); }
    set transmissionMode(val: TransmissionModeType) { this.raw.set(PropertyType.TransmissionMode, val); }
    get endpointNumber(): number { return this.raw.get(PropertyType.EndpointNumber); }
    set endpointNumber(val: number) { this.raw.set(PropertyType.EndpointNumber, val); }
    get firmwareVersion(): number { return this.raw.get(PropertyType.FirmwareVersion); }
    get libraryVersion(): number { return this.raw.get(PropertyType.LibraryVersion); }
    get learningStatus(): number { return this.raw.get(PropertyType.LearningStatus); }
}

class ZwaveIrRemote implements IZwaveIr {
    constructor(private objectName: string, private gate: RemoteGate) {}

    addOnIrSend(_callback: () => void): void { /* Remote events are not supported */ }
    addOnLearningStatusChange(_callback: () => void): void { /* Remote events are not supported */ }
    addOnLearningOK(_callback: () => void): void { /* Remote events are not supported */ }
    addOnLearning(_callback: () => void): void { /* Remote events are not supported */ }
    addOnCommandFull(_callback: () => void): void { /* Remote events are not supported */ }
    addOnLearningFail(_callback: () => void): void { /* Remote events are not supported */ }

    sendCode(codeNumber: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SendCode).addParameter(codeNumber).build();
        this.gate.runScript(cmd!);
    }
    learnCode(codeNumber: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.LearnCode).addParameter(codeNumber).build();
        this.gate.runScript(cmd!);
    }

    get portRouting(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.PortRouting).build();
        return this.gate.runScript(cmd!);
    }
    set portRouting(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.PortRouting).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
    get avDeviceNumber(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.AvDeviceNumber).build();
        return this.gate.runScript(cmd!);
    }
    set avDeviceNumber(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.AvDeviceNumber).addParameter(val).build();
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
    get transmissionMode(): TransmissionModeType {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.TransmissionMode).build();
        return this.gate.runScript(cmd!);
    }
    set transmissionMode(val: TransmissionModeType) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.TransmissionMode).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
    get endpointNumber(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.EndpointNumber).build();
        return this.gate.runScript(cmd!);
    }
    set endpointNumber(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.EndpointNumber).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
    get firmwareVersion(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.FirmwareVersion).build();
        return this.gate.runScript(cmd!);
    }
    get libraryVersion(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.LibraryVersion).build();
        return this.gate.runScript(cmd!);
    }
    get learningStatus(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.LearningStatus).build();
        return this.gate.runScript(cmd!);
    }
}

export { ZwaveIr, ZwaveIrRaw, ZwaveIrRemote, EmitterPowerType, TransmissionModeType }
