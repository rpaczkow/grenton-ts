// Created from: src/interfaces/module_2_0_LED_RGBW_DIN_fv04_02.xml, object name="LED_CCT"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnValueChange = 0,
    OnColorTempChange = 1,
    OnSwitchOn = 2,
    OnSwitchOff = 3,
    OnOutOfRange = 4
}

enum PropertyType {
    ColorTemp = 0,
    ColorTempPercent = 1,
    Value = 2,
    WarmValue = 3,
    ColdValue = 4,
    RampTime = 5,
    MaxValue = 6,
    MinValue = 7
}

enum MethodType {
    SetColorTemp = 0,
    SetColorTempPercent = 1,
    SetValue = 2,
    Switch = 3,
    SwitchOn = 4,
    SwitchOff = 5,
    SetRampTime = 5,
    SetMaxValue = 6,
    HoldValue = 6,
    SetMinValue = 7,
    HoldValueUp = 7,
    HoldValueDown = 8,
    HoldColorTemp = 9,
    HoldColorTempWarm = 10,
    HoldColorTempCool = 11
}

declare class LedCctRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface ILedCct {
    /** Zdarzenie wywoływane w przypadku zmiany wartości cechy Value */
    addOnValueChange: (callback: () => void) => void
    /** Zdarzenie wywoływane w przypadku zmiany temperatury barwowej */
    addOnColorTempChange: (callback: () => void) => void
    /** Zdarzenie wywoływane w momencie zmiany stanu wyjścia ze stanu=0 na stan>0 */
    addOnSwitchOn: (callback: () => void) => void
    /** Zdarzenie wywoływane w momencie ustawienia 0 na wyjściu */
    addOnSwitchOff: (callback: () => void) => void
    /** Zdarzenie wywoływane w momencie ustawienia cechy Value na wartości spoza wyznaczonego zakresu (Min - Max) */
    addOnOutOfRange: (callback: () => void) => void
    /** Temperatura barwowa (zakres 2700-6500 K) */
    readonly colorTemp: number
    /** Temperatura barwowa w procentach (0% = 6500K zimna, 100% = 2700K ciepła) */
    readonly colorTempPercent: number
    /** Wartość jasności (zakres 0-255) */
    readonly value: number
    /** Obliczona wartość kanału ciepłej bieli WW (0-255) */
    readonly warmValue: number
    /** Obliczona wartość kanału zimnej bieli CW (0-255) */
    readonly coldValue: number
    /** Czas narastania wartości jasności */
    rampTime: number
    /** Maksymalna wartość jaka może przyjąć Value */
    maxValue: number
    /** Minimalna wartość jaka może przyjąć Value */
    minValue: number
    /** Ustawia temperaturę barwową (2700-6500 K) */
    setColorTemp: (colorTemp: number, ramp?: number) => void
    /** Ustawia temperaturę barwową w procentach (0-100%) */
    setColorTempPercent: (value: number, ramp?: number) => void
    /** Ustawia wartość jasności (zakres 0-255) */
    setValue: (value: number, ramp?: number) => void
    /** Zmienia stan wyjścia na przeciwny */
    switch: (mode: number, time: number, ramp?: number) => void
    /** Ustawia wartość wyjścia na MaxValue */
    switchOn: (time: number, ramp?: number) => void
    /** Ustawia wartość wyjścia na 0 */
    switchOff: (time: number, ramp?: number) => void
    /** Ustawia czas narastania wartości jasności */
    setRampTime: (rampTime: number) => void
    /** Ustawia maksymalną wartość dla Value */
    setMaxValue: (value: number) => void
    /** Ustawia minimalną wartość dla Value */
    setMinValue: (value: number) => void
    /** Realizacja funkcji rozjaśniania/ściemniania */
    holdValue: (ramp?: number) => void
    /** Realizacja funkcji rozjaśniania */
    holdValueUp: (ramp?: number) => void
    /** Realizacja funkcji ściemniania */
    holdValueDown: (ramp?: number) => void
    /** Realizacja funkcji płynnej zmiany temperatury barwowej */
    holdColorTemp: (ramp?: number) => void
    /** Przesunięcie temperatury barwowej w kierunku ciepłej (2700K) */
    holdColorTempWarm: (ramp?: number) => void
    /** Przesunięcie temperatury barwowej w kierunku zimnej (6500K) */
    holdColorTempCool: (ramp?: number) => void
}

