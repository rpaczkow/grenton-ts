// Created from: src/interfaces/module_ledrgb_fv05_0.xml, object name="LEDRGB"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum StatisticStateType {
    Off = 0,
    Continuous = 1
}

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
    Hue = 1,
    Saturation = 2,
    RValue = 3,
    GValue = 4,
    BValue = 5,
    RGB = 6,
    RampTime = 7,
    MaxValue = 8,
    MinValue = 9,
    RCorrection = 10,
    GCorrection = 11,
    BCorrection = 12,
    StatisticState = 13,
    Load = 14
}

enum MethodType {
    SetValue = 0,
    SetHue = 1,
    SetSaturation = 2,
    SetRvalue = 3,
    SetGvalue = 4,
    SetBvalue = 5,
    SetRGBvalue = 6,
    HoldValue = 7,
    HoldHue = 8,
    SwitchOn = 9,
    SwitchOff = 10,
    Switch = 11
}

declare class LedrgbRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface ILedrgb {
    /** Zdarzenie wywoływane przy zmianie stanu wyjścia */
    addOnChange: (callback: () => void) => void
    /** Zdarzenie wywoływane w momencie zmiany stanu wyjścia ze stanu=0 na stan>0 */
    addOnSwitchOn: (callback: () => void) => void
    /** Zdarzenie wywoływane w momencie ustawienia 0 na wyjściu */
    addOnSwitchOff: (callback: () => void) => void
    /** Zdarzenie wywoływane przy zmianie wartości na wyższą (zbocze narastające) */
    addOnRaiseValueSet: (callback: () => void) => void
    /** Zdarzenie wywoływane przy zmianie wartości na niższą (zbocze opadające) */
    addOnLowerValueSet: (callback: () => void) => void
    /** Zdarzenie wywoływane w momencie ustawienia na wyjściu wartości spoza wyznaczonego zakresu (Min - Max) */
    addOnOutOfRange: (callback: () => void) => void
    /** Wartość jasności (zakres 0-1) */
    readonly value: number
    /** Wartość koloru barwy według modelu HSV (0-360) */
    readonly hue: number
    /** Wartość nasycenia barwy (0-1) */
    readonly saturation: number
    /** Wartość składowej R(0-255) - kolor czerwony */
    readonly rValue: number
    /** Wartość składowej G(0-255) - kolor zielony */
    readonly gValue: number
    /** Wartość składowej B(0-255) - kolor niebieski */
    readonly bValue: number
    /** Wartość koloru wg modelu RGB #RRGGBB (podawana w HEX) */
    readonly rgb: string
    /** Wartość czasu narastania wartości barwy oraz jasności */
    rampTime: number
    /** Maksymalna wartość jaka może przyjąć Value. Próba ustawienia wartości większej zwraca błąd */
    maxValue: number
    /** Minimalna wartość jaka może przyjąć Value. Próba ustawienia wartości mniejszej zwraca błąd */
    minValue: number
    /** Korekcja bieli dla kanału R, domyślnie 10000 */
    rCorrection: number
    /** Korekcja bieli dla kanału G, domyślnie 8333 */
    gCorrection: number
    /** Korekcja bieli dla kanału B, domyślnie 8333 */
    bCorrection: number
    /** Włącza raportowanie pomiaru do modułu statystyk:\nOff - wyłączony,\nContinuous - pomiar obciążenia w całym okresie pracy urządzenia */
    statisticState: StatisticStateType
    /** Mnożnik mierzonej wartości. Dla StatisticState:\nContinuous - wartość zużycia w jednostce czasu */
    load: number
    /** Ustawia wartość wyjścia (0-1) */
    setValue: (value: number, ramp?: number) => void
    /** Ustawia wartość barwy (0-360) */
    setHue: (value: number, ramp?: number) => void
    /** Ustawia wartość nasycenia (0-1) */
    setSaturation: (value: number, ramp?: number) => void
    /** Ustawia wartość składowej R(0-255) - kolor czerwony */
    setRvalue: (value: number, ramp?: number) => void
    /** Ustawia wartość składowej G(0-255) - kolor zielony */
    setGvalue: (value: number, ramp?: number) => void
    /** Ustawia wartość składowej B(0-255) - kolor niebieski */
    setBvalue: (value: number, ramp?: number) => void
    /** Ustawia wartość RGB za pomocą ciągu znaków #RRGGBB */
    setRGBvalue: (value: string, ramp?: number) => void
    /** Realizacja funkcji rozjaśniania/ściemniania */
    holdValue: (ramp?: number) => void
    /** Realizacja funkcji płynnej zmiany barwy */
    holdHue: (ramp?: number) => void
    /** Ustawia wartość wyjścia na MaxValue */
    switchOn: (time: number, ramp?: number) => void
    /** Ustawia wartość wyjścia na MinValue */
    switchOff: (time: number, ramp?: number) => void
    /** Zmienia stan wyjścia na przeciwny. Pierwszy parametr to czas zmiany: 0 włącza wyjście na stałe, num na czas określony w parametrze. Drugi parametr to rampa jest opcjonalny, jeśli nie zostanie zdefiniowany przyjmowana jest wartość domyślna. */
    switch: (time: number, ramp?: number) => void
    /** Ustawia czas narastania wartości barwy i jasności */
    setRampTime: (rampTime: number) => void
    /** Ustawia maksymalną wartość dla Value */
    setMax: (value: number) => void
    /** Ustawia minimalną wartość dla Value */
    setMin: (value: number) => void
}

