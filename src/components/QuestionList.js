import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, handleDelete, handleUpdate }) {
  const questionList = questions.map((q) => (
    <QuestionItem
      question={q}
      key={q.id}
      handleDelete={handleDelete}
      handleUpdate={handleUpdate}
    />
  ));

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionList}</ul>
    </section>
  );
}

export default QuestionList;
