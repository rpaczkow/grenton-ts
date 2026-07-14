// Created from: src/interfaces/object_http_request_v2.xml, object name="HttpRequest" version="2"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnRequestSent = 0,
    OnResponse = 1,
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
    ResponseHeaders = 9,
    ResponseBody = 10,
    StatusCode = 11,
    IsActive = 12,
}

enum MethodType {
    SendRequest = 0,
    AbortRequest = 1,
    Clear = 2,
}

enum RequestTypeType {
    None = 0,
    Text = 1,
    Json = 2,
    Xml = 3,
    Formdata = 4,
    Other = 5,
}

enum ResponseTypeType {
    None = 0,
    Text = 1,
    Json = 2,
    Xml = 3,
    Formdata = 4,
    Other = 5,
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
    /**
     * Ustawia adres hosta
     * @param {string} host
     */
    setHost: (host: string) => void
    /**
     * Ustawia ścieżkę zapytania
     * @param {string} path
     */
    setPath: (path: string) => void
    /**
     * Ustawia parametry zapytania
     * @param {string} path
     */
    setQueryStringParams: (path: string) => void
    /**
     * Ustawia metodę zapytania
     * @param {string} method
     */
    setMethod: (method: string) => void
    /**
     * Ustawia dopuszczalny czas odpowiedzi
     * @param {number} time
     */
    setTimeout: (time: number) => void
    /**
     * Ustawia typ zawartości wysyłanego zapytania (content-type)
     * @param {RequestTypeType} requestType
     */
    setRequestType: (requestType: RequestTypeType) => void
    /**
     * Ustawia typ oczekiwanej odpowiedzi na zapytanie
     * @param {ResponseTypeType} responseType
     */
    setResponseType: (responseType: ResponseTypeType) => void
    /**
     * Ustawia dodatkowe nagłówki HTTP w zapytaniu
     * @param {string} headers
     */
    setRequestHeaders: (headers: string) => void
    /**
     * Ustawia zawartość wiadomości w zapytaniu
     * @param {string} body
     */
    setRequestBody: (body: string) => void
    /**
     * 
     * @param {string} headers
     */
    setResponseHeaders: (headers: string) => void
    /**
     * Ustawia zawartość wiadomości w odpowiedzi
     * @param {string} response
     */
    setResponse: (response: string) => void
    /** Adres hosta */
    host: string
    /** Ścieżka zapytania */
    path: string
    /** Parametry zapytania. \z oznacza brak */
    queryStringParams: string
    /** Typ metody wysyłanej w zapytaniu np. GET, POST */
    method: string
    /** Dopuszczalny czas odpowiedzi */
    timeout: number
    /** Typ zawartości wysyłanego zapytania. Definiuje parametr content-type w nagłówku zapytania. W zależności od wybranego typu zawartość cechy RequestBody jest odpowiednio serializowana:0 - None - niezdefiniowany. W nagłówku nie jest wysyłane content-type. Zawartość cechy RequestBody nie jest serializowana.1 - Text - content-type: text/plain. Zawartość cechy RequestBody nie jest serializowana.2 - JSON - content-type: application/json. Zawartość cechy RequestBody jest serializowana do formatu JSON.3 - XML - content-type: text/xml. Zawartość cechy RequestBody jest serializowana do formatu XML.4 - FormData - content-type: application/x-www-form-urlencoded. Zawartość cechy RequestBody jest serializowana do tabeli.5 - Other - typ zawartości (content-type) jest inny niż wbudowany. Typ można zdefiniować umieszczając go w nagłówku (cecha RequestHeaders). Zawartość nie jest serializowana */
    requestType: RequestTypeType
    /** Typ oczekiwanej odpowiedzi. Definiuje parametr Accept w nagłówku zapytania. W zależności od wybranego typu zawartość otrzymanej odpowiedzi (cechy ResponseBody) jest odpowiednio parsowana do tabeli:0 - None - parametr Accept nie jest wysyłany w nagłówku wysyłanego zapytania. Odpowiedź (cecha ResponseBody) nie jest parsowana.1 - Text - Accept: text/plain. Odpowiedź (cecha ResponseBody) nie jest parsowana.2 - JSON - Accept: application/json. Odpowiedź (cecha ResponseBody) jest parsowana z JSON.3 - XML - Accept: text/xml. Odpowiedź (cecha ResponseBody) jest parsowana z XML.4 - FormData - Accept: application/x-www-form-urlencoded. Odpowiedź (cecha ResponseBody) jest parsowana.5 - Other - parametr Accept nagłówka jest inny niż wbudowany. Parametr można zdefiniować umieszczając go w nagłówku (cecha RequestHeaders) */
    responseType: ResponseTypeType
    /** Dodatkowe nagłówki zapytania HTTP. \z oznacza brak zawartości */
    requestHeaders: string
    /** Zawartość wiadomości wysyłanej w zapytaniu. \z oznacza brak zawartości */
    requestBody: string
    /** Nagłówki odpowiedzi HTTP */
    responseHeaders: string
    /** Zawartość wiadomości otrzymanej po wysłaniu zapytania (cecha wykorzystywana do odczytu w skryptach - nieustawialna) */
    responseBody: string
    /** Status odpowiedzi HTTP */
    readonly statusCode: number
    /** Stan aktywności zapytania HTTP */
    readonly isActive: number
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
     * Ustawia adres hosta
     * @param {string} host
     */
    setHost(host: string): void {
        this.raw.set(PropertyType.Host, host);
    }
    /**
     * Ustawia ścieżkę zapytania
     * @param {string} path
     */
    setPath(path: string): void {
        this.raw.set(PropertyType.Path, path);
    }
    /**
     * Ustawia parametry zapytania
     * @param {string} path
     */
    setQueryStringParams(path: string): void {
        this.raw.set(PropertyType.QueryStringParams, path);
    }
    /**
     * Ustawia metodę zapytania
     * @param {string} method
     */
    setMethod(method: string): void {
        this.raw.set(PropertyType.Method, method);
    }
    /**
     * Ustawia dopuszczalny czas odpowiedzi
     * @param {number} time
     */
    setTimeout(time: number): void {
        this.raw.set(PropertyType.Timeout, time);
    }
    /**
     * Ustawia typ zawartości wysyłanego zapytania (content-type)
     * @param {RequestTypeType} requestType
     */
    setRequestType(requestType: RequestTypeType): void {
        this.raw.set(PropertyType.RequestType, requestType);
    }
    /**
     * Ustawia typ oczekiwanej odpowiedzi na zapytanie
     * @param {ResponseTypeType} responseType
     */
    setResponseType(responseType: ResponseTypeType): void {
        this.raw.set(PropertyType.ResponseType, responseType);
    }
    /**
     * Ustawia dodatkowe nagłówki HTTP w zapytaniu
     * @param {string} headers
     */
    setRequestHeaders(headers: string): void {
        this.raw.set(PropertyType.RequestHeaders, headers);
    }
    /**
     * Ustawia zawartość wiadomości w zapytaniu
     * @param {string} body
     */
    setRequestBody(body: string): void {
        this.raw.set(PropertyType.RequestBody, body);
    }
    /**
     * 
     * @param {string} headers
     */
    setResponseHeaders(headers: string): void {
        this.raw.set(PropertyType.ResponseHeaders, headers);
    }
    /**
     * Ustawia zawartość wiadomości w odpowiedzi
     * @param {string} response
     */
    setResponse(response: string): void {
        this.raw.set(PropertyType.ResponseBody, response);
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
    /**
     * Parametry zapytania. \z oznacza brak
     * @returns {string}
     */
    get queryStringParams(): string {
        return this.raw.get(PropertyType.QueryStringParams);
    }
    set queryStringParams(value: string) {
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
    /**
     * Typ zawartości wysyłanego zapytania. Definiuje parametr content-type w nagłówku zapytania. W zależności od wybranego typu zawartość cechy RequestBody jest odpowiednio serializowana:0 - None - niezdefiniowany. W nagłówku nie jest wysyłane content-type. Zawartość cechy RequestBody nie jest serializowana.1 - Text - content-type: text/plain. Zawartość cechy RequestBody nie jest serializowana.2 - JSON - content-type: application/json. Zawartość cechy RequestBody jest serializowana do formatu JSON.3 - XML - content-type: text/xml. Zawartość cechy RequestBody jest serializowana do formatu XML.4 - FormData - content-type: application/x-www-form-urlencoded. Zawartość cechy RequestBody jest serializowana do tabeli.5 - Other - typ zawartości (content-type) jest inny niż wbudowany. Typ można zdefiniować umieszczając go w nagłówku (cecha RequestHeaders). Zawartość nie jest serializowana
     * @returns {RequestTypeType}
     */
    get requestType(): RequestTypeType {
        return this.raw.get(PropertyType.RequestType);
    }
    set requestType(value: RequestTypeType) {
        this.raw.set(PropertyType.RequestType, value);
    }
    /**
     * Typ oczekiwanej odpowiedzi. Definiuje parametr Accept w nagłówku zapytania. W zależności od wybranego typu zawartość otrzymanej odpowiedzi (cechy ResponseBody) jest odpowiednio parsowana do tabeli:0 - None - parametr Accept nie jest wysyłany w nagłówku wysyłanego zapytania. Odpowiedź (cecha ResponseBody) nie jest parsowana.1 - Text - Accept: text/plain. Odpowiedź (cecha ResponseBody) nie jest parsowana.2 - JSON - Accept: application/json. Odpowiedź (cecha ResponseBody) jest parsowana z JSON.3 - XML - Accept: text/xml. Odpowiedź (cecha ResponseBody) jest parsowana z XML.4 - FormData - Accept: application/x-www-form-urlencoded. Odpowiedź (cecha ResponseBody) jest parsowana.5 - Other - parametr Accept nagłówka jest inny niż wbudowany. Parametr można zdefiniować umieszczając go w nagłówku (cecha RequestHeaders)
     * @returns {ResponseTypeType}
     */
    get responseType(): ResponseTypeType {
        return this.raw.get(PropertyType.ResponseType);
    }
    set responseType(value: ResponseTypeType) {
        this.raw.set(PropertyType.ResponseType, value);
    }
    /**
     * Dodatkowe nagłówki zapytania HTTP. \z oznacza brak zawartości
     * @returns {string}
     */
    get requestHeaders(): string {
        return this.raw.get(PropertyType.RequestHeaders);
    }
    set requestHeaders(value: string) {
        this.raw.set(PropertyType.RequestHeaders, value);
    }
    /**
     * Zawartość wiadomości wysyłanej w zapytaniu. \z oznacza brak zawartości
     * @returns {string}
     */
    get requestBody(): string {
        return this.raw.get(PropertyType.RequestBody);
    }
    set requestBody(value: string) {
        this.raw.set(PropertyType.RequestBody, value);
    }
    /**
     * Nagłówki odpowiedzi HTTP
     * @returns {string}
     */
    get responseHeaders(): string {
        return this.raw.get(PropertyType.ResponseHeaders);
    }
    set responseHeaders(value: string) {
        this.raw.set(PropertyType.ResponseHeaders, value);
    }
    /**
     * Zawartość wiadomości otrzymanej po wysłaniu zapytania (cecha wykorzystywana do odczytu w skryptach - nieustawialna)
     * @returns {string}
     */
    get responseBody(): string {
        return this.raw.get(PropertyType.ResponseBody);
    }
    set responseBody(value: string) {
        this.raw.set(PropertyType.ResponseBody, value);
    }
    /**
     * Status odpowiedzi HTTP
     * @returns {number}
     */
    get statusCode(): number {
        return this.raw.get(PropertyType.StatusCode);
    }
    /**
     * Stan aktywności zapytania HTTP
     * @returns {number}
     */
    get isActive(): number {
        return this.raw.get(PropertyType.IsActive);
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
     * Ustawia adres hosta
     * @param {string} host
     */
    setHost(host: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Host)
            .addParameter(host)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Ustawia ścieżkę zapytania
     * @param {string} path
     */
    setPath(path: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Path)
            .addParameter(path)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Ustawia parametry zapytania
     * @param {string} path
     */
    setQueryStringParams(path: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.QueryStringParams)
            .addParameter(path)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Ustawia metodę zapytania
     * @param {string} method
     */
    setMethod(method: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Method)
            .addParameter(method)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Ustawia dopuszczalny czas odpowiedzi
     * @param {number} time
     */
    setTimeout(time: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Timeout)
            .addParameter(time)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Ustawia typ zawartości wysyłanego zapytania (content-type)
     * @param {RequestTypeType} requestType
     */
    setRequestType(requestType: RequestTypeType): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.RequestType)
            .addParameter(requestType)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Ustawia typ oczekiwanej odpowiedzi na zapytanie
     * @param {ResponseTypeType} responseType
     */
    setResponseType(responseType: ResponseTypeType): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.ResponseType)
            .addParameter(responseType)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Ustawia dodatkowe nagłówki HTTP w zapytaniu
     * @param {string} headers
     */
    setRequestHeaders(headers: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.RequestHeaders)
            .addParameter(headers)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Ustawia zawartość wiadomości w zapytaniu
     * @param {string} body
     */
    setRequestBody(body: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.RequestBody)
            .addParameter(body)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * 
     * @param {string} headers
     */
    setResponseHeaders(headers: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.ResponseHeaders)
            .addParameter(headers)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Ustawia zawartość wiadomości w odpowiedzi
     * @param {string} response
     */
    setResponse(response: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.ResponseBody)
            .addParameter(response)
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
    /**
     * Parametry zapytania. \z oznacza brak
     * @returns {string}
     */
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
    /**
     * Typ zawartości wysyłanego zapytania. Definiuje parametr content-type w nagłówku zapytania. W zależności od wybranego typu zawartość cechy RequestBody jest odpowiednio serializowana:0 - None - niezdefiniowany. W nagłówku nie jest wysyłane content-type. Zawartość cechy RequestBody nie jest serializowana.1 - Text - content-type: text/plain. Zawartość cechy RequestBody nie jest serializowana.2 - JSON - content-type: application/json. Zawartość cechy RequestBody jest serializowana do formatu JSON.3 - XML - content-type: text/xml. Zawartość cechy RequestBody jest serializowana do formatu XML.4 - FormData - content-type: application/x-www-form-urlencoded. Zawartość cechy RequestBody jest serializowana do tabeli.5 - Other - typ zawartości (content-type) jest inny niż wbudowany. Typ można zdefiniować umieszczając go w nagłówku (cecha RequestHeaders). Zawartość nie jest serializowana
     * @returns {RequestTypeType}
     */
    get requestType(): RequestTypeType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.RequestType)
            .build();
        return this.gate.runScript(cmd!);
    }
    set requestType(value: RequestTypeType) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.RequestType)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Typ oczekiwanej odpowiedzi. Definiuje parametr Accept w nagłówku zapytania. W zależności od wybranego typu zawartość otrzymanej odpowiedzi (cechy ResponseBody) jest odpowiednio parsowana do tabeli:0 - None - parametr Accept nie jest wysyłany w nagłówku wysyłanego zapytania. Odpowiedź (cecha ResponseBody) nie jest parsowana.1 - Text - Accept: text/plain. Odpowiedź (cecha ResponseBody) nie jest parsowana.2 - JSON - Accept: application/json. Odpowiedź (cecha ResponseBody) jest parsowana z JSON.3 - XML - Accept: text/xml. Odpowiedź (cecha ResponseBody) jest parsowana z XML.4 - FormData - Accept: application/x-www-form-urlencoded. Odpowiedź (cecha ResponseBody) jest parsowana.5 - Other - parametr Accept nagłówka jest inny niż wbudowany. Parametr można zdefiniować umieszczając go w nagłówku (cecha RequestHeaders)
     * @returns {ResponseTypeType}
     */
    get responseType(): ResponseTypeType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.ResponseType)
            .build();
        return this.gate.runScript(cmd!);
    }
    set responseType(value: ResponseTypeType) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.ResponseType)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Dodatkowe nagłówki zapytania HTTP. \z oznacza brak zawartości
     * @returns {string}
     */
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
    /**
     * Zawartość wiadomości wysyłanej w zapytaniu. \z oznacza brak zawartości
     * @returns {string}
     */
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
    /**
     * Nagłówki odpowiedzi HTTP
     * @returns {string}
     */
    get responseHeaders(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.ResponseHeaders)
            .build();
        return this.gate.runScript(cmd!);
    }
    set responseHeaders(value: string) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.ResponseHeaders)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Zawartość wiadomości otrzymanej po wysłaniu zapytania (cecha wykorzystywana do odczytu w skryptach - nieustawialna)
     * @returns {string}
     */
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
    /**
     * Stan aktywności zapytania HTTP
     * @returns {number}
     */
    get isActive(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.IsActive)
            .build();
        return this.gate.runScript(cmd!);
    }
}

export { HttpRequest, HttpRequestRaw, HttpRequestRemote, RequestTypeType, ResponseTypeType }
