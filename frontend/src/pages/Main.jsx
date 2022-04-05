import React, { useEffect, useState, Fragment } from 'react';
import { Button, Tabs, Tab, ListGroup, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import styled from 'styled-components';
import { getAxios } from '../api';
import Norecommend from '../components/WelfareRecommend/Norecommend';
import FilterSlide from '../components/WelfareRecommend/FilterSlide';
import RecommendSlide from '../components/WelfareRecommend/RecommendSlide';

function Main() {
  const KAKAO_AUTH_URL = `http://j6c205.p.ssafy.io:8080/api/oauth2/authorization/kakao?redirect_uri=http://localhost:3000/oauth/kakao/callback`;

  const axios = getAxios();
  let navigate = useNavigate();

  const [name, setName] = useState('User');
  const [popular, setPopular] = useState([{}]);
  const [recent, setRecent] = useState([{}]);
  const [token, setToken] = useState('');
  const [cards, setCards] = useState([]);

  const isLogin = () => {
    if (localStorage.getItem('token')) {
      setToken(true);
    } else {
      setToken(false);
    }
  };

  const getProfile = async () => {
    try {
      const axios = getAxios();
      let response = await axios.get('/api/users/profile');
      console.log('카카오 : ', response.data);
      localStorage.setItem('name', response.data.body.user.username);
      localStorage.setItem('profile', response.data.body.user.profileImageUrl);
    } catch (err) {
      console.log(err);
    }
  };

  const getPopular = async () => {
    try {
      let res = await axios.get('/api/welfare/popular');
      console.log('인기순: ', res.data.body.welfare, typeof res.data.body.welfare);
      setPopular(res.data.body.welfare);
    } catch (error) {
      console.log(error);
    }
  };

  const getRecent = async () => {
    try {
      let res = await axios.get('/api/welfare/recent');
      console.log('최신순: ', res.data.body.welfare, typeof res.data.body.welfare);
      setRecent(res.data.body.welfare);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCard = async () => {
    try {
      const request = await axios.get('/api/welfare/recommend');
      console.log('welfare: ', request.data.body.welfare);
      setCards(request.data.body.welfare);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPopular();
    getRecent();
    isLogin();
    fetchCard();
    getProfile();
    setName(localStorage.getItem('name'));
  }, []);

  return (
    <div className="main">
      <StyledContainer>
        <StyledIntro>
          <StyledIntroMain>
            <div className="intro-text-area" style={{ marginTop: '170px' }}>
              <h4>
                <b className="white">소개해요 복지! 소중해요 행복!</b>
              </h4>

              <p>
                소복소복은 사용자에게 맞춤 복지 정보를 제공합니다.
                <br />
                가구상황, 관심주제를 입력하여 더욱 정확한 맞춤 복지를 추천받으세요.
                <br />
                ‘소복소복’에 가입하고 나에게 딱 맞는 복지제도 정보를 찾아보세요
              </p>

              {!token ? (
                <Button href={KAKAO_AUTH_URL} variant="primary">
                  카카오톡 간편가입
                </Button>
              ) : null}
            </div>
            <img src="/drawKit/SVG/DrawKit (2).svg" alt="main-image" width="450px" />
          </StyledIntroMain>
        </StyledIntro>

        <StyledBottomBackground>
          <StyledSearchBar>
            <SearchBar></SearchBar>
          </StyledSearchBar>

          <StyledTab>
            <Tabs
              defaultActiveKey={token ? 'home' : 'popular-list'}
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              {token ? (
                <Tab eventKey="home" title="맞춤형 복지 안내">
                  {cards.length === 0 ? (
                    <Fragment>
                      <h5 style={{ padding: '1% 6.5%' }}>
                        <b>알맞은 복지 카테고리를 선택하고 맞춤 복지 혜택을 안내받으세요.</b>
                      </h5>
                      <Button
                        variant="primary"
                        style={{ margin: '1% 6.5%' }}
                        onClick={() => {
                          navigate('/filter');
                        }}
                      >
                        정보 입력하기
                      </Button>
                    </Fragment>
                  ) : (
                    // <Norecommend profile={profile} name={name}></Norecommend>
                    <StyledMain>
                      <FilterSlide name={name} cards={cards} />
                      <RecommendSlide name={name} />
                    </StyledMain>
                  )}
                </Tab>
              ) : null}

              <Tab eventKey="popular-list" title="인기순">
                <h5 style={{ padding: '1% 6.5%' }}>
                  <b>지금 인기있는 복지 혜택을 안내드립니다.</b>
                </h5>
                <ListGroup
                  variant="flush"
                  style={{
                    paddingLeft: '5%',
                    paddingRight: '5%',
                    display: 'flex',
                    // justifyContent: 'spaceBetween',
                    // alignContent: 'center',
                  }}
                >
                  {popular.map((item, index) => (
                    <ListGroup.Item
                      key={index}
                      style={{
                        display: 'flex',
                        justifyContent: 'spaceAround',
                      }}
                    >
                      <Stack direction="horizontal" gap={3}>
                        <h6 style={{ marginTop: '0.5rem', width: '250px' }}>
                          {item.welfare_service_name}
                        </h6>
                        <div className="vr" style={{ margin: '0.3rem 0 0.3rem 0' }} />
                        <h6
                          style={{
                            marginTop: '0.5rem',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            width: '500px',
                          }}
                        >
                          {item.welfare_target_detail}
                        </h6>
                        <div className="vr" style={{ margin: '0.3rem 0 0.3rem 0' }} />
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => {
                            navigate(`/welfare/${item.welfareId}`);
                          }}
                        >
                          자세히 보기
                        </Button>
                      </Stack>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Tab>

              <Tab eventKey="recent-list" title="최신순">
                <h5 style={{ padding: '1% 6.5%' }}>
                  <b>최신 등록된 복지 혜택을 안내드립니다.</b>
                </h5>
                <ListGroup
                  variant="flush"
                  style={{
                    paddingLeft: '5%',
                    paddingRight: '5%',
                    display: 'flex',
                    // justifyContent: 'spaceBetween',
                    // alignContent: 'center',
                  }}
                >
                  {recent.map((item, index) => (
                    <ListGroup.Item
                      key={index}
                      style={{
                        display: 'flex',
                        justifyContent: 'spaceAround',
                      }}
                    >
                      <Stack direction="horizontal" gap={3}>
                        <h6 style={{ marginTop: '0.5rem', width: '250px' }}>
                          {item.welfare_service_name}
                        </h6>
                        <div className="vr" style={{ margin: '0.3rem 0 0.3rem 0' }} />
                        <h6
                          style={{
                            marginTop: '0.5rem',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            width: '500px',
                          }}
                        >
                          {item.welfare_target_detail}
                        </h6>
                        <div className="vr" style={{ margin: '0.3rem 0 0.3rem 0' }} />
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => {
                            navigate(`/welfare/${item.welfareId}`);
                          }}
                        >
                          자세히 보기
                        </Button>
                      </Stack>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Tab>
            </Tabs>
          </StyledTab>
        </StyledBottomBackground>
      </StyledContainer>
    </div>
  );
}

const StyledContainer = styled.div`
  display: grid;
  justify-content: center;
  font-family: 'Noto Sans KR', sans-serif;
`;

const StyledIntro = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margintop: 170px;
  padding: 5% 10%;
  background-color: #90caf9;
  width: 100vw;
  // justify-content: space-around;
  color: black;
`;

const StyledIntroMain = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margintop: 170px;
  justify-content: space-around;
  background-color: #90caf9;
`;

const StyledBottomBackground = styled.div`
  width: 100vw;
  height: 120vh;
  position: relative;
  background-image: url('/background/layered-waves-haikei.svg');
`;

const StyledSearchBar = styled.div`
  margin: 0px 220px 100px 220px;
  z-index: 2;
`;

const StyledTab = styled.div`
  margin: 50px 220px 200px 220px;
  background: white;
  border-radius: 5px;
  padding: 3% 5%;
  z-index: 2;
`;

const StyledTop = styled.div`
  display: grid;
  grid-template-columns: 20% 40% 40%;
  justify-content: center;
  align-items: center;
  margin-top: 5vh;
  // margin-bottom: 5vh;
`;
const StyledMain = styled.div`
  display: grid;
  justify-content: center;
  // margin-bottom: 5vh;
  // margin-top: 5vh;
  grid-row-gap: 10vh;
  width: 70vw;
`;

export default Main;
