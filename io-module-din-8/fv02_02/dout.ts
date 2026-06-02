// Created from: packages/grenton-api/interfaces/module_2_0_IO_MODULE_DIN_8_fv02_02.xml, object name="DOUT"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnValueChange = 0,
    OnSwitchOn = 1,
    OnSwitchOff = 2
}

enum PropertyType {
    Value = 0,
    StatisticState = 1,
    Load = 2,
    DistributedLogicGroup = 6
}

enum MethodType {
    SetValue = 0,
    Switch = 0,
    SwitchOn = 1,
    SwitchOff = 2
}

enum StatisticStateType {
    Off = 0,
    Continuous = 1
}

declare class DOutRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface IDOut {
    /**
     * Zdarzenie wywoływane przy zmianie wartości napięcia zasilania o wartość cechy Sensitivity
     * @param callback
     */
    addOnValueChange: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane w momencie ustawienia stanu wysokiego na wejściu
     * @param callback
     */
    addOnSwitchOn: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane w momencie ustawienia stanu niskiego na wejściu
     * @param callback
     */
    addOnSwitchOff: (callback: () => void) => void
    /**
     * Ustawia stan wyjścia jako 1 lub 0
     * @param {number} value
     */
    setValue: (value: number) => void
    /**
     * Zmienia stan wyjścia na przeciwny. Parametr Time określa na jak długo następuje zmiana stanu, dla 0 jest ona stała
     * @param {number} miliseconds
     */
    switch: (miliseconds: number) => void
    /**
     * Załącza wyjście. Parametr Time określa na jak długo następuje zmiana stanu, dla 0 jest ona stała
     * @param {number} miliseconds
     */
    switchOn: (miliseconds: number) => void
    /**
     * Wyłącza wyjście. Parametr Time określa na jak długo następuje zmiana stanu, dla 0 jest ona stała
     * @param {number} miliseconds
     */
    switchOff: (miliseconds: number) => void
    /** Wartość napięcia zasilania */
    value: boolean
    /** Grupa Distributed Logic - grupa broadcastowa dla rozproszonej logiki */
    distributedLogicGroup: number
    /** Włącza raportowanie pomiaru do modułu statystyk: Off - wyłączony, Continuous - pomiar obciążenia w całym okresie pracy urządzenia, Pulse - pomiar zliczany w momencie pojawienia się stanu wysokiego na wejściu */
    statisticState: StatisticStateType
    /** Mnożnik mierzonej wartości. Dla StatisticState: Continuous - wartość zużycia w jednostce czasu, Pulse - wartość zużycia dla jednego impulsu (np. 1l, 1m^3, 1kW) */
    load: number
}

class DOut implements IDOut {
    private onValueChangeCallbacks: Array<() => void> = [];
    private onSwitchOnCallbacks: Array<() => void> = [];
    private onSwitchOffCallbacks: Array<() => void> = [];

    constructor(private raw: DOutRaw) {
        this.raw.add_event(EventType.OnValueChange, () => {
            this.onValueChangeCallbacks.forEach(callback => {
                callback();
            });
        });

        this.raw.add_event(EventType.OnSwitchOn, () => {
            this.onSwitchOnCallbacks.forEach(callback => {
                callback();
            });
        });

        this.raw.add_event(EventType.OnSwitchOff, () => {
            this.onSwitchOffCallbacks.forEach(callback => {
                callback();
            });
        });
    }

