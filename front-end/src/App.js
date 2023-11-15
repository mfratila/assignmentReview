import "./App.css";

function App() {
  const reqBody = {
    username: "mihai",
    password: "12345678",
  };

  fetch("api/auth/login", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "post",
    body: JSON.stringify(reqBody),
  })
    .then((response) => Promise.all([response.json(), response.headers]))
    .then(([body, headers]) => {
      const authValue = headers.get("authorization");
      console.log(authValue);
      console.log(body);
    });

  return <div className="App"><h1>Hello There</h1></div>;
}

export default App;
