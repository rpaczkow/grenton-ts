// Created from: src/interfaces/object_presence_sensor_v2.xml, object name="PresenceSensor" version="2"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnStart = 0,
    OnStop = 1,
    OnSwitchOn = 2,
    OnSwitchOff = 3
}

enum PropertyType {
    Timeout = 0,
    State = 1,
    PresenceDetected = 2,
    TimeFromLastPresence = 3,
    DetectionDelay = 4,
    Locked = 5,
    Mode = 6
}

enum MethodType {
    Start = 0,
    Stop = 1,
    DetectPresence = 2,
    UndetectPresence = 3,
    SwitchLocked = 4
}

enum StateType {
    Off = 0,
    On = 1
}

enum LockedType {
    Off = 0,
    On = 1
}

enum ModeType {
    ImpulseInput = 0,
    StateInput = 1
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
     * Zdarzenie wywoływane podczas wykrycia obecności (zmiana wartości parametru PresenceDetected z 0 na 1)
     * @param callback
     */
    addOnSwitchOn: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane na timeout licznika (zmiana parametru PresenceDetected z 1 na 0)
     * @param callback
     */
    addOnSwitchOff: (callback: () => void) => void
    /** Uruchamia czujnik obecności */
    start: () => void
    /** Zatrzymuje czujnik obecności */
    stop: () => void
    /** Metoda wywoływana podczas wykrycia obecności. Ustawia wartość cechy PresenceDetected na 1 oraz resetuje licznik TimeFromLastPresence czujnika obecności */
    detectPresence: () => void
    /** Używana w trybie stanowym (Mode = 1). Kończy podtrzymywanie parametru PresenceDetected (po upływie Timeout'u). */
    undetectPresence: () => void
    /** Zmienia wartość parametru Locked na przeciwny. Przypadki: - zmiana Locked z 0 na 1 - ustawienie na 1 i zablokowanie PresenceDetected, wywołanie zdarzenia OnSwitchOn (jeśli wcześniej PresenceDetected = 0), reset TimeFromLastPresence - zmiana Locked z 1 na 0 - ustawienie na 0 i odblokowanie Presence Detected, wywołanie zdarzenia OnSwitchOff */
    switchLocked: () => void
    /**
     * Ustawia wartość parametru Locked. Przypadki: - zmiana Locked z 0 na 1 - ustawienie na 1 i zablokowanie PresenceDetected, wywołanie zdarzenia OnSwitchOn (jeśli wcześniej PresenceDetected = 0), reset TimeFromLastPresence - zmiana Locked z 1 na 0 - ustawienie na 0 i odblokowanie Presence Detected, wywołanie zdarzenia OnSwitchOff - SetLocked(On) jeśli Locked = 1 - resetuje TimeFromLastPresence - SetLocked(Off) jeśli Locked = 0 - brak reakcji
     * @param {LockedType} locked
     */
    setLocked: (locked: LockedType) => void
    /** Czas (w sekundach) od ostatniej aktywności, po którym wartość cechy PresenceDetected zostaje ustawione na 0 */
    timeout: number
    /** Ustawia Aktualny stan czujnika obecności, 1 - włączony, 0 - wyłączony */
    state: StateType
    /** Wartość mówiąca o wykryciu ruchu przez czujnik */
    readonly presenceDetected: boolean
    /** Czas od ostatniego wykrycia ruchu (z czujnika lub włączenia swiatła z przycisku). Resetowany po wywołaniu: - DetectPresence() - bez względu na Locked, DetectionDelay - SwitchLocked() przy zmianie Locked na 1 - SetLocked(On) W trybie stanowym po wywołaniu DetectPresence(), TimeFromLastPresence = 0, aż do wywołania UndetectPresence() */
    readonly timeFromLastPresence: number
    /** Czas ignorowania DetectPresence po zmianie Locked On->Off */
    detectionDelay: number
    /** Stan zablokowania obecności. 0 - reagowanie na DetectPresence. 1 - podtrzymanie PresenceDetected jako 1. */
    readonly locked: LockedType
    /** Tryb działania obiektu w zależności od typu używanego czujnika ruchu: 0 - impulsowy, 1 - stanowy. */
    mode: ModeType
    /** Ustawia parametr Timeout (wyrażony w sekundach) */
    setTimeout: (value: number) => void
    /** Ustawia parametr DetectionDelay (wyrażony w sekundach) */
    setDetectionDelay: (value: number) => void
    /** Ustawia parametr Mode */
    setMode: (value: ModeType) => void
}

class PresenceSensor implements IPresenceSensor {
    private onStartCallbacks: Array<() => void> = [];
    private onStopCallbacks: Array<() => void> = [];
    private onSwitchOnCallbacks: Array<() => void> = [];
    private onSwitchOffCallbacks: Array<() => void> = [];

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

        this.raw.add_event(EventType.OnSwitchOn, () => {
            this.onSwitchOnCallbacks.forEach(callback => {
                callback();
            });
        });

