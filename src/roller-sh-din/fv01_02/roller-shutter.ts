// Created from: src/interfaces/module_2_0_ROLLER_SHUTTER_DIN_fv01_02.xml, object name="ROLLER_SHUTTER"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum StateType {
    Stop = 0,
    Up = 1,
    Down = 2,
}

enum RelayStateType {
    Off = 0,
    On = 1,
}

enum VoltageType {
    AC = 0,
    DC = 1,
}

enum EventType {
    OnStateChange = 0,
    OnUp = 1,
    OnDown = 2,
    OnStart = 3,
    OnStop = 4,
    OnOvercurrent = 5,
}

enum PropertyType {
    State = 0,
    MaxTime = 1,
    LoadCurrent = 2,
    Up = 3,
    Down = 4,
    Overcurrent = 5,
    VoltageType = 6,
}

enum MethodType {
    MoveUp = 0,
    MoveDown = 1,
    Start = 2,
    Stop = 3,
    Hold = 4,
    HoldUp = 5,
    HoldDown = 6,
}

declare class RollerShutterRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): void;
}

interface IRollerShutter {
    /**
     * Zdarzenie wywoływane w momencie zmiany cechy State
     * @param callback
     */
    addOnStateChange: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane w momencie zmiany stanu ze Stop na Up
     * @param callback
     */
    addOnUp: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane w momencie zmiany stanu ze Stop na Down
     * @param callback
     */
    addOnDown: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po uruchomieniu rolety
     * @param callback
     */
    addOnStart: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po zatrzymaniu rolety
     * @param callback
     */
    addOnStop: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane, gdy prąd obciążenia przekroczy wartość Overcurrent
     * @param callback
     */
    addOnOvercurrent: (callback: () => void) => void
    /**
     * Stan wyjścia:
     * 0 - stoi,
     * 1 - ruch w górę,
     * 2 - ruch w dół
     */
    readonly state: StateType
    /** Domyślna wartość parametru Time, jeśli wpisano 0 */
    maxTime: number
    /** Aktualny prąd obciążenia */
    readonly loadCurrent: number
    /** Stan przekaźnika UP */
    readonly up: RelayStateType
    /** Stan przekaźnika DOWN */
    readonly down: RelayStateType
    /** Wartość prądu obciążenia, po przekroczeniu której generowane jest zdarzenie OnOvercurrent */
    overcurrent: number
    /**
     * Rodzaj napięcia obciążenia:
     * 0 - AC,
     * 1 - DC
     */
    voltageType: VoltageType
    /**
     * Roleta do góry. Parametr Time to czas przez jaki roleta ma się otwierać:
     * num - czas otwierania,
     * 0 - czas otwierania równy MaxTime
     * @param {number} miliseconds
     */
    moveUp: (miliseconds: number) => void
    /**
     * Roleta w dół. Parametr Time to czas przez jaki roleta ma się zamykać:
     * num - czas zamykania,
     * 0 - czas zamykania równy MaxTime
     * @param {number} miliseconds
     */
    moveDown: (miliseconds: number) => void
    /**
     * Roleta do góry jeśli poprzednio ruch w dół, roleta w dół jeśli poprzednio ruch w górę. Parametr Time to czas jazdy rolety:
     * num - czas jazdy,
     * 0 - czas jazdy rolety równy MaxTime
     * @param {number} miliseconds
     */
    start: (miliseconds: number) => void
    /** Stop jeśli roleta jest w ruchu */
    stop: () => void
    /** Hold z odwracaniem kierunku */
    hold: () => void
    /** Hold zawsze w górę */
    holdUp: () => void
    /** Hold zawsze w dół */
    holdDown: () => void
}

