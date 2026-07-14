// Created from: src/interfaces/module_fakro_ftp_v.xml, object name="ZWAVE_ROLLER_SHUTTER"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum StateType {
    Stop = 0,
    Up = 1,
    Down = 2
}

enum EventType {
    OnChange = 0,
    OnUp = 1,
    OnDown = 2,
    OnStart = 3,
    OnStop = 4
}

enum PropertyType {
    M1 = 0,
    M2 = 1,
    State = 2,
    MaxTime = 3
}

enum MethodType {
    Up = 0,
    Down = 1,
    Start = 2,
    Stop = 3,
    Hold = 4,
    HoldUp = 5,
    HoldDown = 6
}

declare class ZwaveRollerShutterRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface IZwaveRollerShutter {
    /** Zdarzenie wywoływane w momencie zmiany stanu wyjścia */
    addOnChange: (callback: () => void) => void
    /** Zdarzenie wywoływane w momencie zmiany stanu ze Stop na Up */
    addOnUp: (callback: () => void) => void
    /** Zdarzenie wywoływane w momencie zmiany stanu ze Stop na Down */
    addOnDown: (callback: () => void) => void
    /** Zdarzenie wywoływane w momencie wywołania komendy Start */
    addOnStart: (callback: () => void) => void
    /** Zdarzenie wywoływane w momencie wywołania komendy Stop */
    addOnStop: (callback: () => void) => void
    /** Stan przekaźnika M1 */
    readonly m1: number
    /** Stan przekaźnika M2 */
    readonly m2: number
    /** Stan wyjścia:\n0 - stoi, \n1 - ruch w górę, \n2 - ruch w dół */
    readonly state: StateType
    /** Domyślna wartość parametru Time, jeśli wpisano 0 */
    maxTime: number
    /** Okno do góry. Parametr Time to czas przez jaki okno ma się otwierać\nnum - czas otwierania, 0 - czas otwierania równy MaxTime */
    up: (time: number) => void
    /** Okno w dół. Parametr Time to czas przez jaki okno ma się zamykać\nnum - czas zamykania, 0 - czas zamykania równy MaxTime */
    down: (time: number) => void
    /** Okno do góry jeśli poprzednio ruch w dół, okno w dół jeśli poprzednio ruch w górę. Parametr Time to czas przez jaki okno ma być w ruchu\nnum - czas otwierania/zamykania okna, 0 - czas jazdy równy MaxTime */
    start: (time: number) => void
    /** Stop jeśli roleta jest w ruchu */
    stop: () => void
    /** Hold z odwracaniem kierunku */
    hold: () => void
    /** Hold zawsze w górę */
    holdUp: () => void
    /** Hold zawsze w dół */
    holdDown: () => void
}

class ZwaveRollerShutter implements IZwaveRollerShutter {
    private onChangeCallbacks: Array<() => void> = [];
    private onUpCallbacks: Array<() => void> = [];
    private onDownCallbacks: Array<() => void> = [];
    private onStartCallbacks: Array<() => void> = [];
    private onStopCallbacks: Array<() => void> = [];

    constructor(private raw: ZwaveRollerShutterRaw) {
        this.raw.add_event(EventType.OnChange, () => {
            this.onChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnUp, () => {
            this.onUpCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnDown, () => {
            this.onDownCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnStart, () => {
            this.onStartCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnStop, () => {
            this.onStopCallbacks.forEach(callback => { callback(); });
        });
    }

    addOnChange(callback: () => void): void { this.onChangeCallbacks.push(callback); }
    addOnUp(callback: () => void): void { this.onUpCallbacks.push(callback); }
    addOnDown(callback: () => void): void { this.onDownCallbacks.push(callback); }
    addOnStart(callback: () => void): void { this.onStartCallbacks.push(callback); }
    addOnStop(callback: () => void): void { this.onStopCallbacks.push(callback); }

    get m1(): number { return this.raw.get(PropertyType.M1); }
    get m2(): number { return this.raw.get(PropertyType.M2); }
    get state(): StateType { return this.raw.get(PropertyType.State); }
    get maxTime(): number { return this.raw.get(PropertyType.MaxTime); }
    set maxTime(val: number) { this.raw.set(PropertyType.MaxTime, val); }

    up(time: number): void { this.raw.execute(MethodType.Up, time); }
    down(time: number): void { this.raw.execute(MethodType.Down, time); }
    start(time: number): void { this.raw.execute(MethodType.Start, time); }
    stop(): void { this.raw.execute(MethodType.Stop); }
    hold(): void { this.raw.execute(MethodType.Hold); }
    holdUp(): void { this.raw.execute(MethodType.HoldUp); }
    holdDown(): void { this.raw.execute(MethodType.HoldDown); }
}

class ZwaveRollerShutterRemote implements IZwaveRollerShutter {
    constructor(private objectName: string, private gate: RemoteGate) {}

    addOnChange(_callback: () => void): void { /* Remote events are not supported */ }
    addOnUp(_callback: () => void): void { /* Remote events are not supported */ }
    addOnDown(_callback: () => void): void { /* Remote events are not supported */ }
    addOnStart(_callback: () => void): void { /* Remote events are not supported */ }
    addOnStop(_callback: () => void): void { /* Remote events are not supported */ }

    get m1(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.M1).build();
        return this.gate.runScript(cmd!);
    }
    get m2(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.M2).build();
        return this.gate.runScript(cmd!);
    }
    get state(): StateType {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.State).build();
        return this.gate.runScript(cmd!);
    }
    get maxTime(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.MaxTime).build();
        return this.gate.runScript(cmd!);
    }
    set maxTime(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.MaxTime).addParameter(val).build();
        this.gate.runScript(cmd!);
    }

    up(time: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.Up).addParameter(time).build();
        this.gate.runScript(cmd!);
    }
    down(time: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.Down).addParameter(time).build();
        this.gate.runScript(cmd!);
    }
    start(time: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.Start).addParameter(time).build();
        this.gate.runScript(cmd!);
    }
    stop(): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.Stop).build();
        this.gate.runScript(cmd!);
    }
    hold(): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.Hold).build();
        this.gate.runScript(cmd!);
    }
    holdUp(): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.HoldUp).build();
        this.gate.runScript(cmd!);
    }
    holdDown(): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.HoldDown).build();
        this.gate.runScript(cmd!);
    }
}

export { ZwaveRollerShutter, ZwaveRollerShutterRaw, ZwaveRollerShutterRemote, StateType }
