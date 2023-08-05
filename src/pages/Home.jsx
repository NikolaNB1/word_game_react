import { useState } from "react";
import { getWord } from "../service/wordsService";

const Home = () => {
  const [word, setWord] = useState("");
  const [message, setMessage] = useState(null);
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentWordPoints, setCurrentWordPoints] = useState(0);
  const [error, setError] = useState("");

  const charRegex = /[^a-zA-Z\s]/;

  const resetWord = () => {
    setWord("");
  };

  const handleWord = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    if (word.length < 2) {
      setError("Word must be longer than 2 characters!");
      resetWord();
      setLoading(false);
      return 0;
    }

    if (charRegex.test(word)) {
      setError("Word should only contain letters!");
      resetWord();
      setLoading(false);
      return 0;
    }

    getWord(word)
      .then(({ data: response }) => {
        setMessage(
          "You have got " + response + " points for word " + word + "!"
        );
        setPoints((prevState) => prevState + response);
        setCurrentWordPoints(response);
        resetWord();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div
          className="col-md-6"
          style={{
            width: "400px",
          }}
        >
          <div className="card custom-card">
            <div
              className="card-body text-center"
              style={{
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              }}
            >
              <h1 className="card-title">Enter word</h1>
              <h3>Score: {points} </h3>
              <form onSubmit={handleWord} className="mb-4">
                <div className="mb-3 form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="Word"
                    name="word"
                    value={word}
                    onChange={(event) => setWord(event.target.value)}
                  />
                  <label htmlFor="floatingInput">Word</label>
                </div>
                {loading ? (
                  <div
                    className="spinner-border text-primary"
                    role="status"
                  ></div>
                ) : (
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                )}
              </form>
              {message && (
                <div
                  className={`alert ${
                    currentWordPoints === 0 ? "alert-danger" : "alert-success"
                  } mb-4`}
                  role="alert"
                >
                  {message}
                </div>
              )}

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
