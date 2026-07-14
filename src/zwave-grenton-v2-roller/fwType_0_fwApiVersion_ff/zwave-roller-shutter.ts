// Created from: src/interfaces/module_grenton_v2_roller_zwave_ff.xml, object name="ZWAVE_ROLLER_SHUTTER"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum StateType {
    Stop = 0,
    Up = 1,
    Down = 2,
    Blocked = 3
}

enum ReversePositionType {
    No = 0,
    Yes = 1
}

enum EventType {
    OnChange = 0,
    OnUp = 1,
    OnDown = 2,
    OnStart = 3,
    OnStop = 4,
    OnLamelClosed = 5,
    OnLamelOpen = 6,
    OnPositionChange = 7,
    OnLamelPositionChange = 8
}

enum PropertyType {
    State = 2,
    Position = 4,
    LamelPosition = 6,
    LamelMoveTime = 7,
    MechanicalOffset = 8,
    BlindsUpMoveTime = 9,
    BlindsDownMoveTime = 10,
    ReversePosition = 11
}

enum MethodType {
    Up = 0,
    Down = 1,
    Start = 2,
    Stop = 3,
    Hold = 4,
    HoldUp = 5,
    HoldDown = 6,
    SetPosition = 7,
    SetLamelPosition = 9,
    SetLamelMovetime = 10,
    SetMechanicalOffset = 11,
    SetBlindsUpMaxTime = 12,
    SetBlindsDownMaxTime = 13,
    SetRollerBlocked = 14,
    LamelStart = 15
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
    /** Zdarzenie wywoływane, gdy lamele zostają zamknięte (wartość 90°) */
    addOnLamelClosed: (callback: () => void) => void
    /** Zdarzenie wywoływane, gdy lamele zostają otwarte (wartość 0°) */
    addOnLamelOpen: (callback: () => void) => void
    /** Zdarzenie wywoływane, gdy zmieniła się pozycja rolety */
    addOnPositionChange: (callback: () => void) => void
    /** Zdarzenie wywoływane, gdy zmieniła się pozycja lameli */
    addOnLamelPositionChange: (callback: () => void) => void
    /** Stan wyjścia:\n0 - stoi,\n1 - ruch w górę,\n2 - ruch w dół,\n3 - roleta zablokowana */
    readonly state: StateType
    /** Procentowe określenie otwarcia rolety: 0% - pełne zamknięcie, 100% - pełne otwarcie */
    readonly position: number
    /** Pozycja lameli rolety: 90 - pełne zamknięcie, 0 - pełne otwarcie */
    readonly lamelPosition: number
    /** Czas w milisekundach potrzebny do pełnego otwarcia / zamknięcia lamelek */
    readonly lamelMoveTime: number
    /** Czas kompensacji rozruchu napędu */
    readonly mechanicalOffset: number
    /** Czas w milisekundach potrzebny do pełnego otwarcia rolety */
    readonly blindsUpMoveTime: number
    /** Czas w milisekundach potrzebny do pełnego zamknięcia rolety */
    readonly blindsDownMoveTime: number
    /** Funkcja odwrócenia zakresu pozycji (0-100% na 100-0%):\n0 - Nie,\n1 - Tak */
    reversePosition: ReversePositionType
    /** Roleta do góry. */
    up: () => void
    /** Roleta w dół. */
    down: () => void
    /** Roleta do góry jeśli poprzednio ruch w dół, roleta w dół jeśli poprzednio ruch w górę. */
    start: () => void
    /** Stop jeśli roleta jest w ruchu */
    stop: () => void
    /** Hold z odwracaniem kierunku */
    hold: () => void
    /** Hold zawsze w górę */
    holdUp: () => void
    /** Hold zawsze w dół */
    holdDown: () => void
    /** Ustawienie w ilu procentach roleta jest otwarta: 0% - roleta zamknięta, 100% - roleta otwarta */
    setPosition: (position: number) => void
    /** Ustawia pozycję lameli */
    setLamelPosition: (position: number) => void
    /** Ustawia czas cyklu rolety */
    setLamelMovetime: (movetime: number) => void
    /** Ustawia czas kompensacji rozruchu napędu */
    setMechanicalOffset: (offset: number) => void
    /** Ustawia czas otwierania rolety */
    setBlindsUpMaxTime: (timeout: number) => void
    /** Ustawia czas zamykania rolety */
    setBlindsDownMaxTime: (timeout: number) => void
    /** Włącza / wyłącza możliwość sterowania roletą */
    setRollerBlocked: (state?: number) => void
    /** Zmienia pozycję lameli o 45° */
    lamelStart: () => void
}

