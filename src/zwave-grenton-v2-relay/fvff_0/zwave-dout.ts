// Created from: src/interfaces/module_grenton_v2_relay_zwave_ff.xml, object name="ZWAVE_DOUT"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum ValueType {
    Off = 0,
    On = 1
}

enum StatisticStateType {
    Off = 0,
    Continuous = 1
}

enum EventType {
    OnValueChange = 0,
    OnSwitchOn = 1,
    OnSwitchOff = 2
}

enum PropertyType {
    Value = 0,
    StatisticState = 1,
    Load = 2
}

enum MethodType {
    Switch = 0,
    SwitchOn = 1,
    SwitchOff = 2
}

declare class ZwaveDoutRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface IZwaveDout {
    /** Zdarzenie wywoływane w przypadku zmiany stanu na przeciwny */
    addOnValueChange: (callback: () => void) => void
    /** Zdarzenie wywoływane w momencie ustawienia stanu wysokiego na wejściu */
    addOnSwitchOn: (callback: () => void) => void
    /** Zdarzenie wywoływane w momencie ustawienia stanu niskiego na wejściu */
    addOnSwitchOff: (callback: () => void) => void
    /** Zwraca 1 dla wyjścia ustawionego na „On” i 0 dla wyjścia ustawionego na „Off” */
    value: ValueType
    /** Włącza raportowanie pomiaru do modułu statystyk:\nOff - wyłączony,\nContinuous - pomiar obciążenia w całym okresie pracy urządzenia */
    statisticState: StatisticStateType
    /** Mnożnik mierzonej wartości. Dla StatisticState:\nContinuous - wartość zużycia w jednostce czasu */
    load: number
    /** Ustawia stan wyjścia jako 1 lub 0 */
    setValue: (value: ValueType) => void
    /** Zmienia stan wyjścia na przeciwny. Parametr Time określa na jak długo następuje zmiana stanu, dla 0 jest ona stała */
    switch: (time?: number) => void
    /** Załącza wyjście. Parametr Time określa na jak długo następuje zmiana stanu, dla 0 jest ona stała */
    switchOn: (time?: number) => void
    /** Wyłącza wyjście. Parametr Time określa na jak długo następuje zmiana stanu, dla 0 jest ona stała */
    switchOff: (time?: number) => void
}

class ZwaveDout implements IZwaveDout {
    private onValueChangeCallbacks: Array<() => void> = [];
    private onSwitchOnCallbacks: Array<() => void> = [];
    private onSwitchOffCallbacks: Array<() => void> = [];

    constructor(private raw: ZwaveDoutRaw) {
        this.raw.add_event(EventType.OnValueChange, () => {
            this.onValueChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnSwitchOn, () => {
            this.onSwitchOnCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnSwitchOff, () => {
            this.onSwitchOffCallbacks.forEach(callback => { callback(); });
        });
    }

    addOnValueChange(callback: () => void): void { this.onValueChangeCallbacks.push(callback); }
    addOnSwitchOn(callback: () => void): void { this.onSwitchOnCallbacks.push(callback); }
    addOnSwitchOff(callback: () => void): void { this.onSwitchOffCallbacks.push(callback); }

    get value(): ValueType { return this.raw.get(PropertyType.Value); }
    set value(val: ValueType) { this.raw.set(PropertyType.Value, val); }
    get statisticState(): StatisticStateType { return this.raw.get(PropertyType.StatisticState); }
    set statisticState(val: StatisticStateType) { this.raw.set(PropertyType.StatisticState, val); }
    get load(): number { return this.raw.get(PropertyType.Load); }
    set load(val: number) { this.raw.set(PropertyType.Load, val); }

    setValue(value: ValueType): void { this.raw.set(PropertyType.Value, value); }

    switch(time: number = 0): void { this.raw.execute(MethodType.Switch, time); }
    switchOn(time: number = 0): void { this.raw.execute(MethodType.SwitchOn, time); }
    switchOff(time: number = 0): void { this.raw.execute(MethodType.SwitchOff, time); }
}

class ZwaveDoutRemote implements IZwaveDout {
    constructor(private objectName: string, private gate: RemoteGate) {}

    addOnValueChange(_callback: () => void): void { /* Remote events are not supported */ }
    addOnSwitchOn(_callback: () => void): void { /* Remote events are not supported */ }
    addOnSwitchOff(_callback: () => void): void { /* Remote events are not supported */ }

    get value(): ValueType {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Value).build();
        return this.gate.runScript(cmd!);
    }
    set value(val: ValueType) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.Value).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
    get statisticState(): StatisticStateType {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.StatisticState).build();
        return this.gate.runScript(cmd!);
    }
    set statisticState(val: StatisticStateType) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.StatisticState).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
    get load(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Load).build();
        return this.gate.runScript(cmd!);
    }
    set load(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.Load).addParameter(val).build();
        this.gate.runScript(cmd!);
    }

    setValue(value: ValueType): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.Value).addParameter(value).build();
        this.gate.runScript(cmd!);
    }

    switch(time: number = 0): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.Switch).addParameter(time).build();
        this.gate.runScript(cmd!);
    }
    switchOn(time: number = 0): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SwitchOn).addParameter(time).build();
        this.gate.runScript(cmd!);
    }
    switchOff(time: number = 0): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SwitchOff).addParameter(time).build();
        this.gate.runScript(cmd!);
    }
}

export { ZwaveDout, ZwaveDoutRaw, ZwaveDoutRemote, ValueType, StatisticStateType }
