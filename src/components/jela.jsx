import React from 'react'
import JednoJelo from './jednoJelo'
import axios from 'axios'
import { useState, useEffect} from 'react'

const Jela = () => {

    const [recipes,setRecipes]=useState();
    useEffect(()=>{
        if(recipes==null){
            axios.get("/api/recipes").then((res)=>{
                console.log(res.data);
                setRecipes(res.data.data);
            })
        }         

    })

    return (
        <div className="all-products">
            {recipes == null ? <h1>ne</h1>  : recipes.map((jelo) => (
             <JednoJelo key={jelo.id} jelo={jelo} />
      ))}
        </div>
    )
}

export default Jela