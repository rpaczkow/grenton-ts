// Created from: packages/grenton-api/interfaces/object_event_scheduler_v1.xml, object name="EventScheduler" version="1"

import { rawExecutionBuilderFactory } from "../../../core/execution-builder"
import { RemoteGate } from "../../../core/remote-gate"

enum EventType {
    OnStart = 0,
    OnStop = 1,
    OnEvent = 2,
    OnRuleAdd = 3,
    OnRuleDelete = 4
}

enum PropertyType {
    RuleList = 0,
    CurrentRule = 1,
    NextRule = 2,
    RuleCount = 3,
    RuleAvailableCount = 4,
    State = 5
}

enum MethodType {
    Start = 0,
    Stop = 1,
    AddRule = 2,
    DeleteRule = 3,
    GetRule = 4,
    EnableRule = 5,
    DisableRule = 6,
    GetRules = 7,
    GetNextRule = 8
}

enum StateType {
    Off = 0,
    On = 1
}

declare class EventSchedulerRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface IEventScheduler {
    /**
     * Zdarzenie wywoływane przy uruchomieniu Event Schedulera
     * @param callback
     */
    addOnStart: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane przy dezaktywacji Event Scheduler
     * @param callback
     */
    addOnStop: (callback: () => void) => void
    /**
     * Zdarzenie docelowe wywołane na podstawie ustawionych reguł i aktualnym czasie urządzenia
     * @param callback
     */
    addOnEvent: (callback: () => void) => void
    /**
     * Zdarzenie wywołane podczas dodania reguły do listy
     * @param callback
     */
    addOnRuleAdd: (callback: () => void) => void
    /**
     * Zdarzenie wywołane podczas usunięcia reguły z listy
     * @param callback
     */
    addOnRuleDelete: (callback: () => void) => void
    /** Uruchamia Event Scheduler */
    start: () => void
    /** Zatrzymuje Event Scheduler */
    stop: () => void
    /**
     * Dodaje regułę do listy. Podaj regułę crone "minute hour * * day_of_week". Zwraca numer id przydzielonej reguły. 0 - błąd
     * @param {string} record
     * @returns {string}
     */
    addRule: (record: string) => string
    /**
     * Usuwa regułę o podanym id z listy. Zwraca 0 - ok, 1 - błąd
     * @param {number} id
     * @returns {number}
     */
    deleteRule: (id: number) => number
    /**
     * Zwraca regułę w formacie {id, rule_state, "crone"} dla podanego id rule_state: 0(wyłączona), 1(włączona)
     * @param {number} id
     * @returns {string}
     */
    getRule: (id: number) => string
    /**
     * Zmienia stan reguły na aktywny. Zwraca 0 - ok, 1 - błąd
     * @param {number} id
     * @returns {number}
     */
    enableRule: (id: number) => number
    /**
     * Zmienia stan reguły na nieaktywny. Zwraca 0 - ok, 1 - błąd
     * @param {number} id
     * @returns {number}
     */
    disableRule: (id: number) => number
    /**
     * Lista wszystkich reguł w formacie {{id, rule_state, "crone"},{id, rule_state, "crone"},...} rule_state: 0(wyłączona), 1(włączona)
     * @returns {string}
     */
    getRules: () => string
    /**
     * Reguła z listy dla następnego zdarzenia {id, rule_state, "crone"} rule_state: 0(wyłączona), 1(włączona)
     * @returns {string}
     */
    getNextRule: () => string
    /** Lista wszystkich reguł w formacie {{id, rule_state, "crone"},{id, rule_state, "crone"},...} rule_state: 0(wyłączona), 1(włączona) */
    readonly ruleList: string
    /** Reguła z listy, która odpowiada za aktualne zdarzenie {id, rule_state, "crone"} Zwraca uruchomioną regułę przez 1 minutę, następnie "N\A" rule_state: 0(wyłączona), 1(włączona) */
    readonly currentRule: string
    /** Reguła z listy dla następnego zdarzenia {id, rule_state, "crone"} rule_state: 0(wyłączona), 1(włączona) */
    readonly nextRule: string
    /** Liczba dodanych reguł */
    readonly ruleCount: number
    /** Liczba reguł które mogą być dodane do istniejącej listy (wolne miejsce) */
    readonly ruleAvailableCount: number
    /** Aktualny stan Event Schedulera */
    state: StateType
}

class EventScheduler implements IEventScheduler {
    private onStartCallbacks: Array<() => void> = [];
    private onStopCallbacks: Array<() => void> = [];
    private onEventCallbacks: Array<() => void> = [];
    private onRuleAddCallbacks: Array<() => void> = [];
    private onRuleDeleteCallbacks: Array<() => void> = [];

    constructor(private raw: EventSchedulerRaw) {
        this.raw.add_event(EventType.OnStart, () => {
            this.onStartCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnStop, () => {
            this.onStopCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnEvent, () => {
            this.onEventCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnRuleAdd, () => {
            this.onRuleAddCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnRuleDelete, () => {
            this.onRuleDeleteCallbacks.forEach(callback => { callback(); });
        });
    }

    /**
     * Zdarzenie wywoływane przy uruchomieniu Event Schedulera
     * @param callback
     */
    addOnStart(callback: () => void): void {
        this.onStartCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane przy dezaktywacji Event Scheduler
     * @param callback
     */
    addOnStop(callback: () => void): void {
        this.onStopCallbacks.push(callback);
    }
    /**
     * Zdarzenie docelowe wywołane na podstawie ustawionych reguł i aktualnym czasie urządzenia
     * @param callback
     */
    addOnEvent(callback: () => void): void {
        this.onEventCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywołane podczas dodania reguły do listy
     * @param callback
     */
    addOnRuleAdd(callback: () => void): void {
        this.onRuleAddCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywołane podczas usunięcia reguły z listy
     * @param callback
     */
    addOnRuleDelete(callback: () => void): void {
        this.onRuleDeleteCallbacks.push(callback);
    }
    /** Uruchamia Event Scheduler */
    start(): void {
        this.raw.execute(MethodType.Start);
    }
    /** Zatrzymuje Event Scheduler */
    stop(): void {
        this.raw.execute(MethodType.Stop);
    }
    /**
     * Dodaje regułę do listy. Podaj regułę crone "minute hour * * day_of_week". Zwraca numer id przydzielonej reguły. 0 - błąd
     * @param {string} record
     * @returns {string}
     */
    addRule(record: string): string {
        return this.raw.execute(MethodType.AddRule, record);
    }
    /**
     * Usuwa regułę o podanym id z listy. Zwraca 0 - ok, 1 - błąd
     * @param {number} id
     * @returns {number}
     */
    deleteRule(id: number): number {
        return this.raw.execute(MethodType.DeleteRule, id);
    }
    /**
     * Zwraca regułę w formacie {id, rule_state, "crone"} dla podanego id rule_state: 0(wyłączona), 1(włączona)
     * @param {number} id
     * @returns {string}
     */
    getRule(id: number): string {
        return this.raw.execute(MethodType.GetRule, id);
    }
    /**
     * Zmienia stan reguły na aktywny. Zwraca 0 - ok, 1 - błąd
     * @param {number} id
     * @returns {number}
     */
    enableRule(id: number): number {
        return this.raw.execute(MethodType.EnableRule, id);
    }
    /**
     * Zmienia stan reguły na nieaktywny. Zwraca 0 - ok, 1 - błąd
     * @param {number} id
     * @returns {number}
     */
    disableRule(id: number): number {
        return this.raw.execute(MethodType.DisableRule, id);
    }
    /**
     * Lista wszystkich reguł w formacie {{id, rule_state, "crone"},{id, rule_state, "crone"},...} rule_state: 0(wyłączona), 1(włączona)
     * @returns {string}
     */
    getRules(): string {
        return this.raw.execute(MethodType.GetRules);
    }
    /**
     * Reguła z listy dla następnego zdarzenia {id, rule_state, "crone"} rule_state: 0(wyłączona), 1(włączona)
     * @returns {string}
     */
    getNextRule(): string {
        return this.raw.execute(MethodType.GetNextRule);
    }
    /**
     * Lista wszystkich reguł w formacie {{id, rule_state, "crone"},{id, rule_state, "crone"},...} rule_state: 0(wyłączona), 1(włączona)
     * @returns {string}
     */
    get ruleList(): string {
        return this.raw.get(PropertyType.RuleList);
    }
    /**
     * Reguła z listy, która odpowiada za aktualne zdarzenie {id, rule_state, "crone"} Zwraca uruchomioną regułę przez 1 minutę, następnie "N\A" rule_state: 0(wyłączona), 1(włączona)
     * @returns {string}
     */
    get currentRule(): string {
        return this.raw.get(PropertyType.CurrentRule);
    }
    /**
     * Reguła z listy dla następnego zdarzenia {id, rule_state, "crone"} rule_state: 0(wyłączona), 1(włączona)
     * @returns {string}
     */
    get nextRule(): string {
        return this.raw.get(PropertyType.NextRule);
    }
    /**
     * Liczba dodanych reguł
     * @returns {number}
     */
    get ruleCount(): number {
        return this.raw.get(PropertyType.RuleCount);
    }
    /**
     * Liczba reguł które mogą być dodane do istniejącej listy (wolne miejsce)
     * @returns {number}
     */
    get ruleAvailableCount(): number {
        return this.raw.get(PropertyType.RuleAvailableCount);
    }
    /**
     * Aktualny stan Event Schedulera
     * @returns {StateType}
     */
    get state(): StateType {
        return this.raw.get(PropertyType.State);
    }
    set state(value: StateType) {
        this.raw.set(PropertyType.State, value);
    }
}

class EventSchedulerRemote implements IEventScheduler {
    constructor(private objectName: string, private gate: RemoteGate) {

    }

    /**
     * Zdarzenie wywoływane przy uruchomieniu Event Schedulera
     * @param callback
     */
    addOnStart(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane przy dezaktywacji Event Scheduler
     * @param callback
     */
    addOnStop(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie docelowe wywołane na podstawie ustawionych reguł i aktualnym czasie urządzenia
     * @param callback
     */
    addOnEvent(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywołane podczas dodania reguły do listy
     * @param callback
     */
    addOnRuleAdd(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywołane podczas usunięcia reguły z listy
     * @param callback
     */
    addOnRuleDelete(_callback: () => void): void {
        // Remote events are not supported
    }

    /** Uruchamia Event Scheduler */
    start(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.Start)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Zatrzymuje Event Scheduler */
    stop(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.Stop)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Dodaje regułę do listy. Podaj regułę crone "minute hour * * day_of_week". Zwraca numer id przydzielonej reguły. 0 - błąd
     * @param {string} record
     * @returns {string}
     */
    addRule(record: string): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.AddRule)
            .addParameter(record)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Usuwa regułę o podanym id z listy. Zwraca 0 - ok, 1 - błąd
     * @param {number} id
     * @returns {number}
     */
    deleteRule(id: number): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.DeleteRule)
            .addParameter(id)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Zwraca regułę w formacie {id, rule_state, "crone"} dla podanego id rule_state: 0(wyłączona), 1(włączona)
     * @param {number} id
     * @returns {string}
     */
    getRule(id: number): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.GetRule)
            .addParameter(id)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Zmienia stan reguły na aktywny. Zwraca 0 - ok, 1 - błąd
     * @param {number} id
     * @returns {number}
     */
    enableRule(id: number): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.EnableRule)
            .addParameter(id)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Zmienia stan reguły na nieaktywny. Zwraca 0 - ok, 1 - błąd
     * @param {number} id
     * @returns {number}
     */
    disableRule(id: number): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.DisableRule)
            .addParameter(id)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Lista wszystkich reguł w formacie {{id, rule_state, "crone"},{id, rule_state, "crone"},...} rule_state: 0(wyłączona), 1(włączona)
     * @returns {string}
     */
    getRules(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.GetRules)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Reguła z listy dla następnego zdarzenia {id, rule_state, "crone"} rule_state: 0(wyłączona), 1(włączona)
     * @returns {string}
     */
    getNextRule(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.GetNextRule)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Lista wszystkich reguł w formacie {{id, rule_state, "crone"},{id, rule_state, "crone"},...} rule_state: 0(wyłączona), 1(włączona)
     * @returns {string}
     */
    get ruleList(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.RuleList)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Reguła z listy, która odpowiada za aktualne zdarzenie {id, rule_state, "crone"} Zwraca uruchomioną regułę przez 1 minutę, następnie "N\A" rule_state: 0(wyłączona), 1(włączona)
     * @returns {string}
     */
    get currentRule(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.CurrentRule)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Reguła z listy dla następnego zdarzenia {id, rule_state, "crone"} rule_state: 0(wyłączona), 1(włączona)
     * @returns {string}
     */
    get nextRule(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.NextRule)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Liczba dodanych reguł
     * @returns {number}
     */
    get ruleCount(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.RuleCount)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Liczba reguł które mogą być dodane do istniejącej listy (wolne miejsce)
     * @returns {number}
     */
    get ruleAvailableCount(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.RuleAvailableCount)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Aktualny stan Event Schedulera
     * @returns {StateType}
     */
    get state(): StateType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.State)
            .build();
        return this.gate.runScript(cmd!);
    }

    set state(value: StateType) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.State)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
}

export {
    EventScheduler, EventSchedulerRaw, EventSchedulerRemote, StateType
}
