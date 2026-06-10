// Created from: src/interfaces/module_popp_z_weather.xml, object name="ZWAVE_WAKEUP"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnWakeUp = 1
}

enum PropertyType {
    Interval = 0,
    LastWakeUp = 1
}

enum MethodType {}

declare class ZwaveWakeupRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface IZwaveWakeup {
    /** Zdarzenie wywoływane po wykryciu wybudzenia modułu Z-Wave z trybu uśpienia */
    addOnWakeUp: (callback: () => void) => void
    /** Okres samoczynnego wybudzania modułu Z-Wave z trybu uśpienia w sekundach */
    interval: number
    /** Czas ostatniego wybudzenia modułu Z-Wave z trybu uśpienia */
    readonly lastWakeUp: string
    /** Ustawia okres samoczynnego wybudzania modułu Z-Wave z trybu uśpienia */
    setInterval: (interval: number) => void
}

class ZwaveWakeup implements IZwaveWakeup {
    private onWakeUpCallbacks: Array<() => void> = [];

    constructor(private raw: ZwaveWakeupRaw) {
        this.raw.add_event(EventType.OnWakeUp, () => {
            this.onWakeUpCallbacks.forEach(callback => { callback(); });
        });
    }

    addOnWakeUp(callback: () => void): void { this.onWakeUpCallbacks.push(callback); }

    get interval(): number { return this.raw.get(PropertyType.Interval); }
    set interval(val: number) { this.raw.set(PropertyType.Interval, val); }
    get lastWakeUp(): string { return this.raw.get(PropertyType.LastWakeUp); }

    setInterval(interval: number): void { this.raw.set(PropertyType.Interval, interval); }
}

class ZwaveWakeupRemote implements IZwaveWakeup {
    constructor(private objectName: string, private gate: RemoteGate) {}

    addOnWakeUp(_callback: () => void): void { /* Remote events are not supported */ }

    get interval(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Interval).build();
        return this.gate.runScript(cmd!);
    }
    set interval(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.Interval).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
    get lastWakeUp(): string {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.LastWakeUp).build();
        return this.gate.runScript(cmd!);
    }

    setInterval(interval: number): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.Interval).addParameter(interval).build();
        this.gate.runScript(cmd!);
    }
}

export { ZwaveWakeup, ZwaveWakeupRaw, ZwaveWakeupRemote }
