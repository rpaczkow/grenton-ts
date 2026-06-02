// Created from: packages/grenton-api/interfaces/object_http_request_v1.xml, object name="HttpRequest" version="1"

import { rawExecutionBuilderFactory } from "../../../core/execution-builder"
import { RemoteGate } from "../../../core/remote-gate"

enum EventType {
    OnRequestSent = 0,
    OnResponse = 1
}

enum PropertyType {
    Host = 0,
    Path = 1,
    QueryStringParams = 2,
    Method = 3,
    Timeout = 4,
    RequestType = 5,
    ResponseType = 6,
    RequestHeaders = 7,
    RequestBody = 8,
    ResponseBody = 10,
    StatusCode = 11
}

enum MethodType {
    SendRequest = 0,
    AbortRequest = 1,
    Clear = 2
}

enum RequestType {
    None = 0,
    Text = 1,
    JSON = 2,
    XML = 3,
    FormData = 4,
    Other = 5
}

enum ResponseType {
    None = 0,
    Text = 1,
    JSON = 2,
    XML = 3,
    FormData = 4,
    Other = 5
}

declare class HttpRequestRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface IHttpRequest {
    /**
     * Zdarzenie wywoływane w momencie wysłania zapytania
     * @param callback
     */
    addOnRequestSent: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane w momencie otrzymania odpowiedzi
     * @param callback
     */
    addOnResponse: (callback: () => void) => void
    /** Wysyła zapytanie */
    sendRequest: () => void
    /** Przerywa obsługę zapytania */
    abortRequest: () => void
    /** Usuwa treść zapytania */
    clear: () => void
    /** Adres hosta */
    host: string
    /** Ustawia adres hosta */
    setHost: (value: string) => void
    /** Ścieżka zapytania */
    path: string
    /** Ustawia ścieżkę zapytania */
    setPath: (value: string) => void
    /** Parametry zapytania */
    queryStringParams: string
    /** Ustawia parametry zapytania */
    setQueryStringParams: (value: string) => void
    /** Typ metody wysyłanej w zapytaniu np. GET, POST */
    method: string
    /** Ustawia metodę zapytania */
    setMethod: (value: string) => void
    /** Dopuszczalny czas odpowiedzi */
    timeout: number
    /** Ustawia dopuszczalny czas odpowiedzi */
    setTimeout: (value: number) => void
    /** Typ zawartości wysyłanego zapytania. Definiuje parametr content-type w nagłówku zapytania. W zależności od wybranego typu zawartość cechy RequestBody jest odpowiednio serializowana: 0 - None - niezdefiniowany. W nagłówku nie jest wysyłane content-type. Zawartość cechy RequestBody nie jest serializowana. 1 - Text - content-type: text/plain. Zawartość cechy RequestBody nie jest serializowana. 2 - JSON - content-type: application/json. Zawartość cechy RequestBody jest serializowana do formatu JSON. 3 - XML - content-type: text/xml. Zawartość cechy RequestBody jest serializowana do formatu XML. 4 - FormData - content-type: application/x-www-form-urlencoded. Zawartość cechy RequestBody jest serializowana do tabeli. 5 - Other - typ zawartości (content-type) jest inny niż wbudowany. Typ można zdefiniować umieszczając go w nagłówku (cecha RequestHeaders). Zawartość nie jest serializowana. */
    requestType: RequestType
    /** Ustawia typ zawartości wysyłanego zapytania (content-type) */
    setRequestType: (value: RequestType) => void
    /** Typ oczekiwanej odpowiedzi. Definiuje parametr Accept w nagłówku zapytania. W zależności od wybranego typu zawartość otrzymanej odpowiedzi (cechy ResponseBody) jest odpowiednio parsowana do tabeli: 0 - None - parametr Accept nie jest wysyłany w nagłówku wysyłanego zapytania. Odpowiedź (cecha ResponseBody) nie jest parsowana. 1 - Text - Accept: text/plain. Odpowiedź (cecha ResponseBody) nie jest parsowana. 2 - JSON - Accept: application/json. Odpowiedź (cecha ResponseBody) jest parsowana z JSON. 3 - XML - Accept: text/xml. Odpowiedź (cecha ResponseBody) jest parsowana z XML. 4 - FormData - Accept: application/x-www-form-urlencoded. Odpowiedź (cecha ResponseBody) jest parsowana. 5 - Other - parametr Accept nagłówka jest inny niż wbudowany. Parametr można zdefiniować umieszczając go w nagłówku (cecha RequestHeaders) */
    responseType: ResponseType
    /** Ustawia typ oczekiwanej odpowiedzi na zapytanie */
    setResponseType: (value: ResponseType) => void
    /** Dodatkowe nagłówki zapytania HTTP */
    requestHeaders: string
    /** Ustawia dodatkowe nagłówki HTTP w zapytaniu */
    setRequestHeaders: (value: string) => void
    /** Zawartość wiadomości wysyłanej w zapytaniu */
    requestBody: string
    /** Ustawia zawartość wiadomości w zapytaniu */
    setRequestBody: (value: string) => void
    /** Zawartość wiadomości otrzymanej po wysłaniu zapytania */
    responseBody: string
    /** Ustawia zawartość wiadomości w odpowiedzi */
    setResponseBody: (value: string) => void
    /** Status odpowiedzi HTTP */
    readonly statusCode: number
}

