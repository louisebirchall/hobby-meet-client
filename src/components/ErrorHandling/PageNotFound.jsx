import { Button } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

// showing the user the page he's been looking for doesn't exist
// btn to go "home" (/)
    const styles = {
      divStyle: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        paddingTop: 20,
        paddingBottom: 20,
        textAlign: "center",
      },
    };

export default function PageNotFound(props) {
    return (
        <div style={styles.divStyle}>
            <h1>Sorry, this page does not exist.</h1>
            <Box sx={{height: 10}}/>
            <Button color="secondary" variant="contained" onClick={() => props.history.push("/") }>Return to Home Page</Button>
        </div>
    )
}
