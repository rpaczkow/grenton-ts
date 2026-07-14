// Created from: src/interfaces/object_heos_v1.xml, object name="HEOS" version="1"

import { rawExecutionBuilderFactory } from "../../core/execution-builder"
import { RemoteGate } from "../../core/remote-gate"

enum EventType {
    OnConnected = 0,
    OnDisconnected = 1,
    OnError = 2,
    OnChange = 3,
    OnMuteChange = 4,
    OnVolumeChange = 5,
    OnTitleChange = 6,
    OnArtistChange = 7,
    OnPlayerStateChange = 8,
    OnShuffleChange = 9,
    OnRepeatChange = 10,
    OnAlbumArtChange = 11,
    OnSourceChange = 12,
    OnGroupChange = 13,
    OnPlaybackError = 14,
    OnClipEnd = 15,
}

enum PropertyType {
    Host = 0,
    UserName = 1,
    Password = 2,
    Status = 3,
    ErrorCode = 4,
    Volume = 5,
    Mute = 6,
    Artist = 7,
    Title = 8,
    PlayerState = 9,
    Shuffle = 10,
    Repeat = 11,
    AlbumArt = 12,
    ObjectID = 13,
    GroupID = 14,
    Name = 15,
    SourceName = 16,
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
    AddToGroup = 9,
    DestroyGroup = 10,
    PlayPresetStation = 11,
    PlayInputSource = 12,
    PlayUrl = 13,
    PlayUSB = 14,
    PlayUSBClip = 15,
}

enum MuteType {
    Off = 0,
    On = 1,
}

enum ShuffleType {
    Off = 0,
    On = 1,
}

enum RepeatType {
    Off = 0,
    OnOne = 1,
    OnAll = 2,
}

declare class HEOSRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}

interface IHEOS {
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
     * Zdarzenie wywoływane po zmianie wartości Mute, Volume, Title, Artist, PlayerState, Shuffle, Repeat, AlbumArt, SourceName lub GroupID
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
     * Zdarzenie wywoływane po zmianie wartości PlayerState
     * @param callback
     */
    addOnPlayerStateChange: (callback: () => void) => void
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
     * Zdarzenie wywoływane po zmianie wartości AlbumArt
     * @param callback
     */
    addOnAlbumArtChange: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po zmianie wartości SourceName
     * @param callback
     */
    addOnSourceChange: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po zmianie wartości GroupID
     * @param callback
     */
    addOnGroupChange: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po wystąpieniu błędu odtwarzania
     * @param callback
     */
    addOnPlaybackError: (callback: () => void) => void
    /**
     * Zdarzenie wywoływane po zakończeniu odtwarzania rozpoczętego przy pomocy PlayUSBClip
     * @param callback
     */
    addOnClipEnd: (callback: () => void) => void
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
     * @param      * @param {number} volumeStep
     */
    volumeUp: (volumeStep: number) => void
    /**
     * Zmniejsza głośność o wartość określoną w procentach
     * @param      * @param {number} volumeStep
     */
    volumeDown: (volumeStep: number) => void
    /** Przełącza stan wyciszenia */
    switchMute: () => void
    /** Przełącza stan odtwarzania pomiędzy pauzą, a odtwarzaniem */
    switchPlay: () => void
    /**
     * Dodaje głośnik określony przez ObjectID do grupy bieżącego głośnika
     * @param      * @param {string} id
     */
    addToGroup: (id: string) => void
    /** Rozbija bieżącą grupę głośników */
    destroyGroup: () => void
    /**
     * Odtwarza stację/utwór określony na liście ulubionych w aplikacji HEOS
     * @param      * @param {number} id
     */
    playPresetStation: (id: number) => void
    /**
     * Ustawia fizyczne źródło odtwarzania o podanej nazwie, zgodnie z dokumentacją HEOS, np. "inputs/aux1"
     * @param      * @param {string} source
     */
    playInputSource: (source: string) => void
    /**
     * Odtwarza strumień wskazany przy pomocy adresu url
     * @param      * @param {string} url
     */
    playUrl: (url: string) => void
    /**
     * Odtwarza plik audio z nośnika USB za pomocą pełnej ścieżki pliku wraz z rozszerzeniem np. "komunikaty/wyciek.mp3"
     * @param      * @param {string} path
     * @param {number} action
     */
    playUSB: (path: string, action: number) => void
    /**
     * Odtwarza plik audio z nośnika USB za pomocą pełnej ścieżki pliku wraz z rozszerzeniem np. "komunikaty/wyciek.mp3", w przypadku wywołania pliku audio podczas odtwarzania kolejki/stacji opcjonalnie przywraca poprzednie odtwarzanie
     * @param      * @param {string} path
     * @param {number} restartNowPlaying
     */
    playUSBClip: (path: string, restartNowPlaying: number) => void
    /**
     * Ustawia adres IP Sonos
     * @param {string} host
     */
    setHost: (host: string) => void
    /**
     * Ustawia nazwę użytkownika
     * @param {string} userName
     */
    setUserName: (userName: string) => void
    /**
     * Ustawia hasło
     * @param {string} password
     */
    setPassword: (password: string) => void
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
    /** Adres IP HEOS */
    host: string
    /** Nazwa użytkownika */
    userName: string
    /** Hasło */
    password: string
    /** Stan komunikacji z głośnikiem:  0 - brak połączenia,  1 - połączono */
    readonly status: number
    /** Ostatni kod błędu HEOS CLI */
    readonly errorCode: number
    /** Głośność w zakresie od 0% do 100% */
    readonly volume: number
    /** Stan wyciszenia:  0 - wyłączone,  1 - włączone */
    readonly mute: MuteType
    /** Nazwa autora */
    readonly artist: string
    /** Tytuł utworu */
    readonly title: string
    /** Stan odtwarzania:  0 - zatrzymane,  1 - pauza,  2 - odtwarzanie */
    readonly playerState: number
    /** Tryb odtwarzania losowego:  0 - wyłączone,  1 - włączone */
    readonly shuffle: ShuffleType
    /** Tryb powtarzania:  0 - wyłączone,  1 - jeden utwór,  2 - wszystkie utwory */
    readonly repeat: RepeatType
    /** Adres okładki albumu */
    readonly albumArt: string
    /** ID obiektu */
    readonly objectID: string
    /** ID obiektu lidera grupy */
    readonly groupID: string
    /** Nazwa głośnika */
    readonly name: string
    /** Źródło odtwarzania */
    readonly sourceName: string
}

class HEOS implements IHEOS {
    private onConnectedCallbacks: Array<() => void> = [];
    private onDisconnectedCallbacks: Array<() => void> = [];
    private onErrorCallbacks: Array<() => void> = [];
    private onChangeCallbacks: Array<() => void> = [];
    private onMuteChangeCallbacks: Array<() => void> = [];
    private onVolumeChangeCallbacks: Array<() => void> = [];
    private onTitleChangeCallbacks: Array<() => void> = [];
    private onArtistChangeCallbacks: Array<() => void> = [];
    private onPlayerStateChangeCallbacks: Array<() => void> = [];
    private onShuffleChangeCallbacks: Array<() => void> = [];
    private onRepeatChangeCallbacks: Array<() => void> = [];
    private onAlbumArtChangeCallbacks: Array<() => void> = [];
    private onSourceChangeCallbacks: Array<() => void> = [];
    private onGroupChangeCallbacks: Array<() => void> = [];
    private onPlaybackErrorCallbacks: Array<() => void> = [];
    private onClipEndCallbacks: Array<() => void> = [];

