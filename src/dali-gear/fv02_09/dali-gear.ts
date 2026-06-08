// Created from: src/interfaces/module_2_0_DALI_GEAR_BASIC_fv02_09.xml, object name="DALI_GEAR"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnDAPCValueChange = 0,
    OnSwitchOn = 1,
    OnSwitchOff = 2
}

enum PropertyType {
    Group = 0,
    Address = 1,
    DAPCValue = 2
}

enum MethodType {
    Identify = 0,
    SetDAPCValue = 1,
    Switch = 2,
    SwitchOn = 3,
    SwitchOff = 4,
    Hold = 5,
    HoldUp = 6,
    HoldDown = 7
}

declare class DaliGearRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface IDaliGear {
    /** Zdarzenie wywoływane przy zmianie wartości DAPCValue */
    addOnDAPCValueChange: (callback: () => void) => void
    /** Zdarzenie wywoływane przy zmianie wartości DAPCValue z 0 na wartość większą */
    addOnSwitchOn: (callback: () => void) => void
    /** Zdarzenie wywoływane przy zmianie wartości DAPCValue na 0 */
    addOnSwitchOff: (callback: () => void) => void
    /** Adres statecznika */
    readonly address: number
    /** Numery grup do których należy statecznik, kolejne grupy z zakresu 1-16 podawane po przecinku. \n0 - brak przynależności do grupy */
    group: string
    /** Wartość z jaką świeci oprawa */
    readonly dapcValue: number
    /** Włącza oprawę na 2 sekundy */
    identify: () => void
    /** Ustawia wartość z jaką świeci oprawa. \nParametr RampTime ustawiany w skali logarytmicznej 0.8 - 90 [s] */
    setDAPCValue: (value: number, rampTime?: number) => void
    /** Zmienia stan oprawy na przeciwny (0 / 254). \nParametr RampTime ustawiany w skali logarytmicznej 0.8 - 90 [s] */
    switch: (rampTime?: number) => void
    /** Włącza oprawę. \nParametr RampTime ustawiany w skali logarytmicznej 0.8 - 90 [s] */
    switchOn: (rampTime?: number) => void
    /** Wyłącza oprawę. \nParametr RampTime ustawiany w skali logarytmicznej 0.8 - 90 [s] */
    switchOff: (rampTime?: number) => void
    /** Realizuje funkcję rozjaśniania / ściemniania oprawy */
    hold: (rampTime: number) => void
    /** Realizuje funkcję rozjaśniania oprawy */
    holdUp: (rampTime: number) => void
    /** Realizuje funkcję ściemniania oprawy */
    holdDown: (rampTime: number) => void
}

class DaliGear implements IDaliGear {
    private onDAPCValueChangeCallbacks: Array<() => void> = [];
    private onSwitchOnCallbacks: Array<() => void> = [];
    private onSwitchOffCallbacks: Array<() => void> = [];

    constructor(private raw: DaliGearRaw) {
        this.raw.add_event(EventType.OnDAPCValueChange, () => {
            this.onDAPCValueChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnSwitchOn, () => {
            this.onSwitchOnCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnSwitchOff, () => {
            this.onSwitchOffCallbacks.forEach(callback => { callback(); });
        });
    }

    addOnDAPCValueChange(callback: () => void): void { this.onDAPCValueChangeCallbacks.push(callback); }
    addOnSwitchOn(callback: () => void): void { this.onSwitchOnCallbacks.push(callback); }
    addOnSwitchOff(callback: () => void): void { this.onSwitchOffCallbacks.push(callback); }

    get address(): number { return this.raw.get(PropertyType.Address); }
    get group(): string { return this.raw.get(PropertyType.Group); }
    set group(val: string) { this.raw.set(PropertyType.Group, val); }
    get dapcValue(): number { return this.raw.get(PropertyType.DAPCValue); }

    identify(): void { this.raw.execute(MethodType.Identify); }
    setDAPCValue(value: number, rampTime: number = 0): void { this.raw.execute(MethodType.SetDAPCValue, value, rampTime); }
    switch(rampTime: number = 0): void { this.raw.execute(MethodType.Switch, rampTime); }
    switchOn(rampTime: number = 0): void { this.raw.execute(MethodType.SwitchOn, rampTime); }
    switchOff(rampTime: number = 0): void { this.raw.execute(MethodType.SwitchOff, rampTime); }
    hold(rampTime: number): void { this.raw.execute(MethodType.Hold, rampTime); }
    holdUp(rampTime: number): void { this.raw.execute(MethodType.HoldUp, rampTime); }
    holdDown(rampTime: number): void { this.raw.execute(MethodType.HoldDown, rampTime); }
}

class DaliGearRemote implements IDaliGear {
    constructor(private objectName: string, private gate: RemoteGate) {}

    addOnDAPCValueChange(_callback: () => void): void { /* Remote events are not supported */ }
    addOnSwitchOn(_callback: () => void): void { /* Remote events are not supported */ }
    addOnSwitchOff(_callback: () => void): void { /* Remote events are not supported */ }

    get address(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Address).build();
        return this.gate.runScript(cmd!);
    }
    get group(): string {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Group).build();
        return this.gate.runScript(cmd!);
    }
    set group(val: string) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.Group).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
    get dapcValue(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.DAPCValue).build();
        return this.gate.runScript(cmd!);
    }

    identify(): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.Identify).build();
        this.gate.runScript(cmd!);
    }
    setDAPCValue(value: number, rampTime: number = 0): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SetDAPCValue).addParameter(value).addParameter(rampTime).build();
        this.gate.runScript(cmd!);
    }
    switch(rampTime: number = 0): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.Switch).addParameter(rampTime).build();
        this.gate.runScript(cmd!);
    }
    switchOn(rampTime: number = 0): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SwitchOn).addParameter(rampTime).build();
        this.gate.runScript(cmd!);
    }
    switchOff(rampTime: number = 0): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SwitchOff).addParameter(rampTime).build();
        this.gate.runScript(cmd!);
    }
    hold(rampTime: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.Hold).addParameter(rampTime).build();
        this.gate.runScript(cmd!);
    }
    holdUp(rampTime: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.HoldUp).addParameter(rampTime).build();
        this.gate.runScript(cmd!);
    }
    holdDown(rampTime: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.HoldDown).addParameter(rampTime).build();
        this.gate.runScript(cmd!);
    }
}

export { DaliGear, DaliGearRaw, DaliGearRemote }
