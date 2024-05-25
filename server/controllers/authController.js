const login = async (req, res) => {
    try {
        console.log(req.body)
    } catch (error) {
        console.log(error);
    }
};

const signup = async (req, res) => {
    try {
       console.log(req.body) 
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    login,
    signup
}
