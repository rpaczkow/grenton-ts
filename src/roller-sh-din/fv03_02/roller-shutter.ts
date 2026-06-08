// Created from: src/interfaces/module_2_0_ROLLER_SHUTTER_DIN_fv03_02.xml, object name="ROLLER_SHUTTER"

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
    OnPositionChange = 8,
    OnLamelPositionChange = 9
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
    ReversePosition = 13,
    BlindsUpMaxTime = 14,
    BlindsDownMaxTime = 15,
    MechanicalOffset = 16,
    ReverseDirections = 17
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
    SetPosition = 10,
    SetRollerBlocked = 13,
    LamelStart = 14,
    SetLamelMoveTimeout = 10,
    SetBlindsUpMaxTime = 14,
    SetBlindsDownMaxTime = 15,
    SetMechanicalOffset = 16
}

enum StateType {
    Stop = 0,
    Up = 1,
    Down = 2,
    Blocked = 3,
    Calibration = 4
}

enum ReversePositionType {
    No = 0,
    Yes = 1
}

enum ReverseDirectionsType {
    Normal = 0,
    Reverse = 1
}

enum CalibrationDirectionType {
    Down = 0,
    Up = 1
}

enum RollerBlockedStateType {
    UnBlocked = 0,
    Blocked = 1
}

enum VoltageType {
    AC = 0,
    DC = 1
}

enum LamelPositionType {
    Default = 91,
    PreviousState = 92
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
     * Zdarzenie wywoływane, gdy zmieniła się pozycja rolety
     * @param callback
     */
    addOnPositionChange: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane, gdy zmieniła się pozycja lameli
     * @param callback
     */
    addOnLamelPositionChange: (callback: () => void) => void
    /**
     * Roleta do góry lub stop. Parametr Time to czas przez jaki roleta ma się otwierać: num - czas otwierania (lub do pełnego otwarcia), 0 - czas otwierania równy BlindsUpMaxTime + LamelMoveTimeout (lub do pełnego otwarcia)
     * @param {number} miliseconds
     */
    moveUp: (miliseconds: number) => void
    /**
     * Roleta w dół lub stop. Parametr Time to czas przez jaki roleta ma się zamykać: num - czas zamykania (lub do pełnego zamknięcia), 0 - czas zamykania równy BlindsDownMaxTime + LamelMoveTimeout (lub do pełnego zamknięcia)
     * @param {number} miliseconds
     */
    moveDown: (miliseconds: number) => void
    /**
     * Roleta do góry jeśli poprzednio ruch w dół, roleta w dół jeśli poprzednio ruch w górę. Parametr Time to czas jazdy rolety: num - czas jazdy (lub do osiągnięcia pozycji krańcowej), 0 - czas jazdy równy BlindsUpMaxTime/BlindsDownMaxTime + LamelMoveTimeout (lub do osiągnięcia pozycji krańcowej)
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
    setPosition: (position: number, lamel?: number) => void
    /**
     * Ustawia pozycję lameli
     * @param {number} position
     */
    setLamelPosition: (position: number) => void
    /**
     * Włącza / wyłącza możliwość sterowania roletą
     * @param {RollerBlockedStateType} state
     * @returns {boolean}
     */
    setRollerBlocked: (state: RollerBlockedStateType) => boolean
    /** Zmienia pozycję lameli o 45° */
    lamelStart: () => void
    /**
     * Ustawia czas cyklu lameli
     * @param {number} timeout
     */
    setLamelMoveTimeout: (timeout: number) => void
    /**
     * Ustawia czas otwierania rolety
     * @param {number} timeout
     */
    setBlindsUpMaxTime: (timeout: number) => void
    /**
     * Ustawia czas zamykania rolety
     * @param {number} timeout
     */
    setBlindsDownMaxTime: (timeout: number) => void
    /**
     * Ustawia czas kompensacji rozruchu napędu
     * @param {number} offset
     */
    setMechanicalOffset: (offset: number) => void
    /** Stan wyjścia: 0 - stoi, 1 - ruch w górę, 2 - ruch w dół, 3 - roleta zablokowana, 4 - kalibracja */
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
    /** Funkcja odwrócenia zakresu pozycji (0-100% na 100-0%): 0 - Nie, 1 - Tak */
    reversePosition: ReversePositionType
    /** Czas w milisekundach potrzebny do pełnego otwarcia rolety */
    blindsUpMaxTime: number
    /** Czas w milisekundach potrzebny do pełnego zamknięcia rolety */
    blindsDownMaxTime: number
    /** Czas kompensacji rozruchu napędu */
    mechanicalOffset: number
    /** Funkcja odwrócenia kierunku pracy rolety */
    reverseDirections: ReverseDirectionsType
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
    private onPositionChangeCallbacks: Array<() => void> = [];
    private onLamelPositionChangeCallbacks: Array<() => void> = [];

