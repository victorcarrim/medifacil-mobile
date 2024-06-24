import jwt_decode from 'jwt-decode';

// Função para decodificar o token JWT
const userInformation = (token) => {
    try {
        // Divida o token nas três partes
        const base64Url = token.split('.')[1];
        if (!base64Url) {
            throw new Error('Invalid token');
        }

        // Decodifique a parte base64url para JSON
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        // Parse o JSON e retorne
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Failed to decode token', error);
        return null;
    }
};

function atob(input) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let str = input.replace(/=+$/, '');
    let output = '';

    for (let bc = 0, bs, buffer, idx = 0; buffer = str.charAt(idx++); ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer, bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0) {
        buffer = chars.indexOf(buffer);
    }

    return output;
}

export { userInformation };
