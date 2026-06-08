// Created from: src/interfaces/module_zwave_unknown_module_ff.xml, object name="ZWAVE_UNKNOWN_MODULE"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum MethodType {
    BasicSet = 0,
    MultiChannelBasicSet = 1
}

declare class ZwaveUnknownModuleRaw {
    execute(method: MethodType, ...args: any[]): any;
}

interface IZwaveUnknownModule {
    /** Wysyła komendę BASIC_SET do modułu Z-Wave */
    basicSet: (value: number) => void
    /** Wysyła komendę BASIC_SET do endpointu wielokanałowego modułu Z-Wave */
    multiChannelBasicSet: (endpoint: number, value: number) => void
}

class ZwaveUnknownModule implements IZwaveUnknownModule {
    constructor(private raw: ZwaveUnknownModuleRaw) {}

    basicSet(value: number): void { this.raw.execute(MethodType.BasicSet, value); }
    multiChannelBasicSet(endpoint: number, value: number): void { this.raw.execute(MethodType.MultiChannelBasicSet, endpoint, value); }
}

class ZwaveUnknownModuleRemote implements IZwaveUnknownModule {
    constructor(private objectName: string, private gate: RemoteGate) {}

    basicSet(value: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.BasicSet).addParameter(value).build();
        this.gate.runScript(cmd!);
    }
    multiChannelBasicSet(endpoint: number, value: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.MultiChannelBasicSet).addParameter(endpoint).addParameter(value).build();
        this.gate.runScript(cmd!);
    }
}

export { ZwaveUnknownModule, ZwaveUnknownModuleRaw, ZwaveUnknownModuleRemote }
