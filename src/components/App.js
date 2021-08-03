import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState({
    prompt: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    correctIndex: 0,
  });

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((data) => setQuestions(data));
  }, []);

  // useEffect(() => {
  //   fetch("http://localhost:4000/questions/13", { method: "DELETE" }).then(() =>
  //     console.log("Delete successful")
  //   );
  // }, []);

  const handleUpdate = (event, questionId) => {
    fetch(`http://localhost:4000/questions/${questionId}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        correctIndex: parseInt(event),
      }),
    })
      .then((response) => {
        console.log(response.status);
        return response.json();
      })
      .then((data) => console.log(data));
  };

  const handleDelete = (questionId) => {
    fetch(`http://localhost:4000/questions/${questionId}`, {
      method: "DELETE",
    }).then(() => setQuestions(questions.filter((q) => q.id !== +questionId)));
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm
          setQuestions={setQuestions}
          questions={questions}
          formData={formData}
          setFormData={setFormData}
        />
      ) : (
        <QuestionList
          questions={questions}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
        />
      )}
    </main>
  );
}

export default App;
