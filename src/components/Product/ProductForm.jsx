import React, { Component } from "react";
import { PuffLoader } from "react-spinners";
import productService from "../../services/product-service";
import generalService from "../../services/general-service";

// textfield / form
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { FormControl, Input, InputLabel, Select } from "@mui/material";
import Container from "@mui/material/Container";
import { Button } from "@material-ui/core";
import { Card } from "@material-ui/core";

class ProductForm extends Component {
  state = {
    image: "",
    title: "",
    description: "",
    user_id: "",
    pricePolicy: "",
    price: "",
    event_id: "",
    charity_id: "",
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
    // console.log(event.target);
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      image,
      title,
      description,
      user_id,
      pricePolicy,
      price,
      event_id,
      charity_id,
    } = this.state;
    const { id } = this.props.match.params;

    if (this.props.isEdit) {
      productService
        .edit(
          id,
          image,
          title,
          description,
          user_id,
          pricePolicy,
          price,
          event_id,
          charity_id
        )
        .then(() => {
          this.props.history.push(`/products/${id}`);
        })
        .catch((err) => {
          this.props.history.push("/500");
        });
    } else {
      productService
        .create(
          image,
          title,
          description,
          user_id,
          pricePolicy,
          price,
          event_id,
          charity_id
        )
        .then((response) => {
          this.props.history.push(`/products/${response.data._id}`);
        })
        .catch((err) => {
          this.props.history.push("/500");
        });
    }
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      productService
        .getProduct(id)
        .then((result) => {
          this.setState({
            image: result.data.image,
            title: result.data.title,
            description: result.data.description,
            user_id: result.data.user_id,
            pricePolicy: result.data.pricePolicy,
            price: result.data.price,
            event_id: result.data.event_id,
            charity_id: result.data.charity_id.name,
          });
        })
        .catch((err) => {
          this.props.history.push("/500");
        });
    }
  }

  render() {
    const {
      image,
      title,
      description,
      user_id,
      pricePolicy,
      price,
      event_id,
      charity_id,
      imageIsUploading,
    } = this.state;

    return (
      <Container align="justify" style={{ paddingBottom: 60 }}>
        <Card>
          <Box
            sx={{
              "& > :not(style)": { m: 1, width: "50ch" },
              "& .MuiTextField-root": { m: 1, width: "50ch" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            noValidate
            autoComplete="off"
            style={{ paddingBottom: 60 }}
          >
            <div align="center">
              <h2>Product Form</h2>
              <h3>Please enter your information</h3>
            </div>
            <form onSubmit={this.handleSubmit}>
              {image && <img src={image} alt={title} width="150px" />}
              <PuffLoader
                loading={imageIsUploading}
                size="100px"
                color="orchid"
              />

              <div align="center">
                <label htmlFor="contained-button-file">
                  <Input
                    accept="image/*"
                    type="file"
                    onChange={this.handleImageUpload}
                  />
                </label>
              </div>


              <TextField
                style={{ marginTop: 20 }}
                onChange={this.handleChange}
                id="outlined-basic"
                label="Name"
                variant="outlined"
                name="title"
                value={title}
              />

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

              <FormControl sx={{ m: 1, width: 530 }}>
                <InputLabel id="demo-multiple-name-label">
                  Please select the price policy
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={pricePolicy}
                  label="Please select the price policy."
                  name="pricePolicy"
                  onChange={this.handleChange}
                >
                  <MenuItem value="Fixed Price">Fixed Price</MenuItem>
                  <MenuItem value="Voluntary">Voluntary</MenuItem>
                </Select>
              </FormControl>

              <TextField
                //  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                onChange={this.handleChange}
                id="outlined-basic"
                label="???"
                variant="outlined"
                name="price"
                type="number"
                value={price}
                placeholder="???"
              />


              {/* causes error 500 */}
              <FormControl sx={{ m: 1, width: 530 }}>
                <InputLabel id="demo-multiple-name-label">
                  Which Charity is it for?
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={charity_id}
                  label="Which Charity is it for?"
                  name="charity_id"
                  onChange={this.handleChange}
                >
                  <MenuItem value={charity_id}>{charity_id}</MenuItem>
                  <MenuItem value="Unicef">Unicef </MenuItem>
                  <MenuItem value="Doctors without borders">
                    Doctors without borders
                  </MenuItem>
                  <MenuItem value="World Food Programme">
                    World Food Programme
                  </MenuItem>
                  <MenuItem value="WWF">
                    WWF
                  </MenuItem>
                  <MenuItem value="Local organizations">
                  Local organizations
                  </MenuItem>
                </Select>
              </FormControl>

              <div
                  style={{
                    marginTop: 10,
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <Button
                    color="primary"
                    variant="outlined"
                    type="submit"
                    disabled={imageIsUploading}
                  >
                    Add this Product!
                  </Button>

                <Button
                    color="secondary"
                    variant="outlined"
                    type="submit"
                    disabled={imageIsUploading}
                  >
                    Save changes!
                  </Button>
                </div>
            </form> 

          </Box>
        </Card>
      </Container>
    );
  }
}

export default ProductForm;
