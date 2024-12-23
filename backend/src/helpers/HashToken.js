import crypto from 'node:crypto';

const hashedToken = (token) => {

    return crypto.createHash('sha256').update(token.toString()).digest('hex');
};

export default hashedToken;