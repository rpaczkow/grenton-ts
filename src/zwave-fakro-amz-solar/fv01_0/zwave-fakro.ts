// Created from: src/interfaces/module_fakro_amz_solar_01.xml, object name="ZWAVE_FAKRO"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum StateType {
    Stop = 0,
    Up = 1,
    Down = 2
}

enum ModeType {
    Manual = 0,
    Semi = 1,
    Auto = 2
}

enum SeasonModeType {
    Summer = 1,
    Winter = 2
}

enum EventType {
    OnChange = 0,
    OnUp = 1,
    OnDown = 2,
    OnStart = 3,
    OnStop = 4
}

enum PropertyType {
    State = 0,
    Percent = 1,
    Mode = 2,
    SeasonMode = 3,
    OpeningTime = 4,
    Sensitivity = 5
}

enum MethodType {
    Up = 0,
    Down = 1,
    Stop = 2,
    Start = 3
}

declare class ZwaveFakroRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface IZwaveFakro {
    /** Zdarzenie wywoływane w momencie zmiany stanu markizy */
    addOnChange: (callback: () => void) => void
    /** Zdarzenie wywoływane w momencie zmiany stanu ze Stop na Up */
    addOnUp: (callback: () => void) => void
    /** Zdarzenie wywoływane w momencie zmiany stanu ze Stop na Down */
    addOnDown: (callback: () => void) => void
    /** Zdarzenie wywoływane w momencie wywołania komendy Start */
    addOnStart: (callback: () => void) => void
    /** Zdarzenie wywoływane w momencie wywołania komendy Stop */
    addOnStop: (callback: () => void) => void
    /** Stan rolety:\n0 - stoi,\n1 - ruch w górę,\n2 - ruch w dół */
    readonly state: StateType
    /** Wartość procentowa otwarcia markizy, gdzie:\n0% - markiza zamknięta,\n100% - markiza otwarta */
    percent: number
    /** Tryb pracy urządzenia:\n0 - Manual  - Ręczny,\n1 - Semiauto - Półautomatyczny,\n2 - Auto - Automatyczny */
    mode: ModeType
    /** Tryb sezonowy urządzenia:\n1 - Lato,\n2 - Zima */
    seasonMode: SeasonModeType
    /** Czas otwarcia markizy w trybie półautomatycznym */
    openingTime: number
    /** Czułość poziomu nasłonecznienia dla markizy w trybie automatycznym */
    sensitivity: number
    /** Markiza do góry */
    up: () => void
    /** Markiza w dół */
    down: () => void
    /** Stop jeśli markiza jest w ruchu */
    stop: () => void
    /** Markiza do góry jeśli poprzednio ruch w dół, markiza w dół jeśli poprzednio ruch w górę */
    start: () => void
    /** Ustawia wartość procentową, gdzie 100% - markiza otwarta */
    setPercent: (percent: number) => void
    /** Ustawia tryb:\n0 - Manual,\n1 - Semiauto,\n2 - Auto */
    setMode: (mode: ModeType) => void
    /** Ustawia tryb sezonowy:\n0 - Lato,\n1 - Zima */
    setSeasonMode: (seasonMode: SeasonModeType) => void
    /** Ustawia czas otwarcia */
    setOpeningTime: (openingTime: number) => void
    /** Ustawia czułość poziomu nasłonecznienia */
    setSensitivity: (sensitivity: number) => void
}

class ZwaveFakro implements IZwaveFakro {
    private onChangeCallbacks: Array<() => void> = [];
    private onUpCallbacks: Array<() => void> = [];
    private onDownCallbacks: Array<() => void> = [];
    private onStartCallbacks: Array<() => void> = [];
    private onStopCallbacks: Array<() => void> = [];

