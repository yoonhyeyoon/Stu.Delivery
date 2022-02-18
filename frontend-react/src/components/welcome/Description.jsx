import styled from "styled-components";
import code from "../../assets/images/welcome/code.PNG";
import study1 from "../../assets/images/welcome/study1.jpg";
import study2 from "../../assets/images/welcome/study2.jpg";
import logoch from "../../assets/images/logo/logoch.png";

const Container = styled.div`
  display: flex;
  width: 100%;
`;

const DescContainer = styled.div`
  width: 100%;
`;

const DescContent = styled.div`
  padding: 80px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-top: 8px solid rgb(25, 25, 25);
  @media (max-width: 768px) {
    padding: 30px 15px;
  }
`;

const DescSubContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1280px;
  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
  }
`;

const DescTitle = styled.div`
  color: white;
  flex: 0.8;
  padding: 0 75px;
  @media (max-width: 768px) {
    padding: 0;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
  }
`;

const DescH1 = styled.h1`
  font-size: 46px;
  margin-bottom: 20px;
  line-height: 1.3;
  font-weight: bold;
  @media (max-width: 768px) {
    font-size: 25px;
  }
`;

const DescP = styled.p`
  font-size: 27px;
  line-height: 1.6;
  @media (max-width: 768px) {
    font-size: 18px;
    line-height: 1.5;
  }
`;

const DescImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  position: relative;
`;

const DescImage = styled.img`
  width: 520px;
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 20px;
  }
`;

const DescVideoTV = styled.video`
  position: absolute;
  top: 49%;
  left: 49%;
  transform: translate(-50%, -50%);
  width: 382px;
  z-index: -1;
  @media (max-width: 768px) {
    top: 45%;
    width: 285px;
  }
`;

const Description = () => {
  return (
    <Container>
      <DescContainer>
        <DescContent>
          <DescSubContent>
            <DescTitle>
              <DescH1>
                Study 카페를 <br />
                언제 어디든
                <br />
                배달해주는 서비스
              </DescH1>
            </DescTitle>
            <DescImageContainer>
              <DescImage src={logoch}></DescImage>
            </DescImageContainer>
          </DescSubContent>
        </DescContent>
        <DescContent>
          <DescSubContent>
            <DescImageContainer>
              <DescImage src={code}></DescImage>
            </DescImageContainer>
            <DescTitle>
              <DescH1>Real-Time Collaboration</DescH1>
              <DescP>
                스터디원과 코드를 같이 작업하며,
                <br />
                문서를 같이 공유하며,
                <br />
                보드를 같이 그리며,
                <br />
                실시간으로 소통하세요
              </DescP>
            </DescTitle>
          </DescSubContent>
        </DescContent>
        <DescContent>
          <DescSubContent>
            <DescTitle>
              <DescH1>Check Study Time</DescH1>
              <DescP>
                스터디 시간을 체크하며
                <br />
                자신의 시간을 남기세요
              </DescP>
            </DescTitle>
            <DescImageContainer>
              <DescImage src={study1}></DescImage>
            </DescImageContainer>
          </DescSubContent>
        </DescContent>
        <DescContent>
          <DescSubContent>
            <DescImageContainer>
              <DescImage src={study2}></DescImage>
            </DescImageContainer>
            <DescTitle>
              <DescH1>Study Together</DescH1>
              <DescP>
                혼자 하지 마세요
                <br />
                같이 해요
              </DescP>
            </DescTitle>
          </DescSubContent>
        </DescContent>
      </DescContainer>
    </Container>
  );
};

export default Description;
