import React from 'react';
import { LockOutlined } from '@ant-design/icons';
import { DatePicker, DatePickerProps, Tooltip } from 'antd';
import { RESTRICT_FIELD_PLACEHOLDER } from '@/config/constant';

type RestrictedDatePickerProps = {
   restrictedFields?: string;
} & DatePickerProps;
const RestrictedDatePicker = ({
   restrictedFields,
   ...props
}: RestrictedDatePickerProps) => {
   //@ts-ignore
   const isRestricted = restrictedFields?.includes(props.id);

   const Wrapper: React.FC<{ children: any }> = isRestricted
      ? ({ children }) => (
           <Tooltip title={'Ce champ confidentiel a été masqué'}>
              <div>{children}</div>
           </Tooltip>
        )
      : ({ children }) => <>{children}</>;

   const selectProps = isRestricted
      ? {
           ...props,
           style: { ...props.style, backgroundColor: 'rgba(0, 0, 0, 0.04)' },
           disabled: true,
           suffixIcon: <LockOutlined className="w-3" />,
           placeholder: RESTRICT_FIELD_PLACEHOLDER,
        }
      : props;
   return (
      <Wrapper>
         <DatePicker {...selectProps} />
      </Wrapper>
   );
};

export default RestrictedDatePicker;
