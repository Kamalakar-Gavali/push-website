// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable react/prop-types */
/* eslint-disable */

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PageWrapper from '../components/PageWrapper';
import pageMeta from 'config/pageMeta';
import { device } from 'config/globals';
import { Anchor, B, Content, H2, H3, HeroHeaders, Input, ItemH, ItemV, Span } from 'components/SharedStyling';
import HybridSection from 'components/HybridSection';
import SignupInput from 'components/SignupInput';
import { BodyContent } from './Home';
import useMediaQuery from 'hooks/useMediaQuery';
import { BiSearch } from 'react-icons/bi';
import ChannelItem, { Tilt } from 'components/ChannelItem';
import { FiChevronDown } from 'react-icons/fi';
import SpinnerSVG from 'assets/Spinner.gif';
import Image from 'assets/bg-image.png';
import { ChannelList, objChannelList } from 'config/ChannelList';
import { ReactComponent as AaveSVG } from '../assets/float/aave.svg';
import { ReactComponent as LensSVG } from '../assets/float/Lens.svg';
import { ReactComponent as LifiSVG } from '../assets/float/Lifi.svg';
import { ReactComponent as LifiMainSVG } from '../assets/float/LifiMain.svg';
import { ReactComponent as UnstoppableSVG } from '../assets/float/Unstoppable.svg';
import { ReactComponent as SnapshotSVG } from '../assets/float/Snapshot.svg';
import { ReactComponent as QidaoSVG } from '../assets/float/Qidao.svg';
import { ReactComponent as BancorSVG } from '../assets/float/Bancor.svg';
import { ReactComponent as CoinDeskSVG } from '../assets/float/Coindesk.svg';
import { ReactComponent as AragonSVG } from '../assets/float/Aragon.svg';
import { ReactComponent as MeanFinanceSVG } from '../assets/float/MeanFinance.svg';
import { ReactComponent as UniswapSVG } from '../assets/float/Uniswap.svg';
import FadeInAnimation from 'components/FadeInAnimation';
import gsap from 'gsap';

