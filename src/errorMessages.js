export function friendlyErrorMessage(error) {
  const message = typeof error === 'string' ? error : error?.message || 'Something went wrong.';
  if (message === 'Incomplete expression.') return 'Expression is incomplete. Add the missing number, operator, or closing value.';
  if (message === 'Mismatched parentheses.') return 'Parentheses do not match. Add or remove a parenthesis.';
  if (message.startsWith('Unknown token:')) return `${message} Check the spelling or use a supported function.`;
  if (message.startsWith('Unsupported character:')) return `${message} Try standard calculator symbols.`;
  if (message.startsWith('Missing value for x.')) return 'This expression uses x. Use Graph Mode or replace x with a number.';
  if (message === 'Result is not finite.') return 'Result is not finite. Check for overflow or an undefined operation.';
  return message;
}
