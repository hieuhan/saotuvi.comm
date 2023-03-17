const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [
          true, 'Vui lòng nhập tên truy cập.'
        ],
        unique: true
    },
    password: { 
        type: String, 
        require: [ true, 'Vui lòng nhập mật khẩu.' ],
        minlength: 6,
        //select: false
    },
    name: String,
    email: {
        type: String,
        // match: [
        //     /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        //     'Địa chỉ email không hợp lệ.'
        // ],
        lowercase: true,
        unique: true
    },
    phone: { 
        type: String,
        // validate: {
        //     validator: function(v) {
        //         return /\d{3}-\d{3}-\d{4}/.test(v);
        //     },
        //     message: props => `${props.value} is not a valid phone number!`
        // },
        unique: true 
    },
    photo: String,
    gender: { type: Number, default: 0 },
    roles: { 
        type: Array, 
        default: ['user'] 
    },
    status: {
        type: Number,
        default: 1,
        required: [ true, 'Vui lòng chọn trạng thái của tài khoản.' ]
    },
    lastLogin: { type: Date },
    deleteAt: { type: Date },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date }
    
}, 
{ 
    collection: 'users',
    timestamps: false  
});

userSchema.index({ username: 1, email: 1, phone: 1 }, { unique: true })
module.exports = mongoose.model('User', userSchema);