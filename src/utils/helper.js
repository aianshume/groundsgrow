// `undefined` can possibly be replaced by something else.
export const UNDEFINED = {}[0];
export const isUndefined = (v) => v === UNDEFINED;
// eslint-disable-next-line @typescript-eslint/ban-types
export const isFunction = (v) => typeof v === "function";
// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {};
export const mergeObjects = (a, b) => ({ ...a, ...b });
