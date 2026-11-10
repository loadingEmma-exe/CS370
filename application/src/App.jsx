import { useState } from 'react'
import './App.css'

function App() {
  const [response, setresponse] = useState("Enter a question and I will respond!")
  return(
    <>

    <div className="container" id="left_sidebar">
      <aside className="sidebar">
        <div className="logo">
          <h2>Game Center</h2>
        </div>

        <ul className="menu">
          <li>Dashboard</li>
          <li>Users</li>
          <li>Reports</li>
          <li>Settings</li>
        </ul>
      </aside>

      <div className="main-content" id="right_section">

        <nav className="navbar" id="nav">
          <h1 style={{color: '#374151'}}>Dashboard</h1>

          <div className="nav-links">
            <a href="#">Home</a>
            <a href="#">Profile</a>
            <a href="#">Logout</a>
          </div>
        </nav>

        <main className="content" id="content_area">
          <div className="card">
            <h2>Ask Gemini</h2>
            <input type="text" placeholder="Enter Text" value={inputText} onChange={(e) => setInputText(e.target.value)}></input>
            <button onClick={handleGeminiButtonClick}>
              Go
            </button>
          </div>

          <h2>Selected IDs: {selectedCards.join(", ")}</h2>

          <div className="card-container">
        {cards.map((card) => (
          <div className="select-card" key={card.id}>
            <input
              type="checkbox"
              className="card-checkbox"
              checked={selectedCards.includes(card.id)}
              onChange={() => handleCheckboxChange(card.id)}
            />

            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </div>
        ))}
      </div>

        </main>
      </div>
    </div>
    </>
  );
}

async function submitToGemini( background, userQuestion ) {

  let instructions = "You are a helpful assistant who is helping users decide on what game they should try next based on what they like. keep responses short with an answer and a justifiation, each being 1-2 sentences."

  const apiKey = "YOUR_GEMINI_API_KEY";

  const uri = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent";

  const body = {
      systemInstruction: {
          parts: [
              {
                  text: instructions
              }
          ]
      },

      contents: [
          {
              role: "user",
              parts: [
                  {
                      text: background
                  },
                  {
                      text: userQuestion
                  }
              ]
          }
      ],

      generationConfig: {
          maxOutputTokens: 100,
          temperature: 0
      }
  };

  try {
      const response = await fetch(uri, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "x-goog-api-key": apiKey
          },
          body: JSON.stringify(body)
      });

      const result = await response.json();

      if (!response.ok) {
          throw new Error(result.error?.message || "Gemini API request failed");
      }

      return result.candidates[0].content.parts
          .map(part => part.text || "")
          .join("");

  } catch (error) {
      console.error("Gemini Error:", error);
      throw error;
  }
}

export default App