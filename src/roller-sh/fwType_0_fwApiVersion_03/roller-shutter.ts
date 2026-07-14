// Created from: src/interfaces/module_roller_sh_fv03_0.xml, object name="ROLLER_SH"

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
    M0 = 0,
    M1 = 1,
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

declare class RollerShRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface IRollerSh {
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
    /** Roleta do góry. Parametr Time to czas przez jaki roleta ma się otwierać. num - czas otwierania, 0 - czas otwierania równy MaxTime */
    up: (time: number) => void
    /** Roleta w dół. Parametr Time to czas przez jaki roleta ma się zamykać. num - czas zamykania, 0 - czas zamykania równy MaxTime */
    down: (time: number) => void
    /** Roleta do góry jeśli poprzednio ruch w dół, roleta w dół jeśli poprzednio ruch w górę. Parametr Time to czas przez jaki roleta ma być w ruchu. num - czas jazdy rolety, 0 - czas jazdy równy MaxTime */
    start: (time: number) => void
    /** Stop jeśli roleta jest w ruchu */
    stop: () => void
    /** Hold z odwracaniem kierunku */
    hold: () => void
    /** Hold zawsze w górę */
    holdUp: () => void
    /** Hold zawsze w dół */
    holdDown: () => void
    /** Stan przekaźnika M0 */
    readonly m0: boolean
    /** Stan przekaźnika M1 */
    readonly m1: boolean
    /** Stan wyjścia:\n0 - stoi, \n1 - ruch w górę, \n2 - ruch w dół */
    readonly state: StateType
    /** Domyślna wartość parametru Time, jeśli wpisano 0 */
    maxTime: number
}

class RollerSh implements IRollerSh {
    private onChangeCallbacks: Array<() => void> = [];
    private onUpCallbacks: Array<() => void> = [];
    private onDownCallbacks: Array<() => void> = [];
    private onStartCallbacks: Array<() => void> = [];
    private onStopCallbacks: Array<() => void> = [];

    constructor(private raw: RollerShRaw) {
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

    up(time: number): void { this.raw.execute(MethodType.Up, time); }
    down(time: number): void { this.raw.execute(MethodType.Down, time); }
    start(time: number): void { this.raw.execute(MethodType.Start, time); }
    stop(): void { this.raw.execute(MethodType.Stop); }
    hold(): void { this.raw.execute(MethodType.Hold); }
    holdUp(): void { this.raw.execute(MethodType.HoldUp); }
    holdDown(): void { this.raw.execute(MethodType.HoldDown); }

    get m0(): boolean { return this.raw.get(PropertyType.M0) === 1; }
    get m1(): boolean { return this.raw.get(PropertyType.M1) === 1; }
    get state(): StateType { return this.raw.get(PropertyType.State); }
    get maxTime(): number { return this.raw.get(PropertyType.MaxTime); }
    set maxTime(val: number) { this.raw.set(PropertyType.MaxTime, val); }
}

class RollerShRemote implements IRollerSh {
    constructor(private objectName: string, private gate: RemoteGate) {}

    addOnChange(_callback: () => void): void { /* Remote events are not supported */ }
    addOnUp(_callback: () => void): void { /* Remote events are not supported */ }
    addOnDown(_callback: () => void): void { /* Remote events are not supported */ }
    addOnStart(_callback: () => void): void { /* Remote events are not supported */ }
    addOnStop(_callback: () => void): void { /* Remote events are not supported */ }

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

    get m0(): boolean {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.M0).build();
        return this.gate.runScript(cmd!) === 1;
    }
    get m1(): boolean {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.M1).build();
        return this.gate.runScript(cmd!) === 1;
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
}

export { RollerSh, RollerShRaw, RollerShRemote, StateType }
