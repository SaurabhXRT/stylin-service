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
import dotenv from "dotenv-flow";
dotenv.config();
import logger from "../logger/logger.js";
import { UserLoginSession } from "./LoginSession/User.Loginsession.js";
import { StaffLoginSession } from "./LoginSession/Staff.loginsession.js";
import { User } from "./User/User.js";
import { Staff } from "./Staff/Staff.js";
import { Salon } from "./Salon/Salon.js";
import { Service } from "./Service/StaffService.js";
import { Feedback } from "./UserFeedback/UserFeedback.js";
import { CityDetail } from "./Cities/cities.js";
export function initDatabase(db, dbOptions) {
    return _initDatabase.apply(this, arguments);
}
function _initDatabase() {
    _initDatabase = _async_to_generator(function(db, dbOptions) {
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    return [
                        4,
                        db.initInstance(dbOptions)
                    ];
                case 1:
                    _state.sent();
                    return [
                        4,
                        UserLoginSession.sync()
                    ];
                case 2:
                    _state.sent();
                    logger.log("userloginsession model initiated");
                    return [
                        4,
                        User.sync()
                    ];
                case 3:
                    _state.sent();
                    logger.log("user model initiated successfully");
                    return [
                        4,
                        CityDetail.sync()
                    ];
                case 4:
                    _state.sent();
                    logger.log("citydetail model initiated successfully");
                    User.hasMany(UserLoginSession, {
                        foreignKey: "userId",
                        as: "userloginsession"
                    });
                    UserLoginSession.belongsTo(User, {
                        foreignKey: "userId",
                        as: "users"
                    });
                    return [
                        4,
                        Staff.sync()
                    ];
                case 5:
                    _state.sent();
                    logger.log("staff model initiated successfully");
                    Staff.hasMany(StaffLoginSession, {
                        foreignKey: "staffId",
                        as: "staffloginsession"
                    });
                    StaffLoginSession.belongsTo(Staff, {
                        foreignKey: "staffId",
                        as: "staff"
                    });
                    return [
                        4,
                        Salon.sync()
                    ];
                case 6:
                    _state.sent();
                    logger.log("salon model initiated successfully");
                    Salon.hasMany(Staff, {
                        foreignKey: "salonId",
                        as: "staffs"
                    });
                    Staff.belongsTo(Salon, {
                        foreignKey: "salonId",
                        as: "salon"
                    });
                    User.hasMany(Salon, {
                        foreignKey: "ownerId",
                        as: "salon"
                    });
                    Salon.belongsTo(User, {
                        foreignKey: "ownerId",
                        as: "owner"
                    });
                    return [
                        4,
                        Feedback.sync()
                    ];
                case 7:
                    _state.sent();
                    logger.log("feedback model initiated successfully");
                    return [
                        4,
                        Service.sync()
                    ];
                case 8:
                    _state.sent();
                    logger.log("service model initiated successfully");
                    User.hasMany(Feedback, {
                        foreignKey: "userId",
                        as: "feedbacks"
                    });
                    Feedback.belongsTo(User, {
                        foreignKey: "userId",
                        as: "user"
                    });
                    Staff.hasMany(Feedback, {
                        foreignKey: "staffId",
                        as: "stafffeedbacks"
                    });
                    Feedback.belongsTo(Staff, {
                        foreignKey: "staffId",
                        as: "staff"
                    });
                    User.hasMany(Service, {
                        foreignKey: "userId",
                        as: "services"
                    });
                    Service.belongsTo(User, {
                        foreignKey: "userId",
                        as: "user"
                    });
                    Staff.hasMany(Service, {
                        foreignKey: "staffId",
                        as: "staffservices"
                    });
                    Service.belongsTo(Staff, {
                        foreignKey: "staffId",
                        as: "staff"
                    });
                    logger.log("all models initioiated successfully");
                    return [
                        2
                    ];
            }
        });
    });
    return _initDatabase.apply(this, arguments);
}
