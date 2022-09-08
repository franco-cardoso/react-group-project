import React from "react";
import styled from "styled-components";

const SubSection = (props) => {
  return <Container>{props.children}</Container>;
};

const Container = styled.div`

  width: 80%;
  margin-bottom: 50px;
  font-family: Poppins, sans-serif;
  line-height: 1.6;
  text-align: left;

  // font-family: Poppins, sans-serif;
  font-family: 'Crete Round', serif;
  line-height: 1.7;
  text-align: justify;

  display: flex;
  margin-top: 10px;
  flex-direction: column;


  @media (min-width: 1260px) {
    width: 640px;
    height: 600px;
    font-family: Poppins, sans-serif;
    line-height: 1.6;
    display: flex;
    justify-content: space-around;
    margin: 10px;
  }
  @media (min-width: 620px) {
    width: 90%;
    padding-left: 20px
  }

`;
export default SubSection;
