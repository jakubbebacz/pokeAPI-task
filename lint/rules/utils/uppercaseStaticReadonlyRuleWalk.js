"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.UppercaseStaticReadonlyRuleWalk = void 0;
var baseNamingConventionRuleWalk_1 = require("./baseNamingConventionRuleWalk");
var ts = require("typescript");
var UppercaseStaticReadonlyRuleWalk = /** @class */ (function (_super) {
    __extends(UppercaseStaticReadonlyRuleWalk, _super);
    function UppercaseStaticReadonlyRuleWalk() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.failureString = "static readonly member's name must be UPPERCASE";
        return _this;
    }
    UppercaseStaticReadonlyRuleWalk.prototype.nameIsCorrect = function (name) {
        return name === name.toUpperCase();
    };
    UppercaseStaticReadonlyRuleWalk.prototype.shouldNameBeChecked = function (node) {
        return this.memberIsStatic(node)
            && this.memberIsReadonly(node);
    };
    UppercaseStaticReadonlyRuleWalk.prototype.isRelevantClassMember = function (node) {
        switch (node.kind) {
            case ts.SyntaxKind.PropertyDeclaration:
            case ts.SyntaxKind.GetAccessor:
            case ts.SyntaxKind.SetAccessor:
                return true;
            default:
                return false;
        }
    };
    return UppercaseStaticReadonlyRuleWalk;
}(baseNamingConventionRuleWalk_1.BaseNamingConventionRuleWalk));
exports.UppercaseStaticReadonlyRuleWalk = UppercaseStaticReadonlyRuleWalk;
