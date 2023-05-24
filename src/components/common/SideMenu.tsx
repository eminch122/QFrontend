import React, { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
type Props = {
  children: ReactNode;
  // Define the props for your component here
};

export const SideMenu: React.FC<Props> = (props) => {
  const items=[
    
    {
      path:"/google",
      name:"Google",
      icon:<img className='img-fluid' src='/assets/img/gg.png'/>
    },
    {
      path:"/facebook",
      name:"Facebook",
      icon:<img className='img-fluid' src='/assets/img/fb.png'/>
    },
    {
      path:"/instagram",
      name:"Instagram",
      icon:<img className='img-fluid' src='/assets/img/ins.png'/>
    }
    
  
  ]
  const handleClick=() =>{
      window.location.href = "https://www.quicktext.im";
    }
  return (
    
      <div className='container-fluid '>
        <div className='row d-flex wrapper'>
          <div className='col-3 gx-0'>
            <div className='sidebar d-flex flex-column'>
              <div className='sidebar-header '>
                <h3 >Medias</h3>
              </div>
                <ul className="nav flex-column "> 
                  {
                      items.map((item, index)=>(
                          <NavLink to={item.path} key={index} className="nav-item d-flex justify-content-center " >
                            
                                <a className="nav-link">{item.name}</a>
                                <a className="icon">{item.icon}</a>
                              
                          </NavLink>
                      ))
                  }
                </ul>
                  <div onClick={handleClick} className='sidebar-footer mt-auto d-flex justify-content-center' >
                    <img className='zoomIn' style={{width:'40px',height:'40px'}} src='/assets/img/logo.png' />
                    <p className='footer-text zoomIn'>Quicktext work</p>
                  </div>
            </div>
          </div>
          <div className='col-9 gx-0'>
            <main>{props.children}</main>
          </div>
        </div>
      </div>
    
  );
};