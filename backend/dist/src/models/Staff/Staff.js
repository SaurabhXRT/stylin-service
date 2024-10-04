function _assert_this_initialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function _call_super(_this, derived, args) {
    derived = _get_prototype_of(derived);
    return _possible_constructor_return(_this, _is_native_reflect_construct() ? Reflect.construct(derived, args || [], _get_prototype_of(_this).constructor) : derived.apply(_this, args));
}
function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _get_prototype_of(o) {
    _get_prototype_of = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _get_prototype_of(o);
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _set_prototype_of(subClass, superClass);
}
function _possible_constructor_return(self, call) {
    if (call && (_type_of(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assert_this_initialized(self);
}
function _set_prototype_of(o, p) {
    _set_prototype_of = Object.setPrototypeOf || function setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _set_prototype_of(o, p);
}
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function _is_native_reflect_construct() {
    try {
        var result = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
    } catch (_) {}
    return (_is_native_reflect_construct = function() {
        return !!result;
    })();
}
import { Model, DataTypes } from "sequelize";
import { centralDatabase } from "../../config/dbconfig.js";
var Staff = /*#__PURE__*/ function(Model) {
    "use strict";
    _inherits(Staff, Model);
    function Staff() {
        _class_call_check(this, Staff);
        return _call_super(this, Staff, arguments);
    }
    return Staff;
}(Model);
Staff.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contactNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    role: {
        type: DataTypes.ENUM("Manager", "Stylist", "Therapist", "Assistant", "hairdresser"),
        allowNull: false
    },
    department: {
        type: DataTypes.STRING,
        allowNull: true
    },
    jobTitle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    expertise: {
        type: DataTypes.STRING,
        allowNull: true
    },
    dateOfJoining: {
        type: DataTypes.DATE,
        allowNull: false
    },
    workHours: {
        type: DataTypes.STRING,
        allowNull: true
    },
    shift: {
        type: DataTypes.ENUM("Morning", "Afternoon", "Evening", "Night"),
        allowNull: true
    },
    profileImage: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM("Active", "Inactive", "On Leave"),
        defaultValue: "Active"
    },
    salonId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize: centralDatabase.getInstance(),
    modelName: "Staff",
    timestamps: true
});
export { Staff };
