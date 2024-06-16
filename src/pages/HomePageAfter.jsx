import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import AddArticle from "./Modal";
import "../styling/HomePageAfter.css";
import HomePageWelcome from "./HomePageWelcome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faDumbbell,
  faRankingStar,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "./AuthContext";

function HomePageAfter() {
  const [articles, setArticles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    // Function to fetch articles data from the API
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          "https://your-api-endpoint.com/articles",
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          }
        ); // Replace with your API endpoint
        setArticles(response.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    if (auth?.token) {
      fetchArticles();
    }
  }, [auth]);

  const handleAddArticle = async (newArticle) => {
    try {
      const response = await axios.post(
        "https://your-api-endpoint.com/articles",
        newArticle,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      ); // Replace with your API endpoint
      setArticles([...articles, response.data]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding article:", error);
    }
  };

  return (
    <>
      <HomePageWelcome />

      <section id="feature">
        <div className="row">
          <div className="feature-box col-lg-4">
            <FontAwesomeIcon
              icon={faUser}
              style={{ color: "#CDEEFF" }}
              size="4x"
            />
            <h3>
              <a href="./Profile">Profile</a>
            </h3>
            <p className="feature-p">You can see your profile and edit it</p>
          </div>

          <div className="feature-box col-lg-4">
            <FontAwesomeIcon
              icon={faDumbbell}
              style={{ color: "#EBECF1" }}
              size="4x"
            />
            <h3>
              <a href="./Courses">Courses & Challenges</a>
            </h3>
            <p className="feature-p">
              You can see the fixed courses and add new challenges
            </p>
          </div>

          <div className="feature-box col-lg-4">
            <FontAwesomeIcon
              icon={faRankingStar}
              style={{ color: "#CDEEFF" }}
              size="4x"
            />
            <h3>
              <a href="./Trainers">Trainers</a>
            </h3>
            <p className="feature-p">
              You can see your trainers and their improvements
            </p>
          </div>
        </div>
      </section>

      <section id="add-article">
        <h2>Latest News & Articles</h2>
        <div className="row">
          <div className="container col-lg-4 article-pad">
            <div className="icon">
              <FontAwesomeIcon
                icon={faPlus}
                style={{ color: "#2BB3CD" }}
                size="4x"
              />
            </div>
            <div className="clicked-p">
              <p onClick={() => setIsModalOpen(true)}>Add new article</p>
            </div>
          </div>

          {articles.map((article) => (
            <div key={article.id} className="container col-lg-4 article-pad">
              <div>
                <p>{article.text}</p>
              </div>
              <div>
                <img
                  className="article-img"
                  src={article.img}
                  alt="article"
                ></img>
              </div>
            </div>
          ))}
        </div>
        <AddArticle
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddArticle}
        />
      </section>
    </>
  );
}

export default HomePageAfter;
