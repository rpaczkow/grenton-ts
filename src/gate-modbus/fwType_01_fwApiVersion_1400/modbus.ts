// Created from: src/interfaces/object_modbus_v2.xml, object name="Modbus" version="2"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnChange = 0,
    OnError = 1,
}

enum PropertyType {
    DeviceAddress = 0,
    AccessRights = 1,
    RegisterAddress = 2,
    TransmisionSpeed = 3,
    ValueType = 4,
    BitPosition = 5,
    BitCount = 6,
    RefreshInterval = 8,
    ResponseTimeout = 9,
    Divisor = 10,
    Endianess = 11,
    RegisterType = 12,
    ErrorCode = 13,
    Value = 14,
    RegisterValue = 15,
    StopBits = 16,
    Parity = 17,
}

enum AccessRightsType {
    Read = 0,
    Readwrite = 1,
}

enum TransmisionSpeedType {
    _1200 = 1200,
    _2400 = 2400,
    _4800 = 4800,
    _9600 = 9600,
    _19200 = 19200,
    _38400 = 38400,
    _57600 = 57600,
    _115200 = 115200,
}

enum ValueTypeType {
    Number = 1,
    Float = 2,
    Bit = 3,
}

enum EndianessType {
    Noswap = 0,
    Swapbytesandwords = 1,
    Swapbytes = 2,
    Swapwords = 3,
}

enum RegisterTypeType {
    Bitoutputsinputs = 0,
    Binaryinputs = 1,
    Holdingregisters = 2,
    Inputregisters = 3,
}

enum StopBitsType {
    _1 = 0,
    _15 = 1,
    _2 = 2,
}

enum ParityType {
    None = 0,
    Odd = 1,
    Even = 2,
}

declare class ModbusRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: number, ...args: any[]): any;
}

