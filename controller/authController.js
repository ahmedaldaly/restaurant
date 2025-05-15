const { User, validateLogin, validateRegister } = require('../module/User');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// تسجيل مستخدم جديد
module.exports.Register = asyncHandler(async (req, res) => {
    const { error } = validateRegister(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        phone:req.body.phone,
        address:req.body.address,
        password: hashedPassword
    });

    const savedUser = await newUser.save();

    const token = jwt.sign(
        {
            id: savedUser._id,
            isAdmin: savedUser.isAdmin
        },
        process.env.SECRET_JWT,
        { expiresIn: '7d' }
    );

    savedUser.token = token;
    res.status(201).json({
        _id:savedUser._id,
        email:savedUser.email,
        name:savedUser.name,
        isAdmin:savedUser.isAdmin,
        token:savedUser.token,
        phone:savedUser.phone,
        address:savedUser.address,
    });
});

// تسجيل الدخول
module.exports.LogIn = asyncHandler(async (req, res) => {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ message: 'Invalid email or password' });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(404).json({ message: 'Invalid email or password' });

    const token = jwt.sign(
        {
            id: user._id,
            isAdmin: user.isAdmin
        },
        process.env.SECRET_JWT,
        { expiresIn: '7d' }
    );

    user.token = token;
    res.status(200).json({
        _id:user._id,
        email:user.email,
        name:user.name,
        isAdmin:user.isAdmin,
        token:user.token
    });
});

