import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  border-bottom: 1px solid #ddd;
  width: 100%;
`;

export const Content = styled.div`
  height: 64px;
  padding: 0 30px;
  max-width: 1200px;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 30px;
      padding-right: 30px;
      border-right: 1px solid #ddd;
    }

    a {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
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
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: right;
    margin-right: 10px;

    strong {
      font-size: 14px;
      display: block;
      color: #666;
    }

    button {
      display: block;
      border: none;
      background: none;
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