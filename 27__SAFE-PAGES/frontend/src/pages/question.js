import { useState, useEffect } from "react";
import { Page } from "../components/Page"
import { Answers } from "../components/Answers";
import Link from "next/link";
import Image from "next/image"
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { shuffle } from "lodash";
import { useRouter } from "next/router";
import { useUser } from "../hooks/User";
import { Auth } from "../components/Auth";

const QUESTION_QUERY = gql`
  query QUESTION_QUERY($id: ID) {
    questions(where: { answer: {none: {AND: [{user: {id: {equals: $id}}}]}}}) {
      question
      id
    }
    questionsCount
  }
`;

const ANSWER_QUESTION_MUTATION = gql`
  mutation ANSWER_QUESTION_MUTATION($userId: ID, $questionId: ID, $answer: Int) {
    createAnswer(data: {
      answer: $answer,
      user: { connect: { id: $userId}},
      question: {connect: {id: $questionId}}
    }) {
      id
    }
  }
`;


export default function Question() {
  const user = useUser(); // need the user id = user.authenticatedItem.id
  const router = useRouter();
  const [questions, setQuestions] = useState();
  const [curSpot, setCurSpot] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);

  const [getQuestions, { data, loading, error }] = useLazyQuery(QUESTION_QUERY, {
    onCompleted: (data) => {
      // check to see if there are any left
      if (data.questions && (data.questions.length > 0)) {
        setQuestions(shuffle(data.questions));
      } else {
        router.push('/results');
      }
    }
  });

  useEffect(() => {
    if (user?.authenticatedItem?.id) {
      getQuestions({
        variables: {
          id: user.authenticatedItem.id
        }
      })
    }
  }, [user]);

  const [addAnswers, addAnswerMutationResult] = useMutation(ANSWER_QUESTION_MUTATION, {
    onCompleted: () => {
      const newSpot = curSpot + 1;
      if (newSpot < data.questions.length) {
        setCurSpot(newSpot);
        setQuestionNumber(prevValue => prevValue + 1);
      } else {
        router.push('/result');
      }
    }
  });

  useEffect(() => {
    if (data?.questionsCount) {
      const questionNum = data.questionsCount - data.questions.length + 1;
      setQuestionNumber(questionNum);
    }
  }, [data]);

  const submitAnswer = (answer) => {
    console.log(`submitting our answer ${answer}`);
    console.log(user.authenticatedItem.id);
    addAnswers({
      variables: {
        "userId": user.authenticatedItem.id,
        "questionId": questions[curSpot].id,
        "answer": answer
      }
    });
  }

  return (
    <Auth>
      <Page>
        <div className="box">
          <div className="content text-center">
            <div className="font-display text-10xl leading-none -mt-28">
              <Image src="/img/number-sign.svg" width={72} height={109} />
              {questionNumber}
            </div>
            <p>{questions && questions[curSpot].question}</p>
            <Answers className="bottom-0 p-2" submitAnswer={submitAnswer} />
          </div>
        </div>
      </Page>
    </Auth>
  )
}