import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [started, setStarted] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)
  const [forcedYes, setForcedYes] = useState(false)
  const [isHacking, setIsHacking] = useState(false)
  const [noPosition, setNoPosition] = useState({ x: null, y: null })
  const [yesBtnScale, setYesBtnScale] = useState(1)
  const audioRef = useRef(null)
  const cuteAudioRef = useRef(null)

  const messages = [
    "Bade tezz ho rahe ho! (Too smart?)",
    "Nahi hone wala!",
    "Love is faster than 5G!",
    "Ab toh maan jao!",
    "Resistance is futile, meri jaan!",
    "Just say Yes, pakode khilayunga!",
    "I can do this all day, beta!",
    "Are re re re...",
    "Almost... NOT!",
    "Fine, you win... but dil toh mera hai!"
  ]

  const btnTexts = ["Nahi", "Are you sure?", "Soch lo...", "Pakka?!", "Plz?", "Pretty please?", "fazil reee!", "DHOKHA!", "THIK HAI!"]

  const memeGifs = [
    "https://media.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif",
    "https://media.giphy.com/media/d10dMmzqCYqQ0/giphy.gif",
    "https://media.giphy.com/media/3o7TKwmnDgQb5jemjK/giphy.gif",
    "https://media.giphy.com/media/fXnRObM8Q0RkOmR5nf/giphy.gif",
    "https://media.giphy.com/media/3oEjHGr1Fhz0kyv8Ig/giphy.gif",
    "https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif",
    "https://media.giphy.com/media/14ut8PhnIwzros/giphy.gif",
    "https://media.giphy.com/media/55itGuoAJiZEEen9gg/giphy.gif",
    "https://media.giphy.com/media/l1J9urAfGd3grKV6E/giphy.gif"
  ]

  useEffect(() => {
    audioRef.current = new Audio('/rickroll.mp3')
    audioRef.current.loop = true
    audioRef.current.volume = 0.5
    cuteAudioRef.current = new Audio('/cute.mp3')
    cuteAudioRef.current.loop = true
    cuteAudioRef.current.volume = 0.5
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const heart = document.createElement('div')
      heart.className = 'floating-heart'
      heart.innerHTML = '&#10084;'
      heart.style.left = Math.random() * 100 + 'vw'
      heart.style.fontSize = (Math.random() * 20 + 15) + 'px'
      heart.style.animationDuration = (Math.random() * 3 + 4) + 's'
      document.getElementById('hearts').appendChild(heart)
      setTimeout(() => heart.remove(), 7000)
    }, 300)
    return () => clearInterval(interval)
  }, [])

  const moveButton = () => {
    const newAttempts = attempts + 1
    setAttempts(newAttempts)
    setYesBtnScale(1 + newAttempts * 0.1)

    let x = Math.random() * (window.innerWidth - 150)
    let y = Math.random() * (window.innerHeight - 60)
    if (x < 20) x = 20
    if (y < 20) y = 20
    if (x > window.innerWidth - 170) x = window.innerWidth - 170
    if (y > window.innerHeight - 80) y = window.innerHeight - 80
    setNoPosition({ x, y })

    if (newAttempts === 7) {
      setIsHacking(true)
      setTimeout(() => setIsHacking(false), 1500)
    }

    if (newAttempts >= 9) {
      setForcedYes(true)
      setTimeout(() => {
        setShowSuccess(true)
        if (audioRef.current) {
          audioRef.current.play().catch(() => { })
        }
      }, 300)
    }
  }

  const handleYesClick = () => {
    setShowSuccess(true)
    if (cuteAudioRef.current) {
      cuteAudioRef.current.play().catch(() => { })
    }
  }

  const getNoButtonStyle = () => {
    let style = {}
    if (noPosition.x !== null) {
      style.position = 'fixed'
      style.left = noPosition.x + 'px'
      style.top = noPosition.y + 'px'
    }
    if (attempts >= 3) {
      style.background = 'linear-gradient(135deg, #ffeb3b, #ffc107)'
      style.color = '#333'
    }
    if (attempts >= 6) {
      style.background = 'linear-gradient(135deg, #ff5252, #ff1744)'
      style.color = 'white'
    }
    return style
  }

  if (showSuccess) {
    return (
      <div className="app">
        <div className="hearts-container" id="hearts"></div>
        <div className="container">
          <div className="card success-card">
            <div className="gif-container">
              <img
                src={forcedYes
                  ? "https://media.giphy.com/media/Vuw9m5wXviFIQ/giphy.gif"
                  : "https://media.giphy.com/media/l2JhL1AzTxORUTDlC/giphy.gif"
                }
                alt="Success"
                className="success-gif"
              />
            </div>
            <h1 className="success-text">{forcedYes ? "PHAS GAYE NA! 😂" : "DIL JEET LIYA! ❤️"}</h1>
            <p className="meme-text">
              {forcedYes
                ? "Itna nakhra?! As you can see, tor 'No' was just a glitch in my matrix. 😈"
                : "Ek hi baar mein maan gaye? You're literally the sweetest person ever! 🥰"
              }
            </p>
            <p className="love-text">
              {forcedYes
                ? "Resistance was futile! Now sign the contract and fulfill your duties. 😂"
                : "You're such a cutie babe. lob lob"
              }
            </p>
            <div className="contract">
              <h3>📜 OFFICIAL RISHTA CONTRACT</h3>
              <ul>
                <li>✅ {forcedYes ? "Sarkaari duty: Unlimited Momo supply." : "Special treat: Unlimited Momo & Chai."}</li>
                <li>✅ Mandatory daily hugs (10 mins min).</li>
                <li>✅ No escaping the {forcedYes ? "Rickroll Pranks." : "Romantic vibes."}</li>
                <li>✅ Priority reply to texts (no ghosting).</li>
              </ul>
              <p className="signature">Rishta Approved: Your Tanmoy ❤️</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const handleStart = () => {
    if (audioRef.current) audioRef.current.load()
    if (cuteAudioRef.current) cuteAudioRef.current.load()
    setStarted(true)
  }

  if (!started) {
    return (
      <div className="app" onClick={handleStart} style={{ cursor: 'pointer' }}>
        <div className="hearts-container" id="hearts"></div>
        <div className="container">
          <div className="card">
            <div className="gif-container">
              <img
                src="https://media.giphy.com/media/Yavo0SXhZYhSo/giphy.gif"
                alt="Welcome"
                className="cute-gif"
              />
            </div>
            <h1 className="question">Hey You!</h1>
            <p className="meme-text">I have something important to ask...</p>
            <button className="btn yes-btn" onClick={handleStart}>Click to Continue</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`app ${isHacking ? 'hacking' : ''}`}>
      {isHacking && <div className="hacking-overlay">OVERRIDING FREE WILL...</div>}
      <div className="hearts-container" id="hearts"></div>
      <div className="container">
        <div className="card">
          <div className="gif-container">
            <img
              src={memeGifs[Math.min(attempts, memeGifs.length - 1)]}
              alt="Meme"
              className="cute-gif"
            />
          </div>
          <h1 className="question">Will you be my Valentine?</h1>
          <div className="buttons">
            <button
              className="btn yes-btn"
              style={{ transform: `scale(${yesBtnScale})` }}
              onClick={handleYesClick}
            >
              Yes!
            </button>
            <button
              className="btn no-btn"
              style={getNoButtonStyle()}
              onMouseEnter={moveButton}
            >
              {attempts >= 9 ? "OK FINE YES!" : btnTexts[Math.min(attempts, btnTexts.length - 1)]}
            </button>
          </div>
          <p className="escape-counter">
            {attempts > 0 ? messages[Math.min(attempts - 1, messages.length - 1)] : ''}
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
