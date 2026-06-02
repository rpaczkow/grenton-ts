// Created from: packages/grenton-api/interfaces/object_modbus_rtu_v1.xml, object name="ModbusRTU" version="1"

import { rawExecutionBuilderFactory } from "../../../core/execution-builder"
import { RemoteGate } from "../../../core/remote-gate"

enum EventType {
    OnValueChange = 0,
    OnValueRead = 1,
    OnValueWritten = 2,
    OnError = 3
}

enum PropertyType {
    TransmissionSpeed = 0,
    Parity = 1,
    StopBits = 2,
    DeviceAddress = 5,
    ResponseTimeout = 6,
    RefreshInterval = 7,
    RegisterAddress = 8,
    RegisterType = 10,
    AlwaysWriteMultiple = 11,
    InputOutputCount = 12,
    DataType = 14,
    DataWidth = 15,
    Endianness = 16,
    BitFieldWidth = 17,
    BitFieldPosition = 18,
    Divisor = 19,
    InitialValueAccess = 20,
    InitialValue = 21,
    Value = 22,
    RawValue = 23,
    IsValueValid = 24,
    ErrorCode = 25
}

enum MethodType {
    ReadValue = 0,
    WriteValue = 1
}

enum TransmissionSpeedType {
    _1200 = 1200,
    _2400 = 2400,
    _4800 = 4800,
    _9600 = 9600,
    _19200 = 19200,
    _38400 = 38400,
    _57600 = 57600,
    _115200 = 115200
}

enum ParityType {
    None = 0,
    Odd = 1,
    Even = 2
}

enum StopBitsType {
    One = 0,
    OneAndHalf = 1,
    Two = 2
}

enum RegisterTypeType {
    DiscreteOutputsCoils = 0,
    DiscreteInputs = 1,
    HoldingRegisters = 2,
    InputRegisters = 3
}

enum AlwaysWriteMultipleType {
    No = 0,
    Yes = 1
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

enum InitialValueAccessType {
    Read = 0,
    Write = 1
}

declare class ModbusRTURaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface IModbusRTU {
    /**
     * Zdarzenie wywoływane w przypadku zmiany wartości cechy Value przez Modbus
     * @param callback
     */
    addOnValueChange: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po zakończeniu odczytu rozpoczętego przez ReadValue
     * @param callback
     */
    addOnValueRead: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po zakończeniu zapisu rozpoczętego przez WriteValue
     * @param callback
     */
    addOnValueWritten: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane gdy urządzenie slave zgłasza błąd
     * @param callback
     */
    addOnError: (callback: () => void) => void
    /** Rozpoczyna odczyt wartości z urządzenia. Czeka na zakończenie odczytu w przypadku braku OnValueRead. */
    readValue: () => void
    /**
     * Zapisuje nową wartość do urządzenia.
     * @param {string} value
     */
    writeValue: (value: string) => void
    /** Prędkość transmisji */
    transmissionSpeed: TransmissionSpeedType
    /** Bit parzystości: 0 - None 1 - Odd 2 - Even */
    parity: ParityType
    /** Bity stopu: 0 - 1 bit stopu 1 - 1.5 bitu stopu 2 - 2 bity stopu */
    stopBits: StopBitsType
    /** Adres urządzenia Modbus */
    deviceAddress: number
    /** Czas na odpowiedź na ramkę w krokach 25ms */
    responseTimeout: number
    /** Minimalny okres odświeżania w krokach 5ms. Wartość 0 wyłącza automatyczne odświeżanie. */
    refreshInterval: number
    /** Adres obsługiwanego rejestru */
    registerAddress: number
    /** Typ rejestru Modbus: 0 - wyjścia dwustanowe (coils) - funkcja Modbus: 5 (zapis pojedynczego wyjścia), 15 (zapis wielu wyjść), lub 1 (odczyt stanu wyjść) 1 - wejścia dwustanowe - funkcja Modbus: 2 2 - rejestry pamiętające - funkcja Modbus: 6 (zapis pojedynczego rejestru), 16 (zapis wielu rejestrów), lub 3 (odczyt rejestrów) 3 - rejestry wejściowe - funkcja Modbus: 4 */
    registerType: RegisterTypeType
    /** Zawsze używaj funkcji 15 lub 16 do zapisu wartości */
    alwaysWriteMultiple: AlwaysWriteMultipleType
    /** Określa liczbę dyskretnych wejść / wyjść podlegających operacji odczytu / zapisu */
    inputOutputCount: number
    /** Typ wartości: 0 - Liczba całkowita, stałoprzecinkowa lub pole bitowe bez bitu znaku 1 - Liczba całkowita, stałoprzecinkowa lub pole bitowe z bitem znaku 2 - Liczba zmiennoprzecinkowa */
    dataType: DataTypeType
    /** Szerokość danych (1 do 4 rejestrów 16 bitowych) */
    dataWidth: DataWidthType
    /** Kolejność bajtów: 0 - kolejność słów: Big Endian; kolejność bajtów w słowie: Big Endian (SwapBytesAndWords) 1 - kolejność słów: Little Endian; kolejność bajtów w słowie: Big Endian (SwapBytes) 2 - kolejność słów: Big Endian; kolejność bajtów w słowie: Little Endian (SwapWords) 3 - kolejność słów: Little Endian; kolejność bajtów w słowie: Little Endian (NoSwap) */
    endianness: EndiannessType
    /** Liczba bitów pola bitowego. Suma BitFieldWidth i Position powinna być <= DataWidth; 0 oznacza brak pola bitowego (pełna szerokość danych DataWidth) */
    bitFieldWidth: number
    /** Pozycja najmłodszego bitu pola bitowego. Suma BitFieldWidth i Position powinna być <= DataWidth. */
    bitFieldPosition: number
    /** Dzielnik */
    divisor: string
    /** Metoda pierwszego dostępu do wartości Value: 0 - wartość początkowa Value jest odczytywana z urządzenia 1 - wartość początkowa Value jest zapisywana do urządzenia */
    initialValueAccess: InitialValueAccessType
    /** Zwraca ostatnio odczytaną wartość */
    readonly value: number
    /** Nieprzeskalowana wartość rejestru */
    readonly rawValue: number
    /** Określa, czy wartość jest zgodna ze stanem obiektu */
    readonly isValueValid: number
    /** Kod błędu: 1 – niedozwolona funkcja 2 – niedozwolony numer rejestru 3 – niedozwolona wartość danej 4 – uszkodzenie w przyłączonym urządzeniu 5 – potwierdzenie pozytywne 6 – brak gotowości 7 – potwierdzenie negatywne 8 – błąd parzystości pamięci 10 - ścieżka bramy niedostępna 11 - brak odpowiedzi urządzenia docelowego 0 - poprawny odczyt/zapis rejestru -1 - nieaktualna wartość ostatniegoodczytanego rejestru -2 - przekroczenie czasu odpowiedzi -3 - błąd ramki (problem ze zdekodowaniem odpowiedzi) -4 - nieoczekiwany rozmiar odpowiedzi -5 - nieoczekiwany kod odpowiedzi -6 - nieprawidłowy stan obiektu -7 - błąd połączenia */
    readonly errorCode: number
}

class ModbusRTU implements IModbusRTU {
    private onValueChangeCallbacks: Array<() => void> = [];
    private onValueReadCallbacks: Array<() => void> = [];
    private onValueWrittenCallbacks: Array<() => void> = [];
    private onErrorCallbacks: Array<() => void> = [];

