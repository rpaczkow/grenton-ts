// Created from: src/interfaces/clu_GATE_ALARM_ft00000002_fv00000578_ht00000012_hv00000002.xml, object name="CLU_GATE_ALARM"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnInit = 1,
}

enum PropertyType {
    Uptime = 0,
    ClientReportInterval = 1,
    PrimaryDNS = 2,
    SecondaryDNS = 3,
    Date = 5,
    Time = 6,
    LocalTime = 13,
    TimeZone = 14,
    UnixTime = 15,
    FirmwareVersion = 17,
    UseCloud = 18,
    CloudConnection = 19,
    NTPTimeout = 20,
    UseNTP = 21,
    TelnetLogLevel = 23,
    OverloadDetection = 25,
    ResetReason = 26,
}

enum MethodType {
    SetDateTime = 2,
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
    UTC = 22,
}

enum TelnetLogLevelType {
    Off = 0,
    Error = 1,
    Warning = 2,
    Info = 3,
    Debug = 4,
}

declare class CluGateAlarmRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface ICluGateAlarm {
    /**
     * Zdarzenie wywoływane jednorazowo w momencie inicjalizacji urządzenia
     * @param callback
     */
    addOnInit: (callback: () => void) => void
    /** Czas pracy urządzenia od ostatniego resetu (w sekundach) */
    readonly uptime: number
    /** Okres raportowania o zmianach cech */
    clientReportInterval: number
    /**
     * Ustawia okres raportowania o zmianach cech
     * @param {number} clientReportInterval
     */
    setClientReportInterval: (clientReportInterval: number) => void
    /** Preferowany serwer DNS */
    primaryDNS: string
    /**
     * Ustawia cechę PrimaryDNS
     * @param {string} ip
     */
    setPrimaryDNS: (ip: string) => void
    /** Alternatywny serwer DNS */
    secondaryDNS: string
    /**
     * Ustawia cechę SecondaryDNS
     * @param {string} ip
     */
    setSecondaryDNS: (ip: string) => void
    /** Zwraca aktualną datę */
    readonly date: string
    /** Zwraca aktualny czas (hh:mm:ss) */
    readonly time: string
    /** Zwraca aktualny znacznik czasu */
    readonly localTime: number
    /** Strefa czasowa */
    timeZone: TimeZoneType
    /** Zwraca aktualny uniksowy znacznik czasu */
    readonly unixTime: number
    /** Wersja oprogramowania Gate */
    readonly firmwareVersion: string
    /** Określa czy Gate łączy się do chmury */
    useCloud: boolean
    /** Określa status połączenia Gate z chmurą */
    readonly cloudConnection: boolean
    /** Timeout NTP */
    ntpTimeout: number
    /** Określa czy Gate używa NTP */
    useNTP: boolean
    /** Określa poziom logowania */
    telnetLogLevel: TelnetLogLevelType
    /**
     * Określa poziom logowania
     * @param {TelnetLogLevelType} telnetLogLevel
     */
    setTelnetLogLevel: (telnetLogLevel: TelnetLogLevelType) => void
    /** Określa, czy Gate powinien zgłaszać przeciążenie procesora używając czerwonej diody */
    overloadDetection: boolean
    /** Określa przyczynę restartu urządzenia */
    readonly resetReason: number
    /**
     * Ustawia datę i czas
     * @param {number} localTimestamp
     */
    setDateTime: (localTimestamp: number) => void
}

class CluGateAlarm implements ICluGateAlarm {
    private onInitCallbacks: Array<() => void> = [];