        this.raw.add_event(EventType.OnSwitchOff, () => {
            this.onSwitchOffCallbacks.forEach(callback => {
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
     * Zdarzenie wywoływane podczas wykrycia obecności (zmiana wartości parametru PresenceDetected z 0 na 1)
     * @param callback
     */
    addOnSwitchOn(callback: () => void): void {
        this.onSwitchOnCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane na timeout licznika (zmiana parametru PresenceDetected z 1 na 0)
     * @param callback
     */
    addOnSwitchOff(callback: () => void): void {
        this.onSwitchOffCallbacks.push(callback);
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
    /** Używana w trybie stanowym (Mode = 1). Kończy podtrzymywanie parametru PresenceDetected (po upływie Timeout'u). */
    undetectPresence(): void {
        this.raw.execute(MethodType.UndetectPresence);
    }
    /** Zmienia wartość parametru Locked na przeciwny. Przypadki: - zmiana Locked z 0 na 1 - ustawienie na 1 i zablokowanie PresenceDetected, wywołanie zdarzenia OnSwitchOn (jeśli wcześniej PresenceDetected = 0), reset TimeFromLastPresence - zmiana Locked z 1 na 0 - ustawienie na 0 i odblokowanie Presence Detected, wywołanie zdarzenia OnSwitchOff */
    switchLocked(): void {
        this.raw.execute(MethodType.SwitchLocked);
    }
    /**
     * Ustawia wartość parametru Locked. Przypadki: - zmiana Locked z 0 na 1 - ustawienie na 1 i zablokowanie PresenceDetected, wywołanie zdarzenia OnSwitchOn (jeśli wcześniej PresenceDetected = 0), reset TimeFromLastPresence - zmiana Locked z 1 na 0 - ustawienie na 0 i odblokowanie Presence Detected, wywołanie zdarzenia OnSwitchOff - SetLocked(On) jeśli Locked = 1 - resetuje TimeFromLastPresence - SetLocked(Off) jeśli Locked = 0 - brak reakcji
     * @param {LockedType} locked
     */
    setLocked(locked: LockedType): void {
        this.raw.set(PropertyType.Locked, locked);
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
    /**
     * Czas ignorowania DetectPresence po zmianie Locked On->Off
     * @returns {number}
     */
    get detectionDelay(): number {
        return this.raw.get(PropertyType.DetectionDelay);
    }
    set detectionDelay(value: number) {
        this.raw.set(PropertyType.DetectionDelay, value);
    }
    /**
     * Stan zablokowania obecności. 0 - reagowanie na DetectPresence. 1 - podtrzymanie PresenceDetected jako 1.
     * @returns {LockedType}
     */
    get locked(): LockedType {
        return this.raw.get(PropertyType.Locked);
    }
    /**
     * Tryb działania obiektu w zależności od typu używanego czujnika ruchu: 0 - impulsowy, 1 - stanowy.
     * @returns {ModeType}
     */
    get mode(): ModeType {
        return this.raw.get(PropertyType.Mode);
    }
    set mode(value: ModeType) {
        this.raw.set(PropertyType.Mode, value);
    }
    /** Ustawia parametr Timeout (wyrażony w sekundach) */
    setTimeout(value: number): void {
        this.raw.set(PropertyType.Timeout, value);
    }
    /** Ustawia parametr DetectionDelay (wyrażony w sekundach) */
    setDetectionDelay(value: number): void {
        this.raw.set(PropertyType.DetectionDelay, value);
    }
    /** Ustawia parametr Mode */
    setMode(value: ModeType): void {
        this.raw.set(PropertyType.Mode, value);
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
     * Zdarzenie wywoływane podczas wykrycia obecności (zmiana wartości parametru PresenceDetected z 0 na 1)
     * @param callback
     */
    addOnSwitchOn(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane na timeout licznika (zmiana parametru PresenceDetected z 1 na 0)
     * @param callback
     */
    addOnSwitchOff(_callback: () => void): void {
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

    /** Używana w trybie stanowym (Mode = 1). Kończy podtrzymywanie parametru PresenceDetected (po upływie Timeout'u). */
    undetectPresence(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.UndetectPresence)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Zmienia wartość parametru Locked na przeciwny. Przypadki: - zmiana Locked z 0 na 1 - ustawienie na 1 i zablokowanie PresenceDetected, wywołanie zdarzenia OnSwitchOn (jeśli wcześniej PresenceDetected = 0), reset TimeFromLastPresence - zmiana Locked z 1 na 0 - ustawienie na 0 i odblokowanie Presence Detected, wywołanie zdarzenia OnSwitchOff */
    switchLocked(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.SwitchLocked)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Ustawia wartość parametru Locked. Przypadki: - zmiana Locked z 0 na 1 - ustawienie na 1 i zablokowanie PresenceDetected, wywołanie zdarzenia OnSwitchOn (jeśli wcześniej PresenceDetected = 0), reset TimeFromLastPresence - zmiana Locked z 1 na 0 - ustawienie na 0 i odblokowanie Presence Detected, wywołanie zdarzenia OnSwitchOff - SetLocked(On) jeśli Locked = 1 - resetuje TimeFromLastPresence - SetLocked(Off) jeśli Locked = 0 - brak reakcji
     * @param {LockedType} locked
     */
    setLocked(locked: LockedType): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Locked)
            .addParameter(locked)
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

    /**
     * Czas ignorowania DetectPresence po zmianie Locked On->Off
     * @returns {number}
     */
    get detectionDelay(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.DetectionDelay)
            .build();
        return this.gate.runScript(cmd!);
    }

    set detectionDelay(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.DetectionDelay)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Stan zablokowania obecności. 0 - reagowanie na DetectPresence. 1 - podtrzymanie PresenceDetected jako 1.
     * @returns {LockedType}
     */
    get locked(): LockedType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Locked)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Tryb działania obiektu w zależności od typu używanego czujnika ruchu: 0 - impulsowy, 1 - stanowy.
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

    /** Ustawia parametr Timeout (wyrażony w sekundach) */
    setTimeout(value: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Timeout)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Ustawia parametr DetectionDelay (wyrażony w sekundach) */
    setDetectionDelay(value: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.DetectionDelay)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Ustawia parametr Mode */
    setMode(value: ModeType): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Mode)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
}

export {
    PresenceSensor, PresenceSensorRaw, PresenceSensorRemote, StateType, LockedType, ModeType
}
