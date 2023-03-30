import { useEffect } from 'react';

import { SigmaContainer } from '@react-sigma/core';
import { useWorkerLayoutForceAtlas2 } from '@react-sigma/layout-forceatlas2';

import { Graph } from './Graph';
import { ActionIcon, Button } from '@mantine/core';
import { IconPlayerPause, IconPlayerPlay } from '@tabler/icons';

export function LayoutFA2() {
  const RenderForceAtlas2: React.FC = () => {
    const { start, kill, isRunning } = useWorkerLayoutForceAtlas2({
      settings: { slowDown: 10 },
    });

    useEffect(() => {
      // start FA2
      start();

      setTimeout(() => kill(), 15000);

      return () => {
        // Kill FA2 on unmount
        kill();
      };
    }, [start, kill]);

    return null;
  };

  return (
    <SigmaContainer style={{ height: '100vh' }}>
      <Graph />
      <RenderForceAtlas2 />
    </SigmaContainer>
  );
}

export default LayoutFA2;
