import { Button, Card, CardContent, Typography } from "@mui/material";
import axios from "axios"
import { useEffect, useState } from "react";

export default function ListOfSet ( props ){
    const [sets, setSets] = useState();
    
    const requestAllStandards = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/get-sets-list',{
                subjectCode : props.subjectCode,
                chapterNameIndex : props.chapterNameIndex
            });
            if (response.status === 200) {
                setSets(response.data);
            }
        }
        catch (err) {
            window.alert(err);
        }
    }
    const onClickPracticeSet = (setValues) => {
        props.onClickPracticeSet(setValues);
    }
   
    useEffect(() => {
        requestAllStandards();
    }, []);
    return (
        <div>
            {sets && (
                <>
                   <Card sx={{ maxWidth: "lg" }} variant='outlined'>
                                <CardContent>
                                    <Typography variant='h5' gutterBottom>
                                        Practice
                                    </Typography>
                                    <hr />
                                    {sets.map((value, index) => {

                                        return (
                                            <div>
                                                <Button onClick= { () => onClickPracticeSet(value) }>{value.values.setName}</Button>
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