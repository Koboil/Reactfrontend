import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React from 'react';
import { primaryColor } from '@/utils';

interface SpinnerProps {
   size?: string;
   fontSize?: number;
   color?: string;
   className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
   size = '24px',
   fontSize = 24,
   color,
   className = '',
}) => {
   return (
      <Spin
         style={{
            width: size,
            height: '24px',
            color: color ? color : primaryColor,
         }}
         indicator={<LoadingOutlined style={{ fontSize: fontSize }} spin />}
         className={`flex items-center${className ? ' ' + className : ''}`}
      />
   );
};

export default Spinner;
