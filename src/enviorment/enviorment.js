const CURRENT_ENVIORMENT = process.env.REACT_APP_NODE_ENV;


const COMMON_ENVIORMENT = {
    SPOTIFY_AUTH_BASE_URL: process.env.REACT_APP_SPOTIFY_AUTH_BASE_URL,
    SONGSTATE_BASE_URL: process.env.REACT_APP_SONGSTATE_BASE_URL,
    SPOTIFY_CLIENT_BASE_URL: process.env.REACT_APP_SPOTIFY_CLIENT_BASE_URL,
    SPOTIFY_CLIENT_ID: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRETS: process.env.REACT_APP_SPOTIFY_CLIENT_SECRETS,
    SONGS_STATS_API_KEY: process.env.REACT_APP_SONGS_STATS_API_KEY
}


const enviorment = {
    local: {
        BASE_URL: 'http://localhost:9000/api/v1',
        CURRENT_HOST: 'http://localhost:3000',
        ...COMMON_ENVIORMENT
    },
    development: {
        BASE_URL: 'http://66.228.58.155:9000/api/v1',
        CURRENT_HOST: 'http://66.228.58.155:3000',
        ...COMMON_ENVIORMENT
    },
    staging: {
        BASE_URL: '',
        CURRENT_HOST: '',
        ...COMMON_ENVIORMENT

    },
    production: {
        BASE_URL: '',
        CURRENT_HOST: '',
        ...COMMON_ENVIORMENT
    }
};


const config = enviorment[CURRENT_ENVIORMENT];


export { config };