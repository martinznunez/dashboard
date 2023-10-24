import styled from "styled-components";

export const WrapperCard = styled.div`
  margin: 10px;
  width: 190px;
  height: 254px;
  background: rgb(223, 225, 235);
  border-radius: 50px;
  box-shadow:
    rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset,
    rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset,
    rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset,
    rgba(0, 0, 0, 0.06) 0px 2px 1px,
    rgba(0, 0, 0, 0.09) 0px 4px 2px,
    rgba(0, 0, 0, 0.09) 0px 8px 4px,
    rgba(0, 0, 0, 0.09) 0px 16px 8px,
    rgba(0, 0, 0, 0.09) 0px 32px 16px;
`;

export const Detail = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  align-items: center;
  justify-content: space-around;
  margin: auto;
  height: 80%;
  padding: 0px;
  border-radius: 50px;

  h5 {
    font-size: 2rem;
    font-weight: 900;
    color: #333;
    margin-bottom: 10px;
    text-transform: uppercase;
  }

  p {
    font-size: 1.5rem;
    color: #666;
    font-weight: 400;
    text-transform: capitalize;
  }
`;
