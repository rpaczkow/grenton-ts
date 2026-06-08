// Created from: src/interfaces/module_RELAY_WIFI_FM_2_fv01_02.xml, object name="DOUT"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnValueChange = 0,
    OnSwitchOn = 1,
    OnSwitchOff = 2
}

enum PropertyType {
    Value = 0,
    DeclaredLoad = 15,
    Load = 8,
    PowerOnTime = 11,
    PowerConsumption = 12
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
    /** Deklarowana moc, która kopiowana jest do cechy Load gdy wyjście jest załączone */
    declaredLoad: number
    /** Rzeczywisty pobór mocy obciążenia */
    readonly load: number
    /** Sumaryczny czas załączenia wyjścia liczony od uruchomienia urządzenia lub wywołania metody ResetPowerStatistics */
    readonly powerOnTime: number
    /** Sumaryczny pobór energii liczony od uruchomienia urządzenia lub wywołania metody ResetPowerStatistics */
    readonly powerConsumption: number
}

class DOut implements IDOut {
    private onValueChangeCallbacks: Array<() => void> = [];
    private onSwitchOnCallbacks: Array<() => void> = [];
    private onSwitchOffCallbacks: Array<() => void> = [];

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
    }

    addOnValueChange(callback: () => void): void { this.onValueChangeCallbacks.push(callback); }
    addOnSwitchOn(callback: () => void): void { this.onSwitchOnCallbacks.push(callback); }
    addOnSwitchOff(callback: () => void): void { this.onSwitchOffCallbacks.push(callback); }

    switch(): void { this.raw.execute(MethodType.Switch); }
    switchOn(time: number): void { this.raw.execute(MethodType.SwitchOn, time); }
    switchOff(time: number): void { this.raw.execute(MethodType.SwitchOff, time); }
    resetPowerStatistics(): void { this.raw.execute(MethodType.ResetPowerStatistics); }

    get value(): boolean { return this.raw.get(PropertyType.Value) === 1; }
    set value(val: boolean) { this.raw.set(PropertyType.Value, val ? 1 : 0); }
    get declaredLoad(): number { return this.raw.get(PropertyType.DeclaredLoad); }
    set declaredLoad(val: number) { this.raw.set(PropertyType.DeclaredLoad, val); }
    get load(): number { return this.raw.get(PropertyType.Load); }
    get powerOnTime(): number { return this.raw.get(PropertyType.PowerOnTime); }
    get powerConsumption(): number { return this.raw.get(PropertyType.PowerConsumption); }
}

class DOutRemote implements IDOut {
    constructor(private objectName: string, private gate: RemoteGate) {}

    addOnValueChange(_callback: () => void): void { /* Remote events are not supported */ }
    addOnSwitchOn(_callback: () => void): void { /* Remote events are not supported */ }
    addOnSwitchOff(_callback: () => void): void { /* Remote events are not supported */ }

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
    get declaredLoad(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.DeclaredLoad).build();
        return this.gate.runScript(cmd!);
    }
    set declaredLoad(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.DeclaredLoad).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
    get load(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Load).build();
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
}

export { DOut, DOutRaw, DOutRemote }
