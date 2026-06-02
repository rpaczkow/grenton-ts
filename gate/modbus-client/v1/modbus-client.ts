// Created from: packages/grenton-api/interfaces/object_modbus_client_v1.xml, object name="ModbusClient" version="1"

import { rawExecutionBuilderFactory } from "../../../core/execution-builder"
import { RemoteGate } from "../../../core/remote-gate"

enum EventType {
    OnValueChange = 0,
    OnValueRead = 1,
    OnValueWritten = 2,
    OnError = 3
}

enum PropertyType {
    SocketAddress = 1,
    DeviceAddress = 2,
    ResponseTimeout = 3,
    RefreshInterval = 4,
    RegisterAddress = 5,
    RegisterType = 7,
    AlwaysWriteMultiple = 8,
    InputOutputCount = 9,
    DataType = 11,
    DataWidth = 12,
    Endianness = 13,
    BitFieldWidth = 14,
    BitFieldPosition = 15,
    Divisor = 16,
    InitialValueAccess = 17,
    InitialValue = 18,
    Value = 19,
    RawValue = 20,
    IsValueValid = 21,
    ErrorCode = 22
}

enum MethodType {
    ReadValue = 0,
    WriteValue = 1
}

enum RegisterType {
    DiscreteOutputs = 0,
    DiscreteInputs = 1,
    HoldingRegisters = 2,
    InputRegisters = 3
}

enum AlwaysWriteMultiple {
    No = 0,
    Yes = 1
}

enum DataType {
    UnsignedInteger = 0,
    SignedInteger = 1,
    FloatingPoint = 2
}

enum DataWidth {
    Bits16 = 16,
    Bits32 = 32,
    Bits48 = 48,
    Bits64 = 64
}

enum Endianness {
    BigEndian = 0,
    LittleBigEndian = 1,
    BigLittleEndian = 2,
    LittleEndian = 3
}

enum InitialValueAccess {
    Read = 0,
    Write = 1
}

declare class ModbusClientRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface IModbusClient {
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
     * Zdarzenie wywoływane gdy urządzenie serwer zgłasza błąd
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
    /** Adres IP urządzenia */
    socketAddress: string
    /** Adres urządzenia Modbus */
    deviceAddress: number
    /** Czas na odpowiedź na ramkę w krokach 25ms */
    responseTimeout: number
    /** Minimalny okres odświeżania w krokach 5ms. Wartość 0 wyłącza automatyczne odświeżanie. */
    refreshInterval: number
    /** Adres obsługiwanego rejestru */
    registerAddress: number
    /** Typ rejestru Modbus: 0 - wyjścia dwustanowe (coils) - funkcja Modbus: 5 (zapis pojedynczego wyjścia), 15 (zapis wielu wyjść), lub 1 (odczyt stanu wyjść) 1 - wejścia dwustanowe - funkcja Modbus: 2 2 - rejestry pamiętające - funkcja Modbus: 6 (zapis pojedynczego rejestru), 16 (zapis wielu rejestrów), lub 3 (odczyt rejestrów) 3 - rejestry wejściowe - funkcja Modbus: 4 */
    registerType: RegisterType
    /** Zawsze używaj funkcji 15 lub 16 do zapisu wartości */
    alwaysWriteMultiple: AlwaysWriteMultiple
    /** Określa liczbę dyskretnych wejść / wyjść podlegających operacji odczytu / zapisu */
    inputOutputCount: number
    /** Typ wartości: 0 - Liczba całkowita, stałoprzecinkowa lub pole bitowe bez bitu znaku 1 - Liczba całkowita, stałoprzecinkowa lub pole bitowe z bitem znaku 2 - Liczba zmiennoprzecinkowa */
    dataType: DataType
    /** Szerokość danych (1 do 4 rejestrów 16 bitowych) */
    dataWidth: DataWidth
    /** Kolejność bajtów: 0 - kolejność słów: Big Endian; kolejność bajtów w słowie: Big Endian (SwapBytesAndWords) 1 - kolejność słów: Little Endian; kolejność bajtów w słowie: Big Endian (SwapBytes) 2 - kolejność słów: Big Endian; kolejność bajtów w słowie: Little Endian (SwapWords) 3 - kolejność słów: Little Endian; kolejność bajtów w słowie: Little Endian (NoSwap) */
    endianness: Endianness
    /** Liczba bitów pola bitowego. Suma BitFieldWidth i Position powinna być <= DataWidth; 0 oznacza brak pola bitowego (pełna szerokość danych DataWidth) */
    bitFieldWidth: number
    /** Pozycja najmłodszego bitu pola bitowego. Suma BitFieldWidth i Position powinna być <= DataWidth. */
    bitFieldPosition: number
    /** Dzielnik */
    divisor: string
    /** Metoda pierwszego dostępu do wartości Value: 0 - wartość początkowa Value jest odczytywana z urządzenia 1 - wartość początkowa Value jest zapisywana do urządzenia */
    initialValueAccess: InitialValueAccess
    /** Zwraca ostatnio odczytaną wartość */
    readonly value: number
    /** Nieprzeskalowana wartość rejestru */
    readonly rawValue: number
    /** Określa, czy wartość jest zgodna ze stanem obiektu */
    readonly isValueValid: number
    /** Kod błędu: 1 – niedozwolona funkcja 2 – niedozwolony numer rejestru 3 – niedozwolona wartość danej 4 – uszkodzenie w przyłączonym urządzeniu 5 – potwierdzenie pozytywne 6 – brak gotowości 7 – potwierdzenie negatywne 8 – błąd parzystości pamięci 10 - ścieżka bramy niedostępna 11 - brak odpowiedzi urządzenia docelowego 0 - poprawny odczyt/zapis rejestru -1 - nieaktualna wartość ostatniegoodczytanego rejestru -2 - przekroczenie czasu odpowiedzi -3 - błąd ramki (problem ze zdekodowaniem odpowiedzi) -4 - nieoczekiwany rozmiar odpowiedzi -5 - nieoczekiwany kod odpowiedzi -6 - nieprawidłowy stan obiektu -7 - błąd połączenia */
    readonly errorCode: number
}

