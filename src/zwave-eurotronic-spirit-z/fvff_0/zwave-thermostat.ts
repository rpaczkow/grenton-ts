// Created from: src/interfaces/module_eurotronic_spirit_z_ff.xml, object name="ZWAVE_THERMOSTAT"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum ModeType {
    Auto = 0,
    Manual = 1,
    Off = 2
}

enum EventType {
    OnTemperatureChange = 0,
    OnPointValueChange = 1,
    OnValvePositionChange = 2,
    OnValveOpen = 3,
    OnValveClose = 4,
    OnModeChange = 5,
    OnAutoMode = 6,
    OnManualMode = 7,
    OnOffMode = 8,
    OnUserAction = 9
}

enum PropertyType {
    Mode = 0,
    Temperature = 1,
    PointValue = 2,
    ValvePosition = 3
}

enum MethodType {
    OpenValve = 0,
    CloseValve = 1,
    GetData = 2
}

declare class ZwaveThermostatRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface IZwaveThermostat {
    /** Zdarzenie wywoływane przy zmianie temperatury powietrza */
    addOnTemperatureChange: (callback: () => void) => void
    /** Zdarzenie wywoływane przy zmianie wartości zadanej temperatury */
    addOnPointValueChange: (callback: () => void) => void
    /** Zdarzenie wywoływane przy zmianie stopnia otwarcia zaworu (niezależnie od trybu) */
    addOnValvePositionChange: (callback: () => void) => void
    /** Zdarzenie wywoływane przy całkowitym otwarciu zaworu w trybie ręcznym */
    addOnValveOpen: (callback: () => void) => void
    /** Zdarzenie wywoływane przy całkowitym zamknieciu zaworu w trybie ręcznym */
    addOnValveClose: (callback: () => void) => void
    /** Zdarzenie wywoływane przy zmianie trybu pracy termostatu */
    addOnModeChange: (callback: () => void) => void
    /** Zdarzenie wywoływane przy zmianie trybu pracy termostatu na automatyczny */
    addOnAutoMode: (callback: () => void) => void
    /** Zdarzenie wywoływane przy zmianie trybu pracy termostatu na ręczny */
    addOnManualMode: (callback: () => void) => void
    /** Zdarzenie wywoływane przy zmianie trybu pracy termostatu na off */
    addOnOffMode: (callback: () => void) => void
    /** Zdarzenie wywoływane przy interakcji użytkownika */
    addOnUserAction: (callback: () => void) => void
    /** Tryb pracy termostatu\n0 - automatyczny\n1 - ręczny\n2 - off */
    mode: ModeType
    /** Temperatura powietrza mierzona przez termostat */
    readonly temperature: number
    /** Wartość zadana temperatury w trybie automatycznym */
    pointValue: number
    /** Stopień otwarcia zaworu termostatu\n0% - zawór całkowicie zamknięty\n100% - zawór całkowicie otwarty */
    valvePosition: number
    /** Ustawia tryb pracy termostatu\n0 - automatyczny\n1 - ręczny\n2 - off */
    setMode: (value: ModeType) => void
    /** Ustawia wartość zadanej temperatury w trybie automatycznym */
    setPointValue: (value: number) => void
    /** Ustawia stopień otwarcia zaworu w trybie ręcznym */
    setValvePosition: (value: number) => void
    /** Przełącza termostat w tryb ręczny i otwiera całkowicie zawór */
    openValve: () => void
    /** Przełącza termostat w tryb ręczny i zamyka całkowicie zawór */
    closeValve: () => void
    /** Pobiera aktualne dane z termostatu */
    getData: () => void
}

class ZwaveThermostat implements IZwaveThermostat {
    private onTemperatureChangeCallbacks: Array<() => void> = [];
    private onPointValueChangeCallbacks: Array<() => void> = [];
    private onValvePositionChangeCallbacks: Array<() => void> = [];
    private onValveOpenCallbacks: Array<() => void> = [];
    private onValveCloseCallbacks: Array<() => void> = [];
    private onModeChangeCallbacks: Array<() => void> = [];
    private onAutoModeCallbacks: Array<() => void> = [];
    private onManualModeCallbacks: Array<() => void> = [];
    private onOffModeCallbacks: Array<() => void> = [];
    private onUserActionCallbacks: Array<() => void> = [];

