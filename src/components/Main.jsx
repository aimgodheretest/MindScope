import { useContext } from "react";
import "../components/Main.css";
import { assets } from "./../assets/assets";
import { Context } from "../context/Context";
import Markdown from "react-markdown";
const Main = () => {
  const {
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    onSent,
  } = useContext(Context);

  return (
    <div className="main">
      <div className="nav">
        <p>MindScope </p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, there</span>
              </p>
              <p>How Can I Help You Today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>Briefly summerize this concept:Urban Planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>Improve the readability of the followiing code</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />

              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <div className="output">
                  <Markdown>{resultData}</Markdown>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text"
              placeholder="Ask MindScope..."
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input ? (
                <img src={assets.send_icon} alt="" onClick={() => onSent()} />
              ) : null}
            </div>
          </div>

          {/* <p className="bottom-info">
            Built with ❤️ using React and Gemini-Ai API.
          </p> */}
          <p className="bottom-info">
            Built with ❤️ using React and Gemini-Ai API. <br /> &copy; 2025
            Mindscope. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
