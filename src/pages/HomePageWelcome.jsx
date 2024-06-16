import React from "react";
import "../App.css";

function HomePageWelcome() {
  return (
    <>
      <section id="homepage-welcome">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6">
              <h1>
                Improve your health while staying at home with WORKOUT LAND .
              </h1>
            </div>
            <div className="col-lg-6">
              <img
                className="homeimg"
                src="./homepagepanda.jpg"
                alt="panda with weight"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default HomePageWelcome;
