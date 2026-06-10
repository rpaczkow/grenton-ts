// Created from: src/interfaces/module_2_0_RELAY_FM_fv01_02.xml, object name="DOUT"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnValueChange = 0,
    OnSwitchOn = 1,
    OnSwitchOff = 2,
    OnOverload = 3
}

enum PropertyType {
    Value = 0,
    StatisticState = 1,
    Load = 2,
    VoltageType = 3,
    VoltageValue = 4,
    Power = 5,
    DistributedLogicGroup = 6,
    Overload = 7
}

enum MethodType {
    SetValue = 0,
    Switch = 0,
    SwitchOn = 1,
    SwitchOff = 2,
    SetOverload = 7
}

enum StatisticStateType {
    Off = 0,
    Continuous = 1
}

enum VoltageType {
    AC = 0,
    DC = 1,
    Signal = 2
}

declare class DOutRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface IDOut {
    /** Zdarzenie wywoływane w przypadku zmiany stanu na przeciwny */
    addOnValueChange: (callback: () => void) => void
    /** Zdarzenie wywoływane w momencie ustawienia stanu wysokiego na wyjściu */
    addOnSwitchOn: (callback: () => void) => void
    /** Zdarzenie wywoływane w momencie ustawienia stanu niskiego na wyjściu */
    addOnSwitchOff: (callback: () => void) => void
    /** Zdarzenie wywoływane gdy moc pobierana przez odbiornik przekroczy wartość Overload */
    addOnOverload: (callback: () => void) => void
    /** Zwraca stan wyjścia jako 1 lub 0 */
    value: boolean
    /** Rodzaj napięcia obciążenia: \n0 - AC, \n1 - DC */
    voltageType: VoltageType
    /** Wartość napięcia obciążenia */
    voltageValue: number
    /** Zwraca moc chwilową pobieraną przez obciążenie sumarycznie na obu kanałach */
    readonly power: number
    /** Wartość mocy po przekroczeniu której generowane jest zdarzenie OnOverload */
    overload: number
    /** Grupa Distributed Logic - grupa broadcastowa dla rozproszonej logiki */
    distributedLogicGroup: number
    /** Włącza raportowanie pomiaru do modułu statystyk: \nOff - wyłączony, \nContinuous - pomiar obciążenia w całym okresie pracy urządzenia */
    statisticState: StatisticStateType
    /** Mnożnik mierzonej wartości. Dla StatisticState: \nContinuous - wartość zużycia w jednostce czasu */
    load: number
    /** Ustawia stan wyjścia jako 1 lub 0 */
    setValue: (value: number) => void
    /** Zmienia stan wyjścia na przeciwny. Parametr Time określa na jak długo następuje zmiana stanu, dla 0 jest ona stała */
    switch: (time?: number) => void
    /** Załącza wyjście. Parametr Time określa na jak długo następuje zmiana stanu, dla 0 jest ona stała */
    switchOn: (time?: number) => void
    /** Wyłącza wyjście. Parametr Time określa na jak długo następuje zmiana stanu, dla 0 jest ona stała */
    switchOff: (time?: number) => void
    /** Ustawia wartość mocy po przekroczeniu której generowane jest zdarzenie OnOverload */
    setOverload: (overload: number) => void
    /** Ustawia wartość cechy VoltageType - rodzaj napięcia obciążenia */
    setVoltageType: (voltage: VoltageType) => void
    /** Ustawia wartość cechy VoltageValue - wartość napięcia obciążenia */
    setVoltageValue: (value: number) => void
}

class DOut implements IDOut {
    private onValueChangeCallbacks: Array<() => void> = [];
    private onSwitchOnCallbacks: Array<() => void> = [];
    private onSwitchOffCallbacks: Array<() => void> = [];
    private onOverloadCallbacks: Array<() => void> = [];

