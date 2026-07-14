// Created from: src/interfaces/clu_ZWAVE_2_ft00000003_fv1f8_ht00000013_hv00000001.xml, object name="CLU_ZWAVE_2"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnInit = 0,
}

enum PropertyType {
    Uptime = 0,
    Log = 1,
    State = 2,
    IsLocalPower = 3,
    Date = 5,
    Time = 6,
    Day = 7,
    Month = 8,
    Year = 9,
    DayOfWeek = 10,
    Hour = 11,
    Minute = 12,
    LocalTime = 13,
    FirmwareVersion = 17,
    UseCloud = 18,
    CloudConnection = 19,
    VoltageFrequency = 20,
    DefaultVoltageValue = 21,
    NTPServer = 22,
    TimeZone = 23,
}

enum MethodType {
    AddToLog = 0,
    ClearLog = 1,
    SetDateTime = 2,
    StartZWaveDiscovery = 3,
    StopZWaveDiscovery = 4,
}

enum StateType {
    SystemStarting = 0,
    SystemOk = 1,
    TelnetLoggingMode = 2,
    EmergencyMode = 3,
    CriticalError = 4,
    MonitorMode = 5,
    ModuleNotResponding = 6,
    AddingZWaveNode = 7,
    RemovingZWaveNode = 8,
    ZWaveAddRemoveBusy = 9,
    ZWaveAddRemoveError = 10,
    ZWaveAddRemoveOk = 11,
}

enum VoltageFrequencyType {
    Hz50 = 50,
    Hz60 = 60,
}

enum TimeZoneType {
    EuropeWarsaw = 0,
    EuropeLondon = 1,
    EuropeMoscow = 2,
    EuropeIstanbul = 3,
    EuropeAthens = 4,
    AsiaDubai = 5,
    AsiaJakarta = 6,
    AsiaHongKong = 7,
    AustraliaSydney = 8,
    AustraliaPerth = 9,
    AustraliaBrisbane = 10,
    NewZealandAuckland = 11,
    USAHawaii = 12,
    USAAlaska = 13,
    USACentralTime = 14,
    USAEasternTime = 15,
    USAAtlanticTime = 16,
    AmericaBrazil = 17,
    AmericaColombia = 18,
    AmericaArgentina = 19,
    AmericaCentralAmerica = 20,
    PacificTime = 21,
}

enum DayOfWeek {
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6,
}

declare class CluZWave2Raw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface ICluZWave2 {
    /**
     * Zdarzenie wywoływane jednorazowo w momencie inicjalizacji urządzenia
     * @param callback
     */
    addOnInit: (callback: () => void) => void
    /**
     * Dodaje do loga wewnętrznego nowy wpis
     * @param {string} log
     */
    addToLog: (log: string) => void
    /** Kasuje zawartość wewnętrznego logu urządzenia */
    clearLog: () => void
    /**
     * Ustawia datę i czas
     * @param {number} localTimestamp
     */
    setDateTime: (localTimestamp: number) => void
    /**
     * Uruchamia wykrywanie urządzeń bezprzewodowych
     * @param {number} time
     */
    startZWaveDiscovery: (time: number) => void
    /** Wstrzymuje wykrywanie urządzeń bezprzewodowych */
    stopZWaveDiscovery: () => void
    /** Czas pracy urządzenia od ostatniego resetu (w sekundach) */
    readonly uptime: number
    /** Wewnętrzny log urządzenia */
    readonly log: string
    /** Stan urządzenia: 0 - Start systemu, 1 - System OK, 2 - Tryb logowania telnet, 3 - Tryb emergency, 4 - Błąd krytyczny, 5 - Tryb monitorowania, 6 - Moduł TF-Bus nie odpowiada, 7 - Tryb dodawania modułu Z-Wave, 8 - Tryb usuwania modułu Z-Wave, 9 - Proces dodawania / usuwania modułu Z-Wave w trakcie, 10 - Błąd dodawania / usuwania modułu Z-Wave, 11 - Poprawne dodanie / usunięcie modułu Z-Wave */
    readonly state: StateType
    /** Stan zasilania */
    readonly isLocalPower: boolean
    /** Zwraca aktualną datę */
    readonly date: string
    /** Zwraca aktualny czas (hh:mm:ss) */
    readonly time: string
    /** Zwraca numer bieżącego dnia miesiąca */
    readonly day: number
    /** Zwraca numer bieżącego miesiąca */
    readonly month: number
    /** Zwraca numer bieżącego roku */
    readonly year: number
    /** Zwraca numer bieżącego dnia tygodnia (0=niedziela) */
    readonly dayOfWeek: DayOfWeek
    /** Zwraca aktualną godzinę (bez minut i sekund) */
    readonly hour: number
    /** Zwraca aktualną liczbę minut od ostatniej pełnej godziny */
    readonly minute: number
    /** Zwraca aktualny znacznik czasu */
    readonly localTime: number
    /** Wersja oprogramowania CLU */
    readonly firmwareVersion: string
    /** Określa czy CLU łączy się do chmury */
    useCloud: boolean
    /** Określa status połączenia CLU z chmurą */
    readonly cloudConnection: boolean
    /** Częstotliwość napięcia w sieci */
    voltageFrequency: VoltageFrequencyType
    /** Domyślna wartość napięcia definiowanego w urządzeniach */
    defaultVoltageValue: number
    /** Adres serwera czasu UTC */
    ntpServer: string
    /** Strefa czasowa */
    timeZone: TimeZoneType
}

