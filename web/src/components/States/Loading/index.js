import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
// import ReactLoading from 'react-loading';

import { Container } from './styles';

export default function Loading() {
  return (
    <Container>
      <SkeletonTheme color="#ddd" highlightColor="#eee">
        <Skeleton height={24} />
        <div className="horizontal">
          <div className="fill">
            <Skeleton height={20} count={5} />
          </div>
          <div className="collapsed">
            <Skeleton height={20} count={5} />
          </div>
          <div className="collapsed">
            <Skeleton height={20} count={5} />
          </div>
        </div>
      </SkeletonTheme>
    </Container>
  );
}
