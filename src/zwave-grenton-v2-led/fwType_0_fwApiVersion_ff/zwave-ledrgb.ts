// Created from: src/interfaces/module_grenton_v2_led_zwave_ff.xml, object name="ZWAVE_LEDRGB"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnValueChange = 0,
    OnSwitchOn = 1,
    OnSwitchOff = 2,
    OnValueRise = 3,
    OnValueLower = 4,
    OnOutOfRange = 5,
    OnOvercurrentProtection = 6
}

enum PropertyType {
    Value = 0,
    Hue = 1,
    Saturation = 2,
    RGB = 3,
    RampTime = 4,
    MaxValue = 5,
    MinValue = 6,
    RedCorrection = 7,
    GreenCorrection = 8,
    BlueCorrection = 9,
    OvercurrentProtection = 10,
    RedValue = 11,
    GreenValue = 12,
    BlueValue = 13
}

enum MethodType {
    SetValue = 0,
    SetHue = 1,
    SetSaturation = 2,
    SetRGBvalue = 3,
    SwitchOn = 4,
    SwitchOff = 5,
    Switch = 6,
    ClearOvercurrentProtection = 7,
    SetRedValue = 8,
    SetGreenValue = 9,
    SetBlueValue = 10
}

declare class ZwaveLedrgbRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface IZwaveLedrgb {
    /** Zdarzenie wywoływane w przypadku zmiany wartości cechy Value */
    addOnValueChange: (callback: () => void) => void
    /** Zdarzenie wywoływane w momencie zmiany stanu wyjścia ze stanu=0 na stan>0 */
    addOnSwitchOn: (callback: () => void) => void
    /** Zdarzenie wywoływane w momencie ustawienia 0 na wyjściu */
    addOnSwitchOff: (callback: () => void) => void
    /** Zdarzenie wywoływane przy zmianie wartości cechy Value (modelu HSV) na wyższą (zbocze narastające) */
    addOnValueRise: (callback: () => void) => void
    /** Zdarzenie wywoływane przy zmianie wartości cechy Value (modelu HSV) na niższą (zbocze opadające) */
    addOnValueLower: (callback: () => void) => void
    /** Zdarzenie wywoływane w momencie ustawienia cechy Value (modelu HSV) na wartości spoza wyznaczonego zakresu (Min - Max) */
    addOnOutOfRange: (callback: () => void) => void
    /** Zdarzenie wywoływane w momencie uruchomienia zabezpieczenia nadprądowego */
    addOnOvercurrentProtection: (callback: () => void) => void
    /** Wartość jasności według modelu HSV (zakres 0.00-1.00) */
    readonly value: number
    /** Wartość koloru barwy według modelu HSV (0-360) */
    readonly hue: number
    /** Wartość nasycenia barwy według modelu HSV (0.00-1.00) */
    readonly saturation: number
    /** Wartość koloru wg modelu RGB #RRGGBB (podawana w HEX) */
    readonly rgb: string
    /** Wartość czasu narastania wartości barwy oraz jasności */
    rampTime: number
    /** Maksymalna wartość jaka może przyjąć Value. Próba ustawienia wartości większej zwraca błąd */
    maxValue: number
    /** Minimalna wartość jaka może przyjąć Value. Próba ustawienia wartości mniejszej zwraca błąd */
    minValue: number
    /** Korekcja bieli dla kanału R, domyślnie 100% */
    redCorrection: number
    /** Korekcja bieli dla kanału G, domyślnie 100% */
    greenCorrection: number
    /** Korekcja bieli dla kanału B, domyślnie 100% */
    blueCorrection: number
    /** Stan zabezpieczenia nadprądowego */
    readonly overcurrentProtection: number
    /** Wartość składowej R(0-255) - kolor czerwony */
    readonly redValue: number
    /** Wartość składowej G(0-255) - kolor zielony */
    readonly greenValue: number
    /** Wartość składowej B(0-255) - kolor niebieski */
    readonly blueValue: number
    /** Ustawia czas narastania wartości barwy i jasności */
    setRampTime: (value: number) => void
    /** Ustawia maksymalną wartość dla Value */
    setMaxValue: (value: number) => void
    /** Ustawia minimalną wartość dla Value */
    setMinValue: (value: number) => void
    /** Ustawia wartość wyjścia według modelu HSV (zakres 0.00-1.00) */
    setValue: (value: number, ramp?: number) => void
    /** Ustawia wartość barwy (0-360) */
    setHue: (value: number, ramp?: number) => void
    /** Ustawia wartość nasycenia według modelu HSV (zakres 0.00-1.00) */
    setSaturation: (value: number, ramp?: number) => void
    /** Ustawia wartość RGB za pomocą ciągu znaków #RRGGBB */
    setRGBvalue: (value: string, ramp?: number) => void
    /** Ustawia wartość wyjścia na MaxValue */
    switchOn: (time: number, ramp?: number) => void
    /** Ustawia wartość wyjścia na 0 */
    switchOff: (time: number, ramp?: number) => void
    /** Zmienia stan wyjścia na przeciwny według modelu HSV.\nPierwszy parametr to czas zmiany: 0 włącza wyjście na stałe, num na czas określony w parametrze.\nDrugi parametr to rampa jest opcjonalny, jeśli nie zostanie zdefiniowany przyjmowana jest wartość domyślna. */
    switch: (time: number, ramp?: number) => void
    /** Usuwa blokadę modułu spowodowaną zadziałaniem zabezpieczenia nadprądowego */
    clearOvercurrentProtection: () => void
    /** Ustawia wartość składowej R(0-255) - kolor czerwony */
    setRedValue: (value: number, ramp?: number) => void
    /** Ustawia wartość składowej G(0-255) - kolor zielony */
    setGreenValue: (value: number, ramp?: number) => void
    /** Ustawia wartość składowej B(0-255) - kolor niebieski */
    setBlueValue: (value: number, ramp?: number) => void
}

