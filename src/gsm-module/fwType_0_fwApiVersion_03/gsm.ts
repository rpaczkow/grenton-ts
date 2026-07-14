// Created from: src/interfaces/module_gsm_fv03_0.xml, object name="GSM"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnReceive = 0,
    OnSend = 1,
    OnStatus = 2,
    OnCall = 3,
    OnScript = 4
}

enum PropertyType {
    Inbox = 0,
    Outbox = 1,
    AccessList = 2,
    ScriptList = 3,
    Password = 4,
    PassMandatory = 5,
    ConfirmMessage = 6,
    RefuseMessage = 7,
    SignalLevel = 8,
    AskConfirm = 9,
    AskRefuse = 10,
    PIN = 11
}

enum MethodType {
    ClearInbox = 0,
    ClearOutbox = 1,
    AddToOutbox = 2,
    SendOutboxTo = 3,
    Ask = 4,
    Call = 5,
    Drop = 6
}

declare class GsmRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface IGsm {
    /** Zdarzenie wywoływane natychmiast po otrzymaniu SMS-a. użytkownik może odczytać cechę Inbox by sprawdzić treść SMS-a */
    addOnReceive: (callback: () => void) => void
    /** Zdarzenie wywoływane natychmiast po wysłaniu SMS-a */
    addOnSend: (callback: () => void) => void
    /** Zdarzenie wywoływane po otrzymaniu SMS-a z komenda status */
    addOnStatus: (callback: () => void) => void
    /** Zdarzenie wywoływane w momencie odebrania połączenia głosowego (Odbierane są tylko połączenia z numerów znajdujących się na AccessList, pozostałe są odrzucane) */
    addOnCall: (callback: () => void) => void
    /** Zdarzenie wywoływane w momencie przyjścia SMS-a z poprawna komenda, hasłem i z numeru znajdującego się na AccessList */
    addOnScript: (callback: () => void) => void
    /** Skrzynka odbiorcza zawierająca ostatnio otrzymany SMS. Nie dotyczy SMS-ów Y/N wysyłanych w odpowiedzi na pytanie z metody Ask */
    readonly inbox: string
    /** Skrzynka nadawcza zawierająca bufor wyjściowy */
    readonly outbox: string
    /** Lista numerów z których mogą być wysyłane rozkazy np. 555555555;666666666; Na końcu musi być średnik! */
    accessList: string
    /** Lista skryptów, które mogą być wywoływane przez SMS-y, np. skrypt1;skrypt2;skrypt3; */
    scriptList: string
    /** Hasło jakie musi być przesłane w SMS'ie wysyłanym na adres bramki (jeśli PassMandatory jest ustawiona na 1) */
    password: string
    /** Jeśli jest ustawiona na: 0 - hasło nie jest wymagane, 1 - hasło jest wymagane */
    passMandatory: boolean
    /** Tekstowy komunikat potwierdzający. Jeśli zostanie zdefiniowany, to będzie on wysyłany po każdym prawidłowym uruchomieniu skryptu, którego nazwa została wysłana SMS'em */
    confirmMessage: string
    /** Tekstowy komunikat odmowy. Jeśli zostanie zdefiniowany, to będzie on wysyłany po każdym błędnym rozkazie, np. Nie ma takiej komendy */
    refuseMessage: string
    /** Poziom sygnału sieci komórkowej */
    readonly signalLevel: number
    /** Tekst określający postać odpowiedzi twierdzącej, np. tak */
    askConfirm: string
    /** Tekst określający postać odpowiedzi odmownej, np. nie */
    askRefuse: string
    /** Kod PIN karty SIM */
    pin: string
    /** Czyści bufor wejściowy (skrzynkę odbiorczą). Bufor wejściowy jest automatycznie nadpisywany w momencie otrzymania nowego SMS-a, nie dotyczy SMS'ów z odpowiedzią typu Y/N */
    clearInbox: () => void
    /** Czyści bufor wyjściowy (skrzynkę nadawczą) */
    clearOutbox: () => void
    /** Dodaje tekst do bufora wyjściowego (skrzynki nadawczej) */
    addToOutbox: (text: string) => void
    /** Wysyła zawartość skrzynki nadawczej na podany numer */
    sendOutboxTo: (text: string) => void
    /** Metoda wysyłająca zapytanie na nr telefonu. Zwraca:\n1 - gdy odpowiedź odesłana SMS-em była twierdząca,\n0 - jeśli odpowiedź była przeczaca lub użytkownik nie odpowiedział w wymaganym czasie TimeOut */
    ask: (telphone: string, question: string, timeout: string) => boolean
    /** Łączy z podanym numerem. Zwraca 1 - gdy nawiąże połączenie, 0 - gdy nie ma połączenia */
    call: (telphone: string) => boolean
    /** Rozłącza połączenie głosowe */
    drop: () => void
}

