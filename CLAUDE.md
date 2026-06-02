# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

```bash
npm run build    # Compile TypeScript to JavaScript (outputs to dist/)
npm run watch    # Watch mode for development
```

## Architecture

This is a TypeScript API library for Grenton smart home hardware modules. The code provides TypeScript wrappers around raw hardware interfaces, enabling type-safe interaction with Grenton devices.

### Directory Structure

Each hardware module has its own directory named after the device type (e.g., `roller-shutter-din-3`, `digital-in-din`, `analog-din`). Inside each module directory, subfolders use the naming convention `fwtype-XX-fwapiver-YY` or `fvXX_YY` to version the firmware type and API version.

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
   - For evenry <feature /> in <features /> node generate wrapper property
      - when attribute set="true" generate property setter.
      - when attributes get="true" generate property getter.
      - when attributes set="true" and get="false" generate property getter and setter.
   - For every <method/> in <methods /> node generate wrapper methods that run raw method. Raw method to run is defined in "call" attribute
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

### Foders
- All GATE class files go to gate folder
- All non GATE class files go to clu folder
