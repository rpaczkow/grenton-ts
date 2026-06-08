// Created from: src/interfaces/module_RELAY_PLUS_WIFI_FM_2_fv01_02.xml, object name="DOUT"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum VoltageType {
    AC = 0,
    DC = 1
}

enum StateType {
    PowerOff = 0,
    PowerOn = 1,
    Loaded = 2,
    Overloaded = 3,
    AntiburnOff = 4
}

enum EventType {
    OnValueChange = 0,
    OnSwitchOn = 1,
    OnSwitchOff = 2,
    OnPowerConsumptionOn = 3,
    OnPowerConsumptionOff = 4,
    OnOverloadOn = 5,
    OnOverloadOff = 6,
    OnAntiBurnRelayOff = 7,
    OnUpdate = 8
}

enum PropertyType {
    Value = 0,
    Overload = 1,
    OverloadTime = 2,
    LoadThreshold = 3,
    VoltageType = 4,
    DCVoltage = 5,
    ACVoltage = 6,
    Current = 7,
    Load = 8,
    AverageLoad = 9,
    MaximumLoad = 10,
    PowerOnTime = 11,
    PowerConsumption = 12,
    State = 13
}

enum MethodType {
    Switch = 0,
    SwitchOn = 1,
    SwitchOff = 2,
    ResetPowerStatistics = 3
}

declare class DOutRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface IDOut {
    /** Zdarzenie wywoływane w przypadku zmiany stanu na przeciwny */
    addOnValueChange: (callback: () => void) => void
    /** Zdarzenie wywoływane w momencie ustawienia stanu wysokiego na wyjściu */
    addOnSwitchOn: (callback: () => void) => void
    /** Zdarzenie wywoływane w momencie ustawienia stanu niskiego na wyjściu */
    addOnSwitchOff: (callback: () => void) => void
    /** Zdarzenie wywoływane w momencie gdy wartość cechy Load staje się wyższa niż LoadThreshold */
    addOnPowerConsumptionOn: (callback: () => void) => void
    /** Zdarzenie wywoływane w momencie gdy wartość cechy Load staje się niższa niż LoadThreshold */
    addOnPowerConsumptionOff: (callback: () => void) => void
    /** Zdarzenie wywoływane w momencie gdy wartość cechy Load staję się wyższa Overload */
    addOnOverloadOn: (callback: () => void) => void
    /** Zdarzenie wywoływane w momencie gdy wartość cechy Load staje się niższa niż Overload */
    addOnOverloadOff: (callback: () => void) => void
    /** Zdarzenie wywoływane po wyłączeniu przekaźnika - po znacznym przekroczeniu bezpiecznych wartości prądu */
    addOnAntiBurnRelayOff: (callback: () => void) => void
    /** Zdarzenie sygnalizuje moment uaktualnienia parametrów wszystkich wyjść (Current,Load,..). Wywoływane co 250ms */
    addOnUpdate: (callback: () => void) => void
    /** Zmienia stan wyjścia na przeciwny */
    switch: () => void
    /** Załącza wyjście. Parametr Time określa na jak długo następuje zmiana stanu, dla 0 jest ona stała */
    switchOn: (time: number) => void
    /** Wyłącza wyjście. Parametr Time określa na jak długo następuje zmiana stanu, dla 0 jest ona stała */
    switchOff: (time: number) => void
    /** Resetuje statystyki pomiaru mocy */
    resetPowerStatistics: () => void
    /** Zwraca stan wyjścia jako 1 lub 0 */
    value: boolean
    /** Wartość mocy po przekroczeniu której generowane jest zdarzenie OnOverloadOn */
    overload: number
    /** Minimalny czas wystąpienia przekroczenia poziomu (Overload) mocy konieczny do wygenerowania zdarzenia OnOverloadOn */
    overloadTime: number
    /** Wartość mocy po przekroczeniu której generowane jest zdarzenie OnPowerConsumptionOn */
    loadThreshold: number
    /** Rodzaj napięcia obciążenia:\n0 - AC,\n1 - DC */
    voltageType: VoltageType
    /** Deklarowane napięcie DC zasilające odbiornik */
    dcVoltage: number
    /** Aktualne napięcie AC w sieci energetycznej */
    readonly acVoltage: number
    /** Prąd płynący przez odbiornik (dla AC:Irms) */
    readonly current: number
    /** Rzeczywisty pobór mocy obciążenia */
    readonly load: number
    /** Średni pobór mocy liczony od uruchomienia urządzenia lub wywołania metody ResetPowerStatistics */
    readonly averageLoad: number
    /** Maksymalny pobór mocy liczony od uruchomienia urządzenia lub wywołania metody ResetPowerStatistics */
    readonly maximumLoad: number
    /** Sumaryczny czas załączenia wyjścia liczony od uruchomienia urządzenia lub wywołania metody ResetPowerStatistics */
    readonly powerOnTime: number
    /** Sumaryczny pobór energii liczony od uruchomienia urządzenia lub wywołania metody ResetPowerStatistics */
    readonly powerConsumption: number
    /** Zwraca stan wyjścia:\n[0]POWER_OFF - wyjście wyłączone,\n[1]POWER_ON - wyjście załączone,\n[2]LOADED - wartość cechy Load w przedziale (LoadThreshold..Overload),\n[3]OVERLOADED - wartość cechy Load powyżej wartości cechy Overload,\n[4]ANTIBURN_OFF - wyjście wyłączone po przekroczeniu dopuszczalnych poziomów prądu */
    readonly state: StateType
}

