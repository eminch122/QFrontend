import { useState } from 'react';
import FoodAndDrink from '../Lodging/foodAndDrink';
import Services from '../Lodging/services';
type Props = {
  accessToken: string
};

const GoogleDetails: React.FC<Props> = (Props) => {
  

  const fieldNames = ['services', 'foodAndDrink'];
  const [activeComponent, setActiveComponent] = useState(<Services accessToken={Props.accessToken}/>);

  const handleClick = (fieldName: string) => {
    switch (fieldName) {
      case 'services':
        setActiveComponent(<Services accessToken={Props.accessToken}/>);
        break;
      case 'foodAndDrink':
        setActiveComponent(<FoodAndDrink />);
        break;
      default:
        setActiveComponent(<Services accessToken={Props.accessToken}/>);
    }
  };
  

  return (
    
        <div className="container-fluid">
          <div className="row">
            <div className="col-3">
              <ul className="nav flex-column">
              {fieldNames.map((fieldName) => (
              <li key={fieldName} className="nav-item">
                <button  onClick={() => handleClick(fieldName)}>
                  {fieldName}
                </button>
              </li>
            ))}
              </ul>
            </div>
            <div className="col-9">
            {activeComponent}
            </div>
          </div>
        </div>
    
  );
  
}


export default GoogleDetails;
