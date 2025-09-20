'use client';

import { Categories } from '@/types/categories';
import MotionSection from '../MotionSection';

interface MotionSectionWrapperProps {
  categories: Categories;
}

const MotionSectionWrapper: React.FC<MotionSectionWrapperProps> = ({ categories }) => {
  return <MotionSection categories={categories} />;
};

export default MotionSectionWrapper;