// Created from: packages/grenton-api/interfaces/module_2_0_TOUCH_PANEL_FM_8_fv01_02.xml, object name="BUTTON" version="01.02"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnValueChange = 0,
    OnSwitchOn = 1,
    OnSwitchOff = 2,
    OnShortPress = 3,
    OnLongPress = 4,
    OnHold = 5,
    OnClick = 6,
}

enum PropertyType {
    Value = 0,
    Mode = 1,
    HoldDelay = 2,
    HoldInterval = 3,
    DistributedLogicGroup = 4,
}

enum MethodType {
    ShowOK = 0,
    ShowError = 0,
    LedSwitchOn = 1,
    LedSwitchOff = 2,
}

enum ModeType {
    Monostable = 0,
    Bistable = 1,
    Locked = 2,
}

declare class ButtonRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: number, ...args: any[]): any;
}

interface IButton {
    /**
     * Zdarzenie wywoływane w przypadku zmiany stanu na przeciwny
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
     * Zdarzenie wywoływane po naciśnięciu przycisku na okres 500 ms - 2000 ms
     * @param callback
     */
    addOnShortPress: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po naciśnięciu przycisku na okres dłuższy niż 2000 ms
     * @param callback
     */
    addOnLongPress: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane gdy wejście jest w stanie wysokim, pierwszy raz po upłynięciu czasu HoldDelay, a następnie cyklicznie co wartość HoldInterval
     * @param callback
     */
    addOnHold: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po naciśnięciu przycisku na czas krótszy niż 500 ms
     * @param callback
     */
    addOnClick: (callback: () => void) => void
    /** Powoduje miganie zielonej diody na przycisku przez 2 sekundy (częstotliwość 500 ms). Czerwona dioda przycisku pozostaje zgaszona */
    showOK: () => void
    /** Powoduje miganie czerwonej diody na przycisku przez 2 sekundy (częstotliwość 500 ms) */
    showError: () => void
    /** Załącza zieloną diodę na przycisku */
    ledSwitchOn: () => void
    /** Wyłącza zieloną diodę na przycisku */
    ledSwitchOff: () => void
    /** Zwraca stan wejścia jako 0 lub 1 */
    readonly value: boolean
    /** Zwraca ustawiony tryb działania przycisku (0 - monostabilny (Monostable), 1 - bistabilny (Bistable), 2 - zablokowany (Locked)) */
    readonly mode: ModeType
    /**
     * Ustawia tryb działania przycisku (0 - monostabilny (Monostable), 1 - bistabilny (Bistable), 2 - zablokowany (Locked))
     * @param {ModeType} value
     */
    setMode: (value: ModeType) => void
    /** Czas w milisekundach, po jakim po wciśnięciu i przytrzymaniu przycisku wyzwalane jest zdarzenie OnHold (domyślnie 1000 ms) */
    readonly holdDelay: number
    /**
     * Ustawia wartość HoldDelay
     * @param {number} value
     */
    setHoldDelay: (value: number) => void
    /** Odstęp cykliczny w milisekundach, po jakim podczas trzymania przycisku wyzwalane są kolejne zdarzenia OnHold */
    readonly holdInterval: number
    /**
     * Ustawia wartość HoldInterval
     * @param {number} value
     */
    setHoldInterval: (value: number) => void
    /** Grupa Distributed Logic - grupa broadcastowa dla rozproszonej logiki */
    distributedLogicGroup: number
}

class ButtonRemote implements IButton {
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

    /** Powoduje miganie zielonej diody na przycisku przez 2 sekundy (częstotliwość 500 ms). Czerwona dioda przycisku pozostaje zgaszona */
    showOK(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.ShowOK)
            .addParameter(0)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Powoduje miganie czerwonej diody na przycisku przez 2 sekundy (częstotliwość 500 ms) */
    showError(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.ShowError)
            .addParameter(1)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Załącza zieloną diodę na przycisku */
    ledSwitchOn(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.LedSwitchOn)
            .addParameter(2)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Wyłącza zieloną diodę na przycisku */
    ledSwitchOff(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.LedSwitchOff)
            .addParameter(4)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Zwraca stan wejścia jako 0 lub 1 */
    get value(): boolean {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Value)
            .build();
        return this.gate.runScript(cmd!) === 1;
    }

    /** Zwraca ustawiony tryb działania przycisku (0 - monostabilny (Monostable), 1 - bistabilny (Bistable), 2 - zablokowany (Locked)) */
    get mode(): ModeType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Mode)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Ustawia tryb działania przycisku (0 - monostabilny (Monostable), 1 - bistabilny (Bistable), 2 - zablokowany (Locked))
     * @param {ModeType} value
     */
    setMode(value: ModeType): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Mode)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Czas w milisekundach, po jakim po wciśnięciu i przytrzymaniu przycisku wyzwalane jest zdarzenie OnHold (domyślnie 1000 ms) */
    get holdDelay(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.HoldDelay)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Ustawia wartość HoldDelay
     * @param {number} value
     */
    setHoldDelay(value: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.HoldDelay)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Odstęp cykliczny w milisekundach, po jakim podczas trzymania przycisku wyzwalane są kolejne zdarzenia OnHold */
    get holdInterval(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.HoldInterval)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Ustawia wartość HoldInterval
     * @param {number} value
     */
    setHoldInterval(value: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.HoldInterval)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Grupa Distributed Logic - grupa broadcastowa dla rozproszonej logiki */
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

class Button implements IButton {
    private onValueChangeCallbacks: Array<() => void> = [];
    private onSwitchOnCallbacks: Array<() => void> = [];
    private onSwitchOffCallbacks: Array<() => void> = [];
    private onShortPressCallbacks: Array<() => void> = [];
    private onLongPressCallbacks: Array<() => void> = [];
    private onHoldCallbacks: Array<() => void> = [];
    private onClickCallbacks: Array<() => void> = [];

    constructor(private raw: ButtonRaw) {
        this.raw.add_event(EventType.OnValueChange, () => {
            this.onValueChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnSwitchOn, () => {
            this.onSwitchOnCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnSwitchOff, () => {
            this.onSwitchOffCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnShortPress, () => {
            this.onShortPressCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnLongPress, () => {
            this.onLongPressCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnHold, () => {
            this.onHoldCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnClick, () => {
            this.onClickCallbacks.forEach(callback => { callback(); });
        });
    }

    /**
     * Zdarzenie wywoływane w przypadku zmiany stanu na przeciwny
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
     * Zdarzenie wywoływane po naciśnięciu przycisku na okres 500 ms - 2000 ms
     * @param callback
     */
    addOnShortPress(callback: () => void): void {
        this.onShortPressCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po naciśnięciu przycisku na okres dłuższy niż 2000 ms
     * @param callback
     */
    addOnLongPress(callback: () => void): void {
        this.onLongPressCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane gdy wejście jest w stanie wysokim, pierwszy raz po upłynięciu czasu HoldDelay, a następnie cyklicznie co wartość HoldInterval
     * @param callback
     */
    addOnHold(callback: () => void): void {
        this.onHoldCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po naciśnięciu przycisku na czas krótszy niż 500 ms
     * @param callback
     */
    addOnClick(callback: () => void): void {
        this.onClickCallbacks.push(callback);
    }
    /** Powoduje miganie zielonej diody na przycisku przez 2 sekundy (częstotliwość 500 ms). Czerwona dioda przycisku pozostaje zgaszona */
    showOK(): void {
        this.raw.execute(MethodType.ShowOK, 0);
    }
    /** Powoduje miganie czerwonej diody na przycisku przez 2 sekundy (częstotliwość 500 ms) */
    showError(): void {
        this.raw.execute(MethodType.ShowError, 1);
    }
    /** Załącza zieloną diodę na przycisku */
    ledSwitchOn(): void {
        this.raw.execute(MethodType.LedSwitchOn, 2);
    }
    /** Wyłącza zieloną diodę na przycisku */
    ledSwitchOff(): void {
        this.raw.execute(MethodType.LedSwitchOff, 4);
    }
    /** Zwraca stan wejścia jako 0 lub 1 */
    get value(): boolean {
        return this.raw.get(PropertyType.Value) === 1;
    }
    /** Zwraca ustawiony tryb działania przycisku (0 - monostabilny (Monostable), 1 - bistabilny (Bistable), 2 - zablokowany (Locked)) */
    get mode(): ModeType {
        return this.raw.get(PropertyType.Mode);
    }
    /**
     * Ustawia tryb działania przycisku (0 - monostabilny (Monostable), 1 - bistabilny (Bistable), 2 - zablokowany (Locked))
     * @param {ModeType} value
     */
    setMode(value: ModeType): void {
        this.raw.set(PropertyType.Mode, value);
    }
    /** Czas w milisekundach, po jakim po wciśnięciu i przytrzymaniu przycisku wyzwalane jest zdarzenie OnHold (domyślnie 1000 ms) */
    get holdDelay(): number {
        return this.raw.get(PropertyType.HoldDelay);
    }
    /**
     * Ustawia wartość HoldDelay
     * @param {number} value
     */
    setHoldDelay(value: number): void {
        this.raw.set(PropertyType.HoldDelay, value);
    }
    /** Odstęp cykliczny w milisekundach, po jakim podczas trzymania przycisku wyzwalane są kolejne zdarzenia OnHold */
    get holdInterval(): number {
        return this.raw.get(PropertyType.HoldInterval);
    }
    /**
     * Ustawia wartość HoldInterval
     * @param {number} value
     */
    setHoldInterval(value: number): void {
        this.raw.set(PropertyType.HoldInterval, value);
    }
    /** Grupa Distributed Logic - grupa broadcastowa dla rozproszonej logiki */
    get distributedLogicGroup(): number {
        return this.raw.get(PropertyType.DistributedLogicGroup);
    }
    set distributedLogicGroup(value: number) {
        this.raw.set(PropertyType.DistributedLogicGroup, value);
    }
}

export { Button, ButtonRaw, ButtonRemote, ModeType }
