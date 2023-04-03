import { useEffect, useState } from 'react';
import { UndirectedGraph } from 'graphology';
import { Attributes } from 'graphology-types';
import {
  SigmaContainer,
  useLoadGraph,
  useRegisterEvents,
  useSetSettings,
  useSigma,
} from '@react-sigma/core';
import { Loader } from '@mantine/core';
import { useLayoutCircular } from '@react-sigma/layout-circular';
import graphData from '../public/json/graphology_illustrations_keywords_reduced.json';
import { SigmaNodeEventPayload } from 'sigma/sigma';
import { useRouter } from 'next/router';

export function Graph() {
  const registerEvents = useRegisterEvents();
  const loadGraph = useLoadGraph();
  const sigma = useSigma();
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const { positions, assign: assignCircular } = useLayoutCircular();
  const setSettings = useSetSettings();
  const router = useRouter();

  useEffect(() => {
    const graph = new UndirectedGraph();
    graph.import(graphData);
    graph.nodes().forEach((node, i) => {
      graph.setNodeAttribute(node, 'x', 0);
      graph.setNodeAttribute(node, 'y', 0);
    });
    loadGraph(graph);
    assignCircular();
  }, [loadGraph, assignCircular, positions]);

  useEffect(() => {
    registerEvents({
      enterNode: (event) => setHoveredNode(event.node),
      leaveNode: () => setHoveredNode(null),
      doubleClickNode: (event) => {
        const graph = sigma.getGraph();
        const attributes = graph.getNodeAttributes(event.node);
        const { snippet, link } = attributes;
        if (attributes.element === 'illustration') {
          router.push(`/story?snippet=${snippet}&source=${link}`);
        }
      },
    });
  }, [registerEvents, router, sigma]);

  useEffect(() => {
    setSettings({
      nodeReducer: (node, data) => {
        const graph = sigma.getGraph();
        const newData: Attributes = {
          ...data,
          highlighted: data.highlighted || false,
        };
        if (hoveredNode) {
          if (
            node === hoveredNode ||
            graph.neighbors(hoveredNode).includes(node)
          ) {
            newData.highlighted = true;
          } else {
            newData.color = '#E2E2E2';
            newData.highlighted = false;
          }
        }
        return newData;
      },
      edgeReducer: (edge, data) => {
        const graph = sigma.getGraph();
        const newData = { ...data, hidden: false };

        if (hoveredNode && !graph.extremities(edge).includes(hoveredNode)) {
          newData.hidden = true;
        }
        return newData;
      },
    });
  }, [hoveredNode, setSettings, sigma]);

  return null;
}