class Ledrgb implements ILedrgb {
    private onChangeCallbacks: Array<() => void> = [];
    private onSwitchOnCallbacks: Array<() => void> = [];
    private onSwitchOffCallbacks: Array<() => void> = [];
    private onRaiseValueSetCallbacks: Array<() => void> = [];
    private onLowerValueSetCallbacks: Array<() => void> = [];
    private onOutOfRangeCallbacks: Array<() => void> = [];

    constructor(private raw: LedrgbRaw) {
        this.raw.add_event(EventType.OnChange, () => {
            this.onChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnSwitchOn, () => {
            this.onSwitchOnCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnSwitchOff, () => {
            this.onSwitchOffCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnRaiseValueSet, () => {
            this.onRaiseValueSetCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnLowerValueSet, () => {
            this.onLowerValueSetCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnOutOfRange, () => {
            this.onOutOfRangeCallbacks.forEach(callback => { callback(); });
        });
    }

    addOnChange(callback: () => void): void { this.onChangeCallbacks.push(callback); }
    addOnSwitchOn(callback: () => void): void { this.onSwitchOnCallbacks.push(callback); }
    addOnSwitchOff(callback: () => void): void { this.onSwitchOffCallbacks.push(callback); }
    addOnRaiseValueSet(callback: () => void): void { this.onRaiseValueSetCallbacks.push(callback); }
    addOnLowerValueSet(callback: () => void): void { this.onLowerValueSetCallbacks.push(callback); }
    addOnOutOfRange(callback: () => void): void { this.onOutOfRangeCallbacks.push(callback); }

    get value(): number { return this.raw.get(PropertyType.Value); }
    get hue(): number { return this.raw.get(PropertyType.Hue); }
    get saturation(): number { return this.raw.get(PropertyType.Saturation); }
    get rValue(): number { return this.raw.get(PropertyType.RValue); }
    get gValue(): number { return this.raw.get(PropertyType.GValue); }
    get bValue(): number { return this.raw.get(PropertyType.BValue); }
    get rgb(): string { return this.raw.get(PropertyType.RGB); }
    get rampTime(): number { return this.raw.get(PropertyType.RampTime); }
    set rampTime(val: number) { this.raw.set(PropertyType.RampTime, val); }
    get maxValue(): number { return this.raw.get(PropertyType.MaxValue); }
    set maxValue(val: number) { this.raw.set(PropertyType.MaxValue, val); }
    get minValue(): number { return this.raw.get(PropertyType.MinValue); }
    set minValue(val: number) { this.raw.set(PropertyType.MinValue, val); }
    get rCorrection(): number { return this.raw.get(PropertyType.RCorrection); }
    set rCorrection(val: number) { this.raw.set(PropertyType.RCorrection, val); }
    get gCorrection(): number { return this.raw.get(PropertyType.GCorrection); }
    set gCorrection(val: number) { this.raw.set(PropertyType.GCorrection, val); }
    get bCorrection(): number { return this.raw.get(PropertyType.BCorrection); }
    set bCorrection(val: number) { this.raw.set(PropertyType.BCorrection, val); }
    get statisticState(): StatisticStateType { return this.raw.get(PropertyType.StatisticState); }
    set statisticState(val: StatisticStateType) { this.raw.set(PropertyType.StatisticState, val); }
    get load(): number { return this.raw.get(PropertyType.Load); }
    set load(val: number) { this.raw.set(PropertyType.Load, val); }

    setValue(value: number, ramp: number = 0): void { this.raw.execute(MethodType.SetValue, value, ramp); }
    setHue(value: number, ramp: number = 0): void { this.raw.execute(MethodType.SetHue, value, ramp); }
    setSaturation(value: number, ramp: number = 0): void { this.raw.execute(MethodType.SetSaturation, value, ramp); }
    setRvalue(value: number, ramp: number = 0): void { this.raw.execute(MethodType.SetRvalue, value, ramp); }
    setGvalue(value: number, ramp: number = 0): void { this.raw.execute(MethodType.SetGvalue, value, ramp); }
    setBvalue(value: number, ramp: number = 0): void { this.raw.execute(MethodType.SetBvalue, value, ramp); }
    setRGBvalue(value: string = "#ffffff", ramp: number = 0): void { this.raw.execute(MethodType.SetRGBvalue, value, ramp); }
    holdValue(ramp: number = 0): void { this.raw.execute(MethodType.HoldValue, ramp); }
    holdHue(ramp: number = 0): void { this.raw.execute(MethodType.HoldHue, ramp); }
    switchOn(time: number, ramp: number = 0): void { this.raw.execute(MethodType.SwitchOn, time, ramp); }
    switchOff(time: number, ramp: number = 0): void { this.raw.execute(MethodType.SwitchOff, time, ramp); }
    switch(time: number, ramp: number = 0): void { this.raw.execute(MethodType.Switch, time, ramp); }

    setRampTime(rampTime: number): void { this.raw.set(PropertyType.RampTime, rampTime); }
    setMax(value: number): void { this.raw.set(PropertyType.MaxValue, value); }
    setMin(value: number): void { this.raw.set(PropertyType.MinValue, value); }
}

class LedrgbRemote implements ILedrgb {
    constructor(private objectName: string, private gate: RemoteGate) {}

    addOnChange(_callback: () => void): void { /* Remote events are not supported */ }
    addOnSwitchOn(_callback: () => void): void { /* Remote events are not supported */ }
    addOnSwitchOff(_callback: () => void): void { /* Remote events are not supported */ }
    addOnRaiseValueSet(_callback: () => void): void { /* Remote events are not supported */ }
    addOnLowerValueSet(_callback: () => void): void { /* Remote events are not supported */ }
    addOnOutOfRange(_callback: () => void): void { /* Remote events are not supported */ }

    get value(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Value).build();
        return this.gate.runScript(cmd!);
    }
    get hue(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Hue).build();
        return this.gate.runScript(cmd!);
    }
    get saturation(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Saturation).build();
        return this.gate.runScript(cmd!);
    }
    get rValue(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.RValue).build();
        return this.gate.runScript(cmd!);
    }
    get gValue(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.GValue).build();
        return this.gate.runScript(cmd!);
    }
    get bValue(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.BValue).build();
        return this.gate.runScript(cmd!);
    }
    get rgb(): string {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.RGB).build();
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
    get rCorrection(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.RCorrection).build();
        return this.gate.runScript(cmd!);
    }
    set rCorrection(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.RCorrection).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
    get gCorrection(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.GCorrection).build();
        return this.gate.runScript(cmd!);
    }
    set gCorrection(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.GCorrection).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
    get bCorrection(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.BCorrection).build();
        return this.gate.runScript(cmd!);
    }
    set bCorrection(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.BCorrection).addParameter(val).build();
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

    setValue(value: number, ramp: number = 0): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SetValue).addParameter(value).addParameter(ramp).build();
        this.gate.runScript(cmd!);
    }
    setHue(value: number, ramp: number = 0): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SetHue).addParameter(value).addParameter(ramp).build();
        this.gate.runScript(cmd!);
    }
    setSaturation(value: number, ramp: number = 0): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SetSaturation).addParameter(value).addParameter(ramp).build();
        this.gate.runScript(cmd!);
    }
    setRvalue(value: number, ramp: number = 0): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SetRvalue).addParameter(value).addParameter(ramp).build();
        this.gate.runScript(cmd!);
    }
    setGvalue(value: number, ramp: number = 0): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SetGvalue).addParameter(value).addParameter(ramp).build();
        this.gate.runScript(cmd!);
    }
    setBvalue(value: number, ramp: number = 0): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SetBvalue).addParameter(value).addParameter(ramp).build();
        this.gate.runScript(cmd!);
    }
    setRGBvalue(value: string = "#ffffff", ramp: number = 0): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SetRGBvalue).addParameter(value).addParameter(ramp).build();
        this.gate.runScript(cmd!);
    }
    holdValue(ramp: number = 0): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.HoldValue).addParameter(ramp).build();
        this.gate.runScript(cmd!);
    }
    holdHue(ramp: number = 0): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.HoldHue).addParameter(ramp).build();
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
    switch(time: number, ramp: number = 0): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.Switch).addParameter(time).addParameter(ramp).build();
        this.gate.runScript(cmd!);
    }

    setRampTime(rampTime: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.RampTime).addParameter(rampTime).build();
        this.gate.runScript(cmd!);
    }
    setMax(value: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.MaxValue).addParameter(value).build();
        this.gate.runScript(cmd!);
    }
    setMin(value: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.MinValue).addParameter(value).build();
        this.gate.runScript(cmd!);
    }
}

export { Ledrgb, LedrgbRaw, LedrgbRemote, StatisticStateType }
