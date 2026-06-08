// Created from: src/interfaces/module_2_0_DALI_GEAR_DT8_fv02_08.xml, object name="DALI_GEAR_DT8"

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
    DAPCValue = 2,
    HSVHue = 4,
    HSVSaturation = 5,
    HSVValue = 6
}

enum MethodType {
    Identify = 0,
    SetDAPCValue = 1,
    Switch = 2,
    SwitchOn = 3,
    SwitchOff = 4,
    Hold = 5,
    HoldUp = 6,
    HoldDown = 7,
    SetColourTemperature = 12,
    SetRGBValue = 13,
    SetWAFValue = 14,
    SetHSVHue = 15,
    SetHSVSaturation = 16,
    SetHSVValue = 17
}

declare class DaliGearDt8Raw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface IDaliGearDt8 {
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
    /** Wartość koloru barwy według modelu HSV (0-360) */
    readonly hsvHue: number
    /** Wartość nasycenia barwy według modelu HSV (0.00-1.00) */
    readonly hsvSaturation: number
    /** Wartość jasności według modelu HSV (zakres 0.00-1.00) */
    readonly hsvValue: number
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
    /** Ustawia wartość barwy według modelu HSV (zakres 0-360). \nParametr RampTime ustawiany w skali logarytmicznej 0.8 - 90 [s] */
    setHSVHue: (value: number, rampTime?: number) => void
    /** Ustawia wartość nasycenia według modelu HSV (zakres 0.00-1.00). \nParametr RampTime ustawiany w skali logarytmicznej 0.8 - 90 [s] */
    setHSVSaturation: (value: number, rampTime?: number) => void
    /** Ustawia wartość jasności według modelu HSV (zakres 0.00-1.00). \nParametr RampTime ustawiany w skali logarytmicznej 0.8 - 90 [s] */
    setHSVValue: (value: number, rampTime?: number) => void
    /** Ustawia wartość kanałów R (Red), G (Green), B (Blue). \nParametr RampTime ustawiany w skali logarytmicznej 0.8 - 90 [s] */
    setRGBValue: (r: number, g: number, b: number, rampTime?: number) => void
    /** Ustawia wartość kanału W (White), oraz parametrów A (Amber) i F (Freecolour). \nParametr RampTime ustawiany w skali logarytmicznej 0.8 - 90 [s] */
    setWAFValue: (w: number, a: number, f: number, rampTime?: number) => void
    /** Ustawia wartość temperatury koloru, gdzie  0 - fizyczne minimum, 100 - fizyczne maksimum. \nParametr RampTime ustawiany w skali logarytmicznej 0.8 - 90 [s] */
    setColourTemperature: (value: number, rampTime?: number) => void
}

class DaliGearDt8 implements IDaliGearDt8 {
    private onDAPCValueChangeCallbacks: Array<() => void> = [];
    private onSwitchOnCallbacks: Array<() => void> = [];
    private onSwitchOffCallbacks: Array<() => void> = [];

    constructor(private raw: DaliGearDt8Raw) {
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
    get hsvHue(): number { return this.raw.get(PropertyType.HSVHue); }
    get hsvSaturation(): number { return this.raw.get(PropertyType.HSVSaturation); }
    get hsvValue(): number { return this.raw.get(PropertyType.HSVValue); }

    identify(): void { this.raw.execute(MethodType.Identify); }
    setDAPCValue(value: number, rampTime: number = 0): void { this.raw.execute(MethodType.SetDAPCValue, value, rampTime); }
    switch(rampTime: number = 0): void { this.raw.execute(MethodType.Switch, rampTime); }
    switchOn(rampTime: number = 0): void { this.raw.execute(MethodType.SwitchOn, rampTime); }
    switchOff(rampTime: number = 0): void { this.raw.execute(MethodType.SwitchOff, rampTime); }
    hold(rampTime: number): void { this.raw.execute(MethodType.Hold, rampTime); }
    holdUp(rampTime: number): void { this.raw.execute(MethodType.HoldUp, rampTime); }
    holdDown(rampTime: number): void { this.raw.execute(MethodType.HoldDown, rampTime); }
    setHSVHue(value: number, rampTime: number = 0): void { this.raw.execute(MethodType.SetHSVHue, value, rampTime); }
    setHSVSaturation(value: number, rampTime: number = 0): void { this.raw.execute(MethodType.SetHSVSaturation, value, rampTime); }
    setHSVValue(value: number, rampTime: number = 0): void { this.raw.execute(MethodType.SetHSVValue, value, rampTime); }
    setRGBValue(r: number, g: number, b: number, rampTime: number = 0): void { this.raw.execute(MethodType.SetRGBValue, r, g, b, rampTime); }
    setWAFValue(w: number, a: number, f: number, rampTime: number = 0): void { this.raw.execute(MethodType.SetWAFValue, w, a, f, rampTime); }
    setColourTemperature(value: number, rampTime: number = 0): void { this.raw.execute(MethodType.SetColourTemperature, value, rampTime); }
}

class DaliGearDt8Remote implements IDaliGearDt8 {
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
    get hsvHue(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.HSVHue).build();
        return this.gate.runScript(cmd!);
    }
    get hsvSaturation(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.HSVSaturation).build();
        return this.gate.runScript(cmd!);
    }
    get hsvValue(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.HSVValue).build();
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
    setHSVHue(value: number, rampTime: number = 0): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SetHSVHue).addParameter(value).addParameter(rampTime).build();
        this.gate.runScript(cmd!);
    }
    setHSVSaturation(value: number, rampTime: number = 0): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SetHSVSaturation).addParameter(value).addParameter(rampTime).build();
        this.gate.runScript(cmd!);
    }
    setHSVValue(value: number, rampTime: number = 0): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SetHSVValue).addParameter(value).addParameter(rampTime).build();
        this.gate.runScript(cmd!);
    }
    setRGBValue(r: number, g: number, b: number, rampTime: number = 0): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SetRGBValue).addParameter(r).addParameter(g).addParameter(b).addParameter(rampTime).build();
        this.gate.runScript(cmd!);
    }
    setWAFValue(w: number, a: number, f: number, rampTime: number = 0): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SetWAFValue).addParameter(w).addParameter(a).addParameter(f).addParameter(rampTime).build();
        this.gate.runScript(cmd!);
    }
    setColourTemperature(value: number, rampTime: number = 0): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SetColourTemperature).addParameter(value).addParameter(rampTime).build();
        this.gate.runScript(cmd!);
    }
}

export { DaliGearDt8, DaliGearDt8Raw, DaliGearDt8Remote }