class DOut implements IDOut {
    private onValueChangeCallbacks: Array<() => void> = [];
    private onSwitchOnCallbacks: Array<() => void> = [];
    private onSwitchOffCallbacks: Array<() => void> = [];
    private onPowerConsumptionOnCallbacks: Array<() => void> = [];
    private onPowerConsumptionOffCallbacks: Array<() => void> = [];
    private onOverloadOnCallbacks: Array<() => void> = [];
    private onOverloadOffCallbacks: Array<() => void> = [];
    private onAntiBurnRelayOffCallbacks: Array<() => void> = [];
    private onUpdateCallbacks: Array<() => void> = [];

    constructor(private raw: DOutRaw) {
        this.raw.add_event(EventType.OnValueChange, () => {
            this.onValueChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnSwitchOn, () => {
            this.onSwitchOnCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnSwitchOff, () => {
            this.onSwitchOffCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnPowerConsumptionOn, () => {
            this.onPowerConsumptionOnCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnPowerConsumptionOff, () => {
            this.onPowerConsumptionOffCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnOverloadOn, () => {
            this.onOverloadOnCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnOverloadOff, () => {
            this.onOverloadOffCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnAntiBurnRelayOff, () => {
            this.onAntiBurnRelayOffCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnUpdate, () => {
            this.onUpdateCallbacks.forEach(callback => { callback(); });
        });
    }

    addOnValueChange(callback: () => void): void { this.onValueChangeCallbacks.push(callback); }
    addOnSwitchOn(callback: () => void): void { this.onSwitchOnCallbacks.push(callback); }
    addOnSwitchOff(callback: () => void): void { this.onSwitchOffCallbacks.push(callback); }
    addOnPowerConsumptionOn(callback: () => void): void { this.onPowerConsumptionOnCallbacks.push(callback); }
    addOnPowerConsumptionOff(callback: () => void): void { this.onPowerConsumptionOffCallbacks.push(callback); }
    addOnOverloadOn(callback: () => void): void { this.onOverloadOnCallbacks.push(callback); }
    addOnOverloadOff(callback: () => void): void { this.onOverloadOffCallbacks.push(callback); }
    addOnAntiBurnRelayOff(callback: () => void): void { this.onAntiBurnRelayOffCallbacks.push(callback); }
    addOnUpdate(callback: () => void): void { this.onUpdateCallbacks.push(callback); }

    switch(): void { this.raw.execute(MethodType.Switch); }
    switchOn(time: number): void { this.raw.execute(MethodType.SwitchOn, time); }
    switchOff(time: number): void { this.raw.execute(MethodType.SwitchOff, time); }
    resetPowerStatistics(): void { this.raw.execute(MethodType.ResetPowerStatistics); }

    get value(): boolean { return this.raw.get(PropertyType.Value) === 1; }
    set value(val: boolean) { this.raw.set(PropertyType.Value, val ? 1 : 0); }
    get overload(): number { return this.raw.get(PropertyType.Overload); }
    set overload(val: number) { this.raw.set(PropertyType.Overload, val); }
    get overloadTime(): number { return this.raw.get(PropertyType.OverloadTime); }
    set overloadTime(val: number) { this.raw.set(PropertyType.OverloadTime, val); }
    get loadThreshold(): number { return this.raw.get(PropertyType.LoadThreshold); }
    set loadThreshold(val: number) { this.raw.set(PropertyType.LoadThreshold, val); }
    get voltageType(): VoltageType { return this.raw.get(PropertyType.VoltageType); }
    set voltageType(val: VoltageType) { this.raw.set(PropertyType.VoltageType, val); }
    get dcVoltage(): number { return this.raw.get(PropertyType.DCVoltage); }
    set dcVoltage(val: number) { this.raw.set(PropertyType.DCVoltage, val); }
    get acVoltage(): number { return this.raw.get(PropertyType.ACVoltage); }
    get current(): number { return this.raw.get(PropertyType.Current); }
    get load(): number { return this.raw.get(PropertyType.Load); }
    get averageLoad(): number { return this.raw.get(PropertyType.AverageLoad); }
    get maximumLoad(): number { return this.raw.get(PropertyType.MaximumLoad); }
    get powerOnTime(): number { return this.raw.get(PropertyType.PowerOnTime); }
    get powerConsumption(): number { return this.raw.get(PropertyType.PowerConsumption); }
    get state(): StateType { return this.raw.get(PropertyType.State); }
}

class DOutRemote implements IDOut {
    constructor(private objectName: string, private gate: RemoteGate) {}

    addOnValueChange(_callback: () => void): void { /* Remote events are not supported */ }
    addOnSwitchOn(_callback: () => void): void { /* Remote events are not supported */ }
    addOnSwitchOff(_callback: () => void): void { /* Remote events are not supported */ }
    addOnPowerConsumptionOn(_callback: () => void): void { /* Remote events are not supported */ }
    addOnPowerConsumptionOff(_callback: () => void): void { /* Remote events are not supported */ }
    addOnOverloadOn(_callback: () => void): void { /* Remote events are not supported */ }
    addOnOverloadOff(_callback: () => void): void { /* Remote events are not supported */ }
    addOnAntiBurnRelayOff(_callback: () => void): void { /* Remote events are not supported */ }
    addOnUpdate(_callback: () => void): void { /* Remote events are not supported */ }

    switch(): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.Switch).build();
        this.gate.runScript(cmd!);
    }
    switchOn(time: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SwitchOn).addParameter(time).build();
        this.gate.runScript(cmd!);
    }
    switchOff(time: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SwitchOff).addParameter(time).build();
        this.gate.runScript(cmd!);
    }
    resetPowerStatistics(): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.ResetPowerStatistics).build();
        this.gate.runScript(cmd!);
    }

    get value(): boolean {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Value).build();
        return this.gate.runScript(cmd!) === 1;
    }
    set value(val: boolean) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.Value).addParameter(val ? 1 : 0).build();
        this.gate.runScript(cmd!);
    }
    get overload(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Overload).build();
        return this.gate.runScript(cmd!);
    }
    set overload(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.Overload).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
    get overloadTime(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.OverloadTime).build();
        return this.gate.runScript(cmd!);
    }
    set overloadTime(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.OverloadTime).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
    get loadThreshold(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.LoadThreshold).build();
        return this.gate.runScript(cmd!);
    }
    set loadThreshold(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.LoadThreshold).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
    get voltageType(): VoltageType {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.VoltageType).build();
        return this.gate.runScript(cmd!);
    }
    set voltageType(val: VoltageType) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.VoltageType).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
    get dcVoltage(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.DCVoltage).build();
        return this.gate.runScript(cmd!);
    }
    set dcVoltage(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.DCVoltage).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
    get acVoltage(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.ACVoltage).build();
        return this.gate.runScript(cmd!);
    }
    get current(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Current).build();
        return this.gate.runScript(cmd!);
    }
    get load(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Load).build();
        return this.gate.runScript(cmd!);
    }
    get averageLoad(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.AverageLoad).build();
        return this.gate.runScript(cmd!);
    }
    get maximumLoad(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.MaximumLoad).build();
        return this.gate.runScript(cmd!);
    }
    get powerOnTime(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.PowerOnTime).build();
        return this.gate.runScript(cmd!);
    }
    get powerConsumption(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.PowerConsumption).build();
        return this.gate.runScript(cmd!);
    }
    get state(): StateType {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.State).build();
        return this.gate.runScript(cmd!);
    }
}

export { DOut, DOutRaw, DOutRemote, VoltageType, StateType }