class Gsm implements IGsm {
    private onReceiveCallbacks: Array<() => void> = [];
    private onSendCallbacks: Array<() => void> = [];
    private onStatusCallbacks: Array<() => void> = [];
    private onCallCallbacks: Array<() => void> = [];
    private onScriptCallbacks: Array<() => void> = [];

    constructor(private raw: GsmRaw) {
        this.raw.add_event(EventType.OnReceive, () => {
            this.onReceiveCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnSend, () => {
            this.onSendCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnStatus, () => {
            this.onStatusCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnCall, () => {
            this.onCallCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnScript, () => {
            this.onScriptCallbacks.forEach(callback => { callback(); });
        });
    }

    addOnReceive(callback: () => void): void { this.onReceiveCallbacks.push(callback); }
    addOnSend(callback: () => void): void { this.onSendCallbacks.push(callback); }
    addOnStatus(callback: () => void): void { this.onStatusCallbacks.push(callback); }
    addOnCall(callback: () => void): void { this.onCallCallbacks.push(callback); }
    addOnScript(callback: () => void): void { this.onScriptCallbacks.push(callback); }

    get inbox(): string { return this.raw.get(PropertyType.Inbox); }
    get outbox(): string { return this.raw.get(PropertyType.Outbox); }
    get accessList(): string { return this.raw.get(PropertyType.AccessList); }
    set accessList(val: string) { this.raw.set(PropertyType.AccessList, val); }
    get scriptList(): string { return this.raw.get(PropertyType.ScriptList); }
    set scriptList(val: string) { this.raw.set(PropertyType.ScriptList, val); }
    get password(): string { return this.raw.get(PropertyType.Password); }
    set password(val: string) { this.raw.set(PropertyType.Password, val); }
    get passMandatory(): boolean { return this.raw.get(PropertyType.PassMandatory) === 1; }
    set passMandatory(val: boolean) { this.raw.set(PropertyType.PassMandatory, val ? 1 : 0); }
    get confirmMessage(): string { return this.raw.get(PropertyType.ConfirmMessage); }
    set confirmMessage(val: string) { this.raw.set(PropertyType.ConfirmMessage, val); }
    get refuseMessage(): string { return this.raw.get(PropertyType.RefuseMessage); }
    set refuseMessage(val: string) { this.raw.set(PropertyType.RefuseMessage, val); }
    get signalLevel(): number { return this.raw.get(PropertyType.SignalLevel); }
    get askConfirm(): string { return this.raw.get(PropertyType.AskConfirm); }
    set askConfirm(val: string) { this.raw.set(PropertyType.AskConfirm, val); }
    get askRefuse(): string { return this.raw.get(PropertyType.AskRefuse); }
    set askRefuse(val: string) { this.raw.set(PropertyType.AskRefuse, val); }
    get pin(): string { return this.raw.get(PropertyType.PIN); }
    set pin(val: string) { this.raw.set(PropertyType.PIN, val); }

    clearInbox(): void { this.raw.execute(MethodType.ClearInbox); }
    clearOutbox(): void { this.raw.execute(MethodType.ClearOutbox); }
    addToOutbox(text: string): void { this.raw.execute(MethodType.AddToOutbox, text); }
    sendOutboxTo(text: string): void { this.raw.execute(MethodType.SendOutboxTo, text); }
    ask(telphone: string, question: string, timeout: string): boolean { return this.raw.execute(MethodType.Ask, telphone, question, timeout) === 1; }
    call(telphone: string): boolean { return this.raw.execute(MethodType.Call, telphone) === 1; }
    drop(): void { this.raw.execute(MethodType.Drop); }
}

class GsmRemote implements IGsm {
    constructor(private objectName: string, private gate: RemoteGate) {}

    addOnReceive(_callback: () => void): void { /* Remote events are not supported */ }
    addOnSend(_callback: () => void): void { /* Remote events are not supported */ }
    addOnStatus(_callback: () => void): void { /* Remote events are not supported */ }
    addOnCall(_callback: () => void): void { /* Remote events are not supported */ }
    addOnScript(_callback: () => void): void { /* Remote events are not supported */ }

    get inbox(): string {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Inbox).build();
        return this.gate.runScript(cmd!);
    }
    get outbox(): string {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Outbox).build();
        return this.gate.runScript(cmd!);
    }
    get accessList(): string {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.AccessList).build();
        return this.gate.runScript(cmd!);
    }
    set accessList(val: string) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.AccessList).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
    get scriptList(): string {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.ScriptList).build();
        return this.gate.runScript(cmd!);
    }
    set scriptList(val: string) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.ScriptList).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
    get password(): string {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.Password).build();
        return this.gate.runScript(cmd!);
    }
    set password(val: string) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.Password).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
    get passMandatory(): boolean {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.PassMandatory).build();
        return this.gate.runScript(cmd!) === 1;
    }
    set passMandatory(val: boolean) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.PassMandatory).addParameter(val ? 1 : 0).build();
        this.gate.runScript(cmd!);
    }
    get confirmMessage(): string {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.ConfirmMessage).build();
        return this.gate.runScript(cmd!);
    }
    set confirmMessage(val: string) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.ConfirmMessage).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
    get refuseMessage(): string {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.RefuseMessage).build();
        return this.gate.runScript(cmd!);
    }
    set refuseMessage(val: string) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.RefuseMessage).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
    get signalLevel(): number {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.SignalLevel).build();
        return this.gate.runScript(cmd!);
    }
    get askConfirm(): string {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.AskConfirm).build();
        return this.gate.runScript(cmd!);
    }
    set askConfirm(val: string) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.AskConfirm).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
    get askRefuse(): string {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.AskRefuse).build();
        return this.gate.runScript(cmd!);
    }
    set askRefuse(val: string) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.AskRefuse).addParameter(val).build();
        this.gate.runScript(cmd!);
    }
    get pin(): string {
        const cmd = rawExecutionBuilderFactory(this.objectName).get().addParameter(PropertyType.PIN).build();
        return this.gate.runScript(cmd!);
    }
    set pin(val: string) {
        const cmd = rawExecutionBuilderFactory(this.objectName).set().addParameter(PropertyType.PIN).addParameter(val).build();
        this.gate.runScript(cmd!);
    }

    clearInbox(): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.ClearInbox).build();
        this.gate.runScript(cmd!);
    }
    clearOutbox(): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.ClearOutbox).build();
        this.gate.runScript(cmd!);
    }
    addToOutbox(text: string): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.AddToOutbox).addParameter(text).build();
        this.gate.runScript(cmd!);
    }
    sendOutboxTo(text: string): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.SendOutboxTo).addParameter(text).build();
        this.gate.runScript(cmd!);
    }
    ask(telphone: string, question: string, timeout: string): boolean {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.Ask).addParameter(telphone).addParameter(question).addParameter(timeout).build();
        return this.gate.runScript(cmd!) === 1;
    }
    call(telphone: string): boolean {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.Call).addParameter(telphone).build();
        return this.gate.runScript(cmd!) === 1;
    }
    drop(): void {
        const cmd = rawExecutionBuilderFactory(this.objectName).execute().addParameter(MethodType.Drop).build();
        this.gate.runScript(cmd!);
    }
}

export { Gsm, GsmRaw, GsmRemote }
