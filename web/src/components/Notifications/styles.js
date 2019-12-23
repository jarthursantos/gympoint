import styled, { css } from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';

export const Container = styled.div`
  margin-left: 20px;
  position: relative;
`;

export const Badge = styled.button`
  border: 0;
  background: none;
  position: relative;

  ${props =>
    props.hasNotification &&
    css`
      &::after {
        position: absolute;
        right: 0;
        top: 0;
        width: 7px;
        height: 7px;
        background: #de3b3b;
        border-radius: 50%;
        border: 1px solid #fff;
        content: '';
      }
    `}
`;

export const NotificationList = styled.div`
  display: ${props => (props.visible ? 'block' : 'none')};
  position: absolute;
  z-index: 1;
  width: 300px;
  left: calc(50% - 150px);
  top: calc(100% + 10px);
  background: #666;
  border-radius: 4px;

  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 10px);
    top: -10px;
    width: 0;
    height: 0;

    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #666;
  }

  p.empty-message {
    color: #fff;
  }

  div.message-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px 5px;

    span {
      color: #fff;
      margin-left: 8px;
    }
  }
`;

export const Scroll = styled(PerfectScrollbar)`
  max-height: 300px;
  padding: 5px 0px;
`;

export const Notification = styled.div`
  cursor: pointer;
  color: #fff;
  padding: 8px 16px;

  & + div {
    /* margin-top: 15px; */
    /* padding-top: 15px; */
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  span {
    font-size: 13px;
    font-weight: 500;
  }

  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    margin: 4px 0;
    font-size: 12px;
    line-height: 18px;

    opacity: 0.9;
  }

  time {
    display: block;
    font-size: 12px;
    opacity: 0.6;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;
