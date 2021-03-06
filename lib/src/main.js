"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const github = __importStar(require("@actions/github"));
const core = __importStar(require("@actions/core"));
const util_1 = require("./util");
const slack_1 = require("./slack");
const path_1 = __importDefault(require("path"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL || '';
            const SLACK_TOKEN = process.env.SLACK_TOKEN || '';
            const configPath = path_1.default.join(process.cwd(), core.getInput('users'));
            /*eslint-disable-next-line @typescript-eslint/no-var-requires */
            const users = require(configPath);
            const { context } = github;
            const slack = new slack_1.Slack(SLACK_WEBHOOK_URL);
            const resultText = yield util_1.generateResultText(users, SLACK_TOKEN, context);
            yield slack.notify(resultText);
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