class HttpRequest implements IHttpRequest {
    private onRequestSentCallbacks: Array<() => void> = [];
    private onResponseCallbacks: Array<() => void> = [];

    constructor(private raw: HttpRequestRaw) {
        this.raw.add_event(EventType.OnRequestSent, () => {
            this.onRequestSentCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnResponse, () => {
            this.onResponseCallbacks.forEach(callback => { callback(); });
        });
    }

    /**
     * Zdarzenie wywoływane w momencie wysłania zapytania
     * @param callback
     */
    addOnRequestSent(callback: () => void): void {
        this.onRequestSentCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane w momencie otrzymania odpowiedzi
     * @param callback
     */
    addOnResponse(callback: () => void): void {
        this.onResponseCallbacks.push(callback);
    }
    /** Wysyła zapytanie */
    sendRequest(): void {
        this.raw.execute(MethodType.SendRequest);
    }
    /** Przerywa obsługę zapytania */
    abortRequest(): void {
        this.raw.execute(MethodType.AbortRequest);
    }
    /** Usuwa treść zapytania */
    clear(): void {
        this.raw.execute(MethodType.Clear);
    }
    /**
     * Adres hosta
     * @returns {string}
     */
    get host(): string {
        return this.raw.get(PropertyType.Host);
    }
    set host(value: string) {
        this.raw.set(PropertyType.Host, value);
    }
    /** Ustawia adres hosta */
    setHost(value: string): void {
        this.raw.set(PropertyType.Host, value);
    }
    /**
     * Ścieżka zapytania
     * @returns {string}
     */
    get path(): string {
        return this.raw.get(PropertyType.Path);
    }
    set path(value: string) {
        this.raw.set(PropertyType.Path, value);
    }
    /** Ustawia ścieżkę zapytania */
    setPath(value: string): void {
        this.raw.set(PropertyType.Path, value);
    }
    get queryStringParams(): string {
        return this.raw.get(PropertyType.QueryStringParams);
    }
    set queryStringParams(value: string) {
        this.raw.set(PropertyType.QueryStringParams, value);
    }
    /** Ustawia parametry zapytania */
    setQueryStringParams(value: string): void {
        this.raw.set(PropertyType.QueryStringParams, value);
    }
    /**
     * Typ metody wysyłanej w zapytaniu np. GET, POST
     * @returns {string}
     */
    get method(): string {
        return this.raw.get(PropertyType.Method);
    }
    set method(value: string) {
        this.raw.set(PropertyType.Method, value);
    }
    /** Ustawia metodę zapytania */
    setMethod(value: string): void {
        this.raw.set(PropertyType.Method, value);
    }
    /**
     * Dopuszczalny czas odpowiedzi
     * @returns {number}
     */
    get timeout(): number {
        return this.raw.get(PropertyType.Timeout);
    }
    set timeout(value: number) {
        this.raw.set(PropertyType.Timeout, value);
    }
    /** Ustawia dopuszczalny czas odpowiedzi */
    setTimeout(value: number): void {
        this.raw.set(PropertyType.Timeout, value);
    }
    /**
     * Typ zawartości wysyłanego zapytania. Definiuje parametr content-type w nagłówku zapytania. W zależności od wybranego typu zawartość cechy RequestBody jest odpowiednio serializowana: 0 - None - niezdefiniowany. W nagłówku nie jest wysyłane content-type. Zawartość cechy RequestBody nie jest serializowana. 1 - Text - content-type: text/plain. Zawartość cechy RequestBody nie jest serializowana. 2 - JSON - content-type: application/json. Zawartość cechy RequestBody jest serializowana do formatu JSON. 3 - XML - content-type: text/xml. Zawartość cechy RequestBody jest serializowana do formatu XML. 4 - FormData - content-type: application/x-www-form-urlencoded. Zawartość cechy RequestBody jest serializowana do tabeli. 5 - Other - typ zawartości (content-type) jest inny niż wbudowany. Typ można zdefiniować umieszczając go w nagłówku (cecha RequestHeaders). Zawartość nie jest serializowana.
     * @returns {RequestType}
     */
    get requestType(): RequestType {
        return this.raw.get(PropertyType.RequestType);
    }
    set requestType(value: RequestType) {
        this.raw.set(PropertyType.RequestType, value);
    }
    /** Ustawia typ zawartości wysyłanego zapytania (content-type) */
    setRequestType(value: RequestType): void {
        this.raw.set(PropertyType.RequestType, value);
    }
    /**
     * Typ oczekiwanej odpowiedzi. Definiuje parametr Accept w nagłówku zapytania. W zależności od wybranego typu zawartość otrzymanej odpowiedzi (cechy ResponseBody) jest odpowiednio parsowana do tabeli: 0 - None - parametr Accept nie jest wysyłany w nagłówku wysyłanego zapytania. Odpowiedź (cecha ResponseBody) nie jest parsowana. 1 - Text - Accept: text/plain. Odpowiedź (cecha ResponseBody) nie jest parsowana. 2 - JSON - Accept: application/json. Odpowiedź (cecha ResponseBody) jest parsowana z JSON. 3 - XML - Accept: text/xml. Odpowiedź (cecha ResponseBody) jest parsowana z XML. 4 - FormData - Accept: application/x-www-form-urlencoded. Odpowiedź (cecha ResponseBody) jest parsowana. 5 - Other - parametr Accept nagłówka jest inny niż wbudowany. Parametr można zdefiniować umieszczając go w nagłówku (cecha RequestHeaders)
     * @returns {ResponseType}
     */
    get responseType(): ResponseType {
        return this.raw.get(PropertyType.ResponseType);
    }
    set responseType(value: ResponseType) {
        this.raw.set(PropertyType.ResponseType, value);
    }
    /** Ustawia typ oczekiwanej odpowiedzi na zapytanie */
    setResponseType(value: ResponseType): void {
        this.raw.set(PropertyType.ResponseType, value);
    }
    get requestHeaders(): string {
        return this.raw.get(PropertyType.RequestHeaders);
    }
    set requestHeaders(value: string) {
        this.raw.set(PropertyType.RequestHeaders, value);
    }
    /** Ustawia dodatkowe nagłówki HTTP w zapytaniu */
    setRequestHeaders(value: string): void {
        this.raw.set(PropertyType.RequestHeaders, value);
    }
    get requestBody(): string {
        return this.raw.get(PropertyType.RequestBody);
    }
    set requestBody(value: string) {
        this.raw.set(PropertyType.RequestBody, value);
    }
    /** Ustawia zawartość wiadomości w zapytaniu */
    setRequestBody(value: string): void {
        this.raw.set(PropertyType.RequestBody, value);
    }
    get responseBody(): string {
        return this.raw.get(PropertyType.ResponseBody);
    }
    set responseBody(value: string) {
        this.raw.set(PropertyType.ResponseBody, value);
    }
    /** Ustawia zawartość wiadomości w odpowiedzi */
    setResponseBody(value: string): void {
        this.raw.set(PropertyType.ResponseBody, value);
    }
    /**
     * Status odpowiedzi HTTP
     * @returns {number}
     */
    get statusCode(): number {
        return this.raw.get(PropertyType.StatusCode);
    }
}

class HttpRequestRemote implements IHttpRequest {
    constructor(private objectName: string, private gate: RemoteGate) {

    }

    /**
     * Zdarzenie wywoływane w momencie wysłania zapytania
     * @param callback
     */
    addOnRequestSent(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane w momencie otrzymania odpowiedzi
     * @param callback
     */
    addOnResponse(_callback: () => void): void {
        // Remote events are not supported
    }

    /** Wysyła zapytanie */
    sendRequest(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.SendRequest)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Przerywa obsługę zapytania */
    abortRequest(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.AbortRequest)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Usuwa treść zapytania */
    clear(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.Clear)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Adres hosta
     * @returns {string}
     */
    get host(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Host)
            .build();
        return this.gate.runScript(cmd!);
    }

    set host(value: string) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Host)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Ustawia adres hosta */
    setHost(value: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Host)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Ścieżka zapytania
     * @returns {string}
     */
    get path(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Path)
            .build();
        return this.gate.runScript(cmd!);
    }

