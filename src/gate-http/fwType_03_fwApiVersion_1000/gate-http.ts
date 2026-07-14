// Created from: src/interfaces/clu_GATE_HTTP_ft00000003_fv000003e8_ht00000012_hv00000002.xml, object name="CLU_GATE_HTTP"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnInit = 0,
}

enum PropertyType {
    Uptime = 0,
    UnixTime = 13,
    FirmwareVersion = 17,
    ClientReportInterval = 1,
    PrimaryDNS = 2,
    SecondaryDNS = 3,
    UseCloud = 18,
    CloudConnection = 19,
}

enum MethodType {
    SetDateTime = 2,
    StartConsole = 7,
    StartConsoleOnReboot = 8,
}

declare class CluGateHttpRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface ICluGateHttp {
    /**
     * Zdarzenie wywoływane jednorazowo w momencie inicjalizacji urządzenia
     * @param callback
     */
    addOnInit: (callback: () => void) => void
    /**
     * Ustawia datę i czas
     * @param {number} unixTimestamp
     */
    setDateTime: (unixTimestamp: number) => void
    /** Uruchamia konsolę Lua */
    startConsole: () => void
    /** Uruchamia konsolę Lua przy ponownym uruchomieniu */
    startConsoleOnReboot: () => void
    /**
     * Ustawia okres raportowania o zmianach cech
     * @param {number} clientReportInterval
     */
    setClientReportInterval: (clientReportInterval: number) => void
    /**
     * Ustawia cechę PrimaryDNS
     * @param {string} ip
     */
    setPrimaryDNS: (ip: string) => void
    /**
     * Ustawia cechę SecondaryDNS
     * @param {string} ip
     */
    setSecondaryDNS: (ip: string) => void
    /** Czas pracy urządzenia od ostatniego resetu (w sekundach) */
    readonly uptime: number
    /** Zwraca aktualny uniksowy znacznik czasu */
    readonly unixTime: number
    /** Wersja oprogramowania Gate */
    readonly firmwareVersion: string
    /** Okres raportowania o zmianach cech */
    clientReportInterval: number
    /** Preferowany serwer DNS */
    primaryDNS: string
    /** Alternatywny serwer DNS */
    secondaryDNS: string
    /** Określa czy GATE łączy się do chmury */
    useCloud: boolean
    /** Określa status połączenia GATE z chmurą */
    readonly cloudConnection: boolean
}

class CluGateHttp implements ICluGateHttp {
    private onInitCallbacks: Array<() => void> = [];

    constructor(private raw: CluGateHttpRaw) {
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
     * Ustawia datę i czas
     * @param {number} unixTimestamp
     */
    setDateTime(unixTimestamp: number): void {
        this.raw.execute(MethodType.SetDateTime, unixTimestamp);
    }
    /** Uruchamia konsolę Lua */
    startConsole(): void {
        this.raw.execute(MethodType.StartConsole);
    }
    /** Uruchamia konsolę Lua przy ponownym uruchomieniu */
    startConsoleOnReboot(): void {
        this.raw.execute(MethodType.StartConsoleOnReboot);
    }
    /**
     * Ustawia okres raportowania o zmianach cech
     * @param {number} clientReportInterval
     */
    setClientReportInterval(clientReportInterval: number): void {
        this.raw.set(PropertyType.ClientReportInterval, clientReportInterval);
    }
    /**
     * Ustawia cechę PrimaryDNS
     * @param {string} ip
     */
    setPrimaryDNS(ip: string): void {
        this.raw.set(PropertyType.PrimaryDNS, ip);
    }
    /**
     * Ustawia cechę SecondaryDNS
     * @param {string} ip
     */
    setSecondaryDNS(ip: string): void {
        this.raw.set(PropertyType.SecondaryDNS, ip);
    }
    /**
     * Czas pracy urządzenia od ostatniego resetu (w sekundach)
     * @returns {number}
     */
    get uptime(): number {
        return this.raw.get(PropertyType.Uptime);
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
     * Określa czy GATE łączy się do chmury
     * @returns {boolean}
     */
    get useCloud(): boolean {
        return this.raw.get(PropertyType.UseCloud) === 1;
    }
    set useCloud(value: boolean) {
        this.raw.set(PropertyType.UseCloud, value ? 1 : 0);
    }
    /**
     * Określa status połączenia GATE z chmurą
     * @returns {boolean}
     */
    get cloudConnection(): boolean {
        return this.raw.get(PropertyType.CloudConnection) === 1;
    }
}

class CluGateHttpRemote implements ICluGateHttp {
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
    /** Uruchamia konsolę Lua */
    startConsole(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.StartConsole)
            .build();
        this.gate.runScript(cmd!);
    }
    /** Uruchamia konsolę Lua przy ponownym uruchomieniu */
    startConsoleOnReboot(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.StartConsoleOnReboot)
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
     * Określa czy GATE łączy się do chmury
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
     * Określa status połączenia GATE z chmurą
     * @returns {boolean}
     */
    get cloudConnection(): boolean {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.CloudConnection)
            .build();
        return this.gate.runScript(cmd!) === 1;
    }
}

export {
    CluGateHttp, CluGateHttpRaw, CluGateHttpRemote
}
