import React from "react";
import styled from "styled-components";
import $K from "../../constants";
import { breakpoints } from "../../styles/media";
import { googleSignIn } from "../../utils/auth/google";

const LoginPage: React.FC = () => {
  return (
    <Container>
      <Inner>
        <Wrapper>
          <LogoTop src="/images/cta-logo-one.png" />
          <SignUp onClick={googleSignIn}>지금 가입</SignUp>
          <Description>
            디즈니+ 프리미엄 연간 멤버십을 구독하고 최대 16% 할인을 받으세요.
            <br />
            연간 멤버십을 포함한 멤버십 유형별 세부 정보를 확인해보세요.
          </Description>
          <LogoBottom src="/images/cta-logo-two.png" />
        </Wrapper>
      </Inner>
      <BackgroundImage />
    </Container>
  );
};

export default LoginPage;

const Container = styled.section`
  height: calc(100vh - ${$K.Style.NavHeight});
`;

const Inner = styled.div`
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 70px 5vw 10vh;
  ${breakpoints.small} {
    padding: 30px 0 40px 0;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 650px;
  position: relative;
`;

const Logo = styled.img`
  max-width: 600px;
  min-width: 450px;
  width: 100%;
`;

const LogoTop = styled(Logo)`
  margin-bottom: 12px;
`;

const LogoBottom = styled(Logo)`
  margin-bottom: 20px;
  vertical-align: bottom;
`;

const SignUp = styled.a`
  display: block;
  width: 100%;
  font-weight: bold;
  margin: 10px 0;
  color: #f9f9f9;
  background-color: #0063e5;
  padding: 10px 20px;
  border-radius: 5px;
  box-sizing: border-box;
  text-align: center;
  border: none;
  outline: none;
  cursor: pointer;

  &:hover {
    background-color: #0483ee;
  }
`;

const Description = styled.p`
  line-height: 1.25;
  margin: 20px 0;
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-image: url("/images/login-background.jpg");
  width: 100%;
  height: 100%;
  z-index: -1;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;
