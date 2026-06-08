// Created from: src/interfaces/module_remotec_zxt310.xml, object name="ZWAVE_IR_EP"

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
    OnIrSend = 0
}

enum PropertyType {
    PortRouting = 0,
    AvDeviceNumber = 1,
    EmitterPower = 2,
    TransmissionMode = 3
}

enum MethodType {
    SendCode = 0
}

declare class ZwaveIrEpRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface IZwaveIrEp {
    /** Zdarzenie wywoływane w momencie wysłania kodu IR */
    addOnIrSend: (callback: () => void) => void
    /** Wysyła kod IR */
    sendCode: (codeNumber: number) => void
    /** Przekierowanie wyjściowego portu IR:\n1 – wewnętrzny port IR,\n2-6 – zewnętrzne porty IR */
    portRouting: number
    /** Numer urządzenia AV z wewnętrznej biblioteki kodów IR */
    avDeviceNumber: number
    /** Moc zewnętrznego nadajnika podczerwieni:\n0 - Normal,\n255 - High (wysoka) */
    emitterPower: EmitterPowerType
    /** Tryb transmisji IR:\n0 - Continuous - transmisja ciągła,\n255 - Single shot - pojedynczy impuls */
    transmissionMode: TransmissionModeType
}

class ZwaveIrEp implements IZwaveIrEp {
    private onIrSendCallbacks: Array<() => void> = [];

    constructor(private raw: ZwaveIrEpRaw) {
        this.raw.add_event(EventType.OnIrSend, () => {
            this.onIrSendCallbacks.forEach(callback => { callback(); });
        });
    }

    addOnIrSend(callback: () => void): void { this.onIrSendCallbacks.push(callback); }

    sendCode(codeNumber: number): void { this.raw.execute(MethodType.SendCode, codeNumber); }

    get portRouting(): number { return this.raw.get(PropertyType.PortRouting); }
    set portRouting(val: number) { this.raw.set(PropertyType.PortRouting, val); }
    get avDeviceNumber(): number { return this.raw.get(PropertyType.AvDeviceNumber); }
    set avDeviceNumber(val: number) { this.raw.set(PropertyType.AvDeviceNumber, val); }
    get emitterPower(): EmitterPowerType { return this.raw.get(PropertyType.EmitterPower); }
    set emitterPower(val: EmitterPowerType) { this.raw.set(PropertyType.EmitterPower, val); }
    get transmissionMode(): TransmissionModeType { return this.raw.get(PropertyType.TransmissionMode); }
    set transmissionMode(val: TransmissionModeType) { this.raw.set(PropertyType.TransmissionMode, val); }
}

class ZwaveIrEpRemote implements IZwaveIrEp {
    constructor(private objectName: string, private gate: RemoteGate) {}

    addOnIrSend(_callback: () => void): void { /* Remote events are not supported */ }

    sendCode(codeNumber: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SendCode).addParameter(codeNumber).build();
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
}

export { ZwaveIrEp, ZwaveIrEpRaw, ZwaveIrEpRemote, EmitterPowerType, TransmissionModeType }
