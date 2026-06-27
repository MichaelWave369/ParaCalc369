import { describe, expect, it } from 'vitest';
import { TOOL_EVENTS } from '../src/toolDockEvents.js';

describe('tool dock events', () => {
  it('defines stable event names for dock-opened tools', () => {
    expect(TOOL_EVENTS.formulas).toBe('paracalc:open-formulas');
    expect(TOOL_EVENTS.history).toBe('paracalc:open-history-vault');
    expect(TOOL_EVENTS.help).toBe('paracalc:open-keyboard-help');
    expect(TOOL_EVENTS.expression).toBe('paracalc:set-expression');
  });
});
