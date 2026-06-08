// Created from: src/interfaces/module_ROLLER_SH_WIFI_FM_fv01_02.xml, object name="ROLLER_SHUTTER"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum StateType {
    Stop = 0,
    Up = 1,
    Down = 2
}

enum EventType {
    OnStateChange = 0,
    OnUp = 1,
    OnDown = 2,
    OnStart = 3,
    OnStop = 4
}

enum PropertyType {
    State = 0,
    MaxTime = 1,
    Up = 3,
    Down = 4
}

enum MethodType {
    MoveUp = 0,
    MoveDown = 1,
    Start = 2,
    Stop = 3,
    Hold = 4,
    HoldUp = 5,
    HoldDown = 6
}

declare class RollerShutterRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface IRollerShutter {
    /** Zdarzenie wywoływane w momencie zmiany stanu wyjścia */
    addOnStateChange: (callback: () => void) => void
    /** Zdarzenie wywoływane w momencie zmiany stanu ze Stop na Up */
    addOnUp: (callback: () => void) => void
    /** Zdarzenie wywoływane w momencie zmiany stanu ze Stop na Down */
    addOnDown: (callback: () => void) => void
    /** Zdarzenie wywoływane po uruchomieniu rolety */
    addOnStart: (callback: () => void) => void
    /** Zdarzenie wywoływane po zatrzymaniu rolety */
    addOnStop: (callback: () => void) => void
    /** Roleta do góry. Parametr Time to czas przez jaki roleta ma się otwierać:\nnum - czas otwierania,\n0 - czas otwierania równy MaxTime */
    moveUp: (time: number) => void
    /** Roleta w dół. Parametr Time to czas przez jaki roleta ma się zamykać:\nnum - czas zamykania,\n0 - czas zamykania równy MaxTime */
    moveDown: (time: number) => void
    /** Roleta do góry jeśli poprzednio ruch w dół, roleta w dół jeśli poprzednio ruch w górę. Parametr Time to czas jazdy rolety:\nnum - czas jazdy,\n0 - czas jazdy rolety równy MaxTime */
    start: (time: number) => void
    /** Stop jeśli roleta jest w ruchu */
    stop: () => void
    /** Podtrzymanie ruchu rolety */
    hold: () => void
    /** Hold zawsze w górę */
    holdUp: () => void
    /** Hold zawsze w dół */
    holdDown: () => void
    /** Stan wyjścia:\n0 - stoi,\n1 - ruch w górę,\n2 - ruch w dół */
    readonly state: StateType
    /** Domyślna wartość parametru Time, jeśli wpisano 0 */
    maxTime: number
    /** Stan przekaźnika UP */
    readonly up: boolean
    /** Stan przekaźnika DOWN */
    readonly down: boolean
}

class RollerShutter implements IRollerShutter {
    private onStateChangeCallbacks: Array<() => void> = [];
    private onUpCallbacks: Array<() => void> = [];
    private onDownCallbacks: Array<() => void> = [];
    private onStartCallbacks: Array<() => void> = [];
    private onStopCallbacks: Array<() => void> = [];

    constructor(private raw: RollerShutterRaw) {
        this.raw.add_event(EventType.OnStateChange, () => {
            this.onStateChangeCallbacks.forEach(callback => { callback(); });
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

    addOnStateChange(callback: () => void): void { this.onStateChangeCallbacks.push(callback); }
    addOnUp(callback: () => void): void { this.onUpCallbacks.push(callback); }
    addOnDown(callback: () => void): void { this.onDownCallbacks.push(callback); }
    addOnStart(callback: () => void): void { this.onStartCallbacks.push(callback); }
    addOnStop(callback: () => void): void { this.onStopCallbacks.push(callback); }

    moveUp(time: number): void { this.raw.execute(MethodType.MoveUp, time); }
    moveDown(time: number): void { this.raw.execute(MethodType.MoveDown, time); }
    start(time: number): void { this.raw.execute(MethodType.Start, time); }
    stop(): void { this.raw.execute(MethodType.Stop); }
    hold(): void { this.raw.execute(MethodType.Hold); }
    holdUp(): void { this.raw.execute(MethodType.HoldUp); }
    holdDown(): void { this.raw.execute(MethodType.HoldDown); }

    get state(): StateType { return this.raw.get(PropertyType.State); }
    get maxTime(): number { return this.raw.get(PropertyType.MaxTime); }
    set maxTime(val: number) { this.raw.set(PropertyType.MaxTime, val); }
    get up(): boolean { return this.raw.get(PropertyType.Up) === 1; }
    get down(): boolean { return this.raw.get(PropertyType.Down) === 1; }
}

class RollerShutterRemote implements IRollerShutter {
    constructor(private objectName: string, private gate: RemoteGate) {}

    addOnStateChange(_callback: () => void): void { /* Remote events are not supported */ }
    addOnUp(_callback: () => void): void { /* Remote events are not supported */ }
    addOnDown(_callback: () => void): void { /* Remote events are not supported */ }
    addOnStart(_callback: () => void): void { /* Remote events are not supported */ }
    addOnStop(_callback: () => void): void { /* Remote events are not supported */ }

    moveUp(time: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.MoveUp).addParameter(time).build();
        this.gate.runScript(cmd!);
    }
    moveDown(time: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.MoveDown).addParameter(time).build();
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
    get up(): boolean {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Up).build();
        return this.gate.runScript(cmd!) === 1;
    }
    get down(): boolean {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Down).build();
        return this.gate.runScript(cmd!) === 1;
    }
}

export { RollerShutter, RollerShutterRaw, RollerShutterRemote, StateType }
