// Created from: src/interfaces/module_2_0_LED_RGBW_FM_fv02_02.xml, object name="LED_CHANNEL"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum StatisticStateType {
    Off = 0,
    Continuous = 1
}

enum EventType {
    OnValueChange = 0,
    OnSwitchOn = 1,
    OnSwitchOff = 2,
    OnValueRise = 3,
    OnValueLower = 4,
    OnOutOfRange = 5
}

enum PropertyType {
    Value = 0,
    RampTime = 1,
    MaxValue = 2,
    MinValue = 3,
    DistributedLogicGroup = 4,
    StatisticState = 5,
    Load = 6
}

enum MethodType {
    SetValue = 0,
    SwitchOn = 1,
    SetRampTime = 1,
    SwitchOff = 2,
    SetMaxValue = 2,
    Switch = 3,
    SetMinValue = 3,
    HoldValue = 4,
    HoldValueUp = 5,
    HoldValueDown = 6
}

declare class LedChannelRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface ILedChannel {
    /** Zdarzenie wywoływane w przypadku zmiany wartości cechy Value */
    addOnValueChange: (callback: () => void) => void
    /** Zdarzenie wywoływane w momencie zmiany stanu wyjścia ze stanu=0 na stan>0 */
    addOnSwitchOn: (callback: () => void) => void
    /** Zdarzenie wywoływane w momencie ustawienia 0 na wyjściu */
    addOnSwitchOff: (callback: () => void) => void
    /** Zdarzenie wywoływane przy zmianie wartości cechy Value na wyższą (zbocze narastające) */
    addOnValueRise: (callback: () => void) => void
    /** Zdarzenie wywoływane przy zmianie wartości cechy Value na niższą (zbocze opadające) */
    addOnValueLower: (callback: () => void) => void
    /** Zdarzenie wywoływane w momencie ustawienia cechy Value na wartości spoza wyznaczonego zakresu (Min - Max) */
    addOnOutOfRange: (callback: () => void) => void
    /** Wartość jasności (zakres 0-255) */
    readonly value: number
    /** Wartość czasu narastania wartości jasności */
    rampTime: number
    /** Maksymalna wartość jaka może przyjąć Value. Próba ustawienia wartości większej zwraca błąd */
    maxValue: number
    /** Minimalna wartość jaka może przyjąć Value. Próba ustawienia wartości mniejszej zwraca błąd */
    minValue: number
    /** Grupa Distributed Logic - grupa broadcastowa dla rozproszonej logiki */
    distributedLogicGroup: number
    /** Włącza raportowanie pomiaru do modułu statystyk */
    statisticState: StatisticStateType
    /** Mnożnik mierzonej wartości. Dla StatisticState:\nContinuous - wartość zużycia w jednostce czasu,\nPulse - wartość zużycia dla jednego impulsu (np. 1l, 1m^3, 1kW) */
    load: number
    /** Ustawia wartość wyjścia (zakres 0-255) */
    setValue: (value: number, ramp?: number) => void
    /** Ustawia wartość wyjścia na MaxValue */
    switchOn: (time: number, ramp?: number) => void
    /** Ustawia wartość wyjścia na 0 */
    switchOff: (time: number, ramp?: number) => void
    /** Zmienia stan wyjścia na przeciwny. Pierwszy parametr to czas zmiany: 0 włącza wyjście na stałe, num na czas określony w parametrze. Drugi parametr to rampa jest opcjonalny, jeśli nie zostanie zdefiniowany przyjmowana jest wartość domyślna. */
    switch: (time: number, ramp?: number) => void
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
}

class LedChannel implements ILedChannel {
    private onValueChangeCallbacks: Array<() => void> = [];
    private onSwitchOnCallbacks: Array<() => void> = [];
    private onSwitchOffCallbacks: Array<() => void> = [];
    private onValueRiseCallbacks: Array<() => void> = [];
    private onValueLowerCallbacks: Array<() => void> = [];
    private onOutOfRangeCallbacks: Array<() => void> = [];

