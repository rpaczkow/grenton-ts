// Created from: packages/grenton-api/interfaces/object_modbus_server_v1.xml, object name="ModbusServer" version="1"

import { rawExecutionBuilderFactory } from "../../../core/execution-builder"
import { RemoteGate } from "../../../core/remote-gate"

enum EventType {
    OnValueChange = 0
}

enum PropertyType {
    Port = 1,
    DeviceAddress = 2,
    RegisterAddress = 3,
    RegisterType = 4,
    DataType = 6,
    DataWidth = 7,
    Endianness = 8,
    InitialValue = 9,
    Value = 10,
    RawValue = 11
}

enum MethodType {
    SetValue = 0
}

enum RegisterTypeType {
    DiscreteOutputsCoils = 0,
    DiscreteInputs = 1,
    HoldingRegisters = 2,
    InputRegisters = 3
}

enum DataTypeType {
    UnsignedInteger = 0,
    SignedInteger = 1,
    FloatingPoint = 2
}

enum DataWidthType {
    _16 = 16,
    _32 = 32,
    _48 = 48,
    _64 = 64
}

enum EndiannessType {
    BigEndian = 0,
    LittleBigEndian = 1,
    BigLittleEndian = 2,
    LittleEndian = 3
}

declare class ModbusServerRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface IModbusServer {
    /**
     * Zdarzenie wywoływane w przypadku zmiany wartości cechy Value przez Modbus
     * @param callback
     */
    addOnValueChange: (callback: () => void) => void
    /**
     * Ustawia wartość rejestru
     * @param {string} value
     */
    setValue: (value: string) => void
    /** Port nasłuchiwania serwera */
    port: number
    /** Adres urządzenia Modbus */
    deviceAddress: number
    /** Adres obsługiwanego rejestru */
    registerAddress: number
    /** Typ rejestru Modbus: 0 - wyjścia dwustanowe (coils) - funkcja Modbus: 5 (zapis pojedynczego wyjścia), 15 (zapis wielu wyjść), lub 1 (odczyt stanu wyjść) 1 - wejścia dwustanowe - funkcja Modbus: 2 2 - rejestry pamiętające - funkcja Modbus: 6 (zapis pojedynczego rejestru), 16 (zapis wielu rejestrów), lub 3 (odczyt rejestrów) 3 - rejestry wejściowe - funkcja Modbus: 4 */
    registerType: RegisterTypeType
    /** Typ wartości: 0 - Liczba całkowita, stałoprzecinkowa lub pole bitowe bez bitu znaku 1 - Liczba całkowita, stałoprzecinkowa lub pole bitowe z bitem znaku 2 - Liczba zmiennoprzecinkowa */
    dataType: DataTypeType
    /** Szerokość danych (1 do 4 rejestrów 16 bitowych) */
    dataWidth: DataWidthType
    /** Kolejność bajtów: 0 - kolejność słów: Big Endian; kolejność bajtów w słowie: Big Endian (SwapBytesAndWords) 1 - kolejność słów: Little Endian; kolejność bajtów w słowie: Big Endian (SwapBytes) 2 - kolejność słów: Big Endian; kolejność bajtów w słowie: Little Endian (SwapWords) 3 - kolejność słów: Little Endian; kolejność bajtów w słowie: Little Endian (NoSwap) */
    endianness: EndiannessType
    /** Wartość rejestru */
    readonly value: number
    /** Nieprzeskalowana wartość rejestru */
    readonly rawValue: number
}

class ModbusServer implements IModbusServer {
    private onValueChangeCallbacks: Array<() => void> = [];

    constructor(private raw: ModbusServerRaw) {
        this.raw.add_event(EventType.OnValueChange, () => {
            this.onValueChangeCallbacks.forEach(callback => { callback(); });
        });
    }

