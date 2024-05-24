import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Dashboard.scss'

const DashBoard = () => {

  const [favList, setFavList] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(()=> {
    if(location.state){
      const {favLists} = location.state;
      setFavList(favLists);
    }
  })

  return (
    <>
      <h3>Favorite List</h3>
      {favList.length === 0 && 
        <h5>No favorites added.</h5>
      }
      {favList.length > 0 && 
        <div id="favlist" className="favlist-container" >
          <table style={{width:'100%'}} >                
              <tbody>
                  {favList.map(fav => (
                    <tr key={fav.id} >
                          <td> {fav.title} </td>
                          <td> <img src={fav.thumbnailUrl} alt={fav.thumbnailUrl} width="84px" height="84px" style={{padding:4}}></img> </td>
                      </tr>
                  ))}
              </tbody>
          </table>
        </div>
      }

      <button className="forward-nav-btn"
        onClick={() => {
          navigate('/list', {state: location.state})
        }}
      >
        Go to Album list
      </button>

    </>
  )
};

export default DashBoard;