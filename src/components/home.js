import Display from "./display";
import Header from "./header";
import "../css/home.css"

const Home = () => {
    return ( 
        <>
        <Header/>
        <div className="heading"><h1>All Hotels</h1></div>
        <Display/>
        </>
     );
}
 
export default Home;