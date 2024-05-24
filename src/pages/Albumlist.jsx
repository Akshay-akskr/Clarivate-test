import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import './Albumlist.scss';

const List = () => {

    const [albumlist, setAlbumlist] = useState([]);
    const [favAlbums, setFavAlbums] = useState([]);
    const [pagecount, setPageCount] = useState(1);
    const [scrollPosition, setScrollPosition] = useState();
    const [message, setMessage] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const scrollRef = useRef();

    useEffect(() => {
        if(location.state){
            const {albumLists, favLists, page} = location.state;  
            setAlbumlist(albumLists);
            setFavAlbums(favLists);
            setPageCount(page);

            setTimeout(() => {
              scrollRef.current.scrollTop = location.state.scrollPosition;
            }, (10));
          }else{

            fetchAlbumlist(pagecount);
          }
    }, [pagecount])

    function fetchAlbumlist(page) {
        let getAlbumList = "https://jsonplaceholder.typicode.com/albums/1/photos?_page="+page+"&_limit=10";
        fetch(getAlbumList)
            .then(res => res.json())      
            .then(
                (result) => {
                    if(result.length > 0){
                        result.forEach(element => {
                            element['favorite'] = false;                            
                        });
                        let arrAlbum = [...albumlist, ...result];
                        setAlbumlist(arrAlbum);

                    }else{
                        setMessage("No more data to load");
                    }
                },
                (error) => {
                    console.log(error);
                    setMessage("Something went wrong. Please try again.");
                }
            )
    }

    const onChangeHandler = (evt) => {
        const selectItemId = parseInt(evt.target['dataset']['itemid']);

        let _albumlist = albumlist;
        const updatedList = _albumlist.filter((album) => album.id === selectItemId);
        updatedList[0]['favorite'] = !(updatedList[0]['favorite']);
        
        let arrAlbum = [..._albumlist];
        setAlbumlist(arrAlbum);
        
        const favList = arrAlbum.filter((album) => album['favorite'] === true);
        setFavAlbums(favList);
    }

    const handleScroll = (evt) => {        
        const { scrollTop, scrollHeight, clientHeight } = evt.target;
        // sessionStorage.setItem("albumListTop", scrollTop);
        setScrollPosition(scrollTop);

        if(Math.ceil(scrollTop) + clientHeight >= scrollHeight){
            location.state = null;

            let _page = pagecount;
            _page = _page+1;
            setPageCount(_page);
        }
    };

    return (
        <>
            <button 
                onClick={() => {
                    navigate('/', {state: {albumLists:albumlist, favLists:favAlbums, page:pagecount, scrollPosition}})
                }}
            >
                Back
            </button>
            <h3>Album List</h3> 
            <div id="list" className="albumlist-container"
                ref={scrollRef} onScroll={handleScroll}>
                <table style={{width:'100%'}} >
                    <thead>
                        <tr>
                            <th >Id</th>
                            <th style={{width:'50%'}}>Title</th>
                            <th >Album Cover</th>
                            <th >Add to Favorite</th>
                        </tr>
                    </thead>
                    <tbody>
                        {albumlist.map(item => (
                            <tr key={item.id} >
                                <td> {item.id} </td>
                                <td> {item.title} </td>
                                <td> <img src={item.thumbnailUrl} alt={item.thumbnailUrl} width="84px" height="84px" style={{padding:4}}></img> </td>
                                <td> <input className="larger-checkbox" type="checkbox" checked={item.favorite}
                                            data-itemid={item.id} onChange={onChangeHandler} ></input> </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="msg-box">{message}</p>
        </>
      )
  };
  
  export default List;