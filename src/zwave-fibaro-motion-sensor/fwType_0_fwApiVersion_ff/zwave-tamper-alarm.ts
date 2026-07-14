// Created from: src/interfaces/module_fibaro_motion_sensor_ff.xml, object name="ZWAVE_TAMPER_ALARM"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnChange = 0,
    OnAlarmDetected = 1,
    OnAlarmCleared = 2
}

enum PropertyType {
    AlarmDetected = 0
}

enum MethodType {
    ClearAlarm = 0
}

declare class ZwaveTamperAlarmRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface IZwaveTamperAlarm {
    /** Zdarzenie wywoływane przy zmianie stanu wykrycia alarmu */
    addOnChange: (callback: () => void) => void
    /** Zdarzenie wywoływane po wykryciu alarmu */
    addOnAlarmDetected: (callback: () => void) => void
    /** Zdarzenie wywoływane po anulowaniu alarmu */
    addOnAlarmCleared: (callback: () => void) => void
    /** Stan wykrycia alarmu */
    readonly alarmDetected: number
    /** Anuluje aktywny alarm */
    clearAlarm: () => void
}

class ZwaveTamperAlarm implements IZwaveTamperAlarm {
    private onChangeCallbacks: Array<() => void> = [];
    private onAlarmDetectedCallbacks: Array<() => void> = [];
    private onAlarmClearedCallbacks: Array<() => void> = [];

    constructor(private raw: ZwaveTamperAlarmRaw) {
        this.raw.add_event(EventType.OnChange, () => {
            this.onChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnAlarmDetected, () => {
            this.onAlarmDetectedCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnAlarmCleared, () => {
            this.onAlarmClearedCallbacks.forEach(callback => { callback(); });
        });
    }

    addOnChange(callback: () => void): void { this.onChangeCallbacks.push(callback); }
    addOnAlarmDetected(callback: () => void): void { this.onAlarmDetectedCallbacks.push(callback); }
    addOnAlarmCleared(callback: () => void): void { this.onAlarmClearedCallbacks.push(callback); }

    get alarmDetected(): number { return this.raw.get(PropertyType.AlarmDetected); }

    clearAlarm(): void { this.raw.execute(MethodType.ClearAlarm); }
}

class ZwaveTamperAlarmRemote implements IZwaveTamperAlarm {
    constructor(private objectName: string, private gate: RemoteGate) {}

    addOnChange(_callback: () => void): void { /* Remote events are not supported */ }
    addOnAlarmDetected(_callback: () => void): void { /* Remote events are not supported */ }
    addOnAlarmCleared(_callback: () => void): void { /* Remote events are not supported */ }

    get alarmDetected(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.AlarmDetected).build();
        return this.gate.runScript(cmd!);
    }

    clearAlarm(): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.ClearAlarm).build();
        this.gate.runScript(cmd!);
    }
}

export { ZwaveTamperAlarm, ZwaveTamperAlarmRaw, ZwaveTamperAlarmRemote }