    constructor(private raw: ZwaveFakroRaw) {
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

    get state(): StateType { return this.raw.get(PropertyType.State); }
    get percent(): number { return this.raw.get(PropertyType.Percent); }
    set percent(val: number) { this.raw.set(PropertyType.Percent, val); }
    get mode(): ModeType { return this.raw.get(PropertyType.Mode); }
    set mode(val: ModeType) { this.raw.set(PropertyType.Mode, val); }
    get seasonMode(): SeasonModeType { return this.raw.get(PropertyType.SeasonMode); }
    set seasonMode(val: SeasonModeType) { this.raw.set(PropertyType.SeasonMode, val); }
    get openingTime(): number { return this.raw.get(PropertyType.OpeningTime); }
    set openingTime(val: number) { this.raw.set(PropertyType.OpeningTime, val); }
    get sensitivity(): number { return this.raw.get(PropertyType.Sensitivity); }
    set sensitivity(val: number) { this.raw.set(PropertyType.Sensitivity, val); }

    up(): void { this.raw.execute(MethodType.Up); }
    down(): void { this.raw.execute(MethodType.Down); }
    stop(): void { this.raw.execute(MethodType.Stop); }
    start(): void { this.raw.execute(MethodType.Start); }

    setPercent(percent: number): void { this.raw.set(PropertyType.Percent, percent); }
    setMode(mode: ModeType): void { this.raw.set(PropertyType.Mode, mode); }
    setSeasonMode(seasonMode: SeasonModeType): void { this.raw.set(PropertyType.SeasonMode, seasonMode); }
    setOpeningTime(openingTime: number): void { this.raw.set(PropertyType.OpeningTime, openingTime); }
    setSensitivity(sensitivity: number): void { this.raw.set(PropertyType.Sensitivity, sensitivity); }
}

class ZwaveFakroRemote implements IZwaveFakro {
    constructor(private objectName: string, private gate: RemoteGate) {}

    addOnChange(_callback: () => void): void { /* Remote events are not supported */ }
    addOnUp(_callback: () => void): void { /* Remote events are not supported */ }
    addOnDown(_callback: () => void): void { /* Remote events are not supported */ }
    addOnStart(_callback: () => void): void { /* Remote events are not supported */ }
    addOnStop(_callback: () => void): void { /* Remote events are not supported */ }

    get state(): StateType {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.State).build();
        return this.gate.runScript(cmd!);
    }
    get percent(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Percent).build();
        return this.gate.runScript(cmd!);
    }
    set percent(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.Percent).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
    get mode(): ModeType {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Mode).build();
        return this.gate.runScript(cmd!);
    }
    set mode(val: ModeType) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.Mode).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
    get seasonMode(): SeasonModeType {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.SeasonMode).build();
        return this.gate.runScript(cmd!);
    }
    set seasonMode(val: SeasonModeType) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.SeasonMode).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
    get openingTime(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.OpeningTime).build();
        return this.gate.runScript(cmd!);
    }
    set openingTime(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.OpeningTime).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
    get sensitivity(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Sensitivity).build();
        return this.gate.runScript(cmd!);
    }
    set sensitivity(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.Sensitivity).addParameter(val).build();
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
    stop(): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.Stop).build();
        this.gate.runScript(cmd!);
    }
    start(): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.Start).build();
        this.gate.runScript(cmd!);
    }

    setPercent(percent: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.Percent).addParameter(percent).build();
        this.gate.runScript(cmd!);
    }
    setMode(mode: ModeType): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.Mode).addParameter(mode).build();
        this.gate.runScript(cmd!);
    }
    setSeasonMode(seasonMode: SeasonModeType): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.SeasonMode).addParameter(seasonMode).build();
        this.gate.runScript(cmd!);
    }
    setOpeningTime(openingTime: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.OpeningTime).addParameter(openingTime).build();
        this.gate.runScript(cmd!);
    }
    setSensitivity(sensitivity: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.Sensitivity).addParameter(sensitivity).build();
        this.gate.runScript(cmd!);
    }
}

export { ZwaveFakro, ZwaveFakroRaw, ZwaveFakroRemote, StateType, ModeType, SeasonModeType }
