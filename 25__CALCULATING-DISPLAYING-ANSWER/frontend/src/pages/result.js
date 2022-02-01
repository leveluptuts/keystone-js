import { useState, useEffect } from "react";
import { Page } from "../components/Page"
import Link from "next/link";
import Image from "next/image"
import { Diagram } from "../components/Diagram";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { useUser } from "../hooks/User";
import { groupBy, sumBy } from "lodash"

const ANSWERS_QUERY = gql`
  query ANSWERS_QUERY($id: ID!) {
    answers (where: { user: { id: {equals: $id}}}) {
      question {
        type {
          type
        }
      }
      answer
    }
  }
`;

const TYPES_QUERY = gql`
  query TYPES_QUERY($type: Int!) {
    types(where: {type: {equals: $type}}) {
      id
      type
      subheading
    	description
    }
  }
`;

export default function Result() {
  // const { data, loading, error } = useQuery(TYPES_QUERY);
  const user = useUser();
  const [result, setResult] = useState();

  const numberSpelledOut = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];

  const [getUserAnswers, { data, loading, error }] = useLazyQuery(ANSWERS_QUERY, {
    onCompleted: (data) => {
      const groupedAnswers = groupBy(data.answers, (item) => {
        return item.question.type.type
      })
      console.log(groupedAnswers);
      const res = gradeQuiz(groupedAnswers);
      setResult(res);
    }
  });

  const [getTypeDetails, typeDetails] = useLazyQuery(TYPES_QUERY);

  useEffect(() => {
    if (user?.authenticatedItem?.id) {
      getUserAnswers({
        variables: {
          id: user.authenticatedItem.id
        }
      })
    }
  }, [user]);

  useEffect(() => {
    if (result) {
      getTypeDetails({
        variables: { type: result }
      })
    }
  }, [result]);

  const gradeQuiz = (groupedAnswers) => {
    let typeWithHighestGrade = 0;
    let highestGrade = 0;

    // loop over each item in the Object (grouped by type)
    for (const [key, value] of Object.entries(groupedAnswers)) {
      console.log({ key, value })
      // key is the type and value is an array of user answers

      // add up all the answers
      const typeSum = sumBy(value, item => item.answer);
      console.log(typeSum);

      if (typeSum > highestGrade) {
        highestGrade = typeSum;
        typeWithHighestGrade = Number(key);
      }
    }

    return typeWithHighestGrade;

  }

  return (
    <Page>
      <div className="box">
        <div className="content text-center">
          <div className="page-title leading-none -mt-28">
            <div className="font-handwriting text-6xl w-full text-left -mb-4 relative -left-10">Hello</div>
            {typeDetails?.data?.types[0]?.type && numberSpelledOut[typeDetails.data.types[0].type]}
            <br />
            {typeDetails?.data?.types[0]?.subheading && typeDetails.data.types[0].subheading}
          </div>
          <div className="max-w-md mx-auto mb-5"><Diagram /></div>
          <p className="text-left">
            {typeDetails?.data?.types[0]?.description && typeDetails.data.types[0].description}
          </p>
        </div>
      </div>
    </Page>
  )
}