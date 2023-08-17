import { useState, useEffect } from "react";
import { AddNewStandard } from "../helper/AddNewStandard";
import { Button } from "@mui/material";
import axios from "axios";
import { useUser } from "../../auth/useUser";
import AllStandard from "../helper/AllStandard";

export default function StandardExams() {
  const guruUser = useUser();
  const { id } = guruUser;
  const [createModelOpen, setCreateModelOpen] = useState(false);
  


  const handleCreateNewRow = async (values) => {
    try {
      const response = await axios.post('http://localhost:8080/api/add-course-name', {
        name: values,
        addedById: id
      });
      if (response.status == 200) {
        
      }

    } catch (error) {
      window.alert(error);
    }
  };


  return (
    <>
      <Button onClick={() => setCreateModelOpen(true)}>Add New Standard</Button>
      <AddNewStandard
        open={createModelOpen}
        onClose={() => setCreateModelOpen(false)}
        onSubmit={handleCreateNewRow}
      />
      <AllStandard />

    </>
  )
}

