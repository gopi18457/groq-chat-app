import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Main = () => {

  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      onSent();
    }
  };

  const handleCardClick = (text) => {
    setInput(text);
    onSent(text);
  };

  return (
    <div className='main'>
      <div className="nav">
        <p>Gr<span>oq</span></p>
        <img src={assets.user_icon} alt="User" />
      </div>
      <div className="main-container">
        {showResult
          ? <div className="result">
            <div className='result-title'>
              <img src={assets.user_icon} alt="User" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <div className="groq-icon">G</div>
              {loading
                ? <div className="loader">
                  <hr className="animated-bg" />
                  <hr className="animated-bg" />
                  <hr className="animated-bg" />
                </div>
                : <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              }
            </div>
          </div>
          : <>
            <div className="greet">
              <h1>Hello, <span>Dev.</span></h1>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card" onClick={() => handleCardClick("Suggest beautiful places to see on an upcoming road trip")}>
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card" onClick={() => handleCardClick("Briefly summarize this concept: urban planning")}>
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card" onClick={() => handleCardClick("Brainstorm team bonding activities for our work retreat")}>
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card" onClick={() => handleCardClick("Improve the readability of the following code")}>
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        }

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              value={input}
              type="text"
              placeholder='Ask Groq anything...'
            />
            <div>
              <img src={assets.gallery_icon} alt="Gallery" />
              <img src={assets.mic_icon} alt="Mic" />
              {input
                ? <img className="send-btn" onClick={() => onSent()} src={assets.send_icon} alt="Send" />
                : null
              }
            </div>
          </div>
          <p className="bottom-info">
            Groq may make mistakes. Powered by Llama 3.3 — always verify important information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
