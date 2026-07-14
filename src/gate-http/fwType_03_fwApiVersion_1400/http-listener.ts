// Created from: src/interfaces/object_http_listener_v2.xml, object name="HttpListener" version="2"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnRequest = 0,
}

enum PropertyType {
    Path = 0,
    Method = 1,
    QueryStringParams = 2,
    RequestType = 3,
    RequestHeaders = 4,
    RequestBody = 5,
    ResponseType = 6,
    ResponseHeaders = 7,
    ResponseBody = 8,
    StatusCode = 9,
}

enum MethodType {
    SendResponse = 0,
    Clear = 1,
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
}

declare class HttpListenerRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface IHttpListener {
    /**
     * Zdarzenie wywoływane w momencie otrzymania zapytania
     * @param callback
     */
    addOnRequest: (callback: () => void) => void
    /** Wysyła odpowiedź na zapytanie */
    sendResponse: () => void
    /** Usuwa treść odpowiedzi */
    clear: () => void
    /**
     * Ustawia ścieżkę zapytania
     * @param {string} path
     */
    setPath: (path: string) => void
    /**
     * Ustawia parametry zapytania
     * @param {string} params
     */
    setQueryStringParams: (params: string) => void
    /**
     * 
     * @param {string} headers
     */
    setRequestHeaders: (headers: string) => void
    /**
     * Ustawia zawartość wiadomości w zapytaniu
     * @param {string} body
     */
    setRequestBody: (body: string) => void
    /**
     * Ustawia typ oczekiwanej odpowiedzi na zapytanie
     * @param {ResponseTypeType} responseType
     */
    setResponseType: (responseType: ResponseTypeType) => void
    /**
     * Ustawia dodatkowe nagłówki odpowiedzi HTTP
     * @param {string} headers
     */
    setResponseHeaders: (headers: string) => void
    /**
     * Ustawia treść odpowiedzi
     * @param {string} body
     */
    setResponseBody: (body: string) => void
    /**
     * Ustawia status odpowiedzi
     * @param {number} statusCode
     */
    setStatusCode: (statusCode: number) => void
    /** Ścieżka zapytania */
    path: string
    /** Typ metody otrzymanej w zapytaniu np. GET, POST */
    readonly method: string
    /** Zwraca parametry zapytania HTTP (cecha wykorzystywana do odczytu w skryptach - nieustawialna) */
    queryStringParams: string
    /** Typ otrzymanego zapytania. W zależności od wybranego typu, zawartość otrzymanego zapytania (cechy RequestBody) jest odpowiednio parsowana do tabeli:0 - None - Odpowiedź nie jest parsowana.1 - Text - Odpowiedź nie jest parsowana.2 - JSON - Odpowiedź jest parsowana z JSON.3 - XML - Odpowiedź jest parsowana z XML.4 - FormData - Odpowiedź jest parsowana.5 - Other - Odpowiedź nie jest parsowana */
    readonly requestType: RequestTypeType
    /** Zwraca nagłówki zapytania HTTP (cecha wykorzystywana do odczytu w skryptach - nieustawialna) */
    requestHeaders: string
    /** Zwraca treść zapytania HTTP (cecha wykorzystywana do odczytu w skryptach - nieustawialna) */
    requestBody: string
    /** Typ zawartości wysłanej odpowiedzi na zapytanie. Definiuje parametr content-type w nagłówku odpowiedzi. W zależności od wybranego typu, zawartość cechy ResponseBody jest odpowiednio serializowana:0 - None - niezdefiniowany. W nagłówku nie jest wysyłane content-type. Zawartość nie jest serializowana.1 - Text - content-type: text/plain. Zawartość nie jest serializowana.2 - JSON - content-type: application/json. Zawartość RequestBody jest serializowana do formatu JSON.3 - XML - content-type: text/xml. Zawartość RequestBody jest serializowana do formatu XML.4 - FormData - content-type: application/x-www-form-urlencoded. Zawartość RequestBody jest serializowana */
    responseType: ResponseTypeType
    /** Dodatkowe nagłówki odpowiedzi HTTP */
    responseHeaders: string
    /** Zwraca treść odpowiedzi HTTP */
    responseBody: string
    /** Status wysyłanej odpowiedzi HTTP. Obsługiwane statusy:200 - OK201 - Utworzono202 - Przyjęto204 - Brak zawartości205 - Przywróć zawartość400 - Nieprawidłowe zapytanie403 - Zabroniony404 - Nie znaleziono405 - Niedozwolona metoda406 - Niedozwolone408 - Koniec czasu oczekiwania na żądanie409 - Konflikt410 - Zniknął (usunięto) */
    statusCode: number
}

class HttpListener implements IHttpListener {
    private onRequestCallbacks: Array<() => void> = [];

    constructor(private raw: HttpListenerRaw) {
        this.raw.add_event(EventType.OnRequest, () => {
            this.onRequestCallbacks.forEach(callback => { callback(); });
        });
    }