    set path(value: string) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Path)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Ustawia ścieżkę zapytania */
    setPath(value: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Path)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    get queryStringParams(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.QueryStringParams)
            .build();
        return this.gate.runScript(cmd!);
    }

    set queryStringParams(value: string) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.QueryStringParams)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Ustawia parametry zapytania */
    setQueryStringParams(value: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.QueryStringParams)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Typ metody wysyłanej w zapytaniu np. GET, POST
     * @returns {string}
     */
    get method(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Method)
            .build();
        return this.gate.runScript(cmd!);
    }

    set method(value: string) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Method)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Ustawia metodę zapytania */
    setMethod(value: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Method)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Dopuszczalny czas odpowiedzi
     * @returns {number}
     */
    get timeout(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Timeout)
            .build();
        return this.gate.runScript(cmd!);
    }

    set timeout(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Timeout)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Ustawia dopuszczalny czas odpowiedzi */
    setTimeout(value: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Timeout)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Typ zawartości wysyłanego zapytania. Definiuje parametr content-type w nagłówku zapytania. W zależności od wybranego typu zawartość cechy RequestBody jest odpowiednio serializowana: 0 - None - niezdefiniowany. W nagłówku nie jest wysyłane content-type. Zawartość cechy RequestBody nie jest serializowana. 1 - Text - content-type: text/plain. Zawartość cechy RequestBody nie jest serializowana. 2 - JSON - content-type: application/json. Zawartość cechy RequestBody jest serializowana do formatu JSON. 3 - XML - content-type: text/xml. Zawartość cechy RequestBody jest serializowana do formatu XML. 4 - FormData - content-type: application/x-www-form-urlencoded. Zawartość cechy RequestBody jest serializowana do tabeli. 5 - Other - typ zawartości (content-type) jest inny niż wbudowany. Typ można zdefiniować umieszczając go w nagłówku (cecha RequestHeaders). Zawartość nie jest serializowana.
     * @returns {RequestType}
     */
    get requestType(): RequestType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.RequestType)
            .build();
        return this.gate.runScript(cmd!);
    }

    set requestType(value: RequestType) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.RequestType)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Ustawia typ zawartości wysyłanego zapytania (content-type) */
    setRequestType(value: RequestType): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.RequestType)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Typ oczekiwanej odpowiedzi. Definiuje parametr Accept w nagłówku zapytania. W zależności od wybranego typu zawartość otrzymanej odpowiedzi (cechy ResponseBody) jest odpowiednio parsowana do tabeli: 0 - None - parametr Accept nie jest wysyłany w nagłówku wysyłanego zapytania. Odpowiedź (cecha ResponseBody) nie jest parsowana. 1 - Text - Accept: text/plain. Odpowiedź (cecha ResponseBody) nie jest parsowana. 2 - JSON - Accept: application/json. Odpowiedź (cecha ResponseBody) jest parsowana z JSON. 3 - XML - Accept: text/xml. Odpowiedź (cecha ResponseBody) jest parsowana z XML. 4 - FormData - Accept: application/x-www-form-urlencoded. Odpowiedź (cecha ResponseBody) jest parsowana. 5 - Other - parametr Accept nagłówka jest inny niż wbudowany. Parametr można zdefiniować umieszczając go w nagłówku (cecha RequestHeaders)
     * @returns {ResponseType}
     */
    get responseType(): ResponseType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.ResponseType)
            .build();
        return this.gate.runScript(cmd!);
    }

    set responseType(value: ResponseType) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.ResponseType)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Ustawia typ oczekiwanej odpowiedzi na zapytanie */
    setResponseType(value: ResponseType): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.ResponseType)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    get requestHeaders(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.RequestHeaders)
            .build();
        return this.gate.runScript(cmd!);
    }

    set requestHeaders(value: string) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.RequestHeaders)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Ustawia dodatkowe nagłówki HTTP w zapytaniu */
    setRequestHeaders(value: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.RequestHeaders)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    get requestBody(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.RequestBody)
            .build();
        return this.gate.runScript(cmd!);
    }

    set requestBody(value: string) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.RequestBody)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Ustawia zawartość wiadomości w zapytaniu */
    setRequestBody(value: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.RequestBody)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    get responseBody(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.ResponseBody)
            .build();
        return this.gate.runScript(cmd!);
    }

    set responseBody(value: string) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.ResponseBody)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Ustawia zawartość wiadomości w odpowiedzi */
    setResponseBody(value: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.ResponseBody)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Status odpowiedzi HTTP
     * @returns {number}
     */
    get statusCode(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.StatusCode)
            .build();
        return this.gate.runScript(cmd!);
    }
}

export {
    HttpRequest, HttpRequestRaw, HttpRequestRemote, RequestType, ResponseType
}
