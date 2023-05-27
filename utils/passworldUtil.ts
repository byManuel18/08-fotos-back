import bcrypt from 'bcrypt';
import * as Forge from 'node-forge';

const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQCSA0mRzIXL4li7PhT/N3MyCgxhHOwCN6yCTl9OgJSClo7J71CG
cSdm1ez4/oIrcovRtFvlTEZGuZwsTpIYfEl+Sh9BtfzewA627g+3wRJOYxSN4vJT
8PG4VWnMpXyVMgbqxONqu+QNhLWO+dKwKXVjGbXt2ZAsSy6YdrkXDGcfJwIDAQAB
AoGADpD5Y+wtZNud0oAtBBD6EwHhnkaOXOJE+XLsGx7EsgpnEEoplF/xeFbbHzP0
tHTm8fK2QDfNwvx9UgY8mOi9RA5yCrYYCSziYCLlN8kpM2oNE6Xs6pmNeoyReODF
fShaZl9sf6xyVqAXxLS+eTfyCYv8pN3n0kC1T+DaXnhBxhECQQDzd5Cx6wP3Uj5e
NSi4WiNWVg2GzH5q4Gi5ZzT0NxFFn+BR2cuE/1U19OlvonPJmFzWIoGXJPiP8Q4p
y/DJ9eDFAkEAmYd1zqHR0hKm3113/uRQMtzR18eGzWf/aqxQp4vriR73RRzsADtK
V23/L7FLZNN9iAM32PwSbaacdlfqF4Sm+wJBANiC5rliH0fM6svKiGjROAWqRyMu
LeoLoPXn8y6O3hxFni4L+jJPAs8V+pYdKM0JYt3HF+l6plUTcJ340Cw6LWUCQHim
eS/u/uKlgbnazCfk6Blwav+1bvwQlCoSTDe+v1Q8n3kSp2vvLBbU/EtQer07blTq
ooLEZP8ChcaChBYDSu0CQDYhWJss9MIrx7ght9oRy41paJpuHc4GSWBbu6c/q8Rc
zrBwl3rk2wt6Qxbt3ggiDDpK6dJ0qbN2SUUgDsuk2M0=
-----END RSA PRIVATE KEY-----`;


export const encriptar = (cadena: string, saltOrRounds: number = 10)=>{
    return bcrypt.hashSync( cadena, saltOrRounds);
}

export const decrypt = (cadena: string = '', cadenaEncrpter: string = '') => {
    return bcrypt.compareSync(cadena, cadenaEncrpter);
}

export const rsaDecrypt = (cadena: string) => {
    const contraseString = atob(cadena);
    return new Promise<string>((resolve, reyect) => {
        const keyp = Forge.pki.privateKeyFromPem(privateKey);;
        try {
            const stringgenerado = keyp.decrypt(contraseString);
            resolve(stringgenerado);
        } catch (error) {
            reyect(error);
        }
    })

}


