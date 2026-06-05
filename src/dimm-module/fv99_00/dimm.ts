// Created from: src/interfaces/module_dimm_fv99_0.xml, object name="DIMM"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnChange = 0,
    OnSwitchOn = 1,
    OnSwitchOff = 2
}

enum PropertyType {
    Value = 0,
    Ramp = 1,
    Min = 2,
    Max = 3
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
    /** Wykonuje przypisane komendy w przypadku zmiany wartości wyjścia */
    addOnChange: (callback: () => void) => void
    /** Wykonuje przypisane komendy gdy nastąpi ustawienie na wyjściu wartości 100% */
    addOnSwitchOn: (callback: () => void) => void
    /** Wykonuje przypisane komendy gdy nastąpi ustawienie na wyjściu wartości 0% */
    addOnSwitchOff: (callback: () => void) => void
    /** Podaje aktualną wartość wejścia */
    value: number
    /** Wartość opóźnienia przy zmianie intensywności świecenia (w ms) */
    ramp: number
    /** Minimalna wartość jaka może przyjąć Value, próba ustawienia wartości mniejszej zwraca błąd */
    min: number
    /** Maksymalna wartość jaka może przyjąć Value, próba ustawienia wartości większej zwraca błąd */
    max: number
    /** Zmienia wartość wyjścia na przeciwny (0/1) */
    switch: (time: number, ramp?: number) => void
    /** Ustawienie wartości wyjścia na 1 */
    switchOn: (time: number, ramp?: number) => void
    /** Ustawienie wartości wyjścia na 0 */
    switchOff: (time: number, ramp?: number) => void
}

class Dimm implements IDimm {
    private onChangeCallbacks: Array<() => void> = [];
    private onSwitchOnCallbacks: Array<() => void> = [];
    private onSwitchOffCallbacks: Array<() => void> = [];

    constructor(private raw: DimmRaw) {
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

    get value(): number { return this.raw.get(PropertyType.Value); }
    set value(val: number) { this.raw.set(PropertyType.Value, val); }
    get ramp(): number { return this.raw.get(PropertyType.Ramp); }
    set ramp(val: number) { this.raw.set(PropertyType.Ramp, val); }
    get min(): number { return this.raw.get(PropertyType.Min); }
    set min(val: number) { this.raw.set(PropertyType.Min, val); }
    get max(): number { return this.raw.get(PropertyType.Max); }
    set max(val: number) { this.raw.set(PropertyType.Max, val); }

    switch(time: number, ramp: number = 500): void {
        this.raw.execute(MethodType.Switch, time, ramp);
    }
    switchOn(time: number, ramp: number = 500): void {
        this.raw.execute(MethodType.SwitchOn, time, ramp);
    }
    switchOff(time: number, ramp: number = 500): void {
        this.raw.execute(MethodType.SwitchOff, time, ramp);
    }
}

class DimmRemote implements IDimm {
    constructor(private objectName: string, private gate: RemoteGate) {}

    addOnChange(_callback: () => void): void { /* Remote events are not supported */ }
    addOnSwitchOn(_callback: () => void): void { /* Remote events are not supported */ }
    addOnSwitchOff(_callback: () => void): void { /* Remote events are not supported */ }

    get value(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Value).build();
        return this.gate.runScript(cmd!);
    }
    set value(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.Value).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
    get ramp(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Ramp).build();
        return this.gate.runScript(cmd!);
    }
    set ramp(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.Ramp).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
    get min(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Min).build();
        return this.gate.runScript(cmd!);
    }
    set min(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.Min).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
    get max(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Max).build();
        return this.gate.runScript(cmd!);
    }
    set max(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.Max).addParameter(val).build();
        this.gate.runScript(cmd!);
    }

    switch(time: number, ramp: number = 500): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.Switch).addParameter(time).addParameter(ramp).build();
        this.gate.runScript(cmd!);
    }
    switchOn(time: number, ramp: number = 500): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SwitchOn).addParameter(time).addParameter(ramp).build();
        this.gate.runScript(cmd!);
    }
    switchOff(time: number, ramp: number = 500): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SwitchOff).addParameter(time).addParameter(ramp).build();
        this.gate.runScript(cmd!);
    }
}

export { Dimm, DimmRaw, DimmRemote }
