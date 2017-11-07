"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const SMAPI_ENDPOINT = "https://api.amazonalexa.com/v0";
function createNewSkill({ token, vendorId, skillName }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            axios_1.default.request({
                method: "POST",
                url: SMAPI_ENDPOINT + "/skills",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token
                },
                data: {
                    vendorId
                }
            });
        }
        catch (error) {
            console.error(error);
        }
    });
}
exports.createNewSkill = createNewSkill;
