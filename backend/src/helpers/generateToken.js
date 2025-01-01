import jwt from 'jsonwebtoken';

const generateToken = (id) => {

    console.log("param used here is:", id);
    
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '45d' });
};

export default generateToken;