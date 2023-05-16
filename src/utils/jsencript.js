import {JSEncrypt} from "jsencrypt";

const publicKey = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyKsErgtbqkV3KvCibiBkNxbGryriOuuvYZQ+rvcn0I0ksQHdBXQDZ9mM47tyPXwsP2dL41pooDT2c5iLj4eHQQBxUee08GztCnhsN/bT3MRrpE2NwKeAoYA8MvoQuCLptELK74C6roFFgajQm/vZM9SRqbMcPYVxipvLaat1mXsrZ5hKeneME8NiCRdM0PpcNcWyRmY0hzwq2k9mdrH67djk0IymBmZULIu5JqKtQhfjxi3itHqYBz/5f20svj4n6VOVwh+HHjoJ9sHZKohb2yDKuN8fv5BkFAPEMGyEvF7Y6iwhemzl/gnfkwIEZHns2FPhqZ038WR8UcBKkchXEwIDAQAB";


//加密
export function encrypt(txt){
    const encryptor = new JSEncrypt();

    encryptor.setPublicKey(publicKey);

    return encryptor.encrypt(txt);
}
