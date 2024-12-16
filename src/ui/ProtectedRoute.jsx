/* eslint-disable react/prop-types */
import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Fullpage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  //1. load the authenticated user
  const { isAuthenticated, isPending } = useUser();

  //2. if there is no authenticated user, redirect to the /login
  useEffect(() => {
    if (!isAuthenticated && !isPending) navigate("/login", { replace: true });
  }, [isPending, isAuthenticated, navigate]);
  //3. while loading,show a spinner
  if (isPending)
    return (
      <Fullpage>
        <Spinner />
      </Fullpage>
    );

  //4. it there is a user, render the app
  if (isAuthenticated) return children;
}