    constructor(private raw: DOutRaw) {
        this.raw.add_event(EventType.OnValueChange, () => {
            this.onValueChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnSwitchOn, () => {
            this.onSwitchOnCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnSwitchOff, () => {
            this.onSwitchOffCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnOverload, () => {
            this.onOverloadCallbacks.forEach(callback => { callback(); });
        });
    }

    addOnValueChange(callback: () => void): void { this.onValueChangeCallbacks.push(callback); }
    addOnSwitchOn(callback: () => void): void { this.onSwitchOnCallbacks.push(callback); }
    addOnSwitchOff(callback: () => void): void { this.onSwitchOffCallbacks.push(callback); }
    addOnOverload(callback: () => void): void { this.onOverloadCallbacks.push(callback); }

    get value(): boolean { return this.raw.get(PropertyType.Value) === 1; }
    set value(val: boolean) { this.raw.set(PropertyType.Value, val ? 1 : 0); }
    get voltageType(): VoltageType { return this.raw.get(PropertyType.VoltageType); }
    set voltageType(value: VoltageType) { this.raw.set(PropertyType.VoltageType, value); }
    get voltageValue(): number { return this.raw.get(PropertyType.VoltageValue); }
    set voltageValue(value: number) { this.raw.set(PropertyType.VoltageValue, value); }
    get power(): number { return this.raw.get(PropertyType.Power); }
    get overload(): number { return this.raw.get(PropertyType.Overload); }
    set overload(value: number) { this.raw.set(PropertyType.Overload, value); }
    get distributedLogicGroup(): number { return this.raw.get(PropertyType.DistributedLogicGroup); }
    set distributedLogicGroup(value: number) { this.raw.set(PropertyType.DistributedLogicGroup, value); }
    get statisticState(): StatisticStateType { return this.raw.get(PropertyType.StatisticState); }
    set statisticState(value: StatisticStateType) { this.raw.set(PropertyType.StatisticState, value); }
    get load(): number { return this.raw.get(PropertyType.Load); }
    set load(value: number) { this.raw.set(PropertyType.Load, value); }

    setValue(value: number): void { this.raw.set(PropertyType.Value, value); }
    switch(time: number = 0): void { this.raw.execute(MethodType.Switch, time); }
    switchOn(time: number = 0): void { this.raw.execute(MethodType.SwitchOn, time); }
    switchOff(time: number = 0): void { this.raw.execute(MethodType.SwitchOff, time); }
    setOverload(overload: number): void { this.raw.set(PropertyType.Overload, overload); }
    setVoltageType(voltage: VoltageType): void { this.raw.set(PropertyType.VoltageType, voltage); }
    setVoltageValue(value: number): void { this.raw.set(PropertyType.VoltageValue, value); }
}

class DOutRemote implements IDOut {
    constructor(private objectName: string, private gate: RemoteGate) {}

    addOnValueChange(_callback: () => void): void { /* Remote events are not supported */ }
    addOnSwitchOn(_callback: () => void): void { /* Remote events are not supported */ }
    addOnSwitchOff(_callback: () => void): void { /* Remote events are not supported */ }
    addOnOverload(_callback: () => void): void { /* Remote events are not supported */ }

    get value(): boolean {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Value).build();
        return this.gate.runScript(cmd!) === 1;
    }
    set value(val: boolean) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.Value).addParameter(val ? 1 : 0).build();
        this.gate.runScript(cmd!);
    }
    get voltageType(): VoltageType {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.VoltageType).build();
        return this.gate.runScript(cmd!);
    }
    set voltageType(value: VoltageType) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.VoltageType).addParameter(value).build();
        this.gate.runScript(cmd!);
    }
    get voltageValue(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.VoltageValue).build();
        return this.gate.runScript(cmd!);
    }
    set voltageValue(value: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.VoltageValue).addParameter(value).build();
        this.gate.runScript(cmd!);
    }
    get power(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Power).build();
        return this.gate.runScript(cmd!);
    }
    get overload(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Overload).build();
        return this.gate.runScript(cmd!);
    }
    set overload(value: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.Overload).addParameter(value).build();
        this.gate.runScript(cmd!);
    }
    get distributedLogicGroup(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.DistributedLogicGroup).build();
        return this.gate.runScript(cmd!);
    }
    set distributedLogicGroup(value: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.DistributedLogicGroup).addParameter(value).build();
        this.gate.runScript(cmd!);
    }
    get statisticState(): StatisticStateType {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.StatisticState).build();
        return this.gate.runScript(cmd!);
    }
    set statisticState(value: StatisticStateType) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.StatisticState).addParameter(value).build();
        this.gate.runScript(cmd!);
    }
    get load(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Load).build();
        return this.gate.runScript(cmd!);
    }
    set load(value: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.Load).addParameter(value).build();
        this.gate.runScript(cmd!);
    }

    setValue(value: number): void {
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
    setOverload(overload: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.Overload).addParameter(overload).build();
        this.gate.runScript(cmd!);
    }
    setVoltageType(voltage: VoltageType): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.VoltageType).addParameter(voltage).build();
        this.gate.runScript(cmd!);
    }
    setVoltageValue(value: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.VoltageValue).addParameter(value).build();
        this.gate.runScript(cmd!);
    }
}

export { DOut, DOutRaw, DOutRemote, StatisticStateType, VoltageType }
