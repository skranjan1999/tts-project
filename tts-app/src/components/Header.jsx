import React from 'react'

function Header() {



  const [text, setText] = useState("");
  const [audio, setAudio] = useState(null);
  const [voice, setVoice] = useState("en-US-JennyNeural");
  const [voices, setVoices] = useState({});
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);

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
    <div>
      <h1>🌍 Multi-Language Text-to-Speech</h1>
      <textarea
        rows="4"
        placeholder="Enter text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      <label>Select Language & Voice:</label>
      <select value={voice} onChange={(e) => setVoice(e.target.value)}>
        {Object.entries(voices).map(([code, name]) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
      <br />
      <button onClick={handleConvert} disabled={loading}>
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
          <audio controls autoPlay src={audio} playbackRate={playbackRate} />
          <br />
          <label>Playback Speed: </label>
          <select onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}>
            <option value="0.5">0.5x</option>
            <option value="1" selected>1x</option>
            <option value="1.5">1.5x</option>
            <option value="2">2x</option>
          </select>
          <br />
          <a href={audio} download="speech.mp3">
            <button>Download MP3</button>
          </a>
        </div>
      )}
    </div>
  )
}

export default Header