class CluZWave2 implements ICluZWave2 {
    private onInitCallbacks: Array<() => void> = [];

    constructor(private raw: CluZWave2Raw) {
        this.raw.add_event(EventType.OnInit, () => {
            this.onInitCallbacks.forEach(callback => { callback(); });
        });
    }

    /**
     * Zdarzenie wywoływane jednorazowo w momencie inicjalizacji urządzenia
     * @param callback
     */
    addOnInit(callback: () => void): void {
        this.onInitCallbacks.push(callback);
    }
    /**
     * Dodaje do loga wewnętrznego nowy wpis
     * @param {string} log
     */
    addToLog(log: string): void {
        this.raw.execute(MethodType.AddToLog, log);
    }
    /** Kasuje zawartość wewnętrznego logu urządzenia */
    clearLog(): void {
        this.raw.execute(MethodType.ClearLog);
    }
    /**
     * Ustawia datę i czas
     * @param {number} localTimestamp
     */
    setDateTime(localTimestamp: number): void {
        this.raw.execute(MethodType.SetDateTime, localTimestamp);
    }
    /**
     * Uruchamia wykrywanie urządzeń bezprzewodowych
     * @param {number} time
     */
    startZWaveDiscovery(time: number): void {
        this.raw.execute(MethodType.StartZWaveDiscovery, time);
    }
    /** Wstrzymuje wykrywanie urządzeń bezprzewodowych */
    stopZWaveDiscovery(): void {
        this.raw.execute(MethodType.StopZWaveDiscovery);
    }
    /**
     * Czas pracy urządzenia od ostatniego resetu (w sekundach)
     * @returns {number}
     */
    get uptime(): number {
        return this.raw.get(PropertyType.Uptime);
    }
    /**
     * Wewnętrzny log urządzenia
     * @returns {string}
     */
    get log(): string {
        return this.raw.get(PropertyType.Log);
    }
    /**
     * Stan urządzenia: 0 - Start systemu, 1 - System OK, 2 - Tryb logowania telnet, 3 - Tryb emergency, 4 - Błąd krytyczny, 5 - Tryb monitorowania, 6 - Moduł TF-Bus nie odpowiada, 7 - Tryb dodawania modułu Z-Wave, 8 - Tryb usuwania modułu Z-Wave, 9 - Proces dodawania / usuwania modułu Z-Wave w trakcie, 10 - Błąd dodawania / usuwania modułu Z-Wave, 11 - Poprawne dodanie / usunięcie modułu Z-Wave
     * @returns {StateType}
     */
    get state(): StateType {
        return this.raw.get(PropertyType.State);
    }
    /**
     * Stan zasilania
     * @returns {boolean}
     */
    get isLocalPower(): boolean {
        return this.raw.get(PropertyType.IsLocalPower) === 1;
    }
    /**
     * Zwraca aktualną datę
     * @returns {string}
     */
    get date(): string {
        return this.raw.get(PropertyType.Date);
    }
    /**
     * Zwraca aktualny czas (hh:mm:ss)
     * @returns {string}
     */
    get time(): string {
        return this.raw.get(PropertyType.Time);
    }
    /**
     * Zwraca numer bieżącego dnia miesiąca
     * @returns {number}
     */
    get day(): number {
        return this.raw.get(PropertyType.Day);
    }
    /**
     * Zwraca numer bieżącego miesiąca
     * @returns {number}
     */
    get month(): number {
        return this.raw.get(PropertyType.Month);
    }
    /**
     * Zwraca numer bieżącego roku
     * @returns {number}
     */
    get year(): number {
        return this.raw.get(PropertyType.Year);
    }
    /**
     * Zwraca numer bieżącego dnia tygodnia (0=niedziela)
     * @returns {DayOfWeek}
     */
    get dayOfWeek(): DayOfWeek {
        return this.raw.get(PropertyType.DayOfWeek);
    }
    /**
     * Zwraca aktualną godzinę (bez minut i sekund)
     * @returns {number}
     */
    get hour(): number {
        return this.raw.get(PropertyType.Hour);
    }
    /**
     * Zwraca aktualną liczbę minut od ostatniej pełnej godziny
     * @returns {number}
     */
    get minute(): number {
        return this.raw.get(PropertyType.Minute);
    }
    /**
     * Zwraca aktualny znacznik czasu
     * @returns {number}
     */
    get localTime(): number {
        return this.raw.get(PropertyType.LocalTime);
    }
    /**
     * Wersja oprogramowania CLU
     * @returns {string}
     */
    get firmwareVersion(): string {
        return this.raw.get(PropertyType.FirmwareVersion);
    }
    /**
     * Określa czy CLU łączy się do chmury
     * @returns {boolean}
     */
    get useCloud(): boolean {
        return this.raw.get(PropertyType.UseCloud) === 1;
    }
    set useCloud(value: boolean) {
        this.raw.set(PropertyType.UseCloud, value ? 1 : 0);
    }
    /**
     * Określa status połączenia CLU z chmurą
     * @returns {boolean}
     */
    get cloudConnection(): boolean {
        return this.raw.get(PropertyType.CloudConnection) === 1;
    }
    /**
     * Częstotliwość napięcia w sieci
     * @returns {VoltageFrequencyType}
     */
    get voltageFrequency(): VoltageFrequencyType {
        return this.raw.get(PropertyType.VoltageFrequency);
    }
    set voltageFrequency(value: VoltageFrequencyType) {
        this.raw.set(PropertyType.VoltageFrequency, value);
    }
    /**
     * Domyślna wartość napięcia definiowanego w urządzeniach
     * @returns {number}
     */
    get defaultVoltageValue(): number {
        return this.raw.get(PropertyType.DefaultVoltageValue);
    }
    set defaultVoltageValue(value: number) {
        this.raw.set(PropertyType.DefaultVoltageValue, value);
    }
    /**
     * Adres serwera czasu UTC
     * @returns {string}
     */
    get ntpServer(): string {
        return this.raw.get(PropertyType.NTPServer);
    }
    set ntpServer(value: string) {
        this.raw.set(PropertyType.NTPServer, value);
    }
    /**
     * Strefa czasowa
     * @returns {TimeZoneType}
     */
    get timeZone(): TimeZoneType {
        return this.raw.get(PropertyType.TimeZone);
    }
    set timeZone(value: TimeZoneType) {
        this.raw.set(PropertyType.TimeZone, value);
    }
}

