import {
  ControlsContainer,
  FullScreenControl,
  SearchControl,
  SigmaContainer,
  ZoomControl,
} from '@react-sigma/core';
import { LayoutForceAtlas2Control } from '@react-sigma/layout-forceatlas2';
import { FC } from 'react';
import { Graph } from './Graph';

export default function ControlContainer() {
  return (
    <SigmaContainer style={{ height: '65vh' }}>
      <Graph />
      <ControlsContainer position={'bottom-right'}>
        <ZoomControl />
        <FullScreenControl />
        <LayoutForceAtlas2Control
          settings={{ settings: { slowDown: 10 } }}
          autoRunFor={3000}
        />
      </ControlsContainer>
      <ControlsContainer position={'top-right'}>
        <SearchControl style={{ width: '200px' }} />
      </ControlsContainer>
    </SigmaContainer>
  );
}
