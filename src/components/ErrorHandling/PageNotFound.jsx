import React from 'react'

// showing the user the page he's been looking for doesn't exist
// btn to go "home" (/)

export default function PageNotFound(props) {
    return (
        <div>
            <h1>Sorry page does not exist.</h1>
            <button onClick={() => props.history.push("/") }>Sorry, try again.</button>
        </div>
    )
}
