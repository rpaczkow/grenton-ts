# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

```bash
npm run build    # Compile TypeScript to JavaScript (outputs to dist/)
npm run watch    # Watch mode for development
```

## Architecture

This is a TypeScript API library for Grenton smart home hardware modules. The code provides TypeScript wrappers around raw hardware interfaces, enabling type-safe interaction with Grenton devices.

here ended generate objects for clus

### Directory Structure
- Build output is in dist and dist-js folders.
- Files module_*.xml
   - Each hardware module has its own directory taken from <module /> node and @name attribute.
   - Inside each module directory, subfolders use the naming convention `fvXX_YY`.
- Files clu_GATE_ALARM_*.xml
   - wrappers go to src/gate-alarm/<version> directories
   - each version folder contains TS wrapper
   - file with TS wrappers is named gate-alarm.ts   
   - apply same rules for all <clu className="GATE"/> nodes
- Files clu_ZWAVE_2_*.xml
   - wrappers go to src/clu-zwave-2/<version> directories
   - each version folder contains TS wrapper
   - file with TS wrappers is named clu-zwave-2.ts
   - additionally create TS classes in src/clu-zwave-2/<version> folders for /clu/objects nodes. Find proper object_*.xml file, match by /clu/objects/object/@name and /clu/objects/object/@version
   - apply same rules for all clu_ZWAVE_ft*.xml (TS classes for these go to src/clu-zwave/<version>, including the /clu/objects co-location rule above)
- Don't generate TS wrappers for clu_ft*.xml files.

### "latest" Re-export Folder

Each module directory (e.g. `src/analog-module/`) must contain a `latest/index.ts` that re-exports the wrappers from its newest version folder, so consumers can `import * as xxx from '.../analog-module/latest'` without depending on a specific firmware version. See `src/analog-module/latest/index.ts` as the reference example.

- The "newest" version folder is determined by comparing `fvXX_YY[_...]` segments as hex numbers (e.g. `fv0a_00` > `fv09_02`, `fvff_0` > `fv01_0`, `fv1400_02` > `fv1110_02`). For equal segments with non-numeric suffixes (e.g. `_hv1` vs `_hv2`), compare as strings.
- For each `.ts` file in that version folder, add a line `export * as <camelCaseFileName> from '../<version>/<file-without-ext>';`, where `<camelCaseFileName>` is the camelCase form of the file name (e.g. `analog-in.ts` -> `analogIn`).
- Whenever a wrapper is created or updated (new version folder added, or files added/removed/renamed), regenerate/update the corresponding `latest/index.ts` to reflect the new latest version and files.



### Core Pattern

All device wrappers follow the same architectural pattern:

1. **Raw Interface** (`*Raw` classes): Declared interfaces representing the low-level hardware API with methods:
   - `add_event(event: EventType, callback)` - Register event handlers
   - `get(property: PropertyType)` - Read property value method
   - `set(property: PropertyType, value)` - Write property value method
   - `execute(method: MethodType, ...args)` - Execute device methods
   

2. **Wrapper Class**: High-level TypeScript class that:
   - Takes the raw interface in constructor
   - Maintains arrays of callbacks for each event type
   - Registers single handlers on raw interface that dispatch to all registered callbacks
   - Exposes typed methods and properties using enums
   - Contains comments in Polish. Comments are taken from text-resources folder.
   - For every //features/feature node generate wrapper property
      - when attribute set="true" generate property setter.
      - when attributes get="true" generate property getter.
      - when attributes set="true" and get="false" generate property getter and setter.
      - when unit="bool", type="num", range="0-1" check if raw object returns 0 or 1 and convert it to bool.
   - For every //methods/method node generate a wrapper method, regardless of its "call" attribute:
      - call="execute": method calls `raw.execute(MethodType.X, ...args)` (Remote: `.execute().addParameter(MethodType.X)...`)
      - call="set": method calls `raw.set(PropertyType.X, value)` (Remote: `.set().addParameter(PropertyType.X).addParameter(value)...`). This is generated IN ADDITION TO the corresponding feature property setter (//features/feature with set="true") - the two are not mutually exclusive, even though they wrap the same underlying call.
      - call="get": method calls `raw.get(PropertyType.X)` (Remote: `.get().addParameter(PropertyType.X)...`), in addition to the corresponding feature property getter.
      - Method name is the camelCase form of the method's "name" attribute (e.g. SetValue -> setValue).
   - For every <event/> in <events /> node generate event. Event name is in name attribute.

3. **Remote Variant** (`*Remote` classes): For cross-gate communication via `RemoteGate`, uses `rawExecutionBuilderFactory` to build command strings. Remote events are not supported.
   - Contains comments in Polish. Comments are taken from text-resources folder.

### Enums

Each module defines three enum types:
- `EventType`: Hardware events (OnValueChange, OnSwitchOn, etc.)
- `PropertyType`: Readable/writable properties (Value, State, Position, etc.)
- `MethodType`: Executable methods (Switch, MoveUp, Stop, etc.)

Enum values are numeric IDs that map to the firmware API.

### Core Utilities

- `core/remote-gate.ts`: `RemoteGate` class for executing scripts on remote CLUs
- `core/execution-builder.ts`: Builder pattern for constructing remote execution command strings
