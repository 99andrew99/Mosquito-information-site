import styled from "styled-components";
import GlobalStyles from "./Globalstyles";
import { call_api } from "./api";
import { useEffect, useState } from "react";

const TopContainer = styled.div`
  width: 100vw;
  height: 200vh;
  display: flex;
  flex-direction: column;
  background-image: url("images/mainBg.jpg");
  background-position: center;
  background-size: cover;
  background-attachment: fixed;

  &:before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.8); /* 흰색 반투명 오버레이 */
  }

  @media (max-width: 768px) {
    height: 220vh; /* 모바일 화면에서의 높이 수정 */
  }
`;

const FirstPage = styled.div`
  width: 100vw;
  height: 100vh;

  /* background-color: greenyellow; */
  display: flex;
  flex-direction: column;
  align-items: center;
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

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const FirstMoContainer = styled.div`
  width: 60%;
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;

  @media (max-width: 768px) {
    height: 50%;
  }
`;

const FirstMoImg = styled.img`
  width: 200px;
  height: 200px;
  z-index: 2;

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
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

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const SecondPage = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 2;
  /* background-color: tomato; */

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SecondTodayContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;

  @media (max-width: 768px) {
    width: 80%;
    height: 40%;
  }
`;

const SecondTitle = styled.p`
  font-size: 2.5rem;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;
const SecondTextContainer = styled.div`
  display: flex;
  width: 40%;
  justify-content: space-between;

  @media (max-width: 768px) {
    width: 100%;
  }
`;
const SecondText = styled.p`
  font-size: 1.4rem;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const SecondResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;

  @media (max-width: 768px) {
    width: 80%;
    height: 40%;
  }
`;

function getMosquitoLevelText(value) {
  value = parseFloat(value);
  if (value < 25) {
    return "1단계(쾌적)";
  } else if (value < 50) {
    return "2단계(관심)";
  } else if (value < 75) {
    return "3단계(주의)";
  } else {
    return "4단계(불쾌)";
  }
}

function App() {
  const [result, setResult] = useState({});
  const [load, setLoad] = useState(false);
  const [mosquitoCount, setMosquitoCount] = useState(0);
  const [warnText, setWarnText] = useState({ text: "", color: "black" });
  const [houseLevel, setHouseLevel] = useState("");
  const [parkLevel, setParkLevel] = useState("");
  const [waterLevel, setWaterLevel] = useState("");
  const [averageLevel, setAverageLevel] = useState("");

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

      setHouseLevel(getMosquitoLevelText(house));
      setParkLevel(getMosquitoLevelText(park));
      setWaterLevel(getMosquitoLevelText(water));
      setAverageLevel(getMosquitoLevelText(average));

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
                <FirstMoImg key={i} src={"images/moIcon.png"} />
              ))}
          </FirstMoContainer>

          <FirstWarnContainer>
            <FirstWarnText color={warnText.color}>
              {warnText.text}
            </FirstWarnText>
          </FirstWarnContainer>
        </FirstPage>

        <SecondPage>
          <SecondTodayContainer>
            <SecondTitle>오늘의 모기지수</SecondTitle>

            <SecondTextContainer>
              <SecondText>모기지수 발생일: </SecondText>
              <SecondText>{result.MOSQUITO_DATE}</SecondText>
            </SecondTextContainer>

            <SecondTextContainer>
              <SecondText>모기지수(수변부): </SecondText>
              <SecondText>{result.MOSQUITO_VALUE_WATER}</SecondText>
            </SecondTextContainer>

            <SecondTextContainer>
              <SecondText>모기지수(주거지): </SecondText>
              <SecondText>{result.MOSQUITO_VALUE_HOUSE}</SecondText>
            </SecondTextContainer>

            <SecondTextContainer>
              <SecondText>모기지수(공원): </SecondText>
              <SecondText>{result.MOSQUITO_VALUE_PARK}</SecondText>
            </SecondTextContainer>
          </SecondTodayContainer>

          <SecondResultContainer>
            <SecondTitle>모기 발생 단계</SecondTitle>
            <SecondTextContainer>
              <SecondText>모기지수(수변부): </SecondText>
              <SecondText>{waterLevel}</SecondText>
            </SecondTextContainer>

            <SecondTextContainer>
              <SecondText>모기지수(주거지): </SecondText>
              <SecondText>{houseLevel}</SecondText>
            </SecondTextContainer>

            <SecondTextContainer>
              <SecondText>모기지수(공원): </SecondText>
              <SecondText>{parkLevel}</SecondText>
            </SecondTextContainer>

            <SecondTextContainer>
              <SecondText>서울시 평균: </SecondText>
              <SecondText>{averageLevel}</SecondText>
            </SecondTextContainer>
          </SecondResultContainer>
        </SecondPage>
      </TopContainer>
    </>
  );
}

export default App;
