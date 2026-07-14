// Created from: src/interfaces/object_scheduler_v1.xml, object name="Scheduler" version="1"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnHarmonogram = 0,
    OnStart = 1,
    OnStop = 2
}

enum PropertyType {
    Data = 0,
    State = 1,
    Value = 2,
    Min = 3,
    Max = 4
}

enum MethodType {
    Start = 0,
    Stop = 1
}

enum StateType {
    Off = 0,
    On = 1
}

declare class SchedulerRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface IScheduler {
    /**
     * Zdarzenie wywoływane co 15 minut zgodnie z harmonogramem
     * @param callback
     */
    addOnHarmonogram: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane przy wznowieniu pracy
     * @param callback
     */
    addOnStart: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane przy zatrzymaniu pracy
     * @param callback
     */
    addOnStop: (callback: () => void) => void
    /** Przełączenie w stan aktywny (State=1) */
    start: () => void
    /** Przełączenie w stan zatrzymania (State=0) */
    stop: () => void
    /** Ciąg znaków definiujący harmonogram zmian wartości */
    data: string
    /** Stan działania harmonogramu: 1 - harmonogram aktywny, 0 - harmonogram nieaktywny */
    readonly state: StateType
    /** Wartość wyjściowa zmieniana co 15 minut zgodnie z harmonogramem */
    readonly value: number
    /** Minimalna wartość dla ustawienia zakresu wartości interfejsu graficznego */
    min: number
    /** Maksymalna wartość dla ustawienia zakresu wartości interfejsu graficznego */
    max: number
    /** Ustawienie tygodniowego harmonogramu */
    setData: (value: string) => void
    /** Ustawienie minimalnej wartości dla zakresu wartości interfejsu graficznego */
    setMin: (value: number) => void
    /** Ustawienie maksymalnej wartości dla zakresu wartości interfejsu graficznego */
    setMax: (value: number) => void
}

class Scheduler implements IScheduler {
    private onHarmonogramCallbacks: Array<() => void> = [];
    private onStartCallbacks: Array<() => void> = [];
    private onStopCallbacks: Array<() => void> = [];

    constructor(private raw: SchedulerRaw) {
        this.raw.add_event(EventType.OnHarmonogram, () => {
            this.onHarmonogramCallbacks.forEach(callback => {
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
    }

    /**
     * Zdarzenie wywoływane co 15 minut zgodnie z harmonogramem
     * @param callback
     */
    addOnHarmonogram(callback: () => void): void {
        this.onHarmonogramCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane przy wznowieniu pracy
     * @param callback
     */
    addOnStart(callback: () => void): void {
        this.onStartCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane przy zatrzymaniu pracy
     * @param callback
     */
    addOnStop(callback: () => void): void {
        this.onStopCallbacks.push(callback);
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
     * Ciąg znaków definiujący harmonogram zmian wartości
     * @returns {string}
     */
    get data(): string {
        return this.raw.get(PropertyType.Data);
    }
    set data(value: string) {
        this.raw.set(PropertyType.Data, value);
    }
    /**
     * Stan działania harmonogramu: 1 - harmonogram aktywny, 0 - harmonogram nieaktywny
     * @returns {StateType}
     */
    get state(): StateType {
        return this.raw.get(PropertyType.State);
    }
    /**
     * Wartość wyjściowa zmieniana co 15 minut zgodnie z harmonogramem
     * @returns {number}
     */
    get value(): number {
        return this.raw.get(PropertyType.Value);
    }
    /**
     * Minimalna wartość dla ustawienia zakresu wartości interfejsu graficznego
     * @returns {number}
     */
    get min(): number {
        return this.raw.get(PropertyType.Min);
    }
    set min(value: number) {
        this.raw.set(PropertyType.Min, value);
    }
    /**
     * Maksymalna wartość dla ustawienia zakresu wartości interfejsu graficznego
     * @returns {number}
     */
    get max(): number {
        return this.raw.get(PropertyType.Max);
    }
    set max(value: number) {
        this.raw.set(PropertyType.Max, value);
    }
    /** Ustawienie tygodniowego harmonogramu */
    setData(value: string): void {
        this.raw.set(PropertyType.Data, value);
    }
    /** Ustawienie minimalnej wartości dla zakresu wartości interfejsu graficznego */
    setMin(value: number): void {
        this.raw.set(PropertyType.Min, value);
    }
    /** Ustawienie maksymalnej wartości dla zakresu wartości interfejsu graficznego */
    setMax(value: number): void {
        this.raw.set(PropertyType.Max, value);
    }
}

class SchedulerRemote implements IScheduler {
    constructor(private objectName: string, private gate: RemoteGate) {

    }

    /**
     * Zdarzenie wywoływane co 15 minut zgodnie z harmonogramem
     * @param callback
     */
    addOnHarmonogram(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane przy wznowieniu pracy
     * @param callback
     */
    addOnStart(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane przy zatrzymaniu pracy
     * @param callback
     */
    addOnStop(_callback: () => void): void {
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
     * Ciąg znaków definiujący harmonogram zmian wartości
     * @returns {string}
     */
    get data(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Data)
            .build();
        return this.gate.runScript(cmd!);
    }

    set data(value: string) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Data)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Stan działania harmonogramu: 1 - harmonogram aktywny, 0 - harmonogram nieaktywny
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
     * Wartość wyjściowa zmieniana co 15 minut zgodnie z harmonogramem
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
     * Minimalna wartość dla ustawienia zakresu wartości interfejsu graficznego
     * @returns {number}
     */
    get min(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Min)
            .build();
        return this.gate.runScript(cmd!);
    }

    set min(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Min)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Maksymalna wartość dla ustawienia zakresu wartości interfejsu graficznego
     * @returns {number}
     */
    get max(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Max)
            .build();
        return this.gate.runScript(cmd!);
    }

    set max(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Max)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Ustawienie tygodniowego harmonogramu */
    setData(value: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Data)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Ustawienie minimalnej wartości dla zakresu wartości interfejsu graficznego */
    setMin(value: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Min)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Ustawienie maksymalnej wartości dla zakresu wartości interfejsu graficznego */
    setMax(value: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Max)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
}

export {
    Scheduler, SchedulerRaw, SchedulerRemote, StateType
}
