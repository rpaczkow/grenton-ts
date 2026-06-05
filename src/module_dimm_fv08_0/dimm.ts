// Created from: src/interfaces/module_dimm_fv08_0.xml, object name="DIMM"

import { rawExecutionBuilderFactory } from "../core/execution-builder"
import { RemoteGate } from "../core/remote-gate"

enum EventType {
    OnChange = 0,
    OnSwitchOn = 1,
    OnSwitchOff = 2,
    OnRaiseValueSet = 3,
    OnLowerValueSet = 4,
    OnOutOfRange = 5
}

enum PropertyType {
    Value = 0,
    RampTime = 1,
    MinValue = 2,
    MaxValue = 3,
    StatisticState = 4,
    Load = 5
}

enum MethodType {
    Hold = 0,
    Switch = 1,
    SwitchOn = 2,
    SwitchOff = 3
}

enum StatisticStateType {
    Off = 0,
    Continuous = 1
}

declare class DimmRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface IDimm {
    addOnChange: (callback: () => void) => void
    addOnSwitchOn: (callback: () => void) => void
    addOnSwitchOff: (callback: () => void) => void
    addOnRaiseValueSet: (callback: () => void) => void
    addOnLowerValueSet: (callback: () => void) => void
    addOnOutOfRange: (callback: () => void) => void
    setValue: (value: number) => void
    setRampTime: (rampTime: number) => void
    setMinValue: (value: number) => void
    setMaxValue: (value: number) => void
    switch: (time: number, ramp?: number) => void
    switchOn: (time: number, ramp?: number) => void
    switchOff: (time: number, ramp?: number) => void
    hold: (ramp?: number) => void
    value: boolean
    rampTime: number
    minValue: number
    maxValue: number
    statisticState: StatisticStateType
    load: number
}

class Dimm implements IDimm {
    private onChangeCallbacks: Array<() => void> = [];
    private onSwitchOnCallbacks: Array<() => void> = [];
    private onSwitchOffCallbacks: Array<() => void> = [];
    private onRaiseValueSetCallbacks: Array<() => void> = [];
    private onLowerValueSetCallbacks: Array<() => void> = [];
    private onOutOfRangeCallbacks: Array<() => void> = [];

    constructor(private raw: DimmRaw) {
        this.raw.add_event(EventType.OnChange, () => {
            this.onChangeCallbacks.forEach(callback => {
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

        this.raw.add_event(EventType.OnRaiseValueSet, () => {
            this.onRaiseValueSetCallbacks.forEach(callback => {
                callback();
            });
        });

        this.raw.add_event(EventType.OnLowerValueSet, () => {
            this.onLowerValueSetCallbacks.forEach(callback => {
                callback();
            });
        });

        this.raw.add_event(EventType.OnOutOfRange, () => {
            this.onOutOfRangeCallbacks.forEach(callback => {
                callback();
            });
        });
    }

    addOnChange(callback: () => void): void {
        this.onChangeCallbacks.push(callback);
    }

    addOnSwitchOn(callback: () => void): void {
        this.onSwitchOnCallbacks.push(callback);
    }

    addOnSwitchOff(callback: () => void): void {
        this.onSwitchOffCallbacks.push(callback);
    }

    addOnRaiseValueSet(callback: () => void): void {
        this.onRaiseValueSetCallbacks.push(callback);
    }

    addOnLowerValueSet(callback: () => void): void {
        this.onLowerValueSetCallbacks.push(callback);
    }

    addOnOutOfRange(callback: () => void): void {
        this.onOutOfRangeCallbacks.push(callback);
    }

    setValue(value: number): void {
        this.raw.set(PropertyType.Value, value);
    }

    setRampTime(rampTime: number): void {
        this.raw.set(PropertyType.RampTime, rampTime);
    }

    setMinValue(value: number): void {
        this.raw.set(PropertyType.MinValue, value);
    }

    setMaxValue(value: number): void {
        this.raw.set(PropertyType.MaxValue, value);
    }

    switch(time: number, ramp?: number): void {
        if (ramp !== undefined) {
            this.raw.execute(MethodType.Switch, time, ramp);
        } else {
            this.raw.execute(MethodType.Switch, time);
        }
    }

    switchOn(time: number, ramp?: number): void {
        if (ramp !== undefined) {
            this.raw.execute(MethodType.SwitchOn, time, ramp);
        } else {
            this.raw.execute(MethodType.SwitchOn, time);
        }
    }

    switchOff(time: number, ramp?: number): void {
        if (ramp !== undefined) {
            this.raw.execute(MethodType.SwitchOff, time, ramp);
        } else {
            this.raw.execute(MethodType.SwitchOff, time);
        }
    }

    hold(ramp?: number): void {
        if (ramp !== undefined) {
            this.raw.execute(MethodType.Hold, ramp);
        } else {
            this.raw.execute(MethodType.Hold);
        }
    }

    get value(): boolean {
        return this.raw.get(PropertyType.Value) === 1;
    }

    set value(value: boolean) {
        this.raw.set(PropertyType.Value, value ? 1 : 0);
    }

    get rampTime(): number {
        return this.raw.get(PropertyType.RampTime);
    }

    set rampTime(value: number) {
        this.raw.set(PropertyType.RampTime, value);
    }

    get minValue(): number {
        return this.raw.get(PropertyType.MinValue);
    }

    set minValue(value: number) {
        this.raw.set(PropertyType.MinValue, value);
    }

    get maxValue(): number {
        return this.raw.get(PropertyType.MaxValue);
    }

    set maxValue(value: number) {
        this.raw.set(PropertyType.MaxValue, value);
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

class DimmRemote implements IDimm {
    constructor(private objectName: string, private gate: RemoteGate) {

    }

    addOnChange(_callback: () => void): void {
        // Remote events are not supported
    }

    addOnSwitchOn(_callback: () => void): void {
        // Remote events are not supported
    }

    addOnSwitchOff(_callback: () => void): void {
        // Remote events are not supported
    }

    addOnRaiseValueSet(_callback: () => void): void {
        // Remote events are not supported
    }

    addOnLowerValueSet(_callback: () => void): void {
        // Remote events are not supported
    }

    addOnOutOfRange(_callback: () => void): void {
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

    setRampTime(rampTime: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.RampTime)
            .addParameter(rampTime)
            .build();
        this.gate.runScript(cmd!);
    }

    setMinValue(value: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.MinValue)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    setMaxValue(value: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.MaxValue)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    switch(time: number, ramp?: number): void {
        const builder = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.Switch)
            .addParameter(time);

        if (ramp !== undefined) {
            builder.addParameter(ramp);
        }

        const cmd: string | null = builder.build();
        this.gate.runScript(cmd!);
    }

    switchOn(time: number, ramp?: number): void {
        const builder = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.SwitchOn)
            .addParameter(time);

        if (ramp !== undefined) {
            builder.addParameter(ramp);
        }

        const cmd: string | null = builder.build();
        this.gate.runScript(cmd!);
    }

    switchOff(time: number, ramp?: number): void {
        const builder = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.SwitchOff)
            .addParameter(time);

        if (ramp !== undefined) {
            builder.addParameter(ramp);
        }

        const cmd: string | null = builder.build();
        this.gate.runScript(cmd!);
    }

    hold(ramp?: number): void {
        const builder = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.Hold);

        if (ramp !== undefined) {
            builder.addParameter(ramp);
        }

        const cmd: string | null = builder.build();
        this.gate.runScript(cmd!);
    }

    get value(): boolean {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Value)
            .build();
        return this.gate.runScript(cmd!) === 1;
    }

    set value(value: boolean) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Value)
            .addParameter(value ? 1 : 0)
            .build();
        this.gate.runScript(cmd!);
    }

    get rampTime(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.RampTime)
            .build();
        return this.gate.runScript(cmd!);
    }

    set rampTime(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.RampTime)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    get minValue(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.MinValue)
            .build();
        return this.gate.runScript(cmd!);
    }

    set minValue(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.MinValue)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    get maxValue(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.MaxValue)
            .build();
        return this.gate.runScript(cmd!);
    }

    set maxValue(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.MaxValue)
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
    Dimm, DimmRaw, DimmRemote, StatisticStateType
}
