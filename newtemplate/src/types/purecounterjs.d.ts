declare module "@srexi/purecounterjs" {
  interface PureCounterOptions {
    selector?: string;
    start?: number;
    end?: number;
    duration?: number;
    delay?: number;
    once?: boolean;
    pulse?: number;
    decimals?: number;
    legacy?: boolean;
    filesizing?: boolean;
    currency?: boolean;
    separator?: boolean;
  }

  export default class PureCounter {
    constructor(options?: PureCounterOptions);
  }
}
