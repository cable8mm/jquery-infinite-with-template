declare namespace JQuery {
  interface InfiniteTemplateOptions {
    /** jsRender template selector (required) */
    templateSelector: string;

    /** URL to load more data via AJAX (required) */
    dataPath: string;

    /** Additional query parameters (optional) */
    query?: string;

    /** Key for data array in JSON response (default: "data") */
    key?: string;

    /** HTTP method (default: "GET") */
    method?: string;

    /** Helper data to merge with each item (optional) */
    templateHelpers?: Record<string, any>;

    /** Load data on initialization (default: true) */
    loadAtStart?: boolean;

    /** Selector for click-to-load button (optional) */
    loadSelector?: string;

    /** Initial page number (default: 1) */
    initialPage?: number;

    /** Add timestamp to prevent caching (default: false) */
    preventCache?: boolean;

    /** Callback when no data returned (optional) */
    zeroCallback?: () => void;

    /** Callback on AJAX/JSON error (optional) */
    errorCallback?: (error: any) => void;

    /** Callback when loading starts (optional) */
    loadingCallback?: () => void;

    /** Callback when loading completes (optional) */
    loadedCallback?: () => void;

    /** Scroll threshold multiplier (default: 2) */
    scrollThreshold?: number;
  }

  interface InfiniteTemplateStatic {
    (options: InfiniteTemplateOptions): JQuery;
    defaults: InfiniteTemplateOptions;
  }

  interface JQuery {
    infiniteTemplate: InfiniteTemplateStatic;
  }
}

interface JQueryStatic {
  fn: {
    infiniteTemplate: JQuery.InfiniteTemplateStatic;
  };
}

export {};
