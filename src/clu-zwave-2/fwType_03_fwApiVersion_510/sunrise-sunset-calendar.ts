// Created from: src/interfaces/object_sunrise_sunset_calendar_v3.xml, object name="SunriseSunsetCalendar" version="3"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnStart = 0,
    OnStop = 1,
    OnSunrise = 2,
    OnSunset = 3,
    OnSunriseSunsetChange = 4,
    OnDay = 5,
    OnNight = 6
}

enum PropertyType {
    Longitude = 0,
    Latitude = 1,
    State = 2,
    SunriseUTC = 3,
    SunsetUTC = 4,
    SunriseLocal = 5,
    SunsetLocal = 6,
    SunriseUTCTimestamp = 7,
    SunsetUTCTimestamp = 8,
    SunriseLocalTimestamp = 9,
    SunsetLocalTimestamp = 10,
    IsDayNow = 11,
    SunriseOffset = 12,
    SunsetOffset = 13,
    NextSunrise = 14,
    NextSunset = 15
}

enum MethodType {
    Start = 0,
    Stop = 1
}

enum StateType {
    Off = 0,
    On = 1
}

declare class SunriseSunsetCalendarRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface ISunriseSunsetCalendar {
    /**
     * Zdarzenie wywoływane przy uruchomieniu kalendarza
     * @param callback
     */
    addOnStart: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane przy dezaktywacji kalendarza
     * @param callback
     */
    addOnStop: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane podczas wschodu słońca z uwzględnieniem offsetu
     * @param callback
     */
    addOnSunrise: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane podczas zachodu słońca z uwzględnieniem offsetu
     * @param callback
     */
    addOnSunset: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane podczas wschodu lub zachodu słońca z uwzględnieniem offsetu
     * @param callback
     */
    addOnSunriseSunsetChange: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane podczas zmiany parametru IsDayNow z 0 (noc) na 1 (dzień)
     * @param callback
     */
    addOnDay: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane podczas zmiany parametru IsDayNow z 1 (dzień) na 0 (noc)
     * @param callback
     */
    addOnNight: (callback: () => void) => void
    /** Długość geograficzna w stopniach dziesiętnych (DD), zakres -180 do 180 */
    longitude: number
    /** Szerokość geograficzna w stopniach dziesiętnych (DD), zakres -90 do 90 */
    latitude: number
    /** Aktualny stan kalendarza wschodów i zachodów słońca, 1 - włączony, 0 - wyłączony */
    state: StateType
    /** Czas wschodu słońca dla ustawionej lokalizacji w UTC (± 5 minut) N\A - Brak możliwości wyliczenia wschodu słońca */
    readonly sunriseUTC: string
    /** Czas zachodu słońca dla ustawionej lokalizacji w UTC (± 5 minut) N\A - Brak możliwości wyliczenia zachodu słońca */
    readonly sunsetUTC: string
    /** Lokalny czas wschodu słońca dla ustawionej lokalizacji (± 5 minut) N\A - Brak możliwości wyliczenia wschodu słońca dla ustawionej lokalizacji */
    readonly sunriseLocal: string
    /** Lokalny czas zachodu słońca dla ustawionej lokalizacji (± 5 minut) N\A - Brak możliwości wyliczenia zachodu słońca dla ustawionej lokalizacji */
    readonly sunsetLocal: string
    /** Czas wschodu słońca dla ustawionej lokalizacji w UTC (timestamp ± 300 sekund) -1 - Brak możliwości wyliczenia wschodu słońca */
    readonly sunriseUTCTimestamp: number
    /** Czas zachodu słońca dla ustawionej lokalizacji w UTC (timestamp ± 300 sekund) -1 - Brak możliwości wyliczenia zachodu słońca */
    readonly sunsetUTCTimestamp: number
    /** Lokalny czas wschodu słońca dla ustawionej lokalizacji (timestamp ± 300 sekund) -1 - Brak możliwości wyliczenia wschodu słońca dla ustawionej lokalizacji */
    readonly sunriseLocalTimestamp: number
    /** Lokalny czas zachodu słońca dla ustawionej lokalizacji (timestamp ± 300 sekund) -1 - Brak możliwości wyliczenia zachodu słońca dla ustawionej lokalizacji */
    readonly sunsetLocalTimestamp: number
    /** 0 - noc, 1 - dzień Na podstawie lokalnego wschodu/zachodu słońca (± 5 minut) -1 - Brak możliwości wyliczenia dla ustawionej lokalizacji */
    readonly isDayNow: number
    /** Przesunięcie dla wschodu słońca (w minutach), zakres -1439 do 1439 */
    sunriseOffset: number
    /** Przesunięcie dla zachodu słońca (w minutach), zakres -1439 do 1439 */
    sunsetOffset: number
    /** Pozostały czas do wschodu słońca (w minutach) -1 - Brak możliwości wyliczenia dla ustawionej lokalizacji */
    readonly nextSunrise: number
    /** Pozostały czas do zachodu słońca (w minutach) -1 - Brak możliwości wyliczenia dla ustawionej lokalizacji */
    readonly nextSunset: number
    /** Uruchamia kalendarz wschodów i zachodów słońca */
    start(): void
    /** Zatrzymuje kalendarz wschodów i zachodów słońca */
    stop(): void
    /** Ustawia szerokość geograficzną w stopniach dziesiętnych (DD), zakres -90 do 90 */
    setLatitude: (value: number) => void
    /** Ustawia długość geograficzną w stopniach dziesiętnych (DD), zakres -180 do 180 */
    setLongitude: (value: number) => void
    /** Ustawia przesunięcie dla wschodu słońca (w minutach), zakres -1439 do 1439 */
    setSunriseOffset: (value: number) => void
    /** Ustawia przesunięcie dla zachodu słońca (w minutach), zakres -1439 do 1439 */
    setSunsetOffset: (value: number) => void
}

