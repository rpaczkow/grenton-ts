// Created from: src/interfaces/module_generic_zwave_fv01_0.xml, object name="GENERIC_ZW_NODE"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum PropertyType {
    RemoteVal = 0,
    LocalVal = 1
}

enum MethodType {
    SwitchOn = 0,
    SwitchOff = 1,
    Switch = 2,
    RequestState = 3,
    SetOutput = 4,
    SetConfigParam = 5
}

declare class GenericZwNodeRaw {
    get(property: PropertyType): any;
    execute(method: MethodType, ...args: any[]): any;
}

interface IGenericZwNode {
    /** Zwraca wartość modułu Z-Wave */
    readonly remoteVal: number
    /** Zwraca żądaną wartość modułu Z-Wave */
    readonly localVal: number
    /** Załączenie wyjścia */
    switchOn: () => void
    /** Wyłączenie wyjście */
    switchOff: () => void
    /** Zmienia stan wyjścia na przeciwny. */
    switch: () => void
    /** Wymusza pobranie wartości modułu */
    requestState: () => void
    /** Ustawia stan wyjścia */
    setOutput: (value: number) => void
    /** Ustawia wartość danego rejestru (parametru) konfiguracyjnego */
    setConfigParam: (parameter: number, value: number, length?: number) => void
}

class GenericZwNode implements IGenericZwNode {
    constructor(private raw: GenericZwNodeRaw) {}

    get remoteVal(): number { return this.raw.get(PropertyType.RemoteVal); }
    get localVal(): number { return this.raw.get(PropertyType.LocalVal); }

    switchOn(): void { this.raw.execute(MethodType.SwitchOn); }
    switchOff(): void { this.raw.execute(MethodType.SwitchOff); }
    switch(): void { this.raw.execute(MethodType.Switch); }
    requestState(): void { this.raw.execute(MethodType.RequestState); }
    setOutput(value: number): void { this.raw.execute(MethodType.SetOutput, value); }
    setConfigParam(parameter: number, value: number, length: number = 1): void { this.raw.execute(MethodType.SetConfigParam, parameter, value, length); }
}

class GenericZwNodeRemote implements IGenericZwNode {
    constructor(private objectName: string, private gate: RemoteGate) {}

    get remoteVal(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.RemoteVal).build();
        return this.gate.runScript(cmd!);
    }
    get localVal(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.LocalVal).build();
        return this.gate.runScript(cmd!);
    }

    switchOn(): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SwitchOn).build();
        this.gate.runScript(cmd!);
    }
    switchOff(): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SwitchOff).build();
        this.gate.runScript(cmd!);
    }
    switch(): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.Switch).build();
        this.gate.runScript(cmd!);
    }
    requestState(): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.RequestState).build();
        this.gate.runScript(cmd!);
    }
    setOutput(value: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SetOutput).addParameter(value).build();
        this.gate.runScript(cmd!);
    }
    setConfigParam(parameter: number, value: number, length: number = 1): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SetConfigParam).addParameter(parameter).addParameter(value).addParameter(length).build();
        this.gate.runScript(cmd!);
    }
}

export { GenericZwNode, GenericZwNodeRaw, GenericZwNodeRemote }
