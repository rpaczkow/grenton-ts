// Created from: src/interfaces/object_PIDcontroller_v1.xml, object name="PIDcontroller" version="1"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnChange = 0,
    OnStart = 1,
    OnStop = 2,
    OnOutOn = 4,
    OnOutOff = 5
}

enum PropertyType {
    ControlOut = 0,
    State = 1,
    SetPoint = 2,
    Kp = 3,
    Ki = 4,
    Kd = 5,
    SwitchTime = 6,
    Alpha = 7,
    Gamma = 8,
    Mode = 9,
    A = 10,
    B = 11
}

enum MethodType {
    Source = 0,
    Start = 1,
    Stop = 2
}

enum ModeType {
    NormalPID = 1,
    AutoKaczmarz = 2
}

declare class PIDcontrollerRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface IPIDcontroller {
    /**
     * Zdarzenie wywoływane w momencie zmiany wartości cechy ControlOut
     * @param callback
     */
    addOnChange: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane w momencie uruchomienia regulatora
     * @param callback
     */
    addOnStart: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane przy zablokowaniu pracy
     * @param callback
     */
    addOnStop: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane w momencie przełączenia wartości cechy ControlOut na 1
     * @param callback
     */
    addOnOutOn: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane w momencie przełączenia wartości cechy ControlOut na 0
     * @param callback
     */
    addOnOutOff: (callback: () => void) => void
    /**
     * Podanie nowej wartości wejścia dla sterownika (pętla sprzężenia zwrotnego)
     * @param {number} value
     */
    source: (value: number) => void
    /** Przełącza w stan aktywny (State=1) */
    start: () => void
    /** Przełącza w stan zatrzymania (State=0) */
    stop: () => void
    /** Wartość wyjścia sterującego (binarna, przełączana w cyklu określonym przez SwitchTime) */
    readonly controlOut: number
    /** Stan działania regulatora: 1 - aktywny, 0 - nieaktywny */
    readonly state: number
    /** Ustawia wartość regulatora - wartość docelowa */
    setPoint: number
    /** Wzmocnienie członu proporcjonalnego regulatora PID */
    readonly kp: number
    /** Wzmocnienie członu całkującego regulatora PID */
    readonly ki: number
    /** Wzmocnienie członu różniczkującego regulatora PID */
    readonly kd: number
    /** Czas przełączenia */
    readonly switchTime: number
    /** Parametr alpha w algorytmie Kaczmarza (zabezpieczenie przed dzieleniem przez 0) */
    alpha: number
    /** Parametr gamma w algorytmie Kaczmarza (dynamika zmian oszacowania a i b) */
    gamma: number
    /** Tryb pracy regulatora: 1 - ręczny PID, 2 - automatyczny algorytm Kaczmarza/ */
    mode: ModeType
    /** Parametr a w algorytmie Kaczmarza */
    readonly a: number
    /** Parametr b w algorytmie Kaczmarza */
    readonly b: number
    /** Ustawia wartość wzmocnienia członu proporcjonalnego regulatora PID */
    setKp: (value: number) => void
    /** Ustawia wartość wzmocnienia członu całkującego regulatora PID */
    setKi: (value: number) => void
    /** Ustawia wartość wzmocnienia członu różniczkującego regulatora PID */
    setKd: (value: number) => void
    /** Ustawia czas przełączania */
    setSwitchTime: (value: number) => void
    /** Ustawia parametr alpha w algorytmie Kaczmarza (zabezpieczenie przed zerowaniem mianownika) */
    setAlpha: (value: number) => void
    /** Ustawia parametr gamma w algorytmie Kaczmarza (dynamika zmian oszacowania a i b) */
    setGamma: (value: number) => void
    /** Ustawia tryb pracy regulatora: ręczny PID lub automatyczny algorytm Kaczmarza */
    setMode: (value: ModeType) => void
    /** Ustawia parametr a w algorytmie Kaczmarza */
    setA: (value: number) => void
    /** Ustawia parametr b w algorytmie Kaczmarza */
    setB: (value: number) => void
}

class PIDcontroller implements IPIDcontroller {
    private onChangeCallbacks: Array<() => void> = [];
    private onStartCallbacks: Array<() => void> = [];
    private onStopCallbacks: Array<() => void> = [];
    private onOutOnCallbacks: Array<() => void> = [];
    private onOutOffCallbacks: Array<() => void> = [];

