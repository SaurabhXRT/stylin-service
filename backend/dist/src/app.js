function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _ts_generator(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
import express from "express";
import logger from "./logger/logger.js";
import bodyParser from "body-parser";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import { createApolloGraphqlServer } from "./graphql/index.js";
import { AuthMiddleware } from "./middlewares/auth.js";
import { UserMiddleware } from "./middlewares/actors/auth.user.js";
import { StaffMiddleware } from "./middlewares/actors/auth.staff.js";
import { OwnerMiddleware } from "./middlewares/actors/auth.owner.js";
import { graphqlUploadExpress } from 'graphql-upload-ts';
var server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: true
}));
server.use(express.json());
server.use(cors({
    origin: process.env.CORS_WHITELISTED
}));
server.use(graphqlUploadExpress());
var startgql = /*#__PURE__*/ function() {
    var _ref = _async_to_generator(function() {
        var initializegraphql;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    return [
                        4,
                        createApolloGraphqlServer()
                    ];
                case 1:
                    initializegraphql = _state.sent();
                    server.use("/graphql", graphqlUploadExpress(), expressMiddleware(initializegraphql, {
                        context: /*#__PURE__*/ function() {
                            var _ref = _async_to_generator(function(param) {
                                var req, context;
                                return _ts_generator(this, function(_state) {
                                    switch(_state.label){
                                        case 0:
                                            req = param.req;
                                            return [
                                                4,
                                                AuthMiddleware.verifyToken(req)
                                            ];
                                        case 1:
                                            _state.sent();
                                            context = {};
                                            if (!req.userId) return [
                                                3,
                                                3
                                            ];
                                            return [
                                                4,
                                                UserMiddleware.isUser(req)
                                            ];
                                        case 2:
                                            _state.sent();
                                            context.userId = req.userId;
                                            context.user = req.user;
                                            _state.label = 3;
                                        case 3:
                                            if (!req.staffId) return [
                                                3,
                                                5
                                            ];
                                            return [
                                                4,
                                                StaffMiddleware.isStaff(req)
                                            ];
                                        case 4:
                                            _state.sent();
                                            context.staffId = req.staffId;
                                            context.staff = req.staff;
                                            _state.label = 5;
                                        case 5:
                                            if (!req.ownerId) return [
                                                3,
                                                7
                                            ];
                                            return [
                                                4,
                                                OwnerMiddleware.isOwner(req)
                                            ];
                                        case 6:
                                            _state.sent();
                                            context.ownerId = req.ownerId;
                                            context.owner = req.owner;
                                            _state.label = 7;
                                        case 7:
                                            return [
                                                2,
                                                context
                                            ];
                                    }
                                });
                            });
                            return function(_) {
                                return _ref.apply(this, arguments);
                            };
                        }()
                    }));
                    return [
                        2
                    ];
            }
        });
    });
    return function startgql() {
        return _ref.apply(this, arguments);
    };
}();
startgql();
process.on("uncaughtException", function(err) {
    logger.error("An error occured which was not caught");
    logger.error(err);
});
process.on("unhandledRejection", function(err) {
    logger.error("An  unhandled rejection was caught");
    logger.error(err);
});
server.get("/", function(req, res) {
    res.json({
        message: "Welcome to the salon management api"
    });
});
export default server;
