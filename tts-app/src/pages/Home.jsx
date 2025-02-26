import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";

function Home() {
  const [text, setText] = useState("");
  const [audio, setAudio] = useState(null);
  const [voice, setVoice] = useState("en-US-JennyNeural");
  const [voices, setVoices] = useState({});
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(0);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/voices").then((response) => {
      setVoices(response.data);
    });
  }, []);

  const handleConvert = async () => {
    if (!text.trim()) {
      alert("Enter some text first!");
      return;
    }

    setLoading(true);
    setProgress(0);

    const progressInterval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return oldProgress + 5;
      });
    }, 300);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/speak",
        { text, voice },
        { responseType: "blob" }
      );

      const audioUrl = URL.createObjectURL(response.data);
      setAudio(audioUrl);
      clearInterval(progressInterval);
      setProgress(100);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <h1>🌍 Multi-Language Text-to-Speech</h1>

      <div className="box-container">
        <div>
          <textarea
            rows="6"
            cols="50"
            placeholder="Enter text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="text-input"
          />
          <p>Text to speech for Unlimited character</p>
        </div>

        <div>
          <label>Select Language & Voice:</label>
          <select value={voice} onChange={(e) => setVoice(e.target.value)}>
            {Object.entries(voices).map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
          <br />

          <button className="login" onClick={handleConvert} disabled={loading}>
            {loading ? "Converting..." : "Convert to Speech"}
          </button>

          {loading && (
            <div className="progress-bar">
              <div className="progress" style={{ width: `${progress}%` }}></div>
            </div>
          )}

          {audio && (
            <div>
              <h3>🎧 Your Speech:</h3>
              <audio
                controls
                
                src={audio}
                playbackRate={playbackRate}
              />

              <br />
              <a href={audio} download="speech.mp3">
                <button className="login">Download MP3</button>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
