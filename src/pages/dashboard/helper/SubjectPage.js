import { Button, Card, CardContent, Typography } from "@mui/material";
import axios from "axios"
import { useEffect, useState } from "react";
import { HOST } from "../../../config";

export default function SubjectPage ( props ){
    const [chapterName ,setChapterName ]=useState([]);
    const requestAllStandards = async () => {
        try {
            const response = await axios.post(`${HOST}api/get-chapters`,{
                subjectCode : props.subjectCode
            });
            if (response.status === 200) {
                setChapterName(response.data);
            }
        }
        catch (err) {
            window.alert(err);
        }
    }
    const onClickCourse = (chapterNameIndex ) => {
        props.onClickCourse(chapterNameIndex,chapterName[chapterNameIndex]);
    }
    useEffect(() => {
        requestAllStandards();
    }, []);
    return (
        <div>
            {chapterName && (
                <>
                   <Card sx={{ maxWidth: "lg" }} variant='outlined'>
                                <CardContent>
                                    <Typography variant='h5' gutterBottom>
                                        Chapter Names
                                    </Typography>
                                    <hr />
                                    {chapterName.map((sub, index) => {

                                        return (
                                            <div>
                                                <Button onClick= { () => onClickCourse(index) }>{sub}</Button>
                                            </div>
                                        )
                                    } )}

                                </CardContent>

                            </Card>
                </>
            )}

        </div>
    )
}