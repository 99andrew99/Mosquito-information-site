import styled from "styled-components";
import GlobalStyles from "./Globalstyles";
import { call_api } from "./api";
import { useEffect, useState } from "react";

const TopContainer = styled.div`
  width: 100vw;
  height: 200vh;
`;

const FirstPage = styled.div``;

const FirstTitle = styled.div``;

const FirstMoContainer = styled.div``;

const FirstWarnContainer = styled.div``;

const SecondPage = styled.div``;

const SecondTodayContainer = styled.div``;
const SecondResultContainer = styled.div``;

function App() {
  const [result, setResult] = useState({});
  const [load, setLoad] = useState(false);

  useEffect(() => {
    // call_api().then((data) => console.log(data));

    call_api().then((data) => {
      // console.log(data);
      // console.log(data.MOSQUITO_VALUE_PARK);
      setResult(data);
      setLoad(true);
    });
  }, []);

  useEffect(() => {
    console.log(result);
    console.log(load);
  }, [result, load]);

  return (
    <>
      <GlobalStyles />
      <TopContainer> </TopContainer>
    </>
  );
}

export default App;
