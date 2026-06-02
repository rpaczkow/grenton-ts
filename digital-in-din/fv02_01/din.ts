import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnValueChange = 0,
    OnSwitchOn = 1,
    OnSwitchOff = 2,
    OnShortPress = 3,
    OnLongPress = 4,
    OnHold = 5,
    OnClick = 6
}

enum PropertyType {
    Value = 0,
    Inertion = 1,
    HoldDelay = 2,
    HoldInterval = 3,
    StatisticState = 4,
    Load = 5,
    DistributedLogicGroup = 6
}

enum MethodType {
}

enum StatisticStateType {
    Off = 0,
    Continuous = 1,
    Pulse = 2
}

declare class DInRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface IDIn {
    addOnValueChange: (callback: () => void) => void
    addOnSwitchOn: (callback: () => void) => void
    addOnSwitchOff: (callback: () => void) => void
    addOnShortPress: (callback: () => void) => void
    addOnLongPress: (callback: () => void) => void
    addOnHold: (callback: () => void) => void
    addOnClick: (callback: () => void) => void
    readonly value: boolean
    inertion: number
    holdDelay: number
    holdInterval: number
    statisticState: StatisticStateType
    load: number
    distributedLogicGroup: number
}

class DIn implements IDIn {
    private onValueChangeCallbacks: Array<() => void> = [];
    private onSwitchOnCallbacks: Array<() => void> = [];
    private onSwitchOffCallbacks: Array<() => void> = [];
    private onShortPressCallbacks: Array<() => void> = [];
    private onLongPressCallbacks: Array<() => void> = [];
    private onHoldCallbacks: Array<() => void> = [];
    private onClickCallbacks: Array<() => void> = [];

    constructor(private din: DInRaw) {
        this.din.add_event(EventType.OnValueChange, () => {
            this.onValueChangeCallbacks.forEach(callback => {
                callback();
            });
        });

        this.din.add_event(EventType.OnSwitchOn, () => {
            this.onSwitchOnCallbacks.forEach(callback => {
                callback();
            });
        });

        this.din.add_event(EventType.OnSwitchOff, () => {
            this.onSwitchOffCallbacks.forEach(callback => {
                callback();
            });
        });

        this.din.add_event(EventType.OnShortPress, () => {
            this.onShortPressCallbacks.forEach(callback => {
                callback();
            });
        });

        this.din.add_event(EventType.OnLongPress, () => {
            this.onLongPressCallbacks.forEach(callback => {
                callback();
            });
        });

        this.din.add_event(EventType.OnHold, () => {
            this.onHoldCallbacks.forEach(callback => {
                callback();
            });
        });

        this.din.add_event(EventType.OnClick, () => {
            this.onClickCallbacks.forEach(callback => {
                callback();
            });
        });
    }

    addOnValueChange(callback: () => void): void {
        this.onValueChangeCallbacks.push(callback);
    }
    addOnSwitchOn(callback: () => void): void {
        this.onSwitchOnCallbacks.push(callback);
    }
    addOnSwitchOff(callback: () => void): void {
        this.onSwitchOffCallbacks.push(callback);
    }
    addOnShortPress(callback: () => void): void {
        this.onShortPressCallbacks.push(callback);
    }
    addOnLongPress(callback: () => void): void {
        this.onLongPressCallbacks.push(callback);
    }
    addOnHold(callback: () => void): void {
        this.onHoldCallbacks.push(callback);
    }
    addOnClick(callback: () => void): void {
        this.onClickCallbacks.push(callback);
    }
    get value(): boolean {
        return this.din.get(PropertyType.Value) === 1;
    }
    get inertion(): number {
        return this.din.get(PropertyType.Inertion);
    }
    set inertion(value: number) {
        this.din.set(PropertyType.Inertion, value);
    }
    get holdDelay(): number {
        return this.din.get(PropertyType.HoldDelay);
    }
    set holdDelay(value: number) {
        this.din.set(PropertyType.HoldDelay, value);
    }
    get holdInterval(): number {
        return this.din.get(PropertyType.HoldInterval);
    }
    set holdInterval(value: number) {
        this.din.set(PropertyType.HoldInterval, value);
    }
    get statisticState(): StatisticStateType {
        return this.din.get(PropertyType.StatisticState);
    }
    set statisticState(value: StatisticStateType) {
        this.din.set(PropertyType.StatisticState, value);
    }
    get load(): number {
        return this.din.get(PropertyType.Load);
    }
    set load(value: number) {
        this.din.set(PropertyType.Load, value);
    }
    get distributedLogicGroup(): number {
        return this.din.get(PropertyType.DistributedLogicGroup);
    }
    set distributedLogicGroup(value: number) {
        this.din.set(PropertyType.DistributedLogicGroup, value);
    }
}

class DInRemote implements IDIn {
    constructor(private objectName: string, private gate: RemoteGate) {

    }

    addOnValueChange(_callback: () => void): void {
        // Remote events are not supported
    }
    addOnSwitchOn(_callback: () => void): void {
        // Remote events are not supported
    }
    addOnSwitchOff(_callback: () => void): void {
        // Remote events are not supported
    }
    addOnShortPress(_callback: () => void): void {
        // Remote events are not supported
    }
    addOnLongPress(_callback: () => void): void {
        // Remote events are not supported
    }
    addOnHold(_callback: () => void): void {
        // Remote events are not supported
    }
    addOnClick(_callback: () => void): void {
        // Remote events are not supported
    }

    get value(): boolean {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Value)
            .build();
        return this.gate.runScript(cmd!) === 1;
    }

    get inertion(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Inertion)
            .build();
        return this.gate.runScript(cmd!);
    }

    set inertion(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Inertion)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    get holdDelay(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.HoldDelay)
            .build();
        return this.gate.runScript(cmd!);
    }

    set holdDelay(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.HoldDelay)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    get holdInterval(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.HoldInterval)
            .build();
        return this.gate.runScript(cmd!);
    }

    set holdInterval(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.HoldInterval)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

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
}

export { DIn, DInRaw, DInRemote, StatisticStateType }