class RollerShutter implements IRollerShutter {
    private onStateChangeCallbacks: Array<() => void> = [];
    private onUpCallbacks: Array<() => void> = [];
    private onDownCallbacks: Array<() => void> = [];
    private onStartCallbacks: Array<() => void> = [];
    private onStopCallbacks: Array<() => void> = [];
    private onOvercurrentCallbacks: Array<() => void> = [];

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
        this.raw.add_event(EventType.OnOvercurrent, () => {
            this.onOvercurrentCallbacks.forEach(callback => { callback(); });
        });
    }

    addOnStateChange(callback: () => void): void {
        this.onStateChangeCallbacks.push(callback);
    }
    addOnUp(callback: () => void): void {
        this.onUpCallbacks.push(callback);
    }
    addOnDown(callback: () => void): void {
        this.onDownCallbacks.push(callback);
    }
    addOnStart(callback: () => void): void {
        this.onStartCallbacks.push(callback);
    }
    addOnStop(callback: () => void): void {
        this.onStopCallbacks.push(callback);
    }
    addOnOvercurrent(callback: () => void): void {
        this.onOvercurrentCallbacks.push(callback);
    }
    get state(): StateType {
        return this.raw.get(PropertyType.State);
    }
    get maxTime(): number {
        return this.raw.get(PropertyType.MaxTime);
    }
    set maxTime(value: number) {
        this.raw.set(PropertyType.MaxTime, value);
    }
    get loadCurrent(): number {
        return this.raw.get(PropertyType.LoadCurrent);
    }
    get up(): RelayStateType {
        return this.raw.get(PropertyType.Up);
    }
    get down(): RelayStateType {
        return this.raw.get(PropertyType.Down);
    }
    get overcurrent(): number {
        return this.raw.get(PropertyType.Overcurrent);
    }
    set overcurrent(value: number) {
        this.raw.set(PropertyType.Overcurrent, value);
    }
    get voltageType(): VoltageType {
        return this.raw.get(PropertyType.VoltageType);
    }
    set voltageType(value: VoltageType) {
        this.raw.set(PropertyType.VoltageType, value);
    }
    moveUp(miliseconds: number): void {
        this.raw.execute(MethodType.MoveUp, miliseconds);
    }
    moveDown(miliseconds: number): void {
        this.raw.execute(MethodType.MoveDown, miliseconds);
    }
    start(miliseconds: number): void {
        this.raw.execute(MethodType.Start, miliseconds);
    }
    stop(): void {
        this.raw.execute(MethodType.Stop);
    }
    hold(): void {
        this.raw.execute(MethodType.Hold);
    }
    holdUp(): void {
        this.raw.execute(MethodType.HoldUp);
    }
    holdDown(): void {
        this.raw.execute(MethodType.HoldDown);
    }
}

class RollerShutterRemote implements IRollerShutter {
    constructor(private objectName: string, private gate: RemoteGate) {
    }

    addOnStateChange(_callback: () => void): void {
        // Remote events are not supported
    }
    addOnUp(_callback: () => void): void {
        // Remote events are not supported
    }
    addOnDown(_callback: () => void): void {
        // Remote events are not supported
    }
    addOnStart(_callback: () => void): void {
        // Remote events are not supported
    }
    addOnStop(_callback: () => void): void {
        // Remote events are not supported
    }
    addOnOvercurrent(_callback: () => void): void {
        // Remote events are not supported
    }

    get state(): StateType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.State)
            .build();
        return this.gate.runScript(cmd!);
    }
    get maxTime(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.MaxTime)
            .build();
        return this.gate.runScript(cmd!);
    }
    set maxTime(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.MaxTime)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
    get loadCurrent(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.LoadCurrent)
            .build();
        return this.gate.runScript(cmd!);
    }
    get up(): RelayStateType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Up)
            .build();
        return this.gate.runScript(cmd!);
    }
    get down(): RelayStateType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Down)
            .build();
        return this.gate.runScript(cmd!);
    }
    get overcurrent(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Overcurrent)
            .build();
        return this.gate.runScript(cmd!);
    }
    set overcurrent(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Overcurrent)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
    get voltageType(): VoltageType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.VoltageType)
            .build();
        return this.gate.runScript(cmd!);
    }
    set voltageType(value: VoltageType) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.VoltageType)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
    moveUp(miliseconds: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.MoveUp)
            .addParameter(miliseconds)
            .build();
        this.gate.runScript(cmd!);
    }
    moveDown(miliseconds: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.MoveDown)
            .addParameter(miliseconds)
            .build();
        this.gate.runScript(cmd!);
    }
    start(miliseconds: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.Start)
            .addParameter(miliseconds)
            .build();
        this.gate.runScript(cmd!);
    }
    stop(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.Stop)
            .build();
        this.gate.runScript(cmd!);
    }
    hold(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.Hold)
            .build();
        this.gate.runScript(cmd!);
    }
    holdUp(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.HoldUp)
            .build();
        this.gate.runScript(cmd!);
    }
    holdDown(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.HoldDown)
            .build();
        this.gate.runScript(cmd!);
    }
}

export { RollerShutter, RollerShutterRaw, RollerShutterRemote, StateType, RelayStateType, VoltageType }
