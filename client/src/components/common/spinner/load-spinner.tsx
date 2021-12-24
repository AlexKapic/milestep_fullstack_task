import React from 'react';
import { Spinner } from 'react-bootstrap';

export const LoadSpinner: React.FC = () => (
  <div className="position-absolute top-50 start-50 translate-middle">
    <Spinner
      animation="border"
      variant="primary"
      style={{ width: '4rem', height: '4rem' }}
    />
  </div>
);
