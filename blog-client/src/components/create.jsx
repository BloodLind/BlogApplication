import "bootstrap/dist/css/bootstrap.min.css";
import { BlogsGet, UsersGet, PhotosGet } from "../api/blogController";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import useSession from "react-session-hook";
import "../styles/create.css";
import "../styles/forms.css";
import "../styles/editorJSSets.css";
import "../styles/default-namespace.jsx";
import { Link } from "react-router-dom";
import { GetPhotos } from "../api/apiKeys";
import EditorConfig from "../services/editorJSConfig";
import "../styles/cards.css";
import EditorJS from "@editorjs/editorjs";
import { UploadPhotoToServer, AddArticleToServer } from "../api/blogController";

function Create() {
  const session = useSession();
  const history = useHistory();

  var customConfig = EditorConfig;
  customConfig.data = JSON.parse(localStorage.getItem("article_data"));
  customConfig.onChange = (e) => {
    editor.save().then((savedData) => {
      localStorage.setItem("article_data", JSON.stringify(savedData));
    });
  };
  const editor = new EditorJS(customConfig);
  if (session?.token == null) {
    history.replace("login");
  }

  const addChip = function (e) {
    if (e.target.value.length > 0) {
      let chip = document.createElement("div");
      chip.innerHTML = e.target.value;
      chip.onclick = removeChip;
      document.getElementsByClassName("chips")[0].insertBefore(chip, e.target);
      let chips = JSON.parse(localStorage.getItem("chips"));
      chips.push(e.target.value);
      localStorage.setItem("chips", JSON.stringify(chips));
      e.target.value = "";
    }
  };
  const removeChip = (e) => {
    let chips = JSON.parse(localStorage.getItem("chips"));
    chips.splice(chips.indexOf(e.target.innerHTML), 1);
    localStorage.setItem("chips", JSON.stringify(chips));
    e.target.remove();
  };
  const onChipInputFocusLast = function (e) {
    addChip(e);
  };
  const onChipInputPressedKey = function (e) {
    if (e.key === "Enter") {
      addChip(e);
    }
  };
  const changeValueInLocalStorage = function (e, LSkey) {
    localStorage.setItem(e.target.id, e.target.value);
  };
  const fileLoad = function (e) {
    let file = document.getElementById("previewPhotoLoader").files[0];
    let res = UploadPhotoToServer(file, session.token).then((res) => {
      if (res.success) {
        document.getElementById("previewPhoto").src = res.file.url;
        localStorage.setItem("previewPhoto", res.file.url);
        localStorage.setItem("previewPhotoId", res.photoName);
      }
    });
  };
  const saveArticle = (e) => {
    let article = {};
    article.title = localStorage.getItem("articleTitle");
    article.innerData = localStorage.getItem("article_data");
    article.previewPhotoPath = localStorage.getItem("previewPhotoId");
    article.categories = JSON.parse(localStorage.getItem("chips"));
    AddArticleToServer(article, session.token).then((x) =>
    {
      history.push("/article/" + x.articleId)
    });

    localStorage.removeItem("articleTitle");
    localStorage.removeItem("article_data");
    localStorage.removeItem("previewPhoto");
    localStorage.removeItem("chips");
    localStorage.removeItem("previewPhotoId");
  };
  useEffect(() => {
    document.getElementById("articleTitle").value =
      localStorage.getItem("articleTitle");
    let chips = JSON.parse(localStorage.getItem("chips"));
    if (chips) {
      for (let chip of chips) {
        let div = document.createElement("div");
        div.innerText = chip;
        div.onclick = removeChip;
        document
          .getElementsByClassName("chips")[0]
          .insertBefore(div, document.getElementById("chips-input"));
      }
    } else localStorage.setItem("chips", "[]");
  }, []);

<<<<<<< Updated upstream
                <div className="d-flex flex-row m-2  align-items-baseline gap-5">
                    <h4 className="text-x-large agency text-nowrap" >Your Title</h4>
                    <div className=" line-dark w-100 "></div>
                </div>
                <input className="agency fs-4 form-control border-0 shadow" placeholder="Hello, my name huylo" ></input>

                <div className="d-flex flex-row m-2   align-items-baseline gap-5">
                    <h4 className="fs-2 agency text-nowrap">Create Own Memory</h4>
                    <div className=" line-dark w-100"></div>
                </div>
                
               
                
               
                <div id="editorjs" className="agency-headers yu-gothic-medium fs-5" ></div>
                <div className="d-flex flex-row m-2  align-items-baseline gap-5 mt-5 mb-5">
                    <h4 className="text-x-large agency text-nowrap" >Imagine The Look</h4>
                    <div className=" line-dark w-100 "></div>
                </div>
               
                <div className="col-6 align-self-center mb-5  round-card bg-dark-color round-card" style={{maxHeight:"400px"}}>
                    <img src={window.location.protocol + "//" + window.location.host + "/drawable/loadimageprev.png"} className = "w-100 h-100"  
                    style={{maxHeight:"400px",objectFit:"cover",borderRadius:"15px 15px 0px 0px"}}></img>
                    <div>
                    <h4 className="fs-2 agency text-nowrap text-center  text-light p-2" style={{backgroundColor:"#14213D",borderRadius:"0px 0px 15px 15px "}}>Select Photo</h4>
                    </div>
=======
  if (true) {
    return (
      <>
        <div className="d-flex flex-column  m-5 col-9 align-self-center ">
          <div className="d-flex flex-row m-2  align-items-baseline gap-5">
            <h4 className="text-x-large agency text-nowrap">Your Title</h4>
            <div className=" line-dark w-100 "></div>
          </div>

          <input
            id="articleTitle"
            className=" col-10 align-self-center  agency fs-4 p-2 round-button border-0 shadow "
            onChange={changeValueInLocalStorage}
            placeholder="Hello, my name huylo"
          ></input>
>>>>>>> Stashed changes

          <div className="d-flex flex-row m-2   align-items-baseline gap-5">
            <h4 className="fs-2 agency text-nowrap">Create Own Memory</h4>
            <div className=" line-dark w-100"></div>
          </div>

          <div
            id="editorjs"
            className="delete-select-border agency-headers yu-gothic fs-5 col-10 p-3 align-self-center createArticleEditorjs"
          ></div>
          <div className="d-flex flex-row m-2  align-items-baseline gap-5 mt-5 mb-5">
            <h4 className="text-x-large agency text-nowrap">
              Imagine The Look
            </h4>
            <div className=" line-dark w-100 "></div>
          </div>

          <label
            htmlFor="previewPhotoLoader"
            className="col-6 align-self-center mb-5  round-card bg-dark-color round-card opacity-trigger"
            style={{ maxHeight: "400px", position: "relative" }}
          >
            <img
              id="previewPhoto"
              src={
                localStorage.getItem("previewPhoto")
                  ? localStorage.getItem("previewPhoto")
                  : window.location.protocol +
                    "//" +
                    window.location.host +
                    "/drawable/loadimageprev.png"
              }
              className="w-100 h-100"
              style={{
                maxHeight: "400px",
                objectFit: "cover",
                borderRadius: "15px",
              }}
            />
            <div>
              <h4
                className="fs-2 agency w-100 text-nowrap text-center hidden  text-light p-2"
                style={{
                  backgroundColor: "#14213D",
                  borderRadius: "0px 0px 15px 15px ",
                  position: "absolute",
                  top: "86.5%",
                }}
              >
                Select Photo
              </h4>

              <input
                type="file"
                id="previewPhotoLoader"
                style={{ display: "none" }}
                onChange={fileLoad}
              />
            </div>
          </label>
          <div className="d-flex flex-row  align-items-baseline gap-5 mt-5 mb-5">
            <h4 className="text-x-large agency text-nowrap">Your category</h4>
            <div className=" line-dark w-100 "></div>
          </div>
          <div
            htmlFor="chips-input"
            className="col-10 round-card p-3 m-3 pb-5 agency shadow-lg fs-4 chips align-self-center mb-5"
          >
            <input
              type="text"
              id="chips-input"
              className="dropdown-toggle dropdown-toggle-split fs-4"
              onBlur={onChipInputFocusLast}
              onKeyUp={onChipInputPressedKey}
              placeholder="Input and add..."
            />
          </div>

          <button
            className="text-light round-card agency p-3 pe-5 ps-5 bg-accent align-self-center w-25 fs-2"
            onClick={saveArticle}
          >
            Save Memory
          </button>
        </div>
      </>
    );
  } else return <></>;
}

export default Create;
