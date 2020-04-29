"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
exports.composeWrappers = function (wrappers) {
    return wrappers.reduce(function (Acc, Current) {
        return function (props) { return <Current><Acc {...props}/></Current>; };
    });
};
