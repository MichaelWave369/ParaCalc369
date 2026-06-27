export const TOOL_EVENTS = {
  formulas: 'paracalc:open-formulas',
  history: 'paracalc:open-history-vault',
  help: 'paracalc:open-keyboard-help',
  expression: 'paracalc:set-expression',
};

export function openTool(tool) {
  const eventName = TOOL_EVENTS[tool];
  if (eventName) window.dispatchEvent(new CustomEvent(eventName));
}

export function insertExpression(expression) {
  window.dispatchEvent(new CustomEvent(TOOL_EVENTS.expression, { detail: { expression } }));
}