class CluZWave2Remote implements ICluZWave2 {
    constructor(private objectName: string, private gate: RemoteGate) {
    }

    /**
     * Zdarzenie wywoływane jednorazowo w momencie inicjalizacji urządzenia
     * @param callback
     */
    addOnInit(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Dodaje do loga wewnętrznego nowy wpis
     * @param {string} log
     */
    addToLog(log: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.AddToLog)
            .addParameter(log)
            .build();
        this.gate.runScript(cmd!);
    }
    /** Kasuje zawartość wewnętrznego logu urządzenia */
    clearLog(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.ClearLog)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Ustawia datę i czas
     * @param {number} localTimestamp
     */
    setDateTime(localTimestamp: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.SetDateTime)
            .addParameter(localTimestamp)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Uruchamia wykrywanie urządzeń bezprzewodowych
     * @param {number} time
     */
    startZWaveDiscovery(time: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.StartZWaveDiscovery)
            .addParameter(time)
            .build();
        this.gate.runScript(cmd!);
    }
    /** Wstrzymuje wykrywanie urządzeń bezprzewodowych */
    stopZWaveDiscovery(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.StopZWaveDiscovery)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Czas pracy urządzenia od ostatniego resetu (w sekundach)
     * @returns {number}
     */
    get uptime(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Uptime)
            .build();
        return this.gate.runScript(cmd!);
    }
    /**
     * Wewnętrzny log urządzenia
     * @returns {string}
     */
    get log(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Log)
            .build();
        return this.gate.runScript(cmd!);
    }
    /**
     * Stan urządzenia: 0 - Start systemu, 1 - System OK, 2 - Tryb logowania telnet, 3 - Tryb emergency, 4 - Błąd krytyczny, 5 - Tryb monitorowania, 6 - Moduł TF-Bus nie odpowiada, 7 - Tryb dodawania modułu Z-Wave, 8 - Tryb usuwania modułu Z-Wave, 9 - Proces dodawania / usuwania modułu Z-Wave w trakcie, 10 - Błąd dodawania / usuwania modułu Z-Wave, 11 - Poprawne dodanie / usunięcie modułu Z-Wave
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
     * Stan zasilania
     * @returns {boolean}
     */
    get isLocalPower(): boolean {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.IsLocalPower)
            .build();
        return this.gate.runScript(cmd!) === 1;
    }
    /**
     * Zwraca aktualną datę
     * @returns {string}
     */
    get date(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Date)
            .build();
        return this.gate.runScript(cmd!);
    }
    /**
     * Zwraca aktualny czas (hh:mm:ss)
     * @returns {string}
     */
    get time(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Time)
            .build();
        return this.gate.runScript(cmd!);
    }
    /**
     * Zwraca numer bieżącego dnia miesiąca
     * @returns {number}
     */
    get day(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Day)
            .build();
        return this.gate.runScript(cmd!);
    }
    /**
     * Zwraca numer bieżącego miesiąca
     * @returns {number}
     */
    get month(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Month)
            .build();
        return this.gate.runScript(cmd!);
    }
    /**
     * Zwraca numer bieżącego roku
     * @returns {number}
     */
    get year(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Year)
            .build();
        return this.gate.runScript(cmd!);
    }
    /**
     * Zwraca numer bieżącego dnia tygodnia (0=niedziela)
     * @returns {DayOfWeek}
     */
    get dayOfWeek(): DayOfWeek {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.DayOfWeek)
            .build();
        return this.gate.runScript(cmd!);
    }
    /**
     * Zwraca aktualną godzinę (bez minut i sekund)
     * @returns {number}
     */
    get hour(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Hour)
            .build();
        return this.gate.runScript(cmd!);
    }
    /**
     * Zwraca aktualną liczbę minut od ostatniej pełnej godziny
     * @returns {number}
     */
    get minute(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Minute)
            .build();
        return this.gate.runScript(cmd!);
    }
    /**
     * Zwraca aktualny znacznik czasu
     * @returns {number}
     */
    get localTime(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.LocalTime)
            .build();
        return this.gate.runScript(cmd!);
    }
    /**
     * Wersja oprogramowania CLU
     * @returns {string}
     */
    get firmwareVersion(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.FirmwareVersion)
            .build();
        return this.gate.runScript(cmd!);
    }
    /**
     * Określa czy CLU łączy się do chmury
     * @returns {boolean}
     */
    get useCloud(): boolean {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.UseCloud)
            .build();
        return this.gate.runScript(cmd!) === 1;
    }
    set useCloud(value: boolean) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.UseCloud)
            .addParameter(value ? 1 : 0)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Określa status połączenia CLU z chmurą
     * @returns {boolean}
     */
    get cloudConnection(): boolean {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.CloudConnection)
            .build();
        return this.gate.runScript(cmd!) === 1;
    }
    /**
     * Częstotliwość napięcia w sieci
     * @returns {VoltageFrequencyType}
     */
    get voltageFrequency(): VoltageFrequencyType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.VoltageFrequency)
            .build();
        return this.gate.runScript(cmd!);
    }
    set voltageFrequency(value: VoltageFrequencyType) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.VoltageFrequency)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Domyślna wartość napięcia definiowanego w urządzeniach
     * @returns {number}
     */
    get defaultVoltageValue(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.DefaultVoltageValue)
            .build();
        return this.gate.runScript(cmd!);
    }
    set defaultVoltageValue(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.DefaultVoltageValue)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Adres serwera czasu UTC
     * @returns {string}
     */
    get ntpServer(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.NTPServer)
            .build();
        return this.gate.runScript(cmd!);
    }
    set ntpServer(value: string) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.NTPServer)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Strefa czasowa
     * @returns {TimeZoneType}
     */
    get timeZone(): TimeZoneType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.TimeZone)
            .build();
        return this.gate.runScript(cmd!);
    }
    set timeZone(value: TimeZoneType) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.TimeZone)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
}

export { CluZWave2, CluZWave2Raw, CluZWave2Remote, StateType, VoltageFrequencyType, TimeZoneType, DayOfWeek }
