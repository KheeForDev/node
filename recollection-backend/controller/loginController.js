const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password)
        return res.status(400).json({
            "message": "Username and password are required."
        });

    const existUser = await User.findOne({ username }).exec();

    // unauthorized
    if (!existUser) return res.sendStatus(401);

    // evaluate password
    const matchPassword = await bcrypt.compare(password, existUser.password);

    if (matchPassword) {
        const roles = Object.values(existUser.roles);

        // create jwt
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": existUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "600s" }
        );

        const refreshToken = jwt.sign(
            { "username": existUser.username, },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" }
        )

        // saving refreshToken with current user
        existUser.refreshToken = refreshToken;
        const result = await existUser.save();
        console.log(result);

        // http only cookie is not available to JavaScript
        // secure: true will need to be remove when using Postman or similar
        // however, secure: true is require when using browser
        res.cookie("jwt", refreshToken, { httpOnly: true, sameSite: "None", secure: true, maxAge: 24 * 60 * 60 * 1000 })
        res.json({ accessToken });
    } else {
        res.sendStatus(401);
    }
};

module.exports = { handleLogin };