    constructor(private raw: PIDcontrollerRaw) {
        this.raw.add_event(EventType.OnChange, () => {
            this.onChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnStart, () => {
            this.onStartCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnStop, () => {
            this.onStopCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnOutOn, () => {
            this.onOutOnCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnOutOff, () => {
            this.onOutOffCallbacks.forEach(callback => { callback(); });
        });
    }

    /**
     * Zdarzenie wywoływane w momencie zmiany wartości cechy ControlOut
     * @param callback
     */
    addOnChange(callback: () => void): void {
        this.onChangeCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane w momencie uruchomienia regulatora
     * @param callback
     */
    addOnStart(callback: () => void): void {
        this.onStartCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane przy zablokowaniu pracy
     * @param callback
     */
    addOnStop(callback: () => void): void {
        this.onStopCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane w momencie przełączenia wartości cechy ControlOut na 1
     * @param callback
     */
    addOnOutOn(callback: () => void): void {
        this.onOutOnCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane w momencie przełączenia wartości cechy ControlOut na 0
     * @param callback
     */
    addOnOutOff(callback: () => void): void {
        this.onOutOffCallbacks.push(callback);
    }
    /**
     * Podanie nowej wartości wejścia dla sterownika (pętla sprzężenia zwrotnego)
     * @param {number} value
     */
    source(value: number): void {
        this.raw.execute(MethodType.Source, value);
    }
    /** Przełącza w stan aktywny (State=1) */
    start(): void {
        this.raw.execute(MethodType.Start);
    }
    /** Przełącza w stan zatrzymania (State=0) */
    stop(): void {
        this.raw.execute(MethodType.Stop);
    }
    /**
     * Wartość wyjścia sterującego (binarna, przełączana w cyklu określonym przez SwitchTime)
     * @returns {number}
     */
    get controlOut(): number {
        return this.raw.get(PropertyType.ControlOut);
    }
    /**
     * Stan działania regulatora: 1 - aktywny, 0 - nieaktywny
     * @returns {number}
     */
    get state(): number {
        return this.raw.get(PropertyType.State);
    }
    /**
     * Ustawia wartość regulatora - wartość docelowa
     * @returns {number}
     */
    get setPoint(): number {
        return this.raw.get(PropertyType.SetPoint);
    }
    set setPoint(value: number) {
        this.raw.set(PropertyType.SetPoint, value);
    }
    /**
     * Wzmocnienie członu proporcjonalnego regulatora PID
     * @returns {number}
     */
    get kp(): number {
        return this.raw.get(PropertyType.Kp);
    }
    /**
     * Wzmocnienie członu całkującego regulatora PID
     * @returns {number}
     */
    get ki(): number {
        return this.raw.get(PropertyType.Ki);
    }
    /**
     * Wzmocnienie członu różniczkującego regulatora PID
     * @returns {number}
     */
    get kd(): number {
        return this.raw.get(PropertyType.Kd);
    }
    /**
     * Czas przełączenia
     * @returns {number}
     */
    get switchTime(): number {
        return this.raw.get(PropertyType.SwitchTime);
    }
    /**
     * Parametr alpha w algorytmie Kaczmarza (zabezpieczenie przed dzieleniem przez 0)
     * @returns {number}
     */
    get alpha(): number {
        return this.raw.get(PropertyType.Alpha);
    }
    set alpha(value: number) {
        this.raw.set(PropertyType.Alpha, value);
    }
    /**
     * Parametr gamma w algorytmie Kaczmarza (dynamika zmian oszacowania a i b)
     * @returns {number}
     */
    get gamma(): number {
        return this.raw.get(PropertyType.Gamma);
    }
    set gamma(value: number) {
        this.raw.set(PropertyType.Gamma, value);
    }
    /**
     * Tryb pracy regulatora: 1 - ręczny PID, 2 - automatyczny algorytm Kaczmarza/
     * @returns {ModeType}
     */
    get mode(): ModeType {
        return this.raw.get(PropertyType.Mode);
    }
    set mode(value: ModeType) {
        this.raw.set(PropertyType.Mode, value);
    }
    /**
     * Parametr a w algorytmie Kaczmarza
     * @returns {number}
     */
    get a(): number {
        return this.raw.get(PropertyType.A);
    }
    /**
     * Parametr b w algorytmie Kaczmarza
     * @returns {number}
     */
    get b(): number {
        return this.raw.get(PropertyType.B);
    }

    /** Ustawia wartość wzmocnienia członu proporcjonalnego regulatora PID */
    setKp(value: number): void {
        this.raw.set(PropertyType.Kp, value);
    }
    /** Ustawia wartość wzmocnienia członu całkującego regulatora PID */
    setKi(value: number): void {
        this.raw.set(PropertyType.Ki, value);
    }
    /** Ustawia wartość wzmocnienia członu różniczkującego regulatora PID */
    setKd(value: number): void {
        this.raw.set(PropertyType.Kd, value);
    }
    /** Ustawia czas przełączania */
    setSwitchTime(value: number): void {
        this.raw.set(PropertyType.SwitchTime, value);
    }
    /** Ustawia parametr alpha w algorytmie Kaczmarza (zabezpieczenie przed zerowaniem mianownika) */
    setAlpha(value: number): void {
        this.raw.set(PropertyType.Alpha, value);
    }
    /** Ustawia parametr gamma w algorytmie Kaczmarza (dynamika zmian oszacowania a i b) */
    setGamma(value: number): void {
        this.raw.set(PropertyType.Gamma, value);
    }
    /** Ustawia tryb pracy regulatora: ręczny PID lub automatyczny algorytm Kaczmarza */
    setMode(value: ModeType): void {
        this.raw.set(PropertyType.Mode, value);
    }
    /** Ustawia parametr a w algorytmie Kaczmarza */
    setA(value: number): void {
        this.raw.set(PropertyType.A, value);
    }
    /** Ustawia parametr b w algorytmie Kaczmarza */
    setB(value: number): void {
        this.raw.set(PropertyType.B, value);
    }
}

class PIDcontrollerRemote implements IPIDcontroller {
    constructor(private objectName: string, private gate: RemoteGate) {

    }

    /**
     * Zdarzenie wywoływane w momencie zmiany wartości cechy ControlOut
     * @param callback
     */
    addOnChange(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane w momencie uruchomienia regulatora
     * @param callback
     */
    addOnStart(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane przy zablokowaniu pracy
     * @param callback
     */
    addOnStop(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane w momencie przełączenia wartości cechy ControlOut na 1
     * @param callback
     */
    addOnOutOn(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane w momencie przełączenia wartości cechy ControlOut na 0
     * @param callback
     */
    addOnOutOff(_callback: () => void): void {
        // Remote events are not supported
    }

    /**
     * Podanie nowej wartości wejścia dla sterownika (pętla sprzężenia zwrotnego)
     * @param {number} value
     */
    source(value: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.Source)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Przełącza w stan aktywny (State=1) */
    start(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.Start)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Przełącza w stan zatrzymania (State=0) */
    stop(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.Stop)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Wartość wyjścia sterującego (binarna, przełączana w cyklu określonym przez SwitchTime)
     * @returns {number}
     */
    get controlOut(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.ControlOut)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Stan działania regulatora: 1 - aktywny, 0 - nieaktywny
     * @returns {number}
     */
    get state(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.State)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Ustawia wartość regulatora - wartość docelowa
     * @returns {number}
     */
    get setPoint(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.SetPoint)
            .build();
        return this.gate.runScript(cmd!);
    }

    set setPoint(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.SetPoint)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Wzmocnienie członu proporcjonalnego regulatora PID
     * @returns {number}
     */
    get kp(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Kp)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Wzmocnienie członu całkującego regulatora PID
     * @returns {number}
     */
    get ki(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Ki)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Wzmocnienie członu różniczkującego regulatora PID
     * @returns {number}
     */
    get kd(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Kd)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Czas przełączenia
     * @returns {number}
     */
    get switchTime(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.SwitchTime)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Parametr alpha w algorytmie Kaczmarza (zabezpieczenie przed dzieleniem przez 0)
     * @returns {number}
     */
    get alpha(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Alpha)
            .build();
        return this.gate.runScript(cmd!);
    }

    set alpha(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Alpha)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Parametr gamma w algorytmie Kaczmarza (dynamika zmian oszacowania a i b)
     * @returns {number}
     */
    get gamma(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Gamma)
            .build();
        return this.gate.runScript(cmd!);
    }

    set gamma(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Gamma)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Tryb pracy regulatora: 1 - ręczny PID, 2 - automatyczny algorytm Kaczmarza/
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
     * Parametr a w algorytmie Kaczmarza
     * @returns {number}
     */
    get a(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.A)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Parametr b w algorytmie Kaczmarza
     * @returns {number}
     */
    get b(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.B)
            .build();
        return this.gate.runScript(cmd!);
    }

    /** Ustawia wartość wzmocnienia członu proporcjonalnego regulatora PID */
    setKp(value: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Kp)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
    /** Ustawia wartość wzmocnienia członu całkującego regulatora PID */
    setKi(value: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Ki)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
    /** Ustawia wartość wzmocnienia członu różniczkującego regulatora PID */
    setKd(value: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Kd)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
    /** Ustawia czas przełączania */
    setSwitchTime(value: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.SwitchTime)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
    /** Ustawia parametr alpha w algorytmie Kaczmarza (zabezpieczenie przed zerowaniem mianownika) */
    setAlpha(value: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Alpha)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
    /** Ustawia parametr gamma w algorytmie Kaczmarza (dynamika zmian oszacowania a i b) */
    setGamma(value: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Gamma)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
    /** Ustawia tryb pracy regulatora: ręczny PID lub automatyczny algorytm Kaczmarza */
    setMode(value: ModeType): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Mode)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
    /** Ustawia parametr a w algorytmie Kaczmarza */
    setA(value: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.A)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
    /** Ustawia parametr b w algorytmie Kaczmarza */
    setB(value: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.B)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
}

export {
    PIDcontroller, PIDcontrollerRaw, PIDcontrollerRemote, ModeType
}
