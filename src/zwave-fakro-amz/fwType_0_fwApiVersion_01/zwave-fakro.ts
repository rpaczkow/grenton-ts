// Created from: src/interfaces/module_fakro_amz_01.xml, object name="ZWAVE_FAKRO"

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
    State = 0,
    Percent = 1
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
    /** Markiza do góry */
    up: () => void
    /** Markiza w dół */
    down: () => void
    /** Stop jeśli markiza jest w ruchu */
    stop: () => void
    /** Markiza do góry jeśli poprzednio ruch w dół, markiza w dół jeśli poprzednio ruch w górę */
    start: () => void
    /** Ustawia wartość procentową, gdzie 100% - markiza otwarta */
    setPercent: (value: number) => void
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

    up(): void { this.raw.execute(MethodType.Up); }
    down(): void { this.raw.execute(MethodType.Down); }
    stop(): void { this.raw.execute(MethodType.Stop); }
    start(): void { this.raw.execute(MethodType.Start); }

    setPercent(value: number): void { this.raw.set(PropertyType.Percent, value); }
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

    setPercent(value: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.Percent).addParameter(value).build();
        this.gate.runScript(cmd!);
    }
}

export { ZwaveFakro, ZwaveFakroRaw, ZwaveFakroRemote, StateType }
