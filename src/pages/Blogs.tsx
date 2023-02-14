// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable react/prop-types */
/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { getAllBlogData } from '../api';
import styled from 'styled-components';
import { Anchor,B,Content, H2 , H3 , HeroHeader, Input ,ItemH, ItemV, Span } from 'components/SharedStyling';
import { device } from '../config/globals';
import useMediaQuery from '../hooks/useMediaQuery';
import PageWrapper from '../components/PageWrapper';
import pageMeta from 'config/pageMeta';
import HybridSection from 'components/HybridSection';
import Image from 'assets/bg-image.png'
import { BiSearch } from 'react-icons/bi';
import moment from "moment";
import Moment from "react-moment";
import { useNavigate } from "react-router-dom";



const Blogs = () => {
  const isMobile = useMediaQuery(device.tablet);
  const [blogsData, setBlogsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

    const loadData = async() => {
        try {
          setIsLoading(true);
          const data = await getAllBlogData();
          setBlogsData(data);
        } catch (e) {
          console.error('Blogs API data fetch error: ', e);
        } finally {
          setIsLoading(false);
        }
    }

    function getDescription(hypertext) {
        try {
          const articleFragments = hypertext.split('\n');
          const [, descriptionFrag = ''] = articleFragments;
          return extractContent(descriptionFrag);
        } catch (e) {
          return '';
        }
      }

      function filterComment(hypertext) {
        try {
            var newString = hypertext.replace(/<(?:.|\n)*?>/gm, '')
            return newString;
        } catch (e) {
          return '';
        }
      }

      function getSubarticles(isMobile, blogs) {
        const [, ...otherBlogs] = blogs || [];
      
        if (isMobile) {
          return blogs;
        }
      
        return otherBlogs;
      
      }

    useEffect(() => {
        loadData();
      }, []);

      const wordsPerMinute = 225;

    function readingTime(text) {
        return Math.ceil(wordCounter(text) / wordsPerMinute);
    }

    function wordCounter(input) {
        const text = input?.split(/\s+/);
        let wordCount = 0;
        for (let i = 0; i < text.length; i++) {
          if (text[i] !== " " && isWord(text[i])) {
            wordCount++;
          }
        }
        return wordCount;
      }

      function isWord(str) {
        let alphaNumericFound = false;
        for (let i = 0; i < str.length; i++) {
          const code = str.charCodeAt(i);
          if (
            (code > 47 && code < 58) || // numeric (0-9)
            (code > 64 && code < 91) || // upper alpha (A-Z)
            (code > 96 && code < 123)
          ) {
            // lower alpha (a-z)
            alphaNumericFound = true;
            return alphaNumericFound;
          }
        }
        return alphaNumericFound;
      }

    const onArticleClick = (clickedBlog) => {
        if(clickedBlog?.link){
           navigate(`/blogs/${clickedBlog?.title}`);
        };
    };

  if (Array.isArray(blogsData) && blogsData.length > 0) {
  return (
        <PageWrapper
            pageName={pageMeta.BLOGS.pageName}
            pageTitle={pageMeta.BLOGS.pageTitle}
            >
        <BlogsWrapper>

        <AnimationSection minHeight="60vh" padding="80px 0px 20px 0px">
            <Content className="contentBox" flex="0">
                <ItemH flexDirection="column" justifyContent="center">
                <HeroHeader>Frens of Push</HeroHeader>
                <Span textAlign="center" margin="20px 0 0 0" spacing="-0.03em" weight={isMobile ? "300" : "400"} size={isMobile ? "18px": "23px"}>Explore hundreds of applications building with Push {!isMobile && <br />} worldwide across DeFi, NFTs, Gaming, Dev tools, and more.</Span>
                </ItemH>
            </Content>
            </AnimationSection>

            <BlogsSection 
                id="story"
                data-bkg="light"
                className="lightBackground"
                curve="bottom">
                
                <BlogRow>
                    <ItemV justifyContent="flex-start">
                        <ResponsiveH2
                        size="40px"
                        weight="500"
                        spacing="-0.02em"
                        lineHeight="110%"
                        >
                        Push Protocol Insights
                        </ResponsiveH2>
                    </ItemV>
                    <ItemV 
                        maxWidth="350px"
                        justifyContent="flex-end">

                    <Wrapper>
                      <BiSearch size="23" color='#121315' />
                      <input 
                        type="text"
                        placeholder='Search articles'
                        />

                    </Wrapper>

                    </ItemV>
                    </BlogRow>

                <MainSection>
                    {blogsData?.slice(0,2).map((blogData, idx) => {
                    return (
                    <MainArticle onClick={() => onArticleClick(blogData)} key={idx} title={blogData?.title}>
                        <ArticleBanner src={blogData?.thumbnail} alt={blogData?.title} />
                
                        <H3 textTransform="normal" color="#000000" size="24px" weight="700" spacing="-0.02em" lineHeight="142%" margin="24px 0 0 0">
                        {blogData?.title}
                        </H3>
                
                        <ArticleText>
                        {filterComment(blogData?.description)}
                        </ArticleText>

                        <ArticleContent>
                            <Moment format='D MMMM, YYYY' style={{marginRight:'5px'}}>
                                {blogData?.pubDate}
                            </Moment> &#183;
                            <Div>
                                {readingTime(blogData?.description)} mins read
                            </Div>
                        </ArticleContent>
                    </MainArticle>)
                    })}
            </MainSection>

                <SubArticles>
                    {blogsData?.slice(2, blogsData.length++).map((blogData, idx) => {
                        return (
                        <MainArticle onClick={() => onArticleClick(blogData)} key={idx} title={blogData?.title}>
                            <ArticleBanner src={blogData?.thumbnail} alt={blogData?.title} />
                    
                            <H3 textTransform="normal" color="#000000" size="24px" weight="700" spacing="-0.02em" lineHeight="142%" margin="24px 0 0 0" textAlign='left !important'>
                            {blogData?.title}
                            </H3>
                    
                            <ArticleTextB>
                            {filterComment(blogData?.description)}
                            </ArticleTextB>

                            <ArticleContent>
                            <Moment format='D MMMM, YYYY' style={{marginRight:'5px'}}>
                                {blogData?.pubDate}
                            </Moment> &#183;
                            <Div>
                                {readingTime(blogData?.description)} mins read
                            </Div>
                        </ArticleContent>
                        </MainArticle>)
                        })}
                </SubArticles>
                </BlogsSection>

          </BlogsWrapper>
          </PageWrapper>
  )
}
}

const ResponsiveSection = styled(HybridSection)`
  min-height: ${(props) => props.minHeight || '0px'};
  @media ${device.tablet} {
    padding-left: 30px !important;
    padding-right: 30px !important;
  }
`;

const AnimationSection = styled(ResponsiveSection)`
//   min-height: 60vh !important;
  padding-bottom: 50px;
//   @media ${device.tablet} {
    background: #121315;
    border-bottom-left-radius: 48px;
    border-bottom-right-radius: 48px;
    padding-bottom: 0px;
//   }
`;

const BlogsWrapper = styled.main`
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

const MainArticle = styled(ItemV)`
  width: 100%;
  margin-top: 70px;
  justify-content: left !important;

   &:hover {
    cursor: pointer;
   }

   @media ${device.tablet} {
    margin-top: 10px;
   }
`;

const ArticleBanner = styled.img`
    width: 100%;
    background: #D9D9D9;
    border-radius: 32px;
`;

const ArticleText = styled.div`
    width: 100%;
    color: #575D73;
    font-size: 15px;
    font-weight: 300;
    line-height: 28px;
    font-family: Lora;
    margin-top: 10px;
    
    overflow: hidden;
    display: -webkit-box !important;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`;

const ArticleTextB = styled.div`
    width: 100%;
    color: #575D73;
    font-size: 15px;
    font-weight: 300;
    line-height: 28px;
    font-family: Lora;
    margin-top: 10px;
    
    overflow: hidden;
    display: -webkit-box !important;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
`;

const ArticleContent = styled.div`
    width: 100%;
    color: #575D73;
    font-size: 15px;
    font-weight: 300;
    line-height: 28px;
    display: flex;
    flex-direction: row !important;
    margin-top: 15px;
`;

const SubArticles = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-gap: 33px;
    margin-top: 10px;
    @media ${device.tablet} {
        grid-template-columns: repeat(1, minmax(0, 1fr));
   }
`;

const BlogsSection = styled(ResponsiveSection)`
 padding: 0px 160px 80px 160px;
  @media ${device.tablet} {
    padding-bottom: 32px;
  }
`;

const MainSection = styled.div`
  display: flex;
  flex-direction: row !important;
  justify-content: space-between;
  margin: 10px 0px;
  width: 100%;
  gap: 33px;
  @media ${device.tablet} {
    flex-direction: column !important;
}
`;

const BlogRow = styled(ItemH)`
  margin: 70px 0 40px 0;
  @media ${device.tablet} {
    margin-top: 80px;
  }
`;

const ResponsiveH2 = styled(H2)`
  @media ${device.tablet} {
    font-size: 32px;
  }
`;

const Div = styled.div`
  margin-left: 5px;
`;

const Wrapper = styled.div`
    position: relative;
    display: flex;
    flex: 1;
    column-gap: 6px;
    align-items: center;
    background: #FFFFFF;
    border-radius: 20px;
    border: 1px solid #d9d9d9;
    padding: 16px;
    justify-content: space-between;
    @media ${device.tablet} {
        column-gap: 3px;
    }
    & input[type="text"] {
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

export default Blogs