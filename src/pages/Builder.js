import React, { useState, useEffect } from "react";
import "./style.css";
import "./builder.css";
import "./reset.css";
import "../fonts/fonts.css";

function AboutSection() {
  const [introTitle, setIntroTitle] = useState("Freelance Developer");
  const [introText, setIntroText] = useState(
    "I help agencies to turn their ideas into designs &amp; code. I've been doing this for over 6 years and have a great track record with my clients. I always aim to create great designs that meet the brief, and I also work hard to maintain a healthy relationship with my clients. In my experience, this leads to happy clients and repeat business. Pinky swear."
  );

  useEffect(() => {
    const savedIntroTitle = getSavedDataFromCookies("introTitle");
    const savedIntroText = getSavedDataFromCookies("introText");

    if (savedIntroTitle) {
      setIntroTitle(savedIntroTitle);
    }

    if (savedIntroText) {
      setIntroText(savedIntroText);
    }
  }, []);

  const handleIntroTitleChange = (event) => {
    const newIntroTitle = event.target.innerText;
    setIntroTitle(newIntroTitle);
    saveDataToCookies("introTitle", newIntroTitle);
  };

  const handleIntroTextChange = (event) => {
    const newIntroText = event.target.innerText;
    setIntroText(newIntroText);
    saveDataToCookies("introText", newIntroText);
  };

  const saveDataToCookies = (key, value) => {
    document.cookie = `${key}=${value}; path=/`;
  };

  const getSavedDataFromCookies = (key) => {
    const cookieData = document.cookie
      .split(";")
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith(key));

    if (cookieData) {
      return cookieData.split("=")[1];
    }

    return null;
  };

  return (
    <section className="intro">
      <div className="usama-rajpoot-logo">
        <img className="avatar" src="./img/avatar.png" alt="Avatar" />
        <h5 className="name">Usama Rajpoot</h5>
      </div>
      <h1
        className="intro-title"
        contentEditable={true}
        onBlur={handleIntroTitleChange}
        dangerouslySetInnerHTML={{ __html: introTitle }}
      />
      <h4
        className="intro-text"
        contentEditable={true}
        onBlur={handleIntroTextChange}
        dangerouslySetInnerHTML={{ __html: introText }}
      />
      <div className="actions intro-actions">{/* Rest of the code */}</div>
    </section>
  );
}

function Gallery() {
  return (
    <section class="gallery" id="waypoint-scrolltop">
      <ul>
        <li class="gallery-01">
          <img src="img/upper-section-left.png" />
        </li>
        <li class="gallery-02">
          <img src="img/gallery-02-1340px.jpg" />
        </li>
        <li class="gallery-03">
          <img src="img/upper-section-right.png" />
        </li>
      </ul>
    </section>
  );
}

function Builder() {
  const [elements, setElements] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [savedData, setSavedData] = useState({});

  useEffect(() => {
    // Simulating authentication and retrieving user-specific data
    // Replace with your own authentication and data retrieval logic
    const fakeAuthData = {
      user1: {
        elements: ["aboutsection", "gallery"],
      },
      user2: {
        elements: ["aboutsection"],
      },
    };

    // Simulating logged-in user
    const loggedInUser = "user1";

    // Set the current user and their saved data
    setCurrentUser(loggedInUser);
    setSavedData(fakeAuthData[loggedInUser]);

    // Retrieve saved data from cookies if available
    const savedDataFromCookies = getSavedDataFromCookies();
    if (savedDataFromCookies) {
      setElements(savedDataFromCookies.elements);
    } else {
      // Add the default AboutSection element if no saved data
      // setElements(["aboutsection"]);
    }
  }, []);

  useEffect(() => {
    // Save data to cookies whenever elements change
    saveDataToCookies();
  }, [elements]);

  const handleDragStart = (event, elementType) => {
    event.dataTransfer.setData("aboutsection", elementType);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const elementType = event.dataTransfer.getData("aboutsection");
    setElements((prevElements) => [...prevElements, elementType]);
  };

  const handleDelete = (index) => {
    setElements((prevElements) => prevElements.filter((_, i) => i !== index));
  };

  const handleElementClick = (elementType) => {
    setElements((prevElements) => [...prevElements, elementType]);
  };

  const handleSave = () => {
    // Logic to save the elements data for the current user
    // Replace with your own data storage logic
    setSavedData((prevData) => ({ ...prevData, elements: elements }));

    // Save data to cookies whenever user manually saves
    saveDataToCookies();
  };

  const saveDataToCookies = () => {
    // Serialize elements data to a string
    const serializedData = JSON.stringify({ elements });
    // Set the data in a cookie
    document.cookie = `savedData=${serializedData}; path=/`;
  };

  const getSavedDataFromCookies = () => {
    const cookieData = document.cookie
      .split(";")
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith("savedData="));

    if (cookieData) {
      // Extract the serialized data from the cookie
      const serializedData = cookieData.split("=")[1];
      // Parse the serialized data back into an object
      const parsedData = JSON.parse(serializedData);
      // Return the parsed data
      return parsedData;
    }

    return null;
  };

  return (
    <>
      <div className="top-bar">
        <div className="left">
          <img className="avatar" src="./img/avatar.png" alt="Avatar" />
          <div className="builder-name">
            <h1>Usama Rajpoot</h1>
            <p>Builder</p>
          </div>
        </div>

        <div className="center"></div>
        <div className="right">
          {currentUser && (
            <>
              <button onClick={handleSave} className="btn-primary">
                Publish
              </button>
            </>
          )}
        </div>
      </div>

      <div className="builder">
        <div className="sidebar">
          <div className="head">
            <h2>Add Sections</h2>
          </div>

          <ul className="elements-list">
            <li
              className="draggable"
              data-type="gallery"
              draggable="true"
              onDragStart={(e) => handleDragStart(e, "gallery")}
            >
              Gallery
            </li>
            <li
              className="draggable"
              data-type="gallery"
              draggable="true"
              onDragStart={(e) => handleDragStart(e, "gallery")}
            >
              Portfolio
            </li>
            {/* Add more draggable elements as needed */}
          </ul>
        </div>
        <div
          className="preview"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div id="website-content">
            <AboutSection />
            {elements.length === 0 && (
              <div className="placeholder-text">
                Drag and drop elements here
              </div>
            )}
            {elements.map((elementType, index) => {
              let ElementComponent = null;

              switch (elementType) {
                case "aboutsection":
                  ElementComponent = AboutSection;
                  break;
                case "gallery":
                  ElementComponent = Gallery;
                  break;
                // Add more cases for other element types

                default:
                  break;
              }

              if (ElementComponent) {
                return (
                  <div key={index} className="preview-element">
                    <ElementComponent />
                    <button
                      onClick={() => handleDelete(index)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                );
              }

              return null;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Builder;
