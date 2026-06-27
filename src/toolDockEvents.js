export const TOOL_EVENTS = {
  formulas: 'paracalc:open-formulas',
  history: 'paracalc:open-history-vault',
  help: 'paracalc:open-keyboard-help',
};

export function openTool(tool) {
  const eventName = TOOL_EVENTS[tool];
  if (eventName) window.dispatchEvent(new CustomEvent(eventName));
}
