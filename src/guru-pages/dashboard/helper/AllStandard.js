import { Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material"
import { useState, useEffect } from "react";
import axios from "axios";
import { AddNewSubject } from "./AddNewSubject";
import { useUser } from "../../auth/useUser";
import DataTable from "./TableList";

export default function AllStandard() {
  const guruUser = useUser();
  const { id } = guruUser;
  const [hide, setHide] = useState(false);
  const [values, setValues] = useState();
  const [render, setRender] = useState(false);

  const [createModelOpen, setCreateModelOpen] = useState(false);
  const [course, setCurrentCourse] = useState({});
  const [currentSubject, setCurrentSubject] = useState();
  const [subCode, setSubCode]=useState();
  const onSubject = (sub, courseValue,index) => {
    setHide(true);
    setCurrentSubject(sub);
    setCurrentCourse(courseValue);
    index=index+1;
    if(index<10)
      setSubCode(courseValue.courseCode + "0"+index);
    else
      setSubCode(courseValue.courseCode+index);
    console.log(course);

  }
  const handleCreateNewRow = async (subjectName, chapterNames) => {
    try {
      const response = await axios.post('http://localhost:8080/api/add-subject-name', {
        subjectName,
        chapterNames,
        courseCode: course.courseCode,
        addedById: id,
        subjectCode: course.subjects.length
      });
      if (response.status == 200) {
        requestAllStandards();
        values.sub.push(subjectName);
      }

    } catch (error) {
      window.alert(error);
    }
  };
  const requestAllStandards = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/get-standards');
      if (response.status === 200) {
        setValues(response.data);
      }
    }
    catch (err) {
      window.alert(err);
    }
  }
  useEffect(() => {
    requestAllStandards();
  }, []);
  useEffect(() => {
    setRender(true);
  }, [values]);
  return (
    <>

      {!hide && values && (
        values.map((value) => {

          return (
            <div style={{ margin: "1%" }}>
              <Card sx={{ maxWidth: "lg" }} variant='outlined'>
                <CardContent>
                  <Typography variant='h3' gutterBottom>
                    {value.name}
                  </Typography>
                  <hr />
                  {value.subjects && (value.subjects.map((sub,index) => {

                    return (
                      <div>
                        <Button onClick={() => onSubject(sub, value,index)}>{sub}</Button>
                      </div>
                    )
                  }))}

                </CardContent>
                <CardActions>

                  <Button size="small" onClick={() => {
                    setCreateModelOpen(true);
                    setCurrentCourse(value)
                  }}>Add new Subject</Button>
                </CardActions>
                <AddNewSubject
                  open={createModelOpen}
                  onClose={() => setCreateModelOpen(false)}
                  onSubmit={handleCreateNewRow}
                />
              </Card>
            </div>)
        }))
      }
      {hide && (
        <div>
          <Typography variant="h5">
            <Button onClick={() => setHide(false)}>{course.name}</Button>
            /<Button>{currentSubject}</Button>
          </Typography>
          
          <DataTable subjectCode={subCode} />

        </div>
      )

      }





    </>
  )
}