import * as Yup from 'yup';


export const ServerSchema = Yup.object().shape({
    serverIp : Yup.string()
        .required("Required"),
    serverName: Yup.string(),
        // .required("Required"),
    serverType : Yup.object().shape({
        serverTypeName : Yup.string(),
        serverTypePrice : Yup.number()
    }),
    isRunning : Yup.boolean(),
        // .required("Required")
    
})