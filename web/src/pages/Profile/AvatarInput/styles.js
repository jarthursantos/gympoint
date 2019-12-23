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
      .name,
      img {
        border: 5px solid #666;
      }
    }
  }

  label {
    cursor: pointer;

    .name,
    img {
      transition: all 0.2s;
      height: 150px;
      width: 150px;
      border-radius: 50%;
      border: 5px solid #999;
      background: #eee;
    }

    .name {
      display: flex;
      align-items: center;
      justify-content: center;

      color: #999;
      font-size: 50px;
      text-transform: uppercase;
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
    bottom: 5px;
    right: 5px;

    background: #999;
  }
`;
