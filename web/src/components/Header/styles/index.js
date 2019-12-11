import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  border-bottom: 1px solid #ddd;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 980px;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
    }

    a {
      text-transform: uppercase;
      font-size: 15px;
      font-weight: bold;
      color: #999;
    }

    a.active {
      color: #444;
    }

    a + a {
      margin-left: 20px;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid #eee;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      font-size: 14px;
      display: block;
      color: #666;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 14px;
      color: #de3b3b;
    }
  }

  img {
    height: 32px;
    width: 32px;
    border-radius: 50%;
  }
`;
