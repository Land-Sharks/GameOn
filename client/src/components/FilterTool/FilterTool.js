import React, { useState, useEffect } from 'react';
import './FilterTool.css'

import auth from '../../services/auth';

const FilterTool = (props) => {

    const [ genres, setGenres ] = useState([]);
    const [ genre, setGenre ] = useState();
    const [ limit, setLimit ] = useState(50);
    const [ page, setPage ] = useState(0);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch('/api/genres/');
                const data = await response.json();
                setGenres(data);
                
            } 
            catch (e) {
                console.log(e);
            }
        })()
    }, [])

    // useEffect(async () => {
    //     let url = "";
    //     if (genre) {
    //         url += `?genre=${genre}`
    //     }
    //     props.addQuery(url);
    // }, [ genre, limit, page ]);

    const addGenre = (e) => {
        props.addQuery(`?genre=${e.target.value}`)
    }

    return (
        <div className="filter-tool">
            <select onChange={(e) => addGenre(e)} id="genre">
                <option>Category</option>
                {
                    genres.map((g) => {
                        return <option>{g.name}</option>
                    })
                }
            </select>
            <div className="range">
                <input type="range" min="10" max="50" 
                    onChange={(e) => {
                        setLimit(e.target.value)
                        setPage(0)
                    }} step="10" />
                <p>{limit}</p>
            </div>
            <div>
                <input type="button" value="<"/>
                <input type="button" value=">"/>
            </div>
        </div>
    )

}

export default FilterTool;