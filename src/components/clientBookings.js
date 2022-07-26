import "../css/clientBooking.css"
const ClientBookings = (props) => {
    console.log(props.get.name)
    return ( 
        <div className="booking-container">
            
                <h1>{props.get.name}</h1>
           
        </div>

     );
}
 
export default ClientBookings;