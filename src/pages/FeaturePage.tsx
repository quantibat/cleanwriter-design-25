
import React from 'react';
import { useParams } from 'react-router-dom';
import FeatureDetail from '@/components/FeatureDetail';
import featuresData from '@/data/featuresData';

const FeaturePage = () => {
  return <FeatureDetail featureData={featuresData} />;
};

export default FeaturePage;