    constructor(private raw: RollerShutterRaw) {
        this.raw.add_event(EventType.OnStateChange, () => {
            this.onStateChangeCallbacks.forEach(callback => {
                callback();
            });
        });

        this.raw.add_event(EventType.OnUp, () => {
            this.onUpCallbacks.forEach(callback => {
                callback();
            });
        });

        this.raw.add_event(EventType.OnDown, () => {
            this.onDownCallbacks.forEach(callback => {
                callback();
            });
        });

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

        this.raw.add_event(EventType.OnOvercurrent, () => {
            this.onOvercurrentCallbacks.forEach(callback => {
                callback();
            });
        });

        this.raw.add_event(EventType.OnLamelClosed, () => {
            this.onLamelClosedCallbacks.forEach(callback => {
                callback();
            });
        });

        this.raw.add_event(EventType.OnLamelOpen, () => {
            this.onLamelOpenCallbacks.forEach(callback => {
                callback();
            });
        });

        this.raw.add_event(EventType.OnPositionChange, () => {
            this.onPositionChangeCallbacks.forEach(callback => {
                callback();
            });
        });

        this.raw.add_event(EventType.OnLamelPositionChange, () => {
            this.onLamelPositionChangeCallbacks.forEach(callback => {
                callback();
            });
        });
    }

