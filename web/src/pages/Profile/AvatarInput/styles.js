import styled from 'styled-components';

export const Container = styled.div`
  height: 150px;
  width: 150px;
  position: relative;
  margin-bottom: 30px;

  &:hover {
    .camera-icon {
      background: #666;
    }

    label {
      img {
        border: 5px solid #666;
      }
    }
  }

  label {
    cursor: pointer;

    img {
      transition: all 0.2s;
      height: 150px;
      width: 150px;
      border-radius: 50%;
      border: 5px solid #999;
      background: #eee;
    }

    input {
      position: absolute;
      display: none;
    }
  }

  .camera-icon {
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;

    height: 35px;
    width: 35px;
    border-radius: 50%;

    position: absolute;
    top: 8px;
    right: 8px;

    background: #999;
  }
`;
