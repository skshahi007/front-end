
import axios from "axios";
import { useUser } from '../../auth/useUser';
import { useState, useEffect, useCallback, useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Tooltip,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { AddNewQuestions } from "./AddNewQuestion";
import { AddSet } from "./AddSet";




export default function DataTable(props) {

  const levels = ["EASY", "MEDIUM", "HARD", "HOTS"];
  const [questionList , setQuestionList]=useState([])
  const [chapterNames, setChapterNames] = useState([]);
  const [addSetOpen,setAddSetOpen ]= useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});

  const user = useUser();

  const addNewSet = async (values) => {
    
    
    const response = await axios.post('http://localhost:8080/api/add-set', {

      questionList,
      values,
      addedById: user.id,
      subjectCode: props.subjectCode

    })
    setQuestionList([]);
    
  }
  const handleCreateNewRow = async (values) => {


    values = {
      ...values,
      addedById: user.id,
    }
    try {

      const response = await axios.post(`http://localhost:8080/api/add-question`, {
        values,
        subjectCode: props.subjectCode
      });

      values = {
        ...values,
        _id: response.data.result.insertedId
      }
      tableData.push(values);
      setTableData([...tableData]);
    } catch (err) {
      console.log(err);
    }

  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {

      //send/receive api updates here, then refetch or update local table data for re-render
      try {
        const response = await axios.put('http://localhost:8080/api/update-question', {

          values,
          subjectCode: props.subjectCode
        });
        tableData[row.index] = values;
        setTableData([...tableData]);

      } catch (err) {
        console.log(err);
      }

      exitEditingMode(); //required to exit editing mode and close modal
    }
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteRow = useCallback(
    async (row) => {


      if (
        !window.confirm(`Are you sure you want to delete ${row.getValue('question')}`)
      ) {
        return;
      }
      //send api delete request here, then refetch or update local table data for re-render
      try {
        console.log(row.original);
        const response = await axios.put('http://localhost:8080/api/delete-question', {
          _id: `${row.getValue('_id')}`,
          subjectCode: props.subjectCode
        });
        tableData.splice(row.index, 1);
        setTableData([...tableData]);
      } catch (err) {
        console.log(err);
      }

    },
    [tableData],
  );

  const getCommonEditTextFieldProps = useCallback(
    (cell) => {

      return {

        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid = validateRequired(event.target.value);
          if (!isValid) {
            //set validation error for cell if invalid
            setValidationErrors({
              ...validationErrors,
              [cell.id]: `${cell.column.columnDef.header} is required`,
            });
          } else {
            //remove validation error for cell if valid
            delete validationErrors[cell.id];
            setValidationErrors({
              ...validationErrors,
            });
          }
        },
      };
    },
    [validationErrors],
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: '_id',
        header: 'ID',
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 80,
      },
      {
        accessorKey: 'chapterName',
        header: 'Chapter Name',
        size: 60,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({

          select: true, //change to select for a dropdown
          children: chapterNames.map((chapterName) => (
            <MenuItem key={chapterName} value={chapterName}>
              {chapterName}
            </MenuItem>
          )),
        }),
      },
      {
        accessorKey: 'level',
        header: 'Level',
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          select: true, //change to select for a dropdown
          children: levels.map((level) => (
            <MenuItem key={level} value={level}>
              {level}
            </MenuItem>
          )),
        }),
      },
      {
        accessorKey: 'question',
        header: 'Questions',
        size: 180,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'optionA',
        header: 'Option - A',
        size: 180,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'optionB',
        header: 'Option - B',
        size: 180,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'optionC',
        header: 'Option - C',
        size: 180,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'optionD',
        header: 'Option - D',
        size: 180,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'correctOption',
        header: 'Correct Answer',
        size: 180,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'explaination',
        header: 'Explaination',
        size: 180,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },

    ],
    [getCommonEditTextFieldProps],
  );
  
  const requestData = async () => {
    try {
      const respond = await axios.post('http://localhost:8080/api/get-chapters', { subjectCode: props.subjectCode })
      if (respond.status === 200) {
        setChapterNames(respond.data);
      }
      const response = await axios.post('http://localhost:8080/api/get-questions', {
        id: user.id,
        email: user.email,
        subjectCode: props.subjectCode
      });

      if (response.status === 200) {
        setTableData(response.data.data);
      }

    }
    catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    requestData();
  }, []);



  return (
    <div style={{ height: '100%', width: '100%' }}>

      <MaterialReactTable
        displayColumnDefOptions={{
          'mrt-row-actions': {
            muiTableHeadCellProps: {
              align: 'center',
            },
            size: 120,
          },
        }}
        columns={columns}

        data={tableData}
        editingMode="modal" //default
        enableColumnOrdering
        enableEditing
        enableRowSelection
        initialState={{ columnVisibility: { _id: false } }}
        onEditingRowSave={handleSaveRowEdits}
        onEditingRowCancel={handleCancelRowEdits}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => table.setEditingRow(row)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}

        renderTopToolbarCustomActions={({ table }) => {
          const makeSet = () => {
            setQuestionList([]);
            table.getSelectedRowModel().flatRows.map((row) => {
              
              setQuestionList( (questionList) =>  [...questionList,row.getValue('_id')]);              
              
            });
            
            
          };

          return (
            <>
              <Button
                onClick={() => setCreateModalOpen(true)}
                variant="contained"
              >
                Add New Question
              </Button>
              <Button
                color="success"
                disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
                onClick={() => {setAddSetOpen(true)
                                makeSet()
                  }}
                variant="contained"
              >
                Make a Set
              </Button>
            </>
          )
        }}
      />
      <AddSet
        open={addSetOpen}
        onClose={() => setAddSetOpen(false)}
        onSubmit={addNewSet}
      />
      <AddNewQuestions
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
        chapterNames={chapterNames}
        levels= {levels}
      />
    </div>
  );
}

const validateRequired = (value) => !!value.length;