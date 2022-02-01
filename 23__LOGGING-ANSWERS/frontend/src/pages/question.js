import { useState, useEffect } from "react";
import { Page } from "../components/Page"
import { Answers } from "../components/Answers";
import Link from "next/link";
import Image from "next/image"
import { gql, useQuery, useMutation } from "@apollo/client";
import { shuffle } from "lodash";
import { useRouter } from "next/router";

const QUESTION_QUERY = gql`
  query QUESTION_QUERY {
    questions(where: { answer: {none: {AND: [{user: {id: {equals: "ckvcxvpqg0016cvs0x7f68cws"}}}]}}}) {
      question
      id
    }
    questionsCount
  }
`;

const ANSWER_QUESTION_MUTATION = gql`
  mutation ANSWER_QUESTION_MUTATION {
    createAnswer(data: {
      answer: 3
      user: { connect: { id: "ckvcxvpqg0016cvs0x7f68cws"}}
      question: {connect: {id: "ckvhi1dbu07379npelx1ow8r4"}}
    }) {
      id
    }
  }
`;


export default function Question() {
  const router = useRouter();
  const [questions, setQuestions] = useState();
  const [questionNumber, setQuestionNumber] = useState(0);

  const { data, loading, error } = useQuery(QUESTION_QUERY, {
    onCompleted: (data) => {
      // check to see if there are any left
      if (data.questions && (data.questions.length > 0)) {
        setQuestions(shuffle(data.questions));
      } else {
        router.push('/results');
      }
    }
  });

  const [addAnswers, addAnswerMutationResult] = useMutation(ANSWER_QUESTION_MUTATION);

  useEffect(() => {
    if (data?.questionsCount) {
      const questionNum = data.questionsCount - data.questions.length + 1;
      setQuestionNumber(questionNum);
    }
  }, [data]);

  const submitAnswer = (answer) => {
    console.log(`submitting our answer ${answer}`);
    addAnswers();
  }

  return (
    <Page>
      <div className="box">
        <div className="content text-center">
          <div className="font-display text-10xl leading-none -mt-28">
            <Image src="/img/number-sign.svg" width={72} height={109} />
            {questionNumber}
          </div>
          <p>{questions && questions[0].question}</p>
          <Answers className="bottom-0 p-2" submitAnswer={submitAnswer} />
        </div>
      </div>
    </Page>
  )
}