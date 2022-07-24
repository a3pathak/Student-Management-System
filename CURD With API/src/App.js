import View from './Student/View';
import Edit from './Student/Edit';
import { Routes, BrowserRouter,Route} from 'react-router-dom';
import Home from './Components/Pages/Home';
function App(){
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element = {<Home />} />
                    <Route exact path="/view/:id" element = {<View />} />
                    <Route exact path="/edit/:id" element = {<Edit />} />
                </Routes>
            </BrowserRouter>  
        </>
    );
}
export default App;