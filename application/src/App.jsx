import { useState } from 'react'
import './App.css'

function App() {
  const [response, setResponse] = useState("Enter a question and I will respond!")
  const [inputText, setInputText] = useState("");
  const [selectedCards, setSelectedCards] = useState([]);

  const cards =[
    { id: 1, title: "_id", description: "Tempt with Bunnies" },
    { id: 2, title: "_id", description: "Endsong's Eviscerator" },
    { id: 3, title: "-id", description:"Shattered Angel" },
  ]

  function handleCheckboxChange(cardId) {
    setSelectedCards((prev) => {
      if (prev.includes(cardId)) {
        return prev.filter((id) => id !== cardId);
      }

      return [...prev, cardId];
    });
  }

  return(
    <>

    <div className="container" id="left_sidebar">
      <aside className="sidebar">
        <div className="logo">
          <h2>Game Center</h2>
        </div>

        <ul className="menu">
          <li>Browse</li>
          <li>My Collection</li>
          <li>Add to Collection</li>
          <li>Edit Collection</li>
          <li>Settings</li>
        </ul>
      </aside>

      <div className="main-content" id="right_section">

        <nav className="navbar" id="nav">
          <h1 style={{color: '#374151'}}>My Collection</h1>

          <div className="nav-links">
            <a href="#">Home</a>
            <a href="#">Logout</a>
          </div>
        </nav>

        <main className="content" id="content_area">
          <div className="card">
            <h2>Ask Gemini</h2>
            <input type="text" placeholder="Enter Text" value={inputText} onChange={(e) => setInputText(e.target.value)}></input>
            <button onClick={submitToGemini(selectedCards, inputText, setResponse)}>
              Go
            </button>
            <p>{response}</p>
          </div>

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

async function submitToGemini( background, userQuestion, setResponse) {

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

      setResponse( result.candidates[0].content.parts
        .map(part => part.text || "")
        .join("")
      )

  } catch (error) {
      console.error("Gemini Error:", error);
      throw error;
  }
}

export default App