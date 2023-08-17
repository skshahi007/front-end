import styled from "@emotion/styled";
import { StayPrimaryLandscape } from "@mui/icons-material";
import { Button, Card, CardContent, FormControl, FormControlLabel, FormLabel, ListItem, Paper, Radio, RadioGroup, Stack, Typography } from "@mui/material";
import axios from "axios"
import { useEffect, useState } from "react";

export default function PracticePage(props) {
    const [disabledOnPrevButton, setOnPrevButton] = useState(true);
    const [disabledOnNextButton, setOnNextButton] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [questionDetails, setQuestionDetails] = useState();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const [selectedOption, setSelectedOption] = useState();
    const [showAnswer, setShowAnswer] = useState(false);


    const Item = styled(Card)(({ theme }) => ({
        
        spacing:4,
        
        
        
      }));
      

    const requestQuestion = async (id) => {
        setSelectedOption();
        setShowAnswer(false);


        try {
            const response = await axios.post('http://localhost:8080/api/get-question', {
                _id: id,
                subjectCode: props.setsValues.subjectCode
            });

            if (response.status === 200) {
                setQuestionDetails(response.data.data)
                setClicked(false);
            }
        }
        catch (err) {
            window.alert(err);
        }
    }
    useEffect(() => {
        requestQuestion(props.setsValues.questionList[currentQuestionIndex]);
    }, []);

    const onPreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            if (currentQuestionIndex === 1) {
                setOnPrevButton(true);
            }
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            requestQuestion(props.setsValues.questionList[currentQuestionIndex]);
            setOnNextButton(false)
        } else {
            setOnPrevButton(false);
        }
    }

    const onNextQuestion = () => {
        if (currentQuestionIndex < props.setsValues.questionList.length - 2) {
            setOnPrevButton(false)

            setCurrentQuestionIndex(currentQuestionIndex + 1);
            requestQuestion(props.setsValues.questionList[currentQuestionIndex]);
        } else if (currentQuestionIndex === props.setsValues.questionList.length - 2) {
            setOnNextButton(true)
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            requestQuestion(props.setsValues.questionList[currentQuestionIndex]);
        } else {
            setOnNextButton(true)
        }
    }


    function handleChange(event) {

        if (!clicked && event.target.value) {

            setSelectedOption(event.target.value);

            setClicked(true);
            setShowAnswer(true);
        }
    }

    return (
        <div>
            {questionDetails && (
                <>
                    <Card sx={{ maxWidth: "lg" }} variant='outlined'>
                        <CardContent>
                            <Typography variant='h5' gutterBottom>
                                Ques - {currentQuestionIndex + 1}. {questionDetails.question}
                            </Typography><hr />


                            <RadioGroup
                                aria-labelledby="radio-buttons-group"
                                name="options"
                                value={selectedOption}
                                onClick={handleChange}
                            >
                                <Stack spacing={2} >
                                    <Item sx={selectedOption ? questionDetails.optionA==questionDetails.correctOption?{color:"success.main", border: 2}:selectedOption=='0' ? {color: "error.main", border: 2}:{}:{}}><FormControlLabel 
                                        
                                    value="0" control={<Radio />} label={questionDetails.optionA} checked={selectedOption === '0'} /></Item>
                                    
                                    <Item sx={selectedOption ? questionDetails.optionB==questionDetails.correctOption?{color:"success.main", border: 2}:selectedOption==='1' ? {color: "error.main", border: 2}:{}:{}} ><FormControlLabel 

                                    value="1" control={<Radio />} label={questionDetails.optionB} checked={selectedOption === '1'} /></Item>
                                    <Item sx={selectedOption ? questionDetails.optionC==questionDetails.correctOption?{color:"success.main", border: 2}:selectedOption==='2' ? {color: "error.main", border: 2}:{}:{}}><FormControlLabel 
                                    
                                    value="2" control={<Radio />} label={questionDetails.optionC} checked={selectedOption === '2'} /></Item>
                                    <Item sx={selectedOption ? questionDetails.optionD==questionDetails.correctOption?{color:"success.main", border: 2}:selectedOption==='3'?{color: "error.main", border: 2}:{}:{}}><FormControlLabel 
                                    
                                    value="3" control={<Radio />} label={questionDetails.optionD} checked={selectedOption === '3'} /></Item>
                                </Stack>

                            </RadioGroup>


                            <hr />
                            <br />
                            {showAnswer && (<>
                                <Typography variant="body1">Correct Answer : {questionDetails.correctOption}</Typography><br />
                                <Typography variant="body1">Explaination : {questionDetails.explaination}</Typography>
                            </>)}
                        </CardContent>


                        <Button
                            disabled={disabledOnPrevButton}
                            size="large"
                            variant="outlined"
                            onClick={onPreviousQuestion}
                        >Previous Question</Button>
                        <div className="align-right">
                            <Button
                                disabled={disabledOnNextButton}
                                size="large"
                                variant="outlined"
                                onClick={onNextQuestion}
                            >Next Question</Button>
                        </div>
                    </Card>

                </>
            )}

        </div>
    )
}