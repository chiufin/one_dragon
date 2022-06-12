type configType = {
    backendURL: string,
};


const appConfig: configType = {
    backendURL: process.env.REACT_APP_BACKEND || '',
};

export default appConfig;
