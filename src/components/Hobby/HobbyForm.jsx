import React, { Component } from "react";
import hobbyService from "../../services/hobby-service";
import generalService from "../../services/general-service";
import { PuffLoader } from "react-spinners";

// textfield / form
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

// input for selecting typeOfActivity 
// const typeOfActivity = [
//   {
//     value: 'Sport',
//     label: 'Sport',
//   },
//   {
//     value: 'Craft',
//    label: 'Craft',
//   },
//   {
//     value: 'Workshop',
//     label: 'Workshop',
//   },
//   {
//     value: 'Music',
//     label: 'Music',
//   },
//   {
//     value: 'Art',
//     label: 'Art',
//   },
//   {
//     value: 'Manual',
//     label: 'Manual',
//   },
//   {
//     value: 'Food',
//     label: 'Food',
//   },
//   {
//     value: 'Gardening',
//     label: 'Gardening',
//   },
//   {
//     value: 'MeetUp',
//     label: 'MeetUp',
//   },
//   {
//     value: 'Language',
//     label: 'Language',
//   },
//   {
//     value: 'Spiritual',
//     label: 'Spiritual',
//   },
//   {
//     value: 'Photography',
//     label: 'Photography',
//   },
// ];

// input for selecting placeOfActivity 
// const placeOfActivity = [
//   {
//     value: 'Indoors',
//     label: 'Indoors',
//   },
//   {
//     value: 'Outdoors',
//     label: 'Outdoors',
//   },
//   {
//     value: 'Indoors & Outdoors',
//     label: 'Indoors & Outdoors',
//   },
// ]

class HobbyForm extends Component {
  state = {
    name: "",
   // typeOfActivity: "",
    description: "",
    image: "",
   // placeOfActivity: "",
    imageIsUploading: false,
  };  

  handleImageUpload = (event) => {
    this.setState({ imageIsUploading: true });

    const uploadData = new FormData();
    uploadData.append("image", event.target.files[0]);

    generalService
      .upload(uploadData)
      .then((result) => {
        this.setState({
          image: result.data.imagePath,
          imageIsUploading: false,
        });
      })
      .catch(() => {
        this.props.history.push("/500");
      });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      //[event.target.value]: event.target.value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { name, 
      // typeOfActivity, 
      description, image, 
      // placeOfActivity 
    } =
      this.state;
    const { id } = this.props.match.params;

    if (this.props.isEdit) {
      hobbyService
        .edit(id, name, 
          // typeOfActivity, 
          description, image, 
         // placeOfActivity
          )
        .then(() => {
          this.props.history.push(`/hobbies/${id}`);
        })
        .catch((err) => {
          this.props.history.push("/500");
        });
    } else {
      hobbyService
        .create(name, 
          //typeOfActivity, 
          description, image, 
          // placeOfActivity
          )
        .then((response) => {
          console.log("newly created charity", response.data)
          this.props.history.push(`/hobbies/${response.data._id}`);
        })
        .catch((err) => {
         // console.log("charity creation", err)
         // this.props.history.push("/500");
        });
    }
  };

  // handleDelete = () => {
  //   const { id } = this.props.match.params;
  //   hobbyService
  //     .delete(id)
  //     .then((data) => {
  //       this.props.history.push("/hobbies");
  //     })
  //     .catch((err) => {
  //       this.props.history.push("/500");
  //     });
  // };

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      hobbyService
      .getHobby(id)
      .then((result) => {
        this.setState({
          name: result.data.name,
          // typeOfActivity: result.data.typeOfActivity,
          description: result.data.description,
          image: result.data.image,
          // placeOfActivity: result.data.placeOfActivity,
        });
      });
      // .catch((err) => {
      //   this.props.history.push("/500");
      // });
    }
  }

  render() {
    const {
      name,
     // typeOfActivity,
      description,
      image,
     // placeOfActivity,
      imageIsUploading,
    } = this.state;

    return (
      <Box
        sx={{
          "& > :not(style)": { m: 1, width: "50ch" },
          "& .MuiTextField-root": { m: 1, width: "50ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <form onSubmit={this.handleSubmit}>
          {image && <img src={image} alt="hobbypic" width="150" />}
          <PuffLoader loading={imageIsUploading} size="100px" color="orchid" />
          <label htmlFor="image">Representative image </label>
          <input onChange={this.handleImageUpload} type="file" name="image" />

          <TextField
            onChange={this.handleChange}
            id="outlined-basic"
            label="Name"
            variant="outlined"
            name="name"
            value={name}
          />

         {/*  <TextField
            id="outlined-select"
            select
            label="Please select the type of the activity."
            value={typeOfActivity}
            onChange={this.handleChange}
          >
            {typeOfActivity.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem> 
          ))}  
          </TextField> */}

          {/* max 4 and then scrollbar, maybe limit the characters? */}
          <TextField
            onChange={this.handleChange}
            id="outlined-multiline-flexible"
            label="Description"
            multiline
            maxRows={4}
            variant="outlined"
            name="description"
            value={description}
          />

        {/*  <TextField
            id="outlined-select"
            select
            label="Please select the place of activity"
            value={placeOfActivity}
            onChange={this.handleChange}
          >
             {typeOfActivity.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))} 
          </TextField>*/}

          <button type="submit" disabled={imageIsUploading}>
            Add this hobby!
          </button>

          <button type="submit" disabled={imageIsUploading}>
            Save changes!
          </button>

          <p>Do you want to delete this hobby?</p>
          <button type="submit" disabled={imageIsUploading}>
            {" "}
            Delete{" "}
          </button>
        </form>
      </Box>
    );
  }
}

export default HobbyForm;
