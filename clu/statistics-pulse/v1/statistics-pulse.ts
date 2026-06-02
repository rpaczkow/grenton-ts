// Created from: packages/grenton-api/interfaces/object_statistics_pulse_v1.xml, object name="StatisticsPulse" version="1"

import { rawExecutionBuilderFactory } from "../../../core/execution-builder"
import { RemoteGate } from "../../../core/remote-gate"

enum EventType {
    OnPulseTriggered = 1
}

enum PropertyType {
    Value = 10,
    StatisticState = 1,
    Load = 2,
    StatisticTypePulse = 3
}

enum MethodType {
    TriggerPulse = 0
}

enum StatisticStateType {
    Off = 0,
    Media = 2,
    OtherCounter = 10
}

enum StatisticTypePulseType {
    Energy = 10,
    Water = 16,
    Gas = 17
}

declare class StatisticsPulseRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface IStatisticsPulse {
    /**
     * Zdarzenie wywoływane po wyzwoleniu impulsu.
     * @param callback
     */
    addOnPulseTriggered: (callback: () => void) => void
    /** Wyzwala impuls dla pomiaru typu Pulse, lub dla licznika impulsów. */
    triggerPulse: () => void
    /** Wartość pomiarowa obliczana i wysyłana jako statystyka do serwera co pełne 15 minut. Użyj metody TriggerPulse aby dodać kolejną wartość do pomiaru. Dla pomiarów 'Media' – do licznika zostanie dodana wartość cechy Load. Po wysłaniu wartości na serwer, licznik jest resetowany. */
    readonly value: number
    /** Włącza raportowanie pomiaru do statystyk oraz definiuje kategorię pomiaru. Uwaga! Raz wysłana statystyka pozostaje w historii statystyk na serwerze. Możliwe jest manualne usunięcie statystyk z poziomu panelu konta w chmurze. Off - Statystyki nie są wysyłane do chmury. */
    statisticState: StatisticStateType
    /** Wartość na impuls w watach lub metrach sześciennych. */
    load: number
    /** Statystyki są wysyłane na podstawie zliczania impulsów za pomocą metody TriggerPulse, oraz zadeklarowanej wartości dla jednego impulsu wyrażonej w watach lub m³. Wartość Value przedtsaiwa aktualną wartość do wysłania na serwer. */
    statisticTypePulse: StatisticTypePulseType
}

class StatisticsPulse implements IStatisticsPulse {
    private onPulseTriggeredCallbacks: Array<() => void> = [];

    constructor(private raw: StatisticsPulseRaw) {
        this.raw.add_event(EventType.OnPulseTriggered, () => {
            this.onPulseTriggeredCallbacks.forEach(callback => { callback(); });
        });
    }

    /**
     * Zdarzenie wywoływane po wyzwoleniu impulsu.
     * @param callback
     */
    addOnPulseTriggered(callback: () => void): void {
        this.onPulseTriggeredCallbacks.push(callback);
    }
    /** Wyzwala impuls dla pomiaru typu Pulse, lub dla licznika impulsów. */
    triggerPulse(): void {
        this.raw.execute(MethodType.TriggerPulse);
    }
    /**
     * Wartość pomiarowa obliczana i wysyłana jako statystyka do serwera co pełne 15 minut. Użyj metody TriggerPulse aby dodać kolejną wartość do pomiaru. Dla pomiarów 'Media' – do licznika zostanie dodana wartość cechy Load. Po wysłaniu wartości na serwer, licznik jest resetowany.
     * @returns {number}
     */
    get value(): number {
        return this.raw.get(PropertyType.Value);
    }
    /**
     * Włącza raportowanie pomiaru do statystyk oraz definiuje kategorię pomiaru. Uwaga! Raz wysłana statystyka pozostaje w historii statystyk na serwerze. Możliwe jest manualne usunięcie statystyk z poziomu panelu konta w chmurze. Off - Statystyki nie są wysyłane do chmury.
     * @returns {StatisticStateType}
     */
    get statisticState(): StatisticStateType {
        return this.raw.get(PropertyType.StatisticState);
    }
    set statisticState(value: StatisticStateType) {
        this.raw.set(PropertyType.StatisticState, value);
    }
    /**
     * Wartość na impuls w watach lub metrach sześciennych.
     * @returns {number}
     */
    get load(): number {
        return this.raw.get(PropertyType.Load);
    }
    set load(value: number) {
        this.raw.set(PropertyType.Load, value);
    }
    /**
     * Statystyki są wysyłane na podstawie zliczania impulsów za pomocą metody TriggerPulse, oraz zadeklarowanej wartości dla jednego impulsu wyrażonej w watach lub m³. Wartość Value przedtsaiwa aktualną wartość do wysłania na serwer.
     * @returns {StatisticTypePulseType}
     */
    get statisticTypePulse(): StatisticTypePulseType {
        return this.raw.get(PropertyType.StatisticTypePulse);
    }
    set statisticTypePulse(value: StatisticTypePulseType) {
        this.raw.set(PropertyType.StatisticTypePulse, value);
    }
}

class StatisticsPulseRemote implements IStatisticsPulse {
    constructor(private objectName: string, private gate: RemoteGate) {

    }

    /**
     * Zdarzenie wywoływane po wyzwoleniu impulsu.
     * @param callback
     */
    addOnPulseTriggered(_callback: () => void): void {
        // Remote events are not supported
    }

    /** Wyzwala impuls dla pomiaru typu Pulse, lub dla licznika impulsów. */
    triggerPulse(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.TriggerPulse)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Wartość pomiarowa obliczana i wysyłana jako statystyka do serwera co pełne 15 minut. Użyj metody TriggerPulse aby dodać kolejną wartość do pomiaru. Dla pomiarów 'Media' – do licznika zostanie dodana wartość cechy Load. Po wysłaniu wartości na serwer, licznik jest resetowany.
     * @returns {number}
     */
    get value(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Value)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Włącza raportowanie pomiaru do statystyk oraz definiuje kategorię pomiaru. Uwaga! Raz wysłana statystyka pozostaje w historii statystyk na serwerze. Możliwe jest manualne usunięcie statystyk z poziomu panelu konta w chmurze. Off - Statystyki nie są wysyłane do chmury.
     * @returns {StatisticStateType}
     */
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

    /**
     * Wartość na impuls w watach lub metrach sześciennych.
     * @returns {number}
     */
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

    /**
     * Statystyki są wysyłane na podstawie zliczania impulsów za pomocą metody TriggerPulse, oraz zadeklarowanej wartości dla jednego impulsu wyrażonej w watach lub m³. Wartość Value przedtsaiwa aktualną wartość do wysłania na serwer.
     * @returns {StatisticTypePulseType}
     */
    get statisticTypePulse(): StatisticTypePulseType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.StatisticTypePulse)
            .build();
        return this.gate.runScript(cmd!);
    }

    set statisticTypePulse(value: StatisticTypePulseType) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.StatisticTypePulse)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
}

export {
    StatisticsPulse, StatisticsPulseRaw, StatisticsPulseRemote,
    StatisticStateType, StatisticTypePulseType
}
