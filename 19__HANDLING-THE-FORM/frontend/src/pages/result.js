import { Page } from "../components/Page"
import Link from "next/link";
import Image from "next/image"
import { Diagram } from "../components/Diagram";
import { gql, useQuery } from "@apollo/client";

const TYPES_QUERY = gql`
  query TYPES_QUERY {
    types {
      id
      type
      subheading
    }
  }
`;

export default function Result() {
  const { data, loading, error } = useQuery(TYPES_QUERY);
  console.log(data);

  return (
    <Page>
      <div className="box">
        <div className="content text-center">
          <div className="page-title leading-none -mt-28">
            <div className="font-handwriting text-6xl w-full text-left -mb-4 relative -left-10">Hello</div>
            Three
          </div>
          <div className="max-w-md mx-auto mb-5"><Diagram /></div>
          <p className="text-left">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
      </div>
    </Page>
  )
}