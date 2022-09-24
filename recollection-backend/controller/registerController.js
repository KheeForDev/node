const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleRegister = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password)
        return res.status(400).json({
            "message": "Username and password are required."
        });

    // check for duplicate username
    const duplicate = await User.findOne({ username }).exec();

    // conflict
    if (duplicate)
        return res.sendStatus(409);

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await User.create({
            "username": username,
            "password": hashedPassword
        });

        res.status(200).json({
            "message": "User registered successfully."
        })
    } catch (err) {
        res.status(500).json({
            "message": err.message
        })
    }
};

module.exports = { handleRegister };