    /**
     * Zdarzenie wywoływane w momencie otrzymania zapytania
     * @param callback
     */
    addOnRequest(callback: () => void): void {
        this.onRequestCallbacks.push(callback);
    }
    /** Wysyła odpowiedź na zapytanie */
    sendResponse(): void {
        this.raw.execute(MethodType.SendResponse);
    }
    /** Usuwa treść odpowiedzi */
    clear(): void {
        this.raw.execute(MethodType.Clear);
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
     * @param {string} params
     */
    setQueryStringParams(params: string): void {
        this.raw.set(PropertyType.QueryStringParams, params);
    }
    /**
     * 
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
     * Ustawia typ oczekiwanej odpowiedzi na zapytanie
     * @param {ResponseTypeType} responseType
     */
    setResponseType(responseType: ResponseTypeType): void {
        this.raw.set(PropertyType.ResponseType, responseType);
    }
    /**
     * Ustawia dodatkowe nagłówki odpowiedzi HTTP
     * @param {string} headers
     */
    setResponseHeaders(headers: string): void {
        this.raw.set(PropertyType.ResponseHeaders, headers);
    }
    /**
     * Ustawia treść odpowiedzi
     * @param {string} body
     */
    setResponseBody(body: string): void {
        this.raw.set(PropertyType.ResponseBody, body);
    }
    /**
     * Ustawia status odpowiedzi
     * @param {number} statusCode
     */
    setStatusCode(statusCode: number): void {
        this.raw.set(PropertyType.StatusCode, statusCode);
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
     * Typ metody otrzymanej w zapytaniu np. GET, POST
     * @returns {string}
     */
    get method(): string {
        return this.raw.get(PropertyType.Method);
    }
    /**
     * Zwraca parametry zapytania HTTP (cecha wykorzystywana do odczytu w skryptach - nieustawialna)
     * @returns {string}
     */
    get queryStringParams(): string {
        return this.raw.get(PropertyType.QueryStringParams);
    }
    set queryStringParams(value: string) {
        this.raw.set(PropertyType.QueryStringParams, value);
    }
    /**
     * Typ otrzymanego zapytania. W zależności od wybranego typu, zawartość otrzymanego zapytania (cechy RequestBody) jest odpowiednio parsowana do tabeli:0 - None - Odpowiedź nie jest parsowana.1 - Text - Odpowiedź nie jest parsowana.2 - JSON - Odpowiedź jest parsowana z JSON.3 - XML - Odpowiedź jest parsowana z XML.4 - FormData - Odpowiedź jest parsowana.5 - Other - Odpowiedź nie jest parsowana
     * @returns {RequestTypeType}
     */
    get requestType(): RequestTypeType {
        return this.raw.get(PropertyType.RequestType);
    }
    /**
     * Zwraca nagłówki zapytania HTTP (cecha wykorzystywana do odczytu w skryptach - nieustawialna)
     * @returns {string}
     */
    get requestHeaders(): string {
        return this.raw.get(PropertyType.RequestHeaders);
    }
    set requestHeaders(value: string) {
        this.raw.set(PropertyType.RequestHeaders, value);
    }
    /**
     * Zwraca treść zapytania HTTP (cecha wykorzystywana do odczytu w skryptach - nieustawialna)
     * @returns {string}
     */
    get requestBody(): string {
        return this.raw.get(PropertyType.RequestBody);
    }
    set requestBody(value: string) {
        this.raw.set(PropertyType.RequestBody, value);
    }
    /**
     * Typ zawartości wysłanej odpowiedzi na zapytanie. Definiuje parametr content-type w nagłówku odpowiedzi. W zależności od wybranego typu, zawartość cechy ResponseBody jest odpowiednio serializowana:0 - None - niezdefiniowany. W nagłówku nie jest wysyłane content-type. Zawartość nie jest serializowana.1 - Text - content-type: text/plain. Zawartość nie jest serializowana.2 - JSON - content-type: application/json. Zawartość RequestBody jest serializowana do formatu JSON.3 - XML - content-type: text/xml. Zawartość RequestBody jest serializowana do formatu XML.4 - FormData - content-type: application/x-www-form-urlencoded. Zawartość RequestBody jest serializowana
     * @returns {ResponseTypeType}
     */
    get responseType(): ResponseTypeType {
        return this.raw.get(PropertyType.ResponseType);
    }
    set responseType(value: ResponseTypeType) {
        this.raw.set(PropertyType.ResponseType, value);
    }
    /**
     * Dodatkowe nagłówki odpowiedzi HTTP
     * @returns {string}
     */
    get responseHeaders(): string {
        return this.raw.get(PropertyType.ResponseHeaders);
    }
    set responseHeaders(value: string) {
        this.raw.set(PropertyType.ResponseHeaders, value);
    }
    /**
     * Zwraca treść odpowiedzi HTTP
     * @returns {string}
     */
    get responseBody(): string {
        return this.raw.get(PropertyType.ResponseBody);
    }
    set responseBody(value: string) {
        this.raw.set(PropertyType.ResponseBody, value);
    }
    /**
     * Status wysyłanej odpowiedzi HTTP. Obsługiwane statusy:200 - OK201 - Utworzono202 - Przyjęto204 - Brak zawartości205 - Przywróć zawartość400 - Nieprawidłowe zapytanie403 - Zabroniony404 - Nie znaleziono405 - Niedozwolona metoda406 - Niedozwolone408 - Koniec czasu oczekiwania na żądanie409 - Konflikt410 - Zniknął (usunięto)
     * @returns {number}
     */
    get statusCode(): number {
        return this.raw.get(PropertyType.StatusCode);
    }
    set statusCode(value: number) {
        this.raw.set(PropertyType.StatusCode, value);
    }
}

class HttpListenerRemote implements IHttpListener {
    constructor(private objectName: string, private gate: RemoteGate) {
    }

    /**
     * Zdarzenie wywoływane w momencie otrzymania zapytania
     * @param callback
     */
    addOnRequest(_callback: () => void): void {
        // Remote events are not supported
    }
    /** Wysyła odpowiedź na zapytanie */
    sendResponse(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.SendResponse)
            .build();
        this.gate.runScript(cmd!);
    }
    /** Usuwa treść odpowiedzi */
    clear(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.Clear)
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
     * @param {string} params
     */
    setQueryStringParams(params: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.QueryStringParams)
            .addParameter(params)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * 
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
     * Ustawia dodatkowe nagłówki odpowiedzi HTTP
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
     * Ustawia treść odpowiedzi
     * @param {string} body
     */
    setResponseBody(body: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.ResponseBody)
            .addParameter(body)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Ustawia status odpowiedzi
     * @param {number} statusCode
     */
    setStatusCode(statusCode: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.StatusCode)
            .addParameter(statusCode)
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
     * Typ metody otrzymanej w zapytaniu np. GET, POST
     * @returns {string}
     */
    get method(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Method)
            .build();
        return this.gate.runScript(cmd!);
    }
    /**
     * Zwraca parametry zapytania HTTP (cecha wykorzystywana do odczytu w skryptach - nieustawialna)
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
     * Typ otrzymanego zapytania. W zależności od wybranego typu, zawartość otrzymanego zapytania (cechy RequestBody) jest odpowiednio parsowana do tabeli:0 - None - Odpowiedź nie jest parsowana.1 - Text - Odpowiedź nie jest parsowana.2 - JSON - Odpowiedź jest parsowana z JSON.3 - XML - Odpowiedź jest parsowana z XML.4 - FormData - Odpowiedź jest parsowana.5 - Other - Odpowiedź nie jest parsowana
     * @returns {RequestTypeType}
     */
    get requestType(): RequestTypeType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.RequestType)
            .build();
        return this.gate.runScript(cmd!);
    }
    /**
     * Zwraca nagłówki zapytania HTTP (cecha wykorzystywana do odczytu w skryptach - nieustawialna)
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
     * Zwraca treść zapytania HTTP (cecha wykorzystywana do odczytu w skryptach - nieustawialna)
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
     * Typ zawartości wysłanej odpowiedzi na zapytanie. Definiuje parametr content-type w nagłówku odpowiedzi. W zależności od wybranego typu, zawartość cechy ResponseBody jest odpowiednio serializowana:0 - None - niezdefiniowany. W nagłówku nie jest wysyłane content-type. Zawartość nie jest serializowana.1 - Text - content-type: text/plain. Zawartość nie jest serializowana.2 - JSON - content-type: application/json. Zawartość RequestBody jest serializowana do formatu JSON.3 - XML - content-type: text/xml. Zawartość RequestBody jest serializowana do formatu XML.4 - FormData - content-type: application/x-www-form-urlencoded. Zawartość RequestBody jest serializowana
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
     * Dodatkowe nagłówki odpowiedzi HTTP
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
     * Zwraca treść odpowiedzi HTTP
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
     * Status wysyłanej odpowiedzi HTTP. Obsługiwane statusy:200 - OK201 - Utworzono202 - Przyjęto204 - Brak zawartości205 - Przywróć zawartość400 - Nieprawidłowe zapytanie403 - Zabroniony404 - Nie znaleziono405 - Niedozwolona metoda406 - Niedozwolone408 - Koniec czasu oczekiwania na żądanie409 - Konflikt410 - Zniknął (usunięto)
     * @returns {number}
     */
    get statusCode(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.StatusCode)
            .build();
        return this.gate.runScript(cmd!);
    }
    set statusCode(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.StatusCode)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
}

export { HttpListener, HttpListenerRaw, HttpListenerRemote, RequestTypeType, ResponseTypeType }
