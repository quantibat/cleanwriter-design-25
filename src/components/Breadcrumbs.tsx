
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, ChevronRight } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

interface BreadcrumbsProps {
  items?: {
    label: string;
    link?: string;
  }[];
}

const Breadcrumbs = ({ items = [] }: BreadcrumbsProps) => {
  const location = useLocation();
  
  // Generate breadcrumbs based on the current path if no items are provided
  const pathSegments = location.pathname.split('/').filter(Boolean);
  
  const breadcrumbItems = items.length > 0 ? items : pathSegments.map((segment, index) => {
    const formattedSegment = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    const link = `/${pathSegments.slice(0, index + 1).join('/')}`;
    
    // Make the last segment non-clickable
    return {
      label: formattedSegment,
      link: index < pathSegments.length - 1 ? link : undefined,
    };
  });
  
  return (
    <Breadcrumb className="px-6 py-2">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/dashboard">
              <HomeIcon className="h-4 w-4" />
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        <BreadcrumbSeparator />
        
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              {item.link ? (
                <BreadcrumbLink asChild>
                  <Link to={item.link}>{item.label}</Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            
            {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