class ZwaveRollerShutter implements IZwaveRollerShutter {
    private onChangeCallbacks: Array<() => void> = [];
    private onUpCallbacks: Array<() => void> = [];
    private onDownCallbacks: Array<() => void> = [];
    private onStartCallbacks: Array<() => void> = [];
    private onStopCallbacks: Array<() => void> = [];
    private onLamelClosedCallbacks: Array<() => void> = [];
    private onLamelOpenCallbacks: Array<() => void> = [];
    private onPositionChangeCallbacks: Array<() => void> = [];
    private onLamelPositionChangeCallbacks: Array<() => void> = [];

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
        this.raw.add_event(EventType.OnLamelClosed, () => {
            this.onLamelClosedCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnLamelOpen, () => {
            this.onLamelOpenCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnPositionChange, () => {
            this.onPositionChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnLamelPositionChange, () => {
            this.onLamelPositionChangeCallbacks.forEach(callback => { callback(); });
        });
    }

    addOnChange(callback: () => void): void { this.onChangeCallbacks.push(callback); }
    addOnUp(callback: () => void): void { this.onUpCallbacks.push(callback); }
    addOnDown(callback: () => void): void { this.onDownCallbacks.push(callback); }
    addOnStart(callback: () => void): void { this.onStartCallbacks.push(callback); }
    addOnStop(callback: () => void): void { this.onStopCallbacks.push(callback); }
    addOnLamelClosed(callback: () => void): void { this.onLamelClosedCallbacks.push(callback); }
    addOnLamelOpen(callback: () => void): void { this.onLamelOpenCallbacks.push(callback); }
    addOnPositionChange(callback: () => void): void { this.onPositionChangeCallbacks.push(callback); }
    addOnLamelPositionChange(callback: () => void): void { this.onLamelPositionChangeCallbacks.push(callback); }

    get state(): StateType { return this.raw.get(PropertyType.State); }
    get position(): number { return this.raw.get(PropertyType.Position); }
    get lamelPosition(): number { return this.raw.get(PropertyType.LamelPosition); }
    get lamelMoveTime(): number { return this.raw.get(PropertyType.LamelMoveTime); }
    get mechanicalOffset(): number { return this.raw.get(PropertyType.MechanicalOffset); }
    get blindsUpMoveTime(): number { return this.raw.get(PropertyType.BlindsUpMoveTime); }
    get blindsDownMoveTime(): number { return this.raw.get(PropertyType.BlindsDownMoveTime); }
    get reversePosition(): ReversePositionType { return this.raw.get(PropertyType.ReversePosition); }
    set reversePosition(val: ReversePositionType) { this.raw.set(PropertyType.ReversePosition, val); }

    up(): void { this.raw.execute(MethodType.Up); }
    down(): void { this.raw.execute(MethodType.Down); }
    start(): void { this.raw.execute(MethodType.Start); }
    stop(): void { this.raw.execute(MethodType.Stop); }
    hold(): void { this.raw.execute(MethodType.Hold); }
    holdUp(): void { this.raw.execute(MethodType.HoldUp); }
    holdDown(): void { this.raw.execute(MethodType.HoldDown); }
    setPosition(position: number): void { this.raw.execute(MethodType.SetPosition, position); }
    setLamelPosition(position: number): void { this.raw.execute(MethodType.SetLamelPosition, position); }
    setLamelMovetime(movetime: number): void { this.raw.execute(MethodType.SetLamelMovetime, movetime); }
    setMechanicalOffset(offset: number): void { this.raw.execute(MethodType.SetMechanicalOffset, offset); }
    setBlindsUpMaxTime(timeout: number): void { this.raw.execute(MethodType.SetBlindsUpMaxTime, timeout); }
    setBlindsDownMaxTime(timeout: number): void { this.raw.execute(MethodType.SetBlindsDownMaxTime, timeout); }
    setRollerBlocked(state: number = 0): void { this.raw.execute(MethodType.SetRollerBlocked, state); }
    lamelStart(): void { this.raw.execute(MethodType.LamelStart); }
}

class ZwaveRollerShutterRemote implements IZwaveRollerShutter {
    constructor(private objectName: string, private gate: RemoteGate) {}

    addOnChange(_callback: () => void): void { /* Remote events are not supported */ }
    addOnUp(_callback: () => void): void { /* Remote events are not supported */ }
    addOnDown(_callback: () => void): void { /* Remote events are not supported */ }
    addOnStart(_callback: () => void): void { /* Remote events are not supported */ }
    addOnStop(_callback: () => void): void { /* Remote events are not supported */ }
    addOnLamelClosed(_callback: () => void): void { /* Remote events are not supported */ }
    addOnLamelOpen(_callback: () => void): void { /* Remote events are not supported */ }
    addOnPositionChange(_callback: () => void): void { /* Remote events are not supported */ }
    addOnLamelPositionChange(_callback: () => void): void { /* Remote events are not supported */ }

    get state(): StateType {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.State).build();
        return this.gate.runScript(cmd!);
    }
    get position(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Position).build();
        return this.gate.runScript(cmd!);
    }
    get lamelPosition(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.LamelPosition).build();
        return this.gate.runScript(cmd!);
    }
    get lamelMoveTime(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.LamelMoveTime).build();
        return this.gate.runScript(cmd!);
    }
    get mechanicalOffset(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.MechanicalOffset).build();
        return this.gate.runScript(cmd!);
    }
    get blindsUpMoveTime(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.BlindsUpMoveTime).build();
        return this.gate.runScript(cmd!);
    }
    get blindsDownMoveTime(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.BlindsDownMoveTime).build();
        return this.gate.runScript(cmd!);
    }
    get reversePosition(): ReversePositionType {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.ReversePosition).build();
        return this.gate.runScript(cmd!);
    }
    set reversePosition(val: ReversePositionType) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.ReversePosition).addParameter(val).build();
        this.gate.runScript(cmd!);
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
    setLamelPosition(position: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SetLamelPosition).addParameter(position).build();
        this.gate.runScript(cmd!);
    }
    setLamelMovetime(movetime: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SetLamelMovetime).addParameter(movetime).build();
        this.gate.runScript(cmd!);
    }
    setMechanicalOffset(offset: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SetMechanicalOffset).addParameter(offset).build();
        this.gate.runScript(cmd!);
    }
    setBlindsUpMaxTime(timeout: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SetBlindsUpMaxTime).addParameter(timeout).build();
        this.gate.runScript(cmd!);
    }
    setBlindsDownMaxTime(timeout: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SetBlindsDownMaxTime).addParameter(timeout).build();
        this.gate.runScript(cmd!);
    }
    setRollerBlocked(state: number = 0): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SetRollerBlocked).addParameter(state).build();
        this.gate.runScript(cmd!);
    }
    lamelStart(): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.LamelStart).build();
        this.gate.runScript(cmd!);
    }
}

export { ZwaveRollerShutter, ZwaveRollerShutterRaw, ZwaveRollerShutterRemote, StateType, ReversePositionType }
