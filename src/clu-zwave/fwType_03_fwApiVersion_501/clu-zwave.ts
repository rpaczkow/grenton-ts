// Created from: src/interfaces/clu_ZWAVE_ft00000003_fv1f5_ht00000000_hv00000000.xml, object name="CLU_ZWAVE"

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
    UnixTime = 13,
    FirmwareVersion = 17,
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
    CriticalError = 2,
    ModuleNotResponding = 3,
    EmergencyMode = 4,
    MonitorMode = 5,
    AddingZWaveNode = 6,
    RemovingZWaveNode = 7,
    ZWaveAddRemoveOk = 8,
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

declare class CluZWaveRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface ICluZWave {
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
     * @param {number} unixTimestamp
     */
    setDateTime: (unixTimestamp: number) => void
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
    /** Stan urządzenia */
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
    /** Zwraca aktualny uniksowy znacznik czasu */
    readonly unixTime: number
    /** Wersja oprogramowania CLU */
    readonly firmwareVersion: string
}

class CluZWave implements ICluZWave {
    private onInitCallbacks: Array<() => void> = [];

    constructor(private raw: CluZWaveRaw) {
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
     * @param {number} unixTimestamp
     */
    setDateTime(unixTimestamp: number): void {
        this.raw.execute(MethodType.SetDateTime, unixTimestamp);
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
     * Stan urządzenia
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
     * Zwraca aktualny uniksowy znacznik czasu
     * @returns {number}
     */
    get unixTime(): number {
        return this.raw.get(PropertyType.UnixTime);
    }
    /**
     * Wersja oprogramowania CLU
     * @returns {string}
     */
    get firmwareVersion(): string {
        return this.raw.get(PropertyType.FirmwareVersion);
    }
}

class CluZWaveRemote implements ICluZWave {
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
     * @param {number} unixTimestamp
     */
    setDateTime(unixTimestamp: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.SetDateTime)
            .addParameter(unixTimestamp)
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
     * Stan urządzenia
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
     * Zwraca aktualny uniksowy znacznik czasu
     * @returns {number}
     */
    get unixTime(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.UnixTime)
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
}

export { CluZWave, CluZWaveRaw, CluZWaveRemote, StateType, DayOfWeek }
