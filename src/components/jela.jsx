import React from 'react'
import JednoJelo from './jednoJelo'

const Jela = ({nizJela}) => {

    return (
        <div className="all-products">
            {nizJela.map((jelo) => (
            <JednoJelo jelo={jelo} />
      ))}

        </div>
    )
}

export default Jela