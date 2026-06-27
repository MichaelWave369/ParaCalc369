import { describe, expect, it } from 'vitest';
import { friendlyErrorMessage } from '../src/errorMessages.js';

describe('friendlyErrorMessage', () => {
  it('clarifies incomplete expressions', () => {
    expect(friendlyErrorMessage(Error('Incomplete expression.'))).toContain('Expression is incomplete');
  });

  it('clarifies mismatched parentheses', () => {
    expect(friendlyErrorMessage(Error('Mismatched parentheses.'))).toContain('Parentheses do not match');
  });

  it('clarifies unknown tokens', () => {
    expect(friendlyErrorMessage(Error('Unknown token: sine'))).toContain('Check the spelling');
  });

  it('clarifies missing x values outside graph mode', () => {
    expect(friendlyErrorMessage(Error('Missing value for x.'))).toContain('Use Graph Mode');
  });

  it('passes through already useful messages', () => {
    expect(friendlyErrorMessage(Error('Cannot divide by zero.'))).toBe('Cannot divide by zero.');
  });
});
