import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

export const AddNewSubject = ({ open, onClose, onSubmit }) => {
  const [values, setValues] = useState();
  const [chapterNames ,setChapterNames] = useState([]);
  const [chapterName, setChapterName] = useState('');
  const [required, setRequired] = useState();
  const [errChapterName,setErrChapterName ] = useState();
  const handleSubmit = () => {
    //put your validation logic here
    if (values) {

      onSubmit(values,chapterNames);
      onClose();
    } else {
      setRequired("can't be blank");
    }

  };
  const addChapters= () => {
    if(!chapterName){
      setErrChapterName("write full chapter name")
    }else{
      setChapterNames([
        ...chapterNames,chapterName
      ])
      setChapterName('')
    }
  }
  const onCancel= () => {
    setChapterNames([]);
    setChapterName("");
    onClose();
  }
  return (
    <>
      <Dialog open={open}>
        <DialogTitle textAlign="center">Add New Subject</DialogTitle>
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
                  setValues(e.target.value)
                }
              />              
              {required && (
                <Typography >{required} </Typography>
              )}
            </Stack>
            <Stack
              sx={{
                width: '100%',
                minWidth: { xs: '300px', sm: '360px', md: '400px' },
                gap: '1.5rem',
              }}
            >
              <DialogTitle textAlign="center">Add all Chapters :-</DialogTitle>
              <TextField
                value={chapterName}
                onChange={(e) =>
                  setChapterName(e.target.value)
                }
              />
              {errChapterName && (
                <Typography >{errChapterName} </Typography>
              )}
              <Button onClick={addChapters} variant="contained">
                Add Chapter Number {chapterNames.length+1}
              </Button>    
            </Stack>
          </form>
        </DialogContent>
        <DialogActions sx={{ p: '1.25rem' }}>
          <Button onClick={onCancel}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Submit
          </Button>
        </DialogActions>
        <Typography variant="p">Note : Please add all Chapter names serially Here.</Typography>
      </Dialog>
    </>
  )
}