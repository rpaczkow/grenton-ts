// Created from: src/interfaces/module_fibaro_door_window_sensor_ff.xml, object name="WAKE_UP"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnWakeUp = 0
}

enum PropertyType {
    WakeupInterval = 0,
    LastWakeup = 1
}

declare class WakeUpRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
}

interface IWakeUp {
    /** Zdarzenie wywoływane po wykryciu wybudzenia modułu Z-Wave z trybu uśpienia */
    addOnWakeUp: (callback: () => void) => void
    /** Okres samoczynnego wybudzania modułu Z-Wave z trybu uśpienia w sekundach */
    wakeupInterval: number
    /** Czas ostatniego wybudzenia modułu Z-Wave z trybu uśpienia */
    readonly lastWakeup: number
}

class WakeUp implements IWakeUp {
    private onWakeUpCallbacks: Array<() => void> = [];

    constructor(private raw: WakeUpRaw) {
        this.raw.add_event(EventType.OnWakeUp, () => {
            this.onWakeUpCallbacks.forEach(callback => { callback(); });
        });
    }

    addOnWakeUp(callback: () => void): void { this.onWakeUpCallbacks.push(callback); }

    get wakeupInterval(): number { return this.raw.get(PropertyType.WakeupInterval); }
    set wakeupInterval(val: number) { this.raw.set(PropertyType.WakeupInterval, val); }
    get lastWakeup(): number { return this.raw.get(PropertyType.LastWakeup); }
}

class WakeUpRemote implements IWakeUp {
    constructor(private objectName: string, private gate: RemoteGate) {}

    addOnWakeUp(_callback: () => void): void { /* Remote events are not supported */ }

    get wakeupInterval(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.WakeupInterval).build();
        return this.gate.runScript(cmd!);
    }
    set wakeupInterval(val: number) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.WakeupInterval).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
    get lastWakeup(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.LastWakeup).build();
        return this.gate.runScript(cmd!);
    }
}

export { WakeUp, WakeUpRaw, WakeUpRemote }
