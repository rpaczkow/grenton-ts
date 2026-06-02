// Created from: packages/grenton-api/interfaces/object_sonos_v1.xml, object name="Sonos" version="1"

import { rawExecutionBuilderFactory } from "../../../core/execution-builder"
import { RemoteGate } from "../../../core/remote-gate"

enum EventType {
    OnConnected = 0,
    OnDisconnected = 1,
    OnError = 2,
    OnChange = 3,
    OnMuteChange = 4,
    OnVolumeChange = 5,
    OnTitleChange = 6,
    OnArtistChange = 7,
    OnStateChange = 8,
    OnPlayModeChange = 9,
    OnAlbumArtChange = 10,
    OnCoordinatorNameChange = 11
}

enum PropertyType {
    Host = 0,
    UpdatePeriod = 1,
    Status = 2,
    ErrorCode = 3,
    Volume = 4,
    Mute = 5,
    Artist = 6,
    Title = 7,
    State = 8,
    PlayMode = 9,
    AlbumArt = 10,
    Name = 11,
    CoordinatorName = 12
}

enum MethodType {
    Play = 0,
    Pause = 1,
    Stop = 2,
    Next = 3,
    Prev = 4,
    VolumeUp = 5,
    VolumeDown = 6,
    SwitchMute = 7,
    SwitchPlay = 8,
    LeaveGroup = 9,
    JoinGroup = 10
}

enum MuteType {
    OFF = 0,
    ON = 1
}

enum PlayModeType {
    NORMAL = 0,
    REPEAT_ALL = 1,
    REPEAT_ONE = 2,
    SHUFFLE_NOREPEAT = 3,
    SHUFFLE = 4,
    SHUFFLE_REPEAT_ONE = 5
}

declare class SonosRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface ISonos {
    /**
     * Zdarzenie wywoływane po nawiązaniu połączenia z głośnikiem
     * @param callback
     */
    addOnConnected: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po zerwaniu połączenia z głośnikiem
     * @param callback
     */
    addOnDisconnected: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po wystąpieniu błędu
     * @param callback
     */
    addOnError: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po zmianie wartości Mute, Volume, Title, Artist, State, PlayMode, AlbumArt, CoordinatorName
     * @param callback
     */
    addOnChange: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po zmianie wartości Mute
     * @param callback
     */
    addOnMuteChange: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po zmianie wartości Volume
     * @param callback
     */
    addOnVolumeChange: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po zmianie wartości Title
     * @param callback
     */
    addOnTitleChange: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po zmianie wartości Artist
     * @param callback
     */
    addOnArtistChange: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po zmianie wartości State
     * @param callback
     */
    addOnStateChange: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po zmianie wartości PlayMode
     * @param callback
     */
    addOnPlayModeChange: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po zmianie wartości AlbumArt
     * @param callback
     */
    addOnAlbumArtChange: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po zmianie wartości CoordinatorName
     * @param callback
     */
    addOnCoordinatorNameChange: (callback: () => void) => void
    /** Rozpoczyna odtwarzanie */
    play: () => void
    /** Wstrzymuje odtwarzanie (pauza) */
    pause: () => void
    /** Zatrzymuje odtwarzanie */
    stop: () => void
    /** Przełącza na następną ścieżkę */
    next: () => void
    /** Przełącza na poprzednią ścieżkę */
    prev: () => void
    /**
     * Zwiększa głośność o wartość określoną w procentach
     * @param {number} volumeStep
     */
    volumeUp: (volumeStep: number) => void
    /**
     * Zmniejsza głośność o wartość określoną w procentach
     * @param {number} volumeStep
     */
    volumeDown: (volumeStep: number) => void
    /** Przełącza stan wyciszenia */
    switchMute: () => void
    /** Przełącza stan odtwarzania pomiędzy pauzą, a odtwarzaniem */
    switchPlay: () => void
    /** Usuwa głośnik z grupy, jeżeli w jakiejś się znajduje */
    leaveGroup: () => void
    /**
     * Dodaje głośnik do grupy, określonej przez nazwę koordynatora
     * @param {string} coordinatorName
     */
    joinGroup: (coordinatorName: string) => void
    /**
     * Ustawia głośność w zakresie od 0% do 100%
     * @param {number} volume
     */
    setVolume: (volume: number) => void
    /**
     * Ustawia stan wyciszenia
     * @param {MuteType} mute
     */
    setMute: (mute: MuteType) => void
    /**
     * Ustawia tryb odtwarzania
     * @param {PlayModeType} playMode
     */
    setPlayMode: (playMode: PlayModeType) => void
    /** Adres IP Sonos */
    host: string
    /** Okres aktualizacji stanu */
    updatePeriod: number
    /** Stan komunikacji z głośnikiem: 0 - brak połączenia, 1 - połączono */
    readonly status: number
    /** Ostatni kod błędu: 0 - brak błędu, wartości ujemne - ujemny kod odpowiedzi HTTP, wartości dotatnie - kod błędu UPnP */
    readonly errorCode: number
    /** Głośność w zakresie od 0% do 100% */
    readonly volume: number
    /** Stan wyciszenia: 0 - Wyłączone, 1 - Włączone */
    readonly mute: MuteType
    /** Nazwa autora */
    readonly artist: string
    /** Tytuł utworu */
    readonly title: string
    /** Stan odtwarzania: 0 - zatrzymane, 1 - odtwarzanie, 2 - pauza, 3 - stan przejściowy */
    readonly state: number
    /** Tryb odtwarzania: 0 - normalny, 1 - powtarzaj wszystkie, 2 - powtarzaj jeden, 3 - losowy, bez powtarzania, 4 - losowy, powtarzaj wszystkie, 5 - losowy, powtarzaj jeden */
    readonly playMode: PlayModeType
    /** Adres okładki albumu */
    readonly albumArt: string
    /** Nazwa głośnika */
    readonly name: string
    /** Nazwa koordynatora grupy */
    readonly coordinatorName: string
}

class Sonos implements ISonos {
    private onConnectedCallbacks: Array<() => void> = [];
    private onDisconnectedCallbacks: Array<() => void> = [];
    private onErrorCallbacks: Array<() => void> = [];
    private onChangeCallbacks: Array<() => void> = [];
    private onMuteChangeCallbacks: Array<() => void> = [];
    private onVolumeChangeCallbacks: Array<() => void> = [];
    private onTitleChangeCallbacks: Array<() => void> = [];
    private onArtistChangeCallbacks: Array<() => void> = [];
    private onStateChangeCallbacks: Array<() => void> = [];
    private onPlayModeChangeCallbacks: Array<() => void> = [];
    private onAlbumArtChangeCallbacks: Array<() => void> = [];
    private onCoordinatorNameChangeCallbacks: Array<() => void> = [];

    constructor(private raw: SonosRaw) {
        this.raw.add_event(EventType.OnConnected, () => {
            this.onConnectedCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnDisconnected, () => {
            this.onDisconnectedCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnError, () => {
            this.onErrorCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnChange, () => {
            this.onChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnMuteChange, () => {
            this.onMuteChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnVolumeChange, () => {
            this.onVolumeChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnTitleChange, () => {
            this.onTitleChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnArtistChange, () => {
            this.onArtistChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnStateChange, () => {
            this.onStateChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnPlayModeChange, () => {
            this.onPlayModeChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnAlbumArtChange, () => {
            this.onAlbumArtChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnCoordinatorNameChange, () => {
            this.onCoordinatorNameChangeCallbacks.forEach(callback => { callback(); });
        });
    }

    /**
     * Zdarzenie wywoływane po nawiązaniu połączenia z głośnikiem
     * @param callback
     */
    addOnConnected(callback: () => void): void {
        this.onConnectedCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po zerwaniu połączenia z głośnikiem
     * @param callback
     */
    addOnDisconnected(callback: () => void): void {
        this.onDisconnectedCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po wystąpieniu błędu
     * @param callback
     */
    addOnError(callback: () => void): void {
        this.onErrorCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po zmianie wartości Mute, Volume, Title, Artist, State, PlayMode, AlbumArt, CoordinatorName
     * @param callback
     */
    addOnChange(callback: () => void): void {
        this.onChangeCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po zmianie wartości Mute
     * @param callback
     */
    addOnMuteChange(callback: () => void): void {
        this.onMuteChangeCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po zmianie wartości Volume
     * @param callback
     */
    addOnVolumeChange(callback: () => void): void {
        this.onVolumeChangeCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po zmianie wartości Title
     * @param callback
     */
    addOnTitleChange(callback: () => void): void {
        this.onTitleChangeCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po zmianie wartości Artist
     * @param callback
     */
    addOnArtistChange(callback: () => void): void {
        this.onArtistChangeCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po zmianie wartości State
     * @param callback
     */
    addOnStateChange(callback: () => void): void {
        this.onStateChangeCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po zmianie wartości PlayMode
     * @param callback
     */
    addOnPlayModeChange(callback: () => void): void {
        this.onPlayModeChangeCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po zmianie wartości AlbumArt
     * @param callback
     */
    addOnAlbumArtChange(callback: () => void): void {
        this.onAlbumArtChangeCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po zmianie wartości CoordinatorName
     * @param callback
     */
    addOnCoordinatorNameChange(callback: () => void): void {
        this.onCoordinatorNameChangeCallbacks.push(callback);
    }
    /** Rozpoczyna odtwarzanie */
    play(): void {
        this.raw.execute(MethodType.Play);
    }
    /** Wstrzymuje odtwarzanie (pauza) */
    pause(): void {
        this.raw.execute(MethodType.Pause);
    }
    /** Zatrzymuje odtwarzanie */
    stop(): void {
        this.raw.execute(MethodType.Stop);
    }
    /** Przełącza na następną ścieżkę */
    next(): void {
        this.raw.execute(MethodType.Next);
    }
    /** Przełącza na poprzednią ścieżkę */
    prev(): void {
        this.raw.execute(MethodType.Prev);
    }
    /**
     * Zwiększa głośność o wartość określoną w procentach
     * @param {number} volumeStep
     */
    volumeUp(volumeStep: number): void {
        this.raw.execute(MethodType.VolumeUp, volumeStep);
    }
    /**
     * Zmniejsza głośność o wartość określoną w procentach
     * @param {number} volumeStep
     */
    volumeDown(volumeStep: number): void {
        this.raw.execute(MethodType.VolumeDown, volumeStep);
    }
    /** Przełącza stan wyciszenia */
    switchMute(): void {
        this.raw.execute(MethodType.SwitchMute);
    }
    /** Przełącza stan odtwarzania pomiędzy pauzą, a odtwarzaniem */
    switchPlay(): void {
        this.raw.execute(MethodType.SwitchPlay);
    }
    /** Usuwa głośnik z grupy, jeżeli w jakiejś się znajduje */
    leaveGroup(): void {
        this.raw.execute(MethodType.LeaveGroup);
    }
    /**
     * Dodaje głośnik do grupy, określonej przez nazwę koordynatora
     * @param {string} coordinatorName
     */
    joinGroup(coordinatorName: string): void {
        this.raw.execute(MethodType.JoinGroup, coordinatorName);
    }
    /**
     * Ustawia głośność w zakresie od 0% do 100%
     * @param {number} volume
     */
    setVolume(volume: number): void {
        this.raw.set(PropertyType.Volume, volume);
    }
    /**
     * Ustawia stan wyciszenia
     * @param {MuteType} mute
     */
    setMute(mute: MuteType): void {
        this.raw.set(PropertyType.Mute, mute);
    }
    /**
     * Ustawia tryb odtwarzania
     * @param {PlayModeType} playMode
     */
    setPlayMode(playMode: PlayModeType): void {
        this.raw.set(PropertyType.PlayMode, playMode);
    }
    /**
     * Adres IP Sonos
     * @returns {string}
     */
    get host(): string {
        return this.raw.get(PropertyType.Host);
    }
    set host(value: string) {
        this.raw.set(PropertyType.Host, value);
    }
    /**
     * Okres aktualizacji stanu
     * @returns {number}
     */
    get updatePeriod(): number {
        return this.raw.get(PropertyType.UpdatePeriod);
    }
    set updatePeriod(value: number) {
        this.raw.set(PropertyType.UpdatePeriod, value);
    }
    /**
     * Stan komunikacji z głośnikiem: 0 - brak połączenia, 1 - połączono
     * @returns {number}
     */
    get status(): number {
        return this.raw.get(PropertyType.Status);
    }
    /**
     * Ostatni kod błędu: 0 - brak błędu, wartości ujemne - ujemny kod odpowiedzi HTTP, wartości dotatnie - kod błędu UPnP
     * @returns {number}
     */
    get errorCode(): number {
        return this.raw.get(PropertyType.ErrorCode);
    }
    /**
     * Głośność w zakresie od 0% do 100%
     * @returns {number}
     */
    get volume(): number {
        return this.raw.get(PropertyType.Volume);
    }
    /**
     * Stan wyciszenia: 0 - Wyłączone, 1 - Włączone
     * @returns {MuteType}
     */
    get mute(): MuteType {
        return this.raw.get(PropertyType.Mute);
    }
    /**
     * Nazwa autora
     * @returns {string}
     */
    get artist(): string {
        return this.raw.get(PropertyType.Artist);
    }
    /**
     * Tytuł utworu
     * @returns {string}
     */
    get title(): string {
        return this.raw.get(PropertyType.Title);
    }
    /**
     * Stan odtwarzania: 0 - zatrzymane, 1 - odtwarzanie, 2 - pauza, 3 - stan przejściowy
     * @returns {number}
     */
    get state(): number {
        return this.raw.get(PropertyType.State);
    }
    /**
     * Tryb odtwarzania: 0 - normalny, 1 - powtarzaj wszystkie, 2 - powtarzaj jeden, 3 - losowy, bez powtarzania, 4 - losowy, powtarzaj wszystkie, 5 - losowy, powtarzaj jeden
     * @returns {PlayModeType}
     */
    get playMode(): PlayModeType {
        return this.raw.get(PropertyType.PlayMode);
    }
    /**
     * Adres okładki albumu
     * @returns {string}
     */
    get albumArt(): string {
        return this.raw.get(PropertyType.AlbumArt);
    }
    /**
     * Nazwa głośnika
     * @returns {string}
     */
    get name(): string {
        return this.raw.get(PropertyType.Name);
    }
    /**
     * Nazwa koordynatora grupy
     * @returns {string}
     */
    get coordinatorName(): string {
        return this.raw.get(PropertyType.CoordinatorName);
    }
}

class SonosRemote implements ISonos {
    constructor(private objectName: string, private gate: RemoteGate) {

    }

    /**
     * Zdarzenie wywoływane po nawiązaniu połączenia z głośnikiem
     * @param callback
     */
    addOnConnected(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane po zerwaniu połączenia z głośnikiem
     * @param callback
     */
    addOnDisconnected(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane po wystąpieniu błędu
     * @param callback
     */
    addOnError(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane po zmianie wartości Mute, Volume, Title, Artist, State, PlayMode, AlbumArt, CoordinatorName
     * @param callback
     */
    addOnChange(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane po zmianie wartości Mute
     * @param callback
     */
    addOnMuteChange(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane po zmianie wartości Volume
     * @param callback
     */
    addOnVolumeChange(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane po zmianie wartości Title
     * @param callback
     */
    addOnTitleChange(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane po zmianie wartości Artist
     * @param callback
     */
    addOnArtistChange(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane po zmianie wartości State
     * @param callback
     */
    addOnStateChange(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane po zmianie wartości PlayMode
     * @param callback
     */
    addOnPlayModeChange(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane po zmianie wartości AlbumArt
     * @param callback
     */
    addOnAlbumArtChange(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane po zmianie wartości CoordinatorName
     * @param callback
     */
    addOnCoordinatorNameChange(_callback: () => void): void {
        // Remote events are not supported
    }

    /** Rozpoczyna odtwarzanie */
    play(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.Play)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Wstrzymuje odtwarzanie (pauza) */
    pause(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.Pause)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Zatrzymuje odtwarzanie */
    stop(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.Stop)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Przełącza na następną ścieżkę */
    next(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.Next)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Przełącza na poprzednią ścieżkę */
    prev(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.Prev)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Zwiększa głośność o wartość określoną w procentach
     * @param {number} volumeStep
     */
    volumeUp(volumeStep: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.VolumeUp)
            .addParameter(volumeStep)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Zmniejsza głośność o wartość określoną w procentach
     * @param {number} volumeStep
     */
    volumeDown(volumeStep: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.VolumeDown)
            .addParameter(volumeStep)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Przełącza stan wyciszenia */
    switchMute(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.SwitchMute)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Przełącza stan odtwarzania pomiędzy pauzą, a odtwarzaniem */
    switchPlay(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.SwitchPlay)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Usuwa głośnik z grupy, jeżeli w jakiejś się znajduje */
    leaveGroup(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.LeaveGroup)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Dodaje głośnik do grupy, określonej przez nazwę koordynatora
     * @param {string} coordinatorName
     */
    joinGroup(coordinatorName: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.JoinGroup)
            .addParameter(coordinatorName)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Ustawia głośność w zakresie od 0% do 100%
     * @param {number} volume
     */
    setVolume(volume: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Volume)
            .addParameter(volume)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Ustawia stan wyciszenia
     * @param {MuteType} mute
     */
    setMute(mute: MuteType): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Mute)
            .addParameter(mute)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Ustawia tryb odtwarzania
     * @param {PlayModeType} playMode
     */
    setPlayMode(playMode: PlayModeType): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.PlayMode)
            .addParameter(playMode)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Adres IP Sonos
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
     * Okres aktualizacji stanu
     * @returns {number}
     */
    get updatePeriod(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.UpdatePeriod)
            .build();
        return this.gate.runScript(cmd!);
    }

    set updatePeriod(value: number) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.UpdatePeriod)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Stan komunikacji z głośnikiem: 0 - brak połączenia, 1 - połączono
     * @returns {number}
     */
    get status(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Status)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Ostatni kod błędu: 0 - brak błędu, wartości ujemne - ujemny kod odpowiedzi HTTP, wartości dotatnie - kod błędu UPnP
     * @returns {number}
     */
    get errorCode(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.ErrorCode)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Głośność w zakresie od 0% do 100%
     * @returns {number}
     */
    get volume(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Volume)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Stan wyciszenia: 0 - Wyłączone, 1 - Włączone
     * @returns {MuteType}
     */
    get mute(): MuteType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Mute)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Nazwa autora
     * @returns {string}
     */
    get artist(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Artist)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Tytuł utworu
     * @returns {string}
     */
    get title(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Title)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Stan odtwarzania: 0 - zatrzymane, 1 - odtwarzanie, 2 - pauza, 3 - stan przejściowy
     * @returns {number}
     */
    get state(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.State)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Tryb odtwarzania: 0 - normalny, 1 - powtarzaj wszystkie, 2 - powtarzaj jeden, 3 - losowy, bez powtarzania, 4 - losowy, powtarzaj wszystkie, 5 - losowy, powtarzaj jeden
     * @returns {PlayModeType}
     */
    get playMode(): PlayModeType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.PlayMode)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Adres okładki albumu
     * @returns {string}
     */
    get albumArt(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.AlbumArt)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Nazwa głośnika
     * @returns {string}
     */
    get name(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Name)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Nazwa koordynatora grupy
     * @returns {string}
     */
    get coordinatorName(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.CoordinatorName)
            .build();
        return this.gate.runScript(cmd!);
    }
}

export {
    Sonos, SonosRaw, SonosRemote, MuteType, PlayModeType
}
