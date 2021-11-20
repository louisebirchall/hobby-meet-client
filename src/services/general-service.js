import axios from "axios";


// generalService
class GeneralService {
  constructor() {
    this.service = axios.create({
      baseURL: process.env.REACT_APP_API_HOST,
      withCredentials: true,
    });
  }

  upload = (data) => {
    return this.service.post("/upload", data);
  };

  search = (search, type) => {
    return this.service.get("/search", {params: {search, type}});
  };

}

const generalService = new GeneralService();
export default generalService;

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
