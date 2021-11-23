import React, { Component } from "react";
import authService from "../../services/auth-service";

class Signup extends Component {
  state = {
    username: "",
    email: "",
    password: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { username, email, password } = this.state;

    authService
      .signup(username, email, password)
      .then((result) => {
        this.setState({ username: "", email: "", password: "" });
        this.props.setUser(result.data, true);
        this.props.history.push(`/profile/${result.data._id}`)
      })
     // .catch(() => this.props.history.push("Error while trying to signup"));
  };

  render() {
    const { username, email, password } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        <label>Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
          />
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          <label>Password</label>
          <input
            type="text"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
          <button type="submit">Signup</button>
        </form>
      </div>
    );
  }
}

export default Signup;

// import * as React from 'react';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';

// export default function MultilineTextFields() {
//   const [value, setValue] = React.useState('Controlled');

//   const handleChange = (event) => {
//     setValue(event.target.value);
//   };

//   return (
//     <Box
//       component="form"
//       sx={{
//         '& .MuiTextField-root': { m: 1, width: '25ch' },
//       }}
//       noValidate
//       autoComplete="off"
//     >
//       <div>
//         <TextField
//           id="outlined-multiline-flexible"
//           label="Multiline"
//           multiline
//           maxRows={4}
//           value={value}
//           onChange={handleChange}
//         />
//         <TextField
//           id="outlined-textarea"
//           label="Multiline Placeholder"
//           placeholder="Placeholder"
//           multiline
//         />
//         <TextField
//           id="outlined-multiline-static"
//           label="Multiline"
//           multiline
//           rows={4}
//           defaultValue="Default Value"
//         />
//       </div>
//       <div>
//         <TextField
//           id="filled-multiline-flexible"
//           label="Multiline"
//           multiline
//           maxRows={4}
//           value={value}
//           onChange={handleChange}
//           variant="filled"
//         />
//         <TextField
//           id="filled-textarea"
//           label="Multiline Placeholder"
//           placeholder="Placeholder"
//           multiline
//           variant="filled"
//         />
//         <TextField
//           id="filled-multiline-static"
//           label="Multiline"
//           multiline
//           rows={4}
//           defaultValue="Default Value"
//           variant="filled"
//         />
//       </div>
//       <div>
//         <TextField
//           id="standard-multiline-flexible"
//           label="Multiline"
//           multiline
//           maxRows={4}
//           value={value}
//           onChange={handleChange}
//           variant="standard"
//         />
//         <TextField
//           id="standard-textarea"
//           label="Multiline Placeholder"
//           placeholder="Placeholder"
//           multiline
//           variant="standard"
//         />
//         <TextField
//           id="standard-multiline-static"
//           label="Multiline"
//           multiline
//           rows={4}
//           defaultValue="Default Value"
//           variant="standard"
//         />
//       </div>
//     </Box>
//   );
// }