interface IModbus {
    /**
     * Zdarzenie wywoływane przy zmianie stanu (niezależnie od wartości)
     * @param callback
     */
    addOnChange: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane gdy urządzenie slave zgłasza błąd
     * @param callback
     */
    addOnError: (callback: () => void) => void
    /**
     * Ustawia adres urządzenia slave Modbus
     * @param {number} deviceAddress
     */
    setDeviceAddress: (deviceAddress: number) => void
    /**
     * Ustawia tryb pracy: odczyt lub odczyt / zapis
     * @param {AccessRightsType} accessRights
     */
    setAccessRights: (accessRights: AccessRightsType) => void
    /**
     * Ustawia adres obsługiwanego  rejestru
     * @param {number} registerAddress
     */
    setRegisterAddress: (registerAddress: number) => void
    /**
     * Ustawia prędkość transmisji
     * @param {TransmisionSpeedType} transmisionSpeed
     */
    setTransmisionSpeed: (transmisionSpeed: TransmisionSpeedType) => void
    /**
     * Ustawia typ zmiennej
     * @param {ValueTypeType} valueType
     */
    setValueType: (valueType: ValueTypeType) => void
    /**
     * Ustawia pozycję bitu
     * @param {number} bitPosition
     */
    setBitPosition: (bitPosition: number) => void
    /**
     * Ustawia liczbę bitów rejestru
     * @param {number} bitCount
     */
    setBitCount: (bitCount: number) => void
    /**
     * Ustawia czas odświeżania
     * @param {number} readWriteInterval
     */
    setRefreshInterval: (readWriteInterval: number) => void
    /**
     * Ustawia czas przekroczenia odpowiedzi
     * @param {number} readWriteTimeout
     */
    setReadWriteTimeout: (readWriteTimeout: number) => void
    /**
     * Ustawia dzielnik
     * @param {number} divisor
     */
    setDivisor: (divisor: number) => void
    /**
     * Ustawia typ kolejności bajtów
     * @param {EndianessType} endianess
     */
    setEndianess: (endianess: EndianessType) => void
    /**
     * Ustawia typ rejestru Modbus
     * @param {RegisterTypeType} registerType
     */
    setRegisterType: (registerType: RegisterTypeType) => void
    /**
     * Ustawia wartość odczytu / zapisu
     * @param {number} value
     */
    setValue: (value: number) => void
    /**
     * Ustawia liczbę bitów stopu
     * @param {StopBitsType} stopBits
     */
    setStopBits: (stopBits: StopBitsType) => void
    /**
     * Ustawia sprawdzanie parzystości
     * @param {ParityType} parity
     */
    setParity: (parity: ParityType) => void
    /** Adres urządzenia slave Modbus */
    deviceAddress: number
    /** Tryb pracy:0 - odczyt1 - odczyt/zapis */
    accessRights: AccessRightsType
    /** Adres obsługiwanego rejestru */
    registerAddress: number
    /** Prędkość transmisji */
    transmisionSpeed: TransmisionSpeedType
    /** Typ zmiennej:1 - Number2 - Float3 - Bit */
    valueType: ValueTypeType
    /** Pozycja bitu (dotyczy dostępu bitowego do 16bit rejestrów - typu bit) */
    bitPosition: number
    /** Liczba bitów rejestru:Dla 16 bitowych rejestrów - podanie wartości > 16 spowoduje odczyt / zapis 2 rejestrówDla rejestrów bitowych / dwustanowych - określa liczbę odczytywanych / zapisywanych rejestrówW przypadku typu bit - określa liczbę bitów 16 bitowego rejestru podlegających operacji odczytu / zapisu */
    bitCount: number
    /** Czas odświeżania */
    refreshInterval: number
    /** Czas na odpowiedź */
    responseTimeout: number
    /** Dzielnik */
    divisor: number
    /** 0 - NoSwap - Little Endian1 - SwapBytesAndWords - BigEndian2 - SwapBytes - bajty w słowie: BigEndian; słowa: Little Endian3 - SwapWords - bajty w słowie: LittleEndian, słowa: Big Endian */
    endianess: EndianessType
    /** Typ rejestru Modbus:0 - wyjścia / wejścia bitowe - bitowe rejestry wyjśc/wejść. Dla zapisu pojedynczego wyjścia - funkcja Modbus: 5, dla wielu wyjść - funkcja Modbus: 151 - wejścia dwustanowe - 'discrete inputs' - funkcja Modbus: 32 - rejestry pamiętające - rejestry 16 bitowe. Zapis wartości 16bit - funkcja Modbus: 6, Zapis wartości 32bit - funkcja Modbus: 16. Odczyt - funkcja Modbus: 33 - rejestry wejściowe - rejestry 16 bitowe - funkcja Modbus: 4 */
    registerType: RegisterTypeType
    /** Kod błędu:1 – niedozwolona funkcja2 – niedozwolony numer rejestru3 – niedozwolona wartość danej4 – uszkodzenie w przyłączonym urządzeniu5 – potwierdzenie pozytywne6 – brak gotowości, komunikat usunięty7 – potwierdzenie negatywne8 – błąd parzystości pamięci0 - poprawny odczyt/zapis rejestru-1 - nieaktualna wartość ostatniegoodczytanego rejestru-2 - przekroczenie czasu odpowiedzi-3 - błąd ramki (problem ze zdekodowaniem odpowiedzi) */
    readonly errorCode: number
    /** Wartość odczytu / zapisu */
    value: number
    /** Nieprzeskalowana wartość rejestru */
    readonly registerValue: number
    /** Bity stopu: 0 - 1 bit stopu 1 - 1.5 bitu stopu 2 - 2 bity stopu */
    stopBits: StopBitsType
    /** Bit parzystości: 0 - None 1 - Odd 2 - Even */
    parity: ParityType
}

class Modbus implements IModbus {
    private onChangeCallbacks: Array<() => void> = [];
    private onErrorCallbacks: Array<() => void> = [];

