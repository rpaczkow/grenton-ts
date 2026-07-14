// Created from: src/interfaces/module_fakro_zwmr24_01.xml, object name="ZWAVE_ROLLER_SHUTTER"

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
    OUT1 = 0,
    OUT2 = 1,
    State = 2,
    Position = 4
}

enum MethodType {
    Up = 0,
    Down = 1,
    Start = 2,
    Stop = 3,
    Hold = 4,
    HoldUp = 5,
    HoldDown = 6,
    SetPosition = 7
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
    /** Zdarzenie wywoływane w momencie wywołania metody Start */
    addOnStart: (callback: () => void) => void
    /** Zdarzenie wywoływane w momencie wywołania metody Stop */
    addOnStop: (callback: () => void) => void
    /** Stan przekaźnika OUT1 */
    readonly out1: number
    /** Stan przekaźnika OUT2 */
    readonly out2: number
    /** Stan wyjścia:\n0 - stoi,\n1 - ruch w górę,\n2 - ruch w dół */
    readonly state: StateType
    /** Procentowe określenie otwarcia rolety:\n0% - pełne zamknięcie,\n100% - pełne otwarcie */
    readonly position: number
    /** Roleta do góry */
    up: () => void
    /** Roleta w dół. */
    down: () => void
    /** Roleta do góry jeśli poprzednio ruch w dół, roleta w dół jeśli poprzednio ruch w górę */
    start: () => void
    /** Stop jeśli roleta jest w ruchu */
    stop: () => void
    /** Hold z odwracaniem kierunku */
    hold: () => void
    /** Hold zawsze w górę */
    holdUp: () => void
    /** Hold zawsze w dół */
    holdDown: () => void
    /** Ustawienie w ilu procentach roleta jest otwarta:\n0% - roleta zamknięta,\n100% - roleta otwarta */
    setPosition: (position: number) => void
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

    get out1(): number { return this.raw.get(PropertyType.OUT1); }
    get out2(): number { return this.raw.get(PropertyType.OUT2); }
    get state(): StateType { return this.raw.get(PropertyType.State); }
    get position(): number { return this.raw.get(PropertyType.Position); }

    up(): void { this.raw.execute(MethodType.Up); }
    down(): void { this.raw.execute(MethodType.Down); }
    start(): void { this.raw.execute(MethodType.Start); }
    stop(): void { this.raw.execute(MethodType.Stop); }
    hold(): void { this.raw.execute(MethodType.Hold); }
    holdUp(): void { this.raw.execute(MethodType.HoldUp); }
    holdDown(): void { this.raw.execute(MethodType.HoldDown); }
    setPosition(position: number): void { this.raw.execute(MethodType.SetPosition, position); }
}

class ZwaveRollerShutterRemote implements IZwaveRollerShutter {
    constructor(private objectName: string, private gate: RemoteGate) {}

    addOnChange(_callback: () => void): void { /* Remote events are not supported */ }
    addOnUp(_callback: () => void): void { /* Remote events are not supported */ }
    addOnDown(_callback: () => void): void { /* Remote events are not supported */ }
    addOnStart(_callback: () => void): void { /* Remote events are not supported */ }
    addOnStop(_callback: () => void): void { /* Remote events are not supported */ }

    get out1(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.OUT1).build();
        return this.gate.runScript(cmd!);
    }
    get out2(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.OUT2).build();
        return this.gate.runScript(cmd!);
    }
    get state(): StateType {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.State).build();
        return this.gate.runScript(cmd!);
    }
    get position(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Position).build();
        return this.gate.runScript(cmd!);
    }

    up(): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.Up).build();
        this.gate.runScript(cmd!);
    }
    down(): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.Down).build();
        this.gate.runScript(cmd!);
    }
    start(): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.Start).build();
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
    setPosition(position: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SetPosition).addParameter(position).build();
        this.gate.runScript(cmd!);
    }
}

export { ZwaveRollerShutter, ZwaveRollerShutterRaw, ZwaveRollerShutterRemote, StateType }