class SunriseSunsetCalendar implements ISunriseSunsetCalendar {
    private onStartCallbacks: Array<() => void> = [];
    private onStopCallbacks: Array<() => void> = [];
    private onSunriseCallbacks: Array<() => void> = [];
    private onSunsetCallbacks: Array<() => void> = [];
    private onSunriseSunsetChangeCallbacks: Array<() => void> = [];
    private onDayCallbacks: Array<() => void> = [];
    private onNightCallbacks: Array<() => void> = [];

    constructor(private raw: SunriseSunsetCalendarRaw) {
        this.raw.add_event(EventType.OnStart, () => {
            this.onStartCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnStop, () => {
            this.onStopCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnSunrise, () => {
            this.onSunriseCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnSunset, () => {
            this.onSunsetCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnSunriseSunsetChange, () => {
            this.onSunriseSunsetChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnDay, () => {
            this.onDayCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnNight, () => {
            this.onNightCallbacks.forEach(callback => { callback(); });
        });
    }

    /**
     * Zdarzenie wywoływane przy uruchomieniu kalendarza
     * @param callback
     */
    addOnStart(callback: () => void): void {
        this.onStartCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane przy dezaktywacji kalendarza
     * @param callback
     */
    addOnStop(callback: () => void): void {
        this.onStopCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane podczas wschodu słońca z uwzględnieniem offsetu
     * @param callback
     */
    addOnSunrise(callback: () => void): void {
        this.onSunriseCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane podczas zachodu słońca z uwzględnieniem offsetu
     * @param callback
     */
    addOnSunset(callback: () => void): void {
        this.onSunsetCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane podczas wschodu lub zachodu słońca z uwzględnieniem offsetu
     * @param callback
     */
    addOnSunriseSunsetChange(callback: () => void): void {
        this.onSunriseSunsetChangeCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane podczas zmiany parametru IsDayNow z 0 (noc) na 1 (dzień)
     * @param callback
     */
    addOnDay(callback: () => void): void {
        this.onDayCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane podczas zmiany parametru IsDayNow z 1 (dzień) na 0 (noc)
     * @param callback
     */
    addOnNight(callback: () => void): void {
        this.onNightCallbacks.push(callback);
    }
    /**
     * Długość geograficzna w stopniach dziesiętnych (DD), zakres -180 do 180
     * @returns {number}
     */
    get longitude(): number {
        return this.raw.get(PropertyType.Longitude);
    }
    set longitude(value: number) {
        this.raw.set(PropertyType.Longitude, value);
    }
    /**
     * Szerokość geograficzna w stopniach dziesiętnych (DD), zakres -90 do 90
     * @returns {number}
     */
    get latitude(): number {
        return this.raw.get(PropertyType.Latitude);
    }
    set latitude(value: number) {
        this.raw.set(PropertyType.Latitude, value);
    }
    /**
     * Aktualny stan kalendarza wschodów i zachodów słońca, 1 - włączony, 0 - wyłączony
     * @returns {StateType}
     */
    get state(): StateType {
        return this.raw.get(PropertyType.State);
    }
    set state(value: StateType) {
        this.raw.set(PropertyType.State, value);
    }
    /**
     * Czas wschodu słońca dla ustawionej lokalizacji w UTC (± 5 minut) N\A - Brak możliwości wyliczenia wschodu słońca
     * @returns {string}
     */
    get sunriseUTC(): string {
        return this.raw.get(PropertyType.SunriseUTC);
    }
    /**
     * Czas zachodu słońca dla ustawionej lokalizacji w UTC (± 5 minut) N\A - Brak możliwości wyliczenia zachodu słońca
     * @returns {string}
     */
    get sunsetUTC(): string {
        return this.raw.get(PropertyType.SunsetUTC);
    }
    /**
     * Lokalny czas wschodu słońca dla ustawionej lokalizacji (± 5 minut) N\A - Brak możliwości wyliczenia wschodu słońca dla ustawionej lokalizacji
     * @returns {string}
     */
    get sunriseLocal(): string {
        return this.raw.get(PropertyType.SunriseLocal);
    }
    /**
     * Lokalny czas zachodu słońca dla ustawionej lokalizacji (± 5 minut) N\A - Brak możliwości wyliczenia zachodu słońca dla ustawionej lokalizacji
     * @returns {string}
     */
    get sunsetLocal(): string {
        return this.raw.get(PropertyType.SunsetLocal);
    }
    /**
     * Czas wschodu słońca dla ustawionej lokalizacji w UTC (timestamp ± 300 sekund) -1 - Brak możliwości wyliczenia wschodu słońca
     * @returns {number}
     */
    get sunriseUTCTimestamp(): number {
        return this.raw.get(PropertyType.SunriseUTCTimestamp);
    }
    /**
     * Czas zachodu słońca dla ustawionej lokalizacji w UTC (timestamp ± 300 sekund) -1 - Brak możliwości wyliczenia zachodu słońca
     * @returns {number}
     */
    get sunsetUTCTimestamp(): number {
        return this.raw.get(PropertyType.SunsetUTCTimestamp);
    }
    /**
     * Lokalny czas wschodu słońca dla ustawionej lokalizacji (timestamp ± 300 sekund) -1 - Brak możliwości wyliczenia wschodu słońca dla ustawionej lokalizacji
     * @returns {number}
     */
    get sunriseLocalTimestamp(): number {
        return this.raw.get(PropertyType.SunriseLocalTimestamp);
    }
    /**
     * Lokalny czas zachodu słońca dla ustawionej lokalizacji (timestamp ± 300 sekund) -1 - Brak możliwości wyliczenia zachodu słońca dla ustawionej lokalizacji
     * @returns {number}
     */
    get sunsetLocalTimestamp(): number {
        return this.raw.get(PropertyType.SunsetLocalTimestamp);
    }
    /**
     * 0 - noc, 1 - dzień Na podstawie lokalnego wschodu/zachodu słońca (± 5 minut) -1 - Brak możliwości wyliczenia dla ustawionej lokalizacji
     * @returns {number}
     */
    get isDayNow(): number {
        return this.raw.get(PropertyType.IsDayNow);
    }
    /**
     * Przesunięcie dla wschodu słońca (w minutach), zakres -1439 do 1439
     * @returns {number}
     */
    get sunriseOffset(): number {
        return this.raw.get(PropertyType.SunriseOffset);
    }
    set sunriseOffset(value: number) {
        this.raw.set(PropertyType.SunriseOffset, value);
    }
    /**
     * Przesunięcie dla zachodu słońca (w minutach), zakres -1439 do 1439
     * @returns {number}
     */
    get sunsetOffset(): number {
        return this.raw.get(PropertyType.SunsetOffset);
    }
    set sunsetOffset(value: number) {
        this.raw.set(PropertyType.SunsetOffset, value);
    }
    /**
     * Pozostały czas do wschodu słońca (w minutach) -1 - Brak możliwości wyliczenia dla ustawionej lokalizacji
     * @returns {number}
     */
    get nextSunrise(): number {
        return this.raw.get(PropertyType.NextSunrise);
    }
    /**
     * Pozostały czas do zachodu słońca (w minutach) -1 - Brak możliwości wyliczenia dla ustawionej lokalizacji
     * @returns {number}
     */
    get nextSunset(): number {
        return this.raw.get(PropertyType.NextSunset);
    }
    /** Uruchamia kalendarz wschodów i zachodów słońca */
    start(): void {
        this.raw.execute(MethodType.Start);
    }
    /** Zatrzymuje kalendarz wschodów i zachodów słońca */
    stop(): void {
        this.raw.execute(MethodType.Stop);
    }
    /** Ustawia szerokość geograficzną w stopniach dziesiętnych (DD), zakres -90 do 90 */
    setLatitude(value: number): void {
        this.raw.set(PropertyType.Latitude, value);
    }
    /** Ustawia długość geograficzną w stopniach dziesiętnych (DD), zakres -180 do 180 */
    setLongitude(value: number): void {
        this.raw.set(PropertyType.Longitude, value);
    }
    /** Ustawia przesunięcie dla wschodu słońca (w minutach), zakres -1439 do 1439 */
    setSunriseOffset(value: number): void {
        this.raw.set(PropertyType.SunriseOffset, value);
    }
    /** Ustawia przesunięcie dla zachodu słońca (w minutach), zakres -1439 do 1439 */
    setSunsetOffset(value: number): void {
        this.raw.set(PropertyType.SunsetOffset, value);
    }
}

class SunriseSunsetCalendarRemote implements ISunriseSunsetCalendar {
    constructor(private objectName: string, private gate: RemoteGate) {

    }

    /**
     * Zdarzenie wywoływane przy uruchomieniu kalendarza
     * @param callback
     */
    addOnStart(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane przy dezaktywacji kalendarza
     * @param callback
     */
    addOnStop(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane podczas wschodu słońca z uwzględnieniem offsetu
     * @param callback
     */
    addOnSunrise(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane podczas zachodu słońca z uwzględnieniem offsetu
     * @param callback
     */
    addOnSunset(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane podczas wschodu lub zachodu słońca z uwzględnieniem offsetu
     * @param callback
     */
    addOnSunriseSunsetChange(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane podczas zmiany parametru IsDayNow z 0 (noc) na 1 (dzień)
     * @param callback
     */
    addOnDay(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane podczas zmiany parametru IsDayNow z 1 (dzień) na 0 (noc)
     * @param callback
     */
    addOnNight(_callback: () => void): void {
        // Remote events are not supported
    }

    /**
     * Długość geograficzna w stopniach dziesiętnych (DD), zakres -180 do 180
     * @returns {number}
     */
    get longitude(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Longitude)
            .build();
        return this.gate.runScript(cmd!);
    }

    set longitude(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Longitude)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Szerokość geograficzna w stopniach dziesiętnych (DD), zakres -90 do 90
     * @returns {number}
     */
    get latitude(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Latitude)
            .build();
        return this.gate.runScript(cmd!);
    }

    set latitude(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Latitude)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Aktualny stan kalendarza wschodów i zachodów słońca, 1 - włączony, 0 - wyłączony
     * @returns {StateType}
     */
    get state(): StateType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.State)
            .build();
        return this.gate.runScript(cmd!);
    }

    set state(value: StateType) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.State)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Czas wschodu słońca dla ustawionej lokalizacji w UTC (± 5 minut) N\A - Brak możliwości wyliczenia wschodu słońca
     * @returns {string}
     */
    get sunriseUTC(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.SunriseUTC)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Czas zachodu słońca dla ustawionej lokalizacji w UTC (± 5 minut) N\A - Brak możliwości wyliczenia zachodu słońca
     * @returns {string}
     */
    get sunsetUTC(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.SunsetUTC)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Lokalny czas wschodu słońca dla ustawionej lokalizacji (± 5 minut) N\A - Brak możliwości wyliczenia wschodu słońca dla ustawionej lokalizacji
     * @returns {string}
     */
    get sunriseLocal(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.SunriseLocal)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Lokalny czas zachodu słońca dla ustawionej lokalizacji (± 5 minut) N\A - Brak możliwości wyliczenia zachodu słońca dla ustawionej lokalizacji
     * @returns {string}
     */
    get sunsetLocal(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.SunsetLocal)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Czas wschodu słońca dla ustawionej lokalizacji w UTC (timestamp ± 300 sekund) -1 - Brak możliwości wyliczenia wschodu słońca
     * @returns {number}
     */
    get sunriseUTCTimestamp(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.SunriseUTCTimestamp)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Czas zachodu słońca dla ustawionej lokalizacji w UTC (timestamp ± 300 sekund) -1 - Brak możliwości wyliczenia zachodu słońca
     * @returns {number}
     */
    get sunsetUTCTimestamp(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.SunsetUTCTimestamp)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Lokalny czas wschodu słońca dla ustawionej lokalizacji (timestamp ± 300 sekund) -1 - Brak możliwości wyliczenia wschodu słońca dla ustawionej lokalizacji
     * @returns {number}
     */
    get sunriseLocalTimestamp(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.SunriseLocalTimestamp)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Lokalny czas zachodu słońca dla ustawionej lokalizacji (timestamp ± 300 sekund) -1 - Brak możliwości wyliczenia zachodu słońca dla ustawionej lokalizacji
     * @returns {number}
     */
    get sunsetLocalTimestamp(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.SunsetLocalTimestamp)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * 0 - noc, 1 - dzień Na podstawie lokalnego wschodu/zachodu słońca (± 5 minut) -1 - Brak możliwości wyliczenia dla ustawionej lokalizacji
     * @returns {number}
     */
    get isDayNow(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.IsDayNow)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Przesunięcie dla wschodu słońca (w minutach), zakres -1439 do 1439
     * @returns {number}
     */
    get sunriseOffset(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.SunriseOffset)
            .build();
        return this.gate.runScript(cmd!);
    }

    set sunriseOffset(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.SunriseOffset)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Przesunięcie dla zachodu słońca (w minutach), zakres -1439 do 1439
     * @returns {number}
     */
    get sunsetOffset(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.SunsetOffset)
            .build();
        return this.gate.runScript(cmd!);
    }

    set sunsetOffset(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.SunsetOffset)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Pozostały czas do wschodu słońca (w minutach) -1 - Brak możliwości wyliczenia dla ustawionej lokalizacji
     * @returns {number}
     */
    get nextSunrise(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.NextSunrise)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Pozostały czas do zachodu słońca (w minutach) -1 - Brak możliwości wyliczenia dla ustawionej lokalizacji
     * @returns {number}
     */
    get nextSunset(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.NextSunset)
            .build();
        return this.gate.runScript(cmd!);
    }

    /** Uruchamia kalendarz wschodów i zachodów słońca */
    start(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.Start)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Zatrzymuje kalendarz wschodów i zachodów słońca */
    stop(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.Stop)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Ustawia szerokość geograficzną w stopniach dziesiętnych (DD), zakres -90 do 90 */
    setLatitude(value: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Latitude)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Ustawia długość geograficzną w stopniach dziesiętnych (DD), zakres -180 do 180 */
    setLongitude(value: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Longitude)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Ustawia przesunięcie dla wschodu słońca (w minutach), zakres -1439 do 1439 */
    setSunriseOffset(value: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.SunriseOffset)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Ustawia przesunięcie dla zachodu słońca (w minutach), zakres -1439 do 1439 */
    setSunsetOffset(value: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.SunsetOffset)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
}

export {
    SunriseSunsetCalendar, SunriseSunsetCalendarRaw, SunriseSunsetCalendarRemote,
    StateType
}
