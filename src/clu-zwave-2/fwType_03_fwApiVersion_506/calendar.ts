// Created from: src/interfaces/object_calendar_v1.xml, object name="Calendar" version="1"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnCalendar = 0,
    OnStart = 1,
    OnStop = 2,
    OnCancel = 3
}

enum PropertyType {
    Rule = 0,
    SinceLastRun = 1,
    ToNextRun = 2,
    State = 3
}

enum MethodType {
    Start = 0,
    Stop = 1,
    CancelNext = 3
}

enum StateType {
    Off = 0,
    On = 1
}

declare class CalendarRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface ICalendar {
    /**
     * Zdarzenie wywoływane w momencie wywołania akcji kalendarza
     * @param callback
     */
    addOnCalendar: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane w momencie wznowienia pracy kalendarza
     * @param callback
     */
    addOnStart: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane w momencie zablokowania pracy kalendarza
     * @param callback
     */
    addOnStop: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane w momencie anulowania najbliższych akcji
     * @param callback
     */
    addOnCancel: (callback: () => void) => void
    /** Przełączenie w stan aktywny (State=1) */
    start: () => void
    /** Przełączenie w stan zatrzymania (State=0) */
    stop: () => void
    /** Anulowanie wywołania wskazanej liczby najbliższych akcji kalendarza */
    cancelNext: (count?: number) => void
    /** Reguła kalendarza w formacie CRON lub ERROR w przypadku wprowadzenia błędnej reguły */
    rule: string
    /**
     * Ustawienie Reguły kalendarza
     * @param {string} rule
     */
    setRule: (rule: string) => void
    /** Czas w minutach od ostatniego spełnienia warunku reguły */
    readonly sinceLastRun: number
    /** Czas w minutach do następnego wywołania akcji kalendarza */
    readonly toNextRun: number
    /** Stan działania kalendarza: 1 - kalendarz aktywny, 0 - kalendarz nieaktywny */
    readonly state: StateType
}

class Calendar implements ICalendar {
    private onCalendarCallbacks: Array<() => void> = [];
    private onStartCallbacks: Array<() => void> = [];
    private onStopCallbacks: Array<() => void> = [];
    private onCancelCallbacks: Array<() => void> = [];

    constructor(private raw: CalendarRaw) {
        this.raw.add_event(EventType.OnCalendar, () => {
            this.onCalendarCallbacks.forEach(callback => {
                callback();
            });
        });

        this.raw.add_event(EventType.OnStart, () => {
            this.onStartCallbacks.forEach(callback => {
                callback();
            });
        });

        this.raw.add_event(EventType.OnStop, () => {
            this.onStopCallbacks.forEach(callback => {
                callback();
            });
        });

        this.raw.add_event(EventType.OnCancel, () => {
            this.onCancelCallbacks.forEach(callback => {
                callback();
            });
        });
    }

    /**
     * Zdarzenie wywoływane w momencie wywołania akcji kalendarza
     * @param callback
     */
    addOnCalendar(callback: () => void): void {
        this.onCalendarCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane w momencie wznowienia pracy kalendarza
     * @param callback
     */
    addOnStart(callback: () => void): void {
        this.onStartCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane w momencie zablokowania pracy kalendarza
     * @param callback
     */
    addOnStop(callback: () => void): void {
        this.onStopCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane w momencie anulowania najbliższych akcji
     * @param callback
     */
    addOnCancel(callback: () => void): void {
        this.onCancelCallbacks.push(callback);
    }
    /** Przełączenie w stan aktywny (State=1) */
    start(): void {
        this.raw.execute(MethodType.Start);
    }
    /** Przełączenie w stan zatrzymania (State=0) */
    stop(): void {
        this.raw.execute(MethodType.Stop);
    }
    /**
     * Anulowanie wywołania wskazanej liczby najbliższych akcji kalendarza
     * @param count
     */
    cancelNext(count: number = 1): void {
        this.raw.execute(MethodType.CancelNext, count);
    }
    /**
     * Reguła kalendarza w formacie CRON lub ERROR w przypadku wprowadzenia błędnej reguły
     * @returns {string}
     */
    get rule(): string {
        return this.raw.get(PropertyType.Rule);
    }
    set rule(value: string) {
        this.raw.set(PropertyType.Rule, value);
    }
    /**
     * Ustawienie Reguły kalendarza
     * @param {string} rule
     */
    setRule(rule: string): void {
        this.raw.set(PropertyType.Rule, rule);
    }
    /**
     * Czas w minutach od ostatniego spełnienia warunku reguły
     * @returns {number}
     */
    get sinceLastRun(): number {
        return this.raw.get(PropertyType.SinceLastRun);
    }
    /**
     * Czas w minutach do następnego wywołania akcji kalendarza
     * @returns {number}
     */
    get toNextRun(): number {
        return this.raw.get(PropertyType.ToNextRun);
    }
    /**
     * Stan działania kalendarza: 1 - kalendarz aktywny, 0 - kalendarz nieaktywny
     * @returns {StateType}
     */
    get state(): StateType {
        return this.raw.get(PropertyType.State);
    }
}

class CalendarRemote implements ICalendar {
    constructor(private objectName: string, private gate: RemoteGate) {

    }

    /**
     * Zdarzenie wywoływane w momencie wywołania akcji kalendarza
     * @param callback
     */
    addOnCalendar(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane w momencie wznowienia pracy kalendarza
     * @param callback
     */
    addOnStart(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane w momencie zablokowania pracy kalendarza
     * @param callback
     */
    addOnStop(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane w momencie anulowania najbliższych akcji
     * @param callback
     */
    addOnCancel(_callback: () => void): void {
        // Remote events are not supported
    }

    /** Przełączenie w stan aktywny (State=1) */
    start(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.Start)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Przełączenie w stan zatrzymania (State=0) */
    stop(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.Stop)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Anulowanie wywołania wskazanej liczby najbliższych akcji kalendarza
     * @param count
     */
    cancelNext(count: number = 1): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.CancelNext)
            .addParameter(count)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Reguła kalendarza w formacie CRON lub ERROR w przypadku wprowadzenia błędnej reguły
     * @returns {string}
     */
    get rule(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Rule)
            .build();
        return this.gate.runScript(cmd!);
    }

    set rule(value: string) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Rule)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Ustawienie Reguły kalendarza
     * @param {string} rule
     */
    setRule(rule: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Rule)
            .addParameter(rule)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Czas w minutach od ostatniego spełnienia warunku reguły
     * @returns {number}
     */
    get sinceLastRun(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.SinceLastRun)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Czas w minutach do następnego wywołania akcji kalendarza
     * @returns {number}
     */
    get toNextRun(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.ToNextRun)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Stan działania kalendarza: 1 - kalendarz aktywny, 0 - kalendarz nieaktywny
     * @returns {StateType}
     */
    get state(): StateType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.State)
            .build();
        return this.gate.runScript(cmd!);
    }
}

export {
    Calendar, CalendarRaw, CalendarRemote, StateType
}