    constructor(private raw: ModbusRaw) {
        this.raw.add_event(EventType.OnChange, () => {
            this.onChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnError, () => {
            this.onErrorCallbacks.forEach(callback => { callback(); });
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
     * Zdarzenie wywoływane gdy urządzenie slave zgłasza błąd
     * @param callback
     */
    addOnError(callback: () => void): void {
        this.onErrorCallbacks.push(callback);
    }
    /**
     * Ustawia adres urządzenia slave Modbus
     * @param {number} deviceAddress
     */
    setDeviceAddress(deviceAddress: number): void {
        this.raw.set(PropertyType.DeviceAddress, deviceAddress);
    }
    /**
     * Ustawia tryb pracy: odczyt lub odczyt / zapis
     * @param {AccessRightsType} accessRights
     */
    setAccessRights(accessRights: AccessRightsType): void {
        this.raw.set(PropertyType.AccessRights, accessRights);
    }
    /**
     * Ustawia adres obsługiwanego  rejestru
     * @param {number} registerAddress
     */
    setRegisterAddress(registerAddress: number): void {
        this.raw.set(PropertyType.RegisterAddress, registerAddress);
    }
    /**
     * Ustawia prędkość transmisji
     * @param {TransmisionSpeedType} transmisionSpeed
     */
    setTransmisionSpeed(transmisionSpeed: TransmisionSpeedType): void {
        this.raw.set(PropertyType.TransmisionSpeed, transmisionSpeed);
    }
    /**
     * Ustawia typ zmiennej
     * @param {ValueTypeType} valueType
     */
    setValueType(valueType: ValueTypeType): void {
        this.raw.set(PropertyType.ValueType, valueType);
    }
    /**
     * Ustawia pozycję bitu
     * @param {number} bitPosition
     */
    setBitPosition(bitPosition: number): void {
        this.raw.set(PropertyType.BitPosition, bitPosition);
    }
    /**
     * Ustawia liczbę bitów rejestru
     * @param {number} bitCount
     */
    setBitCount(bitCount: number): void {
        this.raw.set(PropertyType.BitCount, bitCount);
    }
    /**
     * Ustawia czas odświeżania
     * @param {number} readWriteInterval
     */
    setRefreshInterval(readWriteInterval: number): void {
        this.raw.set(PropertyType.RefreshInterval, readWriteInterval);
    }
    /**
     * Ustawia czas przekroczenia odpowiedzi
     * @param {number} readWriteTimeout
     */
    setReadWriteTimeout(readWriteTimeout: number): void {
        this.raw.set(PropertyType.ResponseTimeout, readWriteTimeout);
    }
    /**
     * Ustawia dzielnik
     * @param {number} divisor
     */
    setDivisor(divisor: number): void {
        this.raw.set(PropertyType.Divisor, divisor);
    }
    /**
     * Ustawia typ kolejności bajtów
     * @param {EndianessType} endianess
     */
    setEndianess(endianess: EndianessType): void {
        this.raw.set(PropertyType.Endianess, endianess);
    }
    /**
     * Ustawia typ rejestru Modbus
     * @param {RegisterTypeType} registerType
     */
    setRegisterType(registerType: RegisterTypeType): void {
        this.raw.set(PropertyType.RegisterType, registerType);
    }
    /**
     * Ustawia wartość odczytu / zapisu
     * @param {number} value
     */
    setValue(value: number): void {
        this.raw.set(PropertyType.Value, value);
    }
    /**
     * Ustawia liczbę bitów stopu
     * @param {StopBitsType} stopBits
     */
    setStopBits(stopBits: StopBitsType): void {
        this.raw.set(PropertyType.StopBits, stopBits);
    }
    /**
     * Ustawia sprawdzanie parzystości
     * @param {ParityType} parity
     */
    setParity(parity: ParityType): void {
        this.raw.set(PropertyType.Parity, parity);
    }
    /**
     * Adres urządzenia slave Modbus
     * @returns {number}
     */
    get deviceAddress(): number {
        return this.raw.get(PropertyType.DeviceAddress);
    }
    set deviceAddress(value: number) {
        this.raw.set(PropertyType.DeviceAddress, value);
    }
    /**
     * Tryb pracy:0 - odczyt1 - odczyt/zapis
     * @returns {AccessRightsType}
     */
    get accessRights(): AccessRightsType {
        return this.raw.get(PropertyType.AccessRights);
    }
    set accessRights(value: AccessRightsType) {
        this.raw.set(PropertyType.AccessRights, value);
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
     * Prędkość transmisji
     * @returns {TransmisionSpeedType}
     */
    get transmisionSpeed(): TransmisionSpeedType {
        return this.raw.get(PropertyType.TransmisionSpeed);
    }
    set transmisionSpeed(value: TransmisionSpeedType) {
        this.raw.set(PropertyType.TransmisionSpeed, value);
    }
    /**
     * Typ zmiennej:1 - Number2 - Float3 - Bit
     * @returns {ValueTypeType}
     */
    get valueType(): ValueTypeType {
        return this.raw.get(PropertyType.ValueType);
    }
    set valueType(value: ValueTypeType) {
        this.raw.set(PropertyType.ValueType, value);
    }
    /**
     * Pozycja bitu (dotyczy dostępu bitowego do 16bit rejestrów - typu bit)
     * @returns {number}
     */
    get bitPosition(): number {
        return this.raw.get(PropertyType.BitPosition);
    }
    set bitPosition(value: number) {
        this.raw.set(PropertyType.BitPosition, value);
    }
    /**
     * Liczba bitów rejestru:Dla 16 bitowych rejestrów - podanie wartości > 16 spowoduje odczyt / zapis 2 rejestrówDla rejestrów bitowych / dwustanowych - określa liczbę odczytywanych / zapisywanych rejestrówW przypadku typu bit - określa liczbę bitów 16 bitowego rejestru podlegających operacji odczytu / zapisu
     * @returns {number}
     */
    get bitCount(): number {
        return this.raw.get(PropertyType.BitCount);
    }
    set bitCount(value: number) {
        this.raw.set(PropertyType.BitCount, value);
    }
    /**
     * Czas odświeżania
     * @returns {number}
     */
    get refreshInterval(): number {
        return this.raw.get(PropertyType.RefreshInterval);
    }
    set refreshInterval(value: number) {
        this.raw.set(PropertyType.RefreshInterval, value);
    }
    /**
     * Czas na odpowiedź
     * @returns {number}
     */
    get responseTimeout(): number {
        return this.raw.get(PropertyType.ResponseTimeout);
    }
    set responseTimeout(value: number) {
        this.raw.set(PropertyType.ResponseTimeout, value);
    }
    /**
     * Dzielnik
     * @returns {number}
     */
    get divisor(): number {
        return this.raw.get(PropertyType.Divisor);
    }
    set divisor(value: number) {
        this.raw.set(PropertyType.Divisor, value);
    }
    /**
     * 0 - NoSwap - Little Endian1 - SwapBytesAndWords - BigEndian2 - SwapBytes - bajty w słowie: BigEndian; słowa: Little Endian3 - SwapWords - bajty w słowie: LittleEndian, słowa: Big Endian
     * @returns {EndianessType}
     */
    get endianess(): EndianessType {
        return this.raw.get(PropertyType.Endianess);
    }
    set endianess(value: EndianessType) {
        this.raw.set(PropertyType.Endianess, value);
    }
    /**
     * Typ rejestru Modbus:0 - wyjścia / wejścia bitowe - bitowe rejestry wyjśc/wejść. Dla zapisu pojedynczego wyjścia - funkcja Modbus: 5, dla wielu wyjść - funkcja Modbus: 151 - wejścia dwustanowe - 'discrete inputs' - funkcja Modbus: 32 - rejestry pamiętające - rejestry 16 bitowe. Zapis wartości 16bit - funkcja Modbus: 6, Zapis wartości 32bit - funkcja Modbus: 16. Odczyt - funkcja Modbus: 33 - rejestry wejściowe - rejestry 16 bitowe - funkcja Modbus: 4
     * @returns {RegisterTypeType}
     */
    get registerType(): RegisterTypeType {
        return this.raw.get(PropertyType.RegisterType);
    }
    set registerType(value: RegisterTypeType) {
        this.raw.set(PropertyType.RegisterType, value);
    }
    /**
     * Kod błędu:1 – niedozwolona funkcja2 – niedozwolony numer rejestru3 – niedozwolona wartość danej4 – uszkodzenie w przyłączonym urządzeniu5 – potwierdzenie pozytywne6 – brak gotowości, komunikat usunięty7 – potwierdzenie negatywne8 – błąd parzystości pamięci0 - poprawny odczyt/zapis rejestru-1 - nieaktualna wartość ostatniegoodczytanego rejestru-2 - przekroczenie czasu odpowiedzi-3 - błąd ramki (problem ze zdekodowaniem odpowiedzi)
     * @returns {number}
     */
    get errorCode(): number {
        return this.raw.get(PropertyType.ErrorCode);
    }
    /**
     * Wartość odczytu / zapisu
     * @returns {number}
     */
    get value(): number {
        return this.raw.get(PropertyType.Value);
    }
    set value(value: number) {
        this.raw.set(PropertyType.Value, value);
    }
    /**
     * Nieprzeskalowana wartość rejestru
     * @returns {number}
     */
    get registerValue(): number {
        return this.raw.get(PropertyType.RegisterValue);
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
}

class ModbusRemote implements IModbus {
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
     * Zdarzenie wywoływane gdy urządzenie slave zgłasza błąd
     * @param callback
     */
    addOnError(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Ustawia adres urządzenia slave Modbus
     * @param {number} deviceAddress
     */
    setDeviceAddress(deviceAddress: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.DeviceAddress)
            .addParameter(deviceAddress)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Ustawia tryb pracy: odczyt lub odczyt / zapis
     * @param {AccessRightsType} accessRights
     */
    setAccessRights(accessRights: AccessRightsType): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.AccessRights)
            .addParameter(accessRights)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Ustawia adres obsługiwanego  rejestru
     * @param {number} registerAddress
     */
    setRegisterAddress(registerAddress: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.RegisterAddress)
            .addParameter(registerAddress)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Ustawia prędkość transmisji
     * @param {TransmisionSpeedType} transmisionSpeed
     */
    setTransmisionSpeed(transmisionSpeed: TransmisionSpeedType): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.TransmisionSpeed)
            .addParameter(transmisionSpeed)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Ustawia typ zmiennej
     * @param {ValueTypeType} valueType
     */
    setValueType(valueType: ValueTypeType): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.ValueType)
            .addParameter(valueType)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Ustawia pozycję bitu
     * @param {number} bitPosition
     */
    setBitPosition(bitPosition: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.BitPosition)
            .addParameter(bitPosition)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Ustawia liczbę bitów rejestru
     * @param {number} bitCount
     */
    setBitCount(bitCount: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.BitCount)
            .addParameter(bitCount)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Ustawia czas odświeżania
     * @param {number} readWriteInterval
     */
    setRefreshInterval(readWriteInterval: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.RefreshInterval)
            .addParameter(readWriteInterval)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Ustawia czas przekroczenia odpowiedzi
     * @param {number} readWriteTimeout
     */
    setReadWriteTimeout(readWriteTimeout: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.ResponseTimeout)
            .addParameter(readWriteTimeout)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Ustawia dzielnik
     * @param {number} divisor
     */
    setDivisor(divisor: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Divisor)
            .addParameter(divisor)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Ustawia typ kolejności bajtów
     * @param {EndianessType} endianess
     */
    setEndianess(endianess: EndianessType): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Endianess)
            .addParameter(endianess)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Ustawia typ rejestru Modbus
     * @param {RegisterTypeType} registerType
     */
    setRegisterType(registerType: RegisterTypeType): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.RegisterType)
            .addParameter(registerType)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Ustawia wartość odczytu / zapisu
     * @param {number} value
     */
    setValue(value: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Value)
            .addParameter(value)
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
     * Adres urządzenia slave Modbus
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
     * Tryb pracy:0 - odczyt1 - odczyt/zapis
     * @returns {AccessRightsType}
     */
    get accessRights(): AccessRightsType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.AccessRights)
            .build();
        return this.gate.runScript(cmd!);
    }
    set accessRights(value: AccessRightsType) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.AccessRights)
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
     * Prędkość transmisji
     * @returns {TransmisionSpeedType}
     */
    get transmisionSpeed(): TransmisionSpeedType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.TransmisionSpeed)
            .build();
        return this.gate.runScript(cmd!);
    }
    set transmisionSpeed(value: TransmisionSpeedType) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.TransmisionSpeed)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Typ zmiennej:1 - Number2 - Float3 - Bit
     * @returns {ValueTypeType}
     */
    get valueType(): ValueTypeType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.ValueType)
            .build();
        return this.gate.runScript(cmd!);
    }
    set valueType(value: ValueTypeType) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.ValueType)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Pozycja bitu (dotyczy dostępu bitowego do 16bit rejestrów - typu bit)
     * @returns {number}
     */
    get bitPosition(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.BitPosition)
            .build();
        return this.gate.runScript(cmd!);
    }
    set bitPosition(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.BitPosition)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Liczba bitów rejestru:Dla 16 bitowych rejestrów - podanie wartości > 16 spowoduje odczyt / zapis 2 rejestrówDla rejestrów bitowych / dwustanowych - określa liczbę odczytywanych / zapisywanych rejestrówW przypadku typu bit - określa liczbę bitów 16 bitowego rejestru podlegających operacji odczytu / zapisu
     * @returns {number}
     */
    get bitCount(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.BitCount)
            .build();
        return this.gate.runScript(cmd!);
    }
    set bitCount(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.BitCount)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Czas odświeżania
     * @returns {number}
     */
    get refreshInterval(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.RefreshInterval)
            .build();
        return this.gate.runScript(cmd!);
    }
    set refreshInterval(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.RefreshInterval)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Czas na odpowiedź
     * @returns {number}
     */
    get responseTimeout(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.ResponseTimeout)
            .build();
        return this.gate.runScript(cmd!);
    }
    set responseTimeout(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.ResponseTimeout)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Dzielnik
     * @returns {number}
     */
    get divisor(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Divisor)
            .build();
        return this.gate.runScript(cmd!);
    }
    set divisor(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Divisor)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * 0 - NoSwap - Little Endian1 - SwapBytesAndWords - BigEndian2 - SwapBytes - bajty w słowie: BigEndian; słowa: Little Endian3 - SwapWords - bajty w słowie: LittleEndian, słowa: Big Endian
     * @returns {EndianessType}
     */
    get endianess(): EndianessType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Endianess)
            .build();
        return this.gate.runScript(cmd!);
    }
    set endianess(value: EndianessType) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Endianess)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Typ rejestru Modbus:0 - wyjścia / wejścia bitowe - bitowe rejestry wyjśc/wejść. Dla zapisu pojedynczego wyjścia - funkcja Modbus: 5, dla wielu wyjść - funkcja Modbus: 151 - wejścia dwustanowe - 'discrete inputs' - funkcja Modbus: 32 - rejestry pamiętające - rejestry 16 bitowe. Zapis wartości 16bit - funkcja Modbus: 6, Zapis wartości 32bit - funkcja Modbus: 16. Odczyt - funkcja Modbus: 33 - rejestry wejściowe - rejestry 16 bitowe - funkcja Modbus: 4
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
     * Kod błędu:1 – niedozwolona funkcja2 – niedozwolony numer rejestru3 – niedozwolona wartość danej4 – uszkodzenie w przyłączonym urządzeniu5 – potwierdzenie pozytywne6 – brak gotowości, komunikat usunięty7 – potwierdzenie negatywne8 – błąd parzystości pamięci0 - poprawny odczyt/zapis rejestru-1 - nieaktualna wartość ostatniegoodczytanego rejestru-2 - przekroczenie czasu odpowiedzi-3 - błąd ramki (problem ze zdekodowaniem odpowiedzi)
     * @returns {number}
     */
    get errorCode(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.ErrorCode)
            .build();
        return this.gate.runScript(cmd!);
    }
    /**
     * Wartość odczytu / zapisu
     * @returns {number}
     */
    get value(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Value)
            .build();
        return this.gate.runScript(cmd!);
    }
    set value(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Value)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Nieprzeskalowana wartość rejestru
     * @returns {number}
     */
    get registerValue(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.RegisterValue)
            .build();
        return this.gate.runScript(cmd!);
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
}

export { Modbus, ModbusRaw, ModbusRemote, AccessRightsType, TransmisionSpeedType, ValueTypeType, EndianessType, RegisterTypeType, StopBitsType, ParityType }
