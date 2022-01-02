import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [lists, setLists] = useState([]);
  const [value, setValue] = useState("");
  useEffect(() => {
    axios.get(`/api/values`).then((res) => {
      console.log("response", res);
      setLists(res.data);
    });
  }, []);
  const changeHandler = (event) => {
    setValue(event.currentTarget.value);
  };
  const handleDelete = (event) => {
    axios.delete("/api/values").then((res) => {
      setValue("");
      axios.get(`/api/values`).then((res) => {
        console.log("response", res);
        setLists(res.data);
      });
    });
  };
  const submitHandler = (event) => {
    event.preventDefault();
    if (value == "") {
      alert("빈값 말고....");
      return;
    }
    axios.post("/api/value", { value: value }).then((response) => {
      if (response.data.success) {
        console.log("response", response);
        setLists([...lists, response.data]);
        setValue("");
      } else {
        alert("DB에 값을 넣는데 실패했습니다.");
      }
    });
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="container">
          {lists &&
            lists.map((list, index) => <li key={index}>{list.value}</li>)}
          <br />
          TODO 리스트를 입력해주세요.
          <form className="example" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="입력해주세요..."
              onChange={changeHandler}
              value={value}
            />
            <button type="submit" style={{ width: "150px" }}>
              todo 등록
            </button>
          </form>
          <button
            type="submit"
            onClick={handleDelete}
            style={{ width: "150px" }}
          >
            전체 삭제
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
