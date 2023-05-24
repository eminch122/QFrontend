import React, { useState } from 'react'
type Props={
  accessToken:string
};
enum Exception{
  EXCEPTION_UNSPECIFIED='EXCEPTION_UNSPECIFIED',
  UNDER_CONSTRUCTION='UNDER_CONSTRUCTION',
  DEPENDENT_ON_SEASON='DEPENDENT_ON_SEASON',
  DEPENDENT_ON_DAY_OF_WEEK='DEPENDENT_ON_DAY_OF_WEEK'
}

interface Services{

  frontDesk: boolean | null,
  frontDeskException?: Exception

  twentyFourHourFrontDesk: boolean | null,
  twentyFourHourFrontDeskException?: Exception

  concierge: boolean | null,
  conciergeException?: Exception
  
  elevator: boolean | null,
  elevatorException?: Exception

  baggageStorage: boolean | null,
  baggageStorageException?: Exception

  fullServiceLaundry: boolean | null,
  fullServiceLaundryException?: Exception

  selfServiceLaundry: boolean | null,
  selfServiceLaundryException?: Exception

  socialHour: boolean | null,
  socialHourException?: Exception
  
  convenienceStore: boolean | null,
  convenienceStoreException?: Exception

  giftShop: boolean | null,
  giftShopException?: Exception

  wakeUpCalls: boolean | null,
  wakeUpCallsException?: Exception

  currencyExchange: boolean | null,
  currencyExchangeException?: Exception

}

const Services: React.FC<Props> = (props) => {
  const [display,setDisplay]=useState(false)
  const [formState, setFormState] = useState<Services>({
    frontDesk: null,
    twentyFourHourFrontDesk: null,
    concierge:null,
    elevator: null,
    baggageStorage:null,
    fullServiceLaundry: null,
    selfServiceLaundry:null,
    socialHour:null,
    convenienceStore: null,
    giftShop:null,
    wakeUpCalls: null,
    currencyExchange:null,
  });
  
  const Guest_services = ['Baggage storage','Concierge','Grocery shop',
  'Currency exchange','Lift','Front desk','Gift shop',
  'Full-service laundry','Self-service laundry',
  'Social hour','Wake up calls'];
  
  const serviceFields = Object.keys(formState);
                 


  const Cancel =()=>{
    setDisplay(false)
  }    
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const body = {
      updateTime: new Date().toISOString(), 
      lodging: { "services": formState },
      accessToken: props.accessToken,
    };
    event.preventDefault();
    const response = await fetch('http://localhost:3000/lodging/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    console.log(data);
  }; 

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((state) => ({
      ...state,
      [name]: value === 'yes' ? true : false,
      
    }));
  };
  console.log(formState)
  const formatFieldName = (name: string) => {
    return name
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
  };
return (
  <>
    <div className='header p-3'>  
      <h4>Services</h4>
      <p>Conveniences or help provided by the hotel to facilitate an easier, more comfortable stay.</p>
    </div>
   
   <div className='guest-service-section'>
    
      {!display && (
      
      <div className=''  onClick={() => setDisplay(true)}>
      <h5>Guest services</h5>
      <ul className="nav flex-column">
                {Guest_services.map((guestService) => (
                <li key={guestService} className="nav-item">
                    {guestService}
                </li>
              ))}
                </ul>
      </div>)
      }
        {display && (
            <>
              <h5>Guest services</h5>
              <form onSubmit={handleSubmit}>
              {serviceFields.map((field) => (
                <div key={field}>
                  {formatFieldName(field)}
                  <input type="radio" name={field} value="yes" onChange={handleOptionChange}/> Yes
                  <input type="radio" name={field} value="no" onChange={handleOptionChange} /> No
                </div>
                ))}
                <div className="col-auto">
                  <button type="submit">Save</button>
                  <button type="button" className="btn btn-primary mb-3" onClick={Cancel}>Cancel</button>
                </div>
              </form>
            </>
                )
        }
    </div>
  </>
   
)
}
export default Services;