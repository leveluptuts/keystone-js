import React, { useState, useEffect } from 'react'
import Link from "next/link";
import { Page } from "../components/Page";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { useUser, AUTHENTICATE_USER_QUERY } from "../hooks/User";
import { useRouter } from "next/router";

const CREATE_USER_MUTATION = gql`
  mutation CREATE_USER_MUTATION($data: UserCreateInput!) {
    createUser(data: $data) {
      name
      email
      password {
        isSet
      }
    }
  }
`;

const AUTHENTICATE_USER_MUTATION = gql`
  mutation AUTHENTICATE_USER_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          name
          id
        }
        sessionToken
      }
      ... on UserAuthenticationWithPasswordFailure {
        message
      }
    }
  }
`;

const Home = () => {
  const [foundErrors, setFoundErrors] = useState(false);
  const [submittingForm, setSubmittingForm] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const user = useUser();
  const router = useRouter();

  // check to see if the user has an existing session and has already been authenticated
  // Adding this here instead of onCompletion so that if the user comes, they can get where they need to go
  useEffect(() => {
    console.log('checking the user');
    console.log(user);

    if (user?.authenticatedItem?.id) {
      // Redirect the user to the Directions page
      router.push('/directions');
    }
  }, [user]);

  // form has been submitted
  const onSubmit = async data => {
    setSubmittingForm(true);    // Freeze our Form
    await signupUser(data);
    setSubmittingForm(false);   // Enable the form
    console.log(data);
  }

  const [createUser] = useMutation(CREATE_USER_MUTATION);
  const [checkUsernamePassword] = useMutation(AUTHENTICATE_USER_MUTATION);

  // create the user
  const signupUser = async (data) => {
    try {
      await createUser({
        variables: {
          "data": {
            "name": data.name,
            "email": data.email,
            "password": data.password
          }
        }
      });

      await authenticateUser(data);
    } catch {
      // error handling
      setFoundErrors(true);
    }
  }

  // if they were successfully created
  // authenticate them, using the credentials they provided
  const authenticateUser = async (data) => {
    try {
      const loggedInUser = await checkUsernamePassword({
        variables: {
          "email": data.email,
          "password": data.password
        },
        refetchQueries: [
          { query: AUTHENTICATE_USER_QUERY }
        ]
      });

      console.log(loggedInUser.data);

      const token = loggedInUser.data.authenticateUserWithPassword.sessionToken;

      // if successfully authenticated
      if (token) {
        // Create an item in local storage with their session information
        localStorage.setItem('ENNEAGRAM_SESSION', token);
      } else {
        setFoundErrors(true);
      }

      // if successful, then send the user the directions page
      router.push('/directions');
    } catch {
      setFoundErrors(true);
    }

  }

  return (
    <Page>
      {/* box */}
      <div className="box">

        {/* heading */}
        <h1 className="page-title -mt-32">
          <span className="font-handwriting text-7xl block">free</span>
          Enneagram Assessment
        </h1>
        <h2 className="font-sans uppercase tracking-wider text-primary text-lg mb-4">Create an Account</h2>

        {foundErrors && (
          <div className="error">Whoops! We found errors.</div>
        )}

        {/* form */}
        <form action="" onSubmit={handleSubmit(onSubmit)} className="relative pb-12 lg:pb-0">
          <fieldset className="lg:grid grid-cols-3 gap-4" disabled={submittingForm}>
            <div>
              <label htmlFor="name">First Name</label>
              <input type="text" name="name" {...register('name', { required: true })} />
              {errors.name && <div className="error">The name is required</div>}
            </div>

            <div>
              <label htmlFor="email">Email Address</label>
              <input type="email" name="email" {...register('email', { required: true })} />
              {errors.email && <div className="error">The email address is required</div>}
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input type="password" name="password" {...register('password', { required: true })} />
              {errors.password && <div className="error">The password is required</div>}
            </div>

            <div className="col-span-3">
              <input type="checkbox" name="terms" id="terms" {...register('terms', { required: true })} />
              {errors.exampleRequired && <span>This field is required</span>}
              <label htmlFor="terms">I agree to your{" "}
                <Link href="/terms-and-conditions"><a>terms and conditions</a></Link>.
              </label>
              {errors.terms && <div className="error">Please accept our terms</div>}
            </div>
          </fieldset>

          <button type="submit" role="submit" className="button z-50 absolute -bottom-12 left-1/2 md:left-auto md:right-0 transform -translate-x-1/2 md:translate-x-0 w-44">
            <span className="button-text">Submit</span>
          </button>
        </form>


      </div>
      <div className="absolute md:relative left-0 bottom-2 md:bottom-0 w-full text-center md:text-left md:pt-2"><Link href="/what-is">What is the Enneagram?</Link></div>
    </Page>
  )
}

export default Home
