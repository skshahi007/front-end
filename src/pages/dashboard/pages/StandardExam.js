import { Button, Card, CardContent, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import ListOfSet from "../helper/ListOfSet";
import PracticePage from "../helper/PracticePage";
import SubjectPage from "../helper/SubjectPage";

export default function StandardExam() {
    const [showCoursePage,setShowCoursePage]= useState(false);
    const [showSets, setShowSets ] = useState(false);
    const [hide, setHide] = useState(false);
    const [values, setValues] = useState();
    const [currentSubject, setCurrentSubject] = useState();
    const [currentChapterName,setCurrentChapterName ]= useState();
    const [currentChapterNameIndex,setCurrentChapterNameIndex]=useState();
    const [course, setCurrentCourse] = useState({});
    const [subCode, setSubCode]=useState();
    const [ setsValues, setSetsValues ]= useState();


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
    const onClickCourse = ( chapterNameIndex, chapterName) => {
        setShowCoursePage(true);
        setHide(false);
        setCurrentChapterName(chapterName);
        setCurrentChapterNameIndex(chapterNameIndex);
    }

    const onSubject = (sub, courseValue,index) => {
        setHide(true);
        setCurrentSubject(sub);
        setCurrentCourse(courseValue);
        index=index+1;
        if(index<10)
          setSubCode(courseValue.courseCode + "0"+index);
        else
          setSubCode(courseValue.courseCode+index);
        
    
    }

    const onClickPracticeSet = (setValues) => {
        setSetsValues(setValues);
        setShowSets(true);
        setShowCoursePage(false);
    }


    return (
        <div>
            {!hide && !showCoursePage && !showSets && values && (
                values.map((value) => {

                    return (
                        <div style={{ margin: "1%" }}>
                            <Card sx={{ maxWidth: "lg" }} variant='outlined'>
                                <CardContent>
                                    <Typography variant='h4' gutterBottom>
                                        {value.name}
                                    </Typography>
                                    <hr />
                                    {value.subjects && (value.subjects.map((sub, index) => {

                                        return (
                                            <div>
                                                <Button onClick={() => onSubject(sub, value,index)}>{sub}</Button>
                                            </div>
                                        )
                                    }))}

                                </CardContent>

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

                    <SubjectPage subjectCode={subCode} onClickCourse={onClickCourse} />

                </div>
            )}
            { showCoursePage && (
                <div>
                   <Typography variant="h5">
                        <Button onClick={() => setShowCoursePage(false) }>{course.name}</Button>
                        /<Button onClick={ () => { setHide(true)
                            setShowCoursePage(false)}}>{currentSubject}</Button>/
                        <Button>{currentChapterName}</Button>
                    </Typography>
                    <ListOfSet chapterNameIndex={currentChapterNameIndex} subjectCode={subCode} onClickPracticeSet= {onClickPracticeSet}/>
                    
                </div>
            )}
            { showSets && (
                <div>
                   <Typography variant="h5">
                        <Button onClick={() => setShowSets(false) }>{course.name}</Button>
                        /<Button onClick={ () => { setHide(true)
                            setShowSets(false)}}>{currentSubject}</Button>/
                        <Button onClick={ () => { setShowCoursePage(true) 
                            setShowSets(false )}}>{currentChapterName}</Button>/
                        <Button>{setsValues.values.setName}</Button>
                    </Typography>
                    
                    <PracticePage setsValues={setsValues }/>
                </div>
            )}




        </div>
    )
}