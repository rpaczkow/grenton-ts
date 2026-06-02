// Created from: packages/grenton-api/interfaces/object_presence_sensor_v1.xml, object name="PresenceSensor" version="1"

import { rawExecutionBuilderFactory } from "../../../core/execution-builder"
import { RemoteGate } from "../../../core/remote-gate"

enum EventType {
    OnStart = 0,
    OnStop = 1,
    OnPresenceDetected = 2,
    OnTimeout = 3
}

enum PropertyType {
    Timeout = 0,
    State = 1,
    PresenceDetected = 2,
    TimeFromLastPresence = 3
}

enum MethodType {
    Start = 0,
    Stop = 1,
    DetectPresence = 2
}

enum StateType {
    Off = 0,
    On = 1
}

declare class PresenceSensorRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface IPresenceSensor {
    /**
     * Zdarzenie wywoływane przy uruchomieniu czujnika
     * @param callback
     */
    addOnStart: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane przy dezaktywacji czujnika
     * @param callback
     */
    addOnStop: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane podczas wykrycia obecności
     * @param callback
     */
    addOnPresenceDetected: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane na timeout licznika
     * @param callback
     */
    addOnTimeout: (callback: () => void) => void
    /** Uruchamia czujnik obecności */
    start: () => void
    /** Zatrzymuje czujnik obecności */
    stop: () => void
    /** Metoda wywoływana podczas wykrycia obecności. Ustawia wartość cechy PresenceDetected na 1 oraz resetuje licznik TimeFromLastPresence czujnika obecności */
    detectPresence: () => void
    /** Czas (w sekundach) od ostatniej aktywności, po którym wartość cechy PresenceDetected zostaje ustawione na 0 */
    timeout: number
    /** Ustawia Aktualny stan czujnika obecności, 1 - włączony, 0 - wyłączony */
    state: StateType
    /** Wartość mówiąca o wykryciu ruchu przez czujnik */
    readonly presenceDetected: boolean
    /** Czas od ostatniego wykrycia ruchu (z czujnika lub włączenia swiatła z przycisku). Resetowany po wywołaniu: - DetectPresence() - bez względu na Locked, DetectionDelay - SwitchLocked() przy zmianie Locked na 1 - SetLocked(On) W trybie stanowym po wywołaniu DetectPresence(), TimeFromLastPresence = 0, aż do wywołania UndetectPresence() */
    readonly timeFromLastPresence: number
}

class PresenceSensor implements IPresenceSensor {
    private onStartCallbacks: Array<() => void> = [];
    private onStopCallbacks: Array<() => void> = [];
    private onPresenceDetectedCallbacks: Array<() => void> = [];
    private onTimeoutCallbacks: Array<() => void> = [];

    constructor(private raw: PresenceSensorRaw) {
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

        this.raw.add_event(EventType.OnPresenceDetected, () => {
            this.onPresenceDetectedCallbacks.forEach(callback => {
                callback();
            });
        });

        this.raw.add_event(EventType.OnTimeout, () => {
            this.onTimeoutCallbacks.forEach(callback => {
                callback();
            });
        });
    }

