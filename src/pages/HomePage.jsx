import React from "react";
import "../App.css";
import HomePageWelcome from "./HomePageWelcome";

function HomePage() {
  return (
    <>
      <HomePageWelcome />
      <section id="homepage-explain">
        <div className="row">
          <div className="container-fluid col-lg-5 content-color">
            <div>
              <img
                className="homeexplain-img"
                src="./mobile.jpg"
                alt="mobile"
              />
            </div>
            <div className="text">
              <p>
                WORKOUT LAND has a mobile application for trainers who would
                like to move thier budies inside home with professional courses.
                our application provid many services:
                <br />
                <br />
                1.Make your own account.
                <br />
                <br />
                2.Choose courses to your liking to play.
                <br />
                <br />
                3.Notifications will be sent to remind and encourage you
                everyday.
              </p>
            </div>
          </div>

          <div className="container-fluid col-lg-5 content-color">
            <div>
              <img
                className="homeexplain-img"
                src="./website.png"
                alt="website"
              />
            </div>
            <div className="text">
              <p>
                WORKOUT LAND has a website for couches who would like to help
                trainers to play inside home with professional courses. our
                website provid many services:
                <br />
                <br />
                1.Make your own account.
                <br />
                <br />
                2.See the fixed courses.
                <br />
                <br />
                3.Add your challanges.
                <br />
                <br />
                4.Follow your trainers Improve.
              </p>
            </div>
            <div className="button-margin row">
              <div className="col-lg-3">
                <button type="button" className="btn btn-sm register-button">
                  <a href="./Register">REGISTER</a>
                </button>
              </div>
              <div className="col-lg-3">
                <button type="button" className="btn btn-sm register-button">
                  <a href="./LogIn">LOGIN</a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