const FrensText = () => {
  const isMobile = useMediaQuery(device.mobileL);
  const isTablet = useMediaQuery(device.tablet);
  const [channels, setChannels] = useState([]);
  const [page, setPage] = useState(0);
  const [active, setActive] = useState('All');
  const [count, setCount] = useState(objChannelList?.length);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState('');
  const options = {
    scale: 1,
    speed: 1000,
    max: 20,
    // glare: true,
    // 'max-glare': 1,
    // "glare-prerender": false,
  };

  const typeList = [
    {
      name: 'All',
    },
    {
      name: 'DeFi',
    },
    {
      name: 'DAO',
    },
    {
      name: 'NFT',
    },
    {
      name: 'Metaverse',
    },
    {
      name: 'Tooling',
    },
    {
      name: 'Infrastructure',
    },
    {
      name: 'Social',
    },
    {
      name: 'Service',
    },
    {
      name: 'Gaming',
    },
    {
      name: 'Media',
    },
  ];

  useEffect(() => {
    fetchChannels();
    ChannelList();
  }, [objChannelList]);

  const fetchChannels = () => {
    let freshPage = 0;
    setPage(freshPage);
    if (objChannelList.length) {
      let list = objChannelList?.slice(freshPage, freshPage + 9);
      setTimeout(() => {
        setLoading(false);
        setChannels(list);
      }, 1000);
    }
  };

  useEffect(() => {
    if (search.length > 0 || active !== 'All') return;
    fetchChannels();
  }, [search]);

  const ShowMore = async () => {
    //page
    let newPage = page + 9;
    setPage(newPage);

    try {
      setLoading(true);
      let data = objChannelList?.slice(newPage, newPage + 9);
      setTimeout(() => {
        setChannels((current) => [...current, ...data]);
      }, 500);
    } catch (error) {
      console.error('Channels API data fetch error: ', error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  const channelSearch = async (e) => {
    let query = e.target.value.toLowerCase();
    setSearch(e.target.value);
    if (e.target.value?.length == 0) return;

    try {
      setLoading(true);
      const data = objChannelList.filter((x) => x.name.toLowerCase().includes(query));
      setChannels(data);
    } catch (error) {
      console.error('Channels API data fetch error: ', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (name) => {
    setActive(name);
    setSearch('');
    if (name == 'All') {
      fetchChannels();
      setCount(objChannelList.length);
    } else {
      setLoading(true);
      let sortList = objChannelList.filter((x) => x.type === name);
      setTimeout(() => {
        setChannels(sortList);
        setLoading(false);
        setCount(sortList.length);
      }, 500);
    }
  };

  useEffect(() => {
    floatAnimation('.aave');
    floatAnimationSecond('.lens');
    floatAnimationThird('.lifi');
    floatAnimation('.stop');
    floatAnimationSecond('.snapshot');
    floatAnimationThird('.qidao');
    floatAnimation('.bancor');
    floatAnimationSecond('.coindesk');
    floatAnimationThird('.lifi-main');
    floatAnimation('.aragon');
    floatAnimationSecond('.mean-finance');
    floatAnimationThird('.uniswap');
  }, []);

  const floatAnimation = (element) => {
    var tl = gsap.timeline({ repeat: -1 });
    /*Can Animation*/
    tl.to(element, { duration: '3', y: '-=30', x: '+=20', rotation: '-=5', ease: 'Power1.easeInOut' });
    tl.to(element, { duration: '2', y: '+=30', x: '-=20', rotation: '-=5', ease: 'Power1.easeInOut' });
    tl.to(element, { duration: '3', y: '-=20', rotation: '+=5', ease: 'Power1.easeInOut' });
    tl.to(element, { duration: '3', y: '+=20', rotation: '+=5', ease: 'Power1.easeInOut' });
    tl.to(element, { duration: '3', y: '-=50', ease: 'Power1.easeInOut' });
    tl.to(element, { duration: '3', y: '+=50', ease: 'Power1.easeInOut' });
    tl.to(element, { duration: '3', y: '-=30', ease: 'Power1.easeInOut' });
    tl.to(element, { duration: '3', y: '+=30', ease: 'Power1.easeInOut' });
    tl.to(element, { duration: '3', y: '-=30', ease: 'Power1.easeInOut' });
    tl.to(element, { duration: '3', y: '+=30', ease: 'Power1.easeInOut' });
    gsap.to(tl, { duration: '27', ease: 'Power1.easeInOut' });
  };

  const floatAnimationSecond = (element) => {
    var tl = gsap.timeline({ repeat: -1 });
    /*Can Animation*/
    tl.to(element, { duration: '3', y: '+=30', ease: 'Power1.easeInOut' });
    tl.to(element, { duration: '3', y: '-=30', ease: 'Power1.easeInOut' });
    tl.to(element, { duration: '3', y: '+=30', ease: 'Power1.easeInOut' });
    tl.to(element, { duration: '3', y: '-=30', ease: 'Power1.easeInOut' });
    tl.to(element, { duration: '3', y: '+=50', ease: 'Power1.easeInOut' });
    tl.to(element, { duration: '3', y: '-=50', ease: 'Power1.easeInOut' });
    tl.to(element, { duration: '3', y: '+=20', rotation: '+=5', ease: 'Power1.easeInOut' });
    tl.to(element, { duration: '3', y: '-=20', rotation: '+=5', ease: 'Power1.easeInOut' });
    tl.to(element, { duration: '2', y: '+=30', x: '-=20', rotation: '-=5', ease: 'Power1.easeInOut' });
    tl.to(element, { duration: '3', y: '-=30', x: '+=20', rotation: '-=5', ease: 'Power1.easeInOut' });
    gsap.to(tl, { duration: '27', ease: 'Power1.easeInOut' });
  };

  const floatAnimationThird = (element) => {
    var tl = gsap.timeline({ repeat: -1 });
    /*Can Animation*/
    tl.to(element, { duration: '2', y: '+=30', ease: 'Power1.easeInOut' });
    tl.to(element, { duration: '2', y: '-=30', ease: 'Power1.easeInOut' });
    tl.to(element, { duration: '2', y: '+=30', ease: 'Power1.easeInOut' });
    tl.to(element, { duration: '3', y: '-=30', ease: 'Power1.easeInOut' });
    tl.to(element, { duration: '3', y: '+=50', ease: 'Power1.easeInOut' });
    tl.to(element, { duration: '3', y: '-=50', ease: 'Power1.easeInOut' });
    tl.to(element, { duration: '3', y: '+=20', rotation: '+=5', ease: 'Power1.easeInOut' });
    tl.to(element, { duration: '3', y: '-=20', rotation: '+=5', ease: 'Power1.easeInOut' });
    tl.to(element, { duration: '2', y: '+=30', x: '-=20', rotation: '-=5', ease: 'Power1.easeInOut' });
    tl.to(element, { duration: '3', y: '-=30', x: '+=20', rotation: '-=5', ease: 'Power1.easeInOut' });
    gsap.to(tl, { duration: '27', ease: 'Power1.easeInOut' });
  };

  return (
    <PageWrapper
      pageName={pageMeta.FRENS.pageName}
      pageTitle={pageMeta.FRENS.pageTitle}
    >
      <FrensWrapper>
        <AnimationIcon>
          <AnimationSection
            minHeight="60vh"
            padding="80px 0px 20px 0px"
          >
            <AaveSVG className="aave" />
            <LensSVG className="lens" />
            <LifiSVG className="lifi" />
            <UnstoppableSVG className="stop" />
            <SnapshotSVG className="snapshot" />
            <QidaoSVG className="qidao" />
            <BancorSVG className="bancor" />
            <CoinDeskSVG className="coindesk" />
            <LifiMainSVG className="lifi-main" />
            <AragonSVG className="aragon" />
            <MeanFinanceSVG className="mean-finance" />
            <UniswapSVG className="uniswap" />

            <Content
              className="contentBox"
              flex="0"
            >
              <ItemH
                flexDirection="column"
                flex="0"
                margin={isMobile ? '50px 0px 0px' : '100px 0px 0px'}
                justifyContent="center"
              >
                <HeroHeaders>Frens of Push</HeroHeaders>
                <Span
                  textAlign="center"
                  margin="20px 0 0 0"
                  spacing="-0.03em"
                  weight={isMobile ? '300' : '400'}
                  size={isMobile ? '18px' : '23px'}
                >
                  Explore hundreds of applications building with Push {!isTablet && <br />} worldwide across DeFi, NFTs,
                  Gaming, Dev tools, and more.
                </Span>
              </ItemH>
            </Content>
          </AnimationSection>
        </AnimationIcon>

        <PoweredSection
          id="story"
          data-bkg="light"
          className="lightBackground"
          curve="bottom"
        >
          <Content className="contentBox">
            <PushRow>
              <ItemV justifyContent="flex-start">
                <ResponsiveH2
                  size="40px"
                  weight="500"
                  spacing="-0.02em"
                  lineHeight="110%"
                >
                  Powered by Push
                </ResponsiveH2>
              </ItemV>
              <ItemV
                maxWidth="350px"
                justifyContent="flex-end"
              >
                <Wrapper>
                  <BiSearch
                    size="23"
                    color="#121315"
                  />
                  <input
                    type="text"
                    value={search}
                    placeholder="Search dapps"
                    onChange={channelSearch}
                  />
                </Wrapper>
              </ItemV>
            </PushRow>

            <ToggleSection>
              {typeList.map((item, i) => (
                <ToggleButton
                  key={item?.name}
                  active={active === item?.name ? true : false}
                  onClick={() => handleSort(item?.name)}
                >
                  <Span>{item?.name}</Span>

                  {active === item?.name && <b>{count}</b>}
                </ToggleButton>
              ))}
            </ToggleSection>

            <ChannelsSection>
              {channels?.map((item, i) => (
                // <FadeInAnimation wrapperElement="div" delay={0.25} >
                <Channels key={item.ipfshash}>
                  {isMobile ? (
                    <ChannelItem channelProp={item} />
                  ) : (
                    <Tilt
                      options={options}
                      className="box"
                    >
                      <ChannelItem
                        channelProp={item}
                        delay={0.25}
                      />
                    </Tilt>
                  )}
                </Channels>
                // </FadeInAnimation>
              ))}
            </ChannelsSection>

            {search && !loading && channels.length === 0 && (
              <CenteredContainerInfo>
                <DisplayNotice>No channels match your query, please search for another name/address</DisplayNotice>
              </CenteredContainerInfo>
            )}

            {active !== 'All' && !loading && count === 0 && (
              <CenteredContainerInfo>
                <DisplayNotice>No channels under this type yet.</DisplayNotice>
              </CenteredContainerInfo>
            )}

            {loading && (
              <ItemH>
                <img
                  src={SpinnerSVG}
                  alt=""
                  width={140}
                />
              </ItemH>
            )}

            {!loading && active === 'All' && search.length === 0 && (
              <ShowMoreSection onClick={ShowMore}>
                <FiChevronDown size={23} />
                <b>Show More</b>
              </ShowMoreSection>
            )}
          </Content>

          <BodyContent className="contentBox">
            <SignupBox margin="0 0 0px 0">
              <ItemV
                justifyContent="flex-start"
                gap="12px"
              >
                <ResponsiveH2
                  color="#09090B"
                  size="40px"
                  weight="700"
                  spacing="-0.02em"
                  lineHeight="110%"
                  margin="0"
                >
                  Never Miss an Update
                </ResponsiveH2>
                <Span
                  color="#303C5E"
                  size="20px"
                  weight="400"
                  spacing="-0.03em"
                  lineHeight="138.5%"
                >
                  Sign up and stay up to date with ecosystem announcements, giveaways and more.
                </Span>
              </ItemV>

              <ItemV>
                <SignupInput />
              </ItemV>
            </SignupBox>
          </BodyContent>
        </PoweredSection>
      </FrensWrapper>
    </PageWrapper>
  );
};

const FrensWrapper = styled.main`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  & #hero .contentBox {
    row-gap: 18px;
  }
  @media ${device.tablet} {
    width: 100%;
  }
`;

const CenteredContainerInfo = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DisplayNotice = styled.span`
  border: 0;
  outline: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 15px;
  margin: 10px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 400;
  color: #000;
  background: rgb(244, 245, 250);
`;

const ToggleSection = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`;
const ChannelsSection = styled.div`
  margin: 50px 0px 0px 0px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-gap: 32px;
  @media ${device.laptop} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media ${device.mobileL} {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

const ToggleButton = styled.div`
  border: ${(props) => (props.active ? '1px solid transparent' : '1px solid #BAC4D6')};
  border-radius: 62px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  box-sizing: border-box;
  width: fit-content;
  height: fit-content;
  left: 0;
  margin: 5px 5px;
  background: ${(props) => (props.active ? '#D53893' : 'transparent')};
  color: ${(props) => (props.active ? '#fff' : '#000')};
  &:hover {
    background: ${(props) => (props.active ? '#D53893' : '#FFDBF0')};
    border: 1px solid transparent;
    cursor: pointer;
  }

  span {
    font-size: 20px;
    font-weight: 500;
    border: none;
    color: ${(props) => (props.active ? '#fff' : '#000')};
  }

  b {
    font-weight: 500;
    font-size: 20px;
    line-height: 110%;
    letter-spacing: -0.03em;
    margin-left: 30px;
  }
`;

const ResponsiveH2 = styled(H2)`
  @media ${device.tablet} {
    font-size: 32px;
  }
`;

const SignupBox = styled(ItemH)`
  background: rgba(214, 177, 242, 0.8);
  backdrop-filter: blur(15px);
  border-radius: 32px;
  padding: 72px;
  display: flex;
  flex-direction: row;
  gap: 24px;

  @media ${device.tablet} {
    padding: 24px;
    flex-direction: column;
  }
`;

const ResponsiveSection = styled(HybridSection)`
  min-height: ${(props) => props.minHeight || '0px'};
  @media ${device.tablet} {
    padding-left: 30px !important;
    padding-right: 30px !important;
  }
`;

const AnimationIcon = styled.div`
  background: #121315;
  border-bottom-left-radius: 48px;
  border-bottom-right-radius: 48px;
`;

const AnimationSection = styled(ResponsiveSection)`
  background: #121315;
  border-bottom-left-radius: 48px;
  border-bottom-right-radius: 48px;
  overflow-x: none;
  @media (min-width: 1200px) {
    width: 85%;
    margin: 0 auto;
  }
  padding-bottom: 50px;
  .aave {
    position: absolute;
    top: 20%;
    left: 65%;
    right: 0;
    bottom: 0;

    @media ${device.tablet} {
      left: 30%;
      opacity: 0.6;
    }
  }

  .lens {
    position: absolute;
    top: 50%;
    left: 80%;
    right: 0;
    bottom: 0;

    @media ${device.tablet} {
      left: 50%;
      opacity: 0.6;
    }
  }

  .lifi {
    position: absolute;
    top: 30%;
    left: 85%;
    right: 0;
    bottom: 0;

    @media ${device.tablet} {
      display: none;
    }
  }

  .stop {
    position: absolute;
    top: 70%;
    left: 70%;
    right: 0;
    bottom: 0;

    @media ${device.tablet} {
      display: none;
    }
  }

  .snapshot {
    position: absolute;
    top: 20%;
    left: 55%;
    right: 0;
    bottom: 0;
  }

  .qidao {
    position: absolute;
    top: 75%;
    left: 45%;
    right: 0;
    bottom: 0;
    z-index: 5;

    @media ${device.tablet} {
      display: none;
    }
  }

  .bancor {
    position: absolute;
    top: 65%;
    left: 35%;
    right: 0;
    bottom: 0;
  }

  .coindesk {
    position: absolute;
    top: 75%;
    left: 25%;
    right: 0;
    bottom: 0;
    z-index: 5;

    @media ${device.tablet} {
      display: none;
    }
  }

  .lifi-main {
    position: absolute;
    top: 60%;
    left: 20%;
    right: 0;
    bottom: 0;

    @media ${device.tablet} {
      display: none;
    }
  }

  .aragon {
    position: absolute;
    top: 70%;
    left: 10%;
    right: 0;
    bottom: 0;

    @media ${device.mobileL} {
      left: 5%;
    }
  }
  .mean-finance {
    position: absolute;
    top: 30%;
    left: 10%;
    right: 0;
    bottom: 0;
    @media ${device.tablet} {
      opacity: 0.6;
      left: 5%;
    }
  }

  .uniswap {
    position: absolute;
    top: 20%;
    left: 20%;
    right: 0;
    bottom: 0;

    @media ${device.tablet} {
      display: none;
    }
  }
  @media ${device.tablet} {
    background: #121315;
    border-bottom-left-radius: 48px;
    border-bottom-right-radius: 48px;
    padding-bottom: 0px;
  }
`;

const PushRow = styled(ItemH)`
  margin: 80px 0 50px 0;

  @media ${device.tablet} {
    margin-top: 80px;
  }

  @media ${device.mobileL} {
    margin-top: 80px;
    flex-direction: column;
  }
`;

const PoweredSection = styled(ResponsiveSection)`
  padding: 0px 160px 80px 160px;
  @media ${device.tablet} {
    padding-bottom: 32px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  column-gap: 6px;
  align-items: center;
  background: #ffffff;
  border-radius: 20px;
  border: 1px solid #d9d9d9;
  padding: 16px;
  justify-content: space-between;

  @media ${device.tablet} {
    column-gap: 3px;
  }

  & input[type='text'] {
    all: unset;
    box-sizing: border-box;
    font-family: 'Strawford';
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: normal;
    letter-spacing: -0.03em;
    color: #121315;
    width: 100%;
    padding: 0px;

    &::placeholder {
      color: #121315;
      opacity: 1;
      font-size: 20px;
    }

    @media ${device.tablet} {
      min-width: fit-content;
    }
  }
`;

const Channels = styled.div`
  flex: 1;
  height: 100% !important;
  .box {
    flex: 1;
    height: 100% !important;
  }
`;

const ShowMoreSection = styled.div`
  border: 1px solid #bac4d6;
  border-radius: 24px;
  margin: 70px 0px 0px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 23px;
  cursor: pointer;
  b {
    font-weight: 500;
    font-size: 20px;
    line-height: 110%;
    letter-spacing: -0.03em;
    color: #1e1e1e;
  }
`;

export default FrensText;
