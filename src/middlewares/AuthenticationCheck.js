const adminAuth = (req, res, next) => {
    const token = "xyzabc";
    const isAdminAuth = token === "xyzabc";

    if (!isAdminAuth) {
        res.status(401).send('Unauthorized');
    } else {
        next();
    }
}

const userAuth = (req, res, next) => {
    const token = "xyzabc";
    const isUserAuth = token === "xyzabcd";

    if (!isUserAuth) {
        res.status(401).send('Unauthorized user');
    } else {
        next();
    }
}

module.exports = { adminAuth, userAuth };