import * as Yup from 'yup';

export const ServerSchema = Yup.object().shape({
    serverIp : Yup.string()
        .required("Required"),
    serverName: Yup.string(),
        // .required("Required"),
    serverType : Yup.string(),
        // .required("Required"),
    isRunning : Yup.boolean(),
        // .required("Required")
    price:Yup.number(),
        // .required("Required"),
    
})