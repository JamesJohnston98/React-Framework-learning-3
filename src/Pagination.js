import React from 'react'

export default function Pagination({gotoNextPage, gotoPrevPage}) {
    return (
        <div>
            {/* If there is a previous page render the previous button if there is not something before the page 
            you are on it will not render the button because it uses the && which will only
            run if there is something. */}
           {gotoPrevPage && <button onClick={gotoPrevPage}>Previous</button>}
           {gotoNextPage && <button onClick={gotoNextPage}>Next</button>}
        </div>
    )
}
