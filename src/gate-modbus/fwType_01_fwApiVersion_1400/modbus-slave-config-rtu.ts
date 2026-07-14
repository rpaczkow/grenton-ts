// Created from: src/interfaces/object_modbus_config_v1.xml, object name="ModbusSlaveConfigRTU" version="1"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum PropertyType {
    TransmissionSpeed = 1,
    Parity = 2,
    StopBits = 3,
}

enum TransmissionSpeedType {
    _1200 = 1200,
    _2400 = 2400,
    _4800 = 4800,
    _9600 = 9600,
    _19200 = 19200,
    _38400 = 38400,
    _57600 = 57600,
    _115200 = 115200,
}

enum ParityType {
    None = 0,
    Odd = 1,
    Even = 2,
}

enum StopBitsType {
    _1 = 0,
    _15 = 1,
    _2 = 2,
}

declare class ModbusSlaveConfigRTURaw {
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: number, ...args: any[]): any;
}

interface IModbusSlaveConfigRTU {
    /**
     * Ustawia prędkość transmisji
     * @param {TransmissionSpeedType} transmissionSpeed
     */
    setTransmissionSpeed: (transmissionSpeed: TransmissionSpeedType) => void
    /**
     * Ustawia sprawdzanie parzystości
     * @param {ParityType} parity
     */
    setParity: (parity: ParityType) => void
    /**
     * Ustawia liczbę bitów stopu
     * @param {StopBitsType} stopBits
     */
    setStopBits: (stopBits: StopBitsType) => void
    /** Prędkość transmisji */
    transmissionSpeed: TransmissionSpeedType
    /** Bit parzystości: 0 - None 1 - Odd 2 - Even */
    parity: ParityType
    /** Bity stopu: 0 - 1 bit stopu 1 - 1.5 bitu stopu 2 - 2 bity stopu */
    stopBits: StopBitsType
}

class ModbusSlaveConfigRTU implements IModbusSlaveConfigRTU {
    constructor(private raw: ModbusSlaveConfigRTURaw) {
    }

    /**
     * Ustawia prędkość transmisji
     * @param {TransmissionSpeedType} transmissionSpeed
     */
    setTransmissionSpeed(transmissionSpeed: TransmissionSpeedType): void {
        this.raw.set(PropertyType.TransmissionSpeed, transmissionSpeed);
    }
    /**
     * Ustawia sprawdzanie parzystości
     * @param {ParityType} parity
     */
    setParity(parity: ParityType): void {
        this.raw.set(PropertyType.Parity, parity);
    }
    /**
     * Ustawia liczbę bitów stopu
     * @param {StopBitsType} stopBits
     */
    setStopBits(stopBits: StopBitsType): void {
        this.raw.set(PropertyType.StopBits, stopBits);
    }
    /**
     * Prędkość transmisji
     * @returns {TransmissionSpeedType}
     */
    get transmissionSpeed(): TransmissionSpeedType {
        return this.raw.get(PropertyType.TransmissionSpeed);
    }
    set transmissionSpeed(value: TransmissionSpeedType) {
        this.raw.set(PropertyType.TransmissionSpeed, value);
    }
    /**
     * Bit parzystości: 0 - None 1 - Odd 2 - Even
     * @returns {ParityType}
     */
    get parity(): ParityType {
        return this.raw.get(PropertyType.Parity);
    }
    set parity(value: ParityType) {
        this.raw.set(PropertyType.Parity, value);
    }
    /**
     * Bity stopu: 0 - 1 bit stopu 1 - 1.5 bitu stopu 2 - 2 bity stopu
     * @returns {StopBitsType}
     */
    get stopBits(): StopBitsType {
        return this.raw.get(PropertyType.StopBits);
    }
    set stopBits(value: StopBitsType) {
        this.raw.set(PropertyType.StopBits, value);
    }
}

class ModbusSlaveConfigRTURemote implements IModbusSlaveConfigRTU {
    constructor(private objectName: string, private gate: RemoteGate) {
    }

    /**
     * Ustawia prędkość transmisji
     * @param {TransmissionSpeedType} transmissionSpeed
     */
    setTransmissionSpeed(transmissionSpeed: TransmissionSpeedType): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.TransmissionSpeed)
            .addParameter(transmissionSpeed)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Ustawia sprawdzanie parzystości
     * @param {ParityType} parity
     */
    setParity(parity: ParityType): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Parity)
            .addParameter(parity)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Ustawia liczbę bitów stopu
     * @param {StopBitsType} stopBits
     */
    setStopBits(stopBits: StopBitsType): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.StopBits)
            .addParameter(stopBits)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Prędkość transmisji
     * @returns {TransmissionSpeedType}
     */
    get transmissionSpeed(): TransmissionSpeedType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.TransmissionSpeed)
            .build();
        return this.gate.runScript(cmd!);
    }
    set transmissionSpeed(value: TransmissionSpeedType) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.TransmissionSpeed)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Bit parzystości: 0 - None 1 - Odd 2 - Even
     * @returns {ParityType}
     */
    get parity(): ParityType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Parity)
            .build();
        return this.gate.runScript(cmd!);
    }
    set parity(value: ParityType) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Parity)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Bity stopu: 0 - 1 bit stopu 1 - 1.5 bitu stopu 2 - 2 bity stopu
     * @returns {StopBitsType}
     */
    get stopBits(): StopBitsType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.StopBits)
            .build();
        return this.gate.runScript(cmd!);
    }
    set stopBits(value: StopBitsType) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.StopBits)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
}

export { ModbusSlaveConfigRTU, ModbusSlaveConfigRTURaw, ModbusSlaveConfigRTURemote, TransmissionSpeedType, ParityType, StopBitsType }
