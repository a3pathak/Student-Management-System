import { Typography, Box, makeStyles, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton, Tooltip } from "@material-ui/core";
import { orange } from "@material-ui/core/colors";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
const useStyles = makeStyles({
    stuListColor: {
        backgroundColor: orange[400],
        color: "white"
    },
    tableHeadCell: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16
    },
})
const StuList = () => {
    const classes = useStyles();
    const [students, setStudents] = useState([]);
    useEffect(() => {
        async function getAllStudent() {
            try {
                const students = await axios.get('http://localhost:8000/student');
                setStudents(students.data);
            } catch (error) {
                console.log('Something went wrong');
            }
        }
        getAllStudent();
    },[])
    const deleteHandler = async id =>{
        await axios.delete(`http://localhost:8000/student/${id}`);
        var newStudent = students.filter((item)=>{
            return item.id !== id;
        })
        setStudents(newStudent);
    }
    
    return (
        <>
            <Box textAlign={"center"} p={2} className={classes.stuListColor}>
                <Typography variant="h4">Student List</Typography>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow style={{ backgroundColor: "#616161" }}>
                            <TableCell align="center" className="classes.tableHeadCell">No</TableCell>
                            <TableCell align="center" className="classes.tableHeadCell">Name</TableCell>
                            <TableCell align="center" className="classes.tableHeadCell">Email</TableCell>
                            <TableCell align="center" className="classes.tableHeadCell">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            students.map((student, i) => {
                                return (
                                    <TableRow key={i}>
                                        <TableCell align="center">{i+1}</TableCell>
                                        <TableCell align="center">{student.studentName}</TableCell>
                                        <TableCell align="center">{student.email}</TableCell>
                                        <TableCell align="center">
                                            <Tooltip title="view">
                                                <IconButton><Link to={`/view/${student.id}`}><VisibilityIcon color="primary" /></Link></IconButton>
                                            </Tooltip>
                                            <Tooltip title="Edit">
                                                <IconButton><Link to={`/edit/${student.id}`}><EditIcon /></Link></IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <IconButton onClick={()=> deleteHandler(student.id)}><DeleteIcon color="secondary" /></IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
export default StuList