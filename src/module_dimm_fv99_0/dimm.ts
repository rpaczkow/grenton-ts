// Created from: src/interfaces/module_dimm_fv99_0.xml, object name="DIMM"

import { rawExecutionBuilderFactory } from "../core/execution-builder"
import { RemoteGate } from "../core/remote-gate"

enum EventType {
    OnChange = 0,
    OnSwitchOn = 1,
    OnSwitchOff = 2
}

enum PropertyType {
    Value = 0,
    RampTime = 1,
    MinValue = 2,
    MaxValue = 3
}

enum MethodType {
    Switch = 0,
    SwitchOn = 1,
    SwitchOff = 2
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
    setValue: (value: number) => void
    setRampTime: (rampTime: number) => void
    setMinValue: (value: number) => void
    setMaxValue: (value: number) => void
    switch: (time: number, ramp?: number) => void
    switchOn: (time: number, ramp?: number) => void
    switchOff: (time: number, ramp?: number) => void
    value: boolean
    rampTime: number
    minValue: number
    maxValue: number
}

class Dimm implements IDimm {
    private onChangeCallbacks: Array<() => void> = [];
    private onSwitchOnCallbacks: Array<() => void> = [];
    private onSwitchOffCallbacks: Array<() => void> = [];

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
}

export {
    Dimm, DimmRaw, DimmRemote
}
