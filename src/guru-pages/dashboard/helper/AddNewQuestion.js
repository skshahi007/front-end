import { Dialog, DialogContent, DialogTitle, Stack, TextField , DialogActions, Button, MenuItem } from "@mui/material";
import { useState } from "react";

export const AddNewQuestions = ({ open, columns, onClose, onSubmit,chapterNames, levels }) => {
    const [validationRequired, setValidationRequired ]  = useState(false);
    const [values, setValues] = useState({
        chapterName:"",
        level : "",
        question : "",
        optionA : "",
        optionB : "",
        optionC : "",
        optionD : "",
        correctOption:"",
        explaination : ""
    });

    const onCancel = () =>{
        setValues({});
        onClose();
    }
    const handleSubmit = () => {
      //put your validation logic here
      
      onSubmit(values);
      onCancel();
  
    };
  
    return (
      <Dialog open={open}>
        <DialogTitle textAlign="center">Add New Question</DialogTitle>
        <DialogContent>
          <form onSubmit={(e) => e.preventDefault()}>
            <Stack
              sx={{
                width: '100%',
                minWidth: { xs: '300px', sm: '360px', md: '400px' },
                gap: '1.2rem',
              }}
            >
              <TextField
                required
                select
                label="Select chapter Name"
                
                onChange={ (e) =>{
                    setValues({...values,chapterName:e.target.value})
                } }
                helperText="Please select chapter name"
              >
                {chapterNames.map((value) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                required
                select
                label="Select level of the question"                
                
                onChange={(e) =>{
                    setValues({...values,level:e.target.value})
                }}
              >
                {levels.map((value) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                required
                label="Write question here"
                onChange={(e) =>{
                    setValues({...values,question:e.target.value})
                }}
                >

              </TextField>
              <TextField
                required
                label="Write option A here"
                onChange={(e) =>{
                    setValues({...values,optionA:e.target.value})
                }}
                >

              </TextField>
              <TextField
                required
                label="Write option B here"
                onChange={(e) =>{
                    setValues({...values,optionB:e.target.value})
                }}
                >

              </TextField>
              <TextField
                required
                label="Write option C here"
                onChange={(e) =>{
                    setValues({...values,optionC:e.target.value})
                }}
                >

              </TextField>
              <TextField
                required
                label="Write option D here"
                onChange={(e) =>{
                    setValues({...values,optionD:e.target.value})
                }}
                >

              </TextField>
              <TextField
                required
                label="Write correct option answer here"
                onChange={(e) =>{
                    setValues({...values,correctOption:e.target.value})
                }}
                >

              </TextField>
              <TextField
                required
                label="Write explaination here"
                onChange={(e) =>{
                    setValues({...values,explaination:e.target.value})
                }}
                >

              </TextField>
            </Stack>
          </form>
        </DialogContent>
        <DialogActions sx={{ p: '1.25rem' }}>
          <Button onClick={onCancel}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  