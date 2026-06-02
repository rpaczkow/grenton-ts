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
    Continuous = 1,
    Real = 3
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
    addOnValueChange: (callback: () => void) => void
    addOnSwitchOn: (callback: () => void) => void
    addOnSwitchOff: (callback: () => void) => void
    addOnOverload: (callback: () => void) => void
    setValue: (value: number) => void
    switch: (miliseconds: number) => void
    switchOn: (miliseconds: number) => void
    switchOff: (miliseconds: number) => void
    setOverload: (overload: number) => void
    value: boolean
    voltageType: VoltageType
    voltageValue: number
    readonly power: number
    overload: number
    distributedLogicGroup: number
    statisticState: StatisticStateType
    load: number
}

class DOut implements IDOut {
    private onValueChangeCallbacks: Array<() => void> = [];
    private onSwitchOnCallbacks: Array<() => void> = [];
    private onSwitchOffCallbacks: Array<() => void> = [];
    private onOverloadCallbacks: Array<() => void> = [];

    constructor(private raw: DOutRaw) {
        this.raw.add_event(EventType.OnValueChange, () => {
            this.onValueChangeCallbacks.forEach(callback => {
                callback();
            });
        });

        this.raw.add_event(EventType.OnSwitchOn, () => {
            this.onSwitchOnCallbacks.forEach(callback => {
                callback();
            });
        });

        this.raw.add_event(EventType.OnSwitchOff, () => {
            this.onSwitchOffCallbacks.forEach(callback => {
                callback();
            });
        });

        this.raw.add_event(EventType.OnOverload, () => {
            this.onOverloadCallbacks.forEach(callback => {
                callback();
            });
        });
    }

    addOnValueChange(callback: () => void): void {
        this.onValueChangeCallbacks.push(callback);
    }
    addOnSwitchOn(callback: () => void): void {
        this.onSwitchOnCallbacks.push(callback);
    }
    addOnSwitchOff(callback: () => void): void {
        this.onSwitchOffCallbacks.push(callback);
    }
    addOnOverload(callback: () => void): void {
        this.onOverloadCallbacks.push(callback);
    }
    setValue(value: number): void {
        this.raw.set(PropertyType.Value, value);
    }
    switch(miliseconds: number): void {
        this.raw.execute(MethodType.Switch, miliseconds);
    }
    switchOn(miliseconds: number): void {
        this.raw.execute(MethodType.SwitchOn, miliseconds);
    }
    switchOff(miliseconds: number): void {
        this.raw.execute(MethodType.SwitchOff, miliseconds);
    }
    setOverload(overload: number): void {
        this.raw.set(PropertyType.Overload, overload);
    }
    get value(): boolean {
        return this.raw.get(PropertyType.Value) === 1;
    }
    set value(val: boolean) {
        this.raw.set(PropertyType.Value, val ? 1 : 0);
    }
    get voltageType(): VoltageType {
        return this.raw.get(PropertyType.VoltageType);
    }
    set voltageType(value: VoltageType) {
        this.raw.set(PropertyType.VoltageType, value);
    }
    get voltageValue(): number {
        return this.raw.get(PropertyType.VoltageValue);
    }
    set voltageValue(value: number) {
        this.raw.set(PropertyType.VoltageValue, value);
    }
    get power(): number {
        return this.raw.get(PropertyType.Power);
    }
    get overload(): number {
        return this.raw.get(PropertyType.Overload);
    }
    set overload(value: number) {
        this.raw.set(PropertyType.Overload, value);
    }
    get distributedLogicGroup(): number {
        return this.raw.get(PropertyType.DistributedLogicGroup);
    }
    set distributedLogicGroup(value: number) {
        this.raw.set(PropertyType.DistributedLogicGroup, value);
    }
    get statisticState(): StatisticStateType {
        return this.raw.get(PropertyType.StatisticState);
    }
    set statisticState(value: StatisticStateType) {
        this.raw.set(PropertyType.StatisticState, value);
    }
    get load(): number {
        return this.raw.get(PropertyType.Load);
    }
    set load(value: number) {
        this.raw.set(PropertyType.Load, value);
    }
}

class DOutRemote implements IDOut {
    constructor(private objectName: string, private gate: RemoteGate) {

    }

    addOnValueChange(_callback: () => void): void {
        // Remote events are not supported
    }
    addOnSwitchOn(_callback: () => void): void {
        // Remote events are not supported
    }
    addOnSwitchOff(_callback: () => void): void {
        // Remote events are not supported
    }
    addOnOverload(_callback: () => void): void {
        // Remote events are not supported
    }

    setValue(value: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Value)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    switch(miliseconds: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.Switch)
            .addParameter(miliseconds)
            .build();
        this.gate.runScript(cmd!);
    }

    switchOn(miliseconds: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.SwitchOn)
            .addParameter(miliseconds)
            .build();
        this.gate.runScript(cmd!);
    }

    switchOff(miliseconds: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.SwitchOff)
            .addParameter(miliseconds)
            .build();
        this.gate.runScript(cmd!);
    }

    setOverload(overload: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Overload)
            .addParameter(overload)
            .build();
        this.gate.runScript(cmd!);
    }

    get value(): boolean {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Value)
            .build();
        return this.gate.runScript(cmd!) === 1;
    }

    set value(val: boolean) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Value)
            .addParameter(val ? 1 : 0)
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

    get voltageValue(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.VoltageValue)
            .build();
        return this.gate.runScript(cmd!);
    }

    set voltageValue(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.VoltageValue)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    get power(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Power)
            .build();
        return this.gate.runScript(cmd!);
    }

    get overload(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Overload)
            .build();
        return this.gate.runScript(cmd!);
    }

    set overload(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Overload)
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

    get statisticState(): StatisticStateType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.StatisticState)
            .build();
        return this.gate.runScript(cmd!);
    }

    set statisticState(value: StatisticStateType) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.StatisticState)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    get load(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Load)
            .build();
        return this.gate.runScript(cmd!);
    }

    set load(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Load)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
}

export {
    DOut, DOutRaw, DOutRemote, StatisticStateType, VoltageType
}
