import { useEffect } from 'react';
import Graph, { UndirectedGraph } from 'graphology';
import {
  SigmaContainer,
  useLoadGraph,
  useRegisterEvents,
  ControlsContainer,
} from '@react-sigma/core';
import useSWR from 'swr';
import { Loader } from '@mantine/core';
import { useLayoutCircular } from '@react-sigma/layout-circular';
import { useLayoutForceAtlas2 } from '@react-sigma/layout-forceatlas2';
import { useLayoutRandom } from '@react-sigma/layout-random';
import { useLayoutCirclepack } from '@react-sigma/layout-circlepack';
import graphData from '../public/json/graphology_illustrations_keywords.json';

export function LoadGraph() {
  const registerEvents = useRegisterEvents();
  const loadGraph = useLoadGraph();
  const { positions, assign: circleAssign } = useLayoutCircular();
  // const { assign } = useLayoutForceAtlas2({ iterations: 2 });
  // const { positions, assign } = useLayoutRandom();
  // const { positions, assign } = useLayoutCirclepack();

  useEffect(() => {
    const graph = new UndirectedGraph();
    graph.import(graphData);
    graph.nodes().forEach((node, i) => {
      const angle = (i * 2 * Math.PI) / graph.order;
      graph.setNodeAttribute(node, 'x', 0);
      graph.setNodeAttribute(node, 'y', 0);
    });
    loadGraph(graph);
    circleAssign();
    // assign();
    console.log('positions:', positions());
  }, [loadGraph, circleAssign, positions]);

  useEffect(() => {
    registerEvents({
      enterNode: (event) => console.log(event.node),
      leaveNode: (event) => console.log('leaveNode', event.node),
    });
  }, [registerEvents]);

  return null;
}

export function DisplayGraph() {
  return (
    <SigmaContainer style={{ height: '600px' }}>
      <LoadGraph />
    </SigmaContainer>
  );
}