    constructor(private raw: CluGateAlarmRaw) {
        this.raw.add_event(EventType.OnInit, () => {
            this.onInitCallbacks.forEach(callback => {
                callback();
            });
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
     * Czas pracy urządzenia od ostatniego resetu (w sekundach)
     * @returns {number}
     */
    get uptime(): number {
        return this.raw.get(PropertyType.Uptime);
    }
    /**
     * Okres raportowania o zmianach cech
     * @returns {number}
     */
    get clientReportInterval(): number {
        return this.raw.get(PropertyType.ClientReportInterval);
    }
    set clientReportInterval(value: number) {
        this.raw.set(PropertyType.ClientReportInterval, value);
    }
    /**
     * Ustawia okres raportowania o zmianach cech
     * @param {number} clientReportInterval
     */
    setClientReportInterval(clientReportInterval: number): void {
        this.raw.set(PropertyType.ClientReportInterval, clientReportInterval);
    }
    /**
     * Preferowany serwer DNS
     * @returns {string}
     */
    get primaryDNS(): string {
        return this.raw.get(PropertyType.PrimaryDNS);
    }
    set primaryDNS(value: string) {
        this.raw.set(PropertyType.PrimaryDNS, value);
    }
    /**
     * Ustawia cechę PrimaryDNS
     * @param {string} ip
     */
    setPrimaryDNS(ip: string): void {
        this.raw.set(PropertyType.PrimaryDNS, ip);
    }
    /**
     * Alternatywny serwer DNS
     * @returns {string}
     */
    get secondaryDNS(): string {
        return this.raw.get(PropertyType.SecondaryDNS);
    }
    set secondaryDNS(value: string) {
        this.raw.set(PropertyType.SecondaryDNS, value);
    }
    /**
     * Ustawia cechę SecondaryDNS
     * @param {string} ip
     */
    setSecondaryDNS(ip: string): void {
        this.raw.set(PropertyType.SecondaryDNS, ip);
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
     * Zwraca aktualny znacznik czasu
     * @returns {number}
     */
    get localTime(): number {
        return this.raw.get(PropertyType.LocalTime);
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
    /**
     * Zwraca aktualny uniksowy znacznik czasu
     * @returns {number}
     */
    get unixTime(): number {
        return this.raw.get(PropertyType.UnixTime);
    }
    /**
     * Wersja oprogramowania Gate
     * @returns {string}
     */
    get firmwareVersion(): string {
        return this.raw.get(PropertyType.FirmwareVersion);
    }
    /**
     * Określa czy Gate łączy się do chmury
     * @returns {boolean}
     */
    get useCloud(): boolean {
        return this.raw.get(PropertyType.UseCloud) === 1;
    }
    set useCloud(value: boolean) {
        this.raw.set(PropertyType.UseCloud, value ? 1 : 0);
    }
    /**
     * Określa status połączenia Gate z chmurą
     * @returns {boolean}
     */
    get cloudConnection(): boolean {
        return this.raw.get(PropertyType.CloudConnection) === 1;
    }
    /**
     * Timeout NTP
     * @returns {number}
     */
    get ntpTimeout(): number {
        return this.raw.get(PropertyType.NTPTimeout);
    }
    set ntpTimeout(value: number) {
        this.raw.set(PropertyType.NTPTimeout, value);
    }
    /**
     * Określa czy Gate używa NTP
     * @returns {boolean}
     */
    get useNTP(): boolean {
        return this.raw.get(PropertyType.UseNTP) === 1;
    }
    set useNTP(value: boolean) {
        this.raw.set(PropertyType.UseNTP, value ? 1 : 0);
    }
    /**
     * Określa poziom logowania
     * @returns {TelnetLogLevelType}
     */
    get telnetLogLevel(): TelnetLogLevelType {
        return this.raw.get(PropertyType.TelnetLogLevel);
    }
    set telnetLogLevel(value: TelnetLogLevelType) {
        this.raw.set(PropertyType.TelnetLogLevel, value);
    }
    /**
     * Określa poziom logowania
     * @param {TelnetLogLevelType} telnetLogLevel
     */
    setTelnetLogLevel(telnetLogLevel: TelnetLogLevelType): void {
        this.raw.set(PropertyType.TelnetLogLevel, telnetLogLevel);
    }
    /**
     * Określa, czy Gate powinien zgłaszać przeciążenie procesora używając czerwonej diody
     * @returns {boolean}
     */
    get overloadDetection(): boolean {
        return this.raw.get(PropertyType.OverloadDetection) === 1;
    }
    set overloadDetection(value: boolean) {
        this.raw.set(PropertyType.OverloadDetection, value ? 1 : 0);
    }
    /**
     * Określa przyczynę restartu urządzenia
     * @returns {number}
     */
    get resetReason(): number {
        return this.raw.get(PropertyType.ResetReason);
    }
    /**
     * Ustawia datę i czas
     * @param {number} localTimestamp
     */
    setDateTime(localTimestamp: number): void {
        this.raw.execute(MethodType.SetDateTime, localTimestamp);
    }
}

class CluGateAlarmRemote implements ICluGateAlarm {
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
     * Okres raportowania o zmianach cech
     * @returns {number}
     */
    get clientReportInterval(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.ClientReportInterval)
            .build();
        return this.gate.runScript(cmd!);
    }

    set clientReportInterval(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.ClientReportInterval)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Ustawia okres raportowania o zmianach cech
     * @param {number} clientReportInterval
     */
    setClientReportInterval(clientReportInterval: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.ClientReportInterval)
            .addParameter(clientReportInterval)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Preferowany serwer DNS
     * @returns {string}
     */
    get primaryDNS(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.PrimaryDNS)
            .build();
        return this.gate.runScript(cmd!);
    }

    set primaryDNS(value: string) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.PrimaryDNS)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Ustawia cechę PrimaryDNS
     * @param {string} ip
     */
    setPrimaryDNS(ip: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.PrimaryDNS)
            .addParameter(ip)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Alternatywny serwer DNS
     * @returns {string}
     */
    get secondaryDNS(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.SecondaryDNS)
            .build();
        return this.gate.runScript(cmd!);
    }

    set secondaryDNS(value: string) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.SecondaryDNS)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Ustawia cechę SecondaryDNS
     * @param {string} ip
     */
    setSecondaryDNS(ip: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.SecondaryDNS)
            .addParameter(ip)
            .build();
        this.gate.runScript(cmd!);
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
     * Wersja oprogramowania Gate
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
     * Określa czy Gate łączy się do chmury
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
     * Określa status połączenia Gate z chmurą
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
     * Timeout NTP
     * @returns {number}
     */
    get ntpTimeout(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.NTPTimeout)
            .build();
        return this.gate.runScript(cmd!);
    }

    set ntpTimeout(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.NTPTimeout)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Określa czy Gate używa NTP
     * @returns {boolean}
     */
    get useNTP(): boolean {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.UseNTP)
            .build();
        return this.gate.runScript(cmd!) === 1;
    }

    set useNTP(value: boolean) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.UseNTP)
            .addParameter(value ? 1 : 0)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Określa poziom logowania
     * @returns {TelnetLogLevelType}
     */
    get telnetLogLevel(): TelnetLogLevelType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.TelnetLogLevel)
            .build();
        return this.gate.runScript(cmd!);
    }

    set telnetLogLevel(value: TelnetLogLevelType) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.TelnetLogLevel)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Określa poziom logowania
     * @param {TelnetLogLevelType} telnetLogLevel
     */
    setTelnetLogLevel(telnetLogLevel: TelnetLogLevelType): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.TelnetLogLevel)
            .addParameter(telnetLogLevel)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Określa, czy Gate powinien zgłaszać przeciążenie procesora używając czerwonej diody
     * @returns {boolean}
     */
    get overloadDetection(): boolean {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.OverloadDetection)
            .build();
        return this.gate.runScript(cmd!) === 1;
    }

    set overloadDetection(value: boolean) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.OverloadDetection)
            .addParameter(value ? 1 : 0)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Określa przyczynę restartu urządzenia
     * @returns {number}
     */
    get resetReason(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.ResetReason)
            .build();
        return this.gate.runScript(cmd!);
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
}

export { CluGateAlarm, CluGateAlarmRaw, CluGateAlarmRemote, TimeZoneType, TelnetLogLevelType }
