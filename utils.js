export function generateNonce() {
    return crypto.randomBytes(16).toString('base64');
}