import axios from "axios";

class ImageService {
  constructor() {
    this.service = axios.create; // create or post for image?

    // handleImageUpload = (event) => {
    //   this.setState({ imageIsUploading: true });

    //   const uploadData = new FormData();
    //   uploadData.append("hobbyImage", event.target.files[0]);

    //   axios
    //     .post(`${process.env.REACT_APP_SERVER_API}/upload`, uploadData)
    //     .then((result) => {
    //       this.setState({
    //         hobbyImage: result.data.imagePath,
    //         imageIsUploading: false,
    //       }); // ! what's imagePath? don't remember
    //     })
    //     .catch(() => {
    //       this.props.history.push("/500");
    //     });
    // };
  }
}

const imageService = new ImageService();
export default imageService;
