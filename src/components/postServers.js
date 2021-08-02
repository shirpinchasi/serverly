import react, { useEffect, useState } from 'react';
import {makeStyles} from "@material-ui/styles"
import { Formik, Form, Field,getIn } from 'formik';
import * as Yup from 'yup';
import { ServerSchema } from '../config/serverSchema';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";

const useStyles=makeStyles((theme)=>({
  root:{
    padding:0,
    height:"100%"
  },
  actions : {
    justifyContent:"flex-end",
  }
}));



export default function PostServers() {
  const [getCurrency, setCurrency] = useState("")
  const [rate, setRate] = useState([])
  const [first, setFirst] = useState("")
  const [second, setSecond] = useState("")
  const [third, setThird] = useState("")
  const classes = useStyles();

  const serverNames =[
    {id :1, serverName : "t1.micro", serverPrice : 10},
    {id :2, serverName : "t1.nano", serverPrice : 15},
    {id :3, serverName : "t1.xl", serverPrice : 12},
    {id :4, serverName : "t2.xxl", serverPrice : 18},

  ]

 

  const handleSubmit = async (values) => {
    const res = await fetch("/handler/addServer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(values)
    })
    if (res.status === 201) {
      console.log(values);
      // refreshPage(true)
      console.log("success");
    } else {
      console.log("errorrr");
    }
  }

  // async function currency() {
  //   try {
  //     const res = await fetch("https://currency-converter5.p.rapidapi.com/currency/convert?apiKeyformat=json&from=AUD&to=CAD&amount=1, {
  //       method: "GET",
  //       headers: {
  //         "x-rapidapi-key": "8d39b4bd5cmshfe0af866282fbb6p1c3257jsn442fcdb85562",
  //         "x-rapidapi-host": "currency-converter5.p.rapidapi.com"
  //       }
  //     })
  //     const fetchCurrency = await res.json();
  //     setCurrency(fetchCurrency)
  //     console.log(getCurrency);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  // useEffect(()=>{
  //   currency()
  // },[])
  

  return (
    <div className="Servers">

      <Formik 
      initialValues={{ serverIp: "", 
      serverName: "", 
      serverType: 
      {serverTypeName:"", 
      serverTypePrice:""
    }, 
    isRunning: false }}
        validationSchema={ServerSchema}
        validateOnChange={true}
        onSubmit={handleSubmit}>
        {({ errors, touched, handleBlur,handleChange }) => (
          <Card>
          <Form id="form">
            <div>
              <label htmlFor="serverIp">Server Ip </label>
              <Field name="serverIp" id="serverIp" />
              {errors.serverIp && touched.serverIp && <small>{errors.serverIp}</small>}
            </div>
            <div>
              <label htmlFor="serverName">Server Name</label>
              <Field name="serverName" id="serverName" />
              {errors.serverName && touched.serverName && <small>{errors.serverName}</small>}
            </div>
            <div>
              <label htmlFor="serverTypeName">Server Type </label>
              <Field as="select" name="serverType.serverTypeName">
                {serverNames.map((item, index)=>(
                  <option value={item.serverName} key={index}>
                    {item.serverName}
                  </option>
                ))}
              </Field>
              {Boolean(
                      getIn(touched, "serverType.serverTypeName") &&
                      getIn(errors, "serverType.serverTypeName"))}
            </div>
            <div>
            <label htmlFor="serverTypePrice">Server Type </label>
              <Field as="select" name="serverType.serverTypePrice">
                {serverNames.map((item, index)=>(
                  <option value={item.serverPrice} key={index}>
                    {item.serverPrice}
                  </option>
                ))}
              </Field>
              {Boolean(
                      getIn(touched, "serverType.serverTypePrice") &&
                      getIn(errors, "serverType.serverTypePrice"))}
              {/* {errors.serverType.price && touched.serverType.price && <small>{errors.serverType.price}</small>}  */}
            </div> 
            {/* <div>
              <label htmlFor="isRunning">is Running</label>
              
              {errors.isRunning && touched.isRunning && <small>{errors.isRunning}</small>}
            </div> */}
            {/* <div>
              
              <label htmlFor="price">Select Currency</label>
               <Field name="price" id="price" />
              <Field as="select" name="price">
                <option value="40">USD</option>
                <option value="20">ILS</option>
                <option value="60">EUR</option>
              </Field>
              {errors.price && touched.price && <small>{errors.price}</small>}
            </div> */}

            <button type="submit" class="btn btn-primary" id="button">Add Server</button>
          </Form>
          </Card>
        )}

      </Formik>

    </div>
  );
}