    /**
     * Zdarzenie wywoływane przy zmianie wartości napięcia zasilania o wartość cechy Sensitivity
     * @param callback
     */
    addOnValueChange(callback: () => void): void {
        this.onValueChangeCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane w momencie ustawienia stanu wysokiego na wejściu
     * @param callback
     */
    addOnSwitchOn(callback: () => void): void {
        this.onSwitchOnCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane w momencie ustawienia stanu niskiego na wejściu
     * @param callback
     */
    addOnSwitchOff(callback: () => void): void {
        this.onSwitchOffCallbacks.push(callback);
    }
    /**
     * Ustawia stan wyjścia jako 1 lub 0
     * @param {number} value
     */
    setValue(value: number): void {
        this.raw.set(PropertyType.Value, value);
    }
    /** Zmienia stan wyjścia na przeciwny. Parametr Time określa na jak długo następuje zmiana stanu, dla 0 jest ona stała */
    switch(miliseconds: number): void {
        this.raw.execute(MethodType.Switch, miliseconds);
    }
    /**
     * Załącza wyjście. Parametr Time określa na jak długo następuje zmiana stanu, dla 0 jest ona stała
     * @param {number} miliseconds
     */
    switchOn(miliseconds: number): void {
        this.raw.execute(MethodType.SwitchOn, miliseconds);
    }
    /**
     * Wyłącza wyjście. Parametr Time określa na jak długo następuje zmiana stanu, dla 0 jest ona stała
     * @param {number} miliseconds
     */
    switchOff(miliseconds: number): void {
        this.raw.execute(MethodType.SwitchOff, miliseconds);
    }
    /**
     * Wartość napięcia zasilania
     * @returns {boolean}
     */
    get value(): boolean {
        return this.raw.get(PropertyType.Value) === 1;
    }
    set value(val: boolean) {
        this.raw.set(PropertyType.Value, val ? 1 : 0);
    }
    /**
     * Grupa Distributed Logic - grupa broadcastowa dla rozproszonej logiki
     * @returns {number}
     */
    get distributedLogicGroup(): number {
        return this.raw.get(PropertyType.DistributedLogicGroup);
    }
    set distributedLogicGroup(value: number) {
        this.raw.set(PropertyType.DistributedLogicGroup, value);
    }
    /**
     * Włącza raportowanie pomiaru do modułu statystyk: Off - wyłączony, Continuous - pomiar obciążenia w całym okresie pracy urządzenia, Pulse - pomiar zliczany w momencie pojawienia się stanu wysokiego na wejściu
     * @returns {StatisticStateType}
     */
    get statisticState(): StatisticStateType {
        return this.raw.get(PropertyType.StatisticState);
    }
    set statisticState(value: StatisticStateType) {
        this.raw.set(PropertyType.StatisticState, value);
    }
    /**
     * Mnożnik mierzonej wartości. Dla StatisticState: Continuous - wartość zużycia w jednostce czasu, Pulse - wartość zużycia dla jednego impulsu (np. 1l, 1m^3, 1kW)
     * @returns {number}
     */
    get load(): number {
        return this.raw.get(PropertyType.Load);
    }
    set load(value: number) {
        this.raw.set(PropertyType.Load, value);
    }
}

class DOutRemote implements IDOut {
    constructor(private objectName: string, private gate: RemoteGate) {

    }

    /**
     * Zdarzenie wywoływane przy zmianie wartości napięcia zasilania o wartość cechy Sensitivity
     * @param callback
     */
    addOnValueChange(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane w momencie ustawienia stanu wysokiego na wejściu
     * @param callback
     */
    addOnSwitchOn(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane w momencie ustawienia stanu niskiego na wejściu
     * @param callback
     */
    addOnSwitchOff(_callback: () => void): void {
        // Remote events are not supported
    }

    /**
     * Ustawia stan wyjścia jako 1 lub 0
     * @param {number} value
     */
    setValue(value: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Value)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Zmienia stan wyjścia na przeciwny. Parametr Time określa na jak długo następuje zmiana stanu, dla 0 jest ona stała */
    switch(miliseconds: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.Switch)
            .addParameter(miliseconds)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Załącza wyjście. Parametr Time określa na jak długo następuje zmiana stanu, dla 0 jest ona stała
     * @param {number} miliseconds
     */
    switchOn(miliseconds: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.SwitchOn)
            .addParameter(miliseconds)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Wyłącza wyjście. Parametr Time określa na jak długo następuje zmiana stanu, dla 0 jest ona stała
     * @param {number} miliseconds
     */
    switchOff(miliseconds: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.SwitchOff)
            .addParameter(miliseconds)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Wartość napięcia zasilania
     * @returns {boolean}
     */
    get value(): boolean {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Value)
            .build();
        return this.gate.runScript(cmd!) === 1;
    }

    set value(val: boolean) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Value)
            .addParameter(val ? 1 : 0)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Grupa Distributed Logic - grupa broadcastowa dla rozproszonej logiki
     * @returns {number}
     */
    get distributedLogicGroup(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.DistributedLogicGroup)
            .build();
        return this.gate.runScript(cmd!);
    }

    set distributedLogicGroup(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.DistributedLogicGroup)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Włącza raportowanie pomiaru do modułu statystyk: Off - wyłączony, Continuous - pomiar obciążenia w całym okresie pracy urządzenia, Pulse - pomiar zliczany w momencie pojawienia się stanu wysokiego na wejściu
     * @returns {StatisticStateType}
     */
    get statisticState(): StatisticStateType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.StatisticState)
            .build();
        return this.gate.runScript(cmd!);
    }

    set statisticState(value: StatisticStateType) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.StatisticState)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Mnożnik mierzonej wartości. Dla StatisticState: Continuous - wartość zużycia w jednostce czasu, Pulse - wartość zużycia dla jednego impulsu (np. 1l, 1m^3, 1kW)
     * @returns {number}
     */
    get load(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Load)
            .build();
        return this.gate.runScript(cmd!);
    }

    set load(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Load)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
}

export {
    DOut, DOutRaw, DOutRemote, StatisticStateType
}
