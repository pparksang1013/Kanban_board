import { useState } from "react";
import "../style/MainPage.css";

// 카드 제목 가져오기
function Header(props) {
  return (
    <header>
      <h1>{props.title}</h1>
    </header>
  );
}

// 카드를 만드는 팝업을 띄우는. 빈 부분을 눌렀을때 나오게 하자.
function Create(props) {
  return (
    <article>
      <h2>Create</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const title = event.target.title.value;
          const body = event.target.body.value;
          props.onCreate(title, body);
        }}
      >
        <p>
          <input type="text" name="title" placeholder="title" />
        </p>
        <p>
          <textarea name="body" placeholder="body"></textarea>
        </p>
        <p>
          <input type="submit" value="Create"></input>
        </p>
      </form>
    </article>
  );
}

// 메인인 테스크와 카드들을 보여주는 부분.
function BoardRouter() {
  const [mode, setMode] = useState("WELCOME");
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(2);
  const [topics, setTopics] = useState([
    { id: 1, title: "ToDo item1", body: "Todo is ..." },
  ]);
  let content = null;
  let contextControl = null;

  if (mode === "CREATE") {
    content = (
      <Create
        onCreate={(_title, _body) => {
          const newTopic = { id: nextId, title: _title, body: _body };
          const newTopics = [...topics];
          newTopics.push(newTopic);
          setTopics(newTopics);
          setMode("READ");
          setId(nextId);
          setNextId(nextId + 1);
        }}
      ></Create>
    );
  }

  return (
    <div className="Board">
      <div className="Tesk">
        <Header title="TO DO"></Header>

        {content}
        <ul>
          <li>
            <a
              href="/create"
              onClick={(event) => {
                event.preventDefault();
                setMode("CREATE");
              }}
            >
              Create
            </a>
          </li>
          {contextControl}
        </ul>
      </div>
      <div className="Tesk">
        <Header title="DOING"></Header>
        {content}
        <ul>
          <li>
            <a
              href="/create"
              onClick={(event) => {
                event.preventDefault();
                setMode("CREATE");
              }}
            >
              Create
            </a>
          </li>
          {contextControl}
        </ul>
      </div>
      <div className="Tesk">
        <Header title="TEST"></Header>

        {content}
        <ul>
          <li>
            <a
              href="/create"
              onClick={(event) => {
                event.preventDefault();
                setMode("CREATE");
              }}
            >
              Create
            </a>
          </li>
          {contextControl}
        </ul>
      </div>
      <div className="Tesk">
        <Header title="DONE"></Header>

        {content}
        <ul>
          <li>
            <a
              href="/create"
              onClick={(event) => {
                event.preventDefault();
                setMode("CREATE");
              }}
            >
              Create
            </a>
          </li>
          {contextControl}
        </ul>
      </div>
      <div className="Tesk">
        <Header title="ETC"></Header>

        {content}
        <ul>
          <li>
            <a
              href="/create"
              onClick={(event) => {
                event.preventDefault();
                setMode("CREATE");
              }}
            >
              Create
            </a>
          </li>
          {contextControl}
        </ul>
      </div>
      <div className="Tesk">
        <button>+</button>
      </div>
    </div>
  );
}

export default BoardRouter;
