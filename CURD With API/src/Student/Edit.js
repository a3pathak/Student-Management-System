import { Typography,Box,Grid,makeStyles,TextField, Button} from "@material-ui/core";
import { deepPurple,green} from "@material-ui/core/colors";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Home from "../Components/Pages/Home";
const useStyles = makeStyles({
    headingColor:{
        backgroundColor: deepPurple[400],
        color:"white"
    },
    addstudentColor:{
        backgroundColor:green[400],
        color:"white"
    }
})
const Edit = ()=>{
    const classes = useStyles();
    const { id } = useParams();
    const [student,setStudent] = useState({
        id:"",
        studentName:"",
        email:""
    });
    useEffect(()=>{
        async function getData(){
            try{
                const student = await axios.get(`http://localhost:8000/student/${id}`);
                setStudent(student.data);
            }
            catch(error){
                console.log('something went worng in Edit file');
            }
        }
        getData();
    },[id])
    function onTextFieldChange(e){
        setStudent({
            ...student,
            [e.target.name]:e.target.value,
        });
    }
    const [status, setStatus] = useState(); 
    async function onFormSubmit(e){
        e.preventDefault();
        try{
            await axios.put(`http://localhost:8000/student/${id}`,student);
            setStatus(true);
        }
        catch(error){
            console.log('Something went wrong');
        }
    }
    const navigate = useNavigate();
    if(status){
        return <Home />
    }
    return(
        <>
            <Box textAlign={"Center"} className={classes.headingColor} p={2} mb={2}>
                <Typography variant="h2">React CRUD With API Call</Typography>
            </Box>
            <Grid container justifyContent="center" spacing={4}>
                <Grid item md={6} xs ={12}>
                    <Box textAlign={"center"} p={2} className={classes.addstudentColor} mb={2}>
                        <Typography variant = "h4">Edit studentdent</Typography>
                    </Box>
                    <form>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField autoComplete="id" name="id" variant="outlined" required fullWidth id="id" label="ID" autoFocus value={student.id} disabled />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField autoComplete="studentname" name="studentName" variant="outlined" required fullWidth id="studentname" label="Name"  value={student.studentName} onChange={e=>onTextFieldChange(e)}/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField autoComplete="email" name="email" variant="outlined" required fullWidth id="email" label="Email Address" value={student.email} onChange={e=>onTextFieldChange(e)}/>
                            </Grid>
                        </Grid>
                        <Box m={3}>
                            <Button type="submit" variant="contained" color="primary" fullWidth onClick={e =>onFormSubmit(e)}>Update</Button>
                        </Box>
                    </form>
                    <Box m={3} textAlign="center">
                        <Button variant="contained" color="primary" onClick={()=>navigate("/")}>Back To Home</Button>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}
export default Edit;