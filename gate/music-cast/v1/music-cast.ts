// Created from: packages/grenton-api/interfaces/object_musiccast_v1.xml, object name="MusicCast" version="1"

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
    OnShuffleChange = 9,
    OnRepeatChange = 10,
    OnPowerChange = 11,
    OnAlbumArtChange = 12,
    OnInputChange = 13,
    OnAutoPowerStandbyChange = 14,
    OnGroupChange = 15
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
    Shuffle = 9,
    Repeat = 10,
    Power = 11,
    AlbumArt = 12,
    ObjectID = 13,
    ServerID = 14,
    Name = 15,
    Role = 16,
    Input = 17,
    AutoPowerStandby = 18
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
    DestroyGroup = 9,
    JoinGroup = 10,
    LeaveGroup = 11,
    SetInput = 12
}

enum MuteType {
    OFF = 0,
    ON = 1
}

enum ShuffleType {
    Off = 1,
    On = 2,
    Songs = 3,
    Albums = 4
}

enum RepeatType {
    Off = 1,
    One = 2,
    All = 3
}

enum PowerType {
    Standby = 0,
    On = 1
}

enum AutoPowerStandbyType {
    OFF = 0,
    ON = 1
}

declare class MusicCastRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface IMusicCast {
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
     * Zdarzenie wywoływane po zmianie wartości Volume, Mute, Artist, Title, State, Shuffle, Repeat, Power, AlbumArt, Input, AutoPowerStandby, ServerID, Role
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
     * Zdarzenie wywoływane po zmianie wartości Shuffle
     * @param callback
     */
    addOnShuffleChange: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po zmianie wartości Repeat
     * @param callback
     */
    addOnRepeatChange: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po zmianie wartości Power
     * @param callback
     */
    addOnPowerChange: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po zmianie wartości AlbumArt
     * @param callback
     */
    addOnAlbumArtChange: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po zmianie wartości Input
     * @param callback
     */
    addOnInputChange: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po zmianie wartości AutoPowerStandby
     * @param callback
     */
    addOnAutoPowerStandbyChange: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po zmianie w obrębie grupy (ServerID, Role)
     * @param callback
     */
    addOnGroupChange: (callback: () => void) => void
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
    /** Rozbija bieżącą grupę głośników */
    destroyGroup: () => void
    /**
     * Dodaje głośnik do grupy określonej przez ServerID
     * @param {string} serverID
     */
    joinGroup: (serverID: string) => void
    /** Usuwa głośnik z bieżącej grupy */
    leaveGroup: () => void
    /**
     * Ustawia źródło odtwarzania
     * @param {string} input
     */
    setInput: (input: string, autoplay?: number) => void
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
     * Ustawia tryb losowego odtwarzania
     * @param {ShuffleType} shuffle
     */
    setShuffle: (shuffle: ShuffleType) => void
    /**
     * Ustawia tryb powtarzania
     * @param {RepeatType} repeat
     */
    setRepeat: (repeat: RepeatType) => void
    /**
     * Ustawia stan zasilania
     * @param {PowerType} power
     */
    setPower: (power: PowerType) => void
    /**
     * Ustawia stan AutoPowerStandby
     * @param {AutoPowerStandbyType} autoPowerStandby
     */
    setAutoPowerStandby: (autoPowerStandby: AutoPowerStandbyType) => void
    /** Adres IP MusicCast */
    host: string
    /** Okres aktualizacji stanu */
    updatePeriod: number
    /** Stan komunikacji z głośnikiem: 0 - brak połączenia, 1 - połączono */
    readonly status: number
    /** Ostatni kod błędu: 0 - brak błędu, wartości ujemne - ujemny kod odpowiedzi HTTP, wartości dotatnie - kod błędu Yamaha Extended Control */
    readonly errorCode: number
    /** Głośność w zakresie od 0% do 100% */
    readonly volume: number
    /** Stan wyciszenia: 0 - wyłączone, 1 - włączone */
    readonly mute: MuteType
    /** Nazwa autora */
    readonly artist: string
    /** Tytuł utworu */
    readonly title: string
    /** Stan odtwarzania: 1 - odtwarzanie, 2 - zatrzymane, 3 - pauza */
    readonly state: number
    /** Tryb odtwarzania losowego: 1 - wyłączone, 2 - włączone, 3 - utwory, 4 - albumy */
    readonly shuffle: ShuffleType
    /** Tryb powtarzania: 1 - wyłączone, 2 - jeden utwór, 3 - wszystkie utwory */
    readonly repeat: RepeatType
    /** Stan zasilania: 0 - uśpienie, 1 - włączone */
    readonly power: PowerType
    /** Adres okładki albumu */
    readonly albumArt: string
    /** ID obiektu */
    readonly objectID: string
    /** ID obiektu serwera grupy */
    readonly serverID: string
    /** Nazwa głośnika */
    readonly name: string
    /** Rola głośnika w grupie: 1 - nie jest częścią grupy, 2 - klient, 3 - serwer */
    readonly role: number
    /** Źródło odtwarzania */
    readonly input: string
    /** Stan automatycznego uśpienia: 0 - wyłączone, 1 - włączone */
    readonly autoPowerStandby: AutoPowerStandbyType
}

class MusicCast implements IMusicCast {
    private onConnectedCallbacks: Array<() => void> = [];
    private onDisconnectedCallbacks: Array<() => void> = [];
    private onErrorCallbacks: Array<() => void> = [];
    private onChangeCallbacks: Array<() => void> = [];
    private onMuteChangeCallbacks: Array<() => void> = [];
    private onVolumeChangeCallbacks: Array<() => void> = [];
    private onTitleChangeCallbacks: Array<() => void> = [];
    private onArtistChangeCallbacks: Array<() => void> = [];
    private onStateChangeCallbacks: Array<() => void> = [];
    private onShuffleChangeCallbacks: Array<() => void> = [];
    private onRepeatChangeCallbacks: Array<() => void> = [];
    private onPowerChangeCallbacks: Array<() => void> = [];
    private onAlbumArtChangeCallbacks: Array<() => void> = [];
    private onInputChangeCallbacks: Array<() => void> = [];
    private onAutoPowerStandbyChangeCallbacks: Array<() => void> = [];
    private onGroupChangeCallbacks: Array<() => void> = [];

    constructor(private raw: MusicCastRaw) {
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
        this.raw.add_event(EventType.OnShuffleChange, () => {
            this.onShuffleChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnRepeatChange, () => {
            this.onRepeatChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnPowerChange, () => {
            this.onPowerChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnAlbumArtChange, () => {
            this.onAlbumArtChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnInputChange, () => {
            this.onInputChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnAutoPowerStandbyChange, () => {
            this.onAutoPowerStandbyChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnGroupChange, () => {
            this.onGroupChangeCallbacks.forEach(callback => { callback(); });
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
     * Zdarzenie wywoływane po zmianie wartości Volume, Mute, Artist, Title, State, Shuffle, Repeat, Power, AlbumArt, Input, AutoPowerStandby, ServerID, Role
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
     * Zdarzenie wywoływane po zmianie wartości Shuffle
     * @param callback
     */
    addOnShuffleChange(callback: () => void): void {
        this.onShuffleChangeCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po zmianie wartości Repeat
     * @param callback
     */
    addOnRepeatChange(callback: () => void): void {
        this.onRepeatChangeCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po zmianie wartości Power
     * @param callback
     */
    addOnPowerChange(callback: () => void): void {
        this.onPowerChangeCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po zmianie wartości AlbumArt
     * @param callback
     */
    addOnAlbumArtChange(callback: () => void): void {
        this.onAlbumArtChangeCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po zmianie wartości Input
     * @param callback
     */
    addOnInputChange(callback: () => void): void {
        this.onInputChangeCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po zmianie wartości AutoPowerStandby
     * @param callback
     */
    addOnAutoPowerStandbyChange(callback: () => void): void {
        this.onAutoPowerStandbyChangeCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po zmianie w obrębie grupy (ServerID, Role)
     * @param callback
     */
    addOnGroupChange(callback: () => void): void {
        this.onGroupChangeCallbacks.push(callback);
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
    /** Rozbija bieżącą grupę głośników */
    destroyGroup(): void {
        this.raw.execute(MethodType.DestroyGroup);
    }
    /**
     * Dodaje głośnik do grupy określonej przez ServerID
     * @param {string} serverID
     */
    joinGroup(serverID: string): void {
        this.raw.execute(MethodType.JoinGroup, serverID);
    }
    /** Usuwa głośnik z bieżącej grupy */
    leaveGroup(): void {
        this.raw.execute(MethodType.LeaveGroup);
    }
    /**
     * Ustawia źródło odtwarzania
     * @param {string} input
     */
    setInput(input: string, autoplay?: number): void {
        this.raw.execute(MethodType.SetInput, input, autoplay);
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
     * Ustawia tryb losowego odtwarzania
     * @param {ShuffleType} shuffle
     */
    setShuffle(shuffle: ShuffleType): void {
        this.raw.set(PropertyType.Shuffle, shuffle);
    }
    /**
     * Ustawia tryb powtarzania
     * @param {RepeatType} repeat
     */
    setRepeat(repeat: RepeatType): void {
        this.raw.set(PropertyType.Repeat, repeat);
    }
    /**
     * Ustawia stan zasilania
     * @param {PowerType} power
     */
    setPower(power: PowerType): void {
        this.raw.set(PropertyType.Power, power);
    }
    /**
     * Ustawia stan AutoPowerStandby
     * @param {AutoPowerStandbyType} autoPowerStandby
     */
    setAutoPowerStandby(autoPowerStandby: AutoPowerStandbyType): void {
        this.raw.set(PropertyType.AutoPowerStandby, autoPowerStandby);
    }
    /**
     * Adres IP MusicCast
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
     * Ostatni kod błędu: 0 - brak błędu, wartości ujemne - ujemny kod odpowiedzi HTTP, wartości dotatnie - kod błędu Yamaha Extended Control
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
     * Stan wyciszenia: 0 - wyłączone, 1 - włączone
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
     * Stan odtwarzania: 1 - odtwarzanie, 2 - zatrzymane, 3 - pauza
     * @returns {number}
     */
    get state(): number {
        return this.raw.get(PropertyType.State);
    }
    /**
     * Tryb odtwarzania losowego: 1 - wyłączone, 2 - włączone, 3 - utwory, 4 - albumy
     * @returns {ShuffleType}
     */
    get shuffle(): ShuffleType {
        return this.raw.get(PropertyType.Shuffle);
    }
    /**
     * Tryb powtarzania: 1 - wyłączone, 2 - jeden utwór, 3 - wszystkie utwory
     * @returns {RepeatType}
     */
    get repeat(): RepeatType {
        return this.raw.get(PropertyType.Repeat);
    }
    /**
     * Stan zasilania: 0 - uśpienie, 1 - włączone
     * @returns {PowerType}
     */
    get power(): PowerType {
        return this.raw.get(PropertyType.Power);
    }
    /**
     * Adres okładki albumu
     * @returns {string}
     */
    get albumArt(): string {
        return this.raw.get(PropertyType.AlbumArt);
    }
    /**
     * ID obiektu
     * @returns {string}
     */
    get objectID(): string {
        return this.raw.get(PropertyType.ObjectID);
    }
    /**
     * ID obiektu serwera grupy
     * @returns {string}
     */
    get serverID(): string {
        return this.raw.get(PropertyType.ServerID);
    }
    /**
     * Nazwa głośnika
     * @returns {string}
     */
    get name(): string {
        return this.raw.get(PropertyType.Name);
    }
    /**
     * Rola głośnika w grupie: 1 - nie jest częścią grupy, 2 - klient, 3 - serwer
     * @returns {number}
     */
    get role(): number {
        return this.raw.get(PropertyType.Role);
    }
    /**
     * Źródło odtwarzania
     * @returns {string}
     */
    get input(): string {
        return this.raw.get(PropertyType.Input);
    }
    /**
     * Stan automatycznego uśpienia: 0 - wyłączone, 1 - włączone
     * @returns {AutoPowerStandbyType}
     */
    get autoPowerStandby(): AutoPowerStandbyType {
        return this.raw.get(PropertyType.AutoPowerStandby);
    }
}

class MusicCastRemote implements IMusicCast {
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
     * Zdarzenie wywoływane po zmianie wartości Volume, Mute, Artist, Title, State, Shuffle, Repeat, Power, AlbumArt, Input, AutoPowerStandby, ServerID, Role
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
     * Zdarzenie wywoływane po zmianie wartości Shuffle
     * @param callback
     */
    addOnShuffleChange(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane po zmianie wartości Repeat
     * @param callback
     */
    addOnRepeatChange(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane po zmianie wartości Power
     * @param callback
     */
    addOnPowerChange(_callback: () => void): void {
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
     * Zdarzenie wywoływane po zmianie wartości Input
     * @param callback
     */
    addOnInputChange(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane po zmianie wartości AutoPowerStandby
     * @param callback
     */
    addOnAutoPowerStandbyChange(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane po zmianie w obrębie grupy (ServerID, Role)
     * @param callback
     */
    addOnGroupChange(_callback: () => void): void {
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

    /** Rozbija bieżącą grupę głośników */
    destroyGroup(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.DestroyGroup)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Dodaje głośnik do grupy określonej przez ServerID
     * @param {string} serverID
     */
    joinGroup(serverID: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.JoinGroup)
            .addParameter(serverID)
            .build();
        this.gate.runScript(cmd!);
    }

    /** Usuwa głośnik z bieżącej grupy */
    leaveGroup(): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.LeaveGroup)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Ustawia źródło odtwarzania
     * @param {string} input
     */
    setInput(input: string, autoplay?: number): void {
        const builder = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.SetInput)
            .addParameter(input);

        if(autoplay !== undefined) {
            builder.addParameter(autoplay);
        }

        const cmd: string | null = builder.build();
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
     * Ustawia tryb losowego odtwarzania
     * @param {ShuffleType} shuffle
     */
    setShuffle(shuffle: ShuffleType): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Shuffle)
            .addParameter(shuffle)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Ustawia tryb powtarzania
     * @param {RepeatType} repeat
     */
    setRepeat(repeat: RepeatType): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Repeat)
            .addParameter(repeat)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Ustawia stan zasilania
     * @param {PowerType} power
     */
    setPower(power: PowerType): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Power)
            .addParameter(power)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Ustawia stan AutoPowerStandby
     * @param {AutoPowerStandbyType} autoPowerStandby
     */
    setAutoPowerStandby(autoPowerStandby: AutoPowerStandbyType): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.AutoPowerStandby)
            .addParameter(autoPowerStandby)
            .build();
        this.gate.runScript(cmd!);
    }

    /**
     * Adres IP MusicCast
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
     * Ostatni kod błędu: 0 - brak błędu, wartości ujemne - ujemny kod odpowiedzi HTTP, wartości dotatnie - kod błędu Yamaha Extended Control
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
     * Stan wyciszenia: 0 - wyłączone, 1 - włączone
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
     * Stan odtwarzania: 1 - odtwarzanie, 2 - zatrzymane, 3 - pauza
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
     * Tryb odtwarzania losowego: 1 - wyłączone, 2 - włączone, 3 - utwory, 4 - albumy
     * @returns {ShuffleType}
     */
    get shuffle(): ShuffleType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Shuffle)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Tryb powtarzania: 1 - wyłączone, 2 - jeden utwór, 3 - wszystkie utwory
     * @returns {RepeatType}
     */
    get repeat(): RepeatType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Repeat)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Stan zasilania: 0 - uśpienie, 1 - włączone
     * @returns {PowerType}
     */
    get power(): PowerType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Power)
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
     * ID obiektu
     * @returns {string}
     */
    get objectID(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.ObjectID)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * ID obiektu serwera grupy
     * @returns {string}
     */
    get serverID(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.ServerID)
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
     * Rola głośnika w grupie: 1 - nie jest częścią grupy, 2 - klient, 3 - serwer
     * @returns {number}
     */
    get role(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Role)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Źródło odtwarzania
     * @returns {string}
     */
    get input(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Input)
            .build();
        return this.gate.runScript(cmd!);
    }

    /**
     * Stan automatycznego uśpienia: 0 - wyłączone, 1 - włączone
     * @returns {AutoPowerStandbyType}
     */
    get autoPowerStandby(): AutoPowerStandbyType {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.AutoPowerStandby)
            .build();
        return this.gate.runScript(cmd!);
    }
}

export {
    MusicCast, MusicCastRaw, MusicCastRemote, MuteType, ShuffleType, RepeatType, PowerType, AutoPowerStandbyType
}
