// Created from: packages/grenton-api/interfaces/object_coolmaster_v1.xml, object name="CoolMaster" version="1"

import { rawExecutionBuilderFactory } from "../../../core/execution-builder"
import { RemoteGate } from "../../../core/remote-gate"

enum EventType {
    OnConnected = 0,
    OnDisconnected = 1,
    OnChange = 2,
    OnModeChange = 3,
    OnTargetTempChange = 4,
    OnFanSpeedChange = 5,
    OnLouverPositionChange = 6,
    OnTurnOn = 7,
    OnTurnOff = 8,
    OnFailure = 9,
    OnDesynchronization = 10
}

enum PropertyType {
    CoolMasterNetID = 0,
    UIDs = 1,
    SupportedModes = 2,
    SupportedFanSpeeds = 3,
    SupportedLouverPositions = 4,
    Status = 5,
    State = 6,
    Mode = 7,
    TargetTemp = 8,
    FanSpeed = 9,
    LouverPosition = 10,
    AmbientTemp = 11,
    FailureCode = 12
}

enum MethodType {
    TurnOn = 0,
    TurnOff = 1,
    SwitchMode = 2
}

enum StateType {
    Off = 0,
    On = 1
}

enum ModeType {
    Cool = 1,
    Heat = 2,
    Fan = 3,
    Dry = 4,
    Auto = 5
}

enum FanSpeedType {
    VLow = 0,
    Low = 1,
    Med = 2,
    High = 3,
    Top = 4,
    Auto = 5
}

enum LouverPositionType {
    Auto = 1,
    Horizontal = 2,
    Angle30 = 3,
    Angle45 = 4,
    Angle60 = 5,
    Vertical = 6,
    Stopped = 7
}

declare class CoolMasterRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface ICoolMaster {
    /**
     * Zdarzenie wywoływane po nawiązaniu połączenia z jednostką
     * @param callback
     */
    addOnConnected: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po zerwaniu połączenia z jednostką
     * @param callback
     */
    addOnDisconnected: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po zmianie wartości State, Mode, TargetTemp, FanSpeed, LouverPosition
     * @param callback
     */
    addOnChange: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po zmianie wartości Mode
     * @param callback
     */
    addOnModeChange: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po zmianie wartości TargetTemp
     * @param callback
     */
    addOnTargetTempChange: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po zmianie wartości FanSpeed
     * @param callback
     */
    addOnFanSpeedChange: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po zmianie wartości LouverPosition
     * @param callback
     */
    addOnLouverPositionChange: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po włączeniu klimatyzatora lub grupy klimatyzatorów
     * @param callback
     */
    addOnTurnOn: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po wyłączeniu klimatyzatora lub grupy klimatyzatorów
     * @param callback
     */
    addOnTurnOff: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po wystąpieniu błędu
     * @param callback
     */
    addOnFailure: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po desynchronizacji cech klimatyzatorów należących do grupy
     * @param callback
     */
    addOnDesynchronization: (callback: () => void) => void
    /** Włącza klimatyzator lub grupę klimatyzatorów */
    turnOn: () => void
    /** Wyłącza klimatyzator lub grupę klimatyzatorów */
    turnOff: () => void
    /** Przełącza tryb pracy na kolejny */
    switchMode: () => void
    /** ID obiektu CoolMasterNet */
    coolMasterNetID: string
    uids: string
    /** Lista wspieranych trybów pracy oddzielonych przecinkiem */
    supportedModes: string
    /** Lista wspieranych prędkości wentylatora oddzielonych przecinkiem, wpisanie "-" oznacza brak wsparcia */
    supportedFanSpeeds: string
    /** Lista wspieranych pozycji żaluzji regulującej przepływ powietrza oddzielonych przecinkiem, wpisanie "-" oznacza brak wsparcia */
    supportedLouverPositions: string
    /** Stan połączenia: 0 - brak połączenia, 1 - połączono */
    readonly status: number
    /** Stan pracy: 1 - aktywny, 0 - zatrzymany, "-" - brak synchronizacji stanu */
    state: StateType
    /** Tryb pracy: 1 - chłodzenie, 2 - ogrzewanie, 3 - wentylator, 4 - suszenie, 5 - automatyczny, "-" - brak synchronizacji stanu */
    mode: ModeType
    /** Zadana temperatura "-" - brak synchronizacji stanu */
    targetTemp: number
    /** Prędkość wentylatora: 0-5, 5 - auto, "-" - brak synchronizacji stanu */
    fanSpeed: FanSpeedType
    /** Pozycja żaluzji regulującej przepływ powietrza: 0 - brak wsparcia, 1 - automatyczna, 2 - horyzontalna, 3 - 30°, 4 - 45°, 5 - 60°, 6 - wertykalna, 7 - zatrzymana, "-" - brak synchronizacji stanu */
    louverPosition: LouverPositionType
    /** Temperatura otoczenia lub wartość średnia temperatury w przypadku grupy urządzeń */
    readonly ambientTemp: string
    /** Kod błędu */
    readonly failureCode: string
}

