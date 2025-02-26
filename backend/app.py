from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import edge_tts
import asyncio

app = Flask(__name__)
CORS(app)

# Expanded list of voices with multiple accents and languages
SUPPORTED_VOICES = {
    "en-US-JennyNeural": "English (US) - Female",
    "en-US-GuyNeural": "English (US) - Male",
    "en-GB-LibbyNeural": "English (UK) - Female",
    "en-GB-RyanNeural": "English (UK) - Male",
    "en-IN-NeerjaNeural": "English (India) - Female",
    "en-IN-PrabhatNeural": "English (India) - Male",
    "en-AU-NatashaNeural": "English (Australia) - Female",
    "en-AU-WilliamNeural": "English (Australia) - Male",
    "es-ES-ElviraNeural": "Spanish (Spain) - Female",
    "es-ES-AlvaroNeural": "Spanish (Spain) - Male",
    "fr-FR-DeniseNeural": "French (France) - Female",
    "fr-FR-HenriNeural": "French (France) - Male",
    "hi-IN-SwaraNeural": "Hindi (India) - Female",
    "hi-IN-MohanNeural": "Hindi (India) - Male",
    "de-DE-KatjaNeural": "German - Female",
    "de-DE-ConradNeural": "German - Male",
    "zh-CN-XiaoxiaoNeural": "Chinese (Mandarin) - Female",
    "zh-CN-YunyangNeural": "Chinese (Mandarin) - Male",
    "ja-JP-NanamiNeural": "Japanese - Female",
    "ja-JP-KeitaNeural": "Japanese - Male",
    "ar-SA-ZariyahNeural": "Arabic - Female",
    "ar-SA-HamedNeural": "Arabic - Male",
    "ru-RU-SvetlanaNeural": "Russian - Female",
    "ru-RU-DmitryNeural": "Russian - Male",
    "pt-BR-FranciscaNeural": "Portuguese (Brazil) - Female",
    "pt-BR-AntonioNeural": "Portuguese (Brazil) - Male",
    "it-IT-IsabellaNeural": "Italian - Female",
    "it-IT-DiegoNeural": "Italian - Male",
}

async def generate_speech(text, voice):
    output_file = "speech.mp3"
    tts = edge_tts.Communicate(text, voice)
    await tts.save(output_file)
    return output_file

@app.route('/speak', methods=['POST'])
def text_to_speech():
    data = request.json
    text = data.get("text", "")
    voice = data.get("voice", "en-US-JennyNeural")  # Default voice

    if not text.strip():
        return jsonify({"error": "Text is empty"}), 400

    if voice not in SUPPORTED_VOICES:
        return jsonify({"error": f"Unsupported voice '{voice}'"}), 400

    asyncio.run(generate_speech(text, voice))
    return send_file("speech.mp3", mimetype="audio/mpeg")

@app.route('/voices', methods=['GET'])
def get_voices():
    return jsonify(SUPPORTED_VOICES)

if __name__ == '__main__':
    app.run(debug=True)
