import { Typography,Box,Grid,makeStyles,TextField, Button} from "@material-ui/core";
import { deepPurple,green} from "@material-ui/core/colors";
import StuList from "../../Student/StuList";
import { useState } from "react";
import axios from "axios";
const useStyles = makeStyles({
    headingColor:{
        backgroundColor: deepPurple[400],
        color:"white"
    },
    addStuColor:{
        backgroundColor:green[400],
        color:"white"
    }
})

const Home = ()=>{
    const classes = useStyles();
    const [student,setStudent] = useState({
        studentName:"",
        email:""
    });
    const [status, setStatus] = useState(); 
    function onTextFieldChange(e){
        setStudent({
            ...student,
            [e.target.name]:e.target.value,
        });
        console.log(student);
    }
    async function onFormSubmit(e){
        e.preventDefault();
        try{
            await axios.post(`http://localhost:8000/student`,student);
            setStatus(true);
        }
        catch(error){
            console.log('Something went wrong');
        }
    }
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
                    <Box textAlign={"center"} p={2} className={classes.addStuColor} mb={2}>
                        <Typography variant = "h4">Add Student</Typography>
                    </Box>
                    <form noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField autoComplete="stuname" name="studentName" variant="outlined" required fullWidth id="stuname" label="name" onChange={ e => onTextFieldChange(e)}/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField autoComplete="email" name="email" variant="outlined" required fullWidth id="email" label="Email Address" onChange={ e => onTextFieldChange(e)}/>
                            </Grid>
                        </Grid>
                        <Box m={3}>
                            <Button type="submit" variant="contained" color="primary" fullWidth onClick={e=>onFormSubmit(e)}>Add</Button>
                        </Box>
                    </form>
                </Grid>

                <Grid item md={6} xs ={12}>
                    <StuList />
                </Grid>
            </Grid>
        </>
    );
}
export default Home;