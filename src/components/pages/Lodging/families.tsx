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

interface families{
  babysitting?: boolean | null;
  /**
   * Babysitting exception.
   */
  babysittingException?: string | null;
  /**
   * Kids activities. Recreational options such as sports, films, crafts and games designed for the enjoyment of children and offered at the hotel. May or may not be supervised. May or may not be at a designated time or place. Cab be free or for a fee.
   */
  kidsActivities?: boolean | null;
  /**
   * Kids activities exception.
   */
  kidsActivitiesException?: string | null;
  /**
   * Kids club. An organized program of group activities held at the hotel and designed for the enjoyment of children. Facilitated by hotel staff (or staff procured by the hotel) in an area(s) designated for the purpose of entertaining children without their parents. May include games, outings, water sports, team sports, arts and crafts, and films. Usually has set hours. Can be free or for a fee. Also known as Kids Camp or Kids program.
   */
  kidsClub?: boolean | null;
  /**
   * Kids club exception.
   */
  kidsClubException?: string | null;
  /**
   * Kids friendly. The hotel has one or more special features for families with children, such as reduced rates, child-sized beds, kids' club, babysitting service, or suitable place to play on premises.
   */
  kidsFriendly?: boolean | null;
  /**
   * Kids friendly exception.
   */
  kidsFriendlyException?: string | null;
  
}

const Families: React.FC<Props> = (props) => {
  const [display,setDisplay]=useState(false)
  const [formState, setFormState] = useState<families>({
    babysitting: null,
    kidsActivities: null,
    kidsClub:null,
    kidsFriendly: null,
  });
  
  const Guest_services = ['Activities for kids','babysitting','kids\' Club','Child-friendly'];
  
  const serviceFields = Object.keys(formState);
                 


  const Cancel =()=>{
    setDisplay(false)
  }    
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const body = {
      updateTime: new Date().toISOString(), 
      lodging: { "families": formState },
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
      <h4>Children</h4>
      <p>Services and amenities for families and young guests.</p>
    </div>
   
   <div className='guest-service-section'>
    
      {!display && (
      
      <div className=''  onClick={() => setDisplay(true)}>
      <h5>Children</h5>
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
              <h5>Children</h5>
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
export default Families;