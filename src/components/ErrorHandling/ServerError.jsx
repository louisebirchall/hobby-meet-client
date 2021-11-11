import React from 'react'

// showing the user the server error (500)
// with a possibility to going back where he came from via btn (history)

export default function ServerError({history}) {
    return (
        <div>
            <h1>Server error - page not working as expected!</h1>
            <button onClick={() => history.goBack()}>Go Back & Try again!</button>
        </div>
    )
}