// Created from: src/interfaces/module_fakro_amz_v1_01.xml, object name="ZWAVE_FAKRO"

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
    OnStop = 4
}

enum PropertyType {
    State = 0,
    Percent = 1
}

enum MethodType {
    Open = 0,
    Close = 1,
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
    /** Zdarzenie wywoływane w momencie zmiany stanu ze Stop na Open */
    addOnOpen: (callback: () => void) => void
    /** Zdarzenie wywoływane w momencie zmiany stanu ze Stop na Close */
    addOnClose: (callback: () => void) => void
    /** Zdarzenie wywoływane w momencie wywołania komendy Start */
    addOnStart: (callback: () => void) => void
    /** Zdarzenie wywoływane w momencie wywołania komendy Stop */
    addOnStop: (callback: () => void) => void
    /** Stan urządzenia:\n0 - stoi,\n1 - otwieranie,\n2 - zamykanie */
    readonly state: StateType
    /** Wartość procentowa otwarcia markizy, gdzie:\n0% - markiza zamknięta,\n100% - markiza otwarta */
    percent: number
    /** Markiza do góry */
    open: () => void
    /** Markiza w dół */
    close: () => void
    /** Stop jeśli markiza jest w ruchu */
    stop: () => void
    /** Markiza do góry jeśli poprzednio ruch w dół, markiza w dół jeśli poprzednio ruch w górę */
    start: () => void
    /** Ustawia wartość procentową, gdzie 100% - markiza otwarta */
    setPercent: (percent: number) => void
}

class ZwaveFakro implements IZwaveFakro {
    private onChangeCallbacks: Array<() => void> = [];
    private onOpenCallbacks: Array<() => void> = [];
    private onCloseCallbacks: Array<() => void> = [];
    private onStartCallbacks: Array<() => void> = [];
    private onStopCallbacks: Array<() => void> = [];

    constructor(private raw: ZwaveFakroRaw) {
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
    }

    addOnChange(callback: () => void): void { this.onChangeCallbacks.push(callback); }
    addOnOpen(callback: () => void): void { this.onOpenCallbacks.push(callback); }
    addOnClose(callback: () => void): void { this.onCloseCallbacks.push(callback); }
    addOnStart(callback: () => void): void { this.onStartCallbacks.push(callback); }
    addOnStop(callback: () => void): void { this.onStopCallbacks.push(callback); }

    get state(): StateType { return this.raw.get(PropertyType.State); }
    get percent(): number { return this.raw.get(PropertyType.Percent); }
    set percent(val: number) { this.raw.set(PropertyType.Percent, val); }

    open(): void { this.raw.execute(MethodType.Open); }
    close(): void { this.raw.execute(MethodType.Close); }
    stop(): void { this.raw.execute(MethodType.Stop); }
    start(): void { this.raw.execute(MethodType.Start); }

    setPercent(percent: number): void { this.raw.set(PropertyType.Percent, percent); }
}

class ZwaveFakroRemote implements IZwaveFakro {
    constructor(private objectName: string, private gate: RemoteGate) {}

    addOnChange(_callback: () => void): void { /* Remote events are not supported */ }
    addOnOpen(_callback: () => void): void { /* Remote events are not supported */ }
    addOnClose(_callback: () => void): void { /* Remote events are not supported */ }
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

    setPercent(percent: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.Percent).addParameter(percent).build();
        this.gate.runScript(cmd!);
    }
}

export { ZwaveFakro, ZwaveFakroRaw, ZwaveFakroRemote, StateType }
