"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INLINES = void 0;
/**
 * Map of all Contentful inline types. Inline contain inline or text nodes.
 *
 * @note This should be kept in alphabetical order since the
 * [validation package](https://github.com/contentful/content-stack/tree/master/packages/validation)
 *  relies on the values being in a predictable order.
 */
var INLINES;
(function (INLINES) {
    INLINES["ASSET_HYPERLINK"] = "asset-hyperlink";
    INLINES["EMBEDDED_ENTRY"] = "embedded-entry-inline";
    INLINES["EMBEDDED_ASSET"] = "embedded-asset-inline";
    INLINES["EMBEDDED_RESOURCE"] = "embedded-resource-inline";
    INLINES["ENTRY_HYPERLINK"] = "entry-hyperlink";
    INLINES["HYPERLINK"] = "hyperlink";
    INLINES["RESOURCE_HYPERLINK"] = "resource-hyperlink";
})(INLINES || (exports.INLINES = INLINES = {}));
//# sourceMappingURL=inlines.js.map