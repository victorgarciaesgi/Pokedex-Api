/** Welcome **/
exports.welcome = function(req, res) {
    res.json({
        message: 'Welcome to the API'
    });
};

/** posts **/
/*exports.posts = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Post created...',
                authData
            });
        }
    });
};*/

/** login **/
exports.login = function(req, res){
    // Mock user
    const user = {
        id: 1,
        username: 'joe',
        email: 'joe@gmail.com',
        password: 'mdpJoe'
    };

    jwt.sign({user}, 'ImNotPerfectButIKnow', { expiresIn: '30s' }, (err, token) => {
        res.json({
            token
        });
    });
};

/** TOKEN FORMAT
 - Authorization: Bearer <access_token> **/

/** Verif token **/
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }

}
