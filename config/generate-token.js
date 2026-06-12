const jwt = require('jsonwebtoken');
try {

    function genearteToken(user)
     {
        const token = jwt.sign(
            {email:user.email,

                id:user._id

            },process.env.JWT_SEC,

           
            {expiresIn:'7d'})

        return token ;


    }
} catch (error) {

    res.send(error.message);

}

module.exports = genearteToken