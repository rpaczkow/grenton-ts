enum MethodType {
    RunScript = 0
}

declare class RemoteGateRaw {
    execute(method: MethodType, cmd: string): any;
}

class RemoteGate {
    constructor(private raw: RemoteGateRaw){
    }
    runScript(cmd: string): any {
        return this.raw.execute(MethodType.RunScript, cmd);
    }
}

export { RemoteGate, RemoteGateRaw }