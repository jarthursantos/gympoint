import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  padding: 50px 60px;

  & > div {
    width: 100%;

    span {
      margin-bottom: 20px;
    }

    span + span {
      margin-top: 16px;
      margin-bottom: 16px;
    }

    .horizontal {
      display: flex;

      .fill {
        flex: 1;

        span {
          flex: 1;
        }
      }

      .collapsed {
        width: 98px;
        margin-left: 16px;
      }
    }

    .circles {
      display: flex;
      align-items: center;
      justify-content: center;

      span {
        margin: 0 4px;
      }
    }
  }
`;
