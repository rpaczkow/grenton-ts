import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
	OnValueChange = 0,
	OnValueLower = 1,
	OnValueRise = 2,
	OnOutOfRange = 3,
	OnSwitchOn = 4,
	OnSwitchOff = 5,
	OnInRange = 6
}

enum PropertyType {
	Value = 0,
	ValuesPercent = 1,
	Scale = 2,
	Sensivity = 3,
	RawValue = 4,
	MinValue = 5,	
	MaxValue = 6
}

enum MethodType {}

declare class AnalogInRaw {
    add_event(event: EventType, callback: () => void): void
    set(property: PropertyType, value: any): void
    get(property: PropertyType): any
    execute(method: MethodType, ...args: any[]): void
}

interface IAnalogIn {
    addOnValueChange: (callback: () => void) => void
    addOnValueLower: (callback: () => void) => void
    addOnValueRise: (callback: () => void) => void
    addOnOutOfRange: (callback: () => void) => void
    addOnSwitchOn: (callback: () => void) => void
    addOnSwitchOff: (callback: () => void) => void
    addOnInRange: (callback: () => void) => void
    readonly rawValue: number
    readonly value: number
    readonly valuePercent: number
    scale: number
    sensivity: number
    minValue: number
    maxValue: number
}

class AnalogIn implements IAnalogIn{
    private onValueChangeCallbacks: Array<() => void> = [];
    private onValueLowerCallbacks: Array<() => void> = [];
    private onValueRiseCallbacks: Array<() => void> = [];
    private onOutOfRangeCallbacks: Array<() => void> = [];
    private onSwitchOnCallbacks: Array<() => void> = [];
    private onSwitchOffCallbacks: Array<() => void> = [];
    private onInRangeCallbacks: Array<() => void> = [];

    constructor(private ain: AnalogInRaw) {
        this.ain.add_event(EventType.OnValueChange, () => {
            this.onValueChangeCallbacks.forEach(callback => {
                callback();
            });
        });

        this.ain.add_event(EventType.OnValueLower, () => {
            this.onValueLowerCallbacks.forEach(callback => {
                callback();
            });
        });

        this.ain.add_event(EventType.OnValueRise, () => {
            this.onValueRiseCallbacks.forEach(callback => {
                callback();
            });
        });

        this.ain.add_event(EventType.OnOutOfRange, () => {
            this.onOutOfRangeCallbacks.forEach(callback => {
                callback();
            });
        });

        this.ain.add_event(EventType.OnSwitchOn, () => {
            this.onSwitchOnCallbacks.forEach(callback => {
                callback();
            });
        });

        this.ain.add_event(EventType.OnSwitchOff, () => {
            this.onSwitchOffCallbacks.forEach(callback => {
                callback();
            });
        });

        this.ain.add_event(EventType.OnInRange, () => {
            this.onInRangeCallbacks.forEach(callback => {
                callback();
            });
        });
    }

    addOnValueChange(callback: () => void): void {
        this.onValueChangeCallbacks.push(callback);
    }
    addOnValueLower(callback: () => void): void {
        this.onValueLowerCallbacks.push(callback);
    }
    addOnValueRise(callback: () => void): void {
        this.onValueRiseCallbacks.push(callback);
    }
    addOnOutOfRange(callback: () => void): void {
        this.onOutOfRangeCallbacks.push(callback);
    }
    addOnSwitchOn(callback: () => void): void {
        this.onSwitchOnCallbacks.push(callback);
    }
    addOnSwitchOff(callback: () => void): void {
        this.onSwitchOffCallbacks.push(callback);
    }
    addOnInRange(callback: () => void): void {
        this.onInRangeCallbacks.push(callback);
    }
    get rawValue(): number{
        return this.ain.get(PropertyType.RawValue)
    }
    get value(): number{
        return this.ain.get(PropertyType.Value)
    }
    get valuePercent(): number{
        return this.ain.get(PropertyType.ValuesPercent)
    }
    get scale(): number{
        return this.ain.get(PropertyType.Scale)
    }
    set scale(value: number){
        this.ain.set(PropertyType.Scale, value)
    }
    get sensivity(): number{
        return this.ain.get(PropertyType.Sensivity)
    }
    set sensivity(value: number){
        this.ain.set(PropertyType.Sensivity, value)
    }
    get minValue(): number{
        return this.ain.get(PropertyType.MinValue)
    }
    set minValue(value: number){
        this.ain.set(PropertyType.MinValue, value)
    }
    get maxValue(): number{
        return this.ain.get(PropertyType.MaxValue)
    }
    set maxValue(value: number){
        this.ain.set(PropertyType.MaxValue, value)
    }
}

class AnalogInRemote implements IAnalogIn {
    constructor(private objectName: string, private gate: RemoteGate){

    }

    addOnValueChange(_callback: () => void): void {
        // Remote events are not supported
    }
    addOnValueLower(_callback: () => void): void {
        // Remote events are not supported
    }
    addOnValueRise(_callback: () => void): void {
        // Remote events are not supported
    }
    addOnOutOfRange(_callback: () => void): void {
        // Remote events are not supported
    }
    addOnSwitchOn(_callback: () => void): void {
        // Remote events are not supported
    }
    addOnSwitchOff(_callback: () => void): void {
        // Remote events are not supported
    }
    addOnInRange(_callback: () => void): void {
        // Remote events are not supported
    }

    get rawValue(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.RawValue)
            .build();

        return this.gate.runScript(cmd!);
    }

    get value(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Value)
            .build();
        return this.gate.runScript(cmd!);
    }
    get valuePercent(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.ValuesPercent)
            .build();
        return this.gate.runScript(cmd!);
    }
    get scale(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Scale)
            .build();
        return this.gate.runScript(cmd!);
    }
    set scale(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Scale)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
    get sensivity(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Sensivity)
            .build();
        return this.gate.runScript(cmd!);
    }
    set sensivity(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Sensivity)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
    get minValue(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.MinValue)
            .build();
        return this.gate.runScript(cmd!);
    }
    set minValue(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.MinValue)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
    get maxValue(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.MaxValue)
            .build();
        return this.gate.runScript(cmd!);
    }
    set maxValue(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.MaxValue)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
}

export { AnalogIn, AnalogInRaw, AnalogInRemote} 