    /**
     * Zdarzenie wywoływane przy uruchomieniu czujnika
     * @param callback
     */
    addOnStart(callback: () => void): void {
        this.onStartCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane przy dezaktywacji czujnika
     * @param callback
     */
    addOnStop(callback: () => void): void {
        this.onStopCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane podczas wykrycia obecności
     * @param callback
     */
    addOnPresenceDetected(callback: () => void): void {
        this.onPresenceDetectedCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane na timeout licznika
     * @param callback
     */
    addOnTimeout(callback: () => void): void {
        this.onTimeoutCallbacks.push(callback);
    }
    /** Uruchamia czujnik obecności */
    start(): void {
        this.raw.execute(MethodType.Start);
    }
    /** Zatrzymuje czujnik obecności */
    stop(): void {
        this.raw.execute(MethodType.Stop);
    }
    /** Metoda wywoływana podczas wykrycia obecności. Ustawia wartość cechy PresenceDetected na 1 oraz resetuje licznik TimeFromLastPresence czujnika obecności */
    detectPresence(): void {
        this.raw.execute(MethodType.DetectPresence);
    }
    /**
     * Czas (w sekundach) od ostatniej aktywności, po którym wartość cechy PresenceDetected zostaje ustawione na 0
     * @returns {number}
     */
    get timeout(): number {
        return this.raw.get(PropertyType.Timeout);
    }
    set timeout(value: number) {
        this.raw.set(PropertyType.Timeout, value);
    }
    /**
     * Ustawia Aktualny stan czujnika obecności, 1 - włączony, 0 - wyłączony
     * @returns {StateType}
     */
    get state(): StateType {
        return this.raw.get(PropertyType.State);
    }
    set state(value: StateType) {
        this.raw.set(PropertyType.State, value);
    }
    /**
     * Wartość mówiąca o wykryciu ruchu przez czujnik
     * @returns {boolean}
     */
    get presenceDetected(): boolean {
        return this.raw.get(PropertyType.PresenceDetected) === 1;
    }
    /**
     * Czas od ostatniego wykrycia ruchu (z czujnika lub włączenia swiatła z przycisku). Resetowany po wywołaniu: - DetectPresence() - bez względu na Locked, DetectionDelay - SwitchLocked() przy zmianie Locked na 1 - SetLocked(On) W trybie stanowym po wywołaniu DetectPresence(), TimeFromLastPresence = 0, aż do wywołania UndetectPresence()
     * @returns {number}
     */
    get timeFromLastPresence(): number {
        return this.raw.get(PropertyType.TimeFromLastPresence);
    }
}

class PresenceSensorRemote implements IPresenceSensor {
    constructor(private objectName: string, private gate: RemoteGate) {

    }

    /**
     * Zdarzenie wywoływane przy uruchomieniu czujnika
     * @param callback
     */
    addOnStart(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane przy dezaktywacji czujnika
     * @param callback
     */
    addOnStop(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane podczas wykrycia obecności
     * @param callback
     */
    addOnPresenceDetected(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane na timeout licznika
     * @param callback
     */
    addOnTimeout(_callback: () => void): void {
        // Remote events are not supported
    }

    /** Uruchamia czujnik obecności */
    start(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.Start)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Zatrzymuje czujnik obecności */
    stop(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.Stop)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Metoda wywoływana podczas wykrycia obecności. Ustawia wartość cechy PresenceDetected na 1 oraz resetuje licznik TimeFromLastPresence czujnika obecności */
    detectPresence(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.DetectPresence)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Czas (w sekundach) od ostatniej aktywności, po którym wartość cechy PresenceDetected zostaje ustawione na 0
     * @returns {number}
     */
    get timeout(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Timeout)
            .build();
        return this.gate.runScript(cmd!);
    }

    set timeout(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Timeout)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Ustawia Aktualny stan czujnika obecności, 1 - włączony, 0 - wyłączony
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
     * Wartość mówiąca o wykryciu ruchu przez czujnik
     * @returns {boolean}
     */
    get presenceDetected(): boolean {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.PresenceDetected)
            .build();
        return this.gate.runScript(cmd!) === 1;
    }

    /**
     * Czas od ostatniego wykrycia ruchu (z czujnika lub włączenia swiatła z przycisku). Resetowany po wywołaniu: - DetectPresence() - bez względu na Locked, DetectionDelay - SwitchLocked() przy zmianie Locked na 1 - SetLocked(On) W trybie stanowym po wywołaniu DetectPresence(), TimeFromLastPresence = 0, aż do wywołania UndetectPresence()
     * @returns {number}
     */
    get timeFromLastPresence(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.TimeFromLastPresence)
            .build();
        return this.gate.runScript(cmd!);
    }
}

export {
    PresenceSensor, PresenceSensorRaw, PresenceSensorRemote, StateType
}
