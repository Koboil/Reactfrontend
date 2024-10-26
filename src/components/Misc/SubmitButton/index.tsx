import { cn } from '@/utils';
import React from 'react';
import { Button, Form, ButtonProps } from 'antd';

interface SubmitButtonProps extends ButtonProps {
   className?: string;
   children: React.ReactNode;
}

const SubmitButton = ({ children, className, ...props }: SubmitButtonProps) => {
   return (
      <Form.Item>
         <Button htmlType="submit" {...props} className={cn(className)}>
            {children}
         </Button>
      </Form.Item>
   );
};

export default SubmitButton;