class ZwaveLedrgb implements IZwaveLedrgb {
    private onValueChangeCallbacks: Array<() => void> = [];
    private onSwitchOnCallbacks: Array<() => void> = [];
    private onSwitchOffCallbacks: Array<() => void> = [];
    private onValueRiseCallbacks: Array<() => void> = [];
    private onValueLowerCallbacks: Array<() => void> = [];
    private onOutOfRangeCallbacks: Array<() => void> = [];
    private onOvercurrentProtectionCallbacks: Array<() => void> = [];

    constructor(private raw: ZwaveLedrgbRaw) {
        this.raw.add_event(EventType.OnValueChange, () => {
            this.onValueChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnSwitchOn, () => {
            this.onSwitchOnCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnSwitchOff, () => {
            this.onSwitchOffCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnValueRise, () => {
            this.onValueRiseCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnValueLower, () => {
            this.onValueLowerCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnOutOfRange, () => {
            this.onOutOfRangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnOvercurrentProtection, () => {
            this.onOvercurrentProtectionCallbacks.forEach(callback => { callback(); });
        });
    }

    addOnValueChange(callback: () => void): void { this.onValueChangeCallbacks.push(callback); }
    addOnSwitchOn(callback: () => void): void { this.onSwitchOnCallbacks.push(callback); }
    addOnSwitchOff(callback: () => void): void { this.onSwitchOffCallbacks.push(callback); }
    addOnValueRise(callback: () => void): void { this.onValueRiseCallbacks.push(callback); }
    addOnValueLower(callback: () => void): void { this.onValueLowerCallbacks.push(callback); }
    addOnOutOfRange(callback: () => void): void { this.onOutOfRangeCallbacks.push(callback); }
    addOnOvercurrentProtection(callback: () => void): void { this.onOvercurrentProtectionCallbacks.push(callback); }

    get value(): number { return this.raw.get(PropertyType.Value); }
    get hue(): number { return this.raw.get(PropertyType.Hue); }
    get saturation(): number { return this.raw.get(PropertyType.Saturation); }
    get rgb(): string { return this.raw.get(PropertyType.RGB); }
    get rampTime(): number { return this.raw.get(PropertyType.RampTime); }
    set rampTime(val: number) { this.raw.set(PropertyType.RampTime, val); }
    get maxValue(): number { return this.raw.get(PropertyType.MaxValue); }
    set maxValue(val: number) { this.raw.set(PropertyType.MaxValue, val); }
    get minValue(): number { return this.raw.get(PropertyType.MinValue); }
    set minValue(val: number) { this.raw.set(PropertyType.MinValue, val); }
    get redCorrection(): number { return this.raw.get(PropertyType.RedCorrection); }
    set redCorrection(val: number) { this.raw.set(PropertyType.RedCorrection, val); }
    get greenCorrection(): number { return this.raw.get(PropertyType.GreenCorrection); }
    set greenCorrection(val: number) { this.raw.set(PropertyType.GreenCorrection, val); }
    get blueCorrection(): number { return this.raw.get(PropertyType.BlueCorrection); }
    set blueCorrection(val: number) { this.raw.set(PropertyType.BlueCorrection, val); }
    get overcurrentProtection(): number { return this.raw.get(PropertyType.OvercurrentProtection); }
    get redValue(): number { return this.raw.get(PropertyType.RedValue); }
    get greenValue(): number { return this.raw.get(PropertyType.GreenValue); }
    get blueValue(): number { return this.raw.get(PropertyType.BlueValue); }

    setRampTime(value: number): void { this.raw.set(PropertyType.RampTime, value); }
    setMaxValue(value: number): void { this.raw.set(PropertyType.MaxValue, value); }
    setMinValue(value: number): void { this.raw.set(PropertyType.MinValue, value); }
    setValue(value: number, ramp: number = 500): void { this.raw.execute(MethodType.SetValue, value, ramp); }
    setHue(value: number, ramp: number = 500): void { this.raw.execute(MethodType.SetHue, value, ramp); }
    setSaturation(value: number, ramp: number = 500): void { this.raw.execute(MethodType.SetSaturation, value, ramp); }
    setRGBvalue(value: string, ramp: number = 500): void { this.raw.execute(MethodType.SetRGBvalue, value, ramp); }
    switchOn(time: number, ramp: number = 500): void { this.raw.execute(MethodType.SwitchOn, time, ramp); }
    switchOff(time: number, ramp: number = 500): void { this.raw.execute(MethodType.SwitchOff, time, ramp); }
    switch(time: number, ramp: number = 500): void { this.raw.execute(MethodType.Switch, time, ramp); }
    clearOvercurrentProtection(): void { this.raw.execute(MethodType.ClearOvercurrentProtection); }
    setRedValue(value: number, ramp: number = 500): void { this.raw.execute(MethodType.SetRedValue, value, ramp); }
    setGreenValue(value: number, ramp: number = 500): void { this.raw.execute(MethodType.SetGreenValue, value, ramp); }
    setBlueValue(value: number, ramp: number = 500): void { this.raw.execute(MethodType.SetBlueValue, value, ramp); }
}

class ZwaveLedrgbRemote implements IZwaveLedrgb {
    constructor(private objectName: string, private gate: RemoteGate) {}

    addOnValueChange(_callback: () => void): void { /* Remote events are not supported */ }
    addOnSwitchOn(_callback: () => void): void { /* Remote events are not supported */ }
    addOnSwitchOff(_callback: () => void): void { /* Remote events are not supported */ }
    addOnValueRise(_callback: () => void): void { /* Remote events are not supported */ }
    addOnValueLower(_callback: () => void): void { /* Remote events are not supported */ }
    addOnOutOfRange(_callback: () => void): void { /* Remote events are not supported */ }
    addOnOvercurrentProtection(_callback: () => void): void { /* Remote events are not supported */ }

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
    get redCorrection(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.RedCorrection).build();
        return this.gate.runScript(cmd!);
    }
    set redCorrection(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.RedCorrection).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
    get greenCorrection(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.GreenCorrection).build();
        return this.gate.runScript(cmd!);
    }
    set greenCorrection(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.GreenCorrection).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
    get blueCorrection(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.BlueCorrection).build();
        return this.gate.runScript(cmd!);
    }
    set blueCorrection(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.BlueCorrection).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
    get overcurrentProtection(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.OvercurrentProtection).build();
        return this.gate.runScript(cmd!);
    }
    get redValue(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.RedValue).build();
        return this.gate.runScript(cmd!);
    }
    get greenValue(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.GreenValue).build();
        return this.gate.runScript(cmd!);
    }
    get blueValue(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.BlueValue).build();
        return this.gate.runScript(cmd!);
    }

    setRampTime(value: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.RampTime).addParameter(value).build();
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
    setValue(value: number, ramp: number = 500): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SetValue).addParameter(value).addParameter(ramp).build();
        this.gate.runScript(cmd!);
    }
    setHue(value: number, ramp: number = 500): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SetHue).addParameter(value).addParameter(ramp).build();
        this.gate.runScript(cmd!);
    }
    setSaturation(value: number, ramp: number = 500): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SetSaturation).addParameter(value).addParameter(ramp).build();
        this.gate.runScript(cmd!);
    }
    setRGBvalue(value: string, ramp: number = 500): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SetRGBvalue).addParameter(value).addParameter(ramp).build();
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
    switch(time: number, ramp: number = 500): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.Switch).addParameter(time).addParameter(ramp).build();
        this.gate.runScript(cmd!);
    }
    clearOvercurrentProtection(): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.ClearOvercurrentProtection).build();
        this.gate.runScript(cmd!);
    }
    setRedValue(value: number, ramp: number = 500): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SetRedValue).addParameter(value).addParameter(ramp).build();
        this.gate.runScript(cmd!);
    }
    setGreenValue(value: number, ramp: number = 500): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SetGreenValue).addParameter(value).addParameter(ramp).build();
        this.gate.runScript(cmd!);
    }
    setBlueValue(value: number, ramp: number = 500): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SetBlueValue).addParameter(value).addParameter(ramp).build();
        this.gate.runScript(cmd!);
    }
}

export { ZwaveLedrgb, ZwaveLedrgbRaw, ZwaveLedrgbRemote }
