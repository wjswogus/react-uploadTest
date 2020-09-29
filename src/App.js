import React, { createRef, useState } from "react";
import "./App.css";

function App() {
  const [movie, setMovie] = useState({
    title: "",
    rating: "",
    medium_cover_image: "",
  });

  function inputHandle(e) {
    //console.log(e.target.value);
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
    console.log(movie);
  }

  function submitUser(e) {
    e.preventDefault();

    let jsonUser = JSON.stringify(movie);

    fetch("http://10.100.102.2:8000/api/movie", {
      method: "post",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: jsonUser,
    })
      .then((res) => res.text())
      .then((res) => {
        if (res === "ok") {
          alert("입력 성공");
        }
      });
  }

  function reset(e) {
    e.preventDefault();
    setMovie({
      title: "",
      rating: "",
      medium_cover_image: "",
    });
    console.log(movie);
  }

  return (
    <div>
      <form>
        <input
          type="text"
          onChange={inputHandle}
          name="title"
          value={movie.title}
          placeholder="제목을 입력하세요"
        />
        <br />
        <input
          type="text"
          onChange={inputHandle}
          name="rating"
          value={movie.rating}
          placeholder="평점을 입력하세요"
        />
        <br />
        <input
          type="text"
          onChange={inputHandle}
          name="medium_cover_image"
          value={movie.medium_cover_image}
          placeholder="주소를 입력하세요"
        />
        <br />
        <button onClick={submitUser}>전송</button>
        <button onClick={reset}>리셋</button>
      </form>
    </div>
  );
}

export default App;
