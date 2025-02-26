import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import './App.css'
import Navbar from "./components/Navbar";
import Result from "./pages/Result";
import Footer from "./components/Footer";

function App() {
  // const [text, setText] = useState("");
  // const [audio, setAudio] = useState(null);
  // const [voice, setVoice] = useState("en-US-JennyNeural");
  // const [voices, setVoices] = useState({});
  // const [loading, setLoading] = useState(false);
  // const [progress, setProgress] = useState(0);
  // const [playbackRate, setPlaybackRate] = useState(1);

  // useEffect(() => {
  //   axios.get("http://127.0.0.1:5000/voices").then((response) => {
  //     setVoices(response.data);
  //   });
  // }, []);

  // const handleConvert = async () => {
  //   if (!text.trim()) {
  //     alert("Enter some text first!");
  //     return;
  //   }

  //   setLoading(true);
  //   setProgress(0);

  //   const progressInterval = setInterval(() => {
  //     setProgress((oldProgress) => {
  //       if (oldProgress >= 100) {
  //         clearInterval(progressInterval);
  //         return 100;
  //       }
  //       return oldProgress + 5;
  //     });
  //   }, 300);

  //   try {
  //     const response = await axios.post(
  //       "http://127.0.0.1:5000/speak",
  //       { text, voice },
  //       { responseType: "blob" }
  //     );

  //     const audioUrl = URL.createObjectURL(response.data);
  //     setAudio(audioUrl);
  //     clearInterval(progressInterval);
  //     setProgress(100);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="main-container">
      <Navbar />
      {/* {showLogin && <Login />} */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
        
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
