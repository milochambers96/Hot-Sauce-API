"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePassword = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const validator_1 = __importDefault(require("validator"));
const mongoose_hidden_1 = __importDefault(require("mongoose-hidden"));
// interface IUser {
//   username: string;
//   email: string;
//   password: string;
// }
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: [true, "A username is required to sign up."],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "A email is required to sign up."],
        unique: true,
        validate: (email) => validator_1.default.isEmail(email),
    },
    password: {
        type: String,
        required: [true, "A password is required to sign up."],
        validate: (password) => validator_1.default.isStrongPassword(password),
    },
});
userSchema.plugin(mongoose_unique_validator_1.default);
userSchema.pre("save", function hashPassword(next) {
    this.password = bcrypt_1.default.hashSync(this.password, bcrypt_1.default.genSaltSync());
    next();
});
function validatePassword(plainTextPassword, hashedPasswordfromDB) {
    return bcrypt_1.default.compareSync(plainTextPassword, hashedPasswordfromDB);
}
exports.validatePassword = validatePassword;
userSchema.plugin((0, mongoose_hidden_1.default)({ defaultHidden: { password: true } }));
exports.default = mongoose_1.default.model("User", userSchema);
