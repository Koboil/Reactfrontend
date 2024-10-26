import { LockOutlined } from '@ant-design/icons';
import { Select, SelectProps, Tooltip } from 'antd';
import React from 'react';
import { RESTRICT_FIELD_PLACEHOLDER } from '@/config/constant';

type RestrictedSelectProps<T = any> = SelectProps & {
   restrictedFields?: string;
   valueType?: T;
};
const RestrictedSelect = <T,>({
   restrictedFields,
   valueType,
   ...props
}: RestrictedSelectProps<T>) => {
   type ValueType = typeof valueType;
   const isRestricted = props.id ? restrictedFields?.includes(props.id) : false;

   const Wrapper: React.FC<{ children: React.ReactNode }> = isRestricted
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
           suffixIcon: <LockOutlined />,
           placeholder: RESTRICT_FIELD_PLACEHOLDER,
        }
      : props;
   return (
      <Wrapper>
         {/* TODO: Add OptionType */}
         <Select<ValueType> {...selectProps} />
      </Wrapper>
   );
};
export default RestrictedSelect;
