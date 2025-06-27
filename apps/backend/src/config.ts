
export type IConfig = {
    server: {
        http: {
            port: number,
        },
    },
    database: {
        host: string,
        port: number,
        name: string,
        user: string,
        password: string
    },
    jwt: {
        secret: string
    }
}


function env(name: string): string {
    const value = process.env[name]
    if (!value){
        throw new Error(`environment variable ${name} was not found`)
    }
    return value
}


export const config: IConfig = {
    server: {
        http: {
            port: +env('HTTP_PORT')
        }
    },
    database: {
        host: env('DATABASE_HOST'), 
        port: +env('DATABASE_PORT'), 
        name: env('DATABASE_NAME'), 
        user: env('DATABASE_USER'), 
        password: env('DATABASE_PASSWORD'), 
    },
    jwt: {
        secret: env('JWT_SECRET')
    }
}
