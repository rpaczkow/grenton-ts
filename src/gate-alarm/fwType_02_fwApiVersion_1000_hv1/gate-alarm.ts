// Created from: src/interfaces/clu_GATE_ALARM_ft00000002_fv000003e8_ht00000012_hv00000001.xml, object name="CLU_GATE_ALARM"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnInit = 0,
}

enum PropertyType {
    Uptime = 0,
    ClientReportInterval = 1,
    UnixTime = 13,
    FirmwareVersion = 17,
}

enum MethodType {
    SetDateTime = 2,
    StartConsole = 7,
    StartConsoleOnReboot = 8,
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
    /** Zwraca aktualny uniksowy znacznik czasu */
    readonly unixTime: number
    /** Wersja oprogramowania Gate */
    readonly firmwareVersion: string
    /**
     * Ustawia datę i czas
     * @param {number} unixTimestamp
     */
    setDateTime: (unixTimestamp: number) => void
    /** Uruchamia konsolę Lua */
    startConsole: () => void
    /** Uruchamia konsolę Lua przy ponownym uruchomieniu */
    startConsoleOnReboot: () => void
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
}

export { CluGateAlarm, CluGateAlarmRaw, CluGateAlarmRemote }
