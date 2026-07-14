// Created from: src/interfaces/object_timer_v1.xml, object name="Timer" version="1"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnTimer = 0,
    OnStart = 1,
    OnStop = 2,
    OnPause = 3
}

enum PropertyType {
    Time = 0,
    Mode = 1,
    State = 2,
    Value = 3
}

enum MethodType {
    Start = 0,
    Stop = 1,
    Pause = 2
}

enum ModeType {
    CountDown = 0,
    Interval = 1
}

enum StateType {
    Stopped = 0,
    Counting = 1,
    Paused = 2
}

declare class TimerRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface ITimer {
    /**
     * Zdarzenie wywoływane przy zliczeniu timera
     * @param callback
     */
    addOnTimer: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane przy uruchomieniu timera
     * @param callback
     */
    addOnStart: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane przy zatrzymaniu timera
     * @param callback
     */
    addOnStop: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane przy pauzie timera
     * @param callback
     */
    addOnPause: (callback: () => void) => void
    /** Uruchamia timer */
    start: () => void
    /** Zatrzymuje timer */
    stop: () => void
    /** Pauza timera */
    pause: () => void
    /**
     * Ustawia czas timera
     * @param {number} time
     */
    setTime: (time: number) => void
    /**
     * Ustawia tryb pracy: 0 - zliczanie w dół (CountDown), 1 - cykliczny (Interval)
     * @param {ModeType} mode
     */
    setMode: (mode: ModeType) => void
    /** Czas zliczeń */
    time: number
    /** Tryb pracy: 0 - zliczanie w dół (CountDown), 1 - cykliczny (Interval) */
    mode: ModeType
    /** Aktualny stan pracy timera: 0 - zatrzymany (stopped), 1 - liczy (counting), 2 - pauza (paused) */
    readonly state: StateType
    /** Czas jaki pozostał do wyzwolenia zdarzenia OnTimer */
    readonly value: number
}

class Timer implements ITimer {
    private onTimerCallbacks: Array<() => void> = [];
    private onStartCallbacks: Array<() => void> = [];
    private onStopCallbacks: Array<() => void> = [];
    private onPauseCallbacks: Array<() => void> = [];

    constructor(private raw: TimerRaw) {
        this.raw.add_event(EventType.OnTimer, () => {
            this.onTimerCallbacks.forEach(callback => {
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

        this.raw.add_event(EventType.OnPause, () => {
            this.onPauseCallbacks.forEach(callback => {
                callback();
            });
        });
    }

    /**
     * Zdarzenie wywoływane przy zliczeniu timera
     * @param callback
     */
    addOnTimer(callback: () => void): void {
        this.onTimerCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane przy uruchomieniu timera
     * @param callback
     */
    addOnStart(callback: () => void): void {
        this.onStartCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane przy zatrzymaniu timera
     * @param callback
     */
    addOnStop(callback: () => void): void {
        this.onStopCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane przy pauzie timera
     * @param callback
     */
    addOnPause(callback: () => void): void {
        this.onPauseCallbacks.push(callback);
    }
    /** Uruchamia timer */
    start(): void {
        this.raw.execute(MethodType.Start);
    }
    /** Zatrzymuje timer */
    stop(): void {
        this.raw.execute(MethodType.Stop);
    }
    /** Pauza timera */
    pause(): void {
        this.raw.execute(MethodType.Pause);
    }
    /**
     * Ustawia czas timera
     * @param {number} time
     */
    setTime(time: number): void {
        this.raw.set(PropertyType.Time, time);
    }
    /**
     * Ustawia tryb pracy: 0 - zliczanie w dół (CountDown), 1 - cykliczny (Interval)
     * @param {ModeType} mode
     */
    setMode(mode: ModeType): void {
        this.raw.set(PropertyType.Mode, mode);
    }
    /**
     * Czas zliczeń
     * @returns {number}
     */
    get time(): number {
        return this.raw.get(PropertyType.Time);
    }
    set time(value: number) {
        this.raw.set(PropertyType.Time, value);
    }
    /**
     * Tryb pracy: 0 - zliczanie w dół (CountDown), 1 - cykliczny (Interval)
     * @returns {ModeType}
     */
    get mode(): ModeType {
        return this.raw.get(PropertyType.Mode);
    }
    set mode(value: ModeType) {
        this.raw.set(PropertyType.Mode, value);
    }
    /**
     * Aktualny stan pracy timera: 0 - zatrzymany (stopped), 1 - liczy (counting), 2 - pauza (paused)
     * @returns {StateType}
     */
    get state(): StateType {
        return this.raw.get(PropertyType.State);
    }
    /**
     * Czas jaki pozostał do wyzwolenia zdarzenia OnTimer
     * @returns {number}
     */
    get value(): number {
        return this.raw.get(PropertyType.Value);
    }
}

class TimerRemote implements ITimer {
    constructor(private objectName: string, private gate: RemoteGate) {

    }

    /**
     * Zdarzenie wywoływane przy zliczeniu timera
     * @param callback
     */
    addOnTimer(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane przy uruchomieniu timera
     * @param callback
     */
    addOnStart(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane przy zatrzymaniu timera
     * @param callback
     */
    addOnStop(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane przy pauzie timera
     * @param callback
     */
    addOnPause(_callback: () => void): void {
        // Remote events are not supported
    }

    /** Uruchamia timer */
    start(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.Start)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Zatrzymuje timer */
    stop(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.Stop)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Pauza timera */
    pause(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.Pause)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Ustawia czas timera
     * @param {number} time
     */
    setTime(time: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Time)
            .addParameter(time)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Ustawia tryb pracy: 0 - zliczanie w dół (CountDown), 1 - cykliczny (Interval)
     * @param {ModeType} mode
     */
    setMode(mode: ModeType): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Mode)
            .addParameter(mode)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Czas zliczeń
     * @returns {number}
     */
    get time(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Time)
            .build();
        return this.gate.runScript(cmd!);
    }

    set time(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Time)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Tryb pracy: 0 - zliczanie w dół (CountDown), 1 - cykliczny (Interval)
     * @returns {ModeType}
     */
    get mode(): ModeType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Mode)
            .build();
        return this.gate.runScript(cmd!);
    }

    set mode(value: ModeType) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Mode)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Aktualny stan pracy timera: 0 - zatrzymany (stopped), 1 - liczy (counting), 2 - pauza (paused)
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
     * Czas jaki pozostał do wyzwolenia zdarzenia OnTimer
     * @returns {number}
     */
    get value(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Value)
            .build();
        return this.gate.runScript(cmd!);
    }
}

export {
    Timer, TimerRaw, TimerRemote, ModeType, StateType
}
