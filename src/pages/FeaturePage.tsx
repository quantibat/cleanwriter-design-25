
import React from 'react';
import { useParams } from 'react-router-dom';
import FeatureDetail from '@/components/FeatureDetail';
import featuresData from '@/data/featuresData';

const FeaturePage = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // Find the specific feature data using the slug param
  const featureData = slug && featuresData[slug] ? featuresData[slug] : null;
  
  return <FeatureDetail featureData={featureData} />;
};

export default FeaturePage;
