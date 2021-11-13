import axios from "axios";

class ImageService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_HOST}/upload`,
      withCredentials: true,
    });
  }

  upload = (image) => {
    return (
      this.service.post("/upload"),
      {
        image,
      }
    );
  };
}

const imageService = new ImageService();
export default imageService;

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
