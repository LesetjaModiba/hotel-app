import Add from "./add";
import Remove from "./remove";
import Header from "./header";
import "../css/manage.css"

const  Manage= () => {
    return ( 
        <>
            <Header/>
        <div className="manage">
        <Add/>
        <Remove/>
        </div>
        </>

     );
}
 
export default Manage;