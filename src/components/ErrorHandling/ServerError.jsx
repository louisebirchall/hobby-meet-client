import React from 'react'
import { Button } from '@mui/material';

// showing the user the server error (500)
// with a possibility to going back where he came from via btn (history)
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

export default function ServerError({history}) {
    return (
        <div style={styles.divStyle}>
            <h1>Server error - page not working as expected!</h1>
            <Button color="secondary" variant="contained" onClick={() => history.goBack()}>Go Back & Try again!</Button>
        </div>
    )
}