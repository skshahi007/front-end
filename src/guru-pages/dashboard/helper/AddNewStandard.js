import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

export const AddNewStandard = ({ open, onClose, onSubmit }) => {
    
    const [values, setValues] = useState();
    const [required, setRequired ]= useState();
    const handleSubmit = () => {
      //put your validation logic here
      if(values){
            
        onSubmit(values);
        onClose();
      }else{
        setRequired("can't be blank");
      }
  
    };
  
    return (
      <Dialog open={open}>
        <DialogTitle textAlign="center">Add New Standard</DialogTitle>
        <DialogContent>
          <form onSubmit={(e) => e.preventDefault()}>
            <Stack
              sx={{
                width: '100%',
                minWidth: { xs: '300px', sm: '360px', md: '400px' },
                gap: '1.5rem',
              }}
            >         
                
                <TextField
                  
                  onChange={(e) =>
                    setValues( e.target.value )
                  }
                />
                {required  && (
                    <Typography >{required} </Typography>
                )}
            </Stack>
          </form>
        </DialogContent>
        <DialogActions sx={{ p: '1.25rem' }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  