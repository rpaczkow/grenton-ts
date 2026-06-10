// Created from: src/interfaces/module_dout_fv07_3.xml, object name="DOUT"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum ValueType {
    Off = 0,
    On = 1
}

enum EventType {
    OnChange = 0,
    OnSwitchOn = 1,
    OnSwitchOff = 2
}

enum PropertyType {
    Value = 0
}

enum MethodType {
    Switch = 0,
    SwitchOn = 1,
    SwitchOff = 2
}

declare class DoutRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface IDout {
    /** Zdarzenie wywoływane w przypadku zmiany stanu na przeciwny */
    addOnChange: (callback: () => void) => void
    /** Zdarzenie wywoływane w momencie ustawienia stanu wysokiego na wejściu */
    addOnSwitchOn: (callback: () => void) => void
    /** Zdarzenie wywoływane w momencie ustawienia stanu niskiego na wejściu */
    addOnSwitchOff: (callback: () => void) => void
    /** Zwraca stan wyjścia jako 1 lub 0 */
    value: ValueType
    /** Ustawia stan wyjścia jako 1 lub 0 */
    setValue: (value: ValueType) => void
    /** Zmienia stan wyjścia na przeciwny. Parametr Time określa na jak długo następuje zmiana stanu, dla 0 jest ona stała */
    switch: (time?: number) => void
    /** Załącza wyjście. Parametr Time określa na jak długo następuje zmiana stanu, dla 0 jest ona stała */
    switchOn: (time?: number) => void
    /** Wyłącza wyjście. Parametr Time określa na jak długo następuje zmiana stanu, dla 0 jest ona stała */
    switchOff: (time?: number) => void
}

class Dout implements IDout {
    private onChangeCallbacks: Array<() => void> = [];
    private onSwitchOnCallbacks: Array<() => void> = [];
    private onSwitchOffCallbacks: Array<() => void> = [];

    constructor(private raw: DoutRaw) {
        this.raw.add_event(EventType.OnChange, () => {
            this.onChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnSwitchOn, () => {
            this.onSwitchOnCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnSwitchOff, () => {
            this.onSwitchOffCallbacks.forEach(callback => { callback(); });
        });
    }

    addOnChange(callback: () => void): void { this.onChangeCallbacks.push(callback); }
    addOnSwitchOn(callback: () => void): void { this.onSwitchOnCallbacks.push(callback); }
    addOnSwitchOff(callback: () => void): void { this.onSwitchOffCallbacks.push(callback); }

    get value(): ValueType { return this.raw.get(PropertyType.Value); }
    set value(val: ValueType) { this.raw.set(PropertyType.Value, val); }

    setValue(value: ValueType): void { this.raw.set(PropertyType.Value, value); }

    switch(time: number = 0): void { this.raw.execute(MethodType.Switch, time); }
    switchOn(time: number = 0): void { this.raw.execute(MethodType.SwitchOn, time); }
    switchOff(time: number = 0): void { this.raw.execute(MethodType.SwitchOff, time); }
}

class DoutRemote implements IDout {
    constructor(private objectName: string, private gate: RemoteGate) {}

    addOnChange(_callback: () => void): void { /* Remote events are not supported */ }
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

export { Dout, DoutRaw, DoutRemote, ValueType }
