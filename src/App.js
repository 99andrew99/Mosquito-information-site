import styled from "styled-components";
import GlobalStyles from "./Globalstyles";
import { call_api } from "./api";
import { useEffect, useState } from "react";

const TopContainer = styled.div`
  width: 100vw;
  height: 200vh;
  display: flex;
  flex-direction: column;
`;

const FirstPage = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url("/images/mainBg.jpg");
  background-position: center;
  background-size: cover;
  /* background-color: greenyellow; */
  display: flex;
  flex-direction: column;
  align-items: center;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.8); /* 흰색 반투명 오버레이 */
  }
`;

const FirstTitle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: 600;
  margin-top: 20px;
  z-index: 2;
`;

const FirstMoContainer = styled.div`
  width: 60%;
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

const FirstMoImg = styled.img`
  width: 200px;
  height: 200px;
  z-index: 2;
`;

const FirstWarnContainer = styled.div`
  z-index: 2;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const FirstWarnText = styled.p`
  font-size: 3rem;
  font-weight: 700;
  color: ${(props) => props.color};
`;

const SecondPage = styled.div`
  width: 100vw;
  height: 100vh;
  /* background-color: tomato; */
`;

const SecondTodayContainer = styled.div``;
const SecondResultContainer = styled.div``;

function App() {
  const [result, setResult] = useState({});
  const [load, setLoad] = useState(false);
  const [mosquitoCount, setMosquitoCount] = useState(0);
  const [warnText, setWarnText] = useState({ text: "", color: "black" });

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

    if (load) {
      const house = parseFloat(result.MOSQUITO_VALUE_HOUSE);
      const park = parseFloat(result.MOSQUITO_VALUE_PARK);
      const water = parseFloat(result.MOSQUITO_VALUE_WATER);

      const average = (house + park + water) / 3;

      if (average < 25) {
        setMosquitoCount(1);
        setWarnText({
          text: "모기 활동 지수가 쾌적 단계(1단계) 입니다.",
          color: "blue",
        });
      } else if (average < 50) {
        setMosquitoCount(2);
        setWarnText({
          text: "모기 활동 지수가 관심 단계(2단계) 입니다.",
          color: "green",
        });
      } else if (average < 75) {
        setMosquitoCount(3);
        setWarnText({
          text: "모기 활동 지수가 주의 단계(3단계) 입니다.",
          color: "orange",
        });
      } else {
        setMosquitoCount(4);
        setWarnText({
          text: "모기 활동 지수가 불쾌 단계(4단계) 입니다.",
          color: "red",
        });
      }
    }
  }, [result, load]);

  return (
    <>
      <GlobalStyles />
      <TopContainer>
        <FirstPage>
          <FirstTitle>모기 예보 in Seoul</FirstTitle>

          <FirstMoContainer>
            {Array(mosquitoCount)
              .fill()
              .map((_, i) => (
                <FirstMoImg key={i} src={"/images/moIcon.png"} />
              ))}
          </FirstMoContainer>

          <FirstWarnContainer>
            <FirstWarnText color={warnText.color}>
              {warnText.text}
            </FirstWarnText>
          </FirstWarnContainer>
        </FirstPage>

        <SecondPage></SecondPage>
      </TopContainer>
    </>
  );
}

export default App;