    constructor(private raw: ZwaveThermostatRaw) {
        this.raw.add_event(EventType.OnTemperatureChange, () => {
            this.onTemperatureChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnPointValueChange, () => {
            this.onPointValueChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnValvePositionChange, () => {
            this.onValvePositionChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnValveOpen, () => {
            this.onValveOpenCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnValveClose, () => {
            this.onValveCloseCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnModeChange, () => {
            this.onModeChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnAutoMode, () => {
            this.onAutoModeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnManualMode, () => {
            this.onManualModeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnOffMode, () => {
            this.onOffModeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnUserAction, () => {
            this.onUserActionCallbacks.forEach(callback => { callback(); });
        });
    }

    addOnTemperatureChange(callback: () => void): void { this.onTemperatureChangeCallbacks.push(callback); }
    addOnPointValueChange(callback: () => void): void { this.onPointValueChangeCallbacks.push(callback); }
    addOnValvePositionChange(callback: () => void): void { this.onValvePositionChangeCallbacks.push(callback); }
    addOnValveOpen(callback: () => void): void { this.onValveOpenCallbacks.push(callback); }
    addOnValveClose(callback: () => void): void { this.onValveCloseCallbacks.push(callback); }
    addOnModeChange(callback: () => void): void { this.onModeChangeCallbacks.push(callback); }
    addOnAutoMode(callback: () => void): void { this.onAutoModeCallbacks.push(callback); }
    addOnManualMode(callback: () => void): void { this.onManualModeCallbacks.push(callback); }
    addOnOffMode(callback: () => void): void { this.onOffModeCallbacks.push(callback); }
    addOnUserAction(callback: () => void): void { this.onUserActionCallbacks.push(callback); }

    get mode(): ModeType { return this.raw.get(PropertyType.Mode); }
    set mode(val: ModeType) { this.raw.set(PropertyType.Mode, val); }
    get temperature(): number { return this.raw.get(PropertyType.Temperature); }
    get pointValue(): number { return this.raw.get(PropertyType.PointValue); }
    set pointValue(val: number) { this.raw.set(PropertyType.PointValue, val); }
    get valvePosition(): number { return this.raw.get(PropertyType.ValvePosition); }
    set valvePosition(val: number) { this.raw.set(PropertyType.ValvePosition, val); }

    setMode(value: ModeType): void { this.raw.set(PropertyType.Mode, value); }
    setPointValue(value: number): void { this.raw.set(PropertyType.PointValue, value); }
    setValvePosition(value: number): void { this.raw.set(PropertyType.ValvePosition, value); }

    openValve(): void { this.raw.execute(MethodType.OpenValve); }
    closeValve(): void { this.raw.execute(MethodType.CloseValve); }
    getData(): void { this.raw.execute(MethodType.GetData); }
}

class ZwaveThermostatRemote implements IZwaveThermostat {
    constructor(private objectName: string, private gate: RemoteGate) {}

    addOnTemperatureChange(_callback: () => void): void { /* Remote events are not supported */ }
    addOnPointValueChange(_callback: () => void): void { /* Remote events are not supported */ }
    addOnValvePositionChange(_callback: () => void): void { /* Remote events are not supported */ }
    addOnValveOpen(_callback: () => void): void { /* Remote events are not supported */ }
    addOnValveClose(_callback: () => void): void { /* Remote events are not supported */ }
    addOnModeChange(_callback: () => void): void { /* Remote events are not supported */ }
    addOnAutoMode(_callback: () => void): void { /* Remote events are not supported */ }
    addOnManualMode(_callback: () => void): void { /* Remote events are not supported */ }
    addOnOffMode(_callback: () => void): void { /* Remote events are not supported */ }
    addOnUserAction(_callback: () => void): void { /* Remote events are not supported */ }

    get mode(): ModeType {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Mode).build();
        return this.gate.runScript(cmd!);
    }
    set mode(val: ModeType) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.Mode).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
    get temperature(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Temperature).build();
        return this.gate.runScript(cmd!);
    }
    get pointValue(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.PointValue).build();
        return this.gate.runScript(cmd!);
    }
    set pointValue(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.PointValue).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
    get valvePosition(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.ValvePosition).build();
        return this.gate.runScript(cmd!);
    }
    set valvePosition(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.ValvePosition).addParameter(val).build();
        this.gate.runScript(cmd!);
    }

    setMode(value: ModeType): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.Mode).addParameter(value).build();
        this.gate.runScript(cmd!);
    }
    setPointValue(value: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.PointValue).addParameter(value).build();
        this.gate.runScript(cmd!);
    }
    setValvePosition(value: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.ValvePosition).addParameter(value).build();
        this.gate.runScript(cmd!);
    }

    openValve(): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.OpenValve).build();
        this.gate.runScript(cmd!);
    }
    closeValve(): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.CloseValve).build();
        this.gate.runScript(cmd!);
    }
    getData(): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.GetData).build();
        this.gate.runScript(cmd!);
    }
}

export { ZwaveThermostat, ZwaveThermostatRaw, ZwaveThermostatRemote, ModeType }
