// Created from: src/interfaces/module_popp_z_weather.xml, object name="ZWAVE_WEATHER"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnTemperatureChange = 0,
    OnLuminanceChange = 1,
    OnHumidityChange = 2,
    OnWindSpeedChange = 3,
    OnPressureChange = 4,
    OnDewPointChange = 5
}

enum PropertyType {
    Temperature = 0,
    Luminance = 1,
    Humidity = 2,
    WindSpeed = 3,
    Pressure = 4,
    DewPoint = 5
}

enum MethodType {}

declare class ZwaveWeatherRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface IZwaveWeather {
    /** Zdarzenie wywoływane przy zmianie wartości temperatury powietrza */
    addOnTemperatureChange: (callback: () => void) => void
    /** Zdarzenie wywoływane przy zmianie wartości luminancji */
    addOnLuminanceChange: (callback: () => void) => void
    /** Zdarzenie wywoływane przy zmianie wartości wilgotności względnej */
    addOnHumidityChange: (callback: () => void) => void
    /** Zdarzenie wywoływane przy zmianie wartości prędkości wiatru */
    addOnWindSpeedChange: (callback: () => void) => void
    /** Zdarzenie wywoływane przy zmianie wartości ciśnienia barometrycznego */
    addOnPressureChange: (callback: () => void) => void
    /** Zdarzenie wywoływane przy zmianie wartości temperatury punktu rosy */
    addOnDewPointChange: (callback: () => void) => void
    /** Wartość zmierzonej temperatury powietrza */
    readonly temperature: number
    /** Wartość zmierzonej luminancji */
    readonly luminance: number
    /** Wartość zmierzonej wilgotności względnej */
    readonly humidity: number
    /** Wartość zmierzonej prędkości wiatru */
    readonly windSpeed: number
    /** Wartość zmierzonego ciśnienia barometrycznego */
    readonly pressure: number
    /** Wartość temperatury punktu rosy */
    readonly dewPoint: number
}

class ZwaveWeather implements IZwaveWeather {
    private onTemperatureChangeCallbacks: Array<() => void> = [];
    private onLuminanceChangeCallbacks: Array<() => void> = [];
    private onHumidityChangeCallbacks: Array<() => void> = [];
    private onWindSpeedChangeCallbacks: Array<() => void> = [];
    private onPressureChangeCallbacks: Array<() => void> = [];
    private onDewPointChangeCallbacks: Array<() => void> = [];

    constructor(private raw: ZwaveWeatherRaw) {
        this.raw.add_event(EventType.OnTemperatureChange, () => {
            this.onTemperatureChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnLuminanceChange, () => {
            this.onLuminanceChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnHumidityChange, () => {
            this.onHumidityChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnWindSpeedChange, () => {
            this.onWindSpeedChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnPressureChange, () => {
            this.onPressureChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnDewPointChange, () => {
            this.onDewPointChangeCallbacks.forEach(callback => { callback(); });
        });
    }

    addOnTemperatureChange(callback: () => void): void { this.onTemperatureChangeCallbacks.push(callback); }
    addOnLuminanceChange(callback: () => void): void { this.onLuminanceChangeCallbacks.push(callback); }
    addOnHumidityChange(callback: () => void): void { this.onHumidityChangeCallbacks.push(callback); }
    addOnWindSpeedChange(callback: () => void): void { this.onWindSpeedChangeCallbacks.push(callback); }
    addOnPressureChange(callback: () => void): void { this.onPressureChangeCallbacks.push(callback); }
    addOnDewPointChange(callback: () => void): void { this.onDewPointChangeCallbacks.push(callback); }

    get temperature(): number { return this.raw.get(PropertyType.Temperature); }
    get luminance(): number { return this.raw.get(PropertyType.Luminance); }
    get humidity(): number { return this.raw.get(PropertyType.Humidity); }
    get windSpeed(): number { return this.raw.get(PropertyType.WindSpeed); }
    get pressure(): number { return this.raw.get(PropertyType.Pressure); }
    get dewPoint(): number { return this.raw.get(PropertyType.DewPoint); }
}

class ZwaveWeatherRemote implements IZwaveWeather {
    constructor(private objectName: string, private gate: RemoteGate) {}

    addOnTemperatureChange(_callback: () => void): void { /* Remote events are not supported */ }
    addOnLuminanceChange(_callback: () => void): void { /* Remote events are not supported */ }
    addOnHumidityChange(_callback: () => void): void { /* Remote events are not supported */ }
    addOnWindSpeedChange(_callback: () => void): void { /* Remote events are not supported */ }
    addOnPressureChange(_callback: () => void): void { /* Remote events are not supported */ }
    addOnDewPointChange(_callback: () => void): void { /* Remote events are not supported */ }

    get temperature(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Temperature).build();
        return this.gate.runScript(cmd!);
    }
    get luminance(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Luminance).build();
        return this.gate.runScript(cmd!);
    }
    get humidity(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Humidity).build();
        return this.gate.runScript(cmd!);
    }
    get windSpeed(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.WindSpeed).build();
        return this.gate.runScript(cmd!);
    }
    get pressure(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Pressure).build();
        return this.gate.runScript(cmd!);
    }
    get dewPoint(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.DewPoint).build();
        return this.gate.runScript(cmd!);
    }
}

export { ZwaveWeather, ZwaveWeatherRaw, ZwaveWeatherRemote }
