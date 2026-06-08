// Created from: src/interfaces/module_2_0_ROLLER_SHUTTER_DIN_fv02_02.xml, object name="ROLLER_SHUTTER"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnStateChange = 0,
    OnUp = 1,
    OnDown = 2,
    OnStart = 3,
    OnStop = 4,
    OnOvercurrent = 5,
    OnLamelClosed = 6,
    OnLamelOpen = 7,
}

enum PropertyType {
    State = 0,
    LoadCurrent = 2,
    Up = 3,
    Down = 4,
    Overcurrent = 5,
    VoltageType = 6,
    Position = 7,
    LamelPosition = 8,
    MaxTime = 9,
    LamelMoveTimeout = 10,
    DistributedLogicGroup = 11,
}

enum MethodType {
    MoveUp = 0,
    MoveDown = 1,
    Start = 2,
    Stop = 3,
    Hold = 4,
    HoldUp = 5,
    HoldDown = 6,
    Calibration = 8,
    SetLamelPosition = 9,
    SetMaxTime = 9,
    SetPosition = 10,
    SetLamelMoveTimeout = 10,
    SetRollerBlocked = 13,
    LamelStart = 14,
}

enum StateType {
    Stop = 0,
    Up = 1,
    Down = 2,
    Blocked = 3,
}

enum CalibrationDirectionType {
    Down = 0,
    Up = 1,
}

enum RollerBlockedStateType {
    UnBlocked = 0,
    Blocked = 1,
}

enum VoltageType {
    AC = 0,
    DC = 1,
}

declare class RollerShutterRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
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
     * Zdarzenie wywoływane, gdy lamele zostają zamknięte (wartość 90°)
     * @param callback
     */
    addOnLamelClosed: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane, gdy lamele zostają otwarte (wartość 0°)
     * @param callback
     */
    addOnLamelOpen: (callback: () => void) => void
    /**
     * Roleta do góry lub stop. Parametr Time to czas przez jaki roleta ma się otwierać: num - czas otwierania (lub do pełnego otwarcia), 0 - czas otwierania równy MaxTime + LamelMoveTimeout (lub do pełnego otwarcia)
     * @param {number} miliseconds
     */
    moveUp: (miliseconds: number) => void
    /**
     * Roleta w dół lub stop. Parametr Time to czas przez jaki roleta ma się zamykać: num - czas zamykania (lub do pełnego zamknięcia), 0 - czas zamykania równy MaxTime + LamelMoveTimeout (lub do pełnego zamknięcia)
     * @param {number} miliseconds
     */
    moveDown: (miliseconds: number) => void
    /**
     * Roleta do góry jeśli poprzednio ruch w dół, roleta w dół jeśli poprzednio ruch w górę. Parametr Time to czas jazdy rolety: num - czas jazdy (lub do osiągnięcia pozycji krańcowej), 0 - czas jazdy równy MaxTime + LamelMoveTimeout (lub do osiągnięcia pozycji krańcowej)
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
    /**
     * Kalibruje pozycję rolety
     * @param {CalibrationDirectionType} direction
     */
    calibration: (direction: CalibrationDirectionType) => void
    /**
     * Ustawienie w ilu procentach roleta jest otwarta: 0% - roleta zamknięta, 100% - roleta otwarta
     * @param {number} position
     */
    setPosition: (position: number) => void
    /**
     * Ustawia pozycję lameli
     * @param {number} position
     */
    setLamelPosition: (position: number) => void
    /**
     * Ustawia czas cyklu rolety
     * @param {number} timeout
     */
    setMaxTime: (timeout: number) => void
    /**
     * Ustawia czas cyklu lameli
     * @param {number} timeout
     */
    setLamelMoveTimeout: (timeout: number) => void
    /**
     * Włącza / wyłącza możliwość sterowania roletą
     * @param {RollerBlockedStateType} state
     * @returns {boolean}
     */
    setRollerBlocked: (state: RollerBlockedStateType) => boolean
    /** Zmienia pozycję lameli o 45° */
    lamelStart: () => void
    /** Stan wyjścia: 0 - stoi, 1 - ruch w górę, 2 - ruch w dół, 3 - roleta zablokowana */
    readonly state: StateType
    /** Aktualny prąd obciążenia */
    readonly loadCurrent: number
    /** Stan przekaźnika UP */
    readonly up: boolean
    /** Stan przekaźnika DOWN */
    readonly down: boolean
    /** Wartość prądu obciążenia, po przekroczeniu której generowane jest zdarzenie OnOvercurrent */
    overcurrent: number
    /**
     * Rodzaj napięcia obciążenia:
     * 0 - AC,
     * 1 - DC
     */
    voltageType: VoltageType
    /** Procentowe określenie otwarcia rolety: 0% - pełne zamknięcie, 100% - pełne otwarcie */
    readonly position: number
    /** Pozycja lameli rolety: 90 - pełne zamknięcie, 0 - pełne otwarcie */
    readonly lamelPosition: number
    /** Czas w milisekundach potrzebny do pełnego otwarcia / zamknięcia rolety */
    maxTime: number
    /** Maksymalny czas cyklu pracy lameli rolety, jeśli roleta nie posiada lameli powinien być ustawiony na 0 */
    lamelMoveTimeout: number
    /** Grupa Distributed Logic - grupa broadcastowa dla rozproszonej logiki */
    distributedLogicGroup: number
}

class RollerShutter implements IRollerShutter {
    private onStateChangeCallbacks: Array<() => void> = [];
    private onUpCallbacks: Array<() => void> = [];
    private onDownCallbacks: Array<() => void> = [];
    private onStartCallbacks: Array<() => void> = [];
    private onStopCallbacks: Array<() => void> = [];
    private onOvercurrentCallbacks: Array<() => void> = [];
    private onLamelClosedCallbacks: Array<() => void> = [];
    private onLamelOpenCallbacks: Array<() => void> = [];

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
        this.raw.add_event(EventType.OnLamelClosed, () => {
            this.onLamelClosedCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnLamelOpen, () => {
            this.onLamelOpenCallbacks.forEach(callback => { callback(); });
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
    addOnLamelClosed(callback: () => void): void {
        this.onLamelClosedCallbacks.push(callback);
    }
    addOnLamelOpen(callback: () => void): void {
        this.onLamelOpenCallbacks.push(callback);
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
    calibration(direction: CalibrationDirectionType): void {
        this.raw.execute(MethodType.Calibration, direction);
    }
    setPosition(position: number): void {
        this.raw.execute(MethodType.SetPosition, position);
    }
    setLamelPosition(position: number): void {
        this.raw.execute(MethodType.SetLamelPosition, position);
    }
    setMaxTime(timeout: number): void {
        this.raw.set(PropertyType.MaxTime, timeout);
    }
    setLamelMoveTimeout(timeout: number): void {
        this.raw.set(PropertyType.LamelMoveTimeout, timeout);
    }
    setRollerBlocked(state: RollerBlockedStateType): boolean {
        return this.raw.execute(MethodType.SetRollerBlocked, state) === 1;
    }
    lamelStart(): void {
        this.raw.execute(MethodType.LamelStart);
    }
    get state(): StateType {
        return this.raw.get(PropertyType.State);
    }
    get loadCurrent(): number {
        return this.raw.get(PropertyType.LoadCurrent);
    }
    get up(): boolean {
        return this.raw.get(PropertyType.Up) === 1;
    }
    get down(): boolean {
        return this.raw.get(PropertyType.Down) === 1;
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
    get position(): number {
        return this.raw.get(PropertyType.Position);
    }
    get lamelPosition(): number {
        return this.raw.get(PropertyType.LamelPosition);
    }
    get maxTime(): number {
        return this.raw.get(PropertyType.MaxTime);
    }
    set maxTime(value: number) {
        this.raw.set(PropertyType.MaxTime, value);
    }
    get lamelMoveTimeout(): number {
        return this.raw.get(PropertyType.LamelMoveTimeout);
    }
    set lamelMoveTimeout(value: number) {
        this.raw.set(PropertyType.LamelMoveTimeout, value);
    }
    get distributedLogicGroup(): number {
        return this.raw.get(PropertyType.DistributedLogicGroup);
    }
    set distributedLogicGroup(value: number) {
        this.raw.set(PropertyType.DistributedLogicGroup, value);
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
    addOnLamelClosed(_callback: () => void): void {
        // Remote events are not supported
    }
    addOnLamelOpen(_callback: () => void): void {
        // Remote events are not supported
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
    calibration(direction: CalibrationDirectionType): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.Calibration)
            .addParameter(direction)
            .build();
        this.gate.runScript(cmd!);
    }
    setPosition(position: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.SetPosition)
            .addParameter(position)
            .build();
        this.gate.runScript(cmd!);
    }
    setLamelPosition(position: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.SetLamelPosition)
            .addParameter(position)
            .build();
        this.gate.runScript(cmd!);
    }
    setMaxTime(timeout: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.MaxTime)
            .addParameter(timeout)
            .build();
        this.gate.runScript(cmd!);
    }
    setLamelMoveTimeout(timeout: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.LamelMoveTimeout)
            .addParameter(timeout)
            .build();
        this.gate.runScript(cmd!);
    }
    setRollerBlocked(state: RollerBlockedStateType): boolean {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.SetRollerBlocked)
            .addParameter(state)
            .build();
        return this.gate.runScript(cmd!) === 1;
    }
    lamelStart(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.LamelStart)
            .build();
        this.gate.runScript(cmd!);
    }
    get state(): StateType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.State)
            .build();
        return this.gate.runScript(cmd!);
    }
    get loadCurrent(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.LoadCurrent)
            .build();
        return this.gate.runScript(cmd!);
    }
    get up(): boolean {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Up)
            .build();
        return this.gate.runScript(cmd!) === 1;
    }
    get down(): boolean {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Down)
            .build();
        return this.gate.runScript(cmd!) === 1;
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
    get position(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Position)
            .build();
        return this.gate.runScript(cmd!);
    }
    get lamelPosition(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.LamelPosition)
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
    get lamelMoveTimeout(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.LamelMoveTimeout)
            .build();
        return this.gate.runScript(cmd!);
    }
    set lamelMoveTimeout(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.LamelMoveTimeout)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
    get distributedLogicGroup(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.DistributedLogicGroup)
            .build();
        return this.gate.runScript(cmd!);
    }
    set distributedLogicGroup(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.DistributedLogicGroup)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
}

export {
    RollerShutter, RollerShutterRaw, RollerShutterRemote,
    StateType, CalibrationDirectionType, RollerBlockedStateType, VoltageType
}