class ModbusClient implements IModbusClient {
    private onValueChangeCallbacks: Array<() => void> = [];
    private onValueReadCallbacks: Array<() => void> = [];
    private onValueWrittenCallbacks: Array<() => void> = [];
    private onErrorCallbacks: Array<() => void> = [];

    constructor(private raw: ModbusClientRaw) {
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
     * Zdarzenie wywoływane gdy urządzenie serwer zgłasza błąd
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
     * Adres IP urządzenia
     * @returns {string}
     */
    get socketAddress(): string {
        return this.raw.get(PropertyType.SocketAddress);
    }
    set socketAddress(value: string) {
        this.raw.set(PropertyType.SocketAddress, value);
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
     * @returns {RegisterType}
     */
    get registerType(): RegisterType {
        return this.raw.get(PropertyType.RegisterType);
    }
    set registerType(value: RegisterType) {
        this.raw.set(PropertyType.RegisterType, value);
    }
    /**
     * Zawsze używaj funkcji 15 lub 16 do zapisu wartości
     * @returns {AlwaysWriteMultiple}
     */
    get alwaysWriteMultiple(): AlwaysWriteMultiple {
        return this.raw.get(PropertyType.AlwaysWriteMultiple);
    }
    set alwaysWriteMultiple(value: AlwaysWriteMultiple) {
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
     * @returns {DataType}
     */
    get dataType(): DataType {
        return this.raw.get(PropertyType.DataType);
    }
    set dataType(value: DataType) {
        this.raw.set(PropertyType.DataType, value);
    }
    /**
     * Szerokość danych (1 do 4 rejestrów 16 bitowych)
     * @returns {DataWidth}
     */
    get dataWidth(): DataWidth {
        return this.raw.get(PropertyType.DataWidth);
    }
    set dataWidth(value: DataWidth) {
        this.raw.set(PropertyType.DataWidth, value);
    }
    /**
     * Kolejność bajtów: 0 - kolejność słów: Big Endian; kolejność bajtów w słowie: Big Endian (SwapBytesAndWords) 1 - kolejność słów: Little Endian; kolejność bajtów w słowie: Big Endian (SwapBytes) 2 - kolejność słów: Big Endian; kolejność bajtów w słowie: Little Endian (SwapWords) 3 - kolejność słów: Little Endian; kolejność bajtów w słowie: Little Endian (NoSwap)
     * @returns {Endianness}
     */
    get endianness(): Endianness {
        return this.raw.get(PropertyType.Endianness);
    }
    set endianness(value: Endianness) {
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
     * @returns {InitialValueAccess}
     */
    get initialValueAccess(): InitialValueAccess {
        return this.raw.get(PropertyType.InitialValueAccess);
    }
    set initialValueAccess(value: InitialValueAccess) {
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

class ModbusClientRemote implements IModbusClient {
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
     * Zdarzenie wywoływane gdy urządzenie serwer zgłasza błąd
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
     * Adres IP urządzenia
     * @returns {string}
     */
    get socketAddress(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.SocketAddress)
            .build();
        return this.gate.runScript(cmd!);
    }

    set socketAddress(value: string) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.SocketAddress)
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
     * @returns {RegisterType}
     */
    get registerType(): RegisterType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.RegisterType)
            .build();
        return this.gate.runScript(cmd!);
    }

    set registerType(value: RegisterType) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.RegisterType)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Zawsze używaj funkcji 15 lub 16 do zapisu wartości
     * @returns {AlwaysWriteMultiple}
     */
    get alwaysWriteMultiple(): AlwaysWriteMultiple {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.AlwaysWriteMultiple)
            .build();
        return this.gate.runScript(cmd!);
    }

    set alwaysWriteMultiple(value: AlwaysWriteMultiple) {
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
     * @returns {DataType}
     */
    get dataType(): DataType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.DataType)
            .build();
        return this.gate.runScript(cmd!);
    }

    set dataType(value: DataType) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.DataType)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Szerokość danych (1 do 4 rejestrów 16 bitowych)
     * @returns {DataWidth}
     */
    get dataWidth(): DataWidth {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.DataWidth)
            .build();
        return this.gate.runScript(cmd!);
    }

    set dataWidth(value: DataWidth) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.DataWidth)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Kolejność bajtów: 0 - kolejność słów: Big Endian; kolejność bajtów w słowie: Big Endian (SwapBytesAndWords) 1 - kolejność słów: Little Endian; kolejność bajtów w słowie: Big Endian (SwapBytes) 2 - kolejność słów: Big Endian; kolejność bajtów w słowie: Little Endian (SwapWords) 3 - kolejność słów: Little Endian; kolejność bajtów w słowie: Little Endian (NoSwap)
     * @returns {Endianness}
     */
    get endianness(): Endianness {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Endianness)
            .build();
        return this.gate.runScript(cmd!);
    }

    set endianness(value: Endianness) {
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
     * @returns {InitialValueAccess}
     */
    get initialValueAccess(): InitialValueAccess {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.InitialValueAccess)
            .build();
        return this.gate.runScript(cmd!);
    }

    set initialValueAccess(value: InitialValueAccess) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.InitialValueAccess)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    set initialValue(value: string) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.InitialValue)
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
    ModbusClient, ModbusClientRaw, ModbusClientRemote, RegisterType, AlwaysWriteMultiple, DataType, DataWidth, Endianness, InitialValueAccess
}