class LedCct implements ILedCct {
    private onValueChangeCallbacks: Array<() => void> = [];
    private onColorTempChangeCallbacks: Array<() => void> = [];
    private onSwitchOnCallbacks: Array<() => void> = [];
    private onSwitchOffCallbacks: Array<() => void> = [];
    private onOutOfRangeCallbacks: Array<() => void> = [];

    constructor(private raw: LedCctRaw) {
        this.raw.add_event(EventType.OnValueChange, () => {
            this.onValueChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnColorTempChange, () => {
            this.onColorTempChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnSwitchOn, () => {
            this.onSwitchOnCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnSwitchOff, () => {
            this.onSwitchOffCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnOutOfRange, () => {
            this.onOutOfRangeCallbacks.forEach(callback => { callback(); });
        });
    }

    addOnValueChange(callback: () => void): void { this.onValueChangeCallbacks.push(callback); }
    addOnColorTempChange(callback: () => void): void { this.onColorTempChangeCallbacks.push(callback); }
    addOnSwitchOn(callback: () => void): void { this.onSwitchOnCallbacks.push(callback); }
    addOnSwitchOff(callback: () => void): void { this.onSwitchOffCallbacks.push(callback); }
    addOnOutOfRange(callback: () => void): void { this.onOutOfRangeCallbacks.push(callback); }

    get colorTemp(): number { return this.raw.get(PropertyType.ColorTemp); }
    get colorTempPercent(): number { return this.raw.get(PropertyType.ColorTempPercent); }
    get value(): number { return this.raw.get(PropertyType.Value); }
    get warmValue(): number { return this.raw.get(PropertyType.WarmValue); }
    get coldValue(): number { return this.raw.get(PropertyType.ColdValue); }
    get rampTime(): number { return this.raw.get(PropertyType.RampTime); }
    set rampTime(val: number) { this.raw.set(PropertyType.RampTime, val); }
    get maxValue(): number { return this.raw.get(PropertyType.MaxValue); }
    set maxValue(val: number) { this.raw.set(PropertyType.MaxValue, val); }
    get minValue(): number { return this.raw.get(PropertyType.MinValue); }
    set minValue(val: number) { this.raw.set(PropertyType.MinValue, val); }

    setColorTemp(colorTemp: number, ramp: number = 0): void { this.raw.execute(MethodType.SetColorTemp, colorTemp, ramp); }
    setColorTempPercent(value: number, ramp: number = 0): void { this.raw.execute(MethodType.SetColorTempPercent, value, ramp); }
    setValue(value: number, ramp: number = 0): void { this.raw.execute(MethodType.SetValue, value, ramp); }
    switch(mode: number, time: number, ramp: number = 0): void { this.raw.execute(MethodType.Switch, mode, time, ramp); }
    switchOn(time: number, ramp: number = 0): void { this.raw.execute(MethodType.SwitchOn, time, ramp); }
    switchOff(time: number, ramp: number = 0): void { this.raw.execute(MethodType.SwitchOff, time, ramp); }
    setRampTime(rampTime: number): void { this.raw.set(PropertyType.RampTime, rampTime); }
    setMaxValue(value: number): void { this.raw.set(PropertyType.MaxValue, value); }
    setMinValue(value: number): void { this.raw.set(PropertyType.MinValue, value); }
    holdValue(ramp: number = 0): void { this.raw.execute(MethodType.HoldValue, ramp); }
    holdValueUp(ramp: number = 0): void { this.raw.execute(MethodType.HoldValueUp, ramp); }
    holdValueDown(ramp: number = 0): void { this.raw.execute(MethodType.HoldValueDown, ramp); }
    holdColorTemp(ramp: number = 0): void { this.raw.execute(MethodType.HoldColorTemp, ramp); }
    holdColorTempWarm(ramp: number = 0): void { this.raw.execute(MethodType.HoldColorTempWarm, ramp); }
    holdColorTempCool(ramp: number = 0): void { this.raw.execute(MethodType.HoldColorTempCool, ramp); }
}

class LedCctRemote implements ILedCct {
    constructor(private objectName: string, private gate: RemoteGate) {}

    addOnValueChange(_callback: () => void): void { /* Remote events are not supported */ }
    addOnColorTempChange(_callback: () => void): void { /* Remote events are not supported */ }
    addOnSwitchOn(_callback: () => void): void { /* Remote events are not supported */ }
    addOnSwitchOff(_callback: () => void): void { /* Remote events are not supported */ }
    addOnOutOfRange(_callback: () => void): void { /* Remote events are not supported */ }

    get colorTemp(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.ColorTemp).build();
        return this.gate.runScript(cmd!);
    }
    get colorTempPercent(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.ColorTempPercent).build();
        return this.gate.runScript(cmd!);
    }
    get value(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Value).build();
        return this.gate.runScript(cmd!);
    }
    get warmValue(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.WarmValue).build();
        return this.gate.runScript(cmd!);
    }
    get coldValue(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.ColdValue).build();
        return this.gate.runScript(cmd!);
    }
    get rampTime(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.RampTime).build();
        return this.gate.runScript(cmd!);
    }
    set rampTime(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.RampTime).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
    get maxValue(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.MaxValue).build();
        return this.gate.runScript(cmd!);
    }
    set maxValue(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.MaxValue).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
    get minValue(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.MinValue).build();
        return this.gate.runScript(cmd!);
    }
    set minValue(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.MinValue).addParameter(val).build();
        this.gate.runScript(cmd!);
    }

    setColorTemp(colorTemp: number, ramp: number = 0): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SetColorTemp).addParameter(colorTemp).addParameter(ramp).build();
        this.gate.runScript(cmd!);
    }
    setColorTempPercent(value: number, ramp: number = 0): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SetColorTempPercent).addParameter(value).addParameter(ramp).build();
        this.gate.runScript(cmd!);
    }
    setValue(value: number, ramp: number = 0): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SetValue).addParameter(value).addParameter(ramp).build();
        this.gate.runScript(cmd!);
    }
    switch(mode: number, time: number, ramp: number = 0): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.Switch).addParameter(mode).addParameter(time).addParameter(ramp).build();
        this.gate.runScript(cmd!);
    }
    switchOn(time: number, ramp: number = 0): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SwitchOn).addParameter(time).addParameter(ramp).build();
        this.gate.runScript(cmd!);
    }
    switchOff(time: number, ramp: number = 0): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SwitchOff).addParameter(time).addParameter(ramp).build();
        this.gate.runScript(cmd!);
    }
    setRampTime(rampTime: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.RampTime).addParameter(rampTime).build();
        this.gate.runScript(cmd!);
    }
    setMaxValue(value: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.MaxValue).addParameter(value).build();
        this.gate.runScript(cmd!);
    }
    setMinValue(value: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.MinValue).addParameter(value).build();
        this.gate.runScript(cmd!);
    }
    holdValue(ramp: number = 0): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.HoldValue).addParameter(ramp).build();
        this.gate.runScript(cmd!);
    }
    holdValueUp(ramp: number = 0): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.HoldValueUp).addParameter(ramp).build();
        this.gate.runScript(cmd!);
    }
    holdValueDown(ramp: number = 0): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.HoldValueDown).addParameter(ramp).build();
        this.gate.runScript(cmd!);
    }
    holdColorTemp(ramp: number = 0): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.HoldColorTemp).addParameter(ramp).build();
        this.gate.runScript(cmd!);
    }
    holdColorTempWarm(ramp: number = 0): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.HoldColorTempWarm).addParameter(ramp).build();
        this.gate.runScript(cmd!);
    }
    holdColorTempCool(ramp: number = 0): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.HoldColorTempCool).addParameter(ramp).build();
        this.gate.runScript(cmd!);
    }
}

export { LedCct, LedCctRaw, LedCctRemote }
