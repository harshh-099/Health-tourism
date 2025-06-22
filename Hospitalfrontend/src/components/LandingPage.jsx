import React from "react";

const LandingPage = () => {
  return (
    <>
      <div className="landing-container"
        style={{
         
          overflow: "hidden", 
          background: "white",
          textAlign: "center",position:"relative",
        }}
      >
        <div style={{ position: "absolute", top: "10%", left: "5%", opacity: 0.6, animation: "float 6s ease-in-out infinite" }}>
          <svg width="18vw" height="18vh" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#4a6bff" />
          </svg>
        </div>
        <div style={{ position: "absolute", top: "70%", right: "10%", opacity: 0.4, animation: "float 8s ease-in-out infinite 1s" }}>
          <svg width="18vw" height="18vh" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="#45caff" />
          </svg>
        </div>
        <div style={{ position: "absolute", bottom: "15%", left: "15%", opacity: 0.5, animation: "float 7s ease-in-out infinite 0.5s" }}>
          <svg width="18vw" height="18vh" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="20" height="20" rx="4" fill="#ff6b6b" />
          </svg>
        </div>
        

        <div style={{paddingTop: "5rem"}}>
          <h1 
            style={{
              fontSize: "9vw", 
              color: "#333",
              animation: "textSweep 2s ease-in-out infinite"
            }}
          >
            Travel Beyond{" "}
          </h1>
          <h1 
            style={{
              fontSize: "10vw", 
              color: "#333",
              animation: "textSweep 2s ease-in-out infinite"
            }}
          >
            Boundaries
          </h1>
          <p style={{fontSize: "1.4vw", marginTop: "1rem", color: "#555"}}>
            Explore the best doctors, trusted treatments, and world-class
            wellness destinations{" "}
          </p>
          <p style={{fontSize: "1.4vw", marginTop: "-1rem", color: "#555"}}>
            — all in one joyful place. Your journey to better health starts with
            just a click!
          </p>
          <div style={{
            width: "100%",
            marginTop: "5vw", 
            display: "flex", 
            justifyContent: "center",
            flexDirection: "column", 
            alignItems: "center",
            animation: "fadeInUp 1.2s ease-out 1.5s both"
          }}>
            <div style={{
              color: "#555", 
              border: "1px solid rgba(74, 107, 255, 0.5)",
              borderRadius: "10vw", 
              width: "3.5vw",
              height: "9vw",
              display: "flex", 
              justifyContent: "center", 
              alignItems: "center",
              boxShadow: "0 4px 15px rgba(74, 107, 255, 0.2)"
            }}>
              <div style={{
                background: "linear-gradient(45deg, #4a6bff, #45caff)",
                borderRadius: "50%", 
                width: "2vw",
                height: "2vw",
                animation: "upDown 1.5s ease-in-out infinite"
              }}></div>
            </div>
            <p style={{
              fontSize: "1vw", 
              marginTop: "1rem", 
              color: "#555",
              fontWeight: "500"
            }}>
              Scroll down
            </p>
          </div>
        </div>
        
        {/* Adding the animation keyframes with inline style tag */}
        <style>
  {`
    

    @media (min-width: 1000px) {
      .landing-container {
        height: 120vh;
      }
    }
      @media (max-width: 768px) {
      .landing-container {
        height: 50vh;
      }
    }
      @media (max-width: 300px) {
      .landing-container {
        height: 30vh;
      }
    }

    @keyframes textSweep {
      0% { opacity: 0.7; }
      50% { opacity: 1; }
      100% { opacity: 0.7; }
    }

    @keyframes upDown {
      0% { transform: translateY(-125%); }
      50% { transform: translateY(105%); }
      100% { transform: translateY(-125%); }
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes float {
      0% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-40px) rotate(50deg); }
      100% { transform: translateY(0px) rotate(0deg); }
    }
  `}
</style>

      </div>
    </>
  );
};

export default LandingPage;