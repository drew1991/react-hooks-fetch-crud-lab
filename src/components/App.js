import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
      });
  }, []);

  function addQuestion(newQuestion) {
    const updatedQuestions = [...questions, newQuestion];
    setQuestions(updatedQuestions);
  }

  function deleteQuestion(id) {
    const updatedQuestions = questions.filter((question) => question.id !== id);
    setQuestions(updatedQuestions);
  }

  function updateQuestion(id, updatedQuestion) {
    console.log(id, updatedQuestion);
    const updatedQuestions = questions.map((question) => {
      if (question.id === updatedQuestion.id) {
        return updatedQuestion;
      } else {
        return question;
      }
    });
    setQuestions(updatedQuestions);
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm questions={questions} addQuestion={addQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDelete={deleteQuestion}
          onUpdate={updateQuestion}
        />
      )}
    </main>
  );
}
export default App;