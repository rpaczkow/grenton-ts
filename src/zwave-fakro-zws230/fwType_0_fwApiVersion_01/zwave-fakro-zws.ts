// Created from: src/interfaces/module_fakro_zws230_01.xml, object name="ZWAVE_FAKRO_ZWS"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum StateType {
    Stop = 0,
    Up = 1,
    Down = 2
}

enum EventType {
    OnChange = 0,
    OnOpen = 1,
    OnClose = 2,
    OnStart = 3,
    OnStop = 4,
    OnRainChange = 5,
    OnRainOn = 6,
    OnRainOff = 7
}

enum PropertyType {
    State = 0,
    WaterSensor = 6
}

enum MethodType {
    Open = 0,
    Close = 1,
    Stop = 2,
    Start = 3
}

declare class ZwaveFakroZwsRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface IZwaveFakroZws {
    /** Zdarzenie wywoływane w momencie zmiany stanu okna */
    addOnChange: (callback: () => void) => void
    /** Zdarzenie wywoływane w momencie zmiany stanu ze Stop na Open */
    addOnOpen: (callback: () => void) => void
    /** Zdarzenie wywoływane w momencie zmiany stanu ze Stop na Close */
    addOnClose: (callback: () => void) => void
    /** Zdarzenie wywoływane w momencie wywołania komendy Start */
    addOnStart: (callback: () => void) => void
    /** Zdarzenie wywoływane w momencie wywołania komendy Stop */
    addOnStop: (callback: () => void) => void
    /** Zdarzenie wywoływane w przypadku zmiany stanu czujnika na przeciwny */
    addOnRainChange: (callback: () => void) => void
    /** Zdarzenie wywoływane w momencie ustawienia stanu wysokiego na czujniku */
    addOnRainOn: (callback: () => void) => void
    /** Zdarzenie wywoływane w momencie ustawienia stanu niskiego na czujniku */
    addOnRainOff: (callback: () => void) => void
    /** Stan urządzenia:\n0 - stoi,\n1 - otwieranie,\n2 - zamykanie */
    readonly state: StateType
    /** Wartość z czujnika deszczu */
    readonly waterSensor: number
    /** Otwarcie okna */
    open: () => void
    /** Zamknięcie okna */
    close: () => void
    /** Stop jeśli okno jest otwierane lub zamykane */
    stop: () => void
    /** Zamknięcie okna jeśli poprzednio było otwierane, otwieranie okna jeśli poprzednio było zamykane */
    start: () => void
}

class ZwaveFakroZws implements IZwaveFakroZws {
    private onChangeCallbacks: Array<() => void> = [];
    private onOpenCallbacks: Array<() => void> = [];
    private onCloseCallbacks: Array<() => void> = [];
    private onStartCallbacks: Array<() => void> = [];
    private onStopCallbacks: Array<() => void> = [];
    private onRainChangeCallbacks: Array<() => void> = [];
    private onRainOnCallbacks: Array<() => void> = [];
    private onRainOffCallbacks: Array<() => void> = [];

    constructor(private raw: ZwaveFakroZwsRaw) {
        this.raw.add_event(EventType.OnChange, () => {
            this.onChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnOpen, () => {
            this.onOpenCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnClose, () => {
            this.onCloseCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnStart, () => {
            this.onStartCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnStop, () => {
            this.onStopCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnRainChange, () => {
            this.onRainChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnRainOn, () => {
            this.onRainOnCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnRainOff, () => {
            this.onRainOffCallbacks.forEach(callback => { callback(); });
        });
    }

    addOnChange(callback: () => void): void { this.onChangeCallbacks.push(callback); }
    addOnOpen(callback: () => void): void { this.onOpenCallbacks.push(callback); }
    addOnClose(callback: () => void): void { this.onCloseCallbacks.push(callback); }
    addOnStart(callback: () => void): void { this.onStartCallbacks.push(callback); }
    addOnStop(callback: () => void): void { this.onStopCallbacks.push(callback); }
    addOnRainChange(callback: () => void): void { this.onRainChangeCallbacks.push(callback); }
    addOnRainOn(callback: () => void): void { this.onRainOnCallbacks.push(callback); }
    addOnRainOff(callback: () => void): void { this.onRainOffCallbacks.push(callback); }

    get state(): StateType { return this.raw.get(PropertyType.State); }
    get waterSensor(): number { return this.raw.get(PropertyType.WaterSensor); }

    open(): void { this.raw.execute(MethodType.Open); }
    close(): void { this.raw.execute(MethodType.Close); }
    stop(): void { this.raw.execute(MethodType.Stop); }
    start(): void { this.raw.execute(MethodType.Start); }
}

class ZwaveFakroZwsRemote implements IZwaveFakroZws {
    constructor(private objectName: string, private gate: RemoteGate) {}

    addOnChange(_callback: () => void): void { /* Remote events are not supported */ }
    addOnOpen(_callback: () => void): void { /* Remote events are not supported */ }
    addOnClose(_callback: () => void): void { /* Remote events are not supported */ }
    addOnStart(_callback: () => void): void { /* Remote events are not supported */ }
    addOnStop(_callback: () => void): void { /* Remote events are not supported */ }
    addOnRainChange(_callback: () => void): void { /* Remote events are not supported */ }
    addOnRainOn(_callback: () => void): void { /* Remote events are not supported */ }
    addOnRainOff(_callback: () => void): void { /* Remote events are not supported */ }

    get state(): StateType {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.State).build();
        return this.gate.runScript(cmd!);
    }
    get waterSensor(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.WaterSensor).build();
        return this.gate.runScript(cmd!);
    }

    open(): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.Open).build();
        this.gate.runScript(cmd!);
    }
    close(): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.Close).build();
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
}

export { ZwaveFakroZws, ZwaveFakroZwsRaw, ZwaveFakroZwsRemote, StateType }