    constructor(private raw: LedChannelRaw) {
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
    }

    addOnValueChange(callback: () => void): void { this.onValueChangeCallbacks.push(callback); }
    addOnSwitchOn(callback: () => void): void { this.onSwitchOnCallbacks.push(callback); }
    addOnSwitchOff(callback: () => void): void { this.onSwitchOffCallbacks.push(callback); }
    addOnValueRise(callback: () => void): void { this.onValueRiseCallbacks.push(callback); }
    addOnValueLower(callback: () => void): void { this.onValueLowerCallbacks.push(callback); }
    addOnOutOfRange(callback: () => void): void { this.onOutOfRangeCallbacks.push(callback); }

    get value(): number { return this.raw.get(PropertyType.Value); }
    get rampTime(): number { return this.raw.get(PropertyType.RampTime); }
    set rampTime(val: number) { this.raw.set(PropertyType.RampTime, val); }
    get maxValue(): number { return this.raw.get(PropertyType.MaxValue); }
    set maxValue(val: number) { this.raw.set(PropertyType.MaxValue, val); }
    get minValue(): number { return this.raw.get(PropertyType.MinValue); }
    set minValue(val: number) { this.raw.set(PropertyType.MinValue, val); }
    get distributedLogicGroup(): number { return this.raw.get(PropertyType.DistributedLogicGroup); }
    set distributedLogicGroup(val: number) { this.raw.set(PropertyType.DistributedLogicGroup, val); }
    get statisticState(): StatisticStateType { return this.raw.get(PropertyType.StatisticState); }
    set statisticState(val: StatisticStateType) { this.raw.set(PropertyType.StatisticState, val); }
    get load(): number { return this.raw.get(PropertyType.Load); }
    set load(val: number) { this.raw.set(PropertyType.Load, val); }

    setValue(value: number, ramp: number = 0): void { this.raw.execute(MethodType.SetValue, value, ramp); }
    switchOn(time: number, ramp: number = 0): void { this.raw.execute(MethodType.SwitchOn, time, ramp); }
    switchOff(time: number, ramp: number = 0): void { this.raw.execute(MethodType.SwitchOff, time, ramp); }
    switch(time: number, ramp: number = 0): void { this.raw.execute(MethodType.Switch, time, ramp); }
    setRampTime(rampTime: number): void { this.raw.set(PropertyType.RampTime, rampTime); }
    setMaxValue(value: number): void { this.raw.set(PropertyType.MaxValue, value); }
    setMinValue(value: number): void { this.raw.set(PropertyType.MinValue, value); }
    holdValue(ramp: number = 0): void { this.raw.execute(MethodType.HoldValue, ramp); }
    holdValueUp(ramp: number = 0): void { this.raw.execute(MethodType.HoldValueUp, ramp); }
    holdValueDown(ramp: number = 0): void { this.raw.execute(MethodType.HoldValueDown, ramp); }
}

class LedChannelRemote implements ILedChannel {
    constructor(private objectName: string, private gate: RemoteGate) {}

    addOnValueChange(_callback: () => void): void { /* Remote events are not supported */ }
    addOnSwitchOn(_callback: () => void): void { /* Remote events are not supported */ }
    addOnSwitchOff(_callback: () => void): void { /* Remote events are not supported */ }
    addOnValueRise(_callback: () => void): void { /* Remote events are not supported */ }
    addOnValueLower(_callback: () => void): void { /* Remote events are not supported */ }
    addOnOutOfRange(_callback: () => void): void { /* Remote events are not supported */ }

    get value(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Value).build();
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
    get distributedLogicGroup(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.DistributedLogicGroup).build();
        return this.gate.runScript(cmd!);
    }
    set distributedLogicGroup(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.DistributedLogicGroup).addParameter(val).build();
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
}

export { LedChannel, LedChannelRaw, LedChannelRemote, StatisticStateType }
