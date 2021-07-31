import react, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Formik, Form, Field } from 'formik';
import { useHistory, Link } from 'react-router-dom';
import { ServerSchema } from '../config/serverSchema';





export default function PostServers() {


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
      refreshPage(true)
      console.log("success");
    } else {
      console.log("errorrr");
    }
  }

  function refreshPage() {
    window.location.reload(false);
}

  return (
    <div className="Servers">
      <Formik initialValues={{ serverIp: "", serverName: "", serverType: "",price: "",isRunning: false}}
        validationSchema={ServerSchema}
        validateOnChange={true}
        onSubmit= {handleSubmit}>
        {({ errors, touched }) => (
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
              <label htmlFor="serverType">Server Type </label>
              <Field as="select" name="serverType">
                <option value="t1.micro">t1.micro</option>
                <option value="t1.nano">t1.nano</option>
                <option value="t1.xl">t1.xl</option>
                <option value="t2.xxl">t2.xxl</option>

              </Field>
              {errors.serverType && touched.serverType && <small>{errors.serverType}</small>}
            </div>
            {/* <div>
              <label htmlFor="isRunning">is Running</label>
              <Select>

              </Select>
              {errors.isRunning && touched.isRunning && <small>{errors.isRunning}</small>}
            </div> */}
            <div>
              <label htmlFor="price">Select Currency</label>
              <Field name="price" id="price" />
              <Select>

              </Select>
              {errors.price && touched.price && <small>{errors.price}</small>}
            </div>

            <button type="submit" class="btn btn-primary" id="button">Add Server</button>
          </Form>
        )}

      </Formik>

    </div>
  );
}






