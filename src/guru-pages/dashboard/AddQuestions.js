import { Container, Typography, Stack, Button, FormControl, InputLabel, OutlinedInput, FormHelperText, FormLabel, RadioGroup, FormControlLabel, Radio, Box } from "@mui/material";
import Iconify from "../../components/iconify";
import { Formik } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { useState } from "react";
import { useUser } from '../auth/useUser';


export default function AddQuestions() {
  const user =useUser();

  const [initValues,setInitialValues]= useState({
    standard : "",
    subject : "",
    chapterName : "",
    subTopicName : "",
    type : "",
    question : "",
    option1 : "",
    option2 : "",
    option3 : "",
    option4 : "",
    correctOption : "",
    explaination : ""
  });
  
  const validationSchema = Yup.object({
    standard : Yup.string().required(),
    subject : Yup.string().required(),
    chapterName : Yup.string().required(),
    subTopicName : Yup.string().required(),
    type : Yup.string().required("please select type of the question"),
    question : Yup.string().required(),
    option1 : Yup.string().required("options are required field"),
    option2: Yup.string().required("options are required field"),
    option3 : Yup.string().required("options are required field"),
    option4 : Yup.string().required("options are required field"),
    correctOption : Yup.string().required("please select correct option"),
    explaination : Yup.string().required()
  })
    return (
        <>

          <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
                <Typography variant="h4" gutterBottom>
                    Add your questions 
                </Typography>
                <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                   Add New 
                </Button>
            </Stack>
            <hr/>
            <Formik
              enableReinitialize 
              initialValues ={ initValues } 
              validationSchema={ validationSchema }
              onSubmit={ async  (values, { setErrors, setStatus, setSubmitting }) => {
                try {
                  setStatus({ success: false });
                  setSubmitting(false);
                  
                  const response= await axios.post('http://localhost:8080/api/update-question',{
                    standard : values.standard,
                    subject : values.subject,
                    chapterName : values.chapterName,
                    subTopicName : values.subTopicName,
                    type : values.type,
                    question : values.question,
                    options : [
                      values.option1,
                      values.option2,
                      values.option3,
                      values.option4
                    ],
                    correctOption : values.correctOption,
                    explaination : values.explaination,
                    added_by_id :  user.id
                  });
                  console.log(response);

                  if(response.status===200){
console.log("hello",response.status);
                    setInitialValues( {
                      standard : values.standard,
                      subject : values.subject,
                      chapterName : values.chapterName,
                      subTopicName : values.subTopicName,
                      type : values.type,
                      question : "",
                      option1 : "",
                      option2 : "",
                      option3 : "",
                      option4 : "",
                      correctOption : "",
                      explaination : ""
                    });
                  }

            
                } catch (err) {
                      
                  if(err.response.status===401){
                      setErrors({ submit: "Already same questions you added"})
                  }else if (true) {
                      setStatus({ success: false });
                      setErrors({ submit: err.message });
                      setSubmitting(false);
                  }
                }
            }}
            >
              {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                <form noValidate onSubmit={handleSubmit} >
                  <FormControl fullWidth error={Boolean(touched.standard && errors.standard)} >
                    <InputLabel htmlFor="outlined-adornment-for-form">Standard</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-for-form"
                      type="text"
                      value={values.standard}
                      name="standard"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Standard"
                      inputProps={{}}
                    />
                    {touched.standard && errors.standard && (
                      <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.standard}
                      </FormHelperText>
                    )}
                  </FormControl>
                  <FormControl fullWidth error={Boolean(touched.subject && errors.subject)} >
                    <InputLabel htmlFor="outlined-adornment-for-form">Subject</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-for-form"
                      type="text"
                      value={values.subject}
                      name="subject"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Subject"
                      inputProps={{}}
                    />
                    {touched.subject && errors.subject && (
                      <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.subject}
                      </FormHelperText>
                    )}
                  </FormControl>
                  <FormControl fullWidth error={Boolean(touched.chapterName && errors.chapterName)} >
                    <InputLabel htmlFor="outlined-adornment-for-form">Chapter Name</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-for-form"
                      type="text"
                      value={values.chapterName}
                      name="chapterName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="chapter-name"
                      inputProps={{}}
                    />
                    {touched.chapterName && errors.chapterName && (
                      <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.chapterName}
                      </FormHelperText>
                    )}
                  </FormControl>
                  <FormControl fullWidth error={Boolean(touched.email && errors.email)} >
                    <InputLabel htmlFor="outlined-adornment-for-form">Sub Topic Name</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-for-form"
                      type="text"
                      value={values.subTopicName}
                      name="subTopicName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="sub-topic-name"
                      inputProps={{}}
                    />
                    {touched.subTopicName && errors.subTopicName && (
                      <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.subTopicName}
                      </FormHelperText>
                    )}
                  </FormControl>
                  <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group">type</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="type"
                      value={values.type}
                      onChange={handleChange}
                    >
                      <FormControlLabel value="easy" control={<Radio />} label="easy" />
                      <FormControlLabel value="medium" control={<Radio />} label="medium" />
                      <FormControlLabel value="hard" control={<Radio />} label="hard" />
                      <FormControlLabel value="hots" control={<Radio />} label="HOTS" />
                    </RadioGroup>
                    {touched.type && errors.type && (
                      <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.type}
                      </FormHelperText>
                    )}
                  </FormControl>
                  <FormControl fullWidth error={Boolean(touched.question && errors.question)} >
                    <InputLabel htmlFor="outlined-adornment-for-form">Question</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-for-form"
                      type="text"
                      value={values.question}
                      name="question"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Question"
                      inputProps={{}}
                    />
                    {touched.question && errors.question && (
                      <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.question}
                      </FormHelperText>
                    )}
                  </FormControl>
                  <FormControl error={Boolean(touched.option1 && errors.option1)} >
                    <InputLabel htmlFor="outlined-adornment-for-form">Option 1</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-for-form"
                      type="text"
                      value={values.option1}
                      name="option1"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Option 1"
                      inputProps={{}}
                    />
                    {touched.option1 && errors.option1 && (
                      <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.option1}
                      </FormHelperText>
                    )}
                  </FormControl>
                  <FormControl error={Boolean(touched.option2 && errors.option2)} >
                    <InputLabel htmlFor="outlined-adornment-for-form">Option 2</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-for-form"
                      type="text"
                      value={values.option2}
                      name="option2"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Option"
                      inputProps={{}}
                    />
                    {touched.option2 && errors.option2 && (
                      <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.option2}
                      </FormHelperText>
                    )}
                  </FormControl>
                  <FormControl error={Boolean(touched.option3 && errors.option3)} >
                    <InputLabel htmlFor="outlined-adornment-for-form">Option 3</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-for-form"
                      type="text"
                      value={values.option3}
                      name="option3"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Option 3"
                      inputProps={{}}
                    />
                    {touched.option3 && errors.option3 && (
                      <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.option3}
                      </FormHelperText>
                    )}
                  </FormControl>
                  <FormControl error={Boolean(touched.option4 && errors.option4)} >
                    <InputLabel htmlFor="outlined-adornment-for-form">Option 4</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-for-form"
                      type="text"
                      value={values.option4}
                      name="option4"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Option 4"
                      inputProps={{}}
                    />
                    {touched.option4 && errors.option4 && (
                      <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.option4}
                      </FormHelperText>
                    )}
                  </FormControl>
                  <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group">CorrectOption</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="correctOption"
                      value={values.correctOption}
                      onChange={handleChange}
                    >
                      <FormControlLabel value="1" control={<Radio />} label="1" />
                      <FormControlLabel value="2" control={<Radio />} label="2" />
                      <FormControlLabel value="3" control={<Radio />} label="3" />
                      <FormControlLabel value="4" control={<Radio />} label="4" />
                    </RadioGroup>
                  </FormControl>
                  <FormControl fullWidth error={Boolean(touched.explaination && errors.explaination)} >
                    <InputLabel htmlFor="outlined-adornment-for-form">Explaination</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-for-form"
                      type="text"
                      value={values.explaination}
                      name="explaination"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="explaination"
                      inputProps={{}}
                    />
                    {touched.explaination && errors.explaination && (
                      <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.explaination}
                      </FormHelperText>
                    )}
                  </FormControl>
                  {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}
                  <Box sx={{ mt: 2 }}>
                           
                    <Button
                      disableElevation
                      disabled={isSubmitting}
                      size="large"
                      type="submit"
                      variant="contained"                      
                    >
                      Add this Question
                    </Button>
                            
                  </Box>
                </form>
              
              
              )}
            </Formik>
          </Container>
        </>
    )
}