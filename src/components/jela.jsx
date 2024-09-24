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
            {recipes == null ? <h1>Učitavanje jela...</h1>  : recipes.map((recipe) => (
             <JednoJelo key={recipe.id} recipe={recipe} />
      ))}
        </div>
    )
}

export default Jela