    constructor(private raw: HEOSRaw) {
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
        this.raw.add_event(EventType.OnPlayerStateChange, () => {
            this.onPlayerStateChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnShuffleChange, () => {
            this.onShuffleChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnRepeatChange, () => {
            this.onRepeatChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnAlbumArtChange, () => {
            this.onAlbumArtChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnSourceChange, () => {
            this.onSourceChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnGroupChange, () => {
            this.onGroupChangeCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnPlaybackError, () => {
            this.onPlaybackErrorCallbacks.forEach(callback => { callback(); });
        });
        this.raw.add_event(EventType.OnClipEnd, () => {
            this.onClipEndCallbacks.forEach(callback => { callback(); });
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
     * Zdarzenie wywoływane po zmianie wartości Mute, Volume, Title, Artist, PlayerState, Shuffle, Repeat, AlbumArt, SourceName lub GroupID
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
     * Zdarzenie wywoływane po zmianie wartości PlayerState
     * @param callback
     */
    addOnPlayerStateChange(callback: () => void): void {
        this.onPlayerStateChangeCallbacks.push(callback);
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
     * Zdarzenie wywoływane po zmianie wartości AlbumArt
     * @param callback
     */
    addOnAlbumArtChange(callback: () => void): void {
        this.onAlbumArtChangeCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po zmianie wartości SourceName
     * @param callback
     */
    addOnSourceChange(callback: () => void): void {
        this.onSourceChangeCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po zmianie wartości GroupID
     * @param callback
     */
    addOnGroupChange(callback: () => void): void {
        this.onGroupChangeCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po wystąpieniu błędu odtwarzania
     * @param callback
     */
    addOnPlaybackError(callback: () => void): void {
        this.onPlaybackErrorCallbacks.push(callback);
    }
    /**
     * Zdarzenie wywoływane po zakończeniu odtwarzania rozpoczętego przy pomocy PlayUSBClip
     * @param callback
     */
    addOnClipEnd(callback: () => void): void {
        this.onClipEndCallbacks.push(callback);
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
     * @param      * @param {number} volumeStep
     */
    volumeUp(volumeStep: number): void {
        this.raw.execute(MethodType.VolumeUp, volumeStep);
    }
    /**
     * Zmniejsza głośność o wartość określoną w procentach
     * @param      * @param {number} volumeStep
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
    /**
     * Dodaje głośnik określony przez ObjectID do grupy bieżącego głośnika
     * @param      * @param {string} id
     */
    addToGroup(id: string): void {
        this.raw.execute(MethodType.AddToGroup, id);
    }
    /** Rozbija bieżącą grupę głośników */
    destroyGroup(): void {
        this.raw.execute(MethodType.DestroyGroup);
    }
    /**
     * Odtwarza stację/utwór określony na liście ulubionych w aplikacji HEOS
     * @param      * @param {number} id
     */
    playPresetStation(id: number): void {
        this.raw.execute(MethodType.PlayPresetStation, id);
    }
    /**
     * Ustawia fizyczne źródło odtwarzania o podanej nazwie, zgodnie z dokumentacją HEOS, np. "inputs/aux1"
     * @param      * @param {string} source
     */
    playInputSource(source: string): void {
        this.raw.execute(MethodType.PlayInputSource, source);
    }
    /**
     * Odtwarza strumień wskazany przy pomocy adresu url
     * @param      * @param {string} url
     */
    playUrl(url: string): void {
        this.raw.execute(MethodType.PlayUrl, url);
    }
    /**
     * Odtwarza plik audio z nośnika USB za pomocą pełnej ścieżki pliku wraz z rozszerzeniem np. "komunikaty/wyciek.mp3"
     * @param      * @param {string} path
     * @param {number} action
     */
    playUSB(path: string, action: number): void {
        this.raw.execute(MethodType.PlayUSB, path, action);
    }
    /**
     * Odtwarza plik audio z nośnika USB za pomocą pełnej ścieżki pliku wraz z rozszerzeniem np. "komunikaty/wyciek.mp3", w przypadku wywołania pliku audio podczas odtwarzania kolejki/stacji opcjonalnie przywraca poprzednie odtwarzanie
     * @param      * @param {string} path
     * @param {number} restartNowPlaying
     */
    playUSBClip(path: string, restartNowPlaying: number): void {
        this.raw.execute(MethodType.PlayUSBClip, path, restartNowPlaying);
    }
    /**
     * Ustawia adres IP Sonos
     * @param {string} host
     */
    setHost(host: string): void {
        this.raw.set(PropertyType.Host, host);
    }
    /**
     * Ustawia nazwę użytkownika
     * @param {string} userName
     */
    setUserName(userName: string): void {
        this.raw.set(PropertyType.UserName, userName);
    }
    /**
     * Ustawia hasło
     * @param {string} password
     */
    setPassword(password: string): void {
        this.raw.set(PropertyType.Password, password);
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
     * Adres IP HEOS
     * @returns {string}
     */
    get host(): string {
        return this.raw.get(PropertyType.Host);
    }
    set host(value: string) {
        this.raw.set(PropertyType.Host, value);
    }
    /**
     * Nazwa użytkownika
     * @returns {string}
     */
    get userName(): string {
        return this.raw.get(PropertyType.UserName);
    }
    set userName(value: string) {
        this.raw.set(PropertyType.UserName, value);
    }
    /**
     * Hasło
     * @returns {string}
     */
    get password(): string {
        return this.raw.get(PropertyType.Password);
    }
    set password(value: string) {
        this.raw.set(PropertyType.Password, value);
    }
    /**
     * Stan komunikacji z głośnikiem:  0 - brak połączenia,  1 - połączono
     * @returns {number}
     */
    get status(): number {
        return this.raw.get(PropertyType.Status);
    }
    /**
     * Ostatni kod błędu HEOS CLI
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
     * Stan wyciszenia:  0 - wyłączone,  1 - włączone
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
     * Stan odtwarzania:  0 - zatrzymane,  1 - pauza,  2 - odtwarzanie
     * @returns {number}
     */
    get playerState(): number {
        return this.raw.get(PropertyType.PlayerState);
    }
    /**
     * Tryb odtwarzania losowego:  0 - wyłączone,  1 - włączone
     * @returns {ShuffleType}
     */
    get shuffle(): ShuffleType {
        return this.raw.get(PropertyType.Shuffle);
    }
    /**
     * Tryb powtarzania:  0 - wyłączone,  1 - jeden utwór,  2 - wszystkie utwory
     * @returns {RepeatType}
     */
    get repeat(): RepeatType {
        return this.raw.get(PropertyType.Repeat);
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
     * ID obiektu lidera grupy
     * @returns {string}
     */
    get groupID(): string {
        return this.raw.get(PropertyType.GroupID);
    }
    /**
     * Nazwa głośnika
     * @returns {string}
     */
    get name(): string {
        return this.raw.get(PropertyType.Name);
    }
    /**
     * Źródło odtwarzania
     * @returns {string}
     */
    get sourceName(): string {
        return this.raw.get(PropertyType.SourceName);
    }
}

class HEOSRemote implements IHEOS {
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
     * Zdarzenie wywoływane po zmianie wartości Mute, Volume, Title, Artist, PlayerState, Shuffle, Repeat, AlbumArt, SourceName lub GroupID
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
     * Zdarzenie wywoływane po zmianie wartości PlayerState
     * @param callback
     */
    addOnPlayerStateChange(_callback: () => void): void {
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
     * Zdarzenie wywoływane po zmianie wartości AlbumArt
     * @param callback
     */
    addOnAlbumArtChange(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane po zmianie wartości SourceName
     * @param callback
     */
    addOnSourceChange(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane po zmianie wartości GroupID
     * @param callback
     */
    addOnGroupChange(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane po wystąpieniu błędu odtwarzania
     * @param callback
     */
    addOnPlaybackError(_callback: () => void): void {
        // Remote events are not supported
    }
    /**
     * Zdarzenie wywoływane po zakończeniu odtwarzania rozpoczętego przy pomocy PlayUSBClip
     * @param callback
     */
    addOnClipEnd(_callback: () => void): void {
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
     * @param      * @param {number} volumeStep
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
     * @param      * @param {number} volumeStep
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
    /**
     * Dodaje głośnik określony przez ObjectID do grupy bieżącego głośnika
     * @param      * @param {string} id
     */
    addToGroup(id: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.AddToGroup)
            .addParameter(id)
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
     * Odtwarza stację/utwór określony na liście ulubionych w aplikacji HEOS
     * @param      * @param {number} id
     */
    playPresetStation(id: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.PlayPresetStation)
            .addParameter(id)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Ustawia fizyczne źródło odtwarzania o podanej nazwie, zgodnie z dokumentacją HEOS, np. "inputs/aux1"
     * @param      * @param {string} source
     */
    playInputSource(source: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.PlayInputSource)
            .addParameter(source)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Odtwarza strumień wskazany przy pomocy adresu url
     * @param      * @param {string} url
     */
    playUrl(url: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.PlayUrl)
            .addParameter(url)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Odtwarza plik audio z nośnika USB za pomocą pełnej ścieżki pliku wraz z rozszerzeniem np. "komunikaty/wyciek.mp3"
     * @param      * @param {string} path
     * @param {number} action
     */
    playUSB(path: string, action: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.PlayUSB)
            .addParameter(path)
            .addParameter(action)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Odtwarza plik audio z nośnika USB za pomocą pełnej ścieżki pliku wraz z rozszerzeniem np. "komunikaty/wyciek.mp3", w przypadku wywołania pliku audio podczas odtwarzania kolejki/stacji opcjonalnie przywraca poprzednie odtwarzanie
     * @param      * @param {string} path
     * @param {number} restartNowPlaying
     */
    playUSBClip(path: string, restartNowPlaying: number): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .execute()
            .addParameter(MethodType.PlayUSBClip)
            .addParameter(path)
            .addParameter(restartNowPlaying)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Ustawia adres IP Sonos
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
     * Ustawia nazwę użytkownika
     * @param {string} userName
     */
    setUserName(userName: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.UserName)
            .addParameter(userName)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Ustawia hasło
     * @param {string} password
     */
    setPassword(password: string): void {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Password)
            .addParameter(password)
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
     * Adres IP HEOS
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
     * Nazwa użytkownika
     * @returns {string}
     */
    get userName(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.UserName)
            .build();
        return this.gate.runScript(cmd!);
    }
    set userName(value: string) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.UserName)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Hasło
     * @returns {string}
     */
    get password(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.Password)
            .build();
        return this.gate.runScript(cmd!);
    }
    set password(value: string) {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .set()
            .addParameter(PropertyType.Password)
            .addParameter(value)
            .build();
        this.gate.runScript(cmd!);
    }
    /**
     * Stan komunikacji z głośnikiem:  0 - brak połączenia,  1 - połączono
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
     * Ostatni kod błędu HEOS CLI
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
     * Stan wyciszenia:  0 - wyłączone,  1 - włączone
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
     * Stan odtwarzania:  0 - zatrzymane,  1 - pauza,  2 - odtwarzanie
     * @returns {number}
     */
    get playerState(): number {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.PlayerState)
            .build();
        return this.gate.runScript(cmd!);
    }
    /**
     * Tryb odtwarzania losowego:  0 - wyłączone,  1 - włączone
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
     * Tryb powtarzania:  0 - wyłączone,  1 - jeden utwór,  2 - wszystkie utwory
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
     * ID obiektu lidera grupy
     * @returns {string}
     */
    get groupID(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.GroupID)
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
     * Źródło odtwarzania
     * @returns {string}
     */
    get sourceName(): string {
        const cmd: string | null = rawExecutionBuilderFactory(this.objectName)
            .get()
            .addParameter(PropertyType.SourceName)
            .build();
        return this.gate.runScript(cmd!);
    }
}

export { HEOS, HEOSRaw, HEOSRemote, MuteType, ShuffleType, RepeatType }