    /**
     * Zdarzenie wywoływane w przypadku zmiany wartości cechy Value przez Modbus
     * @param callback
     */
    addOnValueChange(callback: () => void): void {
        this.onValueChangeCallbacks.push(callback);
    }
    /**
     * Ustawia wartość rejestru
     * @param {string} value
     */
    setValue(value: string): void {
        this.raw.execute(MethodType.SetValue, value);
    }
    /**
     * Port nasłuchiwania serwera
     * @returns {number}
     */
    get port(): number {
        return this.raw.get(PropertyType.Port);
    }
    set port(value: number) {
        this.raw.set(PropertyType.Port, value);
    }
    /**
     * Adres urządzenia Modbus
     * @returns {number}
     */
    get deviceAddress(): number {
        return this.raw.get(PropertyType.DeviceAddress);
    }
    set deviceAddress(value: number) {
        this.raw.set(PropertyType.DeviceAddress, value);
    }
    /**
     * Adres obsługiwanego rejestru
     * @returns {number}
     */
    get registerAddress(): number {
        return this.raw.get(PropertyType.RegisterAddress);
    }
    set registerAddress(value: number) {
        this.raw.set(PropertyType.RegisterAddress, value);
    }
    /**
     * Typ rejestru Modbus: 0 - wyjścia dwustanowe (coils) - funkcja Modbus: 5 (zapis pojedynczego wyjścia), 15 (zapis wielu wyjść), lub 1 (odczyt stanu wyjść) 1 - wejścia dwustanowe - funkcja Modbus: 2 2 - rejestry pamiętające - funkcja Modbus: 6 (zapis pojedynczego rejestru), 16 (zapis wielu rejestrów), lub 3 (odczyt rejestrów) 3 - rejestry wejściowe - funkcja Modbus: 4
     * @returns {RegisterTypeType}
     */
    get registerType(): RegisterTypeType {
        return this.raw.get(PropertyType.RegisterType);
    }
    set registerType(value: RegisterTypeType) {
        this.raw.set(PropertyType.RegisterType, value);
    }
    /**
     * Typ wartości: 0 - Liczba całkowita, stałoprzecinkowa lub pole bitowe bez bitu znaku 1 - Liczba całkowita, stałoprzecinkowa lub pole bitowe z bitem znaku 2 - Liczba zmiennoprzecinkowa
     * @returns {DataTypeType}
     */
    get dataType(): DataTypeType {
        return this.raw.get(PropertyType.DataType);
    }
    set dataType(value: DataTypeType) {
        this.raw.set(PropertyType.DataType, value);
    }
    /**
     * Szerokość danych (1 do 4 rejestrów 16 bitowych)
     * @returns {DataWidthType}
     */
    get dataWidth(): DataWidthType {
        return this.raw.get(PropertyType.DataWidth);
    }
    set dataWidth(value: DataWidthType) {
        this.raw.set(PropertyType.DataWidth, value);
    }
    /**
     * Kolejność bajtów: 0 - kolejność słów: Big Endian; kolejność bajtów w słowie: Big Endian (SwapBytesAndWords) 1 - kolejność słów: Little Endian; kolejność bajtów w słowie: Big Endian (SwapBytes) 2 - kolejność słów: Big Endian; kolejność bajtów w słowie: Little Endian (SwapWords) 3 - kolejność słów: Little Endian; kolejność bajtów w słowie: Little Endian (NoSwap)
     * @returns {EndiannessType}
     */
    get endianness(): EndiannessType {
        return this.raw.get(PropertyType.Endianness);
    }
    set endianness(value: EndiannessType) {
        this.raw.set(PropertyType.Endianness, value);
    }
    set initialValue(value: string) {
        this.raw.set(PropertyType.InitialValue, value);
    }
    /**
     * Wartość rejestru
     * @returns {number}
     */
    get value(): number {
        return this.raw.get(PropertyType.Value);
    }
    /**
     * Nieprzeskalowana wartość rejestru
     * @returns {number}
     */
    get rawValue(): number {
        return this.raw.get(PropertyType.RawValue);
    }
}

class ModbusServerRemote implements IModbusServer {
    constructor(private objectName: string, private gate: RemoteGate) {

    }

    /**
     * Zdarzenie wywoływane w przypadku zmiany wartości cechy Value przez Modbus
     * @param callback
     */
    addOnValueChange(_callback: () => void): void {
        // Remote events are not supported
    }

    /**
     * Ustawia wartość rejestru
     * @param {string} value
     */
    setValue(value: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.SetValue)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Port nasłuchiwania serwera
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
     * Adres urządzenia Modbus
     * @returns {number}
     */
    get deviceAddress(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.DeviceAddress)
            .build();
        return this.gate.runScript(cmd!);
    }

    set deviceAddress(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.DeviceAddress)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Adres obsługiwanego rejestru
     * @returns {number}
     */
    get registerAddress(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.RegisterAddress)
            .build();
        return this.gate.runScript(cmd!);
    }

    set registerAddress(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.RegisterAddress)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Typ rejestru Modbus: 0 - wyjścia dwustanowe (coils) - funkcja Modbus: 5 (zapis pojedynczego wyjścia), 15 (zapis wielu wyjść), lub 1 (odczyt stanu wyjść) 1 - wejścia dwustanowe - funkcja Modbus: 2 2 - rejestry pamiętające - funkcja Modbus: 6 (zapis pojedynczego rejestru), 16 (zapis wielu rejestrów), lub 3 (odczyt rejestrów) 3 - rejestry wejściowe - funkcja Modbus: 4
     * @returns {RegisterTypeType}
     */
    get registerType(): RegisterTypeType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.RegisterType)
            .build();
        return this.gate.runScript(cmd!);
    }

    set registerType(value: RegisterTypeType) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.RegisterType)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Typ wartości: 0 - Liczba całkowita, stałoprzecinkowa lub pole bitowe bez bitu znaku 1 - Liczba całkowita, stałoprzecinkowa lub pole bitowe z bitem znaku 2 - Liczba zmiennoprzecinkowa
     * @returns {DataTypeType}
     */
    get dataType(): DataTypeType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.DataType)
            .build();
        return this.gate.runScript(cmd!);
    }

    set dataType(value: DataTypeType) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.DataType)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Szerokość danych (1 do 4 rejestrów 16 bitowych)
     * @returns {DataWidthType}
     */
    get dataWidth(): DataWidthType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.DataWidth)
            .build();
        return this.gate.runScript(cmd!);
    }

    set dataWidth(value: DataWidthType) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.DataWidth)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Kolejność bajtów: 0 - kolejność słów: Big Endian; kolejność bajtów w słowie: Big Endian (SwapBytesAndWords) 1 - kolejność słów: Little Endian; kolejność bajtów w słowie: Big Endian (SwapBytes) 2 - kolejność słów: Big Endian; kolejność bajtów w słowie: Little Endian (SwapWords) 3 - kolejność słów: Little Endian; kolejność bajtów w słowie: Little Endian (NoSwap)
     * @returns {EndiannessType}
     */
    get endianness(): EndiannessType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Endianness)
            .build();
        return this.gate.runScript(cmd!);
    }

    set endianness(value: EndiannessType) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Endianness)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Wartość rejestru
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
     * Nieprzeskalowana wartość rejestru
     * @returns {number}
     */
    get rawValue(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.RawValue)
            .build();
        return this.gate.runScript(cmd!);
    }
}

export {
    ModbusServer, ModbusServerRaw, ModbusServerRemote,
    RegisterTypeType, DataTypeType, DataWidthType, EndiannessType
}