    constructor(private raw: ModbusRTURaw) {
        this.raw.add_event(EventType.OnValueChange, () => {
            this.onValueChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnValueRead, () => {
            this.onValueReadCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnValueWritten, () => {
            this.onValueWrittenCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnError, () => {
            this.onErrorCallbacks.forEach(callback => { callback(); });
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
     * Zdarzenie wywoływane po zakończeniu odczytu rozpoczętego przez ReadValue
     * @param callback
     */
    addOnValueRead(callback: () => void): void {
        this.onValueReadCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po zakończeniu zapisu rozpoczętego przez WriteValue
     * @param callback
     */
    addOnValueWritten(callback: () => void): void {
        this.onValueWrittenCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane gdy urządzenie slave zgłasza błąd
     * @param callback
     */
    addOnError(callback: () => void): void {
        this.onErrorCallbacks.push(callback);
    }
    /** Rozpoczyna odczyt wartości z urządzenia. Czeka na zakończenie odczytu w przypadku braku OnValueRead. */
    readValue(): void {
        this.raw.execute(MethodType.ReadValue);
    }
    /**
     * Zapisuje nową wartość do urządzenia.
     * @param {string} value
     */
    writeValue(value: string): void {
        this.raw.execute(MethodType.WriteValue, value);
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
     * Bit parzystości: 0 - None 1 - Odd 2 - Even
     * @returns {ParityType}
     */
    get parity(): ParityType {
        return this.raw.get(PropertyType.Parity);
    }
    set parity(value: ParityType) {
        this.raw.set(PropertyType.Parity, value);
    }
    /**
     * Bity stopu: 0 - 1 bit stopu 1 - 1.5 bitu stopu 2 - 2 bity stopu
     * @returns {StopBitsType}
     */
    get stopBits(): StopBitsType {
        return this.raw.get(PropertyType.StopBits);
    }
    set stopBits(value: StopBitsType) {
        this.raw.set(PropertyType.StopBits, value);
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
     * Czas na odpowiedź na ramkę w krokach 25ms
     * @returns {number}
     */
    get responseTimeout(): number {
        return this.raw.get(PropertyType.ResponseTimeout);
    }
    set responseTimeout(value: number) {
        this.raw.set(PropertyType.ResponseTimeout, value);
    }
    /**
     * Minimalny okres odświeżania w krokach 5ms. Wartość 0 wyłącza automatyczne odświeżanie.
     * @returns {number}
     */
    get refreshInterval(): number {
        return this.raw.get(PropertyType.RefreshInterval);
    }
    set refreshInterval(value: number) {
        this.raw.set(PropertyType.RefreshInterval, value);
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
     * Zawsze używaj funkcji 15 lub 16 do zapisu wartości
     * @returns {AlwaysWriteMultipleType}
     */
    get alwaysWriteMultiple(): AlwaysWriteMultipleType {
        return this.raw.get(PropertyType.AlwaysWriteMultiple);
    }
    set alwaysWriteMultiple(value: AlwaysWriteMultipleType) {
        this.raw.set(PropertyType.AlwaysWriteMultiple, value);
    }
    /**
     * Określa liczbę dyskretnych wejść / wyjść podlegających operacji odczytu / zapisu
     * @returns {number}
     */
    get inputOutputCount(): number {
        return this.raw.get(PropertyType.InputOutputCount);
    }
    set inputOutputCount(value: number) {
        this.raw.set(PropertyType.InputOutputCount, value);
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
    /**
     * Liczba bitów pola bitowego. Suma BitFieldWidth i Position powinna być <= DataWidth; 0 oznacza brak pola bitowego (pełna szerokość danych DataWidth)
     * @returns {number}
     */
    get bitFieldWidth(): number {
        return this.raw.get(PropertyType.BitFieldWidth);
    }
    set bitFieldWidth(value: number) {
        this.raw.set(PropertyType.BitFieldWidth, value);
    }
    /**
     * Pozycja najmłodszego bitu pola bitowego. Suma BitFieldWidth i Position powinna być <= DataWidth.
     * @returns {number}
     */
    get bitFieldPosition(): number {
        return this.raw.get(PropertyType.BitFieldPosition);
    }
    set bitFieldPosition(value: number) {
        this.raw.set(PropertyType.BitFieldPosition, value);
    }
    /**
     * Dzielnik
     * @returns {string}
     */
    get divisor(): string {
        return this.raw.get(PropertyType.Divisor);
    }
    set divisor(value: string) {
        this.raw.set(PropertyType.Divisor, value);
    }
    /**
     * Metoda pierwszego dostępu do wartości Value: 0 - wartość początkowa Value jest odczytywana z urządzenia 1 - wartość początkowa Value jest zapisywana do urządzenia
     * @returns {InitialValueAccessType}
     */
    get initialValueAccess(): InitialValueAccessType {
        return this.raw.get(PropertyType.InitialValueAccess);
    }
    set initialValueAccess(value: InitialValueAccessType) {
        this.raw.set(PropertyType.InitialValueAccess, value);
    }
    set initialValue(value: string) {
        this.raw.set(PropertyType.InitialValue, value);
    }
    /**
     * Zwraca ostatnio odczytaną wartość
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
    /**
     * Określa, czy wartość jest zgodna ze stanem obiektu
     * @returns {number}
     */
    get isValueValid(): number {
        return this.raw.get(PropertyType.IsValueValid);
    }
    /**
     * Kod błędu: 1 – niedozwolona funkcja 2 – niedozwolony numer rejestru 3 – niedozwolona wartość danej 4 – uszkodzenie w przyłączonym urządzeniu 5 – potwierdzenie pozytywne 6 – brak gotowości 7 – potwierdzenie negatywne 8 – błąd parzystości pamięci 10 - ścieżka bramy niedostępna 11 - brak odpowiedzi urządzenia docelowego 0 - poprawny odczyt/zapis rejestru -1 - nieaktualna wartość ostatniegoodczytanego rejestru -2 - przekroczenie czasu odpowiedzi -3 - błąd ramki (problem ze zdekodowaniem odpowiedzi) -4 - nieoczekiwany rozmiar odpowiedzi -5 - nieoczekiwany kod odpowiedzi -6 - nieprawidłowy stan obiektu -7 - błąd połączenia
     * @returns {number}
     */
    get errorCode(): number {
        return this.raw.get(PropertyType.ErrorCode);
    }
}

class ModbusRTURemote implements IModbusRTU {
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
     * Zdarzenie wywoływane po zakończeniu odczytu rozpoczętego przez ReadValue
     * @param callback
     */
    addOnValueRead(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane po zakończeniu zapisu rozpoczętego przez WriteValue
     * @param callback
     */
    addOnValueWritten(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane gdy urządzenie slave zgłasza błąd
     * @param callback
     */
    addOnError(_callback: () => void): void {
        // Remote events are not supported
    }

    /** Rozpoczyna odczyt wartości z urządzenia. Czeka na zakończenie odczytu w przypadku braku OnValueRead. */
    readValue(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.ReadValue)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Zapisuje nową wartość do urządzenia.
     * @param {string} value
     */
    writeValue(value: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.WriteValue)
            .addParameter(value)
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
     * Bit parzystości: 0 - None 1 - Odd 2 - Even
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
     * Bity stopu: 0 - 1 bit stopu 1 - 1.5 bitu stopu 2 - 2 bity stopu
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
     * Czas na odpowiedź na ramkę w krokach 25ms
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
     * Minimalny okres odświeżania w krokach 5ms. Wartość 0 wyłącza automatyczne odświeżanie.
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
     * Zawsze używaj funkcji 15 lub 16 do zapisu wartości
     * @returns {AlwaysWriteMultipleType}
     */
    get alwaysWriteMultiple(): AlwaysWriteMultipleType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.AlwaysWriteMultiple)
            .build();
        return this.gate.runScript(cmd!);
    }

    set alwaysWriteMultiple(value: AlwaysWriteMultipleType) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.AlwaysWriteMultiple)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Określa liczbę dyskretnych wejść / wyjść podlegających operacji odczytu / zapisu
     * @returns {number}
     */
    get inputOutputCount(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.InputOutputCount)
            .build();
        return this.gate.runScript(cmd!);
    }

    set inputOutputCount(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.InputOutputCount)
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
     * Liczba bitów pola bitowego. Suma BitFieldWidth i Position powinna być <= DataWidth; 0 oznacza brak pola bitowego (pełna szerokość danych DataWidth)
     * @returns {number}
     */
    get bitFieldWidth(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.BitFieldWidth)
            .build();
        return this.gate.runScript(cmd!);
    }

    set bitFieldWidth(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.BitFieldWidth)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Pozycja najmłodszego bitu pola bitowego. Suma BitFieldWidth i Position powinna być <= DataWidth.
     * @returns {number}
     */
    get bitFieldPosition(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.BitFieldPosition)
            .build();
        return this.gate.runScript(cmd!);
    }

    set bitFieldPosition(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.BitFieldPosition)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Dzielnik
     * @returns {string}
     */
    get divisor(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Divisor)
            .build();
        return this.gate.runScript(cmd!);
    }

    set divisor(value: string) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Divisor)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Metoda pierwszego dostępu do wartości Value: 0 - wartość początkowa Value jest odczytywana z urządzenia 1 - wartość początkowa Value jest zapisywana do urządzenia
     * @returns {InitialValueAccessType}
     */
    get initialValueAccess(): InitialValueAccessType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.InitialValueAccess)
            .build();
        return this.gate.runScript(cmd!);
    }

    set initialValueAccess(value: InitialValueAccessType) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.InitialValueAccess)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Zwraca ostatnio odczytaną wartość
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

    /**
     * Określa, czy wartość jest zgodna ze stanem obiektu
     * @returns {number}
     */
    get isValueValid(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.IsValueValid)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Kod błędu: 1 – niedozwolona funkcja 2 – niedozwolony numer rejestru 3 – niedozwolona wartość danej 4 – uszkodzenie w przyłączonym urządzeniu 5 – potwierdzenie pozytywne 6 – brak gotowości 7 – potwierdzenie negatywne 8 – błąd parzystości pamięci 10 - ścieżka bramy niedostępna 11 - brak odpowiedzi urządzenia docelowego 0 - poprawny odczyt/zapis rejestru -1 - nieaktualna wartość ostatniegoodczytanego rejestru -2 - przekroczenie czasu odpowiedzi -3 - błąd ramki (problem ze zdekodowaniem odpowiedzi) -4 - nieoczekiwany rozmiar odpowiedzi -5 - nieoczekiwany kod odpowiedzi -6 - nieprawidłowy stan obiektu -7 - błąd połączenia
     * @returns {number}
     */
    get errorCode(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.ErrorCode)
            .build();
        return this.gate.runScript(cmd!);
    }
}

export {
    ModbusRTU, ModbusRTURaw, ModbusRTURemote,
    TransmissionSpeedType, ParityType, StopBitsType, RegisterTypeType,
    AlwaysWriteMultipleType, DataTypeType, DataWidthType, EndiannessType, InitialValueAccessType
}