class CoolMaster implements ICoolMaster {
    private onConnectedCallbacks: Array<() => void> = [];
    private onDisconnectedCallbacks: Array<() => void> = [];
    private onChangeCallbacks: Array<() => void> = [];
    private onModeChangeCallbacks: Array<() => void> = [];
    private onTargetTempChangeCallbacks: Array<() => void> = [];
    private onFanSpeedChangeCallbacks: Array<() => void> = [];
    private onLouverPositionChangeCallbacks: Array<() => void> = [];
    private onTurnOnCallbacks: Array<() => void> = [];
    private onTurnOffCallbacks: Array<() => void> = [];
    private onFailureCallbacks: Array<() => void> = [];
    private onDesynchronizationCallbacks: Array<() => void> = [];

    constructor(private raw: CoolMasterRaw) {
        this.raw.add_event(EventType.OnConnected, () => {
            this.onConnectedCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnDisconnected, () => {
            this.onDisconnectedCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnChange, () => {
            this.onChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnModeChange, () => {
            this.onModeChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnTargetTempChange, () => {
            this.onTargetTempChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnFanSpeedChange, () => {
            this.onFanSpeedChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnLouverPositionChange, () => {
            this.onLouverPositionChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnTurnOn, () => {
            this.onTurnOnCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnTurnOff, () => {
            this.onTurnOffCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnFailure, () => {
            this.onFailureCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnDesynchronization, () => {
            this.onDesynchronizationCallbacks.forEach(callback => { callback(); });
        });
    }

    /**
     * Zdarzenie wywoływane po nawiązaniu połączenia z jednostką
     * @param callback
     */
    addOnConnected(callback: () => void): void {
        this.onConnectedCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po zerwaniu połączenia z jednostką
     * @param callback
     */
    addOnDisconnected(callback: () => void): void {
        this.onDisconnectedCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po zmianie wartości State, Mode, TargetTemp, FanSpeed, LouverPosition
     * @param callback
     */
    addOnChange(callback: () => void): void {
        this.onChangeCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po zmianie wartości Mode
     * @param callback
     */
    addOnModeChange(callback: () => void): void {
        this.onModeChangeCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po zmianie wartości TargetTemp
     * @param callback
     */
    addOnTargetTempChange(callback: () => void): void {
        this.onTargetTempChangeCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po zmianie wartości FanSpeed
     * @param callback
     */
    addOnFanSpeedChange(callback: () => void): void {
        this.onFanSpeedChangeCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po zmianie wartości LouverPosition
     * @param callback
     */
    addOnLouverPositionChange(callback: () => void): void {
        this.onLouverPositionChangeCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po włączeniu klimatyzatora lub grupy klimatyzatorów
     * @param callback
     */
    addOnTurnOn(callback: () => void): void {
        this.onTurnOnCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po wyłączeniu klimatyzatora lub grupy klimatyzatorów
     * @param callback
     */
    addOnTurnOff(callback: () => void): void {
        this.onTurnOffCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po wystąpieniu błędu
     * @param callback
     */
    addOnFailure(callback: () => void): void {
        this.onFailureCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po desynchronizacji cech klimatyzatorów należących do grupy
     * @param callback
     */
    addOnDesynchronization(callback: () => void): void {
        this.onDesynchronizationCallbacks.push(callback);
    }
    /** Włącza klimatyzator lub grupę klimatyzatorów */
    turnOn(): void {
        this.raw.execute(MethodType.TurnOn);
    }
    /** Wyłącza klimatyzator lub grupę klimatyzatorów */
    turnOff(): void {
        this.raw.execute(MethodType.TurnOff);
    }
    /** Przełącza tryb pracy na kolejny */
    switchMode(): void {
        this.raw.execute(MethodType.SwitchMode);
    }
    /**
     * ID obiektu CoolMasterNet
     * @returns {string}
     */
    get coolMasterNetID(): string {
        return this.raw.get(PropertyType.CoolMasterNetID);
    }
    set coolMasterNetID(value: string) {
        this.raw.set(PropertyType.CoolMasterNetID, value);
    }
    get uids(): string {
        return this.raw.get(PropertyType.UIDs);
    }
    set uids(value: string) {
        this.raw.set(PropertyType.UIDs, value);
    }
    /**
     * Lista wspieranych trybów pracy oddzielonych przecinkiem
     * @returns {string}
     */
    get supportedModes(): string {
        return this.raw.get(PropertyType.SupportedModes);
    }
    set supportedModes(value: string) {
        this.raw.set(PropertyType.SupportedModes, value);
    }
    /**
     * Lista wspieranych prędkości wentylatora oddzielonych przecinkiem, wpisanie "-" oznacza brak wsparcia
     * @returns {string}
     */
    get supportedFanSpeeds(): string {
        return this.raw.get(PropertyType.SupportedFanSpeeds);
    }
    set supportedFanSpeeds(value: string) {
        this.raw.set(PropertyType.SupportedFanSpeeds, value);
    }
    /**
     * Lista wspieranych pozycji żaluzji regulującej przepływ powietrza oddzielonych przecinkiem, wpisanie "-" oznacza brak wsparcia
     * @returns {string}
     */
    get supportedLouverPositions(): string {
        return this.raw.get(PropertyType.SupportedLouverPositions);
    }
    set supportedLouverPositions(value: string) {
        this.raw.set(PropertyType.SupportedLouverPositions, value);
    }
    /**
     * Stan połączenia: 0 - brak połączenia, 1 - połączono
     * @returns {number}
     */
    get status(): number {
        return this.raw.get(PropertyType.Status);
    }
    /**
     * Stan pracy: 1 - aktywny, 0 - zatrzymany, "-" - brak synchronizacji stanu
     * @returns {StateType}
     */
    get state(): StateType {
        return this.raw.get(PropertyType.State);
    }
    set state(value: StateType) {
        this.raw.set(PropertyType.State, value);
    }
    /**
     * Tryb pracy: 1 - chłodzenie, 2 - ogrzewanie, 3 - wentylator, 4 - suszenie, 5 - automatyczny, "-" - brak synchronizacji stanu
     * @returns {ModeType}
     */
    get mode(): ModeType {
        return this.raw.get(PropertyType.Mode);
    }
    set mode(value: ModeType) {
        this.raw.set(PropertyType.Mode, value);
    }
    /**
     * Zadana temperatura "-" - brak synchronizacji stanu
     * @returns {number}
     */
    get targetTemp(): number {
        return this.raw.get(PropertyType.TargetTemp);
    }
    set targetTemp(value: number) {
        this.raw.set(PropertyType.TargetTemp, value);
    }
    /**
     * Prędkość wentylatora: 0-5, 5 - auto, "-" - brak synchronizacji stanu
     * @returns {FanSpeedType}
     */
    get fanSpeed(): FanSpeedType {
        return this.raw.get(PropertyType.FanSpeed);
    }
    set fanSpeed(value: FanSpeedType) {
        this.raw.set(PropertyType.FanSpeed, value);
    }
    /**
     * Pozycja żaluzji regulującej przepływ powietrza: 0 - brak wsparcia, 1 - automatyczna, 2 - horyzontalna, 3 - 30°, 4 - 45°, 5 - 60°, 6 - wertykalna, 7 - zatrzymana, "-" - brak synchronizacji stanu
     * @returns {LouverPositionType}
     */
    get louverPosition(): LouverPositionType {
        return this.raw.get(PropertyType.LouverPosition);
    }
    set louverPosition(value: LouverPositionType) {
        this.raw.set(PropertyType.LouverPosition, value);
    }
    /**
     * Temperatura otoczenia lub wartość średnia temperatury w przypadku grupy urządzeń
     * @returns {string}
     */
    get ambientTemp(): string {
        return this.raw.get(PropertyType.AmbientTemp);
    }
    /**
     * Kod błędu
     * @returns {string}
     */
    get failureCode(): string {
        return this.raw.get(PropertyType.FailureCode);
    }
}

class CoolMasterRemote implements ICoolMaster {
    constructor(private objectName: string, private gate: RemoteGate) {

    }

    /**
     * Zdarzenie wywoływane po nawiązaniu połączenia z jednostką
     * @param callback
     */
    addOnConnected(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane po zerwaniu połączenia z jednostką
     * @param callback
     */
    addOnDisconnected(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane po zmianie wartości State, Mode, TargetTemp, FanSpeed, LouverPosition
     * @param callback
     */
    addOnChange(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane po zmianie wartości Mode
     * @param callback
     */
    addOnModeChange(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane po zmianie wartości TargetTemp
     * @param callback
     */
    addOnTargetTempChange(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane po zmianie wartości FanSpeed
     * @param callback
     */
    addOnFanSpeedChange(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane po zmianie wartości LouverPosition
     * @param callback
     */
    addOnLouverPositionChange(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane po włączeniu klimatyzatora lub grupy klimatyzatorów
     * @param callback
     */
    addOnTurnOn(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane po wyłączeniu klimatyzatora lub grupy klimatyzatorów
     * @param callback
     */
    addOnTurnOff(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane po wystąpieniu błędu
     * @param callback
     */
    addOnFailure(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane po desynchronizacji cech klimatyzatorów należących do grupy
     * @param callback
     */
    addOnDesynchronization(_callback: () => void): void {
        // Remote events are not supported
    }

    /** Włącza klimatyzator lub grupę klimatyzatorów */
    turnOn(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.TurnOn)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Wyłącza klimatyzator lub grupę klimatyzatorów */
    turnOff(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.TurnOff)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Przełącza tryb pracy na kolejny */
    switchMode(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.SwitchMode)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * ID obiektu CoolMasterNet
     * @returns {string}
     */
    get coolMasterNetID(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.CoolMasterNetID)
            .build();
        return this.gate.runScript(cmd!);
    }

    set coolMasterNetID(value: string) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.CoolMasterNetID)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    get uids(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.UIDs)
            .build();
        return this.gate.runScript(cmd!);
    }

    set uids(value: string) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.UIDs)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Lista wspieranych trybów pracy oddzielonych przecinkiem
     * @returns {string}
     */
    get supportedModes(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.SupportedModes)
            .build();
        return this.gate.runScript(cmd!);
    }

    set supportedModes(value: string) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.SupportedModes)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Lista wspieranych prędkości wentylatora oddzielonych przecinkiem, wpisanie "-" oznacza brak wsparcia
     * @returns {string}
     */
    get supportedFanSpeeds(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.SupportedFanSpeeds)
            .build();
        return this.gate.runScript(cmd!);
    }

    set supportedFanSpeeds(value: string) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.SupportedFanSpeeds)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Lista wspieranych pozycji żaluzji regulującej przepływ powietrza oddzielonych przecinkiem, wpisanie "-" oznacza brak wsparcia
     * @returns {string}
     */
    get supportedLouverPositions(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.SupportedLouverPositions)
            .build();
        return this.gate.runScript(cmd!);
    }

    set supportedLouverPositions(value: string) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.SupportedLouverPositions)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Stan połączenia: 0 - brak połączenia, 1 - połączono
     * @returns {number}
     */
    get status(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Status)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Stan pracy: 1 - aktywny, 0 - zatrzymany, "-" - brak synchronizacji stanu
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
     * Tryb pracy: 1 - chłodzenie, 2 - ogrzewanie, 3 - wentylator, 4 - suszenie, 5 - automatyczny, "-" - brak synchronizacji stanu
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
     * Zadana temperatura "-" - brak synchronizacji stanu
     * @returns {number}
     */
    get targetTemp(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.TargetTemp)
            .build();
        return this.gate.runScript(cmd!);
    }

    set targetTemp(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.TargetTemp)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Prędkość wentylatora: 0-5, 5 - auto, "-" - brak synchronizacji stanu
     * @returns {FanSpeedType}
     */
    get fanSpeed(): FanSpeedType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.FanSpeed)
            .build();
        return this.gate.runScript(cmd!);
    }

    set fanSpeed(value: FanSpeedType) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.FanSpeed)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Pozycja żaluzji regulującej przepływ powietrza: 0 - brak wsparcia, 1 - automatyczna, 2 - horyzontalna, 3 - 30°, 4 - 45°, 5 - 60°, 6 - wertykalna, 7 - zatrzymana, "-" - brak synchronizacji stanu
     * @returns {LouverPositionType}
     */
    get louverPosition(): LouverPositionType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.LouverPosition)
            .build();
        return this.gate.runScript(cmd!);
    }

    set louverPosition(value: LouverPositionType) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.LouverPosition)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Temperatura otoczenia lub wartość średnia temperatury w przypadku grupy urządzeń
     * @returns {string}
     */
    get ambientTemp(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.AmbientTemp)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Kod błędu
     * @returns {string}
     */
    get failureCode(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.FailureCode)
            .build();
        return this.gate.runScript(cmd!);
    }
}

export {
    CoolMaster, CoolMasterRaw, CoolMasterRemote, StateType, ModeType, FanSpeedType, LouverPositionType
}