    /**
     * Zdarzenie wywoływane w momencie zmiany cechy State
     * @param callback
     */
    addOnStateChange(callback: () => void): void {
        this.onStateChangeCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane w momencie zmiany stanu ze Stop na Up
     * @param callback
     */
    addOnUp(callback: () => void): void {
        this.onUpCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane w momencie zmiany stanu ze Stop na Down
     * @param callback
     */
    addOnDown(callback: () => void): void {
        this.onDownCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po uruchomieniu rolety
     * @param callback
     */
    addOnStart(callback: () => void): void {
        this.onStartCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po zatrzymaniu rolety
     * @param callback
     */
    addOnStop(callback: () => void): void {
        this.onStopCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane, gdy prąd obciążenia przekroczy wartość Overcurrent
     * @param callback
     */
    addOnOvercurrent(callback: () => void): void {
        this.onOvercurrentCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane, gdy lamele zostają zamknięte (wartość 90°)
     * @param callback
     */
    addOnLamelClosed(callback: () => void): void {
        this.onLamelClosedCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane, gdy lamele zostają otwarte (wartość 0°)
     * @param callback
     */
    addOnLamelOpen(callback: () => void): void {
        this.onLamelOpenCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane, gdy zmieniła się pozycja rolety
     * @param callback
     */
    addOnPositionChange(callback: () => void): void {
        this.onPositionChangeCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane, gdy zmieniła się pozycja lameli
     * @param callback
     */
    addOnLamelPositionChange(callback: () => void): void {
        this.onLamelPositionChangeCallbacks.push(callback);
    }
    /**
     * Roleta do góry lub stop. Parametr Time to czas przez jaki roleta ma się otwierać: num - czas otwierania (lub do pełnego otwarcia), 0 - czas otwierania równy BlindsUpMaxTime + LamelMoveTimeout (lub do pełnego otwarcia)
     * @param {number} miliseconds
     */
    moveUp(miliseconds: number): void {
        this.raw.execute(MethodType.MoveUp, miliseconds);
    }
    /**
     * Roleta w dół lub stop. Parametr Time to czas przez jaki roleta ma się zamykać: num - czas zamykania (lub do pełnego zamknięcia), 0 - czas zamykania równy BlindsDownMaxTime + LamelMoveTimeout (lub do pełnego zamknięcia)
     * @param {number} miliseconds
     */
    moveDown(miliseconds: number): void {
        this.raw.execute(MethodType.MoveDown, miliseconds);
    }
    /**
     * Roleta do góry jeśli poprzednio ruch w dół, roleta w dół jeśli poprzednio ruch w górę. Parametr Time to czas jazdy rolety: num - czas jazdy (lub do osiągnięcia pozycji krańcowej), 0 - czas jazdy równy BlindsUpMaxTime/BlindsDownMaxTime + LamelMoveTimeout (lub do osiągnięcia pozycji krańcowej)
     * @param {number} miliseconds
     */
    start(miliseconds: number): void {
        this.raw.execute(MethodType.Start, miliseconds);
    }
    /** Stop jeśli roleta jest w ruchu */
    stop(): void {
        this.raw.execute(MethodType.Stop);
    }
    /** Hold z odwracaniem kierunku */
    hold(): void {
        this.raw.execute(MethodType.Hold);
    }
    /** Hold zawsze w górę */
    holdUp(): void {
        this.raw.execute(MethodType.HoldUp);
    }
    /** Hold zawsze w dół */
    holdDown(): void {
        this.raw.execute(MethodType.HoldDown);
    }
    /**
     * Kalibruje pozycję rolety
     * @param {CalibrationDirectionType} direction
     */
    calibration(direction: CalibrationDirectionType): void {
        this.raw.execute(MethodType.Calibration, direction);
    }
    /**
     * Ustawienie w ilu procentach roleta jest otwarta: 0% - roleta zamknięta, 100% - roleta otwarta
     * @param {number} position
     */
    setPosition(position: number, lamelPosition?: number | LamelPositionType): void {
        if (lamelPosition !== undefined) {
            this.raw.execute(MethodType.SetPosition, position, lamelPosition);
        } else {
            this.raw.execute(MethodType.SetPosition, position);
        }
    }
    setLamelPosition: (position: number) => void = (position: number) => {
        this.raw.execute(MethodType.SetLamelPosition, position);
    }
    /**
     * Włącza / wyłącza możliwość sterowania roletą
     * @param {RollerBlockedStateType} state
     * @returns {boolean}
     */
    setRollerBlocked(state: RollerBlockedStateType): boolean {
        return this.raw.execute(MethodType.SetRollerBlocked, state) === 1;
    }
    /** Zmienia pozycję lameli o 45° */
    lamelStart(): void {
        this.raw.execute(MethodType.LamelStart);
    }
    /**
     * Ustawia czas cyklu lameli
     * @param {number} timeout
     */
    setLamelMoveTimeout(timeout: number): void {
        this.raw.set(PropertyType.LamelMoveTimeout, timeout);
    }
    /**
     * Ustawia czas otwierania rolety
     * @param {number} timeout
     */
    setBlindsUpMaxTime(timeout: number): void {
        this.raw.set(PropertyType.BlindsUpMaxTime, timeout);
    }
    /**
     * Ustawia czas zamykania rolety
     * @param {number} timeout
     */
    setBlindsDownMaxTime(timeout: number): void {
        this.raw.set(PropertyType.BlindsDownMaxTime, timeout);
    }
    /**
     * Ustawia czas kompensacji rozruchu napędu
     * @param {number} offset
     */
    setMechanicalOffset(offset: number): void {
        this.raw.set(PropertyType.MechanicalOffset, offset);
    }
    /**
     * Stan wyjścia: 0 - stoi, 1 - ruch w górę, 2 - ruch w dół, 3 - roleta zablokowana, 4 - kalibracja
     * @returns {StateType}
     */
    get state(): StateType {
        return this.raw.get(PropertyType.State);
    }
    /** Aktualny prąd obciążenia */
    get loadCurrent(): number {
        return this.raw.get(PropertyType.LoadCurrent);
    }
    /**
     * Stan przekaźnika UP
     * @returns {boolean}
     */
    get up(): boolean {
        return this.raw.get(PropertyType.Up) === 1;
    }
    /**
     * Stan przekaźnika DOWN
     * @returns {boolean}
     */
    get down(): boolean {
        return this.raw.get(PropertyType.Down) === 1;
    }
    /** Wartość prądu obciążenia, po przekroczeniu której generowane jest zdarzenie OnOvercurrent */
    get overcurrent(): number {
        return this.raw.get(PropertyType.Overcurrent);
    }
    set overcurrent(value: number) {
        this.raw.set(PropertyType.Overcurrent, value);
    }
    /**
     * Rodzaj napięcia obciążenia: 0 - AC, 1 - DC
     */
    get voltageType(): VoltageType {
        return this.raw.get(PropertyType.VoltageType);
    }
    set voltageType(value: VoltageType) {
        this.raw.set(PropertyType.VoltageType, value);
    }
    /**
     * Procentowe określenie otwarcia rolety: 0% - pełne zamknięcie, 100% - pełne otwarcie
     * @returns {number}
     */
    get position(): number {
        return this.raw.get(PropertyType.Position);
    }
    /**
     * Pozycja lameli rolety: 90 - pełne zamknięcie, 0 - pełne otwarcie
     * @returns {number}
     */
    get lamelPosition(): number {
        return this.raw.get(PropertyType.LamelPosition);
    }
    /**
     * Czas w milisekundach potrzebny do pełnego otwarcia / zamknięcia rolety
     * @returns {number}
     */
    get maxTime(): number {
        return this.raw.get(PropertyType.MaxTime);
    }
    set maxTime(value: number) {
        this.raw.set(PropertyType.MaxTime, value);
    }
    /**
     * Maksymalny czas cyklu pracy lameli rolety, jeśli roleta nie posiada lameli powinien być ustawiony na 0
     * @returns {number}
     */
    get lamelMoveTimeout(): number {
        return this.raw.get(PropertyType.LamelMoveTimeout);
    }
    set lamelMoveTimeout(value: number) {
        this.raw.set(PropertyType.LamelMoveTimeout, value);
    }
    /**
     * Grupa Distributed Logic - grupa broadcastowa dla rozproszonej logiki
     * @returns {number}
     */
    get distributedLogicGroup(): number {
        return this.raw.get(PropertyType.DistributedLogicGroup);
    }
    set distributedLogicGroup(value: number) {
        this.raw.set(PropertyType.DistributedLogicGroup, value);
    }
    /**
     * Funkcja odwrócenia zakresu pozycji (0-100% na 100-0%): 0 - Nie, 1 - Tak
     * @returns {ReversePositionType}
     */
    get reversePosition(): ReversePositionType {
        return this.raw.get(PropertyType.ReversePosition);
    }
    set reversePosition(value: ReversePositionType) {
        this.raw.set(PropertyType.ReversePosition, value);
    }
    /**
     * Czas w milisekundach potrzebny do pełnego otwarcia rolety
     * @returns {number}
     */
    get blindsUpMaxTime(): number {
        return this.raw.get(PropertyType.BlindsUpMaxTime);
    }
    set blindsUpMaxTime(value: number) {
        this.raw.set(PropertyType.BlindsUpMaxTime, value);
    }
    /**
     * Czas w milisekundach potrzebny do pełnego zamknięcia rolety
     * @returns {number}
     */
    get blindsDownMaxTime(): number {
        return this.raw.get(PropertyType.BlindsDownMaxTime);
    }
    set blindsDownMaxTime(value: number) {
        this.raw.set(PropertyType.BlindsDownMaxTime, value);
    }
    /**
     * Czas kompensacji rozruchu napędu
     * @returns {number}
     */
    get mechanicalOffset(): number {
        return this.raw.get(PropertyType.MechanicalOffset);
    }
    set mechanicalOffset(value: number) {
        this.raw.set(PropertyType.MechanicalOffset, value);
    }
    /**
     * Funkcja odwrócenia kierunku pracy rolety
     * @returns {ReverseDirectionsType}
     */
    get reverseDirections(): ReverseDirectionsType {
        return this.raw.get(PropertyType.ReverseDirections);
    }
    set reverseDirections(value: ReverseDirectionsType) {
        this.raw.set(PropertyType.ReverseDirections, value);
    }
}

class RollerShutterRemote implements IRollerShutter {
    constructor(private objectName: string, private gate: RemoteGate) {

    }

    /**
     * Zdarzenie wywoływane w momencie zmiany cechy State
     * @param callback
     */
    addOnStateChange(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane w momencie zmiany stanu ze Stop na Up
     * @param callback
     */
    addOnUp(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane w momencie zmiany stanu ze Stop na Down
     * @param callback
     */
    addOnDown(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane po uruchomieniu rolety
     * @param callback
     */
    addOnStart(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane po zatrzymaniu rolety
     * @param callback
     */
    addOnStop(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane, gdy prąd obciążenia przekroczy wartość Overcurrent
     * @param callback
     */
    addOnOvercurrent(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane, gdy lamele zostają zamknięte (wartość 90°)
     * @param callback
     */
    addOnLamelClosed(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane, gdy lamele zostają otwarte (wartość 0°)
     * @param callback
     */
    addOnLamelOpen(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane, gdy zmieniła się pozycja rolety
     * @param callback
     */
    addOnPositionChange(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane, gdy zmieniła się pozycja lameli
     * @param callback
     */
    addOnLamelPositionChange(_callback: () => void): void {
        // Remote events are not supported
    }

    /**
     * Roleta do góry lub stop. Parametr Time to czas przez jaki roleta ma się otwierać: num - czas otwierania (lub do pełnego otwarcia), 0 - czas otwierania równy BlindsUpMaxTime + LamelMoveTimeout (lub do pełnego otwarcia)
     * @param {number} miliseconds
     */
    moveUp(miliseconds: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.MoveUp)
            .addParameter(miliseconds)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Roleta w dół lub stop. Parametr Time to czas przez jaki roleta ma się zamykać: num - czas zamykania (lub do pełnego zamknięcia), 0 - czas zamykania równy BlindsDownMaxTime + LamelMoveTimeout (lub do pełnego zamknięcia)
     * @param {number} miliseconds
     */
    moveDown(miliseconds: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.MoveDown)
            .addParameter(miliseconds)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Roleta do góry jeśli poprzednio ruch w dół, roleta w dół jeśli poprzednio ruch w górę. Parametr Time to czas jazdy rolety: num - czas jazdy (lub do osiągnięcia pozycji krańcowej), 0 - czas jazdy równy BlindsUpMaxTime/BlindsDownMaxTime + LamelMoveTimeout (lub do osiągnięcia pozycji krańcowej)
     * @param {number} miliseconds
     */
    start(miliseconds: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.Start)
            .addParameter(miliseconds)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Stop jeśli roleta jest w ruchu */
    stop(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.Stop)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Hold z odwracaniem kierunku */
    hold(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.Hold)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Hold zawsze w górę */
    holdUp(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.HoldUp)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Hold zawsze w dół */
    holdDown(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.HoldDown)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Kalibruje pozycję rolety
     * @param {CalibrationDirectionType} direction
     */
    calibration(direction: CalibrationDirectionType): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.Calibration)
            .addParameter(direction)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Ustawienie w ilu procentach roleta jest otwarta: 0% - roleta zamknięta, 100% - roleta otwarta
     * @param {number} position
     */
    setPosition(position: number, lamel?: number | LamelPositionType): void {
        if (lamel !== undefined) {
            const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
                .execute()
                .addParameter(MethodType.SetPosition)
                .addParameter(position)
                .addParameter(lamel)
                .build();
            this.gate.runScript(cmd!);
        } else {
            const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
                .execute()
                .addParameter(MethodType.SetPosition)
                .addParameter(position)
                .build();
            this.gate.runScript(cmd!);
        }
    }

    /**
     * Ustawia pozycję lameli
     * @param {number} position
     */
    setLamelPosition(position: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.SetLamelPosition)
            .addParameter(position)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Włącza / wyłącza możliwość sterowania roletą
     * @param {RollerBlockedStateType} state
     * @returns {boolean}
     */
    setRollerBlocked(state: RollerBlockedStateType): boolean {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.SetRollerBlocked)
            .addParameter(state)
            .build();
        return this.gate.runScript(cmd!) === 1;
    }

    /** Zmienia pozycję lameli o 45° */
    lamelStart(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.LamelStart)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Ustawia czas cyklu lameli
     * @param {number} timeout
     */
    setLamelMoveTimeout(timeout: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.LamelMoveTimeout)
            .addParameter(timeout)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Ustawia czas otwierania rolety
     * @param {number} timeout
     */
    setBlindsUpMaxTime(timeout: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.BlindsUpMaxTime)
            .addParameter(timeout)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Ustawia czas zamykania rolety
     * @param {number} timeout
     */
    setBlindsDownMaxTime(timeout: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.BlindsDownMaxTime)
            .addParameter(timeout)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Ustawia czas kompensacji rozruchu napędu
     * @param {number} offset
     */
    setMechanicalOffset(offset: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.MechanicalOffset)
            .addParameter(offset)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Stan wyjścia: 0 - stoi, 1 - ruch w górę, 2 - ruch w dół, 3 - roleta zablokowana, 4 - kalibracja
     * @returns {StateType}
     */
    get state(): StateType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.State)
            .build();
        return this.gate.runScript(cmd!);
    }

    /** Aktualny prąd obciążenia */
    get loadCurrent(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.LoadCurrent)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Stan przekaźnika UP
     * @returns {boolean}
     */
    get up(): boolean {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Up)
            .build();
        return this.gate.runScript(cmd!) === 1;
    }

    /**
     * Stan przekaźnika DOWN
     * @returns {boolean}
     */
    get down(): boolean {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Down)
            .build();
        return this.gate.runScript(cmd!) === 1;
    }

    /** Wartość prądu obciążenia, po przekroczeniu której generowane jest zdarzenie OnOvercurrent */
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

    /**
     * Rodzaj napięcia obciążenia: 0 - AC, 1 - DC
     */
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

    /**
     * Procentowe określenie otwarcia rolety: 0% - pełne zamknięcie, 100% - pełne otwarcie
     * @returns {number}
     */
    get position(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Position)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Pozycja lameli rolety: 90 - pełne zamknięcie, 0 - pełne otwarcie
     * @returns {number}
     */
    get lamelPosition(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.LamelPosition)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Czas w milisekundach potrzebny do pełnego otwarcia / zamknięcia rolety
     * @returns {number}
     */
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

    /**
     * Maksymalny czas cyklu pracy lameli rolety, jeśli roleta nie posiada lameli powinien być ustawiony na 0
     * @returns {number}
     */
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

    /**
     * Grupa Distributed Logic - grupa broadcastowa dla rozproszonej logiki
     * @returns {number}
     */
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

    /**
     * Funkcja odwrócenia zakresu pozycji (0-100% na 100-0%): 0 - Nie, 1 - Tak
     * @returns {ReversePositionType}
     */
    get reversePosition(): ReversePositionType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.ReversePosition)
            .build();
        return this.gate.runScript(cmd!);
    }

    set reversePosition(value: ReversePositionType) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.ReversePosition)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Czas w milisekundach potrzebny do pełnego otwarcia rolety
     * @returns {number}
     */
    get blindsUpMaxTime(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.BlindsUpMaxTime)
            .build();
        return this.gate.runScript(cmd!);
    }

    set blindsUpMaxTime(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.BlindsUpMaxTime)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Czas w milisekundach potrzebny do pełnego zamknięcia rolety
     * @returns {number}
     */
    get blindsDownMaxTime(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.BlindsDownMaxTime)
            .build();
        return this.gate.runScript(cmd!);
    }

    set blindsDownMaxTime(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.BlindsDownMaxTime)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Czas kompensacji rozruchu napędu
     * @returns {number}
     */
    get mechanicalOffset(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.MechanicalOffset)
            .build();
        return this.gate.runScript(cmd!);
    }

    set mechanicalOffset(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.MechanicalOffset)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Funkcja odwrócenia kierunku pracy rolety
     * @returns {ReverseDirectionsType}
     */
    get reverseDirections(): ReverseDirectionsType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.ReverseDirections)
            .build();
        return this.gate.runScript(cmd!);
    }

    set reverseDirections(value: ReverseDirectionsType) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.ReverseDirections)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
}

export {
    RollerShutter, RollerShutterRaw, RollerShutterRemote,
    StateType, ReversePositionType, ReverseDirectionsType, CalibrationDirectionType, RollerBlockedStateType, LamelPositionType, VoltageType
}
