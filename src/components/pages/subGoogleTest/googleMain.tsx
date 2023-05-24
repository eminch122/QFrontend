import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Activities from '../Lodging/activities';
import Business from '../Lodging/business';
import Connectivity from '../Lodging/connectivity';
import Families from '../Lodging/families';
import FoodAndDrink from '../Lodging/foodAndDrink';
import Housekeeping from '../Lodging/housekeeping';
import Parking from '../Lodging/parking';
import Policies from '../Lodging/policies';
import Pools from '../Lodging/pools';
import Services from '../Lodging/services';
import Transportation from '../Lodging/transportation';
import Wellness from '../Lodging/wellness';
type Props = {
  accessToken:string
};

const GoogleMain: React.FC<Props> = (Props) => {
    const fieldNames = [ 'services', 'foodAndDrink','policies', 
                        'wellness','transportation', 'families',
                        'parking', 'housekeeping','pools',
                         'activities','connectivity', 'business'];
    const [selectedItem, setSelectedItem] = useState('');
   
    return (

      <div className="container-fluid">
       
        <div className="row d-flex gx-0">
        <div className='Details-title text-center'>
              <h3>Hotel Details {Props.accessToken} </h3>
              
            </div>
          <div className="col-3 ">
            <ul className="categories lodging nav flex-column">
              {fieldNames.map((fieldName) => (
                <li key={fieldName} className={`nav-item ${fieldName === selectedItem ? "selected" : ""}`} onClick={() => setSelectedItem(fieldName)}>
                  <Link to={`/google/${fieldName}`} className="nav-link">
                    {fieldName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-9 ">
            <Routes>
              <Route path="/" element={<Services accessToken={Props.accessToken}/>} />
              <Route path="/services" element={<Services accessToken={Props.accessToken}/>} />
              <Route path="/foodAndDrink" element={<FoodAndDrink/>} />
              <Route path="/policies" element={<Policies/>} />
              <Route path="/wellness" element={<Wellness/>} />
              <Route path="/transportation" element={<Transportation/>} />
              <Route path="/families" element={<Families accessToken={Props.accessToken}/>} />
              <Route path="/parking" element={<Parking/>} />
              <Route path="/housekeeping" element={<Housekeeping/>} />
              <Route path="/pools" element={<Pools/>} />
              <Route path="/activities" element={<Activities/>} /> 
              <Route path="/connectivity" element={<Connectivity/>} />
              <Route path="/business" element={<Business/>} />
            </Routes>
          </div>
        </div>
      </div>
    );
  
}


export default GoogleMain;
