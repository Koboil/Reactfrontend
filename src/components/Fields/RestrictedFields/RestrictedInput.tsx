import React from 'react';
import { LockOutlined } from '@ant-design/icons';
import { Input, InputProps, Tooltip } from 'antd';
import { RESTRICT_FIELD_PLACEHOLDER } from '@/config/constant';

interface RestrictedInputProps extends InputProps {
   restrictedFields?: string;
}

const RestrictedInput = ({ restrictedFields, ...props }: RestrictedInputProps) => {
   const isRestricted = props.id ? restrictedFields?.includes(props.id) : false;
   if (isRestricted) {
      props.suffix = <LockOutlined className="w-3" />;
      props.placeholder = RESTRICT_FIELD_PLACEHOLDER;
      props.disabled = true;
      return (
         <Tooltip title={'Ce champ confidentiel a été masqué'}>
            <div>
               <Input {...props} />
            </div>
         </Tooltip>
      );
   }

   return <Input {...props} />;
};

export default RestrictedInput;
