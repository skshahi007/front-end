import { Dialog, DialogContent, DialogTitle, Stack, TextField , DialogActions, Button, MenuItem } from "@mui/material";
import { useState } from "react";

export const AddSet = ({ open , onClose, onSubmit }) => {
    const [validationRequired, setValidationRequired ]  = useState(false);
    const types=["PRACTICE QUIZ","PRACTICE SET" ]
    const levels=["EASY","MEDIUM","HARD","HOTS"]
    const [values, setValues] = useState({
        setName:"",
        type : "",
        level : "",
        description : "",
        subjectCode:""
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
        <DialogTitle textAlign="center">Add New Set</DialogTitle>
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
                label="Add Set Name"               
                onChange={(e) =>{
                  setValues({...values,setName:e.target.value})
                }}
              />
              <TextField
                required
                select
                label="Select Type of Set"
                
                onChange={ (e) =>{
                    setValues({...values,type:e.target.value})
                } }
                helperText="Please select type of Set"
              >
                {types.map((value) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                required
                select
                label="Select level of the Set"                
                
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
                label="Desription About Set"
                onChange={(e) =>{
                    setValues({...values,description:e.target.value})
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
  