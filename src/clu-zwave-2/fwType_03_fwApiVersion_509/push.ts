// Created from: src/interfaces/object_push_v1.xml, object name="Push" version="1"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnSend = 0,
    OnOverflow = 1
}

enum PropertyType {
    Message = 0,
    Title = 1,
    LastSendTime = 2,
    Interval = 3
}

enum MethodType {
    ClearMessage = 1,
    ClearTitle = 3,
    Send = 4
}

declare class PushRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface IPush {
    /**
     * Zdarzenie wywoływane przy wysłaniu notyfikacji
     * @param callback
     */
    addOnSend: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane przy przepełnieniu kolejki
     * @param callback
     */
    addOnOverflow: (callback: () => void) => void
    /** Czyści bufor wyjściowy (skrzynkę nadawczą) */
    clearMessage: () => void
    /** Czyści bufor tytułu */
    clearTitle: () => void
    /** Wysyła powiadomienie */
    send: () => void
    /** Buffor wyjściowy dla notyfikacji push (skrzynka nadawcza) */
    message: string
    /** Buffor wyjściowy dla tytułu notyfikacji push (skrzynka nadawcza) */
    title: string
    /** Czas wysłania ostatniej notyfikacji push */
    readonly lastSendTime: string
    /** Interwał pomiędzy kolejnymi notyfikacjami */
    interval: number
    /** Dodaje tekst do bufora wyjściowego (skrzynki nadawczej) */
    setMessage: (text: string) => void
    /** Dodaje tekst do tytułu */
    setTitle: (text: string) => void
    /** Ustawia interwał pomiędzy kolejnymi notyfikacjami */
    setInterval: (interval: number) => void
}

class Push implements IPush {
    private onSendCallbacks: Array<() => void> = [];
    private onOverflowCallbacks: Array<() => void> = [];

    constructor(private raw: PushRaw) {
        this.raw.add_event(EventType.OnSend, () => {
            this.onSendCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnOverflow, () => {
            this.onOverflowCallbacks.forEach(callback => { callback(); });
        });
    }

    /**
     * Zdarzenie wywoływane przy wysłaniu notyfikacji
     * @param callback
     */
    addOnSend(callback: () => void): void {
        this.onSendCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane przy przepełnieniu kolejki
     * @param callback
     */
    addOnOverflow(callback: () => void): void {
        this.onOverflowCallbacks.push(callback);
    }
    /** Czyści bufor wyjściowy (skrzynkę nadawczą) */
    clearMessage(): void {
        this.raw.execute(MethodType.ClearMessage);
    }
    /** Czyści bufor tytułu */
    clearTitle(): void {
        this.raw.execute(MethodType.ClearTitle);
    }
    /** Wysyła powiadomienie */
    send(): void {
        this.raw.execute(MethodType.Send);
    }
    /**
     * Buffor wyjściowy dla notyfikacji push (skrzynka nadawcza)
     * @returns {string}
     */
    get message(): string {
        return this.raw.get(PropertyType.Message);
    }
    set message(value: string) {
        this.raw.set(PropertyType.Message, value);
    }
    /**
     * Buffor wyjściowy dla tytułu notyfikacji push (skrzynka nadawcza)
     * @returns {string}
     */
    get title(): string {
        return this.raw.get(PropertyType.Title);
    }
    set title(value: string) {
        this.raw.set(PropertyType.Title, value);
    }
    /**
     * Czas wysłania ostatniej notyfikacji push
     * @returns {string}
     */
    get lastSendTime(): string {
        return this.raw.get(PropertyType.LastSendTime);
    }
    /**
     * Interwał pomiędzy kolejnymi notyfikacjami
     * @returns {number}
     */
    get interval(): number {
        return this.raw.get(PropertyType.Interval);
    }
    set interval(value: number) {
        this.raw.set(PropertyType.Interval, value);
    }
    /** Dodaje tekst do bufora wyjściowego (skrzynki nadawczej) */
    setMessage(text: string): void {
        this.raw.set(PropertyType.Message, text);
    }
    /** Dodaje tekst do tytułu */
    setTitle(text: string): void {
        this.raw.set(PropertyType.Title, text);
    }
    /** Ustawia interwał pomiędzy kolejnymi notyfikacjami */
    setInterval(interval: number): void {
        this.raw.set(PropertyType.Interval, interval);
    }
}

class PushRemote implements IPush {
    constructor(private objectName: string, private gate: RemoteGate) {

    }

    /**
     * Zdarzenie wywoływane przy wysłaniu notyfikacji
     * @param callback
     */
    addOnSend(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane przy przepełnieniu kolejki
     * @param callback
     */
    addOnOverflow(_callback: () => void): void {
        // Remote events are not supported
    }

    /** Czyści bufor wyjściowy (skrzynkę nadawczą) */
    clearMessage(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.ClearMessage)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Czyści bufor tytułu */
    clearTitle(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.ClearTitle)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Wysyła powiadomienie */
    send(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.Send)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Buffor wyjściowy dla notyfikacji push (skrzynka nadawcza)
     * @returns {string}
     */
    get message(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Message)
            .build();
        return this.gate.runScript(cmd!);
    }

    set message(value: string) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Message)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Buffor wyjściowy dla tytułu notyfikacji push (skrzynka nadawcza)
     * @returns {string}
     */
    get title(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Title)
            .build();
        return this.gate.runScript(cmd!);
    }

    set title(value: string) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Title)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Czas wysłania ostatniej notyfikacji push
     * @returns {string}
     */
    get lastSendTime(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.LastSendTime)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Interwał pomiędzy kolejnymi notyfikacjami
     * @returns {number}
     */
    get interval(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Interval)
            .build();
        return this.gate.runScript(cmd!);
    }

    set interval(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Interval)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Dodaje tekst do bufora wyjściowego (skrzynki nadawczej) */
    setMessage(text: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Message)
            .addParameter(text)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Dodaje tekst do tytułu */
    setTitle(text: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Title)
            .addParameter(text)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Ustawia interwał pomiędzy kolejnymi notyfikacjami */
    setInterval(interval: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Interval)
            .addParameter(interval)
            .build();
        this.gate.runScript(cmd!);
    }
}

export {
    Push, PushRaw, PushRemote
}
