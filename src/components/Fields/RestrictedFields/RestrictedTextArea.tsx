import React, { FC } from 'react';
import { Input, Tooltip } from 'antd';
import { TextAreaProps } from 'antd/es/input';
import { RESTRICT_FIELD_PLACEHOLDER } from '@/config/constant';
import TextArea from 'antd/es/input/TextArea';
interface RestrictedTextAreaProps extends TextAreaProps {
   restrictedFields?: string;
}

const RestrictedTextArea: FC<RestrictedTextAreaProps> = ({
   restrictedFields,
   ...props
}) => {
   const isRestricted = restrictedFields?.includes(props.id);
   if (isRestricted) {
      props.placeholder = RESTRICT_FIELD_PLACEHOLDER;
      props.style = { ...props.style, backgroundColor: 'rgba(0, 0, 0, 0.04)' };
      props.disabled = true;
      return (
         <Tooltip title={'Ce champ confidentiel a été masqué'}>
            <div>
               <TextArea {...props} />
            </div>
         </Tooltip>
      );
   }

   return <TextArea {...props} />;
};

export default RestrictedTextArea;
