# grenton-ts

TypeScript API library for [Grenton](https://grenton.com) smart home hardware modules. Provides type-safe wrappers around the low-level Grenton hardware interfaces, making it easier to interact with Grenton devices in TypeScript projects.

## Overview

Grenton devices expose a raw Lua-based API. This library wraps those raw interfaces with typed TypeScript classes, giving you:

- **Typed properties** with getters/setters
- **Typed events** with callback registration
- **Typed methods** for executing device commands
- **Remote variants** for cross-gate (CLU-to-CLU) communication



Each hardware module directory contains firmware-versioned subdirectories (e.g. `fv03_02`) so multiple firmware versions of the same module can coexist.

## Architecture

Every module follows the same three-layer pattern:

### 1. Raw Interface (`*Raw`)

A `declare class` mirroring the low-level hardware API:

```typescript
declare class RollerShutterRaw {
    add_event(event: EventType, callback: () => void): void;
    get(property: PropertyType): any;
    set(property: PropertyType, value: any): void;
    execute(method: MethodType, ...args: any[]): any;
}
```

### 2. Wrapper Class

A high-level class that takes the raw interface in its constructor and exposes typed methods, properties, and event registration:

```typescript
import { RollerShutter, RollerShutterRaw } from './roller-shutter-din-3/fv03_02/roller-shutter';

const shutter = new RollerShutter(rawRollerShutter);

// Events
shutter.addOnPositionChange(() => {
    console.log('Position:', shutter.position);
});

// Methods
shutter.moveUp(5000);     // move up for 5 seconds
shutter.setPosition(50);  // set to 50% open

// Properties
logInfo(shutter.state);    // StateType enum value
logInfo(shutter.position); // number (0–100)
shutter.maxTime = 30000;       // read/write property
```

### 3. Remote Variant (`*Remote`)

For controlling devices on a different CLU via `RemoteGate`. Uses `rawExecutionBuilderFactory` to build command strings sent over the gate. Remote events are not supported.

```typescript
import { RollerShutterRemote } from './roller-shutter-din-3/fv03_02/roller-shutter';
import { RemoteGate } from './core/remote-gate';

const gate = new RemoteGate(rawRemoteGate);
const shutter = new RollerShutterRemote('ROLLER_SHUTTER_1', gate);

shutter.moveUp(5000);
shutter.setPosition(75);
```


## Build

```bash
npm run build   # compile TypeScript → dist/
npm run watch   # watch mode
```

Requires Node.js with TypeScript 5.x (`devDependency`). Compiled output goes to `dist/`.

## License